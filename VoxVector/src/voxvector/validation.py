from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

ValidationStatus = Literal["implemented_observational", "registered_unimplemented", "validated_inferential", "deprecated"]

@dataclass(frozen=True)
class MethodValidation:
    method_id: str
    status: ValidationStatus
    implementation: str
    validation_plan: tuple[str, ...]
    failure_behavior: str
    notes: str = ""

_DEFAULT_PLAN = (
    "define_target_task_and_population", "freeze_method_specification",
    "speaker_disjoint_train_validation_test_split", "document_sampling_and_class_balance",
    "out_of_sample_evaluation", "error_and_calibration_analysis",
    "robustness_to_recording_conditions", "abstention_behavior",
)

_METHODS = (
    ("acoustic.rms", "implemented_observational", "src/voxvector/acoustic.py", "return measurement; preserve quality/provenance"),
    ("acoustic.intensity_db", "implemented_observational", "src/voxvector/acoustic.py", "return measurement; preserve quality/provenance"),
    ("acoustic.zero_crossing_rate", "implemented_observational", "src/voxvector/acoustic.py", "return measurement; preserve quality/provenance"),
    ("acoustic.spectral_centroid", "implemented_observational", "src/voxvector/acoustic.py", "return measurement; preserve quality/provenance"),
    ("acoustic.spectral_spread", "implemented_observational", "src/voxvector/acoustic.py", "return measurement; preserve quality/provenance"),
    ("acoustic.fundamental_frequency", "implemented_observational", "src/voxvector/acoustic.py", "return NaN for unavailable/unvoiced frames"),
    ("acoustic.harmonicity", "implemented_observational", "src/voxvector/acoustic.py", "return NaN for unavailable frames"),
    ("temporal.voiced_fraction", "implemented_observational", "src/voxvector/temporal.py", "return NaN when no frames exist"),
    ("temporal.pause_count", "implemented_observational", "src/voxvector/temporal_observations.py", "return zero when no qualifying pauses exist"),
    ("voice_quality.clipping_ratio", "implemented_observational", "src/voxvector/voice_quality.py", "return quality degradation signal; do not infer intent"),
    ("voice_quality.dc_offset", "implemented_observational", "src/voxvector/voice_quality.py", "return measurement or NaN for empty input"),
    ("voice_quality.jitter_local", "implemented_observational", "src/voxvector/voice_quality.py", "requires supplied valid periods; otherwise NaN"),
    ("voice_quality.shimmer_local", "implemented_observational", "src/voxvector/voice_quality.py", "requires supplied valid amplitudes; otherwise NaN"),
    ("formants.spectral_peak_candidates", "implemented_observational", "src/voxvector/formants.py", "return NaN candidates when insufficient usable peaks exist"),
    ("timing.speech_rate", "implemented_observational", "src/voxvector/research_timing.py", "return None for zero denominator; reject negative inputs"),
    ("timing.articulation_rate", "implemented_observational", "src/voxvector/research_timing.py", "return None for zero denominator; reject negative inputs"),
    ("timing.pause_topology", "implemented_observational", "src/voxvector/research_timing.py", "return empty/unavailable descriptors for empty input"),
    ("prosody.contour_summary", "implemented_observational", "src/voxvector/research_prosody.py", "ignore non-finite observations; preserve unavailable slope"),
    ("spectral.flux", "implemented_observational", "src/voxvector/research_prosody.py", "reject non-finite/negative magnitudes"),
    ("timing.response_latency", "implemented_observational", "src/voxvector/research_interaction.py", "reject reversed timestamps"),
    ("interaction.turn_duration", "implemented_observational", "src/voxvector/research_interaction.py", "reject reversed timestamps"),
    ("interaction.overlap", "implemented_observational", "src/voxvector/research_interaction.py", "requires speaker-attributed intervals"),
    ("disfluency.filled_pauses", "implemented_observational", "src/voxvector/disfluency.py", "requires tokenized transcript; audio-only inference unavailable"),
    ("disfluency.repetitions", "implemented_observational", "src/voxvector/disfluency.py", "requires tokenized transcript"),
    ("disfluency.rate", "implemented_observational", "src/voxvector/disfluency.py", "return NaN for zero token denominator"),
    ("disfluency.false_starts_repairs", "registered_unimplemented", "none", "requires validated transcript/alignment"),
    ("prosody.f0_dynamics", "registered_unimplemented", "none", "preserve unvoiced frames and quality flags"),
    ("prosody.intensity_dynamics", "registered_unimplemented", "none", "preserve channel/recording quality"),
    ("voice_quality.hnr", "registered_unimplemented", "none", "unavailable when periodicity/quality is inadequate"),
    ("cepstral.lpcc", "registered_unimplemented", "none", "requires stable LPC configuration"),
    ("cepstral.gfcc", "registered_unimplemented", "none", "requires frozen filterbank configuration"),
    ("energy.teager", "registered_unimplemented", "none", "noise-sensitive exploratory descriptor"),
    ("formants.frame_tracking", "registered_unimplemented", "none", "fail closed on unstable tracking"),
    ("baseline.within_speaker_change", "registered_unimplemented", "none", "requires leakage-safe independent baseline"),
    ("interaction.question_answer_alignment", "registered_unimplemented", "none", "requires reliable segmentation"),
    ("classifier.deception", "registered_unimplemented", "none", "fail closed; classification remains indeterminate"),
)

def method_registry() -> tuple[MethodValidation, ...]:
    return tuple(MethodValidation(method_id, status, implementation, _DEFAULT_PLAN, failure, "Research relevance is not inferential validation.") for method_id, status, implementation, failure in _METHODS)

def get_method_validation(method_id: str) -> MethodValidation:
    for method in method_registry():
        if method.method_id == method_id:
            return method
    raise KeyError(f"unknown VoxVector method: {method_id}")

def is_inferentially_validated(method_id: str) -> bool:
    return get_method_validation(method_id).status == "validated_inferential"
