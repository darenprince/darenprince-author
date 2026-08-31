from __future__ import annotations

import struct
from dataclasses import dataclass


_PCM_EXTENSIBLE_GUID = bytes.fromhex("01000000100000800000AA00389B71")


@dataclass
class CompatWaveReader:
    channels: int
    sample_width: int
    sample_rate: int
    frames: bytes

    def getnchannels(self) -> int:
        return self.channels

    def getsampwidth(self) -> int:
        return self.sample_width

    def getframerate(self) -> int:
        return self.sample_rate

    def getnframes(self) -> int:
        frame_width = self.channels * self.sample_width
        return len(self.frames) // frame_width if frame_width else 0

    def readframes(self, frame_count: int) -> bytes:
        frame_width = self.channels * self.sample_width
        return self.frames[: max(0, int(frame_count)) * frame_width]

    def __enter__(self) -> "CompatWaveReader":
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None:
        return None


def _read_u32(data: bytes, offset: int, endian: str) -> int:
    return struct.unpack_from(f"{endian}I", data, offset)[0]


def _read_u16(data: bytes, offset: int, endian: str) -> int:
    return struct.unpack_from(f"{endian}H", data, offset)[0]


def _normalize_big_endian_pcm(payload: bytes, sample_width: int) -> bytes:
    if sample_width <= 1:
        return payload
    if len(payload) % sample_width:
        payload = payload[: len(payload) - (len(payload) % sample_width)]
    out = bytearray(len(payload))
    for offset in range(0, len(payload), sample_width):
        sample = payload[offset : offset + sample_width]
        out[offset : offset + sample_width] = sample[::-1]
    return bytes(out)


def parse_pcm_wave(data: bytes) -> CompatWaveReader:
    if len(data) < 12:
        raise ValueError("Invalid WAV container: file is too short")

    container = data[:4]
    if container not in {b"RIFF", b"RF64", b"BW64", b"RIFX"} or data[8:12] != b"WAVE":
        raise ValueError("Unsupported WAV container: expected RIFF/RF64/BW64 WAVE")

    endian = ">" if container == b"RIFX" else "<"
    offset = 12
    fmt = None
    data_payload = None
    rf64_data_size = None

    while offset + 8 <= len(data):
        chunk_id = data[offset : offset + 4]
        raw_size = data[offset + 4 : offset + 8]
        chunk_size = struct.unpack(f"{endian}I", raw_size)[0]
        chunk_start = offset + 8
        chunk_end = chunk_start + chunk_size
        if chunk_end > len(data):
            if container in {b"RF64", b"BW64"} and chunk_id == b"data" and chunk_size == 0xFFFFFFFF and rf64_data_size is not None:
                chunk_end = min(len(data), chunk_start + rf64_data_size)
            else:
                raise ValueError("Invalid WAV chunk length")

        chunk = data[chunk_start:chunk_end]
        if chunk_id == b"ds64" and container in {b"RF64", b"BW64"} and len(chunk) >= 28:
            rf64_data_size = struct.unpack_from("<Q", chunk, 8)[0]
        elif chunk_id == b"fmt ":
            fmt = chunk
        elif chunk_id == b"data":
            data_payload = chunk
            if fmt is not None:
                break

        offset = chunk_end + (chunk_size & 1)

    if fmt is None or len(fmt) < 16:
        raise ValueError("PCM WAV file has no usable fmt chunk")
    if data_payload is None:
        raise ValueError("PCM WAV file has no data chunk")

    audio_format = _read_u16(fmt, 0, endian)
    channels = _read_u16(fmt, 2, endian)
    sample_rate = _read_u32(fmt, 4, endian)
    block_align = _read_u16(fmt, 12, endian)
    bits_per_sample = _read_u16(fmt, 14, endian)

    if channels < 1 or sample_rate <= 0 or block_align <= 0 or bits_per_sample <= 0:
        raise ValueError("Invalid PCM WAV format metadata")

    is_pcm = audio_format == 0x0001
    if audio_format == 0xFFFE:
        if len(fmt) < 40:
            raise ValueError("WAVE_FORMAT_EXTENSIBLE fmt chunk is incomplete")
        is_pcm = fmt[24:40] == _PCM_EXTENSIBLE_GUID
    if not is_pcm:
        raise ValueError(f"Unsupported WAV encoding tag: 0x{audio_format:04X}; expected PCM")

    if bits_per_sample not in {8, 16, 24, 32}:
        raise ValueError(f"Unsupported PCM bit depth: {bits_per_sample}")

    sample_width = (bits_per_sample + 7) // 8
    expected_block_align = channels * sample_width
    if block_align != expected_block_align:
        raise ValueError("PCM WAV block alignment does not match channel/bit-depth metadata")

    usable = (len(data_payload) // block_align) * block_align
    frames = data_payload[:usable]
    if endian == ">":
        frames = _normalize_big_endian_pcm(frames, sample_width)

    return CompatWaveReader(channels, sample_width, sample_rate, frames)


def install_wave_open_compat(original_wave_open):
    """Return a wave.open wrapper that accepts additional valid PCM WAVE containers."""

    def compat_wave_open(file, mode="rb"):
        try:
            return original_wave_open(file, mode)
        except Exception:
            if mode not in {"rb", "r"}:
                raise
            if hasattr(file, "seek") and hasattr(file, "read"):
                position = file.tell()
                file.seek(0)
                raw = file.read()
                file.seek(position)
            elif isinstance(file, (bytes, bytearray)):
                raw = bytes(file)
            else:
                raise
            return parse_pcm_wave(raw)

    return compat_wave_open
