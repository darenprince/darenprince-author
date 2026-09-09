import asyncio
import json

from api.observability import DiagnosticStore
from api.storage import StorageError


class FakeStorage:
    def __init__(self):
        self.records = []
        self.table_rows = []

    @property
    def configured(self):
        return True

    def status(self):
        return "configured"

    def insert_table_row(self, table, payload):
        self.table_rows.append((table, payload))
        return payload

    def put_json(self, object_path, payload):
        self.records.append((object_path, payload))
        return object_path


class FailingStorage(FakeStorage):
    def insert_table_row(self, table, payload):
        raise StorageError("simulated Supabase outage")

    def put_json(self, object_path, payload):
        raise StorageError("simulated Supabase outage")


def test_diagnostic_store_persists_sanitized_event_and_error_index(capsys):
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)

    result = asyncio.run(
        diagnostics.emit(
            "request.analysis_error",
            request_id="abc123",
            error_type="ValueError",
            error_message="bad input\x00details",
            raw_audio=b"must not be persisted",
        )
    )

    assert result
    assert len(storage.records) == 2
    event_path, payload = storage.records[0]
    index_path, index_payload = storage.records[1]
    assert event_path.startswith("events/")
    assert "/abc123/" in event_path
    assert index_path.startswith("error-index/")
    assert payload["request_id"] == "abc123"
    assert index_payload["request_id"] == "abc123"
    assert payload["error_type"] == "ValueError"
    assert "raw_audio" not in payload
    assert "\x00" not in payload["error_message"]

    line = capsys.readouterr().out.strip()
    assert line.startswith("VOXVECTOR_DIAGNOSTIC ")
    console_payload = json.loads(line.split(" ", 1)[1])
    assert console_payload["event"] == "request.analysis_error"
    assert console_payload["request_id"] == "abc123"
    assert "raw_audio" not in console_payload


def test_diagnostic_store_survives_storage_failure(capsys):
    diagnostics = DiagnosticStore(FailingStorage())

    result = asyncio.run(diagnostics.emit("request.started", request_id="abc123"))

    assert result is None
    captured = capsys.readouterr()
    assert "VOXVECTOR_DIAGNOSTIC" in captured.out
    assert "VOXVECTOR_DIAGNOSTIC_STORAGE_FAILURE" in captured.out
    assert "VOXVECTOR_DIAGNOSTIC_DATABASE_FAILURE" in captured.err


def test_diagnostic_store_can_be_disabled(capsys):
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)
    diagnostics.enabled = False

    assert asyncio.run(diagnostics.emit("request.started", request_id="abc123")) is None
    assert storage.records == []
    assert capsys.readouterr().out == ""


def test_duration_ms_projection_matches_integer_schema():
    from api.observability import _duration_ms_for_projection
    assert _duration_ms_for_projection(9339.07) == 9339
    assert _duration_ms_for_projection(0.26) == 0
    assert _duration_ms_for_projection("635.3") == 635
    assert _duration_ms_for_projection(None) is None
    assert _duration_ms_for_projection("invalid") is None


def test_prehandler_case_source_400_is_promoted_to_sanitized_error(capsys):
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)

    asyncio.run(
        diagnostics.emit(
            "request.completed",
            request_id="upload-400",
            trace_id="trace-upload-400",
            method="POST",
            path="/v1/cases/case-1/sources",
            status_code=400,
            duration_ms=17589.03,
            request_body="must not be persisted",
        )
    )

    lines = [line for line in capsys.readouterr().out.splitlines() if line.startswith("VOXVECTOR_DIAGNOSTIC ")]
    events = [json.loads(line.split(" ", 1)[1]) for line in lines]
    assert [event["event"] for event in events] == [
        "request.completed",
        "case.source_upload_prehandler_rejected",
    ]
    prehandler = events[1]
    assert prehandler["request_id"] == "upload-400"
    assert prehandler["trace_id"] == "trace-upload-400"
    assert prehandler["status_code"] == 400
    assert prehandler["reason"] == "route_handler_start_not_observed"
    assert prehandler["boundary"] == "before_normal_upload_route_body"
    assert prehandler["error_type"] == "PreHandlerHTTP4xx"
    assert "request_body" not in prehandler

    error_rows = [payload for table, payload in storage.table_rows if table == "error_reports"]
    assert len(error_rows) == 1
    assert error_rows[0]["request_id"] == "upload-400"
    assert error_rows[0]["error_type"] == "PreHandlerHTTP4xx"
    assert error_rows[0]["context"]["event"] == "case.source_upload_prehandler_rejected"


def test_route_started_case_source_400_is_not_mislabeled_prehandler(capsys):
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)

    async def scenario():
        await diagnostics.emit(
            "case.source_upload_started",
            request_id="route-400",
            trace_id="trace-route-400",
            case_id="case-1",
            filename="recording.wav",
            content_type="audio/wav",
        )
        await diagnostics.emit(
            "request.completed",
            request_id="route-400",
            trace_id="trace-route-400",
            method="POST",
            path="/v1/cases/case-1/sources",
            status_code=400,
            duration_ms=12.4,
        )

    asyncio.run(scenario())

    lines = [line for line in capsys.readouterr().out.splitlines() if line.startswith("VOXVECTOR_DIAGNOSTIC ")]
    events = [json.loads(line.split(" ", 1)[1])["event"] for line in lines]
    assert events == ["case.source_upload_started", "request.completed"]
    assert not [payload for table, payload in storage.table_rows if table == "error_reports"]


def test_unrelated_400_is_not_mislabeled_as_case_source_prehandler(capsys):
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)

    asyncio.run(
        diagnostics.emit(
            "request.completed",
            request_id="other-400",
            method="POST",
            path="/v1/cases/case-1/analyze",
            status_code=400,
            duration_ms=5,
        )
    )

    lines = [line for line in capsys.readouterr().out.splitlines() if line.startswith("VOXVECTOR_DIAGNOSTIC ")]
    events = [json.loads(line.split(" ", 1)[1])["event"] for line in lines]
    assert events == ["request.completed"]
