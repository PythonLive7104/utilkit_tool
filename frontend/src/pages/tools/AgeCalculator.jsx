import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Cake } from 'lucide-react'

const ABOUT = [
  'Age Calculator works out an exact age in years, months, and days from a date of birth to any target date (today by default).',
  'It also shows the total number of months, weeks, days, and hours lived, plus the next birthday countdown.',
  'All calculation happens locally in your browser — your dates are never uploaded.',
]

function diff(fromStr, toStr) {
  const from = new Date(fromStr)
  const to = new Date(toStr)
  if (isNaN(from) || isNaN(to) || to < from) return null

  let years = to.getFullYear() - from.getFullYear()
  let months = to.getMonth() - from.getMonth()
  let days = to.getDate() - from.getDate()

  if (days < 0) {
    months -= 1
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const ms = to - from
  const totalDays = Math.floor(ms / 86400000)

  // next birthday
  const next = new Date(to.getFullYear(), from.getMonth(), from.getDate())
  if (next < to) next.setFullYear(to.getFullYear() + 1)
  const daysToBirthday = Math.ceil((next - to) / 86400000)

  return {
    years, months, days,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours: Math.floor(ms / 3600000),
    daysToBirthday,
  }
}

export default function AgeCalculator() {
  const [dob, setDob] = useState('2000-01-01')
  const [to, setTo] = useState(new Date().toISOString().slice(0, 10))

  const r = diff(dob, to)

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate exact age in years, months, and days between any two dates, with a next-birthday countdown."
      toolId="age-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Date of birth</label>
          <input type="date" className="input" value={dob} onChange={e => setDob(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-zinc-500 mb-1.5">Age at date</label>
          <input type="date" className="input" value={to} onChange={e => setTo(e.target.value)} />
        </div>
      </div>

      {r ? (
        <>
          <div className="card mb-4 text-center">
            <p className="text-xs text-zinc-500 mb-1">Your age is</p>
            <p className="text-3xl font-bold text-indigo-400">
              {r.years} <span className="text-base font-normal text-zinc-400">years</span> {r.months} <span className="text-base font-normal text-zinc-400">months</span> {r.days} <span className="text-base font-normal text-zinc-400">days</span>
            </p>
            <p className="text-sm text-emerald-400 mt-3 flex items-center justify-center gap-1.5">
              <Cake size={14} /> {r.daysToBirthday === 0 ? 'Happy birthday! 🎉' : `${r.daysToBirthday} days until next birthday`}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Months', value: r.totalMonths },
              { label: 'Weeks', value: r.totalWeeks },
              { label: 'Days', value: r.totalDays },
              { label: 'Hours', value: r.totalHours },
            ].map(s => (
              <div key={s.label} className="card text-center py-3">
                <p className="text-lg font-bold text-zinc-200">{s.value.toLocaleString()}</p>
                <p className="text-xs text-zinc-500">{s.label} lived</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-sm text-zinc-500 card">Enter a valid date of birth that is on or before the target date.</p>
      )}
    </ToolLayout>
  )
}
