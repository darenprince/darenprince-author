from __future__ import annotations

from datetime import datetime, timedelta, timezone

from api.case_store import CaseNotFound, CaseStore
from api.storage import StorageError


class FakeStorage:
    def __init__(self):
        self.json = {}
        self.media = {}

    def put_json(self, path, payload):
        self.json[path] = payload
        return f"voxvector-logs/{path}"

    def get_json(self, path):
        if path not in self.json:
            raise StorageError("missing")
        return self.json[path]

    def list_json(self, prefix, limit=100, offset=0):
        prefix = prefix.rstrip("/") + "/"
        names = sorted(path[len(prefix):] for path in self.json if path.startswith(prefix))
        return [{"name": name} for name in names[:limit]]

    def put_bytes(self, path, body, content_type="application/octet-stream"):
        self.media[path] = body
        return f"voxvector-media/{path}"

    def delete_json(self, path):
        self.json.pop(path, None)

    def delete_bytes(self, path):
        self.media.pop(path, None)


def test_case_creation_and_source_persistence():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Interview case")

    source = store.add_source(
        "user-1",
        case["case_id"],
        "sample.wav",
        b"RIFF sample",
        {"sample_rate": 48000, "duration_seconds": 2.0},
    )

    loaded = store.get_case("user-1", case["case_id"])
    assert loaded["status"] == "source_ready"
    assert loaded["sources"][0]["source_id"] == source["source_id"]
    assert source["sha256"]
    assert source["media_path"].startswith("media/user-1/")
    assert source["media_path"] in storage.media


def test_case_ownership_is_enforced():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1")

    try:
        store.get_case("user-2", case["case_id"])
    except CaseNotFound:
        return
    raise AssertionError("cross-user case access must be rejected")


def test_case_list_returns_owner_cases_sorted_by_updated_at():
    storage = FakeStorage()
    store = CaseStore(storage)
    first = store.create_case("user-1", "First")
    second = store.create_case("user-1", "Second")
    other = store.create_case("user-2", "Other")

    storage.json[f"cases/user-1/{first['case_id']}.json"]["updated_at"] = "2026-09-05T00:00:00+00:00"
    storage.json[f"cases/user-1/{second['case_id']}.json"]["updated_at"] = "2026-09-05T01:00:00+00:00"

    cases = store.list_cases("user-1", limit=50)

    assert [item["case_id"] for item in cases] == [second["case_id"], first["case_id"]]
    assert other["case_id"] not in {item["case_id"] for item in cases}


def test_case_delete_removes_case_record_and_source_media():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Delete me")
    source = store.add_source(
        "user-1",
        case["case_id"],
        "sample.wav",
        b"RIFF sample",
        {"sample_rate": 48000, "duration_seconds": 2.0},
    )

    result = store.delete_case("user-1", case["case_id"])

    assert result == {"case_id": case["case_id"], "deleted_sources": 1}
    assert f"cases/user-1/{case['case_id']}.json" not in storage.json
    assert source["media_path"] not in storage.media
    try:
        store.get_case("user-1", case["case_id"])
    except CaseNotFound:
        return
    raise AssertionError("deleted cases must no longer be readable")


def test_case_delete_rejects_cross_user_request():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Protected")

    try:
        store.delete_case("user-2", case["case_id"])
    except CaseNotFound:
        pass
    else:
        raise AssertionError("cross-user case deletion must be rejected")

    assert f"cases/user-1/{case['case_id']}.json" in storage.json


def _persist_running_run(store, storage, case, *, process_instance_id=None, started_at="2026-01-01T00:00:00+00:00", timeout_seconds=180):
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
    run = {
        "run_id": "run-1",
        "analysis_id": "run-1",
        "request_id": "request-1",
        "status": "running",
        "started_at": started_at,
        "completed_at": None,
        "source_id": "source-1",
        "process_instance_id": process_instance_id,
        "current_stage": {
            "id": "transcription_generation",
            "name": "Transcription Generation",
            "status": "running",
            "timeout_seconds": timeout_seconds,
        },
        "stages": [stage],
    }
    store.update_run("user-1", case["case_id"], run)
    return storage.json[f"cases/user-1/{case['case_id']}.json"]


