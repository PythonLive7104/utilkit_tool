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

// Canonical URL for a route. Pages are served directory-style (/advertise/),
// so the server 301-redirects the no-slash form to the slash form. Canonicals,
// og:url, JSON-LD URLs and the sitemap must all use the slash form to match —
// otherwise Search Console reports the declared URL as "Page with redirect".
const canon = (path) => {
  const u = SITE + path
  return u.endsWith('/') ? u : `${u}/`
}

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

// Tools we deliberately keep OUT of Google's index while seeking AdSense
// approval. These are the thin, scaled, auto-generated AI-text pages: they're
// not policy violations (the outright-risky tools — ai-humanizer, pdf-unlocker,
// fake-chat-generator, temp-email — were removed from the catalogue entirely),
// just low-value "scaled content" signals. They still render, still get
// internal links, and stay usable — they just carry a
// `<meta name="robots" content="noindex, follow">` tag AND are stripped from the
// generated sitemap below, so this Set is the single source of truth. Revisit
// (and shrink) this list once the site is approved.
const NOINDEX_TOOLS = new Set([
  'ai-paraphraser',
  'ai-grammar-fixer',
  'ai-summarizer',
  'ai-title-generator',
  'ai-email-writer',
])

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
    url: canon(tool.path),
  })

  return {
    path: tool.path,
    title: `${tool.name} — Free Online Tool | UtilKit`,
    description: tool.description,
    body,
    jsonLd: ld,
    noindex: NOINDEX_TOOLS.has(tool.id),
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
        mainEntityOfPage: canon(`/blog/${post.slug}`),
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
  body += `<p class="text-zinc-500 dark:text-zinc-400 max-w-2xl mb-10">${esc('68 free, browser-based tools — PDF conversion, image editing, AI writing, calculators, developer utilities, and text processing. No sign-up, nothing leaves your device.')}</p>`

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

  // Editorial content — gives the homepage real textual substance for crawlers.
  body +=
    '<section class="mt-14 max-w-3xl"><h2 class="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">Free online tools, without the runaround</h2>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">Most everyday digital tasks — converting a PDF to Word, compressing a photo so it fits an upload limit, generating a QR code for a poster, formatting a messy block of JSON, or working out a percentage — are simple in theory but scattered across dozens of different websites in practice. Each one has its own layout, its own sign-up wall, and its own pile of pop-ups. UtilKit exists to gather the tools you reach for most into a single, consistent place that loads fast and gets out of your way.</p>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">There are currently 68 tools spread across PDF, image, developer, generator, calculator, and text categories. You never need an account to use them, and there are no watermarks, trial timers, or file-size paywalls on the core tools. Browse by category or search by name — every tool is one click away and opens instantly.</p>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">Privacy is built in rather than bolted on. Wherever it is technically possible, tools run entirely inside your browser: when you merge PDFs or resize an image, the file is processed on your own device and never uploaded to a server. A handful of tools that genuinely need one — such as the AI writing helpers and the background remover — send data over an encrypted connection, process it, and return the result without storing it. You can read exactly how each tool handles data in our <a href="/privacy/" class="underline">Privacy Policy</a>.</p>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">UtilKit is designed for anyone who works with files and text online — students, professionals, developers, and creators. New tools are added regularly, and each one comes with a short guide and FAQ. Want a tool we do not have yet, or spotted something broken? Tell us on the <a href="/contact/" class="underline">Contact page</a>, or learn more <a href="/about/" class="underline">about UtilKit</a>.</p></section>'

  body += '</div>'
  return {
    path: '/',
    title: 'UtilKit — 68 Free Online Utility Tools',
    description: 'Free PDF converter, image compressor, AI writing tools, QR code generator, password generator, and 62 more utilities. All browser-based, all free, no account needed.',
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
    '<div class="max-w-2xl mx-auto px-4 py-10">' +
    '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Your files stay yours</h1>' +
    '<p class="text-zinc-500 dark:text-zinc-400 mb-6">UtilKit is built on a simple principle: process your data, return the result, keep as little as possible. Most tools run entirely in your browser, so your files never reach our servers. This policy explains what we collect, the third-party services we use — including advertising — and the choices you have. Last updated: July 2026.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Browser-side tools — no upload ever</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">The majority of UtilKit tools run entirely inside your web browser using JavaScript — all PDF tools, most image tools, and all developer and text tools. Your files and data never leave your device; no bytes are transmitted to any server. Processing happens locally on your own machine.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Server-side tools — processed, then deleted</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">A few tools need our server: the AI tools (Paraphraser, Grammar Fixer, Summarizer, Title Generator, Email Writer) send text over HTTPS to OpenAI and return the result without storing it; the Background Remover sends your image to remove.bg and returns it without storing it; the URL Shortener stores only the shortened URL and a click count. All server communication is encrypted with HTTPS/TLS.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Cookies &amp; local storage</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">UtilKit itself uses one localStorage value to remember your theme preference; it is never transmitted. Our advertising partner (Google) and its vendors may set cookies to serve and measure ads. We do not run Google Analytics, Meta Pixel, or other independent tracking scripts.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Advertising (Google AdSense)</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">UtilKit is a free service supported by advertising. We use Google AdSense to display ads. Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to UtilKit and other sites, and third-party vendors and ad networks may also use cookies to serve ads based on your interests. You can opt out of personalised advertising at <a href="https://www.google.com/settings/ads" class="underline">Google Ads Settings</a> and at <a href="https://www.aboutads.info/choices/" class="underline">aboutads.info/choices</a>. See <a href="https://policies.google.com/technologies/ads" class="underline">Google\'s advertising policies</a> for more. Visitors in the EEA, UK and Switzerland are shown a consent prompt for personalised ads where required.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Other third-party services</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">We use OpenAI to process text for AI tools, remove.bg to process images for the Background Remover, and Google Fonts to serve the site\'s typefaces. Each is used strictly to power that feature.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Your rights &amp; contact</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">We store almost no personal data. Where we do (a contact message, or a URL you shorten), you can ask us to delete it at any time. Contact us via the <a href="/contact/" class="underline">Contact page</a> or at <a href="mailto:support@utilkit.us" class="underline">support@utilkit.us</a>.</p>' +
    '</div>'
  return {
    path: '/privacy',
    title: 'Privacy Policy | UtilKit',
    description: 'How UtilKit handles your data: most tools run in your browser, files never leave your device. Includes our Google AdSense cookie disclosure and opt-out choices.',
    body,
    jsonLd: [breadcrumbLd([['Home', '/'], ['Privacy', '/privacy']])],
  }
}

function renderAbout() {
  const body =
    '<div class="max-w-2xl mx-auto px-4 py-10">' +
    '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">One tab for the tools you keep re-searching</h1>' +
    '<p class="text-zinc-500 dark:text-zinc-400 mb-8">UtilKit brings together 68 of the everyday utilities people bounce between a dozen websites to find — PDF conversion, image editing, QR codes, password generation, JSON formatting, unit conversion and more — under one fast, ad-light, no-sign-up roof.</p>' +
    '<h2 class="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3">Why we built it</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">The web is full of single-purpose tool sites, and most of them make a simple task feel like a chore: pop-ups, forced sign-ups, watermarks, upload limits, and a wall of ads between you and the download button. UtilKit exists to remove that friction. Every tool lives at a predictable address, opens instantly, and does exactly one job well — no account, no install, no “upgrade to continue.”</p>' +
    '<h2 class="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3 mt-8">How it actually works</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">Wherever it is technically possible, our tools run entirely inside your browser. When you merge two PDFs or resize a photo, the work happens on your own device using JavaScript — the file never travels to a server. That makes the tools fast, keeps them working on flaky connections, and means your documents stay private by default. A small number of tools genuinely need a server (for example AI-powered tools and the background remover); for those, data is sent over encrypted HTTPS, processed, and returned, and we do not retain it.</p>' +
    '<h2 class="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3 mt-8">What is inside</h2>' +
    '<ul class="list-disc pl-6 mb-4 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">' +
    '<li>PDF tools — convert, merge, split, compress, watermark, rotate, OCR and e-sign.</li>' +
    '<li>Image tools — convert formats, compress, resize, upscale and remove backgrounds.</li>' +
    '<li>Developer tools — JSON/SQL/HTML/CSS formatters, Base64, JWT, regex, hashing and UUIDs.</li>' +
    '<li>Generators — QR codes, passwords, short links and more.</li>' +
    '<li>Calculators &amp; converters — percentages, loans, BMI, age, units and number bases.</li>' +
    '<li>Text tools — word counting, case conversion, lorem ipsum and more.</li></ul>' +
    '<h2 class="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3 mt-8">What we stand for</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">Privacy first — client-side by default, nothing stored that does not have to be. Free to use — the core tools are, and will stay, free. No friction — no sign-up wall to run a tool, no watermarks on your output. Honest UX — clear labels, no dark patterns.</p>' +
    '<h2 class="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-3 mt-8">How UtilKit is funded</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">Keeping the tools free and running costs money — servers, domains, and the AI services behind a few of the tools. We cover that through light, clearly-marked advertising and optional paid upgrades for heavier users. We do not sell your data, and we never will.</p>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Questions or tool requests? Visit our <a href="/contact/" class="underline">Contact page</a> or email <a href="mailto:support@utilkit.us" class="underline">support@utilkit.us</a>.</p>' +
    '</div>'
  return {
    path: '/about',
    title: 'About UtilKit — Free Online Utility Tools',
    description: 'What UtilKit is, why we built it, and how our 68 free browser-based tools work. Privacy-first, no sign-up, no watermarks.',
    body,
    jsonLd: [
      breadcrumbLd([['Home', '/'], ['About', '/about']]),
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About UtilKit',
        url: canon('/about'),
        description: 'What UtilKit is, why we built it, and how our free browser-based tools work.',
      },
    ],
  }
}

