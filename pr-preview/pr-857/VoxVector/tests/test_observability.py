import asyncio

from api.observability import DiagnosticStore
from api.storage import StorageError


class FakeStorage:
    def __init__(self):
        self.records = []

    @property
    def configured(self):
        return True

    def status(self):
        return "configured"

    def put_json(self, object_path, payload):
        self.records.append((object_path, payload))
        return object_path


class FailingStorage(FakeStorage):
    def put_json(self, object_path, payload):
        raise StorageError("simulated Supabase outage")


def test_diagnostic_store_persists_sanitized_event():
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
    assert len(storage.records) == 1
    object_path, payload = storage.records[0]
    assert object_path.startswith("events/")
    assert "/abc123/" in object_path
    assert payload["request_id"] == "abc123"
    assert payload["error_type"] == "ValueError"
    assert "raw_audio" not in payload
    assert "\x00" not in payload["error_message"]


def test_diagnostic_store_survives_storage_failure():
    diagnostics = DiagnosticStore(FailingStorage())

    result = asyncio.run(diagnostics.emit("request.started", request_id="abc123"))

    assert result is None


def test_diagnostic_store_can_be_disabled():
    storage = FakeStorage()
    diagnostics = DiagnosticStore(storage)
    diagnostics.enabled = False

    assert asyncio.run(diagnostics.emit("request.started", request_id="abc123")) is None
    assert storage.records == []
