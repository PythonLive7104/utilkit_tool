import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, ChevronRight, Clock, ArrowRight, Lightbulb } from 'lucide-react'
import { getPostBySlug, blogPosts } from '../data/blogPosts'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://utilkit.us'
const OG_IMAGE = `${SITE_URL}/og-image.png`

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mt-8 mb-3">{block.text}</h2>
    case 'p':
      return <p className="text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">{block.text}</p>
    case 'ul':
      return (
        <ul className="list-disc pl-5 space-y-1.5 mb-4 text-[15px] text-zinc-600 dark:text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ul>
      )
    case 'ol':
      return (
        <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-[15px] text-zinc-600 dark:text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ol>
      )
    case 'tip':
      return (
        <div className="flex gap-3 my-5 p-4 rounded-xl border border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-950/20">
          <Lightbulb size={16} className="text-indigo-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{block.text}</p>
        </div>
      )
    default:
      return null
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const url = `${SITE_URL}/blog/${post.slug}`
  const related = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'UtilKit' },
    publisher: { '@type': 'Organization', name: 'UtilKit', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: OG_IMAGE,
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Helmet>
        <title>{`${post.title} | UtilKit`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-5 flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200"><Home size={11} /> Home</Link>
        <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-600" />
        <Link to="/blog" className="hover:text-zinc-800 dark:hover:text-zinc-200">Blog</Link>
        <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-600" />
        <span className="text-zinc-700 dark:text-zinc-300 truncate">{post.title}</span>
      </nav>

      <article>
        <header className="mb-6">
          <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 mb-3">
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} read</span>
            <span>·</span>
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight mb-3">{post.title}</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">{post.excerpt}</p>
        </header>

        {/* Tool CTA */}
        <Link
          to={post.toolPath}
          className="flex items-center justify-between gap-3 mb-8 p-4 rounded-xl border border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-950/20 group"
        >
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">Just want the tool?</p>
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Open the {post.toolName} →</p>
          </div>
          <ArrowRight size={16} className="text-indigo-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
        </Link>

        <div>
          {post.content.map((block, i) => <Block key={i} block={block} />)}
        </div>

        {/* End CTA */}
        <div className="mt-10 rounded-2xl border border-indigo-400/20 bg-indigo-50/50 dark:bg-indigo-950/20 p-5 text-center">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-1">Ready to try it?</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{post.toolName} is free, instant, and runs in your browser.</p>
          <Link to={post.toolPath} className="btn-primary inline-flex">Open {post.toolName} <ArrowRight size={15} /></Link>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h2 className="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Related guides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{p.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
