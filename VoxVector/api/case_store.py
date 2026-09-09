from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from hashlib import sha256
import os
from uuid import uuid4

from .storage import StorageError


class CaseNotFound(StorageError):
    """Raised when a case or source is not available to the authenticated owner."""


class CaseDeletionError(StorageError):
    """Raised when secure case deletion cannot complete every required boundary."""

    def __init__(self, message: str, *, receipt: dict):
        super().__init__(message)
        self.receipt = receipt


class CaseStore:
    """Case-centric persistence built on the existing private Supabase Storage backend."""

    _PENDING_STATUSES = {"pending", "queued", "running", "processing", "in_progress"}
    _COMPLETE_STATUSES = {"complete", "completed", "success", "succeeded"}
    _FAILED_STATUSES = {"failed", "error", "timeout", "timed_out"}

    def __init__(self, storage):
        self.storage = storage

    @staticmethod
    def _now() -> str:
        return datetime.now(timezone.utc).isoformat()

    @staticmethod
    def _parse_timestamp(value: object) -> datetime | None:
        text = str(value or "").strip()
        if not text:
            return None
        try:
            parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
        except ValueError:
            return None
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)

    @staticmethod
    def _case_path(user_id: str, case_id: str) -> str:
        return f"cases/{user_id}/{case_id}.json"

    @staticmethod
    def _source_path(user_id: str, case_id: str, source_id: str) -> str:
        return f"media/{user_id}/{case_id}/{source_id}.wav"

    @staticmethod
    def _deletion_receipt_path(deletion_id: str, requested_at: str) -> str:
        date = requested_at[:10].replace("-", "/")
        return f"case-deletions/{date}/{deletion_id}.json"

    def _persist_deletion_receipt(self, receipt: dict) -> None:
        self.storage.put_json(
            self._deletion_receipt_path(str(receipt["deletion_id"]), str(receipt["requested_at"])),
            receipt,
        )

    @classmethod
    def _elapsed_ms(cls, started_at: object, completed_at: object | None = None) -> float | None:
        started = cls._parse_timestamp(started_at)
        ended = cls._parse_timestamp(completed_at) if completed_at else datetime.now(timezone.utc)
        if started is None or ended is None:
            return None
        return max(0.0, round((ended - started).total_seconds() * 1000.0, 3))

    @classmethod
    def _pipeline_counts(cls, stages: list[dict], previous: dict | None = None) -> dict:
        previous = previous if isinstance(previous, dict) else {}
        total_stages = previous.get("total_stages")
        try:
            total_stages = int(total_stages) if total_stages is not None else len(stages)
        except (TypeError, ValueError):
            total_stages = len(stages)
        return {
            "total_stages": max(len(stages), total_stages),
            "completed": sum(str(stage.get("status") or "").lower() in cls._COMPLETE_STATUSES for stage in stages),
            "pending": sum(str(stage.get("status") or "").lower() in cls._PENDING_STATUSES for stage in stages),
            "not_run": sum(str(stage.get("status") or "").lower() == "not_run" for stage in stages),
            "failed": sum(str(stage.get("status") or "").lower() in cls._FAILED_STATUSES for stage in stages),
        }

    @classmethod
    def _build_run_report(cls, run: dict) -> dict:
        stages = list(run.get("stages") or [])
        stage_rows = [
            {
                "number": stage.get("number"),
                "id": stage.get("id"),
                "name": stage.get("name"),
                "status": stage.get("status"),
                "started_at": stage.get("started_at"),
                "completed_at": stage.get("completed_at"),
                "duration_ms": stage.get("duration_ms"),
                "outcome": stage.get("outcome"),
                "error": stage.get("error"),
            }
            for stage in stages
        ]
        completed = [row for row in stage_rows if str(row.get("status") or "").lower() in cls._COMPLETE_STATUSES]
        failed = [row for row in stage_rows if str(row.get("status") or "").lower() in cls._FAILED_STATUSES]
        not_run = [row for row in stage_rows if str(row.get("status") or "").lower() == "not_run"]
        unresolved = [row for row in stage_rows if str(row.get("status") or "").lower() in cls._PENDING_STATUSES]
        acquisition = run.get("acquisition") if isinstance(run.get("acquisition"), dict) else {}
        testing = run.get("testing") if isinstance(run.get("testing"), dict) else {}
        diarization = acquisition.get("diarization") if isinstance(acquisition.get("diarization"), dict) else {}
        return {
            "report_type": "voxvector_run_execution_report",
            "report_version": 1,
            "run_id": run.get("run_id"),
            "analysis_id": run.get("analysis_id"),
            "request_id": run.get("request_id"),
            "source_id": run.get("source_id"),
            "status": run.get("status"),
            "pipeline_version": run.get("pipeline_version"),
            "source_revision": run.get("source_revision") or testing.get("source_revision"),
            "process_instance_id": run.get("process_instance_id"),
            "timing": {
                "started_at": run.get("started_at"),
                "completed_at": run.get("completed_at"),
                "elapsed_ms": run.get("elapsed_ms"),
                "pipeline_duration_ms": run.get("pipeline_duration_ms"),
            },
            "pipeline_build": run.get("pipeline_build") or cls._pipeline_counts(stages),
            "current_stage": run.get("current_stage"),
            "error": run.get("error"),
            "provider_state": {
                "transcription_state": acquisition.get("transcription_state"),
                "diarization_state": acquisition.get("diarization_state"),
                "provider_timings_ms": run.get("provider_timings_ms") or acquisition.get("provider_timings_ms") or {},
                "diarization_provenance": diarization.get("provenance") if isinstance(diarization, dict) else None,
                "acquisition_errors": acquisition.get("errors") or [],
                "acquisition_limitations": acquisition.get("limitations") or [],
            },
            "completed_work": completed,
            "failed_work": failed,
            "not_run_work": not_run,
            "unresolved_work": unresolved,
            "stage_states": stage_rows,
        }

    @staticmethod
    def _runtime_source_revision() -> str | None:
        for key in ("VOXVECTOR_SOURCE_REVISION", "RENDER_GIT_COMMIT", "GITHUB_SHA"):
            value = os.getenv(key, "").strip()
            if value:
                return value
        return None

    @classmethod
    def _finalize_run_metadata(cls, run: dict) -> dict:
        testing = run.get("testing") if isinstance(run.get("testing"), dict) else {}
        if not run.get("source_revision") and testing.get("source_revision"):
            run["source_revision"] = testing.get("source_revision")
        run["elapsed_ms"] = cls._elapsed_ms(run.get("started_at"), run.get("completed_at"))
        status = str(run.get("status") or "").lower()
        if status not in cls._PENDING_STATUSES:
            stages = list(run.get("stages") or [])
            if stages:
                run["pipeline_build"] = cls._pipeline_counts(stages, run.get("pipeline_build"))
            run["run_report"] = cls._build_run_report(run)
            if status in {"failed", "completed_with_failures", "interrupted"} or run.get("error"):
                run["failure_report"] = run["run_report"]
        return run

    @staticmethod
    def _metadata_snapshot(run: dict) -> tuple:
        return (
            run.get("source_revision"),
            run.get("elapsed_ms"),
            run.get("pipeline_build"),
            run.get("run_report"),
            run.get("failure_report"),
        )

    @classmethod
    def _terminalize_pending_stages(
        cls,
        run: dict,
        *,
        completed_at: str,
        current_stage_id: str,
        error_type: str,
        reason: str,
    ) -> None:
        for stage in run.get("stages", []):
            status = str(stage.get("status") or "").lower()
            if status not in cls._PENDING_STATUSES:
                continue
            stage_id = str(stage.get("id") or "")
            if stage_id == current_stage_id:
                stage["status"] = "failed"
                stage["outcome"] = reason
                stage["error"] = f"{error_type}: {reason}"
            else:
                stage["status"] = "not_run"
                stage["outcome"] = f"not run because analysis was interrupted before this stage could complete: {reason}"
                stage["error"] = None
            stage["completed_at"] = completed_at
            if stage.get("duration_ms") is None:
                stage["duration_ms"] = cls._elapsed_ms(stage.get("started_at"), completed_at)

    @classmethod
    def _reconcile_case_payload(
        cls,
        case: dict,
        *,
        current_process_id: str | None,
        stale_after_seconds: float,
        deadline_grace_seconds: float,
    ) -> bool:
        now = datetime.now(timezone.utc)
        changed = False

        for run in case.get("runs", []):
            if str(run.get("status") or "").lower() != "running":
                before = cls._metadata_snapshot(run)
                cls._finalize_run_metadata(run)
                if cls._metadata_snapshot(run) != before:
                    changed = True
                continue

            process_id = str(run.get("process_instance_id") or "").strip()
            current_stage = run.get("current_stage") if isinstance(run.get("current_stage"), dict) else {}
            stage_id = str(current_stage.get("id") or "").strip()
            stage = next(
                (item for item in run.get("stages", []) if item.get("id") == stage_id),
                None,
            )
            stage_started = cls._parse_timestamp((stage or {}).get("started_at"))
            run_started = cls._parse_timestamp(run.get("started_at"))
            activity_started = stage_started or run_started
            timeout_seconds = current_stage.get("timeout_seconds")
            try:
                timeout_seconds = float(timeout_seconds) if timeout_seconds is not None else None
            except (TypeError, ValueError):
                timeout_seconds = None

            process_interrupted = bool(
                current_process_id
                and process_id
                and process_id != current_process_id
            )
            usable_deadline = bool(
                stage_started is not None
                and timeout_seconds is not None
                and timeout_seconds > 0
            )
            deadline_expired = bool(
                usable_deadline
                and now >= stage_started + timedelta(seconds=timeout_seconds + max(0.0, deadline_grace_seconds))
            )
            stale_expired = bool(
                activity_started is not None
                and not process_id
                and not usable_deadline
                and now >= activity_started + timedelta(seconds=max(60.0, stale_after_seconds))
            )

            if not (process_interrupted or deadline_expired or stale_expired):
                run["elapsed_ms"] = cls._elapsed_ms(run.get("started_at"))
                continue

            if process_interrupted:
                error_type = "ProcessInterrupted"
                reason = "analysis worker restarted before the persisted stage completed"
            elif deadline_expired:
                error_type = "ExecutionDeadlineExceeded"
                reason = "persisted stage exceeded its execution deadline without a terminal update"
            else:
                error_type = "StaleRunRecovered"
                reason = "running analysis exceeded the stale-run recovery threshold without usable worker/deadline evidence"

            completed_at = cls._now()
            cls._terminalize_pending_stages(
                run,
                completed_at=completed_at,
                current_stage_id=stage_id,
                error_type=error_type,
                reason=reason,
            )
            run["status"] = "failed"
            run["completed_at"] = completed_at
            run["current_stage"] = {
                **current_stage,
                "status": "failed",
                "completed_at": completed_at,
                "outcome": reason,
            }
            run["error"] = {
                "error_type": error_type,
                "message": reason,
                "reconciled_at": completed_at,
                "previous_process_instance_id": process_id or None,
                "current_process_instance_id": current_process_id,
            }
            cls._finalize_run_metadata(run)
            changed = True

        current_run_id = case.get("current_run_id")
        current_run = next(
            (item for item in case.get("runs", []) if item.get("run_id") == current_run_id),
            None,
        )
        if current_run is not None:
            current_status = current_run.get("status", "failed")
            if case.get("status") != current_status:
                case["status"] = current_status
                changed = True
        return changed

    def _read_case(self, user_id: str, case_id: str) -> dict:
        try:
            case = self.storage.get_json(self._case_path(user_id, case_id))
        except StorageError as exc:
            raise CaseNotFound("Analysis case not found") from exc
        if case.get("owner_id") != user_id:
            raise CaseNotFound("Analysis case not found")
        return case

    def create_case(self, user_id: str, title: str | None = None) -> dict:
        case_id = str(uuid4())
        now = self._now()
        case = {
            "case_id": case_id,
            "owner_id": user_id,
            "title": (title or "Untitled analysis").strip()[:160] or "Untitled analysis",
            "status": "created",
            "created_at": now,
            "updated_at": now,
            "current_run_id": None,
            "sources": [],
            "runs": [],
        }
        self.storage.put_json(self._case_path(user_id, case_id), case)
        return case

    def get_case(self, user_id: str, case_id: str) -> dict:
        return self._read_case(user_id, case_id)

    def reconcile_interrupted_runs(
        self,
        user_id: str,
        case_id: str,
        *,
        current_process_id: str,
        stale_after_seconds: float = 420.0,
        deadline_grace_seconds: float = 30.0,
    ) -> dict:
        """Convert orphaned persisted `running` runs into explicit interrupted failures.

        New runs carry a process identity and stage deadline. A process identity change is
        definitive evidence that the worker which owned the run no longer exists. Case
        history can also recover a run after its stage deadline, while the conservative
        stale fallback is reserved for legacy runs without worker/deadline evidence.
        """
        case = self._read_case(user_id, case_id)
        changed = self._reconcile_case_payload(
            case,
            current_process_id=current_process_id,
            stale_after_seconds=stale_after_seconds,
            deadline_grace_seconds=deadline_grace_seconds,
        )
        if changed:
            case["updated_at"] = self._now()
            self.storage.put_json(self._case_path(user_id, case_id), case)
        return case

    def list_cases(
        self,
        user_id: str,
        limit: int = 50,
        *,
        stale_after_seconds: float = 420.0,
        deadline_grace_seconds: float = 30.0,
    ) -> list[dict]:
        bounded_limit = max(1, min(limit, 100))
        entries = self.storage.list_json(f"cases/{user_id}", bounded_limit)
        paths = [
            f"cases/{user_id}/{str(entry.get('name', ''))}"
            for entry in entries
            if str(entry.get("name", "")).endswith(".json")
        ]
        if not paths:
            return []

        workers = min(8, len(paths))
        cases: list[dict] = []
        with ThreadPoolExecutor(max_workers=workers, thread_name_prefix="voxvector-case-list") as executor:
            futures = {
                executor.submit(self.storage.get_json, path): path
                for path in paths
            }
            for future in as_completed(futures):
                path = futures[future]
                try:
                    case = future.result()
                except StorageError:
                    continue
                if case.get("owner_id") != user_id:
                    continue
                changed = self._reconcile_case_payload(
                    case,
                    current_process_id=None,
                    stale_after_seconds=stale_after_seconds,
                    deadline_grace_seconds=deadline_grace_seconds,
                )
                if changed:
                    case["updated_at"] = self._now()
                    try:
                        self.storage.put_json(path, case)
                    except StorageError:
                        pass
                cases.append(case)

        cases.sort(key=lambda item: str(item.get("updated_at", "")), reverse=True)
        return cases[:bounded_limit]

    def add_source(self, user_id: str, case_id: str, filename: str, data: bytes, metadata: dict) -> dict:
        case = self._read_case(user_id, case_id)
        source_id = str(uuid4())
        storage_path = self._source_path(user_id, case_id, source_id)
        self.storage.put_bytes(storage_path, data, "audio/wav")
        source = {
            "source_id": source_id,
            "filename": filename,
            "media_path": storage_path,
            "sha256": sha256(data).hexdigest(),
            "bytes": len(data),
            **metadata,
            "created_at": self._now(),
        }
        case["sources"].append(source)
        case["status"] = "source_ready"
        case["updated_at"] = self._now()
        self.storage.put_json(self._case_path(user_id, case_id), case)
        return source

    def get_source(self, user_id: str, case_id: str, source_id: str) -> tuple[dict, dict]:
        case = self._read_case(user_id, case_id)
        source = next((item for item in case.get("sources", []) if item.get("source_id") == source_id), None)
        if source is None:
            raise CaseNotFound("Analysis source not found")
        return case, source

    def update_run(self, user_id: str, case_id: str, run: dict) -> dict:
        case = self._read_case(user_id, case_id)
        incoming = dict(run)
        existing = next(
            (item for item in case.get("runs", []) if item.get("run_id") == incoming.get("run_id")),
            None,
        )
        if not incoming.get("source_revision"):
            testing = incoming.get("testing") if isinstance(incoming.get("testing"), dict) else {}
            if existing is not None:
                incoming["source_revision"] = existing.get("source_revision") or testing.get("source_revision")
            else:
                incoming["source_revision"] = testing.get("source_revision") or self._runtime_source_revision()
        run = self._finalize_run_metadata(incoming)
        runs = [item for item in case.get("runs", []) if item.get("run_id") != run.get("run_id")]
        runs.append(run)
        case["runs"] = runs[-50:]
        case["current_run_id"] = run.get("run_id")
        case["status"] = run.get("status", "processing")
        case["updated_at"] = self._now()
        self.storage.put_json(self._case_path(user_id, case_id), case)
        return case

    def delete_case(self, user_id: str, case_id: str) -> dict:
        case = self._read_case(user_id, case_id)
        requested_at = self._now()
        deletion_id = str(uuid4())
        sources = [source for source in case.get("sources", []) if isinstance(source, dict)]
        media_paths: list[str] = []
        source_refs: list[dict] = []
        for source in sources:
            path = str(source.get("media_path") or "").strip()
            if path and path not in media_paths:
                media_paths.append(path)
            source_refs.append(
                {
                    "source_id": source.get("source_id"),
                    "sha256": source.get("sha256"),
                }
            )

        receipt = {
            "schema": "voxvector.case_deletion_receipt.v1",
            "deletion_id": deletion_id,
            "case_id": case_id,
            "actor_id": user_id,
            "status": "requested",
            "requested_at": requested_at,
            "completed_at": None,
            "source_revision": self._runtime_source_revision(),
            "source_count": len(sources),
            "media_object_count": len(media_paths),
            "media_deleted": 0,
            "case_record_deleted": False,
            "failed_boundary": None,
            "error_type": None,
            "source_refs": source_refs,
        }
        try:
            self._persist_deletion_receipt(receipt)
        except StorageError as exc:
            raise CaseDeletionError(
                "Deletion audit receipt could not be initialized; no case data was deleted",
                receipt={**receipt, "status": "audit_initialization_failed", "failed_boundary": "audit_receipt"},
            ) from exc

        for path in media_paths:
            try:
                self.storage.delete_bytes(path)
                receipt["media_deleted"] += 1
            except StorageError as exc:
                receipt.update(
                    {
                        "status": "failed",
                        "failed_boundary": "media_object",
                        "error_type": type(exc).__name__,
                        "completed_at": self._now(),
                    }
                )
                try:
                    self._persist_deletion_receipt(receipt)
                except StorageError:
                    pass
                raise CaseDeletionError(
                    "Secure case deletion stopped because a persisted media object could not be deleted",
                    receipt=receipt,
                ) from exc

        try:
            self.storage.delete_json(self._case_path(user_id, case_id))
            receipt["case_record_deleted"] = True
        except StorageError as exc:
            receipt.update(
                {
                    "status": "failed",
                    "failed_boundary": "case_record",
                    "error_type": type(exc).__name__,
                    "completed_at": self._now(),
                }
            )
            try:
                self._persist_deletion_receipt(receipt)
            except StorageError:
                pass
            raise CaseDeletionError(
                "Secure case deletion removed source media but could not remove the case record",
                receipt=receipt,
            ) from exc

        receipt.update(
            {
                "status": "completed",
                "completed_at": self._now(),
                "failed_boundary": None,
                "error_type": None,
            }
        )
        try:
            self._persist_deletion_receipt(receipt)
        except StorageError as exc:
            receipt.update(
                {
                    "status": "deleted_audit_finalize_failed",
                    "failed_boundary": "audit_receipt_finalize",
                    "error_type": type(exc).__name__,
                }
            )
            raise CaseDeletionError(
                "Case data was deleted but the final deletion audit receipt could not be persisted",
                receipt=receipt,
            ) from exc

        return {
            "case_id": case_id,
            "deleted_sources": len(media_paths),
            "deletion_receipt": receipt,
        }
