// Build-time prerenderer for UtilKit.
//
// Why this exists: the app is a client-side React SPA, so every URL shipped an
// empty <div id="root">. Crawlers (and the AdSense reviewer in particular) saw
// no content, which got the site flagged as "low value / thin content".
//
// This script runs AFTER `vite build`. For every real route it bakes the page's
// actual text content (headings, descriptions, how-to steps, FAQs, use cases,
// blog copy) straight into the HTML, along with a correct per-page <title>,
// meta description, canonical, Open Graph tags and JSON-LD. The React bundle is
// left untouched in the markup, so the app still boots and takes over on load.
//
// It deliberately does NOT use a headless browser or React SSR:
//   - no Chromium dependency to install on the deploy server, and
//   - browser-only tool components (pdf.js, tesseract, canvas) can't crash it,
// because content is generated purely from the plain data modules.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { tools, categories } from '../src/data/tools.js'
import { toolContent } from '../src/data/toolContent.js'
import { blogPosts } from '../src/data/blogPosts.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = resolve(__dirname, '..', 'dist')
const SITE = (process.env.VITE_SITE_URL || 'https://utilkit.us').replace(/\/$/, '')
const OG_IMAGE = `${SITE}/og-image.png`

// ── helpers ──────────────────────────────────────────────────────────────────
const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const catById = Object.fromEntries(categories.map((c) => [c.id, c]))
const toolById = Object.fromEntries(tools.map((t) => [t.id, t]))

function breadcrumb(parts) {
  // parts: [{ name, href? }]
  const items = parts
    .map((p, i) => {
      const sep = i > 0 ? '<span class="mx-1.5 text-zinc-300 dark:text-zinc-600">/</span>' : ''
      const node = p.href
        ? `<a href="${esc(p.href)}" class="hover:text-zinc-800 dark:hover:text-zinc-200">${esc(p.name)}</a>`
        : `<span class="text-zinc-700 dark:text-zinc-300">${esc(p.name)}</span>`
      return sep + node
    })
    .join('')
  return `<nav class="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-5">${items}</nav>`
}

// ── content renderers ────────────────────────────────────────────────────────
function renderToolContent(toolId) {
  const c = toolContent[toolId]
  if (!c) return ''
  let html = ''

  if (c.howTo?.length) {
    html += '<section class="mt-10"><h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-6">How to use it</h2><ol class="space-y-5">'
    for (const s of c.howTo) {
      html += `<li><p class="text-sm font-semibold text-zinc-800 dark:text-zinc-100">${esc(s.title)}</p><p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">${esc(s.body)}</p></li>`
    }
    html += '</ol></section>'
  }

  if (c.why) {
    html += `<section class="mt-8"><h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-3">Why use this tool?</h2><p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">${esc(c.why)}</p></section>`
  }

  if (c.useCases?.length) {
    html += '<section class="mt-8"><h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Common use cases</h2><div class="grid sm:grid-cols-3 gap-3">'
    for (const u of c.useCases) {
      html += `<div class="rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4"><p class="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-2">${esc(u.title)}</p><p class="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">${esc(u.body)}</p></div>`
    }
    html += '</div></section>'
  }

  if (c.faq?.length) {
    html += '<section class="mt-8"><h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Frequently asked questions</h2><div class="space-y-3">'
    for (const f of c.faq) {
      html += `<div class="rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4"><h3 class="text-sm font-medium text-zinc-800 dark:text-zinc-100 mb-1">${esc(f.q)}</h3><p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">${esc(f.a)}</p></div>`
    }
    html += '</div></section>'
  }

  return html
}

