from __future__ import annotations

from typing import Any, Mapping


REQUIRED_RESULT_FAMILIES = (
    "case_id",
    "analysis_id",
    "run_id",
    "schema_version",
    "source",
    "source_provenance",
    "recording_metadata",
    "eligibility",
    "pipeline",
    "speakers",
    "speech_segments",
    "transcript",
    "alignment",
    "observations",
    "tracks",
    "evidence",
    "evidence_relationships",
    "candidate",
    "assessment",
    "disposition",
    "reports",
    "lifecycle_events",
    "uncertainty",
    "alternative_explanations",
    "software_provenance",
)


def compose_result_envelope(
    *,
    case: Mapping[str, Any],
    source: Mapping[str, Any],
    run: Mapping[str, Any],
    result: Mapping[str, Any],
) -> dict[str, Any]:
    """Compose one auditable post-analysis result envelope.

    Missing downstream capability families are represented explicitly as empty
    or unavailable structures. No measurements, classifications, or validation
    claims are synthesized by this composer.
    """
    provenance = dict(result.get("provenance") or {})
    source_provenance = {
        "source_id": source.get("source_id"),
        "media_path": source.get("media_path"),
        "sha256": source.get("sha256"),
        "bytes": source.get("bytes"),
        "created_at": source.get("created_at"),
    }
    return {
        "case_id": case.get("case_id"),
        "analysis_id": run.get("analysis_id") or run.get("run_id"),
        "run_id": result.get("run_id") or run.get("run_id"),
        "schema_version": result.get("schema_version"),
        "source": dict(source),
        "source_provenance": source_provenance,
        "recording_metadata": {
            **{k: source.get(k) for k in ("filename", "sample_rate", "duration_seconds", "channels", "format", "content_type") if k in source},
            **dict(provenance.get("recording_profile") or {}),
        },
        "eligibility": result.get("eligibility") or {},
        "pipeline": {
            "status": run.get("status"),
            "started_at": run.get("started_at"),
            "completed_at": run.get("completed_at"),
            "stages": run.get("stages") or run.get("stage_states") or provenance.get("stage_telemetry") or [],
        },
        "speakers": run.get("speakers") or [],
        "speech_segments": result.get("speech_segments") or [],
        "transcript": run.get("transcript") if run.get("transcript") is not None else None,
        "alignment": run.get("alignment") if run.get("alignment") is not None else None,
        "observations": result.get("observations") or [],
        "tracks": run.get("tracks") or [],
        "evidence": result.get("evidence") or [],
        "evidence_relationships": run.get("evidence_relationships") or [],
        "candidate": result.get("candidate"),
        "assessment": run.get("assessment"),
        "disposition": result.get("disposition"),
        "reports": run.get("reports") or [],
        "lifecycle_events": run.get("lifecycle_events") or [],
        "uncertainty": run.get("uncertainty") if run.get("uncertainty") is not None else None,
        "alternative_explanations": run.get("alternative_explanations") or [],
        "software_provenance": {
            "software_version": provenance.get("software_version"),
            "source_sha256": provenance.get("input_sha256"),
            "schema_version": result.get("schema_version"),
        },
        "limitations": list(result.get("limitations") or []),
    }


def missing_result_families(envelope: Mapping[str, Any]) -> tuple[str, ...]:
    """Return required contract families that are genuinely absent or null."""
    return tuple(name for name in REQUIRED_RESULT_FAMILIES if name not in envelope or envelope[name] is None)
