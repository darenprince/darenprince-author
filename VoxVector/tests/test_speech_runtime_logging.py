import json
from types import SimpleNamespace

import api.observability as observability
from voxvector.speech_runtime_logging import speech_log


class FakeDiagnostics:
    def __init__(self):
        self.enabled = True
        self.storage = SimpleNamespace(config=SimpleNamespace(configured=True))
        self.records = []

    def persist_external_record(self, record):
        self.records.append(dict(record))
        return "voxvector-logs/test.json"


def test_speech_log_keeps_stdout_copy_and_persists_durable_copy(monkeypatch, capsys):
    diagnostics = FakeDiagnostics()
    monkeypatch.setattr(observability, "DIAGNOSTICS", diagnostics)

    speech_log(
        "transcription.progress",
        request_id="req-1",
        trace_id="trace-1",
        analysis_run_id="run-1",
        segments=2,
        words=15,
    )

    stdout = capsys.readouterr().out.strip()
    assert stdout.startswith("VOXVECTOR_SPEECH ")
    rendered = json.loads(stdout.split(" ", 1)[1])
    assert rendered["event"] == "transcription.progress"
    assert rendered["request_id"] == "req-1"
    assert rendered["analysis_run_id"] == "run-1"
    assert len(diagnostics.records) == 1
    assert diagnostics.records[0]["event"] == "transcription.progress"
    assert diagnostics.records[0]["words"] == 15


def test_speech_log_durable_failure_is_bounded_and_does_not_dump_record(monkeypatch, capsys):
    diagnostics = FakeDiagnostics()

    def fail(_record):
        raise RuntimeError("database unavailable with secret-marker")

    diagnostics.persist_external_record = fail
    monkeypatch.setattr(observability, "DIAGNOSTICS", diagnostics)

    speech_log(
        "transcription.failed",
        request_id="req-2",
        trace_id="trace-2",
        error_message="authorization=Bearer do-not-echo-in-fallback",
    )

    captured = capsys.readouterr()
    assert "VOXVECTOR_SPEECH " in captured.out
    assert "VOXVECTOR_SPEECH_DURABLE_FAILURE" in captured.err
    assert "do-not-echo-in-fallback" not in captured.err
    assert "secret-marker" not in captured.err