function renderToolPage(tool) {
  const cat = catById[tool.category]
  let body = '<div class="max-w-4xl mx-auto px-4 py-8">'
  body += breadcrumb([
    { name: 'Home', href: '/' },
    ...(cat ? [{ name: cat.name }] : []),
    { name: tool.name },
  ])
  body += `<h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">${esc(tool.name)}</h1>`
  body += `<p class="text-zinc-500 dark:text-zinc-400 text-sm mb-6">${esc(tool.description)}</p>`

  if (tool.features?.length) {
    body += '<ul class="flex flex-wrap gap-2 mb-2">'
    for (const f of tool.features) {
      body += `<li class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50">${esc(f)}</li>`
    }
    body += '</ul>'
  }
  if (tool.useCase) {
    body += `<p class="text-sm text-zinc-500 dark:text-zinc-400 mt-3">${esc(tool.useCase)}</p>`
  }

  body += renderToolContent(tool.id)

  // Related tools — internal links help crawl depth.
  const related = (tool.related || []).map((id) => toolById[id]).filter(Boolean)
  if (related.length) {
    body += '<section class="mt-8"><h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-4">Related tools</h2><ul class="grid sm:grid-cols-3 gap-3">'
    for (const r of related) {
      body += `<li><a href="${esc(r.path)}" class="block px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60"><span class="text-sm font-medium text-zinc-800 dark:text-zinc-100">${esc(r.name)}</span></a></li>`
    }
    body += '</ul></section>'
  }

  body += '</div>'

  // JSON-LD
  const ld = [breadcrumbLd([['Home', '/'], ...(cat ? [[cat.name, '/']] : []), [tool.name, tool.path]])]
  const c = toolContent[tool.id]
  if (c?.faq?.length) ld.push(faqLd(c.faq))
  ld.push({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (web browser)',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: tool.description,
    url: SITE + tool.path,
  })

  return {
    path: tool.path,
    title: `${tool.name} — Free Online Tool | UtilKit`,
    description: tool.description,
    body,
    jsonLd: ld,
  }
}

function renderBlogPost(post) {
  let body = '<article class="max-w-3xl mx-auto px-4 py-8">'
  body += breadcrumb([{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: post.title }])
  body += `<h1 class="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-3 leading-tight">${esc(post.title)}</h1>`
  body += `<p class="text-xs text-zinc-400 mb-6">${esc(post.date)} · ${esc(post.readTime)} read</p>`
  body += `<p class="text-base text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">${esc(post.excerpt)}</p>`

  for (const block of post.content || []) {
    if (block.type === 'h2') body += `<h2 class="text-xl font-bold text-zinc-800 dark:text-zinc-100 mt-8 mb-3">${esc(block.text)}</h2>`
    else if (block.type === 'p') body += `<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">${esc(block.text)}</p>`
    else if (block.type === 'tip') body += `<div class="rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 mb-4"><p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">${esc(block.text)}</p></div>`
    else if (block.type === 'ul' || block.type === 'ol') {
      const tag = block.type
      body += `<${tag} class="list-${tag === 'ul' ? 'disc' : 'decimal'} pl-6 mb-4 space-y-1.5">`
      for (const item of block.items || []) body += `<li class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">${esc(item)}</li>`
      body += `</${tag}>`
    }
  }

  if (post.toolPath) {
    body += `<p class="mt-8 text-sm"><a href="${esc(post.toolPath)}" class="text-indigo-600 dark:text-indigo-400 font-medium">Try the ${esc(post.toolName)} →</a></p>`
  }
  body += '</article>'

  return {
    path: `/blog/${post.slug}`,
    title: `${post.title} | UtilKit Blog`,
    description: post.description,
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { '@type': 'Organization', name: 'UtilKit' },
        publisher: { '@type': 'Organization', name: 'UtilKit', logo: { '@type': 'ImageObject', url: OG_IMAGE } },
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
      },
      breadcrumbLd([['Home', '/'], ['Blog', '/blog'], [post.title, `/blog/${post.slug}`]]),
    ],
  }
}

function renderBlogIndex() {
  let body = '<div class="max-w-3xl mx-auto px-4 py-8">'
  body += '<h1 class="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">UtilKit Blog</h1>'
  body += '<p class="text-zinc-500 dark:text-zinc-400 mb-8">Guides, tips, and how-tos for getting the most out of our free online tools.</p>'
  body += '<ul class="space-y-6">'
  for (const post of blogPosts) {
    body += `<li><a href="/blog/${esc(post.slug)}" class="block"><h2 class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">${esc(post.title)}</h2><p class="text-sm text-zinc-500 dark:text-zinc-400 mt-1">${esc(post.excerpt)}</p><p class="text-xs text-zinc-400 mt-1">${esc(post.date)} · ${esc(post.readTime)} read</p></a></li>`
  }
  body += '</ul></div>'
  return {
    path: '/blog',
    title: 'Blog — Guides & How-Tos | UtilKit',
    description: 'Guides, tips, and how-tos for PDF, image, AI, developer, and text tools. Learn how to get the most out of UtilKit.',
    body,
    jsonLd: [breadcrumbLd([['Home', '/'], ['Blog', '/blog']])],
  }
}

