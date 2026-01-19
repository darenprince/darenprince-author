import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ListChecks, Shield, Sparkle } from 'phosphor-react'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'
import { QUESTIONS } from '../data/questions'
import { computeScores, shuffleQuestions } from '../utils/engine'
import { base64UrlEncode, sha256Checksum } from '../utils/encoding'
import { hasAttempt, saveToken, setAttempt } from '../utils/storage'

const Quiz = () => {
  const navigate = useNavigate()
  const [lockedOut, setLockedOut] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<
    { questionId: number; answer: number; rtMs: number }[]
  >([])
  const sessionIdRef = useRef<string>(crypto.randomUUID())
  const startRef = useRef<number>(0)

  useEffect(() => {
    setLockedOut(hasAttempt())
  }, [])

  const questions = useMemo(() => shuffleQuestions(QUESTIONS), [])

  const progress = hasStarted ? ((currentIndex + 1) / questions.length) * 100 : 0

  const handleStart = () => {
    setHasStarted(true)
    startRef.current = performance.now()
  }

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
            <Shield size={24} className="text-sky-300" />
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
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-slate-400">
        <span>Vibe Prism — quiz flow</span>
        <span>{hasStarted ? `${currentIndex + 1} / ${questions.length}` : 'Ready'}</span>
      </div>
      <ProgressBar value={progress} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div layout>
          {hasStarted ? (
            <QuestionCard
              question={questions[currentIndex]}
              sequence={currentIndex + 1}
              total={questions.length}
              onAnswer={handleAnswer}
            />
          ) : (
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3">
                <Sparkle size={22} className="text-sky-300" />
                <div>
                  <h2 className="text-xl font-semibold text-slate-50">Before you begin</h2>
                  <p className="text-sm text-slate-400">
                    Read the quick notes below. The session begins when you press start.
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {[
                  'Go with your first instinct for each prompt.',
                  'One pass only, with no backtracking.',
                  'Your profile token stays on this device.',
                ].map((item) => (
                  <li key={item} className="list-item">
                    {item}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={handleStart} className="button-primary mt-6">
                <Sparkle size={18} />
                Start the quiz
              </button>
            </div>
          )}
        </motion.div>
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <Sparkle size={20} className="text-sky-300" />
              <div>
                <h3 className="text-lg font-semibold">Session Guidance</h3>
                <p className="text-sm text-slate-400">
                  Stay honest and stay present. Let your instincts lead.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {[
                'No backtracking once you move forward.',
                'Keep the pace that feels natural to you.',
                'Your token stays on this device only.',
              ].map((item) => (
                <li key={item} className="list-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3">
              <ListChecks size={20} className="text-sky-300" />
              <div>
                <h3 className="text-lg font-semibold">Answer Choices</h3>
                <p className="text-sm text-slate-400">
                  Choose the response that feels closest to you.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              {['Not me', 'Rarely me', 'Often me', 'Definitely me'].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2"
                >
                  <span className="text-slate-100">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
