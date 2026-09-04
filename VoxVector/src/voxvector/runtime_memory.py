from __future__ import annotations

import gc
import os
import threading
import time
from contextlib import contextmanager

_LOCK = threading.Lock()


def memory_usage_mb() -> float | None:
    """Return current process RSS in MiB when the runtime exposes it."""
    try:
        with open("/proc/self/statm", "r", encoding="utf-8") as handle:
            pages = int(handle.read().split()[1])
        return round(pages * os.sysconf("SC_PAGE_SIZE") / (1024.0 * 1024.0), 2)
    except (FileNotFoundError, OSError, ValueError, IndexError):
        return None


def memory_limit_mb(default: float = 512.0) -> float:
    try:
        return float(os.getenv("VOXVECTOR_MEMORY_LIMIT_MB", str(default)))
    except ValueError:
        return default


def memory_headroom_mb(default: float = 96.0) -> float:
    try:
        return max(0.0, float(os.getenv("VOXVECTOR_MEMORY_HEADROOM_MB", str(default))))
    except ValueError:
        return default


def memory_admission_limit_mb() -> float:
    return max(0.0, memory_limit_mb() - memory_headroom_mb())


def ensure_memory_headroom(phase: str) -> float | None:
    """Reject a new heavyweight phase before entering a configured RSS danger zone."""
    current = memory_usage_mb()
    limit = memory_admission_limit_mb()
    if current is not None and limit > 0 and current >= limit:
        raise RuntimeError(
            f"Insufficient memory headroom for {phase}: rss_mb={current:.2f}, "
            f"admission_limit_mb={limit:.2f}, limit_mb={memory_limit_mb():.2f}."
        )
    return current


def collect_after_heavy_phase() -> None:
    gc.collect()
    try:
        import ctypes
        libc = ctypes.CDLL("libc.so.6")
        libc.malloc_trim(0)
    except (OSError, AttributeError, TypeError):
        pass
    try:
        import torch
        if hasattr(torch, "cuda") and torch.cuda.is_available():
            torch.cuda.empty_cache()
    except (ImportError, RuntimeError):
        pass


@contextmanager
def measured_phase(name: str):
    """Serialize heavyweight phases, enforce headroom, and emit RSS telemetry."""
    with _LOCK:
        started = time.perf_counter()
        before = ensure_memory_headroom(name)
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
                f"admission_limit_mb={memory_admission_limit_mb():.2f} "
                f"limit_mb={memory_limit_mb():.0f}",
                flush=True,
            )
            collect_after_heavy_phase()
            after_gc = memory_usage_mb()
            print(
                "VOXVECTOR_MEMORY "
                f"phase={name} after_gc_mb={after_gc if after_gc is not None else 'unknown'} "
                f"headroom_mb={memory_headroom_mb():.2f} "
                f"admission_limit_mb={memory_admission_limit_mb():.2f} "
                f"limit_mb={memory_limit_mb():.0f}",
                flush=True,
            )
