from __future__ import annotations

from dataclasses import asdict
from hashlib import sha256
from uuid import uuid4
from typing import Mapping, Sequence

import numpy as np

from .acoustic import (
    frame_signal,
    fundamental_frequency,
    harmonicity,
    intensity_db,
    rms,
    spectral_centroid,
    spectral_spread,
    summarize,
    zero_crossing_rate,
)
from .advanced_prosody import contour_dynamics, contour_delta
from .baseline import baseline_deviation, robust_baseline
from .disfluency import count_filled_pauses, disfluency_rate, repetition_count, token_count
from .evidence import observations_to_evidence
from .formants import track_formants
from .hnr import harmonic_to_noise_ratio
from .reliability import assess_signal
from .research_interaction import response_latency
from .research_prosody import contour_summary
from .research_timing import pause_topology
from .schemas import AnalysisResult, Eligibility, Observation
from .spectral import spectral_flux, spectral_rolloff


class VoxVectorPipeline:
    """Comprehensive auditable observational audio pipeline; no deception inference."""

    schema_version = "0.2"
    software_version = "0.2.23"

    def analyze(
        self,
        signal: np.ndarray,
        sample_rate: int,
        *,
        transcript_tokens: Sequence[str] | None = None,
        question_end_s: float | None = None,
        first_speech_s: float | None = None,
        first_substantive_s: float | None = None,
        baseline_values: Mapping[str, np.ndarray] | None = None,
    ) -> AnalysisResult:
        signal = np.asarray(signal, dtype=float).reshape(-1)
        run_id = str(uuid4())
        input_hash = sha256(signal.tobytes()).hexdigest()
        reliability = assess_signal(signal, sample_rate)
        duration = signal.size / sample_rate if sample_rate > 0 else 0.0
        peak = float(np.nanmax(np.abs(signal))) if signal.size and np.any(np.isfinite(signal)) else 0.0
        clipping_ratio = float(np.mean(np.abs(signal) >= 0.999)) if signal.size else 1.0
        eligibility = Eligibility(
            status=reliability.status,
            reasons=reliability.reasons,
            quality_metrics={
                "duration_seconds": duration,
                "peak_abs": peak,
                "clipping_ratio": clipping_ratio,
                "reliability_score": reliability.score,
            },
        )
        observations: list[Observation] = []

        def add(feature: str, value: float | None, unit: str, provenance: dict) -> None:
            if value is None or not np.isfinite(value):
                return
            observations.append(
                Observation(
                    method_id=f"{provenance.get('method_id', 'derived')}",
                    feature=feature,
                    value=float(value),
                    unit=unit,
                    segment=(0.0, duration),
                    quality=float(reliability.score),
                    provenance=provenance,
                )
            )

        if signal.size and sample_rate > 0 and np.all(np.isfinite(signal)):
            frame_size = max(1, int(sample_rate * 0.025))
            hop = max(1, int(sample_rate * 0.010))
            frames = frame_signal(signal, frame_size, hop)
            if frames.size:
                times = (np.arange(frames.shape[0]) * hop + frame_size / 2) / sample_rate
                rms_values = rms(frames)
                intensity_values = intensity_db(frames)
                zcr_values = zero_crossing_rate(frames)
                centroid_values = spectral_centroid(frames, sample_rate)
                spread_values = spectral_spread(frames, sample_rate)
                f0_values = fundamental_frequency(frames, sample_rate)
                harmonicity_values = harmonicity(frames, sample_rate)
                features = (
                    ("acoustic.rms", "rms", rms_values, "linear"),
                    ("acoustic.intensity_db", "intensity_db", intensity_values, "dB"),
                    ("acoustic.zero_crossing_rate", "zero_crossing_rate", zcr_values, "ratio"),
                    ("acoustic.spectral_centroid", "spectral_centroid", centroid_values, "Hz"),
                    ("acoustic.spectral_spread", "spectral_spread", spread_values, "Hz"),
                    ("acoustic.fundamental_frequency", "fundamental_frequency", f0_values, "Hz"),
                    ("acoustic.harmonicity", "harmonicity", harmonicity_values, "ratio"),
                )
                for method_id, feature, values, unit in features:
                    summary = summarize(values)
                    add(feature, summary["mean"], unit, {"method_id": method_id, "summary": summary, "frame_size_samples": frame_size, "hop_samples": hop, "source": "raw_audio", "reliability_status": reliability.status})

                # Dynamic prosody: summary and endpoint change are retained as separate observations.
                for method_id, prefix, values, unit in (
                    ("prosody.f0_dynamics", "f0", f0_values, "Hz"),
                    ("prosody.intensity_dynamics", "intensity", intensity_values, "dB"),
                ):
                    dynamics = contour_dynamics(values, times)
                    add(f"{prefix}_range", dynamics["range"], unit, {"method_id": method_id, "statistics": dynamics})
                    add(f"{prefix}_std", dynamics["std"], unit, {"method_id": method_id, "statistics": dynamics})
                    add(f"{prefix}_slope", dynamics["slope"], f"{unit}/s", {"method_id": method_id, "statistics": dynamics})
                    add(f"{prefix}_delta", contour_delta(values), unit, {"method_id": method_id, "statistics": dynamics})

                # Voice-quality HNR derived from the canonical harmonicity calculation.
                hnr_values = harmonic_to_noise_ratio(harmonicity_values)
                hnr_summary = summarize(hnr_values)
                add("hnr_db", hnr_summary["mean"], "dB", {"method_id": "voice_quality.hnr", "summary": hnr_summary, "source": "acoustic.harmonicity"})

                # Spectral descriptors use one canonical implementation.
                spectra = np.abs(np.fft.rfft(frames * np.hanning(frame_size), axis=1))
                frequencies = np.fft.rfftfreq(frame_size, 1.0 / sample_rate)
                flux_values = spectral_flux(spectra)
                rolloff_values = spectral_rolloff(spectra, frequencies)
                flux_summary = summarize(flux_values)
                rolloff_summary = summarize(rolloff_values)
                add("spectral_flux", flux_summary["mean"], "ratio", {"method_id": "spectral.flux", "summary": flux_summary})
                add("spectral_rolloff", rolloff_summary["mean"], "Hz", {"method_id": "spectral.rolloff", "summary": rolloff_summary})

                # Formant candidates are observational and intentionally not smoothed into inference.
                formant_matrix = track_formants(frames, sample_rate, n_formants=4)
                for index in range(formant_matrix.shape[1]):
                    values = formant_matrix[:, index]
                    summary = summarize(values)
                    add(f"F{index + 1}_candidate", summary["mean"], "Hz", {"method_id": "formants.frame_tracking", "summary": summary, "formant_index": index + 1})

                # Pause topology uses the same frame energy/voicing representation as the acoustic layer.
                voiced = np.isfinite(f0_values)
                topology = pause_topology(rms_values, voiced, hop / sample_rate)
                for name, value in topology.items():
                    unit = "count" if name == "pause_count" else ("ratio" if name == "pause_density" else "s")
                    add(name, value, unit, {"method_id": "timing.pause_topology", "topology": topology})

                # Speaker-baseline-relative observations are optional and leakage-safe by contract.
                if baseline_values:
                    current_values = {
                        "f0": f0_values,
                        "intensity": intensity_values,
                        "rms": rms_values,
                    }
                    for name, values in current_values.items():
                        baseline_input = baseline_values.get(name)
                        if baseline_input is None:
                            continue
                        baseline = robust_baseline(np.asarray(baseline_input, dtype=float))
                        current = float(np.nanmedian(values)) if np.any(np.isfinite(values)) else np.nan
                        deviation = baseline_deviation(current, baseline)
                        add(f"baseline_{name}_deviation", deviation, "robust_z", {"method_id": "baseline.within_speaker_change", "baseline": baseline, "baseline_source": "independent_input"})

        if transcript_tokens is not None:
            tokens = [str(token) for token in transcript_tokens]
            count = token_count(tokens)
            fillers = count_filled_pauses(tokens)
            repetitions = repetition_count(tokens)
            add("filled_pause_count", float(fillers), "count", {"method_id": "disfluency.filled_pauses", "source": "supplied_transcript"})
            add("repetition_count", float(repetitions), "count", {"method_id": "disfluency.repetitions", "source": "supplied_transcript"})
            rate = disfluency_rate(fillers + repetitions, count)
            add("disfluency_rate", rate, "ratio", {"method_id": "disfluency.rate", "source": "supplied_transcript", "token_count": count})

        if question_end_s is not None or first_speech_s is not None or first_substantive_s is not None:
            if question_end_s is None or first_speech_s is None:
                raise ValueError("question_end_s and first_speech_s are required for response latency")
            latency = response_latency(question_end_s, first_speech_s, first_substantive_s)
            add("response_latency", latency.first_speech_s, "s", {"method_id": "timing.response_latency", "first_substantive_latency_s": latency.first_substantive_s, "filler_before_content_s": latency.filler_before_content_s, "source": "supplied_boundaries"})

        evidence = observations_to_evidence(observations, minimum_quality=0.5)
        limitations = [
            "No deception inference is produced by this observational pipeline.",
            "Evidence records are neutral observational groupings and do not indicate deception.",
            "All research-derived features require task-specific reliability and scientific validation before inferential use.",
        ]
        if baseline_values is None:
            limitations.append("No independent within-speaker baseline was supplied.")
        if transcript_tokens is None:
            limitations.append("No transcript was supplied; transcript-derived observations were not computed.")
        if question_end_s is None:
            limitations.append("No question/answer timing boundaries were supplied; response latency was not computed.")
        if reliability.status != "eligible":
            limitations.append("Input quality did not satisfy full eligibility criteria.")
        disposition = "abstain" if reliability.status != "eligible" else "insufficient_evidence"
        return AnalysisResult(
            run_id=run_id,
            schema_version=self.schema_version,
            eligibility=eligibility,
            observations=tuple(observations),
            evidence=evidence,
            candidate="indeterminate",
            disposition=disposition,
            limitations=tuple(limitations),
            provenance={"input_sha256": input_hash, "sample_rate": sample_rate, "software_version": self.software_version},
        )

    @staticmethod
    def to_dict(result: AnalysisResult) -> dict:
        return asdict(result)
