import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'

// Everything below the landing page is lazy-loaded: each route — and the heavy
// libraries some tools pull in (pdf-lib, pdfjs, tesseract, qrcode, jszip,
// framer-motion, marked, highlight.js) — only downloads when that route is
// visited. This keeps the initial bundle small. Layout wraps <Outlet> in a
// <Suspense> fallback, so the app shell stays put while a tool chunk loads.
// Programmatic SEO landing pages stay disabled (AdSense flagged them as
// doorway content); restore the import + catch-all route below to re-enable.
// const ProgrammaticPage = lazy(() => import('./pages/ProgrammaticPage'))
const Privacy = lazy(() => import('./pages/Privacy'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Terms = lazy(() => import('./pages/Terms'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Advertise = lazy(() => import('./pages/Advertise'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

// Original tools
const PdfToWord = lazy(() => import('./pages/tools/PdfToWord'))
const WordToPdf = lazy(() => import('./pages/tools/WordToPdf'))
const MergePdf = lazy(() => import('./pages/tools/MergePdf'))
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf'))
const SplitPdf = lazy(() => import('./pages/tools/SplitPdf'))
const ImageConverter = lazy(() => import('./pages/tools/ImageConverter'))
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor'))
const BackgroundRemover = lazy(() => import('./pages/tools/BackgroundRemover'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer'))
const QrCodeGenerator = lazy(() => import('./pages/tools/QrCodeGenerator'))
const UrlShortener = lazy(() => import('./pages/tools/UrlShortener'))
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter'))
const Base64Tool = lazy(() => import('./pages/tools/Base64Tool'))
const RegexTester = lazy(() => import('./pages/tools/RegexTester'))
const CodeDiff = lazy(() => import('./pages/tools/CodeDiff'))
const WordCounter = lazy(() => import('./pages/tools/WordCounter'))
const CaseConverter = lazy(() => import('./pages/tools/CaseConverter'))
const LoremIpsum = lazy(() => import('./pages/tools/LoremIpsum'))

// AI Tools
const AiParaphraser = lazy(() => import('./pages/tools/AiParaphraser'))
const AiGrammarFixer = lazy(() => import('./pages/tools/AiGrammarFixer'))
const AiSummarizer = lazy(() => import('./pages/tools/AiSummarizer'))
const AiTitleGenerator = lazy(() => import('./pages/tools/AiTitleGenerator'))
const AiEmailWriter = lazy(() => import('./pages/tools/AiEmailWriter'))

// New PDF Tools
const PdfWatermark = lazy(() => import('./pages/tools/PdfWatermark'))
const RotatePdf = lazy(() => import('./pages/tools/RotatePdf'))
const OcrPdf = lazy(() => import('./pages/tools/OcrPdf'))
const EsignPdf = lazy(() => import('./pages/tools/EsignPdf'))

// New Image Tools
const MemeGenerator = lazy(() => import('./pages/tools/MemeGenerator'))
const AiImageUpscaler = lazy(() => import('./pages/tools/AiImageUpscaler'))
const PngToJpg = lazy(() => import('./pages/tools/PngToJpg'))
const JpgToPng = lazy(() => import('./pages/tools/JpgToPng'))
const WebpConverter = lazy(() => import('./pages/tools/WebpConverter'))

// New Developer Tools
const JwtDecoder = lazy(() => import('./pages/tools/JwtDecoder'))
const SqlFormatter = lazy(() => import('./pages/tools/SqlFormatter'))
const HtmlMinifier = lazy(() => import('./pages/tools/HtmlMinifier'))
const CssMinifier = lazy(() => import('./pages/tools/CssMinifier'))
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator'))
const MarkdownPreviewer = lazy(() => import('./pages/tools/MarkdownPreviewer'))

// Viral Tools
const InvoiceGenerator = lazy(() => import('./pages/tools/InvoiceGenerator'))
const ResumeBuilder = lazy(() => import('./pages/tools/ResumeBuilder'))
const BioLinkGenerator = lazy(() => import('./pages/tools/BioLinkGenerator'))
const TypingSpeedTest = lazy(() => import('./pages/tools/TypingSpeedTest'))

// Calculators
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator'))
const AgeCalculator = lazy(() => import('./pages/tools/AgeCalculator'))
const BmiCalculator = lazy(() => import('./pages/tools/BmiCalculator'))
const LoanCalculator = lazy(() => import('./pages/tools/LoanCalculator'))
const DiscountCalculator = lazy(() => import('./pages/tools/DiscountCalculator'))
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter'))

// More Developer Tools
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator'))
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter'))
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder'))
const CsvToJson = lazy(() => import('./pages/tools/CsvToJson'))
const ColorConverter = lazy(() => import('./pages/tools/ColorConverter'))
const NumberBaseConverter = lazy(() => import('./pages/tools/NumberBaseConverter'))

// More Image Tools
const ImageToPdf = lazy(() => import('./pages/tools/ImageToPdf'))
const ImageCropper = lazy(() => import('./pages/tools/ImageCropper'))

// More Text Tools
const TextCleaner = lazy(() => import('./pages/tools/TextCleaner'))
const SlugGenerator = lazy(() => import('./pages/tools/SlugGenerator'))

// Newest additions
const TipCalculator = lazy(() => import('./pages/tools/TipCalculator'))
const CompoundInterestCalculator = lazy(() => import('./pages/tools/CompoundInterestCalculator'))
const DateDurationCalculator = lazy(() => import('./pages/tools/DateDurationCalculator'))
const CssGradientGenerator = lazy(() => import('./pages/tools/CssGradientGenerator'))
const BoxShadowGenerator = lazy(() => import('./pages/tools/BoxShadowGenerator'))
const FindAndReplace = lazy(() => import('./pages/tools/FindAndReplace'))
const RemoveDuplicateLines = lazy(() => import('./pages/tools/RemoveDuplicateLines'))
const SortTextLines = lazy(() => import('./pages/tools/SortTextLines'))
const BackgroundChanger = lazy(() => import('./pages/tools/BackgroundChanger'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Original PDF Tools */}
          <Route path="tools/pdf-to-word" element={<PdfToWord />} />
          <Route path="tools/word-to-pdf" element={<WordToPdf />} />
          <Route path="tools/merge-pdf" element={<MergePdf />} />
          <Route path="tools/compress-pdf" element={<CompressPdf />} />
          <Route path="tools/split-pdf" element={<SplitPdf />} />

          {/* New PDF Tools */}
          <Route path="tools/pdf-watermark" element={<PdfWatermark />} />
          <Route path="tools/rotate-pdf" element={<RotatePdf />} />
          <Route path="tools/ocr-pdf" element={<OcrPdf />} />
          <Route path="tools/esign-pdf" element={<EsignPdf />} />

          {/* Image Tools */}
          <Route path="tools/image-converter" element={<ImageConverter />} />
          <Route path="tools/image-compressor" element={<ImageCompressor />} />
          <Route path="tools/background-remover" element={<BackgroundRemover />} />
          <Route path="tools/image-resizer" element={<ImageResizer />} />
          <Route path="tools/meme-generator" element={<MemeGenerator />} />
          <Route path="tools/ai-image-upscaler" element={<AiImageUpscaler />} />
          <Route path="tools/png-to-jpg" element={<PngToJpg />} />
          <Route path="tools/jpg-to-png" element={<JpgToPng />} />
          <Route path="tools/webp-converter" element={<WebpConverter />} />

          {/* Generator Tools */}
          <Route path="tools/qr-code-generator" element={<QrCodeGenerator />} />
          <Route path="tools/url-shortener" element={<UrlShortener />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />

          {/* Original Developer Tools */}
          <Route path="tools/json-formatter" element={<JsonFormatter />} />
          <Route path="tools/base64" element={<Base64Tool />} />
          <Route path="tools/regex-tester" element={<RegexTester />} />
          <Route path="tools/code-diff" element={<CodeDiff />} />

          {/* New Developer Tools */}
          <Route path="tools/jwt-decoder" element={<JwtDecoder />} />
          <Route path="tools/sql-formatter" element={<SqlFormatter />} />
          <Route path="tools/html-minifier" element={<HtmlMinifier />} />
          <Route path="tools/css-minifier" element={<CssMinifier />} />
          <Route path="tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="tools/markdown-previewer" element={<MarkdownPreviewer />} />

          {/* Text Tools */}
          <Route path="tools/word-counter" element={<WordCounter />} />
          <Route path="tools/case-converter" element={<CaseConverter />} />
          <Route path="tools/lorem-ipsum" element={<LoremIpsum />} />

          {/* AI Tools */}
          <Route path="tools/ai-paraphraser" element={<AiParaphraser />} />
          <Route path="tools/ai-grammar-fixer" element={<AiGrammarFixer />} />
          <Route path="tools/ai-summarizer" element={<AiSummarizer />} />
          <Route path="tools/ai-title-generator" element={<AiTitleGenerator />} />
          <Route path="tools/ai-email-writer" element={<AiEmailWriter />} />

          {/* Viral Tools */}
          <Route path="tools/invoice-generator" element={<InvoiceGenerator />} />
          <Route path="tools/resume-builder" element={<ResumeBuilder />} />
          <Route path="tools/bio-link-generator" element={<BioLinkGenerator />} />
          <Route path="tools/typing-speed-test" element={<TypingSpeedTest />} />

          {/* Calculators */}
          <Route path="tools/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="tools/age-calculator" element={<AgeCalculator />} />
          <Route path="tools/bmi-calculator" element={<BmiCalculator />} />
          <Route path="tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="tools/discount-calculator" element={<DiscountCalculator />} />
          <Route path="tools/unit-converter" element={<UnitConverter />} />

          {/* More Developer Tools */}
          <Route path="tools/hash-generator" element={<HashGenerator />} />
          <Route path="tools/timestamp-converter" element={<TimestampConverter />} />
          <Route path="tools/url-encoder" element={<UrlEncoder />} />
          <Route path="tools/csv-to-json" element={<CsvToJson />} />
          <Route path="tools/color-converter" element={<ColorConverter />} />
          <Route path="tools/number-base-converter" element={<NumberBaseConverter />} />

          {/* More Image Tools */}
          <Route path="tools/image-to-pdf" element={<ImageToPdf />} />
          <Route path="tools/image-cropper" element={<ImageCropper />} />

          {/* More Text Tools */}
          <Route path="tools/text-cleaner" element={<TextCleaner />} />
          <Route path="tools/slug-generator" element={<SlugGenerator />} />

          {/* Newest additions */}
          <Route path="tools/tip-calculator" element={<TipCalculator />} />
          <Route path="tools/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="tools/date-duration-calculator" element={<DateDurationCalculator />} />
          <Route path="tools/css-gradient-generator" element={<CssGradientGenerator />} />
          <Route path="tools/box-shadow-generator" element={<BoxShadowGenerator />} />
          <Route path="tools/find-and-replace" element={<FindAndReplace />} />
          <Route path="tools/remove-duplicate-lines" element={<RemoveDuplicateLines />} />
          <Route path="tools/sort-text-lines" element={<SortTextLines />} />
          <Route path="tools/background-changer" element={<BackgroundChanger />} />

          {/* Static pages */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<Terms />} />
          <Route path="advertise" element={<Advertise />} />

          {/* Advertiser accounts (client-only, noindex) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />

          {/* Blog */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />

          {/* Programmatic SEO pages disabled for AdSense review.
              <Route path=":slug" element={<ProgrammaticPage />} /> */}

          {/* Unknown paths → home (must be last) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
