import { useState, useEffect } from 'react'
import { ads } from '../lib/api'
import AdvertiseHere from './AdvertiseHere'

// Renders the live advert for a tool category, or an "Advertise here"
// placeholder when the slot is empty. Used on tool pages (category-targeted).
export default function AdSlot({ category }) {
  const [ad, setAd] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!category) return
    let active = true
    ads
      .active(category)
      .then((res) => { if (active) setAd(res?.ad || null) })
      .catch(() => {})
      .finally(() => { if (active) setLoaded(true) })
    return () => { active = false }
  }, [category])

  // Avoid layout shift / flicker before the first fetch resolves.
  if (!loaded) return null

  if (!ad) {
    return (
      <div className="my-6">
        <AdvertiseHere category={category} compact />
      </div>
    )
  }

  return (
    <div className="my-6">
      <a
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
      <p className="mt-1 text-[10px] uppercase tracking-wide text-zinc-400 text-right">Ad</p>
    </div>
  )
}
