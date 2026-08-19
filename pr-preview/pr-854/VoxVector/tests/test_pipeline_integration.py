import numpy as np

from voxvector.pipeline import VoxVectorPipeline


def test_pipeline_integrates_observational_layers_without_deception_inference():
    sample_rate = 8000
    t = np.arange(sample_rate * 2, dtype=float) / sample_rate
    signal = 0.2 * np.sin(2 * np.pi * 180 * t)
    result = VoxVectorPipeline().analyze(
        signal,
        sample_rate,
        transcript_tokens=["um", "I", "I", "answered"],
        question_end_s=0.5,
        first_speech_s=0.8,
        first_substantive_s=0.95,
        baseline_values={"f0": np.array([170.0, 180.0, 175.0]), "intensity": np.array([-15.0, -14.0, -16.0]), "rms": np.array([0.18, 0.20, 0.19])},
    )
    features = {item.feature for item in result.observations}
    assert result.candidate == "indeterminate"
    assert result.disposition == "insufficient_evidence"
    assert "response_latency" in features
    assert "filled_pause_count" in features
    assert "repetition_count" in features
    assert "f0_range" in features
    assert "intensity_range" in features
    assert "hnr_db" in features
    assert "spectral_flux" in features
    assert "spectral_rolloff" in features
    assert "F1_candidate" in features
    assert "pause_count" in features
    assert "baseline_f0_deviation" in features
    assert "baseline_intensity_deviation" in features
    assert "baseline_rms_deviation" in features


def test_pipeline_rejects_incomplete_latency_boundaries():
    signal = np.zeros(8000)
    try:
        VoxVectorPipeline().analyze(signal, 8000, first_speech_s=1.0)
    except ValueError as exc:
        assert "question_end_s" in str(exc)
    else:
        raise AssertionError("expected incomplete latency boundaries to fail")
