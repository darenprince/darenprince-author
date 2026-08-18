from __future__ import annotations
from dataclasses import asdict
from hashlib import sha256
from uuid import uuid4
import numpy as np
from .acoustic import frame_signal, fundamental_frequency, harmonicity, intensity_db, rms, spectral_centroid, spectral_spread, summarize, zero_crossing_rate
from .evidence import observations_to_evidence
from .reliability import assess_signal
from .schemas import AnalysisResult, Eligibility, Observation

class VoxVectorPipeline:
    """Auditable observational audio pipeline; no deception inference."""
    schema_version = "0.2"
    software_version = "0.2.22"

    def analyze(self, signal: np.ndarray, sample_rate: int) -> AnalysisResult:
        signal = np.asarray(signal, dtype=float).reshape(-1)
        run_id = str(uuid4())
        input_hash = sha256(signal.tobytes()).hexdigest()
        reliability = assess_signal(signal, sample_rate)
        duration = signal.size / sample_rate if sample_rate > 0 else 0.0
        peak = float(np.nanmax(np.abs(signal))) if signal.size and np.any(np.isfinite(signal)) else 0.0
        clipping_ratio = float(np.mean(np.abs(signal) >= 0.999)) if signal.size else 1.0
        eligibility = Eligibility(status=reliability.status, reasons=reliability.reasons, quality_metrics={"duration_seconds": duration, "peak_abs": peak, "clipping_ratio": clipping_ratio, "reliability_score": reliability.score})
        observations: list[Observation] = []
        if signal.size and sample_rate > 0 and np.all(np.isfinite(signal)):
            frame_size = max(1, int(sample_rate * 0.025))
            hop = max(1, int(sample_rate * 0.010))
            frames = frame_signal(signal, frame_size, hop)
            if frames.size:
                features = (("rms", rms(frames), "linear"), ("intensity_db", intensity_db(frames), "dB"), ("zero_crossing_rate", zero_crossing_rate(frames), "ratio"), ("spectral_centroid", spectral_centroid(frames, sample_rate), "Hz"), ("spectral_spread", spectral_spread(frames, sample_rate), "Hz"), ("fundamental_frequency", fundamental_frequency(frames, sample_rate), "Hz"), ("harmonicity", harmonicity(frames, sample_rate), "ratio"))
                quality = reliability.score
                for feature_name, values, unit in features:
                    summary = summarize(values)
                    observations.append(Observation(method_id=f"acoustic.{feature_name}", feature=feature_name, value=summary["mean"], unit=unit, segment=(0.0, duration), quality=quality, provenance={"summary": summary, "frame_size_samples": frame_size, "hop_samples": hop, "source": "raw_audio", "reliability_status": reliability.status}))
        evidence = observations_to_evidence(observations, minimum_quality=0.5)
        limitations = ["No deception inference is produced by this acoustic-only foundation.", "No within-speaker baseline was supplied.", "No transcript, diarization, or learned classifier was supplied.", "Evidence records are neutral observational groupings and do not indicate deception.", "F0 and harmonicity are observational autocorrelation estimates and require validation before inferential use."]
        if reliability.status != "eligible":
            limitations.append("Input quality did not satisfy full eligibility criteria.")
        disposition = "abstain" if reliability.status != "eligible" else "insufficient_evidence"
        return AnalysisResult(run_id=run_id, schema_version=self.schema_version, eligibility=eligibility, observations=tuple(observations), evidence=evidence, candidate="indeterminate", disposition=disposition, limitations=tuple(limitations), provenance={"input_sha256": input_hash, "sample_rate": sample_rate, "software_version": self.software_version})

    @staticmethod
    def to_dict(result: AnalysisResult) -> dict:
        return asdict(result)
