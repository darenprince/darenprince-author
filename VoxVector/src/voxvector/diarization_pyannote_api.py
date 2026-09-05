from __future__ import annotations

import json
import os
import time
import uuid
import wave
from io import BytesIO
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

import numpy as np

from .evidence_acquisition import DiarizationResult, SpeakerSegment
from .speech_runtime_logging import speech_log


class PyannoteAPIDiarizationProvider:
    """pyannoteAI cloud diarization provider with explicit job provenance."""

    provider_id = "pyannote.api"
    api_base_url = "https://api.pyannote.ai/v1"

    def __init__(
        self,
        *,
        api_key: str | None = None,
        model: str | None = None,
        poll_interval_seconds: float | None = None,
        timeout_seconds: float | None = None,
    ) -> None:
        self.api_key = api_key or os.getenv("PYANNOTE_KEY") or os.getenv("PYANNOTE_API_KEY")
        self.model = model or os.getenv("VOXVECTOR_PYANNOTE_API_MODEL", "").strip() or None
        self.poll_interval_seconds = poll_interval_seconds or float(
            os.getenv("VOXVECTOR_PYANNOTE_API_POLL_SECONDS", "2.0")
        )
        self.timeout_seconds = timeout_seconds or float(
            os.getenv("VOXVECTOR_PYANNOTE_API_TIMEOUT_SECONDS", "120")
        )

    def release(self) -> None:
        return None

    def _request(self, path: str, *, method: str = "GET", payload: bytes | None = None, headers: dict[str, str] | None = None) -> tuple[int, dict, dict[str, str]]:
        if not self.api_key:
            raise RuntimeError("pyannoteAI API key is required for the configured provider")
        request_headers = {"Authorization": f"Bearer {self.api_key}"}
        request_headers.update(headers or {})
        request = Request(f"{self.api_base_url}{path}", data=payload, headers=request_headers, method=method)
        try:
            with urlopen(request, timeout=self.timeout_seconds) as response:
                body = response.read()
                return response.status, json.loads(body.decode("utf-8")) if body else {}, dict(response.headers.items())
        except HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"pyannoteAI HTTP {exc.code}: {body[:500]}") from exc
        except URLError as exc:
            raise RuntimeError(f"pyannoteAI network error: {exc.reason}") from exc

    @staticmethod
    def _wav_bytes(signal: np.ndarray, sample_rate: int) -> bytes:
        pcm = np.asarray(signal, dtype=np.float32).reshape(-1)
        clipped = np.clip(pcm, -1.0, 1.0)
        int16 = (clipped * 32767.0).astype("<i2")
        stream = BytesIO()
        with wave.open(stream, "wb") as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(sample_rate)
            wav.writeframes(int16.tobytes())
        return stream.getvalue()

    def diarize(self, signal: np.ndarray, sample_rate: int) -> DiarizationResult:
        if not self.api_key:
            raise RuntimeError("pyannoteAI API key is required for the configured provider")
        if sample_rate <= 0:
            raise ValueError("sample_rate must be positive")

        started = time.perf_counter()
        object_key = f"voxvector-{uuid.uuid4().hex}.wav"
        media_url = f"media://{object_key}"
        speech_log("diarization.started", started=started, provider=self.provider_id)

        _, upload_ticket, _ = self._request(
            "/media",
            method="POST",
            payload=json.dumps({"url": media_url}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        upload_url = upload_ticket.get("url")
        if not upload_url:
            raise RuntimeError("pyannoteAI media upload ticket did not include a URL")

        audio = self._wav_bytes(signal, sample_rate)
        upload_request = Request(upload_url, data=audio, headers={"Content-Type": "application/octet-stream"}, method="PUT")
        try:
            with urlopen(upload_request, timeout=self.timeout_seconds) as response:
                if response.status < 200 or response.status >= 300:
                    raise RuntimeError(f"pyannoteAI media upload failed with HTTP {response.status}")
        except HTTPError as exc:
            raise RuntimeError(f"pyannoteAI media upload HTTP {exc.code}") from exc
        except URLError as exc:
            raise RuntimeError(f"pyannoteAI media upload network error: {exc.reason}") from exc

        job_payload: dict[str, object] = {"url": media_url, "exclusive": True}
        if self.model:
            job_payload["model"] = self.model
        _, job, _ = self._request(
            "/diarize",
            method="POST",
            payload=json.dumps(job_payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        job_id = str(job.get("jobId") or "")
        if not job_id:
            raise RuntimeError("pyannoteAI diarization response did not include jobId")

        deadline = time.monotonic() + self.timeout_seconds
        terminal_failure = {"failed", "canceled"}
        while True:
            _, current, _ = self._request(f"/jobs/{job_id}")
            status = str(current.get("status") or "").lower()
            if status == "succeeded":
                output = current.get("output") or {}
                rows = output.get("exclusiveDiarization") or output.get("diarization") or []
                segments = tuple(
                    SpeakerSegment(
                        speaker_id=str(item["speaker"]),
                        start_s=float(item["start"]),
                        end_s=float(item["end"]),
                        confidence=None,
                    )
                    for item in rows
                    if {"speaker", "start", "end"} <= set(item)
                )
                speakers = tuple(sorted({item.speaker_id for item in segments}))
                result = DiarizationResult(
                    provider_id=self.provider_id,
                    speakers=speakers,
                    segments=segments,
                    limitations=(
                        "Speaker labels identify diarization clusters, not verified real-world identities.",
                        "Provider diarization quality and confidence are not VoxVector deception confidence.",
                    ),
                    provenance={
                        "provider": self.provider_id,
                        "job_id": job_id,
                        "model": self.model,
                        "fallback_used": False,
                    },
                )
                speech_log("diarization.completed", started=started, provider=self.provider_id, speakers=len(speakers), turns=len(segments))
                return result
            if status in terminal_failure:
                output = current.get("output") or {}
                raise RuntimeError(f"pyannoteAI job {status}: {output.get('error') or 'no provider error supplied'}")
            if time.monotonic() >= deadline:
                raise RuntimeError(f"pyannoteAI job timed out after {self.timeout_seconds:.0f} seconds")
            time.sleep(self.poll_interval_seconds)
