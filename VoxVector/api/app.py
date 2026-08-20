from __future__ import annotations

import hashlib
import io
import os
import sys
import wave

import numpy as np
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import Response

# VoxVector is the canonical project root. This file is only the HTTP adapter;
# all analysis remains implemented under ./src/voxvector/.
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
from .observability import DIAGNOSTICS, elapsed_ms, new_request_id, request_id, safe_error, timer

MAX_SAMPLE_RATE = 48_000
SOURCE_REVISION = os.getenv("RENDER_GIT_COMMIT", "unknown")
app = FastAPI(title="VoxVector Analysis API", version=VoxVectorPipeline.software_version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def _file_sha256(path: str) -> str:
    with open(path, "rb") as handle:
        return hashlib.sha256(handle.read()).hexdigest()


ACOUSTIC_MODULE_PATH = os.path.abspath(_acoustic_module.__file__)
PIPELINE_MODULE_PATH = os.path.abspath(sys.modules[VoxVectorPipeline.__module__].__file__)
ACOUSTIC_SOURCE_SHA256 = _file_sha256(ACOUSTIC_MODULE_PATH)
PIPELINE_SOURCE_SHA256 = _file_sha256(PIPELINE_MODULE_PATH)
ACOUSTIC_RUNTIME_SIGNATURE = getattr(_acoustic_module, "RUNTIME_SIGNATURE", "missing")


def _runtime_self_test() -> tuple[bool, str]:
    """Check the canonical acoustic implementation without killing the worker."""
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
    """Persist lifecycle markers for analysis requests so abrupt origin failures leave evidence."""
    if request.url.path != "/v1/analyze":
        return await call_next(request)

    rid = new_request_id()
    started = timer()
    await DIAGNOSTICS.emit(
        "request.started",
        request_id=rid,
        method=request.method,
        path=request.url.path,
        content_length=request.headers.get("content-length"),
        content_type=request.headers.get("content-type"),
    )
    try:
        response = await call_next(request)
        await DIAGNOSTICS.emit(
            "request.completed",
            request_id=rid,
            method=request.method,
            path=request.url.path,
            status_code=response.status_code,
            duration_ms=elapsed_ms(started),
        )
        response.headers["X-Request-ID"] = rid
        return response
    except Exception as exc:
        await DIAGNOSTICS.emit(
            "request.unhandled_exception",
            request_id=rid,
            method=request.method,
            path=request.url.path,
            duration_ms=elapsed_ms(started),
            **safe_error(exc),
        )
        raise


@app.get("/health")
def health():
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
        "analysis_limits": {
            "max_sample_rate_hz": MAX_SAMPLE_RATE,
        },
    }


@app.post("/v1/analyze")
async def analyze(request: Request, file: UploadFile = File(...)):
    rid = request_id()
    if not file.filename or not file.filename.lower().endswith(".wav"):
        await DIAGNOSTICS.emit("request.rejected", request_id=rid, reason="unsupported_file_type", status_code=415)
        raise HTTPException(status_code=415, detail="Initial runtime accepts WAV audio only")
    data = await file.read()

    self_test_ok, self_test = _runtime_self_test()
    if not self_test_ok:
        await DIAGNOSTICS.emit("request.rejected", request_id=rid, reason="runtime_self_test_failed", status_code=503, detail=self_test)
        raise HTTPException(status_code=503, detail=f"VoxVector runtime self-test failed: {self_test}")

    stage_start = timer()
    try:
        audio, sample_rate = read_wav(data)
        await DIAGNOSTICS.emit(
            "stage.completed",
            request_id=rid,
            stage="decode",
            duration_ms=elapsed_ms(stage_start),
            bytes=len(data),
            sample_rate=sample_rate,
            sample_count=int(audio.size),
            duration_seconds=audio.size / sample_rate,
        )
        if audio.size == 0:
            raise ValueError("Audio contains no samples")

        stage_start = timer()
        result = VoxVectorPipeline().analyze(audio, sample_rate)
        await DIAGNOSTICS.emit(
            "stage.completed",
            request_id=rid,
            stage="analysis_pipeline",
            duration_ms=elapsed_ms(stage_start),
            sample_rate=sample_rate,
            sample_count=int(audio.size),
        )

        stage_start = timer()
        payload = VoxVectorPipeline.to_dict(result)
        payload["product"] = {
            "deception_probability": None,
            "probability_state": "not_available",
            "result_label": "Insufficient evidence",
            "analysis_state": "observational",
        }
        payload["audio"] = {
            "sample_rate": sample_rate,
            "duration_seconds": audio.size / sample_rate,
            "channels": "mixed_to_mono",
            "filename": file.filename,
        }
        await DIAGNOSTICS.emit(
            "stage.completed",
            request_id=rid,
            stage="serialization",
            duration_ms=elapsed_ms(stage_start),
        )
        return payload
    except HTTPException:
        raise
    except Exception as exc:
        await DIAGNOSTICS.emit(
            "request.analysis_error",
            request_id=rid,
            duration_ms=elapsed_ms(stage_start),
            **safe_error(exc),
        )
        raise HTTPException(status_code=400, detail=str(exc)) from exc
