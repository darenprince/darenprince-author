import numpy as np
from voxvector.reliability import assess_signal

def test_empty_audio_is_ineligible(): assert assess_signal(np.array([]),16000).status=="ineligible"
def test_short_audio_is_degraded():
    result=assess_signal(np.zeros(8000),16000); assert result.status=="degraded"; assert "insufficient_duration" in result.reasons
def test_clean_audio_is_eligible():
    result=assess_signal(np.zeros(16000),16000); assert result.status=="eligible"; assert result.score==1.0
