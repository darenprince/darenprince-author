from concurrent.futures import ThreadPoolExecutor
from threading import Event
from types import SimpleNamespace

import numpy as np
import pytest

import voxvector.pipeline as pipeline_module
from voxvector.pipeline import VoxVectorPipeline
from voxvector.runtime_memory import HeavyPhaseBusyError


def _configure_memory_guard(monkeypatch, memory_usage):
    monkeypatch.setattr("voxvector.runtime_memory.memory_usage_mb", memory_usage)
    monkeypatch.setattr("voxvector.runtime_memory.collect_after_heavy_phase", lambda: None)
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "512")
    monkeypatch.setenv("VOXVECTOR_MEMORY_HEADROOM_MB", "96")


def test_composite_pipeline_rejects_concurrent_execution_without_queuing(monkeypatch):
    entered = Event()
    release = Event()
    body_calls = 0

    def slow_reliability(_signal, _sample_rate):
        nonlocal body_calls
        body_calls += 1
        entered.set()
        assert release.wait(timeout=1)
        return SimpleNamespace(status="eligible", reasons=(), score=1.0)

    monkeypatch.setattr(pipeline_module, "assess_signal", slow_reliability)
    _configure_memory_guard(monkeypatch, lambda: 1.0)

    samples = np.zeros(32, dtype=float)
    with ThreadPoolExecutor(max_workers=2) as executor:
        first = executor.submit(VoxVectorPipeline().analyze, samples, 8000)
        assert entered.wait(timeout=1)
        second = executor.submit(VoxVectorPipeline().analyze, samples, 8000)
        try:
            with pytest.raises(HeavyPhaseBusyError, match="without queuing"):
                second.result(timeout=1)
        finally:
            release.set()
        first.result(timeout=2)

    assert body_calls == 1


def test_pipeline_rechecks_memory_after_prior_heavy_phase(monkeypatch):
    rss = {"mb": 100.0}
    body_calls = 0

    def first_reliability(_signal, _sample_rate):
        nonlocal body_calls
        body_calls += 1
        rss["mb"] = 450.0
        return SimpleNamespace(status="eligible", reasons=(), score=1.0)

    monkeypatch.setattr(pipeline_module, "assess_signal", first_reliability)
    _configure_memory_guard(monkeypatch, lambda: rss["mb"])

    samples = np.zeros(32, dtype=float)
    VoxVectorPipeline().analyze(samples, 8000)
    with pytest.raises(RuntimeError, match="Insufficient memory headroom"):
        VoxVectorPipeline().analyze(samples, 8000)

    assert body_calls == 1
