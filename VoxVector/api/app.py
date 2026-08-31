from __future__ import annotations

import asyncio
import hashlib
import io
import os
import sys
import wave
from datetime import datetime, timedelta, timezone

import numpy as np
from fastapi import Depends, FastAPI, File, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ROOT = os.path.join(PROJECT_ROOT, "src")
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import voxvector as _voxvector_package

CANONICAL_PACKAGE = os.path.join(ROOT, "voxvector")
_package_paths = [p for p in _voxvector_package.__path__ if p != CANONICAL_PACKAGE]
_voxvector_package.__path__[:] = [CANONICAL_PACKAGE, *_package_paths]

from voxvector.pipeline import VoxVectorPipeline
import voxvector.acoustic as _acoustic_module
from .auth import require_developer
from .case_store import CaseNotFound, CaseStore
from .observability import DIAGNOSTICS, elapsed_ms, new_request_id, request_id, safe_error, timer
from .storage import StorageError

MAX_SAMPLE_RATE = 48_000
MAX_MEDIA_BYTES = int(os.getenv("VOXVECTOR_MEDIA_MAX_BYTES", str(250 * 1024 * 1024)))
SOURCE_REVISION = os.getenv("RENDER_GIT_COMMIT", "unknown")
app = FastAPI(title="VoxVector Analysis API", version=VoxVectorPipeline.software_version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
CASE_STORE = CaseStore(DIAGNOSTICS.storage)

PIPELINE_STAGE_DEFINITIONS = [
    (1, "file_upload_ingest", "File Upload / Ingest"),
    (2, "file_decode_normalization", "File Decode and Normalization"),
    (3, "provenance_integrity", "Provenance and Integrity"),
    (4, "channel_recording_assessment", "Channel and Recording Assessment"),
    (5, "speaker_identification_diarization", "Speaker Identification / Diarization"),
    (6, "speech_segmentation", "Speech Segmentation"),
    (7, "transcription_generation", "Transcription Generation"),
    (8, "transcript_alignment", "Transcript Alignment"),
    (9, "eligibility_reliability", "Eligibility and Reliability"),
    (10, "acoustic_feature_extraction", "Acoustic Feature Extraction"),
    (11, "prosodic_voice_quality", "Prosodic and Voice Quality Analysis"),
    (12, "temporal_pause_analysis", "Temporal and Pause Analysis"),
    (13, "linguistic_disfluency", "Linguistic and Disfluency Analysis"),
    (14, "question_answer_alignment", "Question / Answer Alignment"),
    (15, "within_speaker_baseline", "Within Speaker Baseline"),
    (16, "cross_method_evidence", "Cross Method Evidence Assembly"),
    (17, "evidence_convergence_conflict", "Evidence Convergence and Conflict"),
    (18, "candidate_classification", "Candidate Classification"),
    (19, "validation_calibration_gate", "Validation and Calibration Gate"),
    (20, "final_disposition", "Final Classification / Disposition"),
    (21, "audit_provenance_output", "Audit and Provenance Output"),
]

PIPELINE_FOUNDATION_STATUS = {
    "file_upload_ingest": "implemented",
    "file_decode_normalization": "implemented",
    "provenance_integrity": "implemented",
    "channel_recording_assessment": "implemented",
    "speaker_identification_diarization": "queued",
    "speech_segmentation": "implemented_foundation",
    "transcription_generation": "queued",
    "transcript_alignment": "queued",
    "eligibility_reliability": "implemented",
    "acoustic_feature_extraction": "implemented",
    "prosodic_voice_quality": "implemented_foundation",
    "temporal_pause_analysis": "implemented_foundation",
    "linguistic_disfluency": "conditional",
    "question_answer_alignment": "conditional",
    "within_speaker_baseline": "conditional",
    "cross_method_evidence": "implemented_foundation",
    "evidence_convergence_conflict": "implemented_foundation",
    "candidate_classification": "implemented_guarded",
    "validation_calibration_gate": "not_invoked",
    "final_disposition": "implemented_guarded",
    "audit_provenance_output": "implemented_foundation",
}


def _new_stage_states() -> list[dict]:
    return [
        {"number": number, "id": stage_id, "name": name, "status": "pending", "started_at": None, "completed_at": None, "duration_ms": None, "outcome": None, "error": None}
        for number, stage_id, name in PIPELINE_STAGE_DEFINITIONS
    ]


def _set_stage(stage_states: list[dict], stage_id: str, status: str, *, started_at: str | None = None, completed_at: str | None = None, duration_ms: float | None = None, outcome: str | None = None, error: str | None = None) -> None:
    for stage in stage_states:
        if stage["id"] == stage_id:
            stage.update({"status": status, "started_at": started_at, "completed_at": completed_at, "duration_ms": duration_ms, "outcome": outcome, "error": error})
            return


def _stage_build_summary() -> dict:
    values = list(PIPELINE_FOUNDATION_STATUS.values())
    return {
        "total": len(PIPELINE_STAGE_DEFINITIONS),
        "implemented_foundations": sum(value.startswith("implemented") for value in values),
        "conditional_or_not_invoked": sum(value in {"conditional", "not_invoked"} for value in values),
        "queued": sum(value == "queued" for value in values),
        "status_by_stage": PIPELINE_FOUNDATION_STATUS,
    }


def _file_sha256(path: str) -> str:
    with open(path, "rb") as handle:
        return hashlib.sha256(handle.read()).hexdigest()


ACOUSTIC_MODULE_PATH = os.path.abspath(_acoustic_module.__file__)
PIPELINE_MODULE_PATH = os.path.abspath(sys.modules[VoxVectorPipeline.__module__].__file__)
ACOUSTIC_SOURCE_SHA256 = _file_sha256(ACOUSTIC_MODULE_PATH)
PIPELINE_SOURCE_SHA256 = _file_sha256(PIPELINE_MODULE_PATH)
ACOUSTIC_RUNTIME_SIGNATURE = getattr(_acoustic_module, "RUNTIME_SIGNATURE", "missing")


def _runtime_self_test() -> tuple[bool, str]:
    try:
        smoke_frames = np.zeros((2, 1200), dtype=float)
        _acoustic_module.spectral_centroid(smoke_frames, 24000)
        _acoustic_module.spectral_spread(smoke_frames, 24000)
        return True, "passed"
    except Exception as exc:
        return False, f"{type(exc).__name__}: {exc}"


def read_wav(data: bytes):
    try:
        with wave.open(io.BytesIO(data), "rb") as wav:
            channels = wav.getnchannels()
            width = wav.getsampwidth()
            rate = wav.getframerate()
            frame_count = wav.getnframes()
            frames = wav.readframes(frame_count)
    except wave.Error as exc:
        raise ValueError("Only PCM WAV audio is supported by the initial runtime") from exc
    if channels < 1 or rate <= 0:
        raise ValueError("Invalid WAV stream")
    if rate > MAX_SAMPLE_RATE:
        raise ValueError(f"Sample rate exceeds the {MAX_SAMPLE_RATE} Hz runtime limit")
    if width == 1:
        audio = np.frombuffer(frames, dtype=np.uint8).astype(np.float64)
        audio = (audio - 128.0) / 128.0
    elif width == 2:
        audio = np.frombuffer(frames, dtype="<i2").astype(np.float64) / 32768.0
    elif width == 3:
        raw = np.frombuffer(frames, dtype=np.uint8).reshape(-1, 3)
        values = raw[:, 0].astype(np.int32) | (raw[:, 1].astype(np.int32) << 8) | (raw[:, 2].astype(np.int32) << 16)
        values = np.where(values & 0x800000, values - 0x1000000, values)
        audio = values.astype(np.float64) / 8388608.0
    elif width == 4:
        audio = np.frombuffer(frames, dtype="<i4").astype(np.float64) / 2147483648.0
    else:
        raise ValueError(f"Unsupported WAV sample width: {width}")
    if channels > 1:
        audio = audio.reshape(-1, channels).mean(axis=1)
    return audio, rate


@app.middleware("http")
async def diagnostic_middleware(request: Request, call_next) -> Response:
    if not request.url.path.startswith("/v1/"):
        return await call_next(request)
    rid = new_request_id(request.headers.get("X-Request-ID"))
    started = timer()
    try:
        response = await call_next(request)
        response.headers["X-Request-ID"] = rid
        if request.url.path == "/v1/analyze" or request.url.path.startswith("/v1/cases"):
            await DIAGNOSTICS.emit("request.completed", request_id=rid, method=request.method, path=request.url.path, status_code=response.status_code, duration_ms=elapsed_ms(started))
            if response.status_code >= 500:
                await DIAGNOSTICS.emit("request.server_error", request_id=rid, method=request.method, path=request.url.path, status_code=response.status_code, duration_ms=elapsed_ms(started))
        return response
    except Exception as exc:
        await DIAGNOSTICS.emit("request.unhandled_exception", request_id=rid, method=request.method, path=request.url.path, duration_ms=elapsed_ms(started), **safe_error(exc))
        raise


@app.get("/health")
async def health():
    self_test_ok, self_test = _runtime_self_test()
    return {
        "status": "ok" if self_test_ok else "degraded",
        "service": "voxvector-analysis-api",
        "pipeline": VoxVectorPipeline.software_version,
        "source_revision": SOURCE_REVISION,
        "canonical_package": CANONICAL_PACKAGE,
        "acoustic_module": ACOUSTIC_MODULE_PATH,
        "acoustic_source_sha256": ACOUSTIC_SOURCE_SHA256,
        "acoustic_runtime_signature": ACOUSTIC_RUNTIME_SIGNATURE,
        "pipeline_module": PIPELINE_MODULE_PATH,
        "pipeline_source_sha256": PIPELINE_SOURCE_SHA256,
        "runtime_self_test": self_test,
        "diagnostic_storage": DIAGNOSTICS.status(),
        "media_storage": DIAGNOSTICS.storage.media_configured,
        "analysis_limits": {"max_sample_rate_hz": MAX_SAMPLE_RATE, "max_media_bytes": MAX_MEDIA_BYTES},
        "pipeline_build": _stage_build_summary(),
        "testing": {"current_commit_qa": "not_reported", "historical_backend_baseline": {"passed": 91, "duration_seconds": 0.56}},
    }


@app.get("/v1/diagnostics/storage")
async def diagnostic_storage(_: dict = Depends(require_developer)):
    """Verify the API can reach and initialize the private media bucket without exposing secrets."""
    rid = new_request_id()
    storage = DIAGNOSTICS.storage
    if not storage.media_configured:
        return {"status": "not_configured", "media_storage": False, "provider": storage.config.provider, "request_id": rid}
    started = timer()
    try:
        await asyncio.to_thread(storage.ensure_media_bucket)
        elapsed = elapsed_ms(started)
        await DIAGNOSTICS.emit("storage.media_health", request_id=rid, status="ok", duration_ms=elapsed)
        return {"status": "ok", "media_storage": True, "provider": storage.config.provider, "bucket": storage.config.media_bucket, "duration_ms": elapsed, "request_id": rid}
    except StorageError as exc:
        elapsed = elapsed_ms(started)
        await DIAGNOSTICS.emit("storage.media_health", request_id=rid, status="error", duration_ms=elapsed, **safe_error(exc))
        raise HTTPException(status_code=503, detail=f"Media storage connectivity check failed [request {rid}]") from exc


async def _read_storage_prefix(prefix: str, limit: int) -> list[dict]:
    storage = DIAGNOSTICS.storage
    entries = await asyncio.to_thread(storage.list_json, prefix, min(limit, 250), 0)
    records: list[dict] = []
    for entry in entries:
        name = str(entry.get("name", ""))
        if not name.endswith(".json"):
            continue
        try:
            record = await asyncio.to_thread(storage.get_json, f"{prefix.rstrip('/')}/{name}")
        except StorageError:
            continue
        if isinstance(record, dict):
            records.append(record)
            if len(records) >= limit:
                break
    return records


async def _read_event_prefix(date_path: str, request_id_filter: str, limit: int) -> list[dict]:
    prefix = f"events/{date_path}/{request_id_filter}" if request_id_filter else f"events/{date_path}"
    if request_id_filter:
        return await _read_storage_prefix(prefix, limit)
    storage = DIAGNOSTICS.storage
    folders = await asyncio.to_thread(storage.list_json, prefix, min(limit, 250), 0)
    records: list[dict] = []
    for folder in folders:
        name = str(folder.get("name", "")).strip("/")
        if not name:
            continue
        child = f"{prefix}/{name}"
        try:
            records.extend(await _read_storage_prefix(child, max(1, limit - len(records))))
        except StorageError:
            continue
        if len(records) >= limit:
            break
    return records[:limit]


@app.get("/v1/diagnostics/errors")
async def diagnostic_errors(
    _: dict = Depends(require_developer),
    days: int = Query(default=14, ge=1, le=30),
    limit: int = Query(default=100, ge=1, le=250),
):
    storage = DIAGNOSTICS.storage
    if not DIAGNOSTICS.enabled or not storage.configured:
        raise HTTPException(status_code=503, detail="Diagnostic storage is not configured")
    now = datetime.now(timezone.utc)
    records: list[dict] = []
    try:
        for offset in range(days):
            day = now - timedelta(days=offset)
            prefix = f"error-index/{day:%Y/%m/%d}"
            records.extend(await _read_storage_prefix(prefix, max(1, limit - len(records))))
            if len(records) >= limit:
                break
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Diagnostic storage query failed") from exc
    records.sort(key=lambda item: str(item.get("timestamp", "")), reverse=True)
    return {"status": "ok", "count": len(records), "days": days, "events": records[:limit]}


@app.get("/v1/diagnostics/events")
async def diagnostic_events(
    _: dict = Depends(require_developer),
    request_id_filter: str | None = Query(default=None, alias="request_id"),
    days: int = Query(default=2, ge=1, le=7),
    limit: int = Query(default=100, ge=1, le=250),
):
    storage = DIAGNOSTICS.storage
    if not DIAGNOSTICS.enabled or not storage.configured:
        raise HTTPException(status_code=503, detail="Diagnostic storage is not configured")
    now = datetime.now(timezone.utc)
    records: list[dict] = []
    try:
        for offset in range(days):
            day = now - timedelta(days=offset)
            records.extend(await _read_event_prefix(day.strftime("%Y/%m/%d"), request_id_filter or "", max(1, limit - len(records))))
            if len(records) >= limit:
                break
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Diagnostic event query failed") from exc
    records.sort(key=lambda item: str(item.get("timestamp", "")), reverse=True)
    return {"status": "ok", "count": len(records[:limit]), "days": days, "request_id": request_id_filter, "events": records[:limit]}


@app.post("/v1/analyze")
async def analyze(request: Request, file: UploadFile = File(...)):
    rid = request_id()
    if not file.filename or not file.filename.lower().endswith(".wav"):
        await DIAGNOSTICS.emit("request.rejected", request_id=rid, reason="unsupported_file_type", status_code=415)
        raise HTTPException(status_code=415, detail="Initial runtime accepts WAV audio only")
    data = await file.read()
    if len(data) > MAX_MEDIA_BYTES:
        await DIAGNOSTICS.emit("request.rejected", request_id=rid, reason="media_too_large", status_code=413, bytes=len(data))
        raise HTTPException(status_code=413, detail=f"Audio exceeds the {MAX_MEDIA_BYTES // (1024 * 1024)} MB upload limit")
    self_test_ok, self_test = _runtime_self_test()
    if not self_test_ok:
        await DIAGNOSTICS.emit("request.rejected", request_id=rid, reason="runtime_self_test_failed", status_code=503, detail=self_test)
        raise HTTPException(status_code=503, detail=f"VoxVector runtime self-test failed: {self_test}")
    stage_start = timer()
    try:
        audio, sample_rate = read_wav(data)
        await DIAGNOSTICS.emit("stage.completed", request_id=rid, stage="decode", duration_ms=elapsed_ms(stage_start), bytes=len(data), sample_rate=sample_rate, sample_count=int(audio.size), duration_seconds=audio.size / sample_rate)
        if audio.size == 0:
            raise ValueError("Audio contains no samples")
        stage_start = timer()
        result = await asyncio.to_thread(VoxVectorPipeline().analyze, audio, sample_rate)
        await DIAGNOSTICS.emit("stage.completed", request_id=rid, stage="analysis_pipeline", duration_ms=elapsed_ms(stage_start), sample_rate=sample_rate, sample_count=int(audio.size))
        stage_start = timer()
        payload = VoxVectorPipeline.to_dict(result)
        payload["product"] = {"deception_probability": None, "probability_state": "not_available", "result_label": "Insufficient evidence", "analysis_state": "observational"}
        payload["audio"] = {"sample_rate": sample_rate, "duration_seconds": audio.size / sample_rate, "channels": "mixed_to_mono", "filename": file.filename}
        await DIAGNOSTICS.emit("stage.completed", request_id=rid, stage="serialization", duration_ms=elapsed_ms(stage_start))
        return payload
    except HTTPException:
        raise
    except Exception as exc:
        await DIAGNOSTICS.emit("request.analysis_error", request_id=rid, duration_ms=elapsed_ms(stage_start), **safe_error(exc))
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/v1/cases")
async def create_case(payload: dict | None = None, user: dict = Depends(require_developer)):
    try:
        case = await asyncio.to_thread(CASE_STORE.create_case, str(user["id"]), (payload or {}).get("title"))
        await DIAGNOSTICS.emit("case.created", case_id=case["case_id"], user_id=user["id"])
        return {"status": "ok", "case": case}
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Case storage is not configured or unavailable") from exc


@app.get("/v1/cases")
async def list_cases(limit: int = Query(default=50, ge=1, le=100), user: dict = Depends(require_developer)):
    try:
        cases = await asyncio.to_thread(CASE_STORE.list_cases, str(user["id"]), limit)
        return {"status": "ok", "count": len(cases), "cases": cases}
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Case storage is not configured or unavailable") from exc


@app.get("/v1/cases/{case_id}")
async def get_case(case_id: str, user: dict = Depends(require_developer)):
    try:
        case = await asyncio.to_thread(CASE_STORE.get_case, str(user["id"]), case_id)
        return {"status": "ok", "case": case}
    except CaseNotFound as exc:
        raise HTTPException(status_code=404, detail="Analysis case not found") from exc
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Case storage is unavailable") from exc


@app.post("/v1/cases/{case_id}/sources")
async def upload_case_source(case_id: str, request: Request, file: UploadFile = File(...), user: dict = Depends(require_developer)):
    rid = request_id()
    started = timer()
    await DIAGNOSTICS.emit("case.source_upload_started", request_id=rid, case_id=case_id, filename=file.filename or "", content_type=file.content_type or "unknown")
    if not file.filename or not file.filename.lower().endswith(".wav"):
        await DIAGNOSTICS.emit("case.source_upload_rejected", request_id=rid, case_id=case_id, reason="unsupported_file_type")
        raise HTTPException(status_code=415, detail="Initial case intake accepts WAV audio only")
    data = await file.read()
    if not data:
        await DIAGNOSTICS.emit("case.source_upload_rejected", request_id=rid, case_id=case_id, reason="empty_audio")
        raise HTTPException(status_code=400, detail="Audio file is empty")
    if len(data) > MAX_MEDIA_BYTES:
        await DIAGNOSTICS.emit("case.source_upload_rejected", request_id=rid, case_id=case_id, reason="media_too_large", bytes=len(data))
        raise HTTPException(status_code=413, detail=f"Audio exceeds the {MAX_MEDIA_BYTES // (1024 * 1024)} MB upload limit")
    if not DIAGNOSTICS.storage.media_configured:
        await DIAGNOSTICS.emit("case.source_upload_failed", request_id=rid, case_id=case_id, reason="media_storage_not_configured")
        raise HTTPException(status_code=503, detail="VoxVector media storage is not configured on the API")
    try:
        audio, sample_rate = read_wav(data)
        if audio.size == 0:
            raise ValueError("Audio contains no samples")
        peak = float(np.nanmax(np.abs(audio))) if np.any(np.isfinite(audio)) else 0.0
        clipping_ratio = float(np.mean(np.abs(audio) >= 0.999))
        source = await asyncio.to_thread(CASE_STORE.add_source, str(user["id"]), case_id, file.filename, data, {"sample_rate": sample_rate, "channels": "mixed_to_mono", "duration_seconds": audio.size / sample_rate, "peak_abs": peak, "clipping_ratio": clipping_ratio, "format": "wav"})
        await DIAGNOSTICS.emit("case.source_uploaded", request_id=rid, case_id=case_id, source_id=source["source_id"], bytes=len(data), duration_seconds=source["duration_seconds"], duration_ms=elapsed_ms(started))
        return {"status": "ok", "source": source, "request_id": rid}
    except CaseNotFound as exc:
        await DIAGNOSTICS.emit("case.source_upload_failed", request_id=rid, case_id=case_id, reason="case_not_found")
        raise HTTPException(status_code=404, detail="Analysis case not found") from exc
    except StorageError as exc:
        await DIAGNOSTICS.emit("case.source_upload_failed", request_id=rid, case_id=case_id, reason="storage_error", **safe_error(exc), duration_ms=elapsed_ms(started))
        raise HTTPException(status_code=503, detail=f"Media storage upload failed [request {rid}]") from exc
    except ValueError as exc:
        await DIAGNOSTICS.emit("case.source_upload_rejected", request_id=rid, case_id=case_id, reason="invalid_wav", detail=str(exc))
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/v1/cases/{case_id}/sources/{source_id}/playback")
async def source_playback_url(case_id: str, source_id: str, expires: int = Query(default=900, ge=60, le=3600), user: dict = Depends(require_developer)):
    try:
        _, source = await asyncio.to_thread(CASE_STORE.get_source, str(user["id"]), case_id, source_id)
        url = await asyncio.to_thread(DIAGNOSTICS.storage.create_signed_url, source["media_path"].removeprefix(f"{DIAGNOSTICS.storage.config.media_bucket}/"), expires)
        return {"status": "ok", "source_id": source_id, "url": url, "expires_in": expires}
    except CaseNotFound as exc:
        raise HTTPException(status_code=404, detail="Analysis source not found") from exc
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Media storage is not configured or unavailable") from exc


@app.post("/v1/cases/{case_id}/sources/{source_id}/analyze")
async def analyze_case_source(case_id: str, source_id: str, user: dict = Depends(require_developer)):
    rid = request_id()
    try:
        case, source = await asyncio.to_thread(CASE_STORE.get_source, str(user["id"]), case_id, source_id)
        data = await asyncio.to_thread(DIAGNOSTICS.storage.get_bytes, source["media_path"].removeprefix(f"{DIAGNOSTICS.storage.config.media_bucket}/"))
        audio, sample_rate = read_wav(data)
        if audio.size == 0:
            raise ValueError("Audio contains no samples")

        stage_states = _new_stage_states()
        now = datetime.now(timezone.utc).isoformat()
        _set_stage(stage_states, "file_upload_ingest", "complete", started_at=source["created_at"], completed_at=source["created_at"], outcome="source persisted")
        _set_stage(stage_states, "file_decode_normalization", "complete", started_at=now, completed_at=now, outcome="PCM WAV decoded")
        _set_stage(stage_states, "provenance_integrity", "complete", started_at=now, completed_at=now, outcome="SHA-256 source hash recorded")
        _set_stage(stage_states, "channel_recording_assessment", "complete", started_at=now, completed_at=now, outcome="recording metadata captured")

        started = timer()
        result = await asyncio.to_thread(VoxVectorPipeline().analyze, audio, sample_rate)
        completed = datetime.now(timezone.utc).isoformat()
        _set_stage(stage_states, "speech_segmentation", "complete" if result.speech_segments else "not_run", started_at=now, completed_at=completed, duration_ms=elapsed_ms(started), outcome=f"{len(result.speech_segments)} speech segments detected")
        _set_stage(stage_states, "eligibility_reliability", "complete", started_at=now, completed_at=completed, duration_ms=elapsed_ms(started), outcome=result.eligibility.status)
        for stage_id in ("acoustic_feature_extraction", "prosodic_voice_quality", "temporal_pause_analysis", "cross_method_evidence", "evidence_convergence_conflict", "candidate_classification", "final_disposition", "audit_provenance_output"):
            _set_stage(stage_states, stage_id, "complete", started_at=now, completed_at=completed, outcome="pipeline result recorded")
        _set_stage(stage_states, "linguistic_disfluency", "not_run", outcome="transcript not attached")
        _set_stage(stage_states, "within_speaker_baseline", "not_run", outcome="baseline not attached")
        _set_stage(stage_states, "question_answer_alignment", "not_run", outcome="question context not attached")
        _set_stage(stage_states, "speaker_identification_diarization", "pending", outcome="speaker processing queued")
        _set_stage(stage_states, "transcription_generation", "pending", outcome="production transcription queued")
        _set_stage(stage_states, "transcript_alignment", "pending", outcome="transcription queued")
        _set_stage(stage_states, "validation_calibration_gate", "not_run", outcome="inferential validation gate not invoked")

        completed_count = sum(stage["status"] in {"complete", "completed", "success", "succeeded"} for stage in stage_states)
        pending_count = sum(stage["status"] in {"pending", "running", "processing", "in_progress"} for stage in stage_states)
        not_run_count = sum(stage["status"] == "not_run" for stage in stage_states)
        failed_count = sum(stage["status"] in {"failed", "error"} for stage in stage_states)
        run = {
            "run_id": result.run_id,
            "request_id": rid,
            "status": "completed",
            "started_at": now,
            "completed_at": completed,
            "source_id": source_id,
            "pipeline_version": VoxVectorPipeline.software_version,
            "pipeline_build": {"total_stages": 21, "completed": completed_count, "pending": pending_count, "not_run": not_run_count, "failed": failed_count},
            "testing": {"current_commit_qa": "not_reported", "historical_backend_baseline": {"passed": 91, "duration_seconds": 0.56}},
            "stages": stage_states,
            "result": VoxVectorPipeline.to_dict(result),
        }
        updated_case = await asyncio.to_thread(CASE_STORE.update_run, str(user["id"]), case_id, run)
        await DIAGNOSTICS.emit("case.analysis_completed", case_id=case_id, source_id=source_id, run_id=result.run_id, request_id=rid, completed_stages=completed_count, pending_stages=pending_count, not_run_stages=not_run_count)
        return {"status": "ok", "case": updated_case, "run": run}
    except CaseNotFound as exc:
        raise HTTPException(status_code=404, detail="Analysis case or source not found") from exc
    except StorageError as exc:
        raise HTTPException(status_code=503, detail="Case or media storage is unavailable") from exc
    except Exception as exc:
        await DIAGNOSTICS.emit("request.analysis_error", request_id=rid, case_id=case_id, source_id=source_id, **safe_error(exc))
        raise HTTPException(status_code=400, detail=str(exc)) from exc