function renderContact() {
  const body =
    '<div class="max-w-2xl mx-auto px-4 py-10">' +
    '<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Get in touch</h1>' +
    '<p class="text-zinc-500 dark:text-zinc-400 mb-4">Questions, bug reports, tool requests, or advertising enquiries — send us a message and we will get back to you. You can also email us directly at <a href="mailto:support@utilkit.us" class="underline">support@utilkit.us</a>. We aim to reply within 48 hours.</p>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Use the contact form to tell us your name, email, a subject, and your message, and we will reply to the email address you provide. Whether you have spotted a bug, want a tool we do not have yet, need help using one of our utilities, or would like to advertise on UtilKit, this is the fastest way to reach a human.</p>' +
    '</div>'
  return {
    path: '/contact',
    title: 'Contact UtilKit — Support, Feedback & Enquiries',
    description: 'Contact the UtilKit team for support, bug reports, tool requests, or advertising enquiries. Email support@utilkit.us — we reply within 48 hours.',
    body,
    jsonLd: [
      breadcrumbLd([['Home', '/'], ['Contact', '/contact']]),
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact UtilKit',
        url: canon('/contact'),
        description: 'Contact the UtilKit team for support, feedback, tool requests, or advertising enquiries.',
      },
    ],
  }
}

function renderTerms() {
  const body =
    '<div class="max-w-2xl mx-auto px-4 py-10">' +
    '<h1 class="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">Terms of Service &amp; Disclaimer</h1>' +
    '<p class="text-sm text-zinc-500 dark:text-zinc-400 mb-6">These terms govern your use of UtilKit (utilkit.us). By using the site and its tools, you agree to them. Last updated: July 2026.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Using UtilKit</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">UtilKit provides a collection of free online utility tools. You may use them for personal or commercial purposes, free of charge, without creating an account. Some optional features may require an account or a paid plan; where they do, that will be made clear before you sign up or pay. You are responsible for the files and content you process, and for making sure you have the right to use them.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Acceptable use</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">You agree not to use the tools to process illegal, infringing, or malicious content; not to disrupt, overload, reverse-engineer, or gain unauthorised access to the service; not to abuse rate limits or resell access to server-side tools as your own service; and not to use the site in any way that violates applicable laws or the rights of others.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Disclaimer — “as is”</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">UtilKit and all of its tools are provided “as is” and “as available,” without warranties of any kind. We do not guarantee that any tool will be accurate, error-free, or fit for a particular purpose. Results from calculators, converters, generators, and AI-assisted tools are provided for convenience and should not be relied upon as professional, legal, financial, or medical advice. You use the tools at your own risk.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Limitation of liability</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">To the fullest extent permitted by law, UtilKit and its operators will not be liable for any indirect, incidental, or consequential damages — including lost data, lost profits, or business interruption — arising from your use of, or inability to use, the site or its tools.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Advertising &amp; third-party services</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">UtilKit is supported in part by advertising, which may be served by third-party ad networks. Those networks may use cookies and similar technologies to show and measure ads; how that works, and your choices, are described in our <a href="/privacy/" class="underline">Privacy Policy</a>. We are not responsible for the content or practices of external sites we link to.</p>' +
    '<h2 class="text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">Changes to these terms</h2>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">We may update these terms from time to time as the service evolves. When we do, we will revise the “last updated” date above. Continuing to use UtilKit after a change means you accept the updated terms.</p>' +
    '<p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Questions about these terms? Reach us via the <a href="/contact/" class="underline">Contact page</a> or at <a href="mailto:support@utilkit.us" class="underline">support@utilkit.us</a>.</p>' +
    '</div>'
  return {
    path: '/terms',
    title: 'Terms of Service & Disclaimer | UtilKit',
    description: 'The terms that govern your use of UtilKit, including acceptable use, the “as is” disclaimer, limitation of liability, and advertising disclosures.',
    body,
    jsonLd: [breadcrumbLd([['Home', '/'], ['Terms', '/terms']])],
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
      item: canon(path),
    })),
  }
}

