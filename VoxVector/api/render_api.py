from __future__ import annotations

import asyncio
import json
import os
from datetime import datetime, timedelta, timezone
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request as UrlRequest, urlopen

from fastapi import APIRouter, Depends, HTTPException, Query

from .auth import require_developer

RENDER_API_BASE = "https://api.render.com/v1"
render_router = APIRouter(prefix="/v1/developer/render", tags=["developer-render"])


def _config(service_id: str | None = None) -> tuple[str, str]:
    api_key = os.getenv("RENDER_API_KEY", "").strip()
    resolved_service = (service_id or os.getenv("RENDER_SERVICE_ID", "")).strip()
    if not api_key:
        raise HTTPException(status_code=503, detail="Render API bridge is not configured on the API runtime.")
    if not resolved_service:
        raise HTTPException(status_code=503, detail="Render service ID is not configured on the API runtime.")
    return api_key, resolved_service


def _deploy_hook_url() -> str:
    value = os.getenv("RENDER_DEPLOY_HOOK_URL", "").strip()
    if not value:
        raise HTTPException(status_code=503, detail="Render deploy hook is not configured on the API runtime.")
    return value


def _trigger_deploy_hook() -> dict:
    hook_url = _deploy_hook_url()
    request = UrlRequest(
        hook_url,
        data=b"",
        headers={"Accept": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=20) as response:
            raw = response.read().decode("utf-8", errors="replace")
            payload = json.loads(raw) if raw else {}
            return {"response_status": getattr(response, "status", 200), "payload": payload}
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(status_code=502, detail=f"Render deploy hook returned HTTP {exc.code}: {detail[:240]}") from exc
    except (URLError, TimeoutError) as exc:
        raise HTTPException(status_code=502, detail="Unable to reach the configured Render deploy hook.") from exc


def _render_get(path: str, api_key: str, params: dict | None = None) -> dict | list:
    query = f"?{urlencode(params or {}, doseq=True)}" if params else ""
    request = UrlRequest(
        f"{RENDER_API_BASE}{path}{query}",
        headers={"Authorization": f"Bearer {api_key}", "Accept": "application/json"},
        method="GET",
    )
    try:
        with urlopen(request, timeout=20) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise HTTPException(status_code=502, detail=f"Render API returned HTTP {exc.code}: {detail[:240]}") from exc
    except (URLError, TimeoutError) as exc:
        raise HTTPException(status_code=502, detail="Unable to reach the Render API.") from exc


def _rows(payload: dict | list) -> list[dict]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if not isinstance(payload, dict):
        return []
    for key in ("items", "data", "deploys", "logs", "services"):
        value = payload.get(key)
        if isinstance(value, list):
            return [item for item in value if isinstance(item, dict)]
    return []


def _object(payload: dict | list, *keys: str) -> dict:
    if not isinstance(payload, dict):
        return {}
    for key in keys:
        value = payload.get(key)
        if isinstance(value, dict):
            return value
    return payload


def _scalar(value):
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    return None


def _text(value, fallback: str = "") -> str:
    if isinstance(value, str):
        return value
    if value is None:
        return fallback
    if isinstance(value, (int, float, bool)):
        return str(value)
    if isinstance(value, dict):
        for key in ("message", "text", "event", "name", "detail"):
            candidate = value.get(key)
            if isinstance(candidate, str) and candidate.strip():
                return candidate
        try:
            return json.dumps(value, separators=(",", ":"), ensure_ascii=False)[:1200]
        except (TypeError, ValueError):
            return fallback
    return fallback


def _normalize_log(record: dict) -> dict:
    message = _text(record.get("message") or record.get("text") or record.get("event") or record.get("data"), "Render log event")
    timestamp = _scalar(record.get("timestamp") or record.get("time") or record.get("createdAt") or record.get("created_at"))
    return {
        "message": message,
        "timestamp": timestamp,
        "level": _scalar(record.get("level")),
        "type": _scalar(record.get("type")),
        "raw": record,
    }


def _owner_id(service: dict) -> str | None:
    direct = service.get("ownerId") or service.get("owner_id")
    if direct:
        return str(direct)
    owner = service.get("owner")
    if isinstance(owner, dict) and owner.get("id"):
        return str(owner["id"])
    return None


@render_router.get("/status")
def render_status(
    service_id: str | None = Query(default=None),
    log_minutes: int = Query(default=30, ge=1, le=120),
    _: dict = Depends(require_developer),
):
    api_key, resolved_service = _config(service_id)
    service_payload = _render_get(f"/services/{resolved_service}", api_key)
    service = _object(service_payload, "service", "data")
    details = service.get("serviceDetails") if isinstance(service.get("serviceDetails"), dict) else {}
    deploy_payload = _render_get(f"/services/{resolved_service}/deploys", api_key, {"limit": 5})
    deploys = _rows(deploy_payload)
    instances_payload = _render_get(f"/services/{resolved_service}/instances", api_key, {"limit": 20})
    instance_rows = _rows(instances_payload)
    return {
        "status": "ok",
        "service": {
            "id": service.get("id") or resolved_service,
            "name": service.get("name"),
            "type": service.get("type"),
            "suspended": _scalar(service.get("suspended")),
            "state": _text(service.get("state") or service.get("status") or service.get("serviceState") or ("suspended" if service.get("suspended") else "active")),
            "url": _text(service.get("url") or service.get("serviceUrl") or details.get("url")),
            "owner_id": _owner_id(service),
            "region": _text(service.get("region") or service.get("regionName") or details.get("region")),
        },
        "latest_deploy": deploys[0] if deploys else {},
        "deploys": deploys,
        "instances": instance_rows,
        "observed_at": datetime.now(timezone.utc).isoformat(),
        "log_window_minutes": log_minutes,
    }


@render_router.post("/deploy")
def render_deploy(_: dict = Depends(require_developer)):
    result = _trigger_deploy_hook()
    return {
        "status": "accepted",
        "trigger": "render_deploy_hook",
        "response_status": result["response_status"],
        "triggered_at": datetime.now(timezone.utc).isoformat(),
    }


@render_router.get("/logs")
def render_logs(
    service_id: str | None = Query(default=None),
    minutes: int = Query(default=10, ge=1, le=60),
    limit: int = Query(default=120, ge=1, le=100),
    _: dict = Depends(require_developer),
):
    api_key, resolved_service = _config(service_id)
    service_payload = _render_get(f"/services/{resolved_service}", api_key)
    service = service_payload if isinstance(service_payload, dict) else {}
    owner_id = _owner_id(service)
    if not owner_id:
        raise HTTPException(status_code=502, detail="Render service response did not include a workspace owner ID for log queries.")
    end = datetime.now(timezone.utc)
    start = end - timedelta(minutes=minutes)
    payload = _render_get(
        "/logs",
        api_key,
        {
            "ownerId": owner_id,
            "startTime": start.isoformat().replace("+00:00", "Z"),
            "endTime": end.isoformat().replace("+00:00", "Z"),
            "direction": "backward",
            "resource": resolved_service,
            "limit": min(limit, 100),
            "type": ["app", "request", "build"],
        },
    )
    return {
        "status": "ok",
        "service_id": resolved_service,
        "owner_id": owner_id,
        "logs": [_normalize_log(record) for record in _rows(payload)],
        "observed_at": end.isoformat(),
    }


@render_router.post("/analysis")
async def render_analysis(
    case_id: str = Query(..., min_length=1),
    source_id: str = Query(..., min_length=1),
    user: dict = Depends(require_developer),
):
    """Run the canonical case analysis with explicitly configured speech providers.

    This endpoint deliberately reuses the canonical case store, evidence acquisition,
    provider adapters, and VoxVectorPipeline instead of maintaining a second analysis stack.
    """
    from .app import (
        CASE_STORE,
        DIAGNOSTICS,
        PIPELINE_STAGE_DEFINITIONS,
        SOURCE_REVISION,
        VoxVectorPipeline,
        _set_stage,
        _speech_runtime_status,
        compose_result_envelope,
        elapsed_ms,
        get_diarization_provider,
        get_transcription_provider,
        read_wav,
        request_id,
    )
    from voxvector.evidence_acquisition import build_evidence_acquisition
    from voxvector.stage_telemetry import StageTelemetry

    rid = request_id()
    started_at = datetime.now(timezone.utc).isoformat()
    live_run_id = f"live-{rid}"
    stage_states = [
        {"number": number, "id": stage_id, "name": name, "status": "pending", "started_at": None, "completed_at": None, "duration_ms": None, "outcome": None, "error": None}
        for number, stage_id, name in PIPELINE_STAGE_DEFINITIONS
    ]
    telemetry = StageTelemetry(PIPELINE_STAGE_DEFINITIONS)

    try:
        case, source = await asyncio.to_thread(CASE_STORE.get_source, str(user["id"]), case_id, source_id)
        _set_stage(stage_states, "file_upload_ingest", "complete", started_at=source.get("created_at"), completed_at=source.get("created_at"), outcome="source persisted before analysis run")

        data = await asyncio.to_thread(DIAGNOSTICS.storage.get_bytes, source["media_path"].removeprefix(f"{DIAGNOSTICS.storage.config.media_bucket}/"))
        telemetry.start("file_decode_normalization")
        audio, sample_rate = read_wav(data)
        if audio.size == 0:
            raise ValueError("Audio contains no samples")
        telemetry.complete("file_decode_normalization", outcome="PCM WAV decoded and normalized to mono")
        decode_stage = telemetry.snapshot()[1]
        _set_stage(stage_states, "file_decode_normalization", "complete", started_at=decode_stage["started_at"], completed_at=decode_stage["completed_at"], duration_ms=decode_stage["duration_ms"], outcome=decode_stage["outcome"])

        telemetry.start("provenance_integrity")
        expected_sha = str(source.get("sha256") or "")
        actual_sha = __import__("hashlib").sha256(data).hexdigest()
        if expected_sha and expected_sha != actual_sha:
            raise ValueError("Persisted source SHA-256 does not match retrieved media")
        telemetry.complete("provenance_integrity", outcome="SHA-256 source integrity confirmed")
        integrity_stage = telemetry.snapshot()[2]
        _set_stage(stage_states, "provenance_integrity", "complete", started_at=integrity_stage["started_at"], completed_at=integrity_stage["completed_at"], duration_ms=integrity_stage["duration_ms"], outcome=integrity_stage["outcome"])

        telemetry.start("channel_recording_assessment")
        peak = float(__import__("numpy").nanmax(__import__("numpy").abs(audio))) if __import__("numpy").any(__import__("numpy").isfinite(audio)) else 0.0
        clipping_ratio = float(__import__("numpy").mean(__import__("numpy").abs(audio) >= 0.999))
        telemetry.complete("channel_recording_assessment", outcome=f"recording assessed: sample_rate={sample_rate}, peak_abs={peak:.6f}, clipping_ratio={clipping_ratio:.6f}")
        channel_stage = telemetry.snapshot()[3]
        _set_stage(stage_states, "channel_recording_assessment", "complete", started_at=channel_stage["started_at"], completed_at=channel_stage["completed_at"], duration_ms=channel_stage["duration_ms"], outcome=channel_stage["outcome"])

        speech_runtime = _speech_runtime_status()
        transcription_provider = get_transcription_provider() if speech_runtime.get("transcription", {}).get("execution_ready") else None
        diarization_enabled = os.getenv("VOXVECTOR_ENABLE_DIARIZATION_RUNS", "").strip().lower() in {"1", "true", "yes", "on"}
        diarization_provider = get_diarization_provider() if diarization_enabled and speech_runtime.get("diarization", {}).get("execution_ready") else None

        acquisition = await asyncio.to_thread(
            build_evidence_acquisition,
            audio,
            sample_rate,
            transcript_provider=transcription_provider,
            diarization_provider=diarization_provider,
        )
        acquisition_dict = acquisition.to_dict()
        transcript = acquisition_dict.get("transcript") or {}
        words = transcript.get("words") if isinstance(transcript, dict) else []
        transcript_tokens = [str(item.get("text", "")).strip() for item in (words or []) if isinstance(item, dict) and str(item.get("text", "")).strip()]

        pipeline_started = __import__("time").perf_counter()
        result = await asyncio.to_thread(VoxVectorPipeline().analyze, audio, sample_rate, transcript_tokens=transcript_tokens or None)
        pipeline_duration = (__import__("time").perf_counter() - pipeline_started) * 1000.0
        completed_at = datetime.now(timezone.utc).isoformat()

        result_dict = VoxVectorPipeline.to_dict(result)
        transcription_state = str(acquisition_dict.get("transcription_state") or "not_invoked")
        diarization_state = str(acquisition_dict.get("diarization_state") or "not_invoked")
        multimodal_timeline = acquisition_dict.get("multimodal_timeline")

        _set_stage(stage_states, "speaker_identification_diarization", "complete" if diarization_state == "completed" else "not_run", completed_at=completed_at, outcome=("speaker turns acquired" if diarization_state == "completed" else "diarization not invoked in the constrained runtime"))
        _set_stage(stage_states, "transcription_generation", "complete" if transcription_state == "completed" else "not_run", completed_at=completed_at, outcome=("timestamped transcript acquired" if transcription_state == "completed" else f"transcription {transcription_state}"))
        _set_stage(stage_states, "transcript_alignment", "complete" if multimodal_timeline else "not_run", completed_at=completed_at, outcome=("timestamped transcript/audio timeline assembled" if multimodal_timeline else "transcript alignment not available"))

        internal_completed = {
            "speech_segmentation": ("complete", f"{len(result.speech_segments)} speech segments detected"),
            "eligibility_reliability": ("complete", result.eligibility.status),
            "acoustic_feature_extraction": ("complete", "completed inside composite pipeline"),
            "prosodic_voice_quality": ("complete", "completed inside composite pipeline"),
            "temporal_pause_analysis": ("complete", "completed inside composite pipeline"),
            "cross_method_evidence": ("complete", "completed inside composite pipeline"),
            "evidence_convergence_conflict": ("complete", "completed inside composite pipeline"),
            "candidate_classification": ("complete", "guarded candidate state recorded"),
            "final_disposition": ("complete", "guarded final disposition recorded"),
            "audit_provenance_output": ("complete", "analysis provenance and run record assembled"),
        }
        for stage_id, (status, outcome) in internal_completed.items():
            _set_stage(stage_states, stage_id, status, completed_at=completed_at, outcome=outcome)

        _set_stage(stage_states, "linguistic_disfluency", "complete" if transcript_tokens else "not_run", completed_at=completed_at, outcome=("transcript-derived observations computed" if transcript_tokens else "transcript unavailable"))
        _set_stage(stage_states, "question_answer_alignment", "not_run", completed_at=completed_at, outcome="question context not supplied")
        _set_stage(stage_states, "within_speaker_baseline", "not_run", completed_at=completed_at, outcome="independent baseline not supplied")
        _set_stage(stage_states, "validation_calibration_gate", "not_run", completed_at=completed_at, outcome="inferential validation gate not invoked")

        completed_count = sum(stage["status"] in {"complete", "completed", "success", "succeeded"} for stage in stage_states)
        pending_count = sum(stage["status"] in {"pending", "running", "processing", "in_progress"} for stage in stage_states)
        not_run_count = sum(stage["status"] == "not_run" for stage in stage_states)
        failed_count = sum(stage["status"] in {"failed", "error"} for stage in stage_states)
        final_run = {
            "run_id": result.run_id,
            "analysis_id": result.run_id,
            "request_id": rid,
            "status": "completed",
            "started_at": started_at,
            "completed_at": completed_at,
            "source_id": source_id,
            "pipeline_version": VoxVectorPipeline.software_version,
            "pipeline_duration_ms": pipeline_duration,
            "telemetry_scope": {"route_boundary_stages": ["file_decode_normalization", "provenance_integrity", "channel_recording_assessment"], "composite_pipeline_internal_timing": "not independently instrumented"},
            "pipeline_build": {"total_stages": 21, "completed": completed_count, "pending": pending_count, "not_run": not_run_count, "failed": failed_count},
            "testing": {"current_commit_qa": "external_workflow_required", "source_revision": SOURCE_REVISION, "historical_backend_baseline": {"passed": 91, "duration_seconds": 0.56}},
            "stages": stage_states,
            "result": result_dict,
            "acquisition": acquisition_dict,
            "transcript": acquisition_dict.get("transcript"),
            "speakers": acquisition_dict.get("diarization", {}).get("speakers", []) if isinstance(acquisition_dict.get("diarization"), dict) else [],
            "tracks": [],
            "provider_timings_ms": acquisition_dict.get("provider_timings_ms") or {},
        }
        envelope = compose_result_envelope(case=case, source=source, run=final_run, result=result_dict)
        final_run["result_envelope"] = envelope
        updated_case = await asyncio.to_thread(CASE_STORE.update_run, str(user["id"]), case_id, final_run)
        await DIAGNOSTICS.emit("case.live_provider_analysis_completed", case_id=case_id, source_id=source_id, run_id=result.run_id, request_id=rid, completed_stages=completed_count, transcription_state=transcription_state, diarization_state=diarization_state, pipeline_duration_ms=pipeline_duration)
        return {"status": "ok", "case": updated_case, "run": final_run, "result_envelope": envelope}
    except Exception as exc:
        try:
            failed_run = {"run_id": live_run_id, "analysis_id": live_run_id, "request_id": rid, "status": "failed", "started_at": started_at, "completed_at": datetime.now(timezone.utc).isoformat(), "source_id": source_id, "pipeline_version": "0.2.26", "pipeline_build": {"total_stages": 21, "completed": sum(stage["status"] in {"complete", "completed", "success", "succeeded"} for stage in stage_states), "pending": sum(stage["status"] in {"pending", "running", "processing", "in_progress"} for stage in stage_states), "not_run": sum(stage["status"] == "not_run" for stage in stage_states), "failed": 1}, "stages": stage_states, "error": {"type": type(exc).__name__, "message": str(exc)[:1200]}}
            await asyncio.to_thread(CASE_STORE.update_run, str(user["id"]), case_id, failed_run)
        except Exception:
            pass
        raise HTTPException(status_code=400, detail=str(exc)) from exc
