import { Helmet } from 'react-helmet-async'
import { toolSeo } from '../data/toolSeo'
import { tools } from '../data/tools'
import { useSeoOverride } from '../context/SeoOverrideContext'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://utilkit.us'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default function ToolSEO({ toolId }) {
  const override = useSeoOverride()

  const tool = tools.find((t) => t.id === toolId)
  const seo  = toolSeo[toolId]      // original 20 tools — richer custom titles/descriptions

  if (!tool) return null

  // Trailing slash to match the canonical the prerenderer and server use.
  const toolUrl = `${SITE_URL}${tool.path}/`

  const rawTitle = seo?.title ?? `${tool.name} — Free Online Tool | UtilKit`
  const rawDesc  = seo?.description ?? tool.description

  const metaTitle = override?.title       ?? rawTitle
  const metaDesc  = override?.description ?? rawDesc

  // NOTE: the canonical link and JSON-LD (SoftwareApplication / BreadcrumbList /
  // FAQPage) are emitted once, at build time, by scripts/prerender.mjs so there
  // is a single authoritative copy in the static HTML. We deliberately do NOT
  // repeat them here: duplicate <link rel="canonical"> tags make Google ignore
  // all of them, and duplicate structured data trips Search Console validation.
  return (
    <Helmet>
      {/* Primary meta */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />

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
    </Helmet>
  )
}
