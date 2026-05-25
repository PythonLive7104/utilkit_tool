import { useState, useRef, useEffect, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { RotateCcw, Timer, Keyboard } from 'lucide-react'

const ABOUT = [
  'Typing Speed Test measures your typing speed in Words Per Minute (WPM) and accuracy percentage.',
  'Type the displayed paragraph as fast and accurately as you can. The timer starts on your first keystroke.',
  'Improve your typing speed over time — most professionals type 40–80 WPM, while top typists exceed 120 WPM.',
]

const PASSAGES = [
  'The quick brown fox jumps over the lazy dog. Practice makes perfect, and consistent effort leads to mastery of any skill over time.',
  'Technology is best when it brings people together and solves real problems in meaningful ways that improve everyday life.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts. Every expert was once a beginner.',
  'The secret of getting ahead is getting started. The best time to plant a tree was twenty years ago. The second best time is now.',
  'Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish, and never stop learning new things.',
  'Hard work beats talent when talent does not work hard. Dream big, start small, act now, and keep moving forward every day.',
]

export default function TypingSpeedTest() {
  const [passage, setPassage] = useState(() => PASSAGES[Math.floor(Math.random() * PASSAGES.length)])
  const [typed, setTyped] = useState('')
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const intervalRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  function handleType(e) {
    if (finished) return
    const val = e.target.value
    if (val.length > passage.length) return

    if (!started) {
      const now = Date.now()
      setStarted(true)
      setStartTime(now)
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - now) / 1000))
      }, 500)
    }

    setTyped(val)

    if (val.length >= passage.length) {
      clearInterval(intervalRef.current)
      setFinished(true)
      const elapsed = (Date.now() - startTime) / 60000
      const wordCount = passage.trim().split(/\s+/).length
      setWpm(Math.round(wordCount / elapsed))
      let correct = 0
      for (let i = 0; i < val.length; i++) {
        if (val[i] === passage[i]) correct++
      }
      setAccuracy(Math.round((correct / passage.length) * 100))
    }
  }

  function reset() {
    clearInterval(intervalRef.current)
    setPassage(PASSAGES[Math.floor(Math.random() * PASSAGES.length)])
    setTyped(''); setStarted(false); setFinished(false)
    setStartTime(null); setElapsed(0); setWpm(0); setAccuracy(100)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const words = passage.trim().split(/\s+/).length
  const liveWpm = started && !finished && elapsed > 0
    ? Math.round((typed.trim().split(/\s+/).filter(Boolean).length / (elapsed / 60)) || 0)
    : 0

  return (
    <ToolLayout title="Typing Speed Test" description="Measure your typing speed in WPM and accuracy. Start typing to begin the timer." toolId="typing-speed-test" about={ABOUT}>
      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="card text-center">
          <div className="text-2xl font-bold text-indigo-400">{finished ? wpm : started ? liveWpm : '—'}</div>
          <div className="text-xs text-zinc-500 mt-1">WPM</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-zinc-200">{finished ? accuracy : started ? Math.round(((typed.split('').filter((c, i) => c === passage[i]).length) / Math.max(typed.length, 1)) * 100) : '—'}%</div>
          <div className="text-xs text-zinc-500 mt-1">Accuracy</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-zinc-200">{elapsed}s</div>
          <div className="text-xs text-zinc-500 mt-1">Time</div>
        </div>
      </div>

      <div className="card mb-4 relative">
        <div className="text-sm leading-8 font-mono select-none" aria-hidden="true">
          {passage.split('').map((char, i) => {
            let cls = 'text-zinc-500'
            if (i < typed.length) {
              cls = typed[i] === char ? 'text-zinc-200' : 'bg-red-500/30 text-red-300'
            } else if (i === typed.length) {
              cls = 'text-zinc-500 border-l-2 border-indigo-400'
            }
            return <span key={i} className={cls}>{char}</span>
          })}
        </div>
        <textarea
          ref={inputRef}
          value={typed}
          onChange={handleType}
          disabled={finished}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          rows={4}
          className="absolute inset-0 opacity-0 resize-none cursor-text w-full h-full"
          aria-label="Type here"
          onClick={() => inputRef.current?.focus()}
        />
      </div>

      {!started && !finished && (
        <p className="text-xs text-zinc-500 text-center mb-4">Click on the text above and start typing to begin the test</p>
      )}

      {finished && (
        <div className="card mb-4 bg-indigo-500/10 border-indigo-500/20">
          <p className="text-center text-indigo-300 font-semibold">
            {wpm >= 80 ? '🚀 Excellent!' : wpm >= 60 ? '⚡ Great job!' : wpm >= 40 ? '👍 Good speed!' : '💪 Keep practising!'} {wpm} WPM · {accuracy}% accuracy
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <button className="btn-secondary" onClick={reset}>
          <RotateCcw size={14} /> {finished ? 'Try Again' : 'New Passage'}
        </button>
      </div>
    </ToolLayout>
  )
}
