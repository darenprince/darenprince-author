from voxvector.runtime_memory import collect_after_heavy_phase, memory_limit_mb, memory_usage_mb


def test_memory_limit_is_configurable(monkeypatch):
    monkeypatch.setenv("VOXVECTOR_MEMORY_LIMIT_MB", "512")
    assert memory_limit_mb() == 512.0


def test_memory_usage_is_nonnegative_when_available():
    value = memory_usage_mb()
    assert value is None or value >= 0


def test_heavy_phase_cleanup_is_safe():
    collect_after_heavy_phase()
