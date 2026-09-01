from voxvector.results_envelope import compose_result_envelope, missing_result_families


def test_compose_result_envelope_preserves_connected_identity_and_explicit_gaps():
    envelope = compose_result_envelope(
        case={"case_id": "case-1"},
        source={"source_id": "source-1", "sha256": "abc", "filename": "sample.wav", "duration_seconds": 4.2},
        run={"run_id": "run-1", "status": "completed", "stages": [{"id": "decode", "status": "complete"}]},
        result={
            "run_id": "run-1",
            "schema_version": "0.3",
            "eligibility": {"status": "eligible"},
            "observations": [{"feature": "rms", "value": 0.2}],
            "evidence": [{"direction": "neutral"}],
            "candidate": "indeterminate",
            "disposition": "insufficient_evidence",
            "limitations": ["No transcript was supplied."],
            "provenance": {"input_sha256": "abc", "software_version": "0.2.26"},
        },
    )

    assert envelope["case_id"] == "case-1"
    assert envelope["analysis_id"] == "run-1"
    assert envelope["run_id"] == "run-1"
    assert envelope["pipeline"]["stages"][0]["status"] == "complete"
    assert envelope["observations"][0]["feature"] == "rms"
    assert envelope["candidate"] == "indeterminate"
    assert envelope["disposition"] == "insufficient_evidence"
    assert envelope["transcript"] is None
    assert envelope["uncertainty"] is None


def test_missing_result_families_reports_only_null_or_absent_contract_fields():
    envelope = compose_result_envelope(
        case={"case_id": "case-1"},
        source={"source_id": "source-1"},
        run={"run_id": "run-1"},
        result={"run_id": "run-1", "schema_version": "0.3", "provenance": {}},
    )
    missing = missing_result_families(envelope)
    assert "case_id" not in missing
    assert "run_id" not in missing
    assert "transcript" in missing
    assert "uncertainty" in missing
