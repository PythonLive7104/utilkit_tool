import { useState, useEffect } from 'react'
import { ads } from '../lib/api'
import AdvertiseHere from './AdvertiseHere'

// Banners per horizontal row.
const ROW_SIZE = 3

// Fetch a category's live ads once. The server counts one impression per ad it
// returns, so call this a single time per page and share the result between the
// top and bottom rows (see ToolLayout) — don't fetch separately per row, or
// impressions double-count and the two rows randomise differently.
export function useCategoryAds(category) {
  const [data, setData] = useState({ ads: [], capacity: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!category) { setLoaded(true); return }
    let active = true
    ads
      .active(category)
      .then((res) => { if (active) setData({ ads: res?.ads || [], capacity: res?.capacity || 0 }) })
      .catch(() => {})
      .finally(() => { if (active) setLoaded(true) })
    return () => { active = false }
  }, [category])

  return { ...data, loaded }
}

// One horizontal row of up to ROW_SIZE banners for a category. `start` selects
// which slice of the fetched ads this row shows: 0 for the top row, ROW_SIZE
// for the bottom row, so the two rows display different advertisers. Unsold
// boxes fall back to the "Advertise Here" placeholder.
export function AdBannerRow({ category, data, start = 0 }) {
  // Wait for the first fetch; render nothing if this category has no slot.
  if (!data.loaded || data.capacity === 0) return null

  const slice = data.ads.slice(start, start + ROW_SIZE)
  const boxes = Array.from({ length: ROW_SIZE }, (_, i) => slice[i] || null)
  const hasRealAd = slice.some(Boolean)

  return (
    <div className="my-8 mx-auto max-w-4xl">
      {/* Three 3:1 banners across (stacked on mobile). */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {boxes.map((ad, i) =>
          ad ? (
            <a
              key={ad.id}
              href={ad.click_url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block aspect-[3/1] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900"
            >
              <img
                src={ad.image_url}
                alt={ad.alt_text || 'Advertisement'}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </a>
          ) : (
            <AdvertiseHere key={`empty-${start}-${i}`} category={category} boxed />
          ),
        )}
      </div>
      {hasRealAd && (
        <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-400 text-right">Ad</p>
      )}
    </div>
  )
}

// Backward-compatible single row (fetches its own data).
export default function AdSlot({ category }) {
  const data = useCategoryAds(category)
  return <AdBannerRow category={category} data={data} start={0} />
}
