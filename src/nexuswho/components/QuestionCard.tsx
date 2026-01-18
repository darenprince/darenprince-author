import React from 'react'
import { motion } from 'framer-motion'
import { ANSWER_LABELS, Question } from '../data/questions'

interface QuestionCardProps {
  question: Question
  sequence: number
  total: number
  onAnswer: (answer: number) => void
}

const answerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * index },
  }),
}

const QuestionCard = ({ question, sequence, total, onAnswer }: QuestionCardProps) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-6"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>
          Question {sequence} of {total}
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1">Vibe Prism</span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-slate-50">{question.text}</h2>
      <p className="mt-2 text-sm text-slate-400">{question.rationale}</p>
      <div className="mt-6 grid gap-3">
        {ANSWER_LABELS.map((label, index) => (
          <motion.button
            key={label}
            type="button"
            custom={index}
            variants={answerVariants}
            initial="hidden"
            animate="visible"
            onClick={() => onAnswer(index)}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:border-sky-300/50 hover:bg-sky-500/10"
          >
            <span>{label}</span>
            <span className="text-xs text-slate-400">{index}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default QuestionCard
