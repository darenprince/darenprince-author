import numpy as np
import pytest
from voxvector.research_timing import articulation_rate_from_syllables,pause_topology,speech_rate_from_syllables

def test_pause_topology_is_descriptive_and_deterministic():
    result=pause_topology(np.array([.1,0,0,.2,0]),np.array([True,False,False,True,False]),.1); assert result["pause_count"]==2.; assert result["longest_pause"]==.2; assert result["pause_density"]==2./.5
def test_empty_timing_input_fails_safe():
    result=pause_topology(np.array([]),np.array([],dtype=bool),.01); assert result["pause_count"]==0.; assert result["longest_pause"] is None
def test_rates_preserve_zero_denominator_as_unavailable(): assert speech_rate_from_syllables(10,0) is None; assert articulation_rate_from_syllables(10,0) is None
def test_negative_rate_inputs_are_rejected():
    with pytest.raises(ValueError): speech_rate_from_syllables(-1,2)
