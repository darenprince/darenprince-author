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
    }
    assert payload["source_revision"] == payload["runtime"]["source_revision"]
    assert payload["pipeline"] == payload["runtime"]["version"]
    assert payload["testing"]["source"] == ".github/workflows/voxvector-qa.yml"


def test_health_preserves_degraded_runtime_state(monkeypatch):
    monkeypatch.setattr(api_app, "_runtime_self_test", lambda: (False, "RuntimeError: failed"))

    payload = asyncio.run(api_app.health())

    assert payload["status"] == "degraded"
    assert payload["runtime"]["status"] == "degraded"
    assert payload["runtime_self_test"] == "RuntimeError: failed"
