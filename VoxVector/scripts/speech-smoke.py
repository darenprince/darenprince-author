from __future__ import annotations

import argparse
import json
import os
import resource
import sys
import time
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from voxvector.evidence_acquisition import build_evidence_acquisition
from voxvector.speech_providers import get_diarization_provider, get_transcription_provider


def read_pcm_wav(path: Path) -> tuple[np.ndarray, int]:
    with wave.open(str(path), "rb") as wav:
        if wav.getnchannels() != 1 or wav.getsampwidth() != 2:
            raise ValueError("Smoke benchmark requires mono 16-bit PCM WAV")
        rate = wav.getframerate()
        audio = np.frombuffer(wav.readframes(wav.getnframes()), dtype="<i2").astype(np.float32) / 32768.0
    return audio, rate


def main() -> int:
    parser = argparse.ArgumentParser(description="Run VoxVector speech providers on a controlled WAV fixture")
    parser.add_argument("wav", type=Path)
    args = parser.parse_args()

    audio, sample_rate = read_pcm_wav(args.wav)
    transcription_provider = get_transcription_provider()
    diarization_provider = get_diarization_provider()
    print(json.dumps({
        "event": "speech_smoke_started",
        "file": str(args.wav),
        "duration_seconds": round(audio.size / sample_rate, 3),
        "sample_rate": sample_rate,
        "transcription_provider": getattr(transcription_provider, "provider_id", "not_configured"),
        "diarization_provider": getattr(diarization_provider, "provider_id", "not_configured"),
    }, sort_keys=True), flush=True)

    started = time.perf_counter()
    acquisition = build_evidence_acquisition(
        audio,
        sample_rate,
        transcript_provider=transcription_provider,
        diarization_provider=diarization_provider,
    )
    elapsed = round((time.perf_counter() - started) * 1000.0, 2)
    usage = resource.getrusage(resource.RUSAGE_SELF)

    result = {
        "event": "speech_smoke_completed",
        "duration_ms": elapsed,
        "provider_timings_ms": acquisition.provider_timings_ms or {},
        "max_rss_kb": int(usage.ru_maxrss),
        "transcription_state": acquisition.transcription_state,
        "diarization_state": acquisition.diarization_state,
        "transcript_segments": len(acquisition.transcript.segments) if acquisition.transcript else 0,
        "transcript_words": len(acquisition.transcript.words) if acquisition.transcript else 0,
        "speakers": len(acquisition.diarization.speakers) if acquisition.diarization else 0,
        "speaker_turns": len(acquisition.diarization.segments) if acquisition.diarization else 0,
        "multimodal_timeline": acquisition.multimodal_timeline is not None,
        "limitations": list(acquisition.limitations),
    }
    print(json.dumps(result, sort_keys=True), flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