def test_case_reconcile_marks_run_interrupted_when_worker_identity_changes():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Interrupted")
    _persist_running_run(store, storage, case, process_instance_id="old-worker", started_at="2099-01-01T00:00:00+00:00")

    reconciled = store.reconcile_interrupted_runs(
        "user-1",
        case["case_id"],
        current_process_id="new-worker",
    )

    run = reconciled["runs"][0]
    assert run["status"] == "failed"
    assert run["error"]["error_type"] == "ProcessInterrupted"
    assert run["stages"][0]["status"] == "failed"
    assert reconciled["status"] == "failed"


def test_case_reconcile_recovers_legacy_stale_running_run():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Legacy stale")
    _persist_running_run(
        store,
        storage,
        case,
        process_instance_id=None,
        started_at="2020-01-01T00:00:00+00:00",
        timeout_seconds=None,
    )

    reconciled = store.reconcile_interrupted_runs(
        "user-1",
        case["case_id"],
        current_process_id="current-worker",
        stale_after_seconds=420,
    )

    assert reconciled["runs"][0]["status"] == "failed"
    assert reconciled["runs"][0]["error"]["error_type"] == "StaleRunRecovered"


def test_case_reconcile_keeps_current_worker_run_active_before_deadline():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Active")
    stored = _persist_running_run(store, storage, case, process_instance_id="current-worker", started_at="2099-01-01T00:00:00+00:00")

    reconciled = store.reconcile_interrupted_runs(
        "user-1",
        case["case_id"],
        current_process_id="current-worker",
    )

    assert reconciled["runs"][0]["status"] == "running"
    assert reconciled["runs"][0].get("error") is None
    assert stored["runs"][0]["status"] == "running"


def test_case_list_reconciles_stale_history_and_terminalizes_pending_stages():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Stuck history")
    stored = _persist_running_run(
        store,
        storage,
        case,
        process_instance_id="old-worker",
        started_at="2020-01-01T00:00:00+00:00",
        timeout_seconds=180,
    )
    stored_run = stored["runs"][0]
    stored_run["pipeline_build"] = {
        "total_stages": 21,
        "completed": 0,
        "pending": 21,
        "not_run": 0,
        "failed": 0,
    }
    stored_run["stages"].append(
        {
            "number": 8,
            "id": "transcript_alignment",
            "name": "Transcript Alignment",
            "status": "pending",
            "started_at": None,
            "completed_at": None,
            "duration_ms": None,
            "outcome": None,
            "error": None,
        }
    )

    cases = store.list_cases("user-1", limit=50, stale_after_seconds=420)
    run = next(item for item in cases if item["case_id"] == case["case_id"])["runs"][0]

    assert run["status"] == "failed"
    assert run["error"]["error_type"] in {"ExecutionDeadlineExceeded", "StaleRunRecovered"}
    assert run["pipeline_build"]["total_stages"] == 21
    assert run["pipeline_build"]["pending"] == 0
    assert run["stages"][0]["status"] == "failed"
    assert run["stages"][1]["status"] == "not_run"
    assert run["failure_report"]["run_id"] == "run-1"
    assert run["failure_report"]["request_id"] == "request-1"
    assert run["failure_report"]["unresolved_work"] == []
    assert run["failure_report"]["failed_work"]
    assert run["failure_report"]["not_run_work"]
    assert run["elapsed_ms"] > 0


def test_case_list_reports_live_elapsed_time_without_terminalizing_fresh_run():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Live")
    started_at = (datetime.now(timezone.utc) - timedelta(seconds=2)).isoformat()
    _persist_running_run(
        store,
        storage,
        case,
        process_instance_id="current-worker",
        started_at=started_at,
        timeout_seconds=180,
    )

    cases = store.list_cases("user-1", stale_after_seconds=420)
    run = next(item for item in cases if item["case_id"] == case["case_id"])["runs"][0]

    assert run["status"] == "running"
    assert run["elapsed_ms"] >= 1000
    assert run.get("failure_report") is None