// ── HTML assembly ────────────────────────────────────────────────────────────
function buildPage(template, page) {
  const url = canon(page.path)
  const head = [
    ...(page.noindex ? ['<meta name="robots" content="noindex, follow" />'] : []),
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
    renderAbout(),
    renderContact(),
    renderTerms(),
    ...tools.map(renderToolPage),
    ...blogPosts.map(renderBlogPost),
  ]

  for (const page of pages) {
    writePage(page, buildPage(template, page))
  }

  console.log(`✓ prerendered ${pages.length} pages into dist/`)

  stripNoindexFromSitemap()
}

// Remove the noindexed tool URLs from the built sitemap. Vite copies the
// hand-maintained public/sitemap.xml into dist/ during the build (which runs
// before this script), so we rewrite that copy in place — the source file is
// left untouched. NOINDEX_TOOLS stays the single source of truth: a tool listed
// there is both noindexed AND absent from the sitemap, with no second list to
// keep in sync.
function stripNoindexFromSitemap() {
  const sitemapPath = join(DIST, 'sitemap.xml')
  let xml
  try {
    xml = readFileSync(sitemapPath, 'utf8')
  } catch {
    console.warn('⚠ prerender: dist/sitemap.xml not found — skipping noindex strip')
    return
  }

  const blocked = new Set(
    [...NOINDEX_TOOLS]
      .map((id) => toolById[id])
      .filter(Boolean)
      .map((t) => canon(t.path)),
  )

  let removed = 0
  const next = xml.replace(/[ \t]*<url>[\s\S]*?<\/url>\n?/g, (block) => {
    const m = block.match(/<loc>([^<]+)<\/loc>/)
    if (m && blocked.has(m[1].trim())) {
      removed++
      return ''
    }
    return block
  })

  writeFileSync(sitemapPath, next)
  console.log(`✓ stripped ${removed} noindexed URL(s) from dist/sitemap.xml`)
}

main()
