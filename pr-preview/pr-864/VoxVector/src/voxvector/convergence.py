from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable
from .observations import observation_id
from .schemas import Evidence, Observation
@dataclass(frozen=True)
class ConvergenceReport:
    feature_groups:int
    independent_methods:int
    usable_observations:int
    mean_quality:float
    agreement:str
    uncertainty:tuple[str,...]
    alternative_explanations:tuple[str,...]
    evidence:tuple[Evidence,...]
def build_convergence(observations:Iterable[Observation],minimum_quality:float=0.5)->ConvergenceReport:
    if not 0.0<=minimum_quality<=1.0: raise ValueError("minimum_quality must be between 0 and 1")
    usable=tuple(o for o in observations if o.value is not None and o.quality>=minimum_quality); groups={}
    for o in usable: groups.setdefault(o.feature,[]).append(o)
    methods={o.method_id for o in usable}; qualities=[o.quality for o in usable]; uncertainty=[]
    if not usable: uncertainty.append("no_observations_met_quality_threshold")
    if len(methods)<2: uncertainty.append("limited_method_diversity")
    if any(len(items)<2 for items in groups.values()): uncertainty.append("limited_within_feature_coverage")
    evidence=tuple(Evidence(observation_ids=tuple(observation_id(o) for o in items),direction="neutral",strength=min(1.0,len(items)/5.0),confidence=sum(o.quality for o in items)/len(items),alternative_explanations=("measurement_variation","recording_conditions","speaker_state_variation")) for items in groups.values())
    agreement="convergent_observations" if len(groups)>=2 else "insufficient_independent_feature_convergence"
    return ConvergenceReport(len(groups),len(methods),len(usable),sum(qualities)/len(qualities) if qualities else 0.0,agreement,tuple(uncertainty),("stress_or_arousal","fatigue","recording_artifacts","individual_speaking_style"),evidence)
