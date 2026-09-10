import io
import json
import zipfile
from datetime import datetime, timezone

from api.debug_bundle import (
    build_debug_zip,
    correlated_event_rows,
    mirror_render_snapshot,
    run_window,
    sanitize_render_logs,
)


class FakeStorage:
    def __init__(self, rows=None):
        self.rows = rows or {}
        self.objects = {}
        self.configured = True

    def put_json(self, object_path, payload):
        self.objects[object_path] = payload
        return f"voxvector-logs/{object_path}"

    def select_table_rows(self, table, query=""):
        return list(self.rows.get(table, []))


def test_render_snapshot_is_sanitized_and_deterministic_for_identical_observation():
    storage = FakeStorage()
    logs = [
        {
            "timestamp": "2026-09-10T07:00:00+00:00",
            "level": "error",
            "type": "app",
            "message": "authorization=Bearer very-secret-value password=hunter2",
            "raw": {"authorization": "Bearer raw-secret", "safe": "not needed"},
        }
    ]
    kwargs = {
        "service_id": "srv-test",
        "owner_id": "owner-test",
        "logs": logs,
        "observed_at": "2026-09-10T07:01:00+00:00",
        "context": {"case_id": "case-1", "run_id": "run-1", "source_revision": "abc123"},
    }

    first = mirror_render_snapshot(storage, **kwargs)
    second = mirror_render_snapshot(storage, **kwargs)

    assert first == second
    assert len(storage.objects) == 1
    payload = next(iter(storage.objects.values()))
    serialized = json.dumps(payload)
    assert "very-secret-value" not in serialized
    assert "hunter2" not in serialized
    assert "raw-secret" not in serialized
    assert payload["logs"][0]["message"].count("[REDACTED]") >= 2
    assert "raw" not in payload["logs"][0]


def test_correlated_events_distinguish_exact_and_time_window_speech():
    storage = FakeStorage(
        {
            "api_request_logs": [
                {
                    "occurred_at": "2026-09-10T07:00:01+00:00",
                    "request_id": "req-1",
                    "source_revision": "abc",
                    "pipeline_version": "p1",
                    "metadata": {"event": "case.analysis_stage_started", "case_id": "case-1"},
                },
                {
                    "occurred_at": "2026-09-10T07:00:02+00:00",
                    "request_id": "worker-generated",
                    "source_revision": "abc",
                    "pipeline_version": "p1",
                    "metadata": {"event": "transcription.progress", "segments": 1},
                },
                {
                    "occurred_at": "2026-09-10T07:00:03+00:00",
                    "request_id": "other",
                    "metadata": {"event": "request.completed"},
                },
            ]
        }
    )
    start = datetime(2026, 9, 10, 6, 59, tzinfo=timezone.utc)
    end = datetime(2026, 9, 10, 7, 1, tzinfo=timezone.utc)

    events, counts = correlated_event_rows(
        storage,
        start=start,
        end=end,
        request_id="req-1",
        case_id="case-1",
        run_id="run-1",
    )

    assert [event["event"] for event in events] == ["case.analysis_stage_started", "transcription.progress"]
    assert events[0]["debug_correlation"] == "exact_identifier"
    assert events[1]["debug_correlation"] == "analysis_time_window"
    assert counts == {"exact": 1, "time_window_speech": 1}


def test_debug_zip_contains_expected_evidence_and_excludes_content_and_secrets():
    case = {
        "case_id": "case-1",
        "title": "Debug case",
        "sources": [
            {
                "source_id": "source-1",
                "sha256": "deadbeef",
                "sample_rate": 16000,
                "duration_seconds": 10.0,
                "media_path": "voxvector-media/private.wav",
            }
        ],
    }
    run = {
        "run_id": "run-1",
        "request_id": "req-1",
        "source_id": "source-1",
        "status": "failed",
        "started_at": "2026-09-10T07:00:00+00:00",
        "completed_at": "2026-09-10T07:00:20+00:00",
        "pipeline_version": "p1",
        "source_revision": "abc123",
        "transcript": {"text": "TOP SECRET TRANSCRIPT"},
        "stages": [{"id": "transcription_generation", "status": "failed", "error": "token=supersecret"}],
        "error": {"type": "RuntimeError", "message": "authorization=Bearer should-not-leak"},
    }
    start, end = run_window(run)
    archive_bytes, manifest = build_debug_zip(
        case=case,
        run=run,
        events=[{"event": "transcription.failed", "request_id": "req-1", "access_token": "secret-token"}],
        errors=[{"request_id": "req-1", "message": "password=bad-password"}],
        render_logs=[{"message": "Bearer render-secret", "raw": {"cookie": "secret-cookie"}}],
        render_status={"service": {"id": "srv-test"}},
        runtime_health={"status": "ok", "service_role_key": "never-export"},
        render_mirror_path="voxvector-logs/render-snapshots/test.json",
        correlation_counts={"exact": 1, "time_window_speech": 0},
        window_start=start,
        window_end=end,
    )

    assert manifest["missing_evidence"] == []
    with zipfile.ZipFile(io.BytesIO(archive_bytes)) as archive:
        assert set(archive.namelist()) == {
            "manifest.json",
            "case-run.json",
            "voxvector-events.jsonl",
            "errors.jsonl",
            "render-logs.jsonl",
            "render-status.json",
            "runtime-health.json",
            "README.txt",
        }
        combined = b"\n".join(archive.read(name) for name in archive.namelist()).decode("utf-8")

    for secret in (
        "TOP SECRET TRANSCRIPT",
        "supersecret",
        "should-not-leak",
        "secret-token",
        "bad-password",
        "render-secret",
        "secret-cookie",
        "never-export",
        "private.wav",
    ):
        assert secret not in combined
    assert "[REDACTED]" in combined


def test_debug_manifest_reports_missing_sources():
    start = datetime(2026, 9, 10, 7, 0, tzinfo=timezone.utc)
    archive_bytes, manifest = build_debug_zip(
        case={"case_id": "case-1"},
        run={"run_id": "run-1", "started_at": start.isoformat(), "completed_at": start.isoformat()},
        events=[],
        errors=[],
        render_logs=[],
        render_status=None,
        runtime_health=None,
        render_mirror_path=None,
        correlation_counts={"exact": 0, "time_window_speech": 0},
        window_start=start,
        window_end=start,
    )

    assert archive_bytes
    assert set(manifest["missing_evidence"]) == {
        "supabase_voxvector_events",
        "correlated_error_reports",
        "render_provider_logs",
        "render_status",
        "runtime_health",
        "supabase_render_log_mirror",
    }


def test_sanitize_render_logs_drops_provider_raw_payload():
    sanitized = sanitize_render_logs([{"message": "ok", "raw": {"authorization": "secret"}, "timestamp": "now"}])
    assert sanitized == [{"timestamp": "now", "level": None, "type": None, "message": "ok"}]
