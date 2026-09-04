import pytest

from voxvector.runtime_memory import (
    collect_after_heavy_phase,
    ensure_memory_headroom,
    memory_admission_limit_mb,
    memory_headroom_mb,
    memory_limit_mb,
    memory_usage_mb,
)


def test_memory_limit_is_configurable(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "512")
    assert memory_limit_mb() == 512.0


def test_memory_headroom_and_admission_limit_are_configurable(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "512")
    monkeypatch.setenv("VOXVECTOR_MEMORY_HEADROOM_MB", "96")
    assert memory_headroom_mb() == 96.0
    assert memory_admission_limit_mb() == 416.0


def test_memory_usage_is_nonnegative_when_available():
    value = memory_usage_mb()
    assert value is None or value >= 0


def test_memory_admission_rejects_danger_zone(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "100")
    monkeypatch.setenv("VOXVECTOR_MEMORY_HEADROOM_MB", "1")
    monkeypatch.setattr("voxvector.runtime_memory.memory_usage_mb", lambda: 99.0)
    with pytest.raises(RuntimeError):
        ensure_memory_headroom("test")


def test_heavy_phase_cleanup_is_safe():
    collect_after_heavy_phase()
