import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, CheckCircle2, Home, ChevronRight } from 'lucide-react'
import { seoPages } from '../data/seoPages'
import { SeoOverrideContext } from '../context/SeoOverrideContext'

import BackgroundRemover from './tools/BackgroundRemover'
import Base64Tool from './tools/Base64Tool'
import CaseConverter from './tools/CaseConverter'
import CodeDiff from './tools/CodeDiff'
import CompressPdf from './tools/CompressPdf'
import ImageCompressor from './tools/ImageCompressor'
import ImageConverter from './tools/ImageConverter'
import ImageResizer from './tools/ImageResizer'
import JsonFormatter from './tools/JsonFormatter'
import LoremIpsum from './tools/LoremIpsum'
import MergePdf from './tools/MergePdf'
import PasswordGenerator from './tools/PasswordGenerator'
import PdfToWord from './tools/PdfToWord'
import QrCodeGenerator from './tools/QrCodeGenerator'
import RegexTester from './tools/RegexTester'
import SplitPdf from './tools/SplitPdf'
import TempEmail from './tools/TempEmail'
import UrlShortener from './tools/UrlShortener'
import WordCounter from './tools/WordCounter'
import WordToPdf from './tools/WordToPdf'

const TOOL_COMPONENTS = {
  'background-remover': BackgroundRemover,
  'base64-tool': Base64Tool,
  'case-converter': CaseConverter,
  'code-diff': CodeDiff,
  'compress-pdf': CompressPdf,
  'image-compressor': ImageCompressor,
  'image-converter': ImageConverter,
  'image-resizer': ImageResizer,
  'json-formatter': JsonFormatter,
  'lorem-ipsum': LoremIpsum,
  'merge-pdf': MergePdf,
  'password-generator': PasswordGenerator,
  'pdf-to-word': PdfToWord,
  'qr-code-generator': QrCodeGenerator,
  'regex-tester': RegexTester,
  'split-pdf': SplitPdf,
  'temp-email': TempEmail,
  'url-shortener': UrlShortener,
  'word-counter': WordCounter,
  'word-to-pdf': WordToPdf,
}

export default function ProgrammaticPage() {
  const { slug } = useParams()
  const page = seoPages[slug]

  if (!page) return <Navigate to="/" replace />

  const ToolComponent = TOOL_COMPONENTS[page.toolId]
  if (!ToolComponent) return <Navigate to="/" replace />

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
      { '@type': 'ListItem', position: 2, name: page.toolName, item: page.toolPath },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `/${slug}` },
    ],
  }

  const override = { title: page.title, description: page.description, programmatic: true }

  return (
    <SeoOverrideContext.Provider value={override}>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border-b border-zinc-200 dark:border-zinc-800 mb-0">
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-7">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-5 flex-wrap">
            <Link to="/" className="flex items-center gap-1 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              <Home size={11} />
              Home
            </Link>
            <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-600" />
            <Link to={page.toolPath} className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              {page.toolName}
            </Link>
            <ChevronRight size={11} className="text-zinc-300 dark:text-zinc-600" />
            <span className="text-zinc-700 dark:text-zinc-300">{page.h1}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 leading-tight">
            {page.h1}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl">
            {page.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {page.features.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50"
              >
                <CheckCircle2 size={11} />
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tool (heading suppressed via context) */}
      <ToolComponent />
    </SeoOverrideContext.Provider>
  )
}
