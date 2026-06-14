import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, BookOpen } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://utilkit.us'
const OG_IMAGE = `${SITE_URL}/og-image.png`

const categoryColors = {
  ai: 'text-purple-500 dark:text-purple-400',
  pdf: 'text-rose-500 dark:text-rose-400',
  image: 'text-sky-500 dark:text-sky-400',
  generator: 'text-violet-500 dark:text-violet-400',
  developer: 'text-amber-500 dark:text-amber-400',
  text: 'text-emerald-500 dark:text-emerald-400',
  calculator: 'text-teal-500 dark:text-teal-400',
  viral: 'text-pink-500 dark:text-pink-400',
}

export default function Blog() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'UtilKit Blog',
    url: `${SITE_URL}/blog`,
    description: 'Guides and how-tos for everyday calculations, developer utilities, and file tools.',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE_URL}/blog/${p.slug}`,
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Helmet>
        <title>UtilKit Blog — Guides for Calculators, Developer & File Tools</title>
        <meta name="description" content="How-to guides and explainers for percentages, BMI, loans, hashes, timestamps, color formats, and more — from the UtilKit team." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UtilKit Blog" />
        <meta property="og:description" content="Guides and how-tos for everyday calculations, developer utilities, and file tools." />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(listSchema)}</script>
      </Helmet>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-medium mb-4">
          <BookOpen size={12} /> UtilKit Blog
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Guides &amp; How-Tos</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-2xl">
          Plain-English explainers for the calculations and conversions our tools handle — with the formulas, the gotchas, and a one-click way to do it.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="card flex flex-col gap-3 hover:shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
          >
            <div className="flex items-center gap-2 text-xs">
              <span className={`font-semibold uppercase tracking-wide ${categoryColors[p.category] || 'text-zinc-400'}`}>{p.category}</span>
              <span className="text-zinc-400 dark:text-zinc-600 flex items-center gap-1"><Clock size={11} /> {p.readTime}</span>
            </div>
            <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
              {p.title}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.excerpt}</p>
            <span className="flex items-center gap-1 text-xs font-medium text-indigo-500 dark:text-indigo-400 mt-auto pt-1">
              Read guide <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
