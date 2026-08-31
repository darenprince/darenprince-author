"""VoxVector HTTP adapter package."""

# Install a compatibility fallback before app.py imports the stdlib wave module.
# Standard PCM WAV files continue through Python's native decoder first.
import wave as _wave

from .wav_compat import install_wave_open_compat

_wave.open = install_wave_open_compat(_wave.open)