def test_terminal_run_persists_execution_and_failure_report(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_SOURCE_REVISION", "test-revision-123")
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Partial completion")
    started_at = (datetime.now(timezone.utc) - timedelta(seconds=5)).isoformat()
    completed_at = datetime.now(timezone.utc).isoformat()

    updated = store.update_run(
        "user-1",
        case["case_id"],
        {
            "run_id": "run-report",
            "analysis_id": "run-report",
            "request_id": "request-report",
            "status": "completed_with_failures",
            "started_at": started_at,
            "completed_at": completed_at,
            "source_id": "source-report",
            "pipeline_build": {"total_stages": 21},
            "stages": [
                {
                    "number": 6,
                    "id": "speaker_identification_diarization",
                    "name": "Speaker Identification / Diarization",
                    "status": "failed",
                    "started_at": started_at,
                    "completed_at": completed_at,
                    "duration_ms": 5000,
                    "outcome": "diarization unavailable; independent downstream work continued",
                    "error": "TimeoutError: provider deadline exceeded",
                },
                {
                    "number": 10,
                    "id": "acoustic_feature_extraction",
                    "name": "Acoustic Feature Extraction",
                    "status": "complete",
                    "started_at": started_at,
                    "completed_at": completed_at,
                    "duration_ms": 220,
                    "outcome": "independent observational analysis completed",
                    "error": None,
                },
            ],
            "acquisition": {
                "transcription_state": "completed",
                "diarization_state": "unavailable",
                "limitations": ["Diarization provider unavailable: TimeoutError."],
                "provider_timings_ms": {"diarization": 5000, "transcription": 1200},
            },
        },
    )
    run = updated["runs"][0]

    assert run["source_revision"] == "test-revision-123"
    assert run["elapsed_ms"] >= 4000
    assert run["run_report"]["status"] == "completed_with_failures"
    assert run["failure_report"]["source_revision"] == "test-revision-123"
    assert run["failure_report"]["failed_work"][0]["id"] == "speaker_identification_diarization"
    assert run["failure_report"]["completed_work"][0]["id"] == "acoustic_feature_extraction"
    assert run["failure_report"]["provider_state"]["acquisition_limitations"]


def test_case_history_respects_longer_persisted_deadline_before_stale_threshold():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Long provider")
    started_at = (datetime.now(timezone.utc) - timedelta(seconds=500)).isoformat()
    _persist_running_run(
        store,
        storage,
        case,
        process_instance_id="current-worker",
        started_at=started_at,
        timeout_seconds=600,
    )

    cases = store.list_cases("user-1", stale_after_seconds=420, deadline_grace_seconds=30)
    run = next(item for item in cases if item["case_id"] == case["case_id"])["runs"][0]

    assert run["status"] == "running"
    assert run.get("error") is None


def test_historical_terminal_run_does_not_inherit_reader_runtime_revision(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_SOURCE_REVISION", "reader-runtime-sha")
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Historical")
    case_path = f"cases/user-1/{case['case_id']}.json"
    started_at = "2026-01-01T00:00:00+00:00"
    completed_at = "2026-01-01T00:00:05+00:00"
    storage.json[case_path]["status"] = "failed"
    storage.json[case_path]["current_run_id"] = "legacy-run"
    storage.json[case_path]["runs"] = [{
        "run_id": "legacy-run",
        "analysis_id": "legacy-run",
        "request_id": "legacy-request",
        "status": "failed",
        "started_at": started_at,
        "completed_at": completed_at,
        "source_id": "legacy-source",
        "stages": [],
        "error": {"error_type": "LegacyFailure", "message": "historical"},
    }]

    cases = store.list_cases("user-1")
    run = next(item for item in cases if item["case_id"] == case["case_id"])["runs"][0]

    assert run.get("source_revision") is None
    assert run["run_report"]["source_revision"] is None
    assert storage.json[case_path]["runs"][0].get("source_revision") is None


def test_case_history_persists_terminal_metadata_backfill():
    storage = FakeStorage()
    store = CaseStore(storage)
    case = store.create_case("user-1", "Backfill")
    case_path = f"cases/user-1/{case['case_id']}.json"
    started_at = "2026-01-01T00:00:00+00:00"
    completed_at = "2026-01-01T00:00:03+00:00"
    storage.json[case_path]["status"] = "failed"
    storage.json[case_path]["current_run_id"] = "old-terminal"
    storage.json[case_path]["runs"] = [{
        "run_id": "old-terminal",
        "analysis_id": "old-terminal",
        "request_id": "old-request",
        "status": "failed",
        "started_at": started_at,
        "completed_at": completed_at,
        "source_id": "old-source",
        "stages": [],
        "error": {"error_type": "OldFailure", "message": "old failure"},
    }]

    store.list_cases("user-1")
    persisted = storage.json[case_path]["runs"][0]

    assert persisted["elapsed_ms"] == 3000.0
    assert persisted["run_report"]["run_id"] == "old-terminal"
    assert persisted["failure_report"]["request_id"] == "old-request"
