from __future__ import annotations

import hashlib
import io
import os
import sys
import wave

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# The API wrapper lives in /api/voxvector. The canonical VoxVector package is
# /VoxVector/src/voxvector. Put the canonical source first so a same-named API
# package cannot shadow the implementation.
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "VoxVector", "src"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

import voxvector as _voxvector_package

CANONICAL_PACKAGE = os.path.join(ROOT, "voxvector")
_package_paths = [p for p in _voxvector_package.__path__ if p != CANONICAL_PACKAGE]
_voxvector_package.__path__[:] = [CANONICAL_PACKAGE, *_package_paths]

from voxvector.pipeline import VoxVectorPipeline
import voxvector.acoustic as _acoustic_module

MAX_BYTES = 20 * 1024 * 1024
SOURCE_REVISION = os.getenv("RENDER_GIT_COMMIT", "f6582ce0cf8131e601a7f632a0ea2dd183f1a292")
app = FastAPI(title="VoxVector Analysis API", version="0.2.25")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)


def _file_sha256(path: str) -> str:
    with open(path, "rb") as handle:
        return hashlib.sha256(handle.read()).hexdigest()


ACOUSTIC_MODULE_PATH = os.path.abspath(_acoustic_module.__file__)
PIPELINE_MODULE_PATH = os.path.abspath(sys.modules[VoxVectorPipeline.__module__].__file__)
ACOUSTIC_SOURCE_SHA256 = _file_sha256(ACOUSTIC_MODULE_PATH)
PIPELINE_SOURCE_SHA256 = _file_sha256(PIPELINE_MODULE_PATH)


def _runtime_self_test() -> tuple[bool, str]:
    """Check the deployed acoustic implementation without killing the web worker."""
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
            frames = wav.readframes(wav.getnframes())
    except wave.Error as exc:
        raise ValueError("Only PCM WAV audio is supported by the initial runtime") from exc
    if channels < 1 or rate <= 0:
        raise ValueError("Invalid WAV stream")
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
        "pipeline_module": PIPELINE_MODULE_PATH,
        "pipeline_source_sha256": PIPELINE_SOURCE_SHA256,
        "runtime_self_test": self_test,
    }


@app.post("/v1/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".wav"):
        raise HTTPException(status_code=415, detail="Initial runtime accepts WAV audio only")
    data = await file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="Audio payload exceeds 20 MB")
    self_test_ok, self_test = _runtime_self_test()
    if not self_test_ok:
        raise HTTPException(status_code=503, detail=f"VoxVector runtime self-test failed: {self_test}")
    try:
        audio, sample_rate = read_wav(data)
        if audio.size == 0:
            raise ValueError("Audio contains no samples")
        result = VoxVectorPipeline().analyze(audio, sample_rate)
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
        return payload
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
