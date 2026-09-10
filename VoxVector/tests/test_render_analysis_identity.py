import asyncio
import hashlib
from types import SimpleNamespace

import numpy as np


def test_live_provider_analysis_preserves_route_owned_run_identity(monkeypatch):
    import api.app as app
    import api.render_api as render_api
    import voxvector.evidence_acquisition as acquisition_module

    source_bytes = b"identity-test-wav"
    source = {
        "source_id": "source-1",
        "created_at": "2026-09-10T21:00:00+00:00",
        "media_path": "media/user-1/case-1/source-1.wav",
        "sha256": hashlib.sha256(source_bytes).hexdigest(),
    }
    case = {"case_id": "case-1"}
    persisted_runs = []
    emitted = []

    class FakeCaseStore:
        def get_source(self, owner_id, case_id, source_id):
            assert (owner_id, case_id, source_id) == ("user-1", "case-1", "source-1")
            return case, source

        def update_run(self, owner_id, case_id, run):
            assert (owner_id, case_id) == ("user-1", "case-1")
            persisted_runs.append(run)
            return {**case, "runs": [run], "current_run_id": run["run_id"]}

    class FakeStorage:
        config = SimpleNamespace(media_bucket="voxvector-logs")

        def get_bytes(self, path):
            assert path == source["media_path"]
            return source_bytes

    class FakeDiagnostics:
        storage = FakeStorage()

        async def emit(self, event, **payload):
            emitted.append((event, payload))

    class FakeAcquisition:
        def to_dict(self):
            return {
                "transcription_state": "not_invoked",
                "diarization_state": "not_invoked",
                "transcript": None,
                "multimodal_timeline": None,
                "diarization": {},
                "provider_timings_ms": {},
            }

    pipeline_result = SimpleNamespace(
        run_id="pipeline-run-1",
        speech_segments=(),
        eligibility=SimpleNamespace(status="eligible"),
    )

    class FakePipeline:
        software_version = "test"

        def analyze(self, audio, sample_rate, transcript_tokens=None):
            assert sample_rate == 16000
            return pipeline_result

        @staticmethod
        def to_dict(result):
            return {
                "run_id": result.run_id,
                "schema_version": "test",
                "eligibility": {"status": "eligible"},
                "speech_segments": [],
                "observations": [],
                "evidence": [],
                "candidate": "indeterminate",
                "disposition": "insufficient_evidence",
                "limitations": [],
                "provenance": {"software_version": "test", "input_sha256": "test"},
            }

    monkeypatch.setattr(app, "CASE_STORE", FakeCaseStore())
    monkeypatch.setattr(app, "DIAGNOSTICS", FakeDiagnostics())
    monkeypatch.setattr(app, "request_id", lambda: "req-identity")
    monkeypatch.setattr(app, "read_wav", lambda data: (np.zeros(32, dtype=np.float32), 16000))
    monkeypatch.setattr(
        app,
        "_speech_runtime_status",
        lambda: {
            "transcription": {"execution_ready": False},
            "diarization": {"execution_ready": False},
        },
    )
    monkeypatch.setattr(app, "VoxVectorPipeline", FakePipeline)
    monkeypatch.setattr(acquisition_module, "build_evidence_acquisition", lambda *args, **kwargs: FakeAcquisition())

    response = asyncio.run(
        render_api.render_analysis(
            case_id="case-1",
            source_id="source-1",
            user={"id": "user-1"},
        )
    )

    run = response["run"]
    envelope = response["result_envelope"]
    assert run["run_id"] == "live-req-identity"
    assert run["analysis_id"] == "live-req-identity"
    assert run["pipeline_run_id"] == "pipeline-run-1"
    assert envelope["run_id"] == "live-req-identity"
    assert envelope["pipeline_run_id"] == "pipeline-run-1"
    assert persisted_runs[-1]["run_id"] == "live-req-identity"
    completed = [payload for event, payload in emitted if event == "case.live_provider_analysis_completed"]
    assert completed[-1]["run_id"] == "live-req-identity"
    assert completed[-1]["pipeline_run_id"] == "pipeline-run-1"
