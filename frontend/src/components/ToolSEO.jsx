import { Helmet } from 'react-helmet-async'
import { toolSeo } from '../data/toolSeo'
import { toolContent } from '../data/toolContent'
import { tools } from '../data/tools'
import { useSeoOverride } from '../context/SeoOverrideContext'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://utilkit.io'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default function ToolSEO({ toolId }) {
  const override = useSeoOverride()

  const tool    = tools.find((t) => t.id === toolId)
  const seo     = toolSeo[toolId]      // original 20 tools — richer custom titles/descriptions
  const content = toolContent[toolId]  // all 47 tools — howTo/faq data for schemas

  if (!tool) return null

  const toolUrl = `${SITE_URL}${tool.path}`

  const rawTitle = seo?.title ?? `${tool.name} — Free Online Tool | UtilKit`
  const rawDesc  = seo?.description ?? tool.description

  const metaTitle = override?.title       ?? rawTitle
  const metaDesc  = override?.description ?? rawDesc

  // ── JSON-LD: WebApplication ──────────────────────────────────────────────
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: toolUrl,
    description: metaDesc,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: tool.features ?? [],
    provider: { '@type': 'Organization', name: 'UtilKit', url: SITE_URL },
  }

  // ── JSON-LD: BreadcrumbList ──────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: tool.name, item: toolUrl },
    ],
  }

  // ── JSON-LD: FAQPage (shows expandable Q&A directly in search results) ───
  const faqItems = content?.faq ?? seo?.faq
  const faqSchema = faqItems?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  } : null

  // ── JSON-LD: HowTo (shows numbered steps directly in search results) ─────
  const howToSteps = content?.howTo ?? null
  const howToSchema = howToSteps?.length ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${tool.name}`,
    description: metaDesc,
    step: howToSteps.map(({ step, title, body }) => ({
      '@type': 'HowToStep',
      position: parseInt(step, 10),
      name: title,
      text: body,
    })),
  } : null

  return (
    <Helmet>
      {/* Primary meta */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={toolUrl} />

      {/* OpenGraph — Facebook, LinkedIn, WhatsApp, Slack previews */}
      <meta property="og:type"         content="website" />
      <meta property="og:site_name"    content="UtilKit" />
      <meta property="og:url"          content={toolUrl} />
      <meta property="og:title"        content={metaTitle} />
      <meta property="og:description"  content={metaDesc} />
      <meta property="og:image"        content={OG_IMAGE} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card — large image format */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@utilkit" />
      <meta name="twitter:title"       content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema   && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {howToSchema && <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>}
    </Helmet>
  )
}
