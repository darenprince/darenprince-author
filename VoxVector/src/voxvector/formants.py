from __future__ import annotations

import numpy as np


def estimate_formants(
    frame: np.ndarray,
    sample_rate: int,
    n_formants: int = 4,
    min_hz: float = 200.0,
    max_hz: float = 5000.0,
) -> np.ndarray:
    """Estimate bounded spectral formant candidates for one frame.

    Candidates at the boundaries of the FFT spectrum are excluded from peak
    comparison so a valid upper-frequency bin can never index past the array.
    These are observational spectral candidates, not phonetic formant claims.
    """
    frame = np.asarray(frame, dtype=float).reshape(-1)
    if sample_rate <= 0 or frame.size < 8 or n_formants <= 0:
        raise ValueError("invalid formant parameters")

    effective_max_hz = min(float(max_hz), sample_rate / 2.0)
    if not (0 < min_hz < effective_max_hz):
        raise ValueError("invalid formant frequency range")

    centered = frame - np.mean(frame)
    spectrum = np.abs(np.fft.rfft(centered * np.hanning(frame.size)))
    frequencies = np.fft.rfftfreq(frame.size, 1.0 / sample_rate)
    valid = (frequencies >= min_hz) & (frequencies <= effective_max_hz)
    indices = np.flatnonzero(valid)
    if indices.size < 3:
        return np.full(n_formants, np.nan)

    # Only compare bins that have both immediate neighbors inside the FFT
    # array. This fixes low-sample-rate / Nyquist-boundary failures.
    peak_indices = indices[(indices > 0) & (indices < spectrum.size - 1)]
    if peak_indices.size == 0:
        return np.full(n_formants, np.nan)

    peaks = peak_indices[
        (spectrum[peak_indices] >= spectrum[peak_indices - 1])
        & (spectrum[peak_indices] >= spectrum[peak_indices + 1])
    ]
    ranked = peaks[np.argsort(spectrum[peaks])[::-1]]
    selected: list[int] = []
    min_spacing = max(100.0, sample_rate / frame.size)

    for peak in ranked:
        if all(
            abs(frequencies[peak] - frequencies[p]) >= min_spacing
            for p in selected
        ):
            selected.append(int(peak))
        if len(selected) == n_formants:
            break

    selected.sort(key=lambda p: frequencies[p])
    result = np.full(n_formants, np.nan)
    if selected:
        result[: len(selected)] = frequencies[selected]
    return result


def track_formants(
    frames: np.ndarray,
    sample_rate: int,
    n_formants: int = 4,
    min_hz: float = 200.0,
    max_hz: float = 5000.0,
) -> np.ndarray:
    """Return per-frame spectral formant candidates; unstable frames remain NaN."""
    frames = np.asarray(frames, dtype=float)
    if frames.ndim != 2:
        raise ValueError("frames must be a 2D array")
    return (
        np.vstack(
            [
                estimate_formants(frame, sample_rate, n_formants, min_hz, max_hz)
                for frame in frames
            ]
        )
        if frames.shape[0]
        else np.empty((0, n_formants))
    )
