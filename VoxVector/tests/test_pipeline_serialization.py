from concurrent.futures import ThreadPoolExecutor
from threading import Event, Lock
from time import sleep
from types import SimpleNamespace

import numpy as np
import pytest

import voxvector.pipeline as pipeline_module
from voxvector.pipeline import VoxVectorPipeline


def _configure_memory_guard(monkeypatch, memory_usage):
    monkeypatch.setattr("voxvector.runtime_memory.memory_usage_mb", memory_usage)
    monkeypatch.setattr("voxvector.runtime_memory.collect_after_heavy_phase", lambda: None)
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "512")
    monkeypatch.setenv("VOXVECTOR_MEMORY_HEADROOM_MB", "96")


def test_composite_pipeline_serializes_admission_and_execution(monkeypatch):
    active = 0
    max_active = 0
    guard = Lock()

    def slow_reliability(_signal, _sample_rate):
        nonlocal active, max_active
        with guard:
            active += 1
            max_active = max(max_active, active)
        try:
            sleep(0.05)
            return SimpleNamespace(status="eligible", reasons=(), score=1.0)
        finally:
            with guard:
                active -= 1

    monkeypatch.setattr(pipeline_module, "assess_signal", slow_reliability)
    _configure_memory_guard(monkeypatch, lambda: 1.0)

    samples = np.zeros(32, dtype=float)
    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = [executor.submit(VoxVectorPipeline().analyze, samples, 8000) for _ in range(2)]
        results = [future.result(timeout=2) for future in futures]

    assert len(results) == 2
    assert max_active == 1


def test_waiting_pipeline_rechecks_memory_after_prior_heavy_phase(monkeypatch):
    rss = {"mb": 100.0}
    entered = Event()
    body_calls = 0

    def first_reliability(_signal, _sample_rate):
        nonlocal body_calls
        body_calls += 1
        entered.set()
        sleep(0.05)
        rss["mb"] = 450.0
        return SimpleNamespace(status="eligible", reasons=(), score=1.0)

    monkeypatch.setattr(pipeline_module, "assess_signal", first_reliability)
    _configure_memory_guard(monkeypatch, lambda: rss["mb"])

    samples = np.zeros(32, dtype=float)
    with ThreadPoolExecutor(max_workers=2) as executor:
        first = executor.submit(VoxVectorPipeline().analyze, samples, 8000)
        assert entered.wait(timeout=1)
        second = executor.submit(VoxVectorPipeline().analyze, samples, 8000)
        first.result(timeout=2)
        with pytest.raises(RuntimeError, match="Insufficient memory headroom"):
            second.result(timeout=2)

    assert body_calls == 1
