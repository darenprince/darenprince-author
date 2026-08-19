from __future__ import annotations

import io
import os
import sys
import wave

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

# Render starts this API from the repository root. The API wrapper lives in
# /api/voxvector, while the canonical VoxVector implementation lives in
# /VoxVector/src/voxvector. Make the canonical package the FIRST search path so
# a same-named module can never shadow the canonical implementation.
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
SOURCE_REVISION = "575bff75a1d68f91afb7e1f9b5f62b1d4d674123"
app = FastAPI(title="VoxVector Analysis API", version="0.2.24")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"]
)


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
    return {
        "status": "ok",
        "service": "voxvector-analysis-api",
        "pipeline": VoxVectorPipeline.software_version,
        "source_revision": SOURCE_REVISION,
        "canonical_package": CANONICAL_PACKAGE,
        "acoustic_module": os.path.abspath(_acoustic_module.__file__),
    }


@app.post("/v1/analyze")
async def analyze(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".wav"):
        raise HTTPException(status_code=415, detail="Initial runtime accepts WAV audio only")
    data = await file.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="Audio payload exceeds 20 MB")
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
