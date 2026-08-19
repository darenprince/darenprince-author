from http.server import BaseHTTPRequestHandler
import io
import json
import os
import sys
import wave

import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "VoxVector", "src"))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

from voxvector.pipeline import VoxVectorPipeline

MAX_BYTES = 20 * 1024 * 1024


def read_wav(data: bytes):
    with wave.open(io.BytesIO(data), "rb") as wav:
        channels = wav.getnchannels()
        width = wav.getsampwidth()
        rate = wav.getframerate()
        frames = wav.readframes(wav.getnframes())
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


def send(handler, status, payload):
    body = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.send_header("Cache-Control", "no-store")
    handler.end_headers()
    handler.wfile.write(body)


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        send(self, 204, {})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > MAX_BYTES:
                raise ValueError("Audio payload must be between 1 byte and 20 MB")
            data = self.rfile.read(length)
            audio, sample_rate = read_wav(data)
            if audio.size == 0:
                raise ValueError("Audio contains no samples")

            result = VoxVectorPipeline().analyze(audio, sample_rate)
            payload = VoxVectorPipeline.to_dict(result)
            payload.update(
                {
                    "product": {
                        "deception_probability": None,
                        "probability_state": "not_available",
                        "result_label": "Insufficient evidence",
                        "analysis_state": "observational",
                    },
                    "audio": {
                        "sample_rate": sample_rate,
                        "duration_seconds": audio.size / sample_rate,
                        "channels": "mixed_to_mono",
                    },
                }
            )
            send(self, 200, payload)
        except Exception as exc:
            send(
                self,
                400,
                {
                    "error": str(exc),
                    "product": {
                        "deception_probability": None,
                        "probability_state": "unavailable",
                    },
                },
            )
