from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
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
