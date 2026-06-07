import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
// Programmatic SEO landing pages are disabled for now — they were flagged by
// AdSense as low-value/doorway content. Re-enable by restoring the import and
// the catch-all route below (and re-adding their URLs to public/sitemap.xml).
// import ProgrammaticPage from './pages/ProgrammaticPage'
import Privacy from './pages/Privacy'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Advertise from './pages/Advertise'

// Original tools
import PdfToWord from './pages/tools/PdfToWord'
import WordToPdf from './pages/tools/WordToPdf'
import MergePdf from './pages/tools/MergePdf'
import CompressPdf from './pages/tools/CompressPdf'
import SplitPdf from './pages/tools/SplitPdf'
import ImageConverter from './pages/tools/ImageConverter'
import ImageCompressor from './pages/tools/ImageCompressor'
import BackgroundRemover from './pages/tools/BackgroundRemover'
import ImageResizer from './pages/tools/ImageResizer'
import QrCodeGenerator from './pages/tools/QrCodeGenerator'
import UrlShortener from './pages/tools/UrlShortener'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import JsonFormatter from './pages/tools/JsonFormatter'
import Base64Tool from './pages/tools/Base64Tool'
import RegexTester from './pages/tools/RegexTester'
import CodeDiff from './pages/tools/CodeDiff'
import WordCounter from './pages/tools/WordCounter'
import CaseConverter from './pages/tools/CaseConverter'
import LoremIpsum from './pages/tools/LoremIpsum'
import TempEmail from './pages/tools/TempEmail'

// AI Tools
import AiHumanizer from './pages/tools/AiHumanizer'
import AiParaphraser from './pages/tools/AiParaphraser'
import AiGrammarFixer from './pages/tools/AiGrammarFixer'
import AiSummarizer from './pages/tools/AiSummarizer'
import AiTitleGenerator from './pages/tools/AiTitleGenerator'
import AiEmailWriter from './pages/tools/AiEmailWriter'

// New PDF Tools
import PdfUnlocker from './pages/tools/PdfUnlocker'
import PdfWatermark from './pages/tools/PdfWatermark'
import RotatePdf from './pages/tools/RotatePdf'
import OcrPdf from './pages/tools/OcrPdf'
import EsignPdf from './pages/tools/EsignPdf'

// New Image Tools
import MemeGenerator from './pages/tools/MemeGenerator'
import AiImageUpscaler from './pages/tools/AiImageUpscaler'
import PngToJpg from './pages/tools/PngToJpg'
import JpgToPng from './pages/tools/JpgToPng'
import WebpConverter from './pages/tools/WebpConverter'

// New Developer Tools
import JwtDecoder from './pages/tools/JwtDecoder'
import SqlFormatter from './pages/tools/SqlFormatter'
import HtmlMinifier from './pages/tools/HtmlMinifier'
import CssMinifier from './pages/tools/CssMinifier'
import UuidGenerator from './pages/tools/UuidGenerator'
import MarkdownPreviewer from './pages/tools/MarkdownPreviewer'

// Viral Tools
import FakeChatGenerator from './pages/tools/FakeChatGenerator'
import InvoiceGenerator from './pages/tools/InvoiceGenerator'
import ResumeBuilder from './pages/tools/ResumeBuilder'
import BioLinkGenerator from './pages/tools/BioLinkGenerator'
import TypingSpeedTest from './pages/tools/TypingSpeedTest'

// Calculators
import PercentageCalculator from './pages/tools/PercentageCalculator'
import AgeCalculator from './pages/tools/AgeCalculator'
import BmiCalculator from './pages/tools/BmiCalculator'
import LoanCalculator from './pages/tools/LoanCalculator'
import DiscountCalculator from './pages/tools/DiscountCalculator'
import UnitConverter from './pages/tools/UnitConverter'

// More Developer Tools
import HashGenerator from './pages/tools/HashGenerator'
import TimestampConverter from './pages/tools/TimestampConverter'
import UrlEncoder from './pages/tools/UrlEncoder'
import CsvToJson from './pages/tools/CsvToJson'
import ColorConverter from './pages/tools/ColorConverter'
import NumberBaseConverter from './pages/tools/NumberBaseConverter'

// More Image Tools
import ImageToPdf from './pages/tools/ImageToPdf'
import ImageCropper from './pages/tools/ImageCropper'

// More Text Tools
import TextCleaner from './pages/tools/TextCleaner'
import SlugGenerator from './pages/tools/SlugGenerator'

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
          <Route path="tools/pdf-unlocker" element={<PdfUnlocker />} />
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
          <Route path="tools/temp-email" element={<TempEmail />} />

          {/* AI Tools */}
          <Route path="tools/ai-humanizer" element={<AiHumanizer />} />
          <Route path="tools/ai-paraphraser" element={<AiParaphraser />} />
          <Route path="tools/ai-grammar-fixer" element={<AiGrammarFixer />} />
          <Route path="tools/ai-summarizer" element={<AiSummarizer />} />
          <Route path="tools/ai-title-generator" element={<AiTitleGenerator />} />
          <Route path="tools/ai-email-writer" element={<AiEmailWriter />} />

          {/* Viral Tools */}
          <Route path="tools/fake-chat-generator" element={<FakeChatGenerator />} />
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

          {/* Static pages */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="advertise" element={<Advertise />} />

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
