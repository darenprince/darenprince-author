export type TraitKey = 'N' | 'M' | 'P' | 'MD'

export interface Question {
  id: number
  text: string
  trait: TraitKey
  reverse?: boolean
  lieTrap?: boolean
  safetyTrigger?: boolean
  rationale: string
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'I enjoy being the person others look to for direction.',
    trait: 'N',
    rationale: 'Captures comfort with visibility and influence within groups.',
  },
  {
    id: 2,
    text: 'I plan my social moves with long-term outcomes in mind.',
    trait: 'M',
    rationale: 'Checks for strategy-driven social navigation.',
  },
  {
    id: 3,
    text: 'I can stay calm when others get emotional around me.',
    trait: 'P',
    rationale: 'Measures emotional detachment under pressure.',
  },
  {
    id: 4,
    text: 'I pay attention to how people can be guided toward a goal.',
    trait: 'MD',
    rationale: 'Tracks comfort with directing group dynamics.',
  },
  {
    id: 5,
    text: 'It feels natural to set the tone in a room.',
    trait: 'N',
    rationale: 'Assesses ease with status-setting behaviors.',
  },
  {
    id: 6,
    text: 'I keep a quiet mental map of other people’s priorities.',
    trait: 'M',
    rationale: 'Tests awareness of leverage points.',
  },
  {
    id: 7,
    text: 'I rarely feel guilty after making a hard decision.',
    trait: 'P',
    rationale: 'Signals low emotional friction after decisive actions.',
  },
  {
    id: 8,
    text: 'When needed, I can mirror someone’s style to build rapport.',
    trait: 'MD',
    rationale: 'Tracks adaptive influence tactics.',
  },
  {
    id: 9,
    text: 'Compliments feel better when they are public.',
    trait: 'N',
    rationale: 'Evaluates preference for public recognition.',
  },
  {
    id: 10,
    text: 'I hold back information until the timing feels right.',
    trait: 'M',
    rationale: 'Measures calculated disclosure behavior.',
  },
  {
    id: 11,
    text: 'Rules are flexible if the outcome is important enough.',
    trait: 'P',
    safetyTrigger: true,
    rationale: 'Checks willingness to bend boundaries under pressure.',
  },
  {
    id: 12,
    text: 'I can separate feelings from outcomes with ease.',
    trait: 'P',
    rationale: 'Tests emotional compartmentalization.',
  },
  {
    id: 13,
    text: 'I prefer to be the person others consult before acting.',
    trait: 'N',
    rationale: 'Assesses influence-seeking behavior.',
  },
  {
    id: 14,
    text: 'I notice the social leverage in almost every situation.',
    trait: 'M',
    rationale: 'Tracks analytical social awareness.',
  },
  {
    id: 15,
    text: 'I am comfortable using pressure to keep things on track.',
    trait: 'MD',
    safetyTrigger: true,
    rationale: 'Identifies comfort with forceful coordination.',
  },
  {
    id: 16,
    text: 'People describe me as intense.',
    trait: 'P',
    rationale: 'Captures intensity linked to bold decision making.',
  },
  {
    id: 17,
    text: 'I carefully manage the image people have of me.',
    trait: 'N',
    rationale: 'Tests image management orientation.',
  },
  {
    id: 18,
    text: 'I can persuade someone even when they disagree.',
    trait: 'MD',
    safetyTrigger: true,
    rationale: 'Evaluates persuasion confidence under resistance.',
  },
  {
    id: 19,
    text: 'I keep multiple options open when negotiating.',
    trait: 'M',
    rationale: 'Measures contingency planning in negotiations.',
  },
  {
    id: 20,
    text: 'I focus on outcomes more than emotional fallout.',
    trait: 'P',
    rationale: 'Tracks priority on results over feelings.',
  },
  {
    id: 21,
    text: 'I enjoy being a visible source of momentum.',
    trait: 'N',
    rationale: 'Gauges enjoyment of being the catalyst.',
  },
  {
    id: 22,
    text: 'I notice when someone is predictable and plan around it.',
    trait: 'M',
    rationale: 'Assesses strategic adaptation to predictability.',
  },
  {
    id: 23,
    text: 'I can stay composed even when others are upset with me.',
    trait: 'P',
    rationale: 'Checks emotional steadiness under criticism.',
  },
  {
    id: 24,
    text: 'I’m good at guiding a conversation toward the outcome I want.',
    trait: 'MD',
    rationale: 'Measures conversational steering confidence.',
  },
  {
    id: 25,
    text: 'I like to be recognized for my taste and standards.',
    trait: 'N',
    rationale: 'Tracks desire for recognition of discernment.',
  },
  {
    id: 26,
    text: 'I avoid showing all my cards right away.',
    trait: 'M',
    rationale: 'Checks for guarded positioning.',
  },
  {
    id: 27,
    text: 'I can disconnect from a situation if it becomes inconvenient.',
    trait: 'P',
    rationale: 'Measures ease of detachment.',
  },
  {
    id: 28,
    text: 'I adapt my approach to fit whoever I’m with.',
    trait: 'MD',
    rationale: 'Tracks adaptive social shaping.',
  },
  {
    id: 29,
    text: 'It’s important that others see the best version of me.',
    trait: 'N',
    rationale: 'Assesses presentation focus.',
  },
  {
    id: 30,
    text: 'I am rarely surprised by other people’s motives.',
    trait: 'M',
    rationale: 'Checks for predictive social thinking.',
  },
  {
    id: 31,
    text: 'I believe honesty should be consistent, even under pressure.',
    trait: 'M',
    reverse: true,
    lieTrap: true,
    rationale: 'Reverse-coded to detect contradictions with strategic behavior.',
  },
  {
    id: 32,
    text: 'I feel uneasy when someone is treated unfairly.',
    trait: 'P',
    reverse: true,
    lieTrap: true,
    rationale: 'Reverse-coded to detect emotional distance.',
  },
]

export const ANSWER_LABELS = ['Not me', 'Rarely me', 'Often me', 'Definitely me']
