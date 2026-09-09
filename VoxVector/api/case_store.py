from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from hashlib import sha256
from uuid import uuid4

from .storage import StorageError


class CaseNotFound(StorageError):
    """Raised when a case or source is not available to the authenticated owner."""


class CaseStore:
    """Case-centric persistence built on the existing private Supabase Storage backend."""

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
        definitive evidence that the worker which owned the run no longer exists. Older
        persisted runs that predate process identity are recovered only after a conservative
        age threshold so normal long-running work is not mislabeled.
        """
        case = self._read_case(user_id, case_id)
        now = datetime.now(timezone.utc)
        changed = False

        for run in case.get("runs", []):
            if str(run.get("status") or "").lower() != "running":
                continue

            process_id = str(run.get("process_instance_id") or "").strip()
            current_stage = run.get("current_stage") if isinstance(run.get("current_stage"), dict) else {}
            stage_id = str(current_stage.get("id") or "").strip()
            stage = next(
                (item for item in run.get("stages", []) if item.get("id") == stage_id),
                None,
            )
            stage_started = self._parse_timestamp((stage or {}).get("started_at"))
            run_started = self._parse_timestamp(run.get("started_at"))
            timeout_seconds = current_stage.get("timeout_seconds")
            try:
                timeout_seconds = float(timeout_seconds) if timeout_seconds is not None else None
            except (TypeError, ValueError):
                timeout_seconds = None

            process_interrupted = bool(process_id and process_id != current_process_id)
            deadline_expired = bool(
                stage_started is not None
                and timeout_seconds is not None
                and timeout_seconds > 0
                and now >= stage_started + timedelta(seconds=timeout_seconds + max(0.0, deadline_grace_seconds))
            )
            legacy_stale = bool(
                not process_id
                and run_started is not None
                and now >= run_started + timedelta(seconds=max(60.0, stale_after_seconds))
            )
            if not (process_interrupted or deadline_expired or legacy_stale):
                continue

            if process_interrupted:
                error_type = "ProcessInterrupted"
                reason = "analysis worker restarted before the persisted stage completed"
            elif deadline_expired:
                error_type = "ExecutionDeadlineExceeded"
                reason = "persisted stage exceeded its execution deadline without a terminal update"
            else:
                error_type = "StaleRunRecovered"
                reason = "legacy running analysis exceeded the stale-run recovery threshold"

            completed_at = self._now()
            if isinstance(stage, dict) and str(stage.get("status") or "").lower() in {
                "running",
                "processing",
                "in_progress",
                "pending",
            }:
                stage.update(
                    {
                        "status": "failed",
                        "completed_at": completed_at,
                        "outcome": reason,
                        "error": f"{error_type}: {reason}",
                    }
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
            changed = True

        if changed:
            current_run_id = case.get("current_run_id")
            current_run = next(
                (item for item in case.get("runs", []) if item.get("run_id") == current_run_id),
                None,
            )
            if current_run is not None:
                case["status"] = current_run.get("status", "failed")
            case["updated_at"] = self._now()
            self.storage.put_json(self._case_path(user_id, case_id), case)
        return case

    def list_cases(self, user_id: str, limit: int = 50) -> list[dict]:
        bounded_limit = max(1, min(limit, 100))
        entries = self.storage.list_json(f"cases/{user_id}", bounded_limit)
        paths = [
            f"cases/{user_id}/{str(entry.get('name', ''))}"
            for entry in entries
            if str(entry.get("name", "")).endswith(".json")
        ]
        if not paths:
            return []

        # Storage listing returns object metadata, not the case payload. Fetching each
        # case sequentially amplified Supabase round-trip latency into multi-second
        # archive refreshes. Keep the same storage model but bound concurrent reads.
        workers = min(8, len(paths))
        cases: list[dict] = []
        with ThreadPoolExecutor(max_workers=workers, thread_name_prefix="voxvector-case-list") as executor:
            futures = [executor.submit(self.storage.get_json, path) for path in paths]
            for future in as_completed(futures):
                try:
                    case = future.result()
                except StorageError:
                    continue
                if case.get("owner_id") == user_id:
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
        media_paths = []
        for source in case.get("sources", []):
            path = str(source.get("media_path") or "").strip()
            if path and path not in media_paths:
                media_paths.append(path)

        for path in media_paths:
            self.storage.delete_bytes(path)
        self.storage.delete_json(self._case_path(user_id, case_id))
        return {
            "case_id": case_id,
            "deleted_sources": len(media_paths),
        }
