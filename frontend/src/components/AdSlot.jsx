import { useState, useEffect } from 'react'
import { ads } from '../lib/api'
import AdvertiseHere from './AdvertiseHere'

// Renders a category's ad boxes side by side (one per slot capacity). Each box
// shows a live advert, or an "Advertise here" placeholder when it's unsold.
// Used on tool pages, targeted to the page's category.
export default function AdSlot({ category }) {
  const [data, setData] = useState({ ads: [], capacity: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!category) return
    let active = true
    ads
      .active(category)
      .then((res) => { if (active) setData({ ads: res?.ads || [], capacity: res?.capacity || 0 }) })
      .catch(() => {})
      .finally(() => { if (active) setLoaded(true) })
    return () => { active = false }
  }, [category])

  // Avoid flicker before the first fetch resolves.
  if (!loaded || data.capacity === 0) return null

  const boxes = Array.from({ length: data.capacity }, (_, i) => data.ads[i] || null)
  const hasRealAd = data.ads.length > 0

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {boxes.map((ad, i) =>
          ad ? (
            <a
              key={ad.id}
              href={ad.click_url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
            >
              <img
                src={ad.image_url}
                alt={ad.alt_text || 'Advertisement'}
                className="w-full h-auto"
                loading="lazy"
              />
            </a>
          ) : (
            <AdvertiseHere key={`empty-${i}`} category={category} />
          ),
        )}
      </div>
      {hasRealAd && (
        <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-400 text-right">Ad</p>
      )}
    </div>
  )
}
