import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldLock } from 'phosphor-react'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'
import { QUESTIONS } from '../data/questions'
import { computeScores, shuffleQuestions } from '../utils/engine'
import { base64UrlEncode, sha256Checksum } from '../utils/encoding'
import { hasAttempt, saveToken, setAttempt } from '../utils/storage'

const Quiz = () => {
  const navigate = useNavigate()
  const [lockedOut, setLockedOut] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<
    { questionId: number; answer: number; rtMs: number }[]
  >([])
  const sessionIdRef = useRef<string>(crypto.randomUUID())
  const startRef = useRef<number>(performance.now())

  useEffect(() => {
    setLockedOut(hasAttempt())
  }, [])

  const questions = useMemo(() => shuffleQuestions(QUESTIONS), [])

  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = async (answer: number) => {
    const question = questions[currentIndex]
    const rtMs = Math.round(performance.now() - startRef.current)
    const nextResponses = [...responses, { questionId: question.id, answer, rtMs }]
    setResponses(nextResponses)

    if (currentIndex === questions.length - 1) {
      const result = computeScores(QUESTIONS, nextResponses)
      const answersJson = JSON.stringify(nextResponses)
      const maskFlags = `masking:${result.integrityFlags.masking};contradictions:${result.integrityFlags.contradictions};halo:${result.integrityFlags.halo}`
      const overrideFlags = result.safetyOverrides.triggers.join('~') || 'none'
      const payloadCore = [
        'VP1',
        sessionIdRef.current,
        new Date().toISOString(),
        result.band,
        result.dtiBase.toString(),
        result.dtiFinal.toString(),
        result.scores.N.toString(),
        result.scores.M.toString(),
        result.scores.P.toString(),
        result.scores.MD.toString(),
        result.integrity.toString(),
        result.archetype,
        maskFlags,
        overrideFlags,
        answersJson,
      ].join('|')
      const checksum = (await sha256Checksum(payloadCore)).slice(0, 8)
      const token = base64UrlEncode(`${payloadCore}|${checksum}`)
      saveToken(token)
      setAttempt()
      navigate('/result')
      return
    }

    setCurrentIndex((prev) => prev + 1)
    startRef.current = performance.now()
  }

  if (lockedOut) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <ShieldLock size={24} className="text-emerald-300" />
            <div>
              <h2 className="text-xl font-semibold">One attempt per session</h2>
              <p className="text-sm text-slate-400">
                This quiz allows only a single pass. You can restore your latest profile or continue
                to the decoder if you have a token.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/result" className="button-primary">
              View results
            </Link>
            <Link to="/restore" className="button-secondary">
              Restore profile
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Vibe Prism — quiz flow</span>
        <span>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>
      <ProgressBar value={progress} />
      <motion.div layout>
        <QuestionCard
          question={questions[currentIndex]}
          sequence={currentIndex + 1}
          total={questions.length}
          onAnswer={handleAnswer}
        />
      </motion.div>
    </div>
  )
}

export default Quiz
