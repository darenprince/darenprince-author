import asyncio
from datetime import datetime

from api import app as api_app
from voxvector.pipeline import VoxVectorPipeline


def test_health_reports_normalized_runtime_truth(monkeypatch):
    monkeypatch.setattr(api_app, "_runtime_self_test", lambda: (True, "passed"))

    payload = asyncio.run(api_app.health())
    observed_at = datetime.fromisoformat(payload["observed_at"].replace("Z", "+00:00"))

    assert observed_at.tzinfo is not None
    assert payload["status"] == "ok"
    assert payload["runtime"] == {
        "status": "healthy",
        "source": "voxvector-analysis-api:/health",
        "observed_at": payload["observed_at"],
        "version": VoxVectorPipeline.software_version,
        "version_source": "VoxVector/pyproject.toml",
        "source_revision": api_app.SOURCE_REVISION,
        "process_instance_id": api_app.PROCESS_INSTANCE_ID,
        "render_instance_id": api_app.RENDER_INSTANCE_ID,
    }
    assert payload["source_revision"] == payload["runtime"]["source_revision"]
    assert payload["pipeline"] == payload["runtime"]["version"]
    assert payload["testing"]["source"] == ".github/workflows/voxvector-qa.yml"
    assert payload["analysis_limits"]["memory_limit_mb"] > 0
    assert payload["analysis_limits"]["memory_headroom_admission_mb"] >= 0


def test_health_keeps_process_identity_separate_from_render_instance(monkeypatch):
    monkeypatch.setattr(api_app, "_runtime_self_test", lambda: (True, "passed"))
    monkeypatch.setattr(api_app, "PROCESS_INSTANCE_ID", "process-start-uuid")
    monkeypatch.setattr(api_app, "RENDER_INSTANCE_ID", "render-container-instance")

    payload = asyncio.run(api_app.health())

    assert payload["runtime"]["process_instance_id"] == "process-start-uuid"
    assert payload["runtime"]["render_instance_id"] == "render-container-instance"
    assert payload["runtime"]["process_instance_id"] != payload["runtime"]["render_instance_id"]


def test_health_preserves_degraded_runtime_state(monkeypatch):
    monkeypatch.setattr(api_app, "_runtime_self_test", lambda: (False, "failed"))

    payload = asyncio.run(api_app.health())

    assert payload["status"] == "degraded"
    assert payload["runtime"]["status"] == "degraded"
    assert payload["runtime_self_test"] == "failed"


def test_runtime_self_test_does_not_expose_exception_details(monkeypatch):
    def fail(_frames, _sample_rate):
        raise RuntimeError("private runtime detail")

    monkeypatch.setattr(api_app._acoustic_module, "spectral_centroid", fail)

    assert api_app._runtime_self_test() == (False, "failed")
