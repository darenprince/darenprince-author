from __future__ import annotations

import gc
import os
import threading
import time
from contextlib import contextmanager

try:
    import resource
except ImportError:  # pragma: no cover
    resource = None

_LOCK = threading.Lock()


def memory_usage_mb() -> float | None:
    if resource is None:
        return None
    usage = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return round(usage / 1024.0, 2)


def memory_limit_mb(default: float = 512.0) -> float:
    try:
        return float(os.getenv("VOXVECTOR_MEMORY_LIMIT_MB", str(default)))
    except ValueError:
        return default


def collect_after_heavy_phase() -> None:
    gc.collect()
    try:
        import torch
        if hasattr(torch, "cuda") and torch.cuda.is_available():
            torch.cuda.empty_cache()
    except (ImportError, RuntimeError):
        pass


@contextmanager
def measured_phase(name: str):
    with _LOCK:
        started = time.perf_counter()
        before = memory_usage_mb()
        try:
            yield
        finally:
            after = memory_usage_mb()
            elapsed = (time.perf_counter() - started) * 1000.0
            print(
                "VOXVECTOR_MEMORY "
                f"phase={name} elapsed_ms={elapsed:.2f} "
                f"before_mb={before if before is not None else 'unknown'} "
                f"after_mb={after if after is not None else 'unknown'} "
                f"limit_mb={memory_limit_mb():.0f}",
                flush=True,
            )
            collect_after_heavy_phase()
            after_gc = memory_usage_mb()
            print(
                "VOXVECTOR_MEMORY "
                f"phase={name} after_gc_mb={after_gc if after_gc is not None else 'unknown'} "
                f"limit_mb={memory_limit_mb():.0f}",
                flush=True,
            )
