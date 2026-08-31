import io
import struct
import wave

import numpy as np

from api.wav_compat import parse_pcm_wave


def _riff_pcm_wav(sample_rate=16000, frames=400):
    channels = 1
    bits = 16
    pcm = np.zeros(frames, dtype=np.int16).tobytes()
    payload = struct.pack('<HHIIHH', 1, channels, sample_rate, sample_rate * 2, 2, bits)
    buf = io.BytesIO()
    riff_size = 4 + 8 + len(payload) + 8 + len(pcm)
    buf.write(b'RIFF')
    buf.write(struct.pack('<I', riff_size))
    buf.write(b'WAVEfmt ')
    buf.write(struct.pack('<I', len(payload)))
    buf.write(payload)
    buf.write(b'data')
    buf.write(struct.pack('<I', len(pcm)))
    buf.write(pcm)
    return buf.getvalue()


def _extensible_pcm_wav(sample_rate=16000, frames=400):
    channels = 1
    bits = 16
    pcm = np.zeros(frames, dtype=np.int16).tobytes()
    guid = bytes.fromhex('0100000000001000800000AA00389B71')
    fmt = struct.pack('<HHIIHHHHI16s', 0xFFFE, channels, sample_rate, sample_rate * 2, 2, bits, 22, bits, 0, guid)
    buf = io.BytesIO()
    riff_size = 4 + 8 + len(fmt) + 8 + len(pcm)
    buf.write(b'RIFF')
    buf.write(struct.pack('<I', riff_size))
    buf.write(b'WAVEfmt ')
    buf.write(struct.pack('<I', len(fmt)))
    buf.write(fmt)
    buf.write(b'data')
    buf.write(struct.pack('<I', len(pcm)))
    buf.write(pcm)
    return buf.getvalue()


def _rf64_pcm_wav(sample_rate=16000, frames=400):
    channels = 1
    bits = 16
    pcm = np.zeros(frames, dtype=np.int16).tobytes()
    fmt = struct.pack('<HHIIHH', 1, channels, sample_rate, sample_rate * 2, 2, bits)
    ds64 = struct.pack('<QQQI', 0, len(pcm), frames, 0)
    buf = io.BytesIO()
    buf.write(b'RF64')
    buf.write(struct.pack('<I', 0xFFFFFFFF))
    buf.write(b'WAVE')
    buf.write(b'ds64')
    buf.write(struct.pack('<I', len(ds64)))
    buf.write(ds64)
    buf.write(b'fmt ')
    buf.write(struct.pack('<I', len(fmt)))
    buf.write(fmt)
    buf.write(b'data')
    buf.write(struct.pack('<I', 0xFFFFFFFF))
    buf.write(pcm)
    return buf.getvalue()


def test_parse_pcm_wave_accepts_standard_pcm():
    reader = parse_pcm_wave(_riff_pcm_wav())
    assert reader.getnchannels() == 1
    assert reader.getsampwidth() == 2
    assert reader.getframerate() == 16000
    assert reader.getnframes() == 400


def test_parse_pcm_wave_accepts_extensible_pcm():
    reader = parse_pcm_wave(_extensible_pcm_wav())
    assert reader.getframerate() == 16000
    assert reader.getnframes() == 400


def test_parse_pcm_wave_accepts_rf64_pcm():
    reader = parse_pcm_wave(_rf64_pcm_wav())
    assert reader.getframerate() == 16000
    assert reader.getnframes() == 400


def test_standard_wave_module_still_decodes_standard_pcm():
    with wave.open(io.BytesIO(_riff_pcm_wav()), 'rb') as wav:
        assert wav.getnchannels() == 1
        assert wav.getsampwidth() == 2
        assert wav.getframerate() == 16000
