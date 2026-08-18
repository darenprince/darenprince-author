from __future__ import annotations
from dataclasses import dataclass
from typing import Literal
from .convergence import ConvergenceReport
CandidateState = Literal["consistent","inconsistent","indeterminate"]
@dataclass(frozen=True)
class ClassificationAssessment:
    state: CandidateState
    confidence: float
    rationale: tuple[str,...]
    eligible_for_disposition: bool
def assess_candidate(convergence: ConvergenceReport, *, reliability_status: str)->ClassificationAssessment:
    rationale=[]
    if reliability_status!="eligible": return ClassificationAssessment("indeterminate",0.0,("reliability_gate_not_fully_eligible",),False)
    if convergence.usable_observations==0: return ClassificationAssessment("indeterminate",0.0,("no_usable_observations",),False)
    if convergence.independent_methods<2: rationale.append("limited_method_diversity")
    if convergence.agreement!="convergent_observations": rationale.append("insufficient_feature_convergence")
    rationale.extend(convergence.uncertainty); confidence=min(convergence.mean_quality,0.5+0.1*convergence.independent_methods)
    return ClassificationAssessment("indeterminate",confidence,tuple(dict.fromkeys(rationale)),False)
