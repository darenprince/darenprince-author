import { Question, TraitKey } from '../data/questions'

export interface ResponseRecord {
  questionId: number
  answer: number
  rtMs: number
}

export interface TraitScores {
  N: number
  M: number
  P: number
  MD: number
}

export interface IntegrityFlags {
  masking: boolean
  contradictions: boolean
  halo: boolean
}

export interface SafetyOverrides {
  triggered: boolean
  triggers: string[]
}

export interface ComputedResult {
  scores: TraitScores
  dtiBase: number
  dtiFinal: number
  band: 'GREEN' | 'YELLOW' | 'RED'
  archetype: string
  integrity: number
  integrityFlags: IntegrityFlags
  safetyOverrides: SafetyOverrides
}

export const shuffleQuestions = (questions: Question[]) => {
  const array = [...questions]
  for (let index = array.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[array[index], array[swapIndex]] = [array[swapIndex], array[index]]
  }
  return array
}

const toPercent = (value: number) => Math.min(100, Math.max(0, Math.round(value)))

const TRAIT_WEIGHTS: Record<TraitKey, number> = {
  N: 1.0,
  M: 1.2,
  P: 1.4,
  MD: 1.3,
}

export const computeScores = (
  questions: Question[],
  responses: ResponseRecord[]
): ComputedResult => {
  const traitTotals: Record<TraitKey, number> = {
    N: 0,
    M: 0,
    P: 0,
    MD: 0,
  }

  const traitCounts: Record<TraitKey, number> = {
    N: 0,
    M: 0,
    P: 0,
    MD: 0,
  }

  const responseMap = new Map(responses.map((response) => [response.questionId, response]))

  let masking = false
  let contradictions = false
  let highAnswerSum = 0

  questions.forEach((question) => {
    const response = responseMap.get(question.id)
    if (!response) {
      return
    }

    const adjusted = question.reverse ? 3 - response.answer : response.answer
    traitTotals[question.trait] += adjusted
    traitCounts[question.trait] += 1
    highAnswerSum += response.answer

    if (response.rtMs < 450 && response.answer >= 2) {
      masking = true
    }

    if (question.lieTrap && response.answer >= 2) {
      contradictions = true
    }
  })

  const avgAnswer = highAnswerSum / responses.length
  const halo = avgAnswer >= 2.7

  const scores = (Object.keys(traitTotals) as TraitKey[]).reduce(
    (acc, trait) => {
      const maxPossible = traitCounts[trait] * 3
      const normalized = maxPossible > 0 ? (traitTotals[trait] / maxPossible) * 100 : 0
      const weighted = normalized * TRAIT_WEIGHTS[trait]
      acc[trait] = toPercent(weighted)
      return acc
    },
    { N: 0, M: 0, P: 0, MD: 0 } as TraitScores
  )

  const integrityFlags: IntegrityFlags = { masking, contradictions, halo }
  const integrityHits = Object.values(integrityFlags).filter(Boolean).length
  const integrity = Math.max(70, 100 - integrityHits * 10)

  const dtiBaseRaw = 0.9 * scores.N + 1.1 * scores.M + 1.3 * scores.P
  const dtiBase = toPercent(dtiBaseRaw / 3)
  const dtiFinal = integrityHits >= 2 ? toPercent(dtiBase * 1.25) : dtiBase

  const safetyTriggers = questions
    .filter((question) => question.safetyTrigger)
    .map((question) => {
      const response = responseMap.get(question.id)
      if (response && response.answer >= 2) {
        return `Q${question.id}: ${question.text}`
      }
      return null
    })
    .filter((item): item is string => Boolean(item))

  if (scores.P > 75 && scores.MD > 60) {
    safetyTriggers.push('Trait combination: P > 75 and MD > 60')
  }

  const safetyOverrides: SafetyOverrides = {
    triggered: safetyTriggers.length > 0,
    triggers: safetyTriggers,
  }

  let band: 'GREEN' | 'YELLOW' | 'RED' = 'GREEN'
  if (dtiFinal >= 60 || safetyOverrides.triggered) {
    band = 'RED'
  } else if (dtiFinal >= 35) {
    band = 'YELLOW'
  }

  const archetype = (() => {
    if (scores.P >= 70 && scores.M >= 70) {
      return 'APX'
    }
    if (scores.M >= 70 && scores.MD >= 70) {
      return 'PUP'
    }
    if (scores.N >= 70) {
      return 'EGO'
    }
    if (scores.M >= 60 && scores.N >= 55) {
      return 'SMR'
    }
    if (Math.max(scores.N, scores.M, scores.P, scores.MD) < 45) {
      return 'LOW'
    }
    return 'DRM'
  })()

  return {
    scores,
    dtiBase,
    dtiFinal,
    band,
    archetype,
    integrity,
    integrityFlags,
    safetyOverrides,
  }
}
