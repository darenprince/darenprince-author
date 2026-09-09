from api.app import PIPELINE_STAGE_DEFINITIONS, _new_stage_states


def test_pipeline_stage_numbers_follow_dependency_order():
    stage_ids = [stage_id for _, stage_id, _ in PIPELINE_STAGE_DEFINITIONS]

    assert stage_ids[:8] == [
        "file_upload_ingest",
        "file_decode_normalization",
        "provenance_integrity",
        "channel_recording_assessment",
        "speech_segmentation",
        "speaker_identification_diarization",
        "transcription_generation",
        "transcript_alignment",
    ]
    assert [number for number, _, _ in PIPELINE_STAGE_DEFINITIONS] == list(range(1, 22))


def test_new_stage_states_project_correct_speech_stage_numbers():
    states = {stage["id"]: stage for stage in _new_stage_states()}

    assert states["speech_segmentation"]["number"] == 5
    assert states["speaker_identification_diarization"]["number"] == 6
    assert states["transcription_generation"]["number"] == 7
    assert states["transcript_alignment"]["number"] == 8
