from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
from threading import Event, Lock, Thread, current_thread
from time import sleep

from api.case_store import CaseStore
from api.storage import StorageError


class CoordinatedStorage:
    """Remote-object-store stand-in that returns detached JSON snapshots."""

    def __init__(self):
        self.json: dict[str, dict] = {}
        self.media: dict[str, bytes] = {}
        self._guard = Lock()
        self.block_history_reads = False
        self.history_read_started = Event()
        self.release_history_read = Event()

    def put_json(self, path, payload):
        with self._guard:
            self.json[path] = deepcopy(payload)
        return f"voxvector-logs/{path}"

    def get_json(self, path):
        with self._guard:
            if path not in self.json:
                raise StorageError("missing")
            payload = deepcopy(self.json[path])
        if self.block_history_reads and current_thread().name.startswith("voxvector-case-list"):
            self.history_read_started.set()
            if not self.release_history_read.wait(timeout=2):
                raise AssertionError("history read was not released")
        return payload

    def list_json(self, prefix, limit=100, offset=0):
        prefix = prefix.rstrip("/") + "/"
        with self._guard:
            names = sorted(path[len(prefix):] for path in self.json if path.startswith(prefix))
        return [{"name": name} for name in names[offset:offset + limit]]

    def put_bytes(self, path, body, content_type="application/octet-stream"):
        with self._guard:
            self.media[path] = body
        return f"voxvector-media/{path}"

    def delete_json(self, path):
        with self._guard:
            self.json.pop(path, None)

    def delete_bytes(self, path):
        with self._guard:
            self.media.pop(path, None)


def _running_run() -> dict:
    started_at = "2020-01-01T00:00:00+00:00"
    stage = {
        "number": 7,
        "id": "transcription_generation",
        "name": "Transcription Generation",
        "status": "running",
        "started_at": started_at,
        "completed_at": None,
        "duration_ms": None,
        "outcome": "provider-backed evidence acquisition started",
        "error": None,
    }
    return {
        "run_id": "run-race",
        "analysis_id": "run-race",
        "request_id": "request-race",
        "status": "running",
        "started_at": started_at,
        "completed_at": None,
        "source_id": "source-race",
        "process_instance_id": None,
        "current_stage": {
            "id": "transcription_generation",
            "name": "Transcription Generation",
            "status": "running",
            "timeout_seconds": None,
        },
        "stages": [stage],
    }


def _completed_run() -> dict:
    completed_at = datetime.now(timezone.utc).isoformat()
    run = _running_run()
    run.update(
        {
            "status": "completed",
            "completed_at": completed_at,
            "current_stage": {
                "id": "transcription_generation",
                "name": "Transcription Generation",
                "status": "completed",
                "completed_at": completed_at,
            },
            "artifacts": {"final_result": "preserved"},
        }
    )
    run["stages"][0].update(
        {
            "status": "completed",
            "completed_at": completed_at,
            "duration_ms": 1000,
            "outcome": "transcription persisted",
        }
    )
    return run


def test_history_reconciliation_cannot_overwrite_newer_live_run_update():
    storage = CoordinatedStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Concurrent history")
    case_id = case["case_id"]
    case_path = f"cases/user-1/{case_id}.json"
    store.update_run("user-1", case_id, _running_run())

    storage.block_history_reads = True
    history_result: list[list[dict]] = []
    writer_started = Event()
    writer_done = Event()
    errors: list[BaseException] = []

    def read_history():
        try:
            history_result.append(store.list_cases("user-1", stale_after_seconds=60))
        except BaseException as exc:  # pragma: no cover - failure capture for the thread
            errors.append(exc)

    def write_newer_run():
        writer_started.set()
        try:
            store.update_run("user-1", case_id, _completed_run())
        except BaseException as exc:  # pragma: no cover - failure capture for the thread
            errors.append(exc)
        finally:
            writer_done.set()

    history_thread = Thread(target=read_history, name="history-request")
    history_thread.start()
    assert storage.history_read_started.wait(timeout=2)

    writer_thread = Thread(target=write_newer_run, name="analysis-writer")
    writer_thread.start()
    assert writer_started.wait(timeout=1)
    sleep(0.05)
    assert not writer_done.is_set(), "live run update must wait while history owns the case mutation lock"

    storage.release_history_read.set()
    history_thread.join(timeout=2)
    writer_thread.join(timeout=2)

    assert not history_thread.is_alive()
    assert not writer_thread.is_alive()
    assert errors == []
    assert history_result

    persisted = storage.get_json(case_path)
    persisted_run = next(run for run in persisted["runs"] if run["run_id"] == "run-race")
    assert persisted_run["status"] == "completed"
    assert persisted_run["artifacts"] == {"final_result": "preserved"}
    assert persisted_run["run_report"]["status"] == "completed"