function renderHome() {
  let body = '<div class="max-w-6xl mx-auto px-4 py-10">'
  body += '<h1 class="text-3xl sm:text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">Free Online Utility Tools</h1>'
  body += `<p class="text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10">${esc('63 free, browser-based tools — PDF conversion, image editing, AI writing, calculators, developer utilities, and text processing. No sign-up, nothing leaves your device.')}</p>`

  for (const cat of categories) {
    const catTools = tools.filter((t) => t.category === cat.id)
    if (!catTools.length) continue
    body += `<section class="mb-10"><h2 class="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-1">${esc(cat.name)}</h2>`
    if (cat.description) body += `<p class="text-sm text-zinc-500 dark:text-zinc-400 mb-4">${esc(cat.description)}</p>`
    body += '<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">'
    for (const t of catTools) {
      body += `<li><a href="${esc(t.path)}" class="block rounded-xl border border-zinc-200 dark:border-zinc-700/60 p-4"><span class="block text-sm font-semibold text-zinc-800 dark:text-zinc-100">${esc(t.name)}</span><span class="block text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">${esc(t.description)}</span></a></li>`
    }
    body += '</ul></section>'
  }
  body += '</div>'
  return {
    path: '/',
    title: 'UtilKit — 63 Free Online Utility Tools',
    description: 'Free PDF converter, image compressor, AI writing tools, QR code generator, password generator, and 58 more utilities. All browser-based, all free, no account needed.',
    body,
    jsonLd: [],
  }
}

function renderAdvertise() {
  const body =
    '<div class="max-w-2xl mx-auto px-4 py-10">' +
    '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Advertise on UtilKit</h1>' +
    '<p class="text-zinc-500 dark:text-zinc-400">Reach thousands of people using our free online tools. ' +
    'Choose a tool category, upload your banner, and your advert goes live the moment your weekly payment is confirmed. ' +
    'Each category has limited space — when it is full you can check back on the date the current advert expires.</p>' +
    '</div>'
  return {
    path: '/advertise',
    title: 'Advertise on UtilKit — Reach Thousands of Users',
    description: "Place a banner advert on UtilKit's tool pages. Pick a tool category, pay by the week, and go live instantly after payment.",
    body,
    jsonLd: [breadcrumbLd([['Home', '/'], ['Advertise', '/advertise']])],
  }
}

function renderPrivacy() {
  const body =
    '<div class="max-w-3xl mx-auto px-4 py-8">' +
    '<h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">Privacy Policy</h1>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">UtilKit runs its tools in your browser wherever possible — files processed client-side never leave your device. This page explains what limited data we collect, how cookies and third-party services (such as advertising) are used, and your choices.</p>' +
    '</div>'
  return {
    path: '/privacy',
    title: 'Privacy Policy | UtilKit',
    description: 'How UtilKit handles your data. Most tools run entirely in your browser; files never leave your device.',
    body,
    jsonLd: [],
  }
}

// ── JSON-LD builders ─────────────────────────────────────────────────────────
function faqLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumbLd(pairs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: pairs.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE + path,
    })),
  }
}

// ── HTML assembly ────────────────────────────────────────────────────────────
function buildPage(template, page) {
  const url = SITE + page.path
  const head = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    ...(page.jsonLd || []).map(
      (obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`,
    ),
  ].join('\n    ')

  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${esc(page.description)}" />`,
  )
  html = html.replace('</head>', `    ${head}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${page.body}</div>`)
  return html
}

function writePage(page, html) {
  const out =
    page.path === '/'
      ? join(DIST, 'index.html')
      : join(DIST, page.path.replace(/^\//, ''), 'index.html')
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, html)
}

// ── run ──────────────────────────────────────────────────────────────────────
function main() {
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('prerender: could not find empty <div id="root"></div> in dist/index.html')
  }

  const pages = [
    renderHome(),
    renderBlogIndex(),
    renderAdvertise(),
    renderPrivacy(),
    ...tools.map(renderToolPage),
    ...blogPosts.map(renderBlogPost),
  ]

  for (const page of pages) {
    writePage(page, buildPage(template, page))
  }

  console.log(`✓ prerendered ${pages.length} pages into dist/`)
}

main()
