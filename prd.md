# UtilKit — Product Requirements Document

**Version:** 1.0  
**Date:** May 2026  
**Status:** Draft  
**Owner:** Product Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Target Users](#4-target-users)
5. [Product Scope](#5-product-scope)
6. [Feature Specifications](#6-feature-specifications)
   - 6.1 PDF Tools
   - 6.2 Image Tools
   - 6.3 Generator Tools
   - 6.4 Developer Tools
   - 6.5 Text Tools
7. [Technical Requirements](#7-technical-requirements)
8. [UX & Design Requirements](#8-ux--design-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Monetisation Strategy](#10-monetisation-strategy)
11. [Go-to-Market Plan](#11-go-to-market-plan)
12. [Risks & Mitigations](#12-risks--mitigations)
13. [Timeline & Milestones](#13-timeline--milestones)
14. [Out of Scope](#14-out-of-scope)
15. [Open Questions](#15-open-questions)
16. [Appendix — Tool Inventory](#16-appendix--tool-inventory)

---

## 1. Executive Summary

**UtilKit** is a free, browser-based utility website that bundles 20 of the most-searched-for online tools under a single domain. It serves students, professionals, developers, and content creators who currently bounce between dozens of fragmented websites to complete everyday digital tasks.

All tools run client-side (in the user's browser) where possible, ensuring fast performance, zero sign-up friction, and strong privacy guarantees. The platform is designed to generate sustainable traffic through SEO — each tool lives on its own indexable page with high search intent — and to convert free users into paid subscribers through a freemium tier system.

---

## 2. Problem Statement

### 2.1 User Pain Points

- Users performing common tasks (convert a PDF, generate a QR code, format JSON) must navigate to multiple different websites, each with their own ads, sign-up walls, and inconsistent UX.
- Existing multi-tool platforms (SmallPDF, ILovePDF) are either paywalled, slow, or focused on a single category.
- Privacy-conscious users distrust uploading sensitive files to unknown third-party servers.
- Mobile users are poorly served — most utility tools are desktop-first.

### 2.2 Market Opportunity

Online utility tools are among the highest-traffic, highest-intent web categories. Searches like "PDF to Word online", "QR code generator", "password generator", and "JSON formatter" each receive millions of monthly searches globally. The combination of strong SEO, no-login access, and a multi-tool ecosystem creates a compounding traffic loop where one tool brings in users who discover and return for others.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals

| Goal | Description |
|------|-------------|
| Traffic Growth | Reach 100,000 monthly active users within 12 months of launch |
| SEO Ranking | Rank in the top 10 for at least 15 of the 20 tool-specific keywords within 6 months |
| Retention | Achieve a 30-day return rate of ≥ 25% |
| Revenue | Generate first paid subscriptions within 3 months of launch |

### 3.2 Key Performance Indicators (KPIs)

| Metric | Target (Month 6) | Target (Month 12) |
|--------|-----------------|-------------------|
| Monthly Unique Visitors | 40,000 | 100,000 |
| Tools Used Per Session | ≥ 1.8 | ≥ 2.2 |
| Bounce Rate | < 55% | < 45% |
| Page Load Time (LCP) | < 2.0s | < 1.5s |
| Free → Pro Conversion | 1.5% | 3% |
| Organic Search Share | 60% | 75% |

---

## 4. Target Users

### 4.1 Primary Personas

**Persona 1 — The Student**
- Age: 18–26
- Needs: Convert assignment docs to PDF, count words, generate citations, create QR codes for projects
- Behaviour: High frequency, low tolerance for paywalls, uses mobile and desktop equally
- Pain point: Gets blocked by daily limits on competing tools

**Persona 2 — The Office Professional**
- Age: 28–45
- Needs: Merge PDFs for reports, compress images for email, convert Word documents
- Behaviour: Repeating the same 3–5 tasks weekly, values reliability and speed
- Pain point: Corporate IT blocks installing desktop software; relies on browser tools

**Persona 3 — The Developer**
- Age: 22–40
- Needs: JSON formatting, Base64 encoding, Regex testing, code diff checking
- Behaviour: High trust in clean, ad-free tools; likely to share on developer communities
- Pain point: Scattered bookmarks across many single-purpose tools

**Persona 4 — The Content Creator / Freelancer**
- Age: 24–38
- Needs: Background removal, image resizing, QR codes for portfolios, URL shortening
- Behaviour: Needs fast results while on deadline; values download without watermarks
- Pain point: Creative tools are expensive; free tiers are severely limited

### 4.2 Secondary Audience

- Small business owners managing their own digital presence
- Educators preparing materials for students
- NGO / non-profit workers with no software budget

---

## 5. Product Scope

### 5.1 In Scope — v1.0

- 20 fully functional browser-based utility tools across 5 categories
- Responsive web app (desktop + mobile)
- Tool search/filter
- Individual SEO-optimised page per tool
- Client-side processing for privacy (no file uploads to server where possible)
- Dark-mode-first UI
- Basic freemium tier (free with limits, Pro without limits)

### 5.2 Tool Categories

| # | Category | Tools Included |
|---|----------|---------------|
| 1 | PDF Tools | PDF→Word, Word→PDF, Merge PDF, Compress PDF, Split PDF |
| 2 | Image Tools | Image Converter, Image Compressor, Background Remover, Image Resizer |
| 3 | Generator Tools | QR Code Generator, URL Shortener, Password Generator |
| 4 | Developer Tools | JSON Formatter, Base64 Encoder/Decoder, Regex Tester, Code Diff Checker |
| 5 | Text Tools | Word Counter, Case Converter, Lorem Ipsum Generator, Temp Email |

---

## 6. Feature Specifications

---

### 6.1 PDF Tools

#### 6.1.1 PDF → Word Converter

**Description:** Converts an uploaded PDF document into editable text/Word format.

**User Story:** As a student, I want to convert a PDF textbook chapter into editable text so I can annotate and modify it.

**Functional Requirements:**
- Accept PDF file upload (drag & drop + file picker)
- Extract text content preserving paragraph structure
- Output as downloadable `.txt` or `.docx` file
- Free tier: up to 5 MB files; Pro tier: up to 100 MB
- Display extraction preview before download
- Show page count and word count of extracted content

**Constraints:**
- Scanned/image PDFs require OCR (Phase 2 feature using Tesseract.js)
- Password-protected PDFs: prompt user to unlock first

**Acceptance Criteria:**
- Text from a standard PDF is extracted with ≥ 90% formatting accuracy
- File downloads within 5 seconds for files under 5 MB
- Error message is shown for unsupported formats

---

#### 6.1.2 Word → PDF Converter

**Description:** Converts typed text or an uploaded `.docx` file into a downloadable PDF.

**User Story:** As a professional, I want to convert my Word proposal to PDF before sending it to a client.

**Functional Requirements:**
- Text editor input mode (type/paste content)
- File upload mode for `.docx`, `.txt`, `.odt`
- Output formatting: page margins, font size, line spacing controls
- Print-to-PDF browser bridge for client-side conversion
- Server-side conversion via LibreOffice for `.docx` uploads (Phase 2)
- Free tier: up to 10 pages; Pro: unlimited

**Acceptance Criteria:**
- PDF output preserves headings, bold, italic, paragraph structure
- Document renders correctly in Adobe Reader and macOS Preview

---

#### 6.1.3 Merge PDF

**Description:** Combines multiple PDF files into a single document.

**User Story:** As a job applicant, I want to merge my CV, cover letter, and portfolio into one PDF for submission.

**Functional Requirements:**
- Upload 2–20 PDF files
- Drag-to-reorder list before merging
- Show per-file page count and file size
- Output single merged PDF
- Free tier: up to 3 files, 10 MB total; Pro: up to 50 files, 500 MB total
- Processing via `pdf-lib` (client-side)

**Acceptance Criteria:**
- Merged PDF opens without errors
- Page order matches the upload order shown in the UI
- Metadata (title) of merged file is editable before download

---

#### 6.1.4 Compress PDF

**Description:** Reduces the file size of a PDF while maintaining acceptable visual quality.

**User Story:** As an office worker, I want to compress a scanned PDF from 8 MB to under 2 MB to email it.

**Functional Requirements:**
- Upload single PDF file
- Compression quality slider: Low / Medium / High
- Show estimated output file size before compressing
- Display before/after file size comparison after processing
- Client-side compression via canvas re-rendering for image-heavy PDFs
- Free tier: up to 10 MB input; Pro: up to 200 MB

**Acceptance Criteria:**
- "Medium" setting achieves ≥ 40% file size reduction on a typical scanned PDF
- Output file opens and is readable in standard PDF viewers

---

#### 6.1.5 Split PDF

**Description:** Extracts a range of pages from a PDF into a new file.

**User Story:** As a researcher, I want to extract pages 12–18 from a 90-page report.

**Functional Requirements:**
- Upload single PDF
- Page range input: individual pages (e.g. "1,3,5") and ranges (e.g. "2-7")
- Visual thumbnail preview of pages (Phase 2)
- Output as single PDF with selected pages
- Free tier: up to 20-page source; Pro: unlimited

**Acceptance Criteria:**
- Output PDF contains exactly the specified pages in order
- Invalid page ranges show a clear validation error

---

### 6.2 Image Tools

#### 6.2.1 Image Converter

**Description:** Converts images between common formats: JPG, PNG, WebP, HEIC, GIF.

**User Story:** As a web developer, I want to convert product photos from PNG to WebP to reduce page load times.

**Functional Requirements:**
- Upload single or batch images (up to 10 in Pro)
- Format selection: JPG, PNG, WebP, GIF
- Quality slider for lossy formats (JPG, WebP)
- Client-side conversion via HTML5 Canvas API
- Bulk download as ZIP for batch conversions
- Free tier: 1 file at a time; Pro: batch of up to 20

**Acceptance Criteria:**
- Converted file opens correctly in standard image viewers
- WebP output is ≥ 30% smaller than equivalent JPG at same perceptual quality
- EXIF metadata preserved option in Pro tier

---

#### 6.2.2 Image Compressor

**Description:** Reduces image file size while preserving visual quality.

**User Story:** As a blogger, I want to compress my photos before uploading to reduce my site's load time.

**Functional Requirements:**
- Upload JPG or PNG
- Quality slider (10–100%)
- Real-time preview side-by-side (Pro)
- Display original vs. compressed file size and percentage reduction
- Download compressed image
- Free tier: 1 image, max 5 MB; Pro: batch + max 50 MB per file

**Acceptance Criteria:**
- At quality 70%, output file is at least 40% smaller than input
- No visible artefacts at quality ≥ 75% on standard photographic images

---

#### 6.2.3 Background Remover

**Description:** Removes the background from a product or portrait photo using AI.

**User Story:** As a freelancer, I want to remove the background from a product photo for an e-commerce listing.

**Functional Requirements:**
- Upload JPG or PNG (max 5 MB free, 25 MB Pro)
- AI background removal via `remove.bg` API or equivalent
- Output as PNG with transparent background
- One-click background colour replacement (white, custom hex)
- Free tier: 3 removals/day with watermark; Pro: unlimited, no watermark

**Technical Note:** Requires server-side API call. API key management and rate limiting required.

**Acceptance Criteria:**
- Clean edge detection on portraits with plain backgrounds (≥ 90% accuracy)
- Output PNG has transparent pixels where background was removed
- Processing completes in ≤ 8 seconds for a 3 MB image

---

#### 6.2.4 Image Resizer

**Description:** Resizes an image to exact or proportional dimensions.

**User Story:** As a social media manager, I want to resize a photo to 1080×1080 px for Instagram.

**Functional Requirements:**
- Upload image (JPG, PNG, WebP, GIF)
- Custom width and height input
- Maintain aspect ratio toggle
- Preset sizes: Social media templates (1080×1080, 1200×630, 1280×720, etc.)
- Client-side resizing via Canvas
- Download resized image

**Acceptance Criteria:**
- Output image matches specified dimensions exactly
- Aspect-ratio lock prevents distortion when enabled
- Preset templates produce correct dimensions

---

### 6.3 Generator Tools

#### 6.3.1 QR Code Generator

**Description:** Generates a scannable QR code from any URL, text, email, phone number, or Wi-Fi credentials.

**User Story:** As a restaurant owner, I want to generate a QR code for my menu URL to print on tables.

**Functional Requirements:**
- Input types: URL, plain text, email, phone, Wi-Fi (SSID + password), vCard
- Customisation (Pro): foreground/background colour, logo overlay, rounded corners
- Output formats: PNG (default), SVG (Pro)
- Download button with size options: 200px, 400px, 800px
- QR code generated client-side via `qrcode.js` library
- Free tier: basic black-and-white QR; Pro: full customisation

**Acceptance Criteria:**
- Generated QR code is scannable by iOS and Android camera apps
- URL QR code redirects to the correct destination
- Custom-colour QR codes maintain sufficient contrast for reliable scanning

---

#### 6.3.2 URL Shortener

**Description:** Creates a short, shareable link from a long URL.

**User Story:** As a marketer, I want to shorten a tracking URL to share on Twitter without exceeding the character limit.

**Functional Requirements:**
- Input: long URL with validation
- Output: short URL with copy button
- Click analytics dashboard per link (Pro): total clicks, geographic breakdown, device type
- Custom slug option (Pro): e.g. `utl.ly/my-campaign`
- Expiry date setting (Pro)
- QR code generation for the short link (one-click)
- Requires backend: URL mapping stored in database

**Acceptance Criteria:**
- Short URL redirects to original URL with ≤ 200ms latency
- Duplicate long URLs return the same short link
- Invalid URLs show inline validation error

---

#### 6.3.3 Password Generator

**Description:** Generates cryptographically strong, customisable passwords.

**User Story:** As a user setting up a new account, I want to generate a 20-character password with symbols.

**Functional Requirements:**
- Length slider: 6–128 characters
- Character set toggles: uppercase, lowercase, numbers, symbols
- Exclude ambiguous characters option (0, O, l, 1)
- Bulk generation: up to 10 passwords at once (Pro)
- Password strength indicator (Weak / Medium / Strong / Very Strong)
- Entropy display in bits (Pro)
- All generation happens client-side — never sent to server

**Acceptance Criteria:**
- Generated password always includes at least one character from each selected set
- Strength indicator accurately reflects entropy (≥ 70 bits = Strong)
- Copy-to-clipboard works on mobile browsers

---

### 6.4 Developer Tools

#### 6.4.1 JSON Formatter / Validator

**Description:** Prettifies, minifies, and validates JSON data.

**User Story:** As a backend developer, I want to format a minified API response to debug it quickly.

**Functional Requirements:**
- Paste or type JSON into input editor
- Actions: Prettify (with configurable indentation: 2/4 spaces or tab), Minify, Validate
- Inline error highlighting with line number for invalid JSON
- Syntax highlighting in output (colour-coded keys, strings, numbers, booleans)
- Key sorting option (alphabetical)
- JSON ↔ JavaScript Object conversion toggle (Pro)
- Copy output with one click
- File upload support (.json)

**Acceptance Criteria:**
- Prettified output matches JSON.stringify(JSON.parse(input), null, 2) standard
- Invalid JSON shows error message with character position
- Tool handles JSON payloads up to 5 MB without browser lag

---

#### 6.4.2 Base64 Encoder / Decoder

**Description:** Encodes plain text or files to Base64 and decodes Base64 back to original content.

**User Story:** As a developer, I want to encode an image to Base64 to embed it directly in a CSS file.

**Functional Requirements:**
- Mode toggle: Encode / Decode
- Text input/output with copy button
- File upload for encoding (output is Base64 string)
- URL-safe Base64 option
- Decode outputs download link if content is a binary file
- All processing client-side

**Acceptance Criteria:**
- Encoded output exactly matches `btoa()` standard Base64
- Decoding a previously encoded string returns the original input
- Invalid Base64 on decode shows a clear error

---

#### 6.4.3 Regex Tester

**Description:** Tests regular expressions against a string with live match highlighting.

**User Story:** As a developer, I want to test a regex pattern for validating email addresses before adding it to my codebase.

**Functional Requirements:**
- Pattern input with flags: g, i, m, s, u
- Test string textarea
- Real-time match highlighting (coloured overlays on matched substrings)
- Match list: show each match with index and capture groups
- Regex cheat sheet panel (toggle)
- Common preset patterns: email, URL, phone, date, IP address
- Share pattern via URL (encode pattern + flags + test string in query params)

**Acceptance Criteria:**
- Highlights update in real time as user types (debounced at 100ms)
- Invalid regex shows error message (no crash)
- Capture groups are displayed in the match list

---

#### 6.4.4 Code Diff Checker

**Description:** Shows line-by-line differences between two code blocks or text documents.

**User Story:** As a developer doing code review, I want to compare two versions of a function to see what changed.

**Functional Requirements:**
- Two text editor panels (Original / Modified)
- Diff view: added lines highlighted green, removed lines highlighted red, unchanged lines neutral
- Line number display
- Unified vs. split view toggle
- Number of changes summary (X lines added, Y lines removed)
- Download diff as `.patch` file (Pro)
- Syntax highlighting for common languages: JS, Python, JSON, HTML, CSS (Pro)
- File upload for both panels (.txt, .js, .py, .json, etc.)

**Acceptance Criteria:**
- Diff output matches standard unified diff algorithm
- Changes are highlighted correctly for 100-line files within 200ms
- Empty inputs show "No differences" state clearly

---

### 6.5 Text Tools

#### 6.5.1 Word & Character Counter

**Description:** Analyses pasted text and provides detailed writing statistics.

**User Story:** As a student, I want to check if my essay is within the 2,000-word limit before submitting.

**Functional Requirements:**
- Real-time counting as user types
- Metrics: word count, character count (with and without spaces), sentence count, paragraph count, estimated reading time, estimated speaking time
- Keyword density analysis (top 10 most-used words, excluding stop words) — Pro
- Target word count input with progress bar
- Export stats as CSV (Pro)

**Acceptance Criteria:**
- Word count matches MS Word's count for the same text (±1 word tolerance)
- Reading time estimate is based on 200 words per minute (standard)
- Counter updates within 50ms of typing

---

#### 6.5.2 Case Converter

**Description:** Converts text between multiple case formats instantly.

**User Story:** As a developer, I want to convert a paragraph of text to snake_case for use as variable names.

**Functional Requirements:**
- Input textarea
- One-click conversion to all formats simultaneously displayed in cards:
  - UPPERCASE
  - lowercase
  - Title Case
  - Sentence case
  - camelCase
  - PascalCase
  - snake_case
  - kebab-case
  - CONSTANT_CASE
- Copy button on each output card
- Apply conversion (replace input with converted text)

**Acceptance Criteria:**
- camelCase correctly handles multi-word inputs with special characters stripped
- Sentence case capitalises only the first letter of each sentence
- All 9 variants are visible simultaneously without scrolling on desktop

---

#### 6.5.3 Lorem Ipsum Generator

**Description:** Generates placeholder text in configurable amounts for design and development mockups.

**User Story:** As a UI designer, I want to generate 3 paragraphs of placeholder text to fill a mockup layout.

**Functional Requirements:**
- Generate by: paragraphs, sentences, or words
- Count input (1–50)
- Start with "Lorem ipsum..." toggle (classic) or fully random Latin words
- HTML output option: wrap paragraphs in `<p>` tags
- Copy all output with single click
- Markdown output option (Pro)

**Acceptance Criteria:**
- Output length matches the requested count ±5%
- HTML mode produces valid, well-formed paragraph tags
- Tool works without any network request (fully offline)

---

#### 6.5.4 Temporary Email

**Description:** Generates a disposable email address for one-time signups and OTP verification.

**User Story:** As a privacy-conscious user, I want a temporary email address to sign up for a service without exposing my real inbox.

**Functional Requirements:**
- Auto-generate a random email address on page load
- "Refresh" button to generate a new address
- Copy email to clipboard
- Live inbox that polls for incoming messages every 10 seconds
- View email content (sender, subject, body, timestamp)
- Email expires after 30 minutes (with countdown timer)
- Extend expiry by 15 minutes (button)
- Pro: custom username, 24-hour expiry, multiple simultaneous inboxes

**Technical Note:** Requires backend integration with a transactional email receiving service (Mailinator API, Guerrilla Mail API, or custom SMTP receiver).

**Acceptance Criteria:**
- Inbox receives emails from real senders within 15 seconds of delivery
- Email is deleted automatically after expiry
- At least 3 different domain options available for address generation

---

## 7. Technical Requirements

### 7.1 Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                   Browser (Client)                   │
│  React SPA  ·  Tool Components  ·  Canvas/WebASM     │
└──────────────────────┬──────────────────────────────┘
                       │  API calls (select tools only)
┌──────────────────────▼──────────────────────────────┐
│               Backend API (Node.js / FastAPI)         │
│  URL Shortener  ·  Temp Mail  ·  BG Removal proxy    │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│               Infrastructure                         │
│  Vercel / Cloudflare Pages  ·  Supabase  ·  Redis    │
└─────────────────────────────────────────────────────┘
```

### 7.2 Frontend Stack

| Concern | Technology |
|---------|------------|
| Framework | React 18 + Vite |
| Routing | React Router v6 (one route per tool) |
| Styling | Tailwind CSS + CSS Variables |
| PDF processing | pdf-lib, pdfjs-dist |
| Image processing | HTML5 Canvas API |
| QR generation | qrcode.js |
| Code diff | diff library (jsdiff) |
| Syntax highlight | highlight.js |
| Animations | Framer Motion |

### 7.3 Backend Stack (for server-dependent tools)

| Concern | Technology |
|---------|------------|
| Runtime | Node.js 20 + Express or Python FastAPI |
| Database | Supabase (PostgreSQL) |
| Cache | Redis (URL shortener lookups) |
| File storage | Cloudflare R2 (temporary, auto-deleted after 1hr) |
| Auth | Supabase Auth (email/social OAuth) |
| Email receiving | Custom SMTP server or Mailinator API |
| BG removal | remove.bg API |

### 7.4 Client-Side vs. Server-Side Processing

| Tool | Processing | Reason |
|------|-----------|--------|
| PDF→Word | Client (pdfjs) | Privacy; no server upload needed |
| Word→PDF | Client (print API) | Works entirely in browser |
| Merge PDF | Client (pdf-lib) | Privacy |
| Compress PDF | Client (canvas) | Privacy |
| Split PDF | Client (pdf-lib) | Privacy |
| Image Converter | Client (canvas) | Instant, no upload |
| Image Compressor | Client (canvas) | Instant, no upload |
| Background Remover | Server (remove.bg API) | Requires ML model |
| Image Resizer | Client (canvas) | Instant |
| QR Code Generator | Client (qrcode.js) | No server needed |
| URL Shortener | Server (DB required) | Needs persistent storage |
| Password Generator | Client | Must never touch server |
| JSON Formatter | Client | No server needed |
| Base64 | Client | No server needed |
| Regex Tester | Client | No server needed |
| Code Diff | Client (jsdiff) | No server needed |
| Word Counter | Client | No server needed |
| Case Converter | Client | No server needed |
| Lorem Ipsum | Client | No server needed |
| Temp Email | Server (SMTP receiver) | Requires real inbox |

### 7.5 SEO Requirements

- Each tool has a unique URL: `/tools/pdf-to-word`, `/tools/qr-code-generator`, etc.
- Each tool page has a unique `<title>`, `<meta description>`, and Open Graph tags
- Structured data (JSON-LD) for WebApplication schema per tool
- Sitemap.xml auto-generated listing all tool pages
- Core Web Vitals targets: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 8. UX & Design Requirements

### 8.1 Design Principles

- **Speed first:** Tools should be usable within 2 seconds of landing on any page
- **No friction:** Zero sign-up required for free tier tools
- **Privacy visible:** Show "Processed in your browser — files never leave your device" badge on client-side tools
- **Mobile ready:** All tools fully functional on screens ≥ 375px wide

### 8.2 Navigation

- Persistent left sidebar on desktop listing all tools grouped by category
- Collapsible bottom tab bar on mobile (Home, Search, Categories, Account)
- Global search bar that fuzzy-searches tool names and descriptions
- Breadcrumb navigation within tool pages

### 8.3 Layout

- Tool page layout: header (tool name + description) → input area → action button(s) → output area
- Home page: hero section + category grids of tool cards
- Each tool card shows: icon, name, one-line description

### 8.4 Accessibility

- WCAG 2.1 AA compliance
- All interactive elements keyboard navigable
- Colour contrast ratio ≥ 4.5:1 for text
- Focus indicators visible on all inputs
- Screen reader labels on all icon buttons
- File upload areas keyboard and screen-reader accessible

### 8.5 Theme

- Dark mode as default
- Light mode toggle (persisted in localStorage)
- System preference respected on first visit

---

## 9. Non-Functional Requirements

### 9.1 Performance

| Requirement | Target |
|-------------|--------|
| Initial page load (FCP) | < 1.5 seconds |
| Client-side tool processing (< 5MB file) | < 3 seconds |
| QR code generation | < 500ms |
| JSON formatting (< 1MB) | < 200ms |
| API response time (URL shortener) | < 300ms p95 |

### 9.2 Reliability

- 99.9% uptime SLA for client-side tools (hosted via CDN)
- 99.5% uptime SLA for backend-dependent tools
- Graceful degradation: if BG removal API is down, show clear error with retry option

### 9.3 Security

- All file uploads scanned for malware before server-side processing
- No user files stored beyond 1 hour on the server
- Rate limiting on all API endpoints (100 req/min per IP)
- HTTPS enforced; HSTS enabled
- Password generator uses `crypto.getRandomValues()` — never `Math.random()`
- CSP headers configured to prevent XSS

### 9.4 Privacy

- Client-side tools: zero data collection; files never leave the browser
- Server-side tools: files deleted from storage within 60 minutes
- GDPR-compliant: cookie consent banner, privacy policy, right to erasure
- No third-party tracking scripts on free tools (ads: self-serve only)

### 9.5 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 100+ |
| Firefox | 100+ |
| Safari | 15+ |
| Edge | 100+ |
| Mobile Chrome (Android) | 100+ |
| Mobile Safari (iOS) | 15+ |

---

## 10. Monetisation Strategy

### 10.1 Tier Structure

| Feature | Free | Pro ($5/mo) | Team ($15/mo) |
|---------|------|-------------|---------------|
| All 20 tools | ✅ | ✅ | ✅ |
| File size limit | 5–10 MB | 100 MB | 500 MB |
| Daily usage cap | 5 uses/tool | Unlimited | Unlimited |
| Batch processing | ❌ | ✅ (up to 20) | ✅ (up to 100) |
| No watermarks (BG remove) | ❌ | ✅ | ✅ |
| Custom QR colours & logo | ❌ | ✅ | ✅ |
| URL analytics dashboard | ❌ | ✅ | ✅ |
| Custom short URL slug | ❌ | ✅ | ✅ |
| API access | ❌ | ❌ | ✅ |
| Priority support | ❌ | Email | Live chat |
| Team seats | 1 | 1 | Up to 5 |

### 10.2 Additional Revenue Streams

- **Display advertising** (free tier only): Non-intrusive banner ads via Google AdSense. No ads on Pro/Team.
- **Affiliate links**: Relevant software recommendations (e.g. Adobe Acrobat for power users) with disclosed affiliate relationship.
- **API access** (Team tier): Developers can call UtilKit tools via REST API for workflow automation.

---

## 11. Go-to-Market Plan

### 11.1 Pre-Launch (Weeks 1–4)

- Build landing page with email waitlist
- Create tool-specific content pages (SEO groundwork)
- Submit to Product Hunt, Hacker News, Reddit (r/webdev, r/productivity)
- Reach out to tech bloggers and tool directories (AlternativeTo, G2, Capterra)

### 11.2 Launch (Week 5)

- Product Hunt launch
- Twitter/X announcement thread with tool demos (GIFs)
- Dev.to and Hashnode blog post: "I built 20 free utility tools in one place"
- Post in relevant communities: r/selfhosted, r/productivity, r/webdev

### 11.3 Post-Launch Growth (Months 2–6)

- SEO content: "How to convert PDF to Word for free" x20 blog posts
- YouTube tutorial shorts (60s each) for each tool
- Build backlinks via tool directories and guest posts
- Implement referral program: share a tool → earn 1 free Pro week per signup

---

## 12. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| remove.bg API rate limits or price increase | Medium | Medium | Build fallback to open-source `u2net` model on server |
| Google algorithm update deprioritises utility tools | Medium | High | Diversify traffic via social, direct, and referral; build email list early |
| Competitor launches similar all-in-one tool | Medium | Medium | Differentiate on privacy, speed, and developer tools category |
| Client-side PDF processing quality limitations | High | Medium | Clearly communicate limitations; offer server-side Pro option for complex documents |
| Browser storage/memory limits on large files | Medium | Medium | Enforce file size limits; show clear error with upgrade prompt |
| Temp email service abuse (spam campaigns) | Medium | High | Rate limit by IP; require CAPTCHA for email generation; monitor outbound spam |
| GDPR compliance complexity in EU markets | Low | High | Engage legal counsel; implement comprehensive cookie consent and data deletion flows |

---

## 13. Timeline & Milestones

| Milestone | Target Date | Deliverables |
|-----------|------------|-------------|
| M1: Design & Architecture | Week 2 | Figma designs, tech stack finalised, repo setup |
| M2: Core Tools MVP | Week 5 | 10 client-side tools live (PDF, Image, Generators) |
| M3: Developer & Text Tools | Week 7 | All 20 tools live; search + navigation complete |
| M4: Backend Integration | Week 9 | URL shortener, Temp Email, BG Removal live with server |
| M5: SEO & Performance | Week 11 | Individual tool pages, sitemap, Core Web Vitals green |
| M6: Freemium & Auth | Week 13 | Stripe integration, Pro tier, user accounts |
| M7: Public Launch | Week 14 | Product Hunt, marketing push |
| M8: Iteration | Week 18 | A/B tests, conversion optimisation, first 3 new tools |

---

## 14. Out of Scope

The following are explicitly **not** included in v1.0:

- Video converter or audio tools
- OCR (optical character recognition) for scanned PDFs — deferred to v1.1
- Real-time collaborative editing
- Mobile native apps (iOS/Android) — considered for v2.0
- AI-powered writing assistant or grammar checker
- Spreadsheet / Excel tools
- Browser extension — considered for v1.5
- White-label or embedded version for third-party sites

---

## 15. Open Questions

| # | Question | Owner | Due |
|---|----------|-------|-----|
| 1 | Which SMTP provider will handle temp email receiving? (Mailinator API vs. custom Postfix server) | Engineering | Week 2 |
| 2 | Should the URL shortener have a branded domain (e.g. `utl.ly`) or use the main domain? | Product | Week 1 |
| 3 | What is the minimum viable analytics dashboard for Pro URL shortener users? | Design | Week 6 |
| 4 | Do we need a CAPTCHA on the Temp Email generator to prevent abuse? | Engineering | Week 8 |
| 5 | Will the free tier show display ads? If so, which ad network? | Business | Week 3 |
| 6 | Should mobile users get a PWA install prompt? | Product | Week 10 |

---

## 16. Appendix — Tool Inventory

| # | Tool ID | Name | Category | Processing | Backend Required |
|---|---------|------|----------|------------|-----------------|
| 1 | pdf-word | PDF → Word | PDF Tools | Client | No |
| 2 | word-pdf | Word → PDF | PDF Tools | Client | No |
| 3 | merge-pdf | Merge PDF | PDF Tools | Client | No |
| 4 | compress-pdf | Compress PDF | PDF Tools | Client | No |
| 5 | split-pdf | Split PDF | PDF Tools | Client | No |
| 6 | img-convert | Image Converter | Image Tools | Client | No |
| 7 | img-compress | Image Compressor | Image Tools | Client | No |
| 8 | bg-remove | Background Remover | Image Tools | Server | Yes (remove.bg) |
| 9 | img-resize | Image Resizer | Image Tools | Client | No |
| 10 | qr-gen | QR Code Generator | Generator Tools | Client | No |
| 11 | url-short | URL Shortener | Generator Tools | Server | Yes (DB) |
| 12 | pass-gen | Password Generator | Generator Tools | Client | No |
| 13 | json-fmt | JSON Formatter | Developer Tools | Client | No |
| 14 | base64 | Base64 Encoder | Developer Tools | Client | No |
| 15 | regex | Regex Tester | Developer Tools | Client | No |
| 16 | diff | Code Diff Checker | Developer Tools | Client | No |
| 17 | word-count | Word Counter | Text Tools | Client | No |
| 18 | case-conv | Case Converter | Text Tools | Client | No |
| 19 | lorem | Lorem Ipsum Generator | Text Tools | Client | No |
| 20 | temp-mail | Temp Email | Text Tools | Server | Yes (SMTP) |

**Summary:** 17 of 20 tools are fully client-side. Only 3 tools require a backend (Background Remover, URL Shortener, Temp Email).

---

*Document prepared for internal use. Subject to revision as requirements evolve.*  
*Next review: 2 weeks before M2 milestone.*