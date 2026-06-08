import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'

const ABOUT = [
  'Date Duration Calculator counts the exact time between two dates — in years, months and days, as well as the total number of days, weeks, and months.',
  'It is useful for working out ages, project timelines, notice periods, deadlines, or how long until an event.',
  'Optionally include the end day in the count. Everything is calculated in your browser.',
]

function diffYMD(start, end) {
  let y = end.getFullYear() - start.getFullYear()
  let m = end.getMonth() - start.getMonth()
  let d = end.getDate() - start.getDate()
  if (d < 0) {
    m -= 1
    d += new Date(end.getFullYear(), end.getMonth(), 0).getDate()
  }
  if (m < 0) {
    y -= 1
    m += 12
  }
  return { y, m, d }
}

export default function DateDurationCalculator() {
  const today = new Date().toISOString().slice(0, 10)
  const [start, setStart] = useState(today)
  const [end, setEnd] = useState(today)
  const [includeEnd, setIncludeEnd] = useState(false)

  const s = new Date(start)
  const e = new Date(end)
  const valid = !isNaN(s) && !isNaN(e) && e >= s

  let result = null
  if (valid) {
    const msPerDay = 86400000
    let totalDays = Math.round((e - s) / msPerDay)
    if (includeEnd) totalDays += 1
    const ymd = diffYMD(s, includeEnd ? new Date(e.getTime() + msPerDay) : e)
    result = {
      totalDays,
      weeks: Math.floor(totalDays / 7),
      extraDays: totalDays % 7,
      months: Math.round((totalDays / 365.25) * 12),
      ymd,
    }
  }

  return (
    <ToolLayout
      title="Date Duration Calculator"
      description="Calculate the exact number of days, weeks, and months between two dates."
      toolId="date-duration-calculator"
      about={ABOUT}
    >
      <div className="card mb-4 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Start date</label>
            <input type="date" className="input" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">End date</label>
            <input type="date" className="input" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <input type="checkbox" checked={includeEnd} onChange={(e) => setIncludeEnd(e.target.checked)} />
          Include the end day in the total
        </label>
      </div>

      {!valid && start && end && (
        <p className="text-sm text-rose-500">End date must be on or after the start date.</p>
      )}

      {result && (
        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-zinc-500 mb-1">Duration</p>
            <p className="text-2xl font-bold text-emerald-400">
              {result.ymd.y > 0 && `${result.ymd.y} year${result.ymd.y !== 1 ? 's' : ''} `}
              {result.ymd.m > 0 && `${result.ymd.m} month${result.ymd.m !== 1 ? 's' : ''} `}
              {result.ymd.d} day{result.ymd.d !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-indigo-400">{result.totalDays.toLocaleString()}</p>
              <p className="text-xs text-zinc-500">Total days</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{result.weeks}<span className="text-xs text-zinc-500">w {result.extraDays}d</span></p>
              <p className="text-xs text-zinc-500">Weeks</p>
            </div>
            <div className="card text-center py-3">
              <p className="text-lg font-bold text-zinc-200">{result.months}</p>
              <p className="text-xs text-zinc-500">Months (approx)</p>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
