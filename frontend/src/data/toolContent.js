export const toolContent = {

  // ─── AI Tools ─────────────────────────────────────────────────────────────

  'ai-humanizer': {
    why: 'AI detectors like GPTZero, Originality.ai, and Turnitin flag AI-written text based on predictable patterns — uniform sentence length, overused transitions, and unnatural clarity. This tool rewrites your content to introduce the variation and imperfection that characterises human writing, making it undetectable.',
    howTo: [
      { step: '1', title: 'Paste your AI-generated text', body: 'Copy the output from ChatGPT, Claude, Gemini, or any AI tool and paste it into the input box.' },
      { step: '2', title: 'Click Humanize', body: 'Hit the Humanize button. GPT-4o rewrites the content with natural variation in sentence structure and word choice.' },
      { step: '3', title: 'Copy the result', body: 'Review the humanized output and click Copy to use it in your document, email, or submission.' },
    ],
    useCases: [
      { title: 'Students & academics', body: 'Rewrite AI-assisted essays and assignments to pass Turnitin and university AI detection policies without changing the meaning.' },
      { title: 'Content marketers', body: 'Publish AI-drafted blog posts and articles that pass editorial AI detector checks before going live.' },
      { title: 'Copywriters', body: 'Speed up first drafts with AI, then humanize the output before delivering to clients who require original-sounding copy.' },
    ],
    faq: [
      { q: 'Which AI detectors does this bypass?', a: 'Designed to work against GPTZero, Originality.ai, Copyleaks, and Turnitin AI detection. Results may vary depending on detector version and content type.' },
      { q: 'Does humanizing change the meaning?', a: 'No. The tool preserves the original meaning and key information while restructuring phrasing, sentence length, and word choice.' },
      { q: 'Is my text stored anywhere?', a: 'No. Your text is sent to our API over HTTPS, processed, and the result returned. Nothing is stored.' },
      { q: 'Is there a character limit?', a: 'Up to 8,000 characters per request. For longer content, process it in sections.' },
    ],
  },

  'ai-paraphraser': {
    why: 'Paraphrasing manually takes time and often produces awkward results. This tool uses GPT-4o to restructure sentences intelligently — preserving your original meaning while using completely different phrasing, so the output reads naturally rather than like a thesaurus was applied word-by-word.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Enter the paragraph or passage you want paraphrased into the input box.' },
      { step: '2', title: 'Click Paraphrase', body: 'The AI rewrites the content with new sentence structures and vocabulary while keeping the meaning intact.' },
      { step: '3', title: 'Copy and use', body: 'Review the output and copy it for your document, essay, or post.' },
    ],
    useCases: [
      { title: 'Academic writers', body: 'Restate source material in your own words to avoid plagiarism while keeping the original argument.' },
      { title: 'Content teams', body: 'Refresh existing articles or repurpose content for different platforms and audiences without rewriting from scratch.' },
      { title: 'ESL writers', body: 'Improve awkward phrasing in non-native English writing to produce more fluent, natural-sounding text.' },
    ],
    faq: [
      { q: 'Does paraphrasing count as plagiarism?', a: 'Paraphrasing a source while citing it properly is academically acceptable. Always add citations to the original source.' },
      { q: 'Is the original meaning preserved?', a: 'Yes — the tool is designed to maintain key information and intent while changing structure and wording.' },
      { q: 'Is my text stored?', a: 'No. Text is sent over HTTPS, processed, and immediately discarded after the response is returned.' },
      { q: 'What is the character limit?', a: 'Up to 8,000 characters per request.' },
    ],
  },

  'ai-grammar-fixer': {
    why: 'Basic spell-checkers miss complex grammar errors — dangling modifiers, tense inconsistency, subject-verb disagreement, and misplaced commas. This tool uses GPT-4o to understand context and fix every type of grammar, punctuation, and style error that pattern-matching tools overlook.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Copy the text you want corrected and paste it into the input box.' },
      { step: '2', title: 'Click Fix Grammar', body: 'GPT-4o analyses the full context of your writing and returns a corrected version.' },
      { step: '3', title: 'Review and copy', body: 'Compare the original and corrected versions side by side, then copy the fixed text.' },
    ],
    useCases: [
      { title: 'Non-native English speakers', body: 'Fix subtle grammar errors that native speakers instinctively know but that are hard to learn from grammar rules alone.' },
      { title: 'Professionals', body: 'Polish emails, reports, and proposals before sending to clients, managers, or stakeholders.' },
      { title: 'Students', body: 'Proofread essays and assignments to catch errors that spellcheck misses before submission.' },
    ],
    faq: [
      { q: 'Is this better than Grammarly?', a: 'GPT-4o handles contextual grammar well, including issues Grammarly misses. For high-stakes writing, using both provides the best coverage.' },
      { q: 'Does it change my writing style?', a: 'It corrects errors while preserving your voice. Sentences are only rewritten when grammatically necessary.' },
      { q: 'Is my text stored?', a: 'No. Text is sent over HTTPS, processed, and immediately discarded.' },
      { q: 'Is there a character limit?', a: 'Up to 8,000 characters per request.' },
    ],
  },

  'ai-summarizer': {
    why: 'Reading a full document to extract key points takes time. This tool uses GPT-4o to condense long articles, reports, and research papers into a short summary that captures the most important ideas — saving minutes on every document you read.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Copy the article, report, or document you want summarised and paste it into the input box.' },
      { step: '2', title: 'Click Summarize', body: 'GPT-4o reads the full text and returns a concise summary of the key points.' },
      { step: '3', title: 'Copy the summary', body: 'Use the summary in your notes, emails, or presentations.' },
    ],
    useCases: [
      { title: 'Researchers & students', body: 'Quickly assess whether a paper or article is relevant before reading the full document.' },
      { title: 'Executives & managers', body: 'Get the key takeaways from long reports without reading every page.' },
      { title: 'Content creators', body: 'Summarise competitor articles or research to inform your own writing quickly.' },
    ],
    faq: [
      { q: 'How long can the input text be?', a: 'Up to 8,000 characters per request. For longer documents, process section by section.' },
      { q: 'Does the summary preserve accuracy?', a: 'GPT-4o is designed to extract key facts without introducing inaccuracies. Always verify critical figures against the original.' },
      { q: 'Is my text stored?', a: 'No. Text is processed over HTTPS and immediately discarded after the response.' },
      { q: 'Can I summarize a PDF?', a: 'Not directly — first extract the text using our PDF → Word tool, then paste the text here.' },
    ],
  },

  'ai-title-generator': {
    why: 'A great headline can double your click-through rate. Most writers agonise over titles for too long. This tool generates 8 different headline styles instantly — listicles, how-tos, questions, and curiosity-gap formats — so you can pick the best one in seconds.',
    howTo: [
      { step: '1', title: 'Describe your topic', body: 'Type a short description of your article, video, or post — e.g. "how to make sourdough bread at home".' },
      { step: '2', title: 'Generate titles', body: 'Click Generate to get 8 varied title options spanning different headline styles.' },
      { step: '3', title: 'Copy your favourite', body: 'Click the copy icon next to any title, or hit Regenerate for a fresh batch.' },
    ],
    useCases: [
      { title: 'Bloggers', body: 'Generate high-CTR headlines for articles before writing to ensure your content gets clicked.' },
      { title: 'YouTube creators', body: 'Explore different title formats for videos to find the most watch-worthy option before publishing.' },
      { title: 'Email marketers', body: 'Create compelling subject lines that improve open rates for newsletters and campaigns.' },
    ],
    faq: [
      { q: 'Can I generate more than 8 titles?', a: 'Click Regenerate to get a fresh batch of 8 titles as many times as you like.' },
      { q: 'Are the titles SEO-optimised?', a: 'They are written to be compelling and clickable. For SEO, include your target keyword in the topic description.' },
      { q: 'Is my input stored?', a: 'No. Your topic description is sent over HTTPS, processed, and immediately discarded.' },
      { q: 'What title styles are generated?', a: 'Listicles ("7 ways to..."), how-tos, questions, curiosity-gap titles, and direct statement formats.' },
    ],
  },

  'ai-email-writer': {
    why: 'Writing professional emails from scratch is time-consuming, especially for tricky situations like follow-ups, apologies, or cold outreach. Describe what you need in a sentence and get a complete email — subject line, greeting, body, CTA, and sign-off — in the tone you choose.',
    howTo: [
      { step: '1', title: 'Describe your email', body: 'Type a short description of what the email should accomplish — e.g. "follow up with a client who hasn\'t responded in 2 weeks".' },
      { step: '2', title: 'Choose a tone', body: 'Select from Professional, Friendly, Formal, Apologetic, Persuasive, or Follow-up.' },
      { step: '3', title: 'Copy and send', body: 'Copy the generated subject line and email body, personalise any details, and send.' },
    ],
    useCases: [
      { title: 'Sales professionals', body: 'Draft cold outreach and follow-up emails quickly without staring at a blank page.' },
      { title: 'Customer support', body: 'Create polished, empathetic response templates for common customer issues.' },
      { title: 'Job seekers', body: 'Write professional cover letters, interview follow-ups, and networking emails.' },
    ],
    faq: [
      { q: 'Can I edit the generated email?', a: 'Yes, the output is fully editable. Always personalise names, dates, and specific details before sending.' },
      { q: 'Is my input stored?', a: 'No. Your description is sent over HTTPS, processed, and immediately discarded.' },
      { q: 'How many tone options are there?', a: 'Six: Professional, Friendly, Formal, Apologetic, Persuasive, and Follow-up.' },
      { q: 'Can it write emails in other languages?', a: 'Yes — describe your email in any language and it will draft the email in that language.' },
    ],
  },

  // ─── PDF Tools ────────────────────────────────────────────────────────────

  'pdf-to-word': {
    why: 'PDFs lock content into a format that is hard to edit without expensive desktop software. This tool extracts all readable text from any PDF instantly — right in your browser — so you can copy, edit, and repurpose it without installing anything.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click the upload area or drag and drop your PDF file onto the page.' },
      { step: '2', title: 'Preview the extracted text', body: 'The tool reads your PDF using PDF.js and shows a live preview of the content.' },
      { step: '3', title: 'Download the text file', body: 'Click Download to save the extracted text as a .txt file to your device.' },
    ],
    useCases: [
      { title: 'Students & researchers', body: 'Extract text from academic papers, textbooks, and research PDFs to quote, annotate, or analyse.' },
      { title: 'Legal & compliance teams', body: 'Pull text from contracts and legal PDFs to search, edit, or reformat in a word processor.' },
      { title: 'Content repurposing', body: 'Extract text from old PDF reports to repurpose into blog posts, slides, or updated documents.' },
    ],
    faq: [
      { q: 'Does my PDF get uploaded to a server?', a: 'No. All processing happens locally in your browser using PDF.js. Your file never leaves your device.' },
      { q: 'Will the formatting be preserved?', a: 'Paragraphs and line breaks are preserved. Complex multi-column layouts may be linearised into a single reading flow.' },
      { q: 'What file size is supported?', a: 'PDFs up to 100MB work without issues.' },
      { q: 'Does this work on scanned PDFs?', a: 'Scanned PDFs contain images, not selectable text. Use our OCR PDF tool for those.' },
    ],
  },

  'word-to-pdf': {
    why: 'You should not need Word or Acrobat installed just to save something as a PDF. Paste your text here, adjust the formatting, and your browser\'s native print dialog saves a clean, properly sized PDF — no plugins, no accounts.',
    howTo: [
      { step: '1', title: 'Paste or type your content', body: 'Copy text from Google Docs, Word, Notepad, or any source and paste it into the editor.' },
      { step: '2', title: 'Adjust font and margins', body: 'Set font size, line height, and page margins to match your document needs.' },
      { step: '3', title: 'Save as PDF', body: 'Click "Convert to PDF" which triggers your browser print dialog. Select "Save as PDF" as the destination.' },
    ],
    useCases: [
      { title: 'Professionals', body: 'Convert proposals, letters, and reports to PDF for professional document sharing.' },
      { title: 'Freelancers', body: 'Create PDFs from invoices or contracts drafted in plain text without paying for software.' },
      { title: 'Students', body: 'Submit assignments as PDFs when professors require that format and you have no Word license.' },
    ],
    faq: [
      { q: 'Does this support bold, headers, and tables?', a: 'Currently it converts plain text with configurable font and margins. For complex formatting, use Google Docs → File → Download → PDF.' },
      { q: 'Is the PDF generated on a server?', a: 'No. The PDF is created entirely by your browser\'s native print-to-PDF function. Nothing is uploaded.' },
      { q: 'What PDF size will be produced?', a: 'Depends on text length and font size. Most documents produce PDFs under 500KB.' },
      { q: 'Is there a page or word limit?', a: 'No limit — paste as much text as you need.' },
    ],
  },

  'merge-pdf': {
    why: 'Sending multiple PDFs as separate attachments is unprofessional and inconvenient for recipients. Merging them into a single file — with custom ordering — takes seconds and ensures everything is read in sequence.',
    howTo: [
      { step: '1', title: 'Upload your PDFs', body: 'Click to upload or drag and drop multiple PDF files at once.' },
      { step: '2', title: 'Reorder if needed', body: 'Drag rows to set the order you want the files to appear in the merged document.' },
      { step: '3', title: 'Merge and download', body: 'Click Merge PDF and download the combined file with your chosen filename.' },
    ],
    useCases: [
      { title: 'Job applicants', body: 'Combine CV, cover letter, and portfolio into one clean file for easier application submission.' },
      { title: 'Business professionals', body: 'Merge a report body with its appendices, data tables, and reference pages into one document.' },
      { title: 'Students', body: 'Combine multiple assignment parts or supporting documents before final submission.' },
    ],
    faq: [
      { q: 'How many PDFs can I merge at once?', a: 'Up to 20 PDFs per merge.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. All merging happens in your browser using pdf-lib. Your files never leave your device.' },
      { q: 'Is there a file size limit?', a: 'Each PDF can be up to 100MB. Keep total combined size under 500MB for best performance.' },
      { q: 'Are bookmarks and hyperlinks preserved?', a: 'Page content is fully preserved. Interactive elements like bookmarks and form fields may not carry over.' },
    ],
  },

  'compress-pdf': {
    why: 'Large PDFs are rejected by email attachment limits and slow to upload to government portals and web forms. Re-rendering at a lower resolution achieves significant size reduction while keeping text sharp and readable.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload or drag and drop your large PDF.' },
      { step: '2', title: 'Choose a quality preset', body: 'Select Low (smallest file), Medium (balanced), or High (best quality at smaller size).' },
      { step: '3', title: 'Download the compressed PDF', body: 'See the before/after size comparison, then download the smaller file.' },
    ],
    useCases: [
      { title: 'Emailing large documents', body: 'Reduce scanned contracts and reports below email attachment limits before sending.' },
      { title: 'Web form uploads', body: 'Compress PDFs to meet the file size requirements of government, legal, or HR portals.' },
      { title: 'Cloud storage optimisation', body: 'Reduce storage usage by compressing archived PDFs you rarely need to print at full resolution.' },
    ],
    faq: [
      { q: 'How much compression can I expect?', a: 'Medium quality typically achieves 40–60% size reduction. Text-only PDFs compress less than image-heavy ones.' },
      { q: 'Will text become unreadable?', a: 'Text remains sharp at all presets — only image resolution is reduced.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Compression runs entirely in your browser. Your file never leaves your device.' },
      { q: 'Why is my compressed file larger?', a: 'Primarily text PDFs gain little from re-rendering compression. Try the Low preset, or the file may already be near-optimal.' },
    ],
  },

  'split-pdf': {
    why: 'When you only need specific pages from a PDF — one chapter from a textbook, a few slides from a deck — extracting them avoids sharing the entire document and makes the result easier to navigate.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload the PDF you want to split.' },
      { step: '2', title: 'Enter page numbers or ranges', body: 'Type the pages to extract, e.g. "1,3,5-8" or "2-7". The tool shows total page count automatically.' },
      { step: '3', title: 'Download the split file', body: 'Click Split PDF and download the extracted pages as a new PDF.' },
    ],
    useCases: [
      { title: 'Students', body: 'Extract a specific chapter from a large textbook PDF to share or annotate without the whole file.' },
      { title: 'Legal teams', body: 'Extract specific exhibits or clauses from lengthy contracts for standalone review or citation.' },
      { title: 'Designers', body: 'Pull individual slides or pages from a presentation PDF to use as standalone image assets.' },
    ],
    faq: [
      { q: 'How do I specify pages to extract?', a: 'Use comma-separated values like "1,3,5" for specific pages, ranges like "2-7", or a combination like "1,3,5-8".' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Splitting happens entirely in your browser using pdf-lib. Your file never leaves your device.' },
      { q: 'Can I extract non-consecutive pages?', a: 'Yes — "1,5,9,12" extracts only those specific pages in that order.' },
      { q: 'Is there a page count limit?', a: 'No limit on the number of pages in the source PDF.' },
    ],
  },

  'pdf-unlocker': {
    why: 'Password-protected PDFs are convenient for senders but frustrating for recipients who legitimately own the document and have to re-enter credentials every time. This tool removes the restriction permanently — processing everything locally so your password never leaves your browser.',
    howTo: [
      { step: '1', title: 'Upload your protected PDF', body: 'Click to upload the password-protected PDF file.' },
      { step: '2', title: 'Enter the password', body: 'Type the PDF password. Use the toggle to show the characters if needed.' },
      { step: '3', title: 'Download the unlocked PDF', body: 'Click Unlock PDF to download a new version of the file with no password required.' },
    ],
    useCases: [
      { title: 'Personal documents', body: 'Remove passwords from your own PDFs that you no longer need to restrict.' },
      { title: 'Scanned invoices', body: 'Unlock password-protected vendor invoices so they can be opened in any PDF reader.' },
      { title: 'Archived reports', body: 'Unlock old internal reports where the original password has been forgotten or changed.' },
    ],
    faq: [
      { q: 'Can this unlock PDFs I don\'t own?', a: 'No. You must already know the password. This tool only removes the prompt for PDFs you can already open.' },
      { q: 'Does my file or password go to a server?', a: 'No. Decryption happens entirely in your browser. Your file and password never leave your device.' },
      { q: 'Is the unlocked PDF different from the original?', a: 'Content is identical — only the password protection metadata is removed.' },
      { q: 'What if my password is wrong?', a: 'The tool will show an error. Double-check the password and try again.' },
    ],
  },

  'pdf-watermark': {
    why: 'Marking PDFs before sharing protects documents from being misrepresented or redistributed without context. A CONFIDENTIAL or DRAFT watermark on every page takes one click and removes any ambiguity about a document\'s status.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload the PDF you want to watermark.' },
      { step: '2', title: 'Customise the watermark', body: 'Enter your watermark text, choose colour (grey, red, blue, green), font size, and opacity.' },
      { step: '3', title: 'Download the watermarked PDF', body: 'Click Add Watermark and download your protected document.' },
    ],
    useCases: [
      { title: 'Legal & compliance', body: 'Mark draft contracts as DRAFT so they cannot be mistaken for final signed versions.' },
      { title: 'Businesses sharing proposals', body: 'Add CONFIDENTIAL to proposals before sending to prevent unauthorised distribution.' },
      { title: 'Photographers & designers', body: 'Brand portfolio PDFs with your studio name or copyright notice before sending to clients.' },
    ],
    faq: [
      { q: 'Is the watermark permanent?', a: 'The watermark is embedded into PDF page content and cannot be removed with standard PDF readers.' },
      { q: 'Can I choose where on the page the watermark appears?', a: 'The watermark is applied diagonally across the centre of each page. Custom position is not currently supported.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Watermarking happens entirely in your browser using pdf-lib. Your file never leaves your device.' },
      { q: 'Can I watermark only specific pages?', a: 'Currently the watermark is applied to all pages simultaneously.' },
    ],
  },

  'rotate-pdf': {
    why: 'Scanned documents often come out sideways or upside down. Rotating in a PDF reader is temporary — it only changes your view, not the file. This tool permanently corrects page orientation in the file itself.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload the PDF with incorrectly oriented pages.' },
      { step: '2', title: 'Select pages and rotation angle', body: 'Choose all pages or specific ranges, and select 90°, 180°, or 270° rotation.' },
      { step: '3', title: 'Download the corrected PDF', body: 'Click Rotate PDF and download the file with permanently corrected orientation.' },
    ],
    useCases: [
      { title: 'Scanned documents', body: 'Fix landscape-scanned pages in contracts and forms that need to be portrait for reading.' },
      { title: 'Mixed-orientation presentations', body: 'Correct pages that were accidentally rotated during PDF assembly or export.' },
      { title: 'Archiving', body: 'Standardise page orientation in PDF archives before storing or sharing.' },
    ],
    faq: [
      { q: 'Which rotation angles are supported?', a: '90° clockwise, 180° (upside-down flip), or 270° clockwise (equivalent to 90° counter-clockwise).' },
      { q: 'Can I rotate only specific pages?', a: 'Yes — enter page numbers or ranges like "1,3,5-8" to rotate only those pages.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Rotation is applied in your browser using pdf-lib. Your file never leaves your device.' },
      { q: 'Does rotation reduce PDF quality?', a: 'No. Rotation only updates orientation metadata — it does not re-render or recompress content.' },
    ],
  },

  'ocr-pdf': {
    why: 'Scanned PDFs are essentially images — the text inside is not selectable, searchable, or copyable. OCR (Optical Character Recognition) analyses the pixels on each page and converts them into real text you can copy, edit, and search.',
    howTo: [
      { step: '1', title: 'Upload your scanned PDF', body: 'Click to upload a PDF that contains scanned pages where text is not selectable.' },
      { step: '2', title: 'Start OCR extraction', body: 'Click Extract Text. Each page is rendered to canvas and processed by Tesseract.js. A progress bar shows status.' },
      { step: '3', title: 'Download the text file', body: 'Once complete, download the extracted text as a .txt file.' },
    ],
    useCases: [
      { title: 'Digitising paper documents', body: 'Convert scanned contracts, letters, and forms into searchable, editable text without retyping.' },
      { title: 'Receipts & invoices', body: 'Extract amounts and details from scanned receipts for expense reports or accounting.' },
      { title: 'Archiving research', body: 'Convert scanned academic papers and historical documents into readable, searchable text.' },
    ],
    faq: [
      { q: 'How accurate is the OCR?', a: 'Tesseract.js is highly accurate for clear, high-contrast printed text. Handwriting, low-resolution scans, and decorative fonts will produce more errors.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. OCR runs entirely in your browser using Tesseract.js. Your file never leaves your device.' },
      { q: 'How long does OCR take?', a: 'Roughly 5–15 seconds per page depending on your device. A 10-page scan takes about 1–2 minutes.' },
      { q: 'What languages does OCR support?', a: 'English only in the current version via the Tesseract.js default language pack.' },
    ],
  },

  'esign-pdf': {
    why: 'Printing a PDF just to sign it and scan it back is slow and wasteful. Draw your signature with a mouse or finger and embed it directly into the PDF — the signed file is ready to send in under a minute, with nothing uploaded.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload the document you need to sign.' },
      { step: '2', title: 'Draw your signature', body: 'Use your mouse or touchscreen to sign on the canvas. Click Clear to redo.' },
      { step: '3', title: 'Position and download', body: 'Choose which page and corner to place the signature, then download the signed PDF.' },
    ],
    useCases: [
      { title: 'Freelancers & contractors', body: 'Sign client contracts and service agreements digitally without printing or scanning.' },
      { title: 'Property & real estate', body: 'Sign rental agreements and property documents digitally for faster turnaround.' },
      { title: 'HR & hiring', body: 'Sign offer letters and employment agreements quickly from any device.' },
    ],
    faq: [
      { q: 'Is a drawn digital signature legally binding?', a: 'For most everyday documents, yes. For high-stakes legal documents requiring certified signatures, use DocuSign or Adobe Sign.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Signing happens entirely in your browser using pdf-lib. Your PDF and signature never leave your device.' },
      { q: 'Can I resize the signature?', a: 'The signature size is fixed relative to the page. Use the corner position options to place it correctly.' },
      { q: 'Can I sign multiple pages?', a: 'Currently the signature is placed on one selected page per download.' },
    ],
  },

  // ─── Image Tools ──────────────────────────────────────────────────────────

  'image-converter': {
    why: 'Different platforms require different image formats — JPG for photographs, PNG for graphics with transparency, WebP for web performance. This tool converts between all three instantly without desktop software or file uploads.',
    howTo: [
      { step: '1', title: 'Upload your image(s)', body: 'Click to upload or drag and drop up to 10 images at once.' },
      { step: '2', title: 'Choose output format', body: 'Select JPG, PNG, or WebP. Adjust the quality slider for lossy formats.' },
      { step: '3', title: 'Download', body: 'Download each converted image individually or all at once.' },
    ],
    useCases: [
      { title: 'Web developers', body: 'Convert PNG images to WebP for 25–35% smaller file sizes and better Core Web Vitals scores.' },
      { title: 'Graphic designers', body: 'Convert JPG photos to PNG to unlock transparency support for logos, icons, and cutouts.' },
      { title: 'Social media managers', body: 'Convert images to the format required by each platform\'s specific upload guidelines.' },
    ],
    faq: [
      { q: 'What formats are supported?', a: 'Input: JPG, PNG, WebP, GIF, BMP. Output: JPG, PNG, WebP.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion happens entirely in your browser using the Canvas API. Your images never leave your device.' },
      { q: 'Will I lose quality when converting?', a: 'PNG-to-PNG is lossless. Converting to JPG or WebP at quality below 100% introduces some compression. Use 95%+ for near-lossless output.' },
      { q: 'Can I batch convert?', a: 'Yes — upload up to 10 images and convert them all simultaneously.' },
    ],
  },

  'image-compressor': {
    why: 'Large image files slow down websites, fill storage, and get blocked by email attachments. This tool reduces file size with a quality slider while showing you exactly how many KB you save — before you commit to downloading.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload or drag and drop the image you want to compress.' },
      { step: '2', title: 'Adjust the quality slider', body: 'Move the slider to balance file size and visual quality. 70–80% is ideal for most uses.' },
      { step: '3', title: 'Download the compressed image', body: 'See the before/after size comparison, then click Download when satisfied.' },
    ],
    useCases: [
      { title: 'Web performance', body: 'Compress hero images, product photos, and thumbnails to improve page load times.' },
      { title: 'Email attachments', body: 'Reduce image file size before attaching to emails with attachment size limits.' },
      { title: 'Social media', body: 'Compress images to meet platform upload size limits without noticeable quality loss.' },
    ],
    faq: [
      { q: 'What quality setting should I use?', a: '70–80% is the sweet spot — significant size reduction with minimal visible difference.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Compression happens in your browser using the Canvas API. Your image never leaves your device.' },
      { q: 'What formats can I compress?', a: 'JPG, PNG, and WebP as input. Output is JPEG for maximum compression ratio.' },
      { q: 'Why is my PNG larger after compression?', a: 'PNG is lossless. To compress a PNG significantly, convert it to JPEG first, which is what the compressor does.' },
    ],
  },

  'background-remover': {
    why: 'Removing backgrounds manually in Photoshop takes minutes of careful masking. The remove.bg AI model detects subjects and edges automatically — outputting a clean transparent PNG in seconds, accurate enough for professional product photography.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload a portrait, product photo, or any image you want to remove the background from.' },
      { step: '2', title: 'Wait for AI processing', body: 'The image is sent to remove.bg over HTTPS. Processing usually takes 5–10 seconds.' },
      { step: '3', title: 'Download the result', body: 'Download the transparent PNG, or apply a white or custom colour fill first.' },
    ],
    useCases: [
      { title: 'E-commerce sellers', body: 'Create product photos on clean white or transparent backgrounds for Amazon, Shopify, and Etsy listings.' },
      { title: 'Graphic designers', body: 'Extract subjects from photos for use in compositions, posters, and marketing materials.' },
      { title: 'Social media creators', body: 'Remove backgrounds from profile photos and thumbnails for cleaner, professional-looking content.' },
    ],
    faq: [
      { q: 'How accurate is the background removal?', a: 'remove.bg is highly accurate for people, products, and animals with clear subject edges. Complex scenes with similar foreground and background colours may need manual touch-up.' },
      { q: 'Is my image uploaded to a server?', a: 'Yes — the image is sent to the remove.bg API over HTTPS for processing. It is not stored by UtilKit.' },
      { q: 'What formats are supported?', a: 'JPG and PNG input. Output is always a transparent PNG.' },
      { q: 'Is there a file size limit?', a: 'Images up to 10MB are supported.' },
    ],
  },

  'image-resizer': {
    why: 'Every platform has specific required image dimensions — Instagram posts, YouTube thumbnails, Twitter cards. Uploading the wrong size crops, stretches, or gets rejected. This tool resizes to exact pixels with aspect ratio lock so images always look right.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload the image you want to resize.' },
      { step: '2', title: 'Enter dimensions or pick a preset', body: 'Type custom width and height, or choose from built-in social media presets.' },
      { step: '3', title: 'Download', body: 'Click Resize and download the image at the exact new dimensions.' },
    ],
    useCases: [
      { title: 'Social media managers', body: 'Resize photos to exact platform dimensions for Instagram, YouTube, Twitter, LinkedIn, and Facebook.' },
      { title: 'Web developers', body: 'Create specific-size images for hero banners, card thumbnails, and avatars.' },
      { title: 'Print designers', body: 'Resize photos to exact print dimensions before sending to a print shop.' },
    ],
    faq: [
      { q: 'What is aspect ratio lock?', a: 'When enabled, changing the width automatically adjusts the height (and vice versa) to prevent distortion.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Resizing happens in your browser using the Canvas API. Your image never leaves your device.' },
      { q: 'What formats are supported?', a: 'JPG, PNG, WebP, and GIF as input. Output is JPEG or PNG.' },
      { q: 'What social media presets are available?', a: 'Instagram post (1080×1080), YouTube thumbnail (1280×720), Twitter post (1200×675), Facebook cover (1200×628), and more.' },
    ],
  },

  'meme-generator': {
    why: 'Memes communicate ideas faster than paragraphs. Creating one should not require Photoshop. Upload any image, add Impact-style text top and bottom, and download a share-ready PNG in seconds — all in your browser.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload any image you want to use as the meme background.' },
      { step: '2', title: 'Add your text', body: 'Type the top and bottom text. Adjust font size and colour to suit.' },
      { step: '3', title: 'Download the meme', body: 'Click Download to save the finished meme as a PNG.' },
    ],
    useCases: [
      { title: 'Social media content', body: 'Create shareable memes for Twitter, Instagram, Reddit, and Facebook quickly.' },
      { title: 'Marketing teams', body: 'Use recognisable meme formats to make brand content more relatable and shareable.' },
      { title: 'Team communication', body: 'Create funny internal memes for Slack, Teams, or company newsletters.' },
    ],
    faq: [
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF (static frame only).' },
      { q: 'Does my image get uploaded to a server?', a: 'No. The meme is created entirely in your browser using the Canvas API.' },
      { q: 'Can I change the font?', a: 'Currently uses Impact — the classic meme font. Additional fonts may be added in future.' },
      { q: 'What resolution is the downloaded meme?', a: 'The output PNG matches the original uploaded image dimensions.' },
    ],
  },

  'ai-image-upscaler': {
    why: 'Enlarging images without upscaling makes them pixelated. This tool uses high-quality canvas interpolation to increase image dimensions to 2×, 3×, or 4× with smooth results — making small images usable for print, display, and repurposing.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload the image you want to enlarge.' },
      { step: '2', title: 'Choose a scale factor', body: 'Select 2×, 3×, or 4× upscaling.' },
      { step: '3', title: 'Download the upscaled image', body: 'Click Upscale and download the larger image as a PNG.' },
    ],
    useCases: [
      { title: 'Print preparation', body: 'Enlarge small web images to print-ready dimensions for banners, flyers, and physical media.' },
      { title: 'Thumbnail expansion', body: 'Upscale small thumbnails for use as larger preview images in blog posts or portfolios.' },
      { title: 'Archival photos', body: 'Enlarge old small-format photos for better visibility and digital preservation.' },
    ],
    faq: [
      { q: 'Will upscaling make my image sharper?', a: 'Upscaling adds pixels via interpolation but cannot recover fine detail that was not in the original. The result will be larger and smoother, not sharper.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Upscaling happens in your browser using the Canvas API. Your image never leaves your device.' },
      { q: 'What formats are supported?', a: 'JPG, PNG, and WebP as input. Output is always PNG.' },
      { q: 'Is 4× recommended?', a: 'For print, 2× is usually sufficient. 4× produces very large files with diminishing quality returns from interpolation alone.' },
    ],
  },

  'png-to-jpg': {
    why: 'PNG files use lossless compression, making them significantly larger than JPEG for photographs. When you do not need transparency, converting to JPG typically reduces file size by 50–80% with minimal visible quality difference.',
    howTo: [
      { step: '1', title: 'Upload your PNG(s)', body: 'Click to upload one or more PNG files.' },
      { step: '2', title: 'Set JPEG quality', body: 'Adjust the quality slider. 85–95% gives near-lossless results with substantial size savings.' },
      { step: '3', title: 'Download the JPGs', body: 'Download each converted file individually or all at once.' },
    ],
    useCases: [
      { title: 'Web publishing', body: 'Reduce large PNG screenshot and illustration sizes for faster blog post page loads.' },
      { title: 'Email attachments', body: 'Convert bulky PNG images to smaller JPGs before attaching to emails.' },
      { title: 'CMS uploads', body: 'Upload JPGs instead of PNGs to CMSs to reduce storage costs and improve load times.' },
    ],
    faq: [
      { q: 'What happens to transparent areas?', a: 'Transparency is filled with white. To use a different background colour, use the Image Converter tool.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion happens in your browser using the Canvas API. Your images never leave your device.' },
      { q: 'Can I batch convert multiple PNGs?', a: 'Yes — upload multiple files and they are all converted at the same quality setting.' },
      { q: 'What quality should I use?', a: '85% gives excellent results — roughly 60% smaller than the original PNG with barely visible quality difference.' },
    ],
  },

  'jpg-to-png': {
    why: 'JPEG compression introduces visible artifacts in logos, icons, and screenshots with sharp edges. Converting to lossless PNG removes these artifacts and adds transparency support — both essential for design and development work.',
    howTo: [
      { step: '1', title: 'Upload your JPEG(s)', body: 'Click to upload one or more JPG or JPEG files.' },
      { step: '2', title: 'Convert', body: 'Conversion to lossless PNG is automatic — no settings needed.' },
      { step: '3', title: 'Download the PNGs', body: 'Download each file individually or all at once.' },
    ],
    useCases: [
      { title: 'Logo & icon work', body: 'Convert JPG logos to PNG for use in designs that require a transparent background.' },
      { title: 'Screenshots & documentation', body: 'Convert compressed JPG screenshots to PNG for sharper, artifact-free technical documentation.' },
      { title: 'Design assets', body: 'Convert photos to lossless PNG before editing in tools that benefit from non-destructive formats.' },
    ],
    faq: [
      { q: 'Will converting JPG to PNG improve quality?', a: 'It stops further quality loss from re-saving but cannot recover detail already lost in the original JPEG compression.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion happens in your browser using the Canvas API. Your images never leave your device.' },
      { q: 'Will the PNG be larger than the JPG?', a: 'Yes. PNG lossless compression typically produces larger files than JPEG for photographic content.' },
      { q: 'Can I batch convert?', a: 'Yes — upload multiple JPG files and they are all converted simultaneously.' },
    ],
  },

  'webp-converter': {
    why: 'WebP achieves 25–35% smaller file sizes than JPEG at equivalent visual quality. Switching your website images to WebP is one of the most impactful changes you can make for page speed, Core Web Vitals, and SEO.',
    howTo: [
      { step: '1', title: 'Upload your images', body: 'Click to upload JPG, PNG, GIF, or BMP files.' },
      { step: '2', title: 'Set quality', body: 'Adjust the quality slider. 80–90% gives excellent results with significant size savings.' },
      { step: '3', title: 'Download WebP files', body: 'Download the converted WebP files and replace your originals on your server.' },
    ],
    useCases: [
      { title: 'Web developers', body: 'Convert site images to WebP to improve Largest Contentful Paint (LCP) and Google PageSpeed scores.' },
      { title: 'E-commerce', body: 'Reduce product image file sizes by 30%+ without visible quality loss to speed up shop load times.' },
      { title: 'Bloggers & content creators', body: 'Convert featured images and inline photos to WebP for faster page loads and better SEO rankings.' },
    ],
    faq: [
      { q: 'Do all browsers support WebP?', a: 'Yes — all modern browsers including Chrome, Firefox, Safari 14+, and Edge support WebP.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion happens in your browser using the Canvas API. Your images never leave your device.' },
      { q: 'How much smaller will WebP files be?', a: 'Typically 25–35% smaller than JPEG and 50–70% smaller than PNG at similar visual quality.' },
      { q: 'Does WebP support transparency?', a: 'Yes — transparent PNG images converted to WebP preserve the alpha channel.' },
    ],
  },

  // ─── Generator Tools ──────────────────────────────────────────────────────

  'qr-code-generator': {
    why: 'QR codes bridge physical and digital. Print them on menus, flyers, business cards, and packaging to instantly connect people to a URL, contact, or Wi-Fi network. Generated entirely in your browser — no login, no limits.',
    howTo: [
      { step: '1', title: 'Choose your QR type', body: 'Select from URL, plain text, email, phone number, or Wi-Fi credentials.' },
      { step: '2', title: 'Enter your content', body: 'Fill in the URL, text, or network details you want the QR code to encode.' },
      { step: '3', title: 'Download at your preferred size', body: 'Preview updates live. Download at 200px, 400px, 600px, or 800px.' },
    ],
    useCases: [
      { title: 'Restaurants & hospitality', body: 'Link table QR codes to digital menus, booking pages, or loyalty programmes.' },
      { title: 'Marketers', body: 'Add QR codes to print ads, business cards, and packaging to drive traffic to landing pages.' },
      { title: 'Events', body: 'Generate QR codes for event Wi-Fi credentials, registration links, and schedules.' },
    ],
    faq: [
      { q: 'Do these QR codes expire?', a: 'No. QR codes are static — they encode the content directly and never expire.' },
      { q: 'Is my content uploaded anywhere?', a: 'No. QR codes are generated entirely in your browser. No data is sent to any server.' },
      { q: 'What size should I use for print?', a: 'Use 800px for print materials. The minimum scannable print size is approximately 2cm × 2cm.' },
      { q: 'Can I customise the QR code colour?', a: 'Currently black on white only. Custom colours and logo embedding may be added in future.' },
    ],
  },

  'url-shortener': {
    why: 'Long URLs are unwieldy in social posts, printed materials, and emails. Short links are cleaner, more clickable, and can have a meaningful custom slug. Built-in click tracking shows you how each link is performing.',
    howTo: [
      { step: '1', title: 'Paste your long URL', body: 'Enter the full URL you want to shorten into the input field.' },
      { step: '2', title: 'Set a custom slug (optional)', body: 'Enter a custom path like "my-campaign" or leave blank for a random short code.' },
      { step: '3', title: 'Copy and share', body: 'Copy your short link and share it anywhere. Track total clicks from your created links list.' },
    ],
    useCases: [
      { title: 'Social media', body: 'Shorten tracking URLs to fit character limits and clean up link previews on Twitter and Instagram.' },
      { title: 'Marketing campaigns', body: 'Create memorable campaign links like /s/blackfriday for print and digital materials.' },
      { title: 'Internal sharing', body: 'Shorten long internal URLs for dashboards, wikis, and documents to share via chat.' },
    ],
    faq: [
      { q: 'Are short links permanent?', a: 'Yes — they persist until you delete them.' },
      { q: 'Is my URL stored?', a: 'Yes, the destination URL is stored in our database to enable redirects. Only the URL is stored, no personal data.' },
      { q: 'Are clicks tracked?', a: 'Total click count is tracked per link. No IP addresses or personal identifiers are stored.' },
      { q: 'Can I use a custom domain?', a: 'Not currently — all links use our default short domain.' },
    ],
  },

  'password-generator': {
    why: 'Weak and reused passwords are the leading cause of account breaches. This generator uses your browser\'s cryptographic API — not Math.random() — to create truly random, high-entropy passwords that are safe to use anywhere.',
    howTo: [
      { step: '1', title: 'Set your options', body: 'Choose password length and which character types to include: uppercase, lowercase, numbers, symbols.' },
      { step: '2', title: 'Generate', body: 'A new password generates instantly. Entropy in bits is shown as a strength indicator.' },
      { step: '3', title: 'Copy and save', body: 'Click Copy and store the password in a password manager.' },
    ],
    useCases: [
      { title: 'Account security', body: 'Generate a unique strong password for every new account — never reuse the same password twice.' },
      { title: 'IT administrators', body: 'Create strong temporary passwords for new user accounts and system credentials.' },
      { title: 'API keys & secrets', body: 'Generate random secrets for environment variables, JWT signing keys, and webhook tokens.' },
    ],
    faq: [
      { q: 'Is this truly random?', a: 'Yes — it uses window.crypto.getRandomValues(), which is cryptographically secure unlike Math.random().' },
      { q: 'Is the password sent anywhere?', a: 'No. Generation is 100% client-side. Nothing is ever transmitted or stored.' },
      { q: 'What is a good password length?', a: '16+ characters with mixed types is considered strong. For high-security use, 24+ characters.' },
      { q: 'What does entropy in bits mean?', a: 'Entropy represents unpredictability. 80+ bits is strong; 128+ bits is excellent for sensitive accounts.' },
    ],
  },

  // ─── Developer Tools ──────────────────────────────────────────────────────

  'json-formatter': {
    why: 'Raw JSON from APIs, logs, and config files is nearly unreadable when minified. This tool prettifies JSON with proper indentation, validates syntax and highlights errors, and optionally sorts keys alphabetically — all instantly in your browser.',
    howTo: [
      { step: '1', title: 'Paste your JSON', body: 'Copy the JSON you want to format and paste it into the editor.' },
      { step: '2', title: 'Choose indentation', body: 'Select 2 spaces, 4 spaces, or tabs as your indentation style.' },
      { step: '3', title: 'Copy the result', body: 'Click Prettify or Minify, then copy the formatted output.' },
    ],
    useCases: [
      { title: 'API debugging', body: 'Format raw API responses during development to quickly read field names and values.' },
      { title: 'Config file editing', body: 'Prettify minified JSON config files (package.json, tsconfig.json) for readability.' },
      { title: 'Data validation', body: 'Quickly validate whether a JSON string is syntactically correct before parsing it.' },
    ],
    faq: [
      { q: 'Is my JSON sent to a server?', a: 'No. All formatting happens entirely in your browser using JavaScript. Your data never leaves your device.' },
      { q: 'Does it support JSON5 or comments?', a: 'No — only standard JSON (RFC 8259). Comments will cause a parse error.' },
      { q: 'What does "Sort keys" do?', a: 'Reorders all object keys alphabetically, making it easier to scan and compare JSON objects.' },
      { q: 'Is there a size limit?', a: 'No hard limit, but very large JSON (>10MB) may be slow depending on your device.' },
    ],
  },

  'base64': {
    why: 'Base64 encoding is used throughout web development — embedding images in CSS, encoding binary data for APIs, creating JWT tokens, and passing data through text-only channels. Encode and decode instantly without writing a single line of code.',
    howTo: [
      { step: '1', title: 'Choose encode or decode', body: 'Select whether you want to encode text or a file to Base64, or decode a Base64 string back.' },
      { step: '2', title: 'Paste text or upload a file', body: 'For encoding: paste text or upload any file. For decoding: paste the Base64 string.' },
      { step: '3', title: 'Copy or download the result', body: 'Copy the encoded string to clipboard, or download the decoded file.' },
    ],
    useCases: [
      { title: 'Web development', body: 'Encode images to Base64 data URIs for inline embedding in HTML and CSS without external file requests.' },
      { title: 'API authentication', body: 'Encode credentials for HTTP Basic Auth headers: Base64("username:password").' },
      { title: 'JWT inspection', body: 'Decode JWT payloads (Base64URL-encoded) to inspect claims, expiry, and permissions.' },
    ],
    faq: [
      { q: 'Is my data sent to a server?', a: 'No. All encoding and decoding happens entirely in your browser. Your data never leaves your device.' },
      { q: 'What is Base64URL?', a: 'A variant that replaces + with - and / with _ to make the output safe for URLs and filenames. Used in JWTs.' },
      { q: 'Can I encode binary files?', a: 'Yes — upload any file and get its Base64 string, ready for embedding in data URIs or API payloads.' },
      { q: 'Is there a size limit?', a: 'Text is unlimited. File encoding works well up to ~10MB.' },
    ],
  },

  'regex-tester': {
    why: 'Writing regular expressions without instant feedback leads to subtle bugs that only surface in production. This tool highlights matches in real time so you can iterate on patterns quickly and confidently before committing them to code.',
    howTo: [
      { step: '1', title: 'Enter your regex pattern', body: 'Type or paste your regular expression into the pattern field.' },
      { step: '2', title: 'Paste your test string', body: 'Enter the sample text you want to match against.' },
      { step: '3', title: 'View highlighted matches', body: 'Matching text is highlighted in real time. Match count and captured groups are shown below.' },
    ],
    useCases: [
      { title: 'Input validation', body: 'Test email, phone, URL, and postcode validation patterns before wiring them into backend logic.' },
      { title: 'Text processing', body: 'Build patterns for search/replace operations in scripts, code editors, and data pipelines.' },
      { title: 'Log parsing', body: 'Design patterns to extract structured fields from server logs and error messages.' },
    ],
    faq: [
      { q: 'Which regex flavour is used?', a: 'JavaScript RegExp (ECMAScript). PCRE-specific features not available in modern JS may not work.' },
      { q: 'Is my data sent to a server?', a: 'No. All matching runs entirely in your browser. Your data never leaves your device.' },
      { q: 'What flags are supported?', a: 'Common flags: g (global), i (case-insensitive), m (multiline), and s (dotAll).' },
      { q: 'What are the preset patterns?', a: 'Email address, URL, phone number, IPv4 address, and common date formats — one-click to load any preset.' },
    ],
  },

  'code-diff': {
    why: 'Manually spotting changes between two text versions is tedious and error-prone. This tool highlights exactly which lines were added and removed using the Longest Common Subsequence algorithm — the same approach Git uses — giving you an accurate diff every time.',
    howTo: [
      { step: '1', title: 'Paste the original text', body: 'Add the original (before) version to the left panel.' },
      { step: '2', title: 'Paste the modified text', body: 'Add the updated (after) version to the right panel.' },
      { step: '3', title: 'Review the diff', body: 'Scroll through added (green) and removed (red) lines. Download as a .patch file if needed.' },
    ],
    useCases: [
      { title: 'Code review', body: 'Compare two versions of a function or config file to spot changes before merging.' },
      { title: 'Document editing', body: 'See exactly what changed between two drafts of a report, contract, or policy document.' },
      { title: 'Configuration management', body: 'Compare config files to identify differences between development, staging, and production environments.' },
    ],
    faq: [
      { q: 'Is my code sent to a server?', a: 'No. All diff processing happens entirely in your browser. Your code never leaves your device.' },
      { q: 'What algorithm is used?', a: 'Longest Common Subsequence (LCS) — the same approach used by Git and most professional diff tools.' },
      { q: 'Can I diff non-code text?', a: 'Yes — any text can be diffed: documents, CSV files, JSON, configuration, or prose.' },
      { q: 'What does "Download patch" produce?', a: 'A standard unified diff (.patch file) that can be applied with git apply or the patch command.' },
    ],
  },

  'jwt-decoder': {
    why: 'JWT tokens look like random strings but contain structured JSON with user claims, permissions, and expiry times. Decoding one instantly reveals the full payload — useful for debugging auth issues without writing throwaway code.',
    howTo: [
      { step: '1', title: 'Paste your JWT', body: 'Copy the JWT token (the long eyJ... string) and paste it into the input.' },
      { step: '2', title: 'View the decoded parts', body: 'The header, payload, and signature are decoded and formatted automatically.' },
      { step: '3', title: 'Check expiry and claims', body: 'The tool highlights whether the token is expired and shows all claims in a readable format.' },
    ],
    useCases: [
      { title: 'Authentication debugging', body: 'Verify user roles, permissions, and token expiry in JWTs during development.' },
      { title: 'API integration', body: 'Decode tokens from third-party APIs to understand the claim structure and field names.' },
      { title: 'Security auditing', body: 'Quickly review what data is exposed in JWTs and verify the signing algorithm in the header.' },
    ],
    faq: [
      { q: 'Is my JWT sent to a server?', a: 'No. Decoding is 100% client-side. Your token never leaves your device.' },
      { q: 'Does this verify the JWT signature?', a: 'No — signature verification requires the secret key. This tool only decodes and displays the contents.' },
      { q: 'Is it safe to paste a production JWT here?', a: 'Since nothing is uploaded, it\'s technically safe. Still, treat JWTs as sensitive credentials.' },
      { q: 'What JWT types are supported?', a: 'Any standard JWT in header.payload.signature format, including HS256, RS256, and ES256.' },
    ],
  },

  'sql-formatter': {
    why: 'Raw or minified SQL is slow to read and impossible to review. Proper formatting with consistent keyword casing, logical indentation, and line breaks before major clauses makes queries faster to understand and easier to debug.',
    howTo: [
      { step: '1', title: 'Paste your SQL', body: 'Copy your SQL query and paste it into the input editor.' },
      { step: '2', title: 'Format or minify', body: 'Click Format to prettify with indentation and uppercase keywords, or Minify to collapse to one line.' },
      { step: '3', title: 'Copy the result', body: 'Copy the formatted SQL for use in your code, documentation, or review.' },
    ],
    useCases: [
      { title: 'Code review', body: 'Format SQL before committing to version control for readable, consistent queries.' },
      { title: 'Debugging', body: 'Prettify a complex minified query to understand its structure and spot logical errors.' },
      { title: 'Documentation', body: 'Include well-formatted SQL examples in technical documentation and wiki pages.' },
    ],
    faq: [
      { q: 'Is my SQL sent to a server?', a: 'No. All formatting happens in your browser. Your SQL never leaves your device.' },
      { q: 'What SQL dialects are supported?', a: 'Standard SQL. MySQL, PostgreSQL, and SQLite syntax is generally handled correctly.' },
      { q: 'Does formatting change the query behaviour?', a: 'No — only whitespace and keyword casing are modified. The query logic is identical.' },
      { q: 'Can it format stored procedures?', a: 'Basic procedures format correctly. Complex PL/SQL or T-SQL blocks may not format perfectly.' },
    ],
  },

  'html-minifier': {
    why: 'HTML files contain whitespace, comments, and blank lines added for developer readability that browsers do not need. Removing them reduces payload size, improving Time to First Byte (TTFB) and page load performance.',
    howTo: [
      { step: '1', title: 'Paste your HTML', body: 'Copy your HTML markup and paste it into the input editor.' },
      { step: '2', title: 'Click Minify', body: 'All whitespace, comments, and blank lines are removed instantly.' },
      { step: '3', title: 'Copy the minified HTML', body: 'Copy the minified output and use it in your production build or template.' },
    ],
    useCases: [
      { title: 'Web performance', body: 'Minify HTML templates and static pages to reduce payload size and improve load times.' },
      { title: 'Production build pipelines', body: 'Pre-minify HTML partials before uploading to a CDN or deploying to production servers.' },
      { title: 'HTML email templates', body: 'Minify email HTML to reduce file size and improve deliverability scores.' },
    ],
    faq: [
      { q: 'Is my HTML sent to a server?', a: 'No. Minification happens entirely in your browser. Your HTML never leaves your device.' },
      { q: 'Are IE conditional comments preserved?', a: 'Yes — IE conditional comments (<!--[if IE]>...<![endif]-->) are kept. All other HTML comments are removed.' },
      { q: 'Does minification break inline JavaScript or CSS?', a: 'No — only HTML-level whitespace and comments are removed. Inline scripts and styles are not processed.' },
      { q: 'How much reduction can I expect?', a: 'Typically 10–30% for standard HTML. More if the source has heavy commenting or excessive whitespace.' },
    ],
  },

  'css-minifier': {
    why: 'CSS files written for readability contain comments, whitespace, and consistent formatting that browsers ignore but download anyway. Minifying them removes this overhead and shrinks the render-blocking stylesheet payload.',
    howTo: [
      { step: '1', title: 'Paste your CSS', body: 'Copy your stylesheet and paste it into the input editor.' },
      { step: '2', title: 'Click Minify', body: 'Block comments are removed and whitespace is collapsed to a single compact line.' },
      { step: '3', title: 'Copy the minified CSS', body: 'Copy the output and use it in your production stylesheet.' },
    ],
    useCases: [
      { title: 'Web performance', body: 'Minify production stylesheets to reduce render-blocking CSS payload and improve load times.' },
      { title: 'CDN deployment', body: 'Minify CSS before uploading to a CDN for smaller file transfers and lower bandwidth costs.' },
      { title: 'WordPress & CMS themes', body: 'Minify theme CSS to improve PageSpeed Insights scores without a plugin.' },
    ],
    faq: [
      { q: 'Is my CSS sent to a server?', a: 'No. Minification happens entirely in your browser. Your CSS never leaves your device.' },
      { q: 'Are CSS custom properties (variables) preserved?', a: 'Yes — all CSS including custom properties, calc(), and modern syntax is preserved correctly.' },
      { q: 'Does minification affect CSS specificity?', a: 'No — only whitespace and comments are removed. Selectors, properties, and values are untouched.' },
      { q: 'How much reduction can I expect?', a: 'Typically 20–40% for well-formatted stylesheets with comments.' },
    ],
  },

  'uuid-generator': {
    why: 'UUIDs are the standard way to create collision-free IDs in distributed systems, databases, and APIs. This generator uses your browser\'s cryptographic API to produce truly random v4 UUIDs — not Math.random() pseudo-random values.',
    howTo: [
      { step: '1', title: 'Set the quantity', body: 'Choose how many UUIDs to generate — from 1 to 100 at a time.' },
      { step: '2', title: 'Choose a format', body: 'Select standard, UPPERCASE, no-hyphens, or {braces} format.' },
      { step: '3', title: 'Copy', body: 'Click Copy All to copy every generated UUID to the clipboard at once.' },
    ],
    useCases: [
      { title: 'Database primary keys', body: 'Generate UUIDs for record IDs that work safely across distributed systems without collision.' },
      { title: 'API payloads', body: 'Create unique request IDs and correlation IDs for API requests and event tracking.' },
      { title: 'Test fixtures', body: 'Generate batches of UUIDs for test data, mock objects, and database seed scripts.' },
    ],
    faq: [
      { q: 'Are these truly unique?', a: 'UUID v4 uses 122 random bits — the probability of a collision is astronomically small. Treat them as unique.' },
      { q: 'Is anything sent to a server?', a: 'No. Generation uses crypto.randomUUID() or crypto.getRandomValues() entirely in your browser.' },
      { q: 'What is UUID v4?', a: 'Version 4 UUIDs are randomly generated. They are the most widely used UUID type for general-purpose IDs.' },
      { q: 'Can I generate sortable sequential IDs?', a: 'UUID v4 is random, not sequential. For sortable IDs consider ULIDs instead.' },
    ],
  },

  'markdown-previewer': {
    why: 'Writing Markdown without a preview is guesswork — especially for tables, code blocks, and nested lists. See an accurate HTML rendering in real time so you know exactly how your Markdown will look before publishing or committing it.',
    howTo: [
      { step: '1', title: 'Type or paste Markdown', body: 'Enter your Markdown in the left editor panel.' },
      { step: '2', title: 'See the live preview', body: 'The right panel renders HTML output in real time as you type.' },
      { step: '3', title: 'Copy Markdown or HTML', body: 'Copy the raw Markdown or the rendered HTML output for use in your project.' },
    ],
    useCases: [
      { title: 'README files', body: 'Preview GitHub README.md files locally before committing to ensure formatting is correct.' },
      { title: 'Documentation', body: 'Write and preview technical docs, wikis, and changelogs with instant feedback.' },
      { title: 'Blog posts', body: 'Preview Markdown blog posts before publishing to Ghost, Hugo, Jekyll, or Gatsby.' },
    ],
    faq: [
      { q: 'Which Markdown features are supported?', a: 'GitHub Flavored Markdown (GFM): tables, task lists, strikethrough, fenced code blocks, and standard formatting.' },
      { q: 'Is my content sent to a server?', a: 'No. Markdown is rendered in your browser using the marked library. Nothing is transmitted.' },
      { q: 'Can I export the HTML?', a: 'Yes — click "Copy HTML" to copy the full rendered HTML output.' },
      { q: 'Is syntax highlighting supported in code blocks?', a: 'Code blocks are formatted correctly. Syntax highlighting (colour coding) is not currently applied.' },
    ],
  },

  // ─── Text Tools ───────────────────────────────────────────────────────────

  'word-counter': {
    why: 'Knowing your word count, reading time, and keyword density helps you hit essay requirements, SEO targets, and editorial guidelines. Stats update live as you type — no submit button, no waiting.',
    howTo: [
      { step: '1', title: 'Paste or type your text', body: 'Enter your content in the text area. All stats update in real time.' },
      { step: '2', title: 'Review the stats', body: 'See word count, character count, sentences, paragraphs, estimated reading time, and top keywords.' },
      { step: '3', title: 'Set a target (optional)', body: 'Enter a target word count to see a live progress bar showing how close you are.' },
    ],
    useCases: [
      { title: 'Students', body: 'Verify essay and assignment word counts against minimum and maximum requirements before submitting.' },
      { title: 'SEO writers', body: 'Monitor article length and keyword density to hit on-page SEO targets while writing.' },
      { title: 'Authors & bloggers', body: 'Track article length and estimated reading time to match audience expectations.' },
    ],
    faq: [
      { q: 'Is my text sent to a server?', a: 'No. All analysis happens in your browser. Your text never leaves your device.' },
      { q: 'How is reading time calculated?', a: 'Based on an average adult reading speed of 200–250 words per minute.' },
      { q: 'What are stop words?', a: 'Common words like "the", "a", and "is" that are excluded from keyword density analysis as they carry no meaningful content signal.' },
      { q: 'Is there a length limit?', a: 'No limit — paste documents of any length.' },
    ],
  },

  'case-converter': {
    why: 'Switching between camelCase, snake_case, PascalCase, and kebab-case manually is tedious and error-prone. This tool shows all 11 case variants simultaneously — paste once, copy whichever format you need.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Type or paste the text you want to convert into the input box.' },
      { step: '2', title: 'View all variants', body: 'All 11 case formats are generated and displayed side by side instantly.' },
      { step: '3', title: 'Copy the format you need', body: 'Click the copy icon next to any variant to copy it to your clipboard.' },
    ],
    useCases: [
      { title: 'Developers', body: 'Convert variable names and identifiers between naming conventions across programming languages.' },
      { title: 'Database work', body: 'Convert column names between snake_case (SQL) and camelCase (JavaScript/JSON) quickly.' },
      { title: 'Content writing', body: 'Convert headlines between Title Case, UPPER CASE, and sentence case for different channels.' },
    ],
    faq: [
      { q: 'Is my text sent to a server?', a: 'No. All conversion happens in your browser. Your text never leaves your device.' },
      { q: 'What are the 11 formats?', a: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and aLtErNaTiNg CaSe.' },
      { q: 'Can I use a result as the new input?', a: 'Yes — click "Use as input" next to any result to feed it back in for further conversion.' },
      { q: 'Is there a character limit?', a: 'No limit.' },
    ],
  },

  'lorem-ipsum': {
    why: 'Placeholder text lets designers and developers build layouts without waiting for real copy. Generate classic Lorem Ipsum or randomised text by paragraphs, sentences, or word count — ready to paste straight into your mockup or seed script.',
    howTo: [
      { step: '1', title: 'Choose your unit', body: 'Select paragraphs, sentences, or words as the generation unit.' },
      { step: '2', title: 'Set the quantity', body: 'Enter how many paragraphs, sentences, or words you need.' },
      { step: '3', title: 'Copy', body: 'Copy plain text or the HTML <p> version for direct use in markup.' },
    ],
    useCases: [
      { title: 'UI/UX designers', body: 'Fill wireframe layouts and design mockups with realistic-length placeholder text.' },
      { title: 'Developers', body: 'Populate database seed scripts and test fixtures with varied-length text content.' },
      { title: 'Template builders', body: 'Create email and document templates with placeholder content for client previews.' },
    ],
    faq: [
      { q: 'Is my data sent to a server?', a: 'No. Lorem Ipsum is generated from a local word bank entirely in your browser.' },
      { q: 'What is Lorem Ipsum?', a: 'Derived from Cicero\'s "de Finibus Bonorum et Malorum" (45 BC) and used as typesetting placeholder text since the 1960s.' },
      { q: 'Can I get HTML output?', a: 'Yes — toggle the HTML output option to wrap each paragraph in <p> tags.' },
      { q: 'Is there a generation limit?', a: 'No limit — generate as many paragraphs, sentences, or words as needed.' },
    ],
  },

  'temp-email': {
    why: 'Giving your real email to sign up for a free trial, download a PDF, or access gated content means spam forever. A disposable inbox gets you past the gate and auto-deletes — your real address stays clean permanently.',
    howTo: [
      { step: '1', title: 'Get your temp address', body: 'A disposable email address is generated automatically when you open the page.' },
      { step: '2', title: 'Use it wherever you need to sign up', body: 'Copy the address and enter it on any signup form or gated content page.' },
      { step: '3', title: 'Check your inbox', body: 'Incoming messages appear in the live inbox automatically. The address expires after 30 minutes.' },
    ],
    useCases: [
      { title: 'Free trial signups', body: 'Sign up for software trials without adding your real email to marketing lists.' },
      { title: 'Gated content access', body: 'Access whitepapers, reports, and downloads without the spam consequences.' },
      { title: 'Testing & development', body: 'Verify email flows in your app or test sign-up forms with throwaway inboxes.' },
    ],
    faq: [
      { q: 'How long does the inbox last?', a: 'Default is 30 minutes. You can extend by 15 minutes as many times as you like.' },
      { q: 'Can I receive attachments?', a: 'Yes — attachments are viewable in the inbox during the active session.' },
      { q: 'Is this inbox private?', a: 'Anyone who knows the address can view its inbox. Do not use it for sensitive communications.' },
      { q: 'Can I choose my own address?', a: 'Not currently. Addresses are randomly generated, but you can choose from multiple available domains.' },
    ],
  },

  // ─── Viral Tools ──────────────────────────────────────────────────────────

  'fake-chat-generator': {
    why: 'WhatsApp-style chat screenshots are among the most shared formats on social media. Create realistic fictional conversations instantly for memes, jokes, storytelling, and creative content — no real messages are touched.',
    howTo: [
      { step: '1', title: 'Set participant names', body: 'Enter the display names you want to appear for each side of the conversation.' },
      { step: '2', title: 'Add messages', body: 'Type each message, assign it to a participant, and add a timestamp.' },
      { step: '3', title: 'Export as PNG', body: 'Click Export to download the finished chat screenshot as a PNG image.' },
    ],
    useCases: [
      { title: 'Meme creation', body: 'Create funny fictional conversation screenshots for Twitter, Instagram, and Reddit.' },
      { title: 'Content creators', body: 'Build engaging "conversation format" content for social media and YouTube thumbnails.' },
      { title: 'Creative storytelling', body: 'Illustrate fictional text exchanges in blog posts, articles, and digital stories.' },
    ],
    faq: [
      { q: 'Is this for creating deceptive content?', a: 'This tool is for entertainment and creative purposes only. Using fake screenshots to deceive or defraud is illegal and unethical.' },
      { q: 'Is my content uploaded to a server?', a: 'No. The chat is rendered in your browser using Canvas. Nothing is uploaded.' },
      { q: 'Can I use custom profile photos?', a: 'Currently names are shown as initials. Profile photo support may be added in future.' },
      { q: 'What export formats are available?', a: 'PNG only. The exported image matches the chat preview dimensions.' },
    ],
  },

  'invoice-generator': {
    why: 'Professional invoices build trust with clients and ensure you get paid correctly. You do not need accounting software to create one — fill in your details and line items, and download a clean PDF in under two minutes.',
    howTo: [
      { step: '1', title: 'Fill in business and client details', body: 'Enter your business name, client name, invoice number, and issue/due dates.' },
      { step: '2', title: 'Add line items', body: 'Add each product or service with quantity and unit price. Tax is calculated automatically.' },
      { step: '3', title: 'Save as PDF', body: 'Click Print Invoice which opens your browser print dialog — select "Save as PDF".' },
    ],
    useCases: [
      { title: 'Freelancers', body: 'Create professional invoices for clients without subscribing to accounting software.' },
      { title: 'Small businesses', body: 'Generate quick invoices for one-off sales and services without a billing system.' },
      { title: 'Contractors', body: 'Bill clients on a project basis with detailed line-item breakdowns and tax calculation.' },
    ],
    faq: [
      { q: 'Is my invoice data stored anywhere?', a: 'No. All invoice data exists only in your browser session. Nothing is saved to any server.' },
      { q: 'Can I save and edit an invoice later?', a: 'Not currently — download the PDF immediately as data is not saved between sessions.' },
      { q: 'Does it support multiple currencies?', a: 'Yes — select currency symbols including USD, GBP, EUR, and others.' },
      { q: 'Can I add a company logo?', a: 'Not in the current version. Logo support is planned for a future update.' },
    ],
  },

  'resume-builder': {
    why: 'Resume builder services charge $10–30 per month for basic templates. Build a clean, professional CV in minutes and save it as PDF — completely free, no account required, no watermarks added.',
    howTo: [
      { step: '1', title: 'Fill in your profile', body: 'Enter your contact information, professional summary, and key skills.' },
      { step: '2', title: 'Add experience and education', body: 'Add work history and education entries with dates and bullet-point achievements.' },
      { step: '3', title: 'Save as PDF', body: 'Click Print Resume which opens your browser print dialog — select "Save as PDF".' },
    ],
    useCases: [
      { title: 'Job seekers', body: 'Create a professional resume without paying for a subscription CV building service.' },
      { title: 'Career changers', body: 'Quickly update and reformat a resume for a new industry or role type.' },
      { title: 'Recent graduates', body: 'Build a first resume with proper structure for entry-level applications.' },
    ],
    faq: [
      { q: 'Is my resume data stored?', a: 'No. All data lives only in your browser during the session. Nothing is sent to any server.' },
      { q: 'Can I save and continue editing later?', a: 'Not currently — download the PDF immediately as data is not persisted between sessions.' },
      { q: 'What format does the resume download as?', a: 'PDF, via your browser\'s native print-to-PDF function.' },
      { q: 'Are there multiple template styles?', a: 'Currently one clean professional template. Additional templates are planned.' },
    ],
  },

  'bio-link-generator': {
    why: 'Instagram, TikTok, and Twitter allow only one link in bio. A bio link page hosts all your important links — website, YouTube, shop, social profiles — behind a single shareable URL, with no monthly fees.',
    howTo: [
      { step: '1', title: 'Enter your profile details', body: 'Add your name, bio description, and optional profile image URL.' },
      { step: '2', title: 'Add your links', body: 'Add each link with a title, URL, and optional emoji icon.' },
      { step: '3', title: 'Download or copy the HTML', body: 'Download the self-contained HTML file to host on any server, or copy the code directly.' },
    ],
    useCases: [
      { title: 'Content creators', body: 'Replace paid Linktree with a free custom bio link page you fully own and control.' },
      { title: 'Small businesses', body: 'Create a simple landing page linking to your shop, booking page, and social profiles.' },
      { title: 'Influencers & brands', body: 'Host affiliate links, brand deals, and social channels in one shareable place.' },
    ],
    faq: [
      { q: 'Where is the bio link page hosted?', a: 'You host it yourself — GitHub Pages, Netlify, and Cloudflare Pages all offer free hosting. Upload the HTML file and you\'re live.' },
      { q: 'Is my data sent to a server?', a: 'No. The HTML is generated entirely in your browser. Nothing is uploaded.' },
      { q: 'Can I customise the design?', a: 'Choose from 4 built-in themes. Since you receive raw HTML, you can also edit the code directly for full control.' },
      { q: 'Is there a link limit?', a: 'No limit — add as many links as you want.' },
    ],
  },

  'typing-speed-test': {
    why: 'The average professional types 40–60 WPM. Fast typists reach 80–100+ WPM. Measuring your current speed is the first step to improving — and regular deliberate practice measurably increases WPM over weeks.',
    howTo: [
      { step: '1', title: 'Click on the text area', body: 'Click the passage to focus the hidden input. The timer starts on your first keystroke.' },
      { step: '2', title: 'Type the displayed passage', body: 'Type as fast and accurately as you can. Incorrect characters are highlighted in red as you go.' },
      { step: '3', title: 'See your results', body: 'When you finish the passage, your WPM and accuracy percentage are displayed with a performance rating.' },
    ],
    useCases: [
      { title: 'Professionals', body: 'Measure typing speed to set a baseline and track improvement over time.' },
      { title: 'Students', body: 'Practice before exams and essays that require extended typing sessions.' },
      { title: 'Job applicants', body: 'Prepare for jobs that list minimum WPM requirements (data entry, transcription, admin roles).' },
    ],
    faq: [
      { q: 'How is WPM calculated?', a: 'Words Per Minute = (words typed) ÷ (time in minutes). A "word" is standardised as 5 characters.' },
      { q: 'What is a good WPM?', a: 'Below 40: slow. 40–70: average. 70–100: fast. Above 100: excellent. Top typists exceed 120 WPM.' },
      { q: 'Is my typing data recorded?', a: 'No. The test runs entirely in your browser. Nothing is recorded or uploaded.' },
      { q: 'Can I choose the passage?', a: 'A random passage is selected each time. Click "New Passage" to get a different one.' },
    ],
  },
}
