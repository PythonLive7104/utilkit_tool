export const toolSeo = {
  'pdf-to-word': {
    title: 'PDF to Word Converter — Free Online Text Extractor | UtilKit',
    description: 'Convert PDF to editable text instantly. Extract all content from any PDF file into a .txt file with paragraphs preserved — free, no sign-up, works in your browser.',
    benefits: [
      { title: 'No upload required', description: 'Your PDF never leaves your device. Extraction runs entirely inside your browser using PDF.js.' },
      { title: 'Preserves structure', description: 'Paragraphs, headings, and line breaks are preserved so the output reads like the original document.' },
      { title: 'Works on any PDF', description: 'Supports text-based PDFs up to 10 MB. Works with multi-page documents, reports, and academic papers.' },
      { title: 'Instant download', description: 'Extracted text is packaged as a .txt file you can open in Word, Google Docs, or any text editor.' },
    ],
    howTo: {
      title: 'How to convert a PDF to editable text',
      steps: [
        'Click "Browse" or drag your PDF file into the upload zone.',
        'Optionally set a page range (e.g. pages 1–5) to extract only the section you need.',
        'Click "Extract Text" and wait a moment while PDF.js processes each page.',
        'Review the extracted text preview, then click "Download .txt" to save the file.',
      ],
    },
    examples: [
      { title: 'Academic research', description: 'Pull text from a journal PDF to quote in a paper or run through a plagiarism checker.' },
      { title: 'Contract review', description: 'Extract clauses from a scanned contract PDF to paste into a document editor for redlining.' },
      { title: 'Data extraction', description: 'Pull structured data like tables or lists from a PDF report into a spreadsheet-friendly format.' },
    ],
    faq: [
      { q: 'Does this work on scanned PDFs?', a: 'No — scanned PDFs are images, not text. This tool extracts embedded text. For scanned documents you need an OCR (optical character recognition) tool.' },
      { q: 'Will formatting like bold and tables be preserved?', a: 'The output is plain text (.txt), so visual formatting like bold, italic, and table borders are not carried over. Paragraph and line breaks are preserved.' },
      { q: 'Is there a file size limit?', a: 'PDFs up to 10 MB are supported. Very large files may take a few seconds longer to process depending on page count.' },
      { q: 'Does it work on password-protected PDFs?', a: 'No. Password-protected PDFs cannot be read without the password. You would need to unlock the PDF first.' },
      { q: 'Can I extract only specific pages?', a: 'Yes. Use the page range inputs (From / To) to extract only the pages you need instead of the entire document.' },
    ],
    related: ['word-to-pdf', 'merge-pdf', 'compress-pdf', 'split-pdf'],
  },

  'word-to-pdf': {
    title: 'Word to PDF Converter — Free Online | UtilKit',
    description: 'Convert text documents to PDF instantly in your browser. Paste any text, choose your font and layout, and save as PDF — no Word or Adobe required.',
    benefits: [
      { title: 'No software needed', description: 'Uses the browser\'s built-in print-to-PDF capability — no Word, Adobe, or LibreOffice required.' },
      { title: 'Full layout control', description: 'Choose font family, font size, line height, and page margins before generating the PDF.' },
      { title: 'Instant and private', description: 'Nothing is uploaded. Your text stays in the browser and is never sent to a server.' },
      { title: 'Universal output', description: 'The saved PDF opens correctly in every PDF viewer on any device or operating system.' },
    ],
    howTo: {
      title: 'How to create a PDF from text',
      steps: [
        'Paste or type your content into the text editor.',
        'Choose a font (Georgia, Arial, Times New Roman, etc.) and adjust size, line height, and margins.',
        'Click "Convert to PDF" — a print preview will open.',
        'In the print dialog, choose "Save as PDF" as the destination and click Save.',
      ],
    },
    examples: [
      { title: 'Cover letters', description: 'Write a cover letter in the editor, style it with a professional font, and export as a PDF to attach to a job application.' },
      { title: 'Invoices', description: 'Paste invoice content, set clean formatting, and save as PDF to send to a client.' },
      { title: 'Meeting notes', description: 'Convert plain-text meeting notes into a shareable, printable PDF in seconds.' },
    ],
    faq: [
      { q: 'Can I upload a .docx Word file?', a: 'This tool works with pasted or typed text rather than .docx file uploads. For .docx conversion, paste the content into the editor first.' },
      { q: 'Why does it open a print dialog?', a: 'The browser\'s print-to-PDF engine produces high-quality, universally compatible PDFs. Choose "Save as PDF" in the destination dropdown of the print dialog.' },
      { q: 'Can I add images to the PDF?', a: 'Currently only text content is supported. Image embedding is not available in this version.' },
      { q: 'What fonts are available?', a: 'Georgia, Times New Roman, Arial, Helvetica Neue, and Courier New — all system fonts guaranteed to render correctly.' },
      { q: 'Will the PDF look different on different devices?', a: 'No. PDF is a fixed-layout format. The styling you set will appear identically on every device and OS.' },
    ],
    related: ['pdf-to-word', 'merge-pdf', 'compress-pdf'],
  },

  'merge-pdf': {
    title: 'Merge PDF Files Online — Free PDF Combiner | UtilKit',
    description: 'Combine multiple PDF files into one document in seconds. Drag to reorder, see page counts, and download the merged PDF — entirely in your browser.',
    benefits: [
      { title: 'Drag-to-reorder', description: 'Rearrange files in any order before merging using the drag handles — no re-uploading needed.' },
      { title: 'See page counts', description: 'Each uploaded file shows its page count so you know exactly what will be in the merged document.' },
      { title: 'No file limit', description: 'Merge as many PDFs as you need in a single operation. Total size is limited only by available browser memory.' },
      { title: 'No watermarks', description: 'The merged PDF is clean — no added watermarks, branding, or metadata from this tool.' },
    ],
    howTo: {
      title: 'How to merge PDF files',
      steps: [
        'Click "Add PDFs" or drag multiple PDF files into the upload zone.',
        'Review the file list — each file shows its name and page count.',
        'Drag the handle icons to reorder files into the sequence you want.',
        'Click "Merge PDFs" and download the combined file when processing completes.',
      ],
    },
    examples: [
      { title: 'Report assembly', description: 'Combine a title page, main report body, and appendix PDFs into a single submission-ready document.' },
      { title: 'Invoice batching', description: 'Merge multiple monthly invoices into one PDF for archiving or sending to an accountant.' },
      { title: 'Portfolio compilation', description: 'Combine individual project PDFs into a single portfolio to share with a client or employer.' },
    ],
    faq: [
      { q: 'Is there a limit to how many PDFs I can merge?', a: 'No hard limit — you can add as many files as your browser\'s memory allows. Most modern browsers handle 20+ files without issue.' },
      { q: 'Will the merged PDF keep the original page sizes?', a: 'Yes. Each page retains its original dimensions. If files have mixed sizes (A4 and Letter), each page keeps its own size in the merged output.' },
      { q: 'Can I remove a file after adding it?', a: 'Yes. Click the ✕ button next to any file in the list to remove it before merging.' },
      { q: 'Does merging compress the files?', a: 'No. The merged PDF preserves original quality. If you need to reduce size, use the Compress PDF tool on the merged result.' },
      { q: 'Are password-protected PDFs supported?', a: 'No. Password-protected PDFs cannot be read or merged. Remove the password protection first.' },
    ],
    related: ['split-pdf', 'compress-pdf', 'pdf-to-word'],
  },

  'compress-pdf': {
    title: 'Compress PDF Online — Reduce PDF File Size Free | UtilKit',
    description: 'Reduce PDF file size by up to 70% with three quality presets. Perfect for email attachments and web uploads. No sign-up, works in your browser.',
    benefits: [
      { title: 'Up to 70% size reduction', description: 'The Low quality preset re-renders pages at maximum compression, typically reducing file size by 60–70%.' },
      { title: 'Three presets', description: 'Low (max reduction), Medium (balanced), and High (near-original) let you choose the right trade-off for your use case.' },
      { title: 'Progress tracking', description: 'A live progress bar shows which page is being processed so you know the tool is working on large documents.' },
      { title: 'Side-by-side comparison', description: 'Original and compressed file sizes are shown together so you can see exactly how much space was saved.' },
    ],
    howTo: {
      title: 'How to compress a PDF',
      steps: [
        'Upload your PDF (up to 10 MB) by clicking "Browse" or dragging it into the zone.',
        'Choose a compression level: Low for smallest size, Medium for balance, High for best quality.',
        'Click "Compress PDF" and watch the page-by-page progress bar.',
        'Review the size comparison, then download the compressed PDF.',
      ],
    },
    examples: [
      { title: 'Email attachments', description: 'Reduce a 8 MB presentation PDF to under 2 MB so it fits within common email attachment limits.' },
      { title: 'Website uploads', description: 'Compress a product brochure PDF before uploading it to a website to improve page load speed.' },
      { title: 'Cloud storage', description: 'Batch-compress archived PDFs to save storage space in Google Drive or Dropbox.' },
    ],
    faq: [
      { q: 'Why does the High preset only reduce by ~20%?', a: 'High quality re-renders pages at near-original resolution, which leaves limited room for compression. Use Low or Medium for significant size reduction.' },
      { q: 'Will text still be readable after compression?', a: 'Yes. Even at Low quality, text remains crisp and legible. The reduction mainly affects image quality within the PDF.' },
      { q: 'Does compression affect hyperlinks or form fields?', a: 'Yes. This tool re-renders each page as an image, so interactive elements like hyperlinks, form fields, and bookmarks are not preserved.' },
      { q: 'What is the maximum file size?', a: 'PDFs up to 10 MB are supported. For larger files, consider splitting the PDF first, compressing each part, then merging again.' },
      { q: 'Can I compress a PDF that has already been compressed?', a: 'Yes, but gains will be smaller. Each compression pass has diminishing returns — after the first pass, further compression produces little additional reduction.' },
    ],
    related: ['merge-pdf', 'split-pdf', 'pdf-to-word'],
  },

  'split-pdf': {
    title: 'Split PDF Online — Extract Pages Free | UtilKit',
    description: 'Split a PDF into individual pages or custom page ranges. Extract exactly the pages you need — free, instant, no account required.',
    benefits: [
      { title: 'Custom page ranges', description: 'Enter any combination of pages and ranges (e.g. "1-3, 5, 8-10") to extract exactly what you need.' },
      { title: 'Quick presets', description: '"Every N pages" presets (1, 2, 5, 10) let you split large documents evenly with one click.' },
      { title: 'Live page count', description: 'The tool reads your PDF and shows the total page count before you split, so you know the exact range available.' },
      { title: 'Pages selected preview', description: 'A live counter shows how many pages your range covers before you click Split.' },
    ],
    howTo: {
      title: 'How to split a PDF',
      steps: [
        'Upload your PDF — the tool will read and display the total page count.',
        'Enter a page range manually (e.g. "2-5, 8") or click a preset like "Every 2 pages".',
        'Review the "N pages selected" counter to confirm your selection.',
        'Click "Split PDF" and download the extracted pages as a new PDF.',
      ],
    },
    examples: [
      { title: 'Extract a chapter', description: 'Pull pages 45–92 out of a 300-page textbook PDF to share only that chapter with students.' },
      { title: 'Remove a blank page', description: 'Split out all pages except the unwanted blank page, then merge the remaining parts.' },
      { title: 'Separate an appendix', description: 'Extract the last 10 pages from a report to distribute the appendix as a standalone reference.' },
    ],
    faq: [
      { q: 'Can I extract non-consecutive pages?', a: 'Yes. Enter comma-separated values and ranges — for example "1, 3, 5-8" extracts pages 1, 3, and 5 through 8.' },
      { q: 'Does the output maintain original quality?', a: 'Yes. Pages are extracted at full original quality with no re-rendering or compression.' },
      { q: 'Can I split into multiple separate files?', a: 'Currently the tool outputs a single PDF containing your selected pages. For multiple splits, repeat the process with different ranges.' },
      { q: 'What happens to interactive elements on extracted pages?', a: 'Hyperlinks and text content are preserved in the extracted pages. Form fields may vary depending on the original PDF structure.' },
      { q: 'Is there a page count limit?', a: 'No. The tool handles any page count. Very large PDFs (500+ pages) may take a moment to load and process.' },
    ],
    related: ['merge-pdf', 'compress-pdf', 'pdf-to-word'],
  },

  'image-converter': {
    title: 'Image Format Converter — JPG PNG WebP Free Online | UtilKit',
    description: 'Convert images between JPG, PNG, and WebP instantly. Batch convert up to 10 files at once, adjust quality, and download — all in your browser.',
    benefits: [
      { title: 'Batch conversion', description: 'Convert up to 10 images at once. Upload multiple files and get them all converted in a single click.' },
      { title: 'Three web formats', description: 'Supports JPG, PNG, and WebP — the three formats that cover 100% of web and device use cases.' },
      { title: 'Quality control', description: 'For JPG and WebP (lossy formats), a quality slider lets you balance file size against visual quality.' },
      { title: 'Size comparison', description: 'Each converted file shows original vs. converted size so you can see the exact byte savings.' },
    ],
    howTo: {
      title: 'How to convert image formats',
      steps: [
        'Upload up to 10 image files by dropping them or clicking "Browse".',
        'Select the output format: JPG, PNG, or WebP.',
        'For JPG or WebP, adjust the quality slider (85% is a good default).',
        'Click "Convert" and download individual files or use "Download All".',
      ],
    },
    examples: [
      { title: 'PNG to WebP for web', description: 'Convert a set of PNG product images to WebP to reduce page load time — WebP is typically 25–35% smaller than PNG.' },
      { title: 'JPG to PNG for transparency', description: 'Convert a JPG logo to PNG when you need a transparent background version.' },
      { title: 'WebP to JPG for compatibility', description: 'Convert WebP images to JPG for use in older apps, email clients, or systems that don\'t support WebP.' },
    ],
    faq: [
      { q: 'What happens to transparency when converting to JPG?', a: 'JPG does not support transparency. Any transparent areas in PNG or WebP images will be replaced with a white background when converting to JPG.' },
      { q: 'Does converting from JPG to PNG improve quality?', a: 'No. Converting from a lossy format (JPG) to lossless (PNG) doesn\'t recover lost quality — it only increases file size. Use PNG originals for best results.' },
      { q: 'Is WebP supported everywhere?', a: 'WebP is supported in all modern browsers (Chrome, Firefox, Safari 14+, Edge). It\'s safe for web use but may not work in older software or email clients.' },
      { q: 'What quality setting should I use?', a: '85% is a good balance for most images. Go lower (60–70%) for web thumbnails where speed matters more. Use 90%+ for images that will be printed or zoomed.' },
      { q: 'Can I convert GIF files?', a: 'You can upload GIFs, but only the first frame will be converted. Animated GIFs are not supported as the output is a static image.' },
    ],
    related: ['image-compressor', 'image-resizer', 'background-remover'],
  },

  'image-compressor': {
    title: 'Image Compressor — Reduce Image File Size Free | UtilKit',
    description: 'Compress JPG and PNG images online without losing visible quality. Set a target file size in KB or use the quality slider. Free, instant, in-browser.',
    benefits: [
      { title: 'Target size mode', description: 'Enter a target in KB and the tool automatically runs a binary search to find the optimal quality level that hits your target.' },
      { title: 'Quality slider', description: 'Manually control compression from 5–100%. Values between 65–80 give the best balance for most photos.' },
      { title: 'Shows quality used', description: 'The result displays exactly what quality percentage was used — useful when using target size mode to know the trade-off.' },
      { title: '100% private', description: 'Compression uses the HTML Canvas API — your images never leave the browser or touch a server.' },
    ],
    howTo: {
      title: 'How to compress an image',
      steps: [
        'Upload a JPG or PNG image (up to 10 MB) by dropping it or clicking "Browse".',
        'Either set a target size in KB (e.g. 150 KB) or adjust the quality slider manually.',
        'Click "Compress Image" — the tool will find the optimal compression settings.',
        'Compare original and compressed sizes, then download the result.',
      ],
    },
    examples: [
      { title: 'Email attachment limit', description: 'Compress a 2.5 MB photo to under 1 MB before attaching to an email that has a 1 MB per-attachment limit.' },
      { title: 'Web page optimisation', description: 'Reduce hero images from 800 KB to under 150 KB to improve page load speed and Google PageSpeed score.' },
      { title: 'Social media upload', description: 'Compress images to meet Instagram\'s recommended file size while maintaining visible quality on mobile screens.' },
    ],
    faq: [
      { q: 'Will I be able to see the quality difference?', a: 'At 65–80% quality, the difference is typically invisible at normal viewing sizes. Below 50%, some artefacts become visible on photos with fine detail.' },
      { q: 'Does it compress PNG files?', a: 'Yes. PNG files are re-encoded as JPEG during compression (except at 95%+ quality). If you need to keep PNG format, use the Image Converter to convert back after compressing.' },
      { q: 'What does the target size option do?', a: 'It runs an automatic binary search across quality levels (5–95%) to find the setting that produces a file closest to your target KB, without going over.' },
      { q: 'Is there a maximum file size?', a: 'Images up to 10 MB are supported. Very high-resolution images (over 20 megapixels) may be slow to process in-browser.' },
      { q: 'Can I compress multiple images at once?', a: 'Currently one image at a time. For batch compression, use the Image Converter tool which supports up to 10 files simultaneously.' },
    ],
    related: ['image-converter', 'image-resizer', 'background-remover'],
  },

  'background-remover': {
    title: 'Remove Image Background Online — Free AI Tool | UtilKit',
    description: 'Remove backgrounds from photos automatically using AI. Get a transparent PNG or choose a custom background colour. Fast, accurate, no design skills needed.',
    benefits: [
      { title: 'AI-powered accuracy', description: 'Advanced AI precisely traces around hair, fur, and complex edges that would take minutes to do manually in Photoshop.' },
      { title: 'Custom background colours', description: 'Keep the background transparent, replace it with white, black, or any custom hex colour — all before downloading.' },
      { title: 'PNG and JPEG output', description: 'Download as transparent PNG for layered use or as JPEG with a flat background for smaller file size.' },
      { title: 'Instant side-by-side preview', description: 'Original and result are shown side by side with the actual background colour so you can see exactly what you\'re getting.' },
    ],
    howTo: {
      title: 'How to remove an image background',
      steps: [
        'Upload a JPG or PNG photo (up to 5 MB) by dropping it or clicking "Browse".',
        'Choose an output background: Transparent, White, Black, or a Custom colour.',
        'Click "Remove Background" and wait a few seconds for AI processing.',
        'Review the before/after preview, then download as PNG or JPEG.',
      ],
    },
    examples: [
      { title: 'Product photography', description: 'Remove the background from product photos to place them on a clean white background for an online store listing.' },
      { title: 'Profile photos', description: 'Remove a messy background from a selfie and replace it with a solid colour for a professional LinkedIn headshot.' },
      { title: 'Stickers and graphics', description: 'Cut out a subject from a photo as a transparent PNG to use as a sticker, overlay, or graphic element in a design.' },
    ],
    faq: [
      { q: 'What types of images work best?', a: 'Photos with a clear subject (person, product, animal, object) against a distinct background. Complex scenes with multiple overlapping subjects may have lower accuracy.' },
      { q: 'Does it work on logos or illustrations?', a: 'It works best on photographs. For simple logos or illustrations with solid backgrounds, the result is usually good. Complex illustrated scenes may not process well.' },
      { q: 'Why is the file size limit 5 MB?', a: 'The AI processes the image at the server — larger files take longer and consume more API credits. 5 MB covers most camera and phone photos at full resolution.' },
      { q: 'Is my photo stored anywhere?', a: 'No. The image is processed and the result is returned immediately. No images are stored after the response is sent.' },
      { q: 'Can I change the background colour after downloading?', a: 'If you download as a transparent PNG, you can place it on any background in any image editor. Use the custom colour option here to apply a background before downloading if you don\'t have an editor.' },
    ],
    related: ['image-converter', 'image-compressor', 'image-resizer'],
  },

  'image-resizer': {
    title: 'Image Resizer — Resize Images Online Free | UtilKit',
    description: 'Resize images to exact pixel dimensions or social media presets. Fit, fill, or exact resize modes. Instant download as PNG — free and in-browser.',
    benefits: [
      { title: 'Social media presets', description: 'One-click presets for Instagram Square, Twitter Post, YouTube Thumbnail, Facebook Cover, LinkedIn Banner, and OG Image.' },
      { title: 'Three resize modes', description: 'Exact stretches to fill, Fit preserves ratio with padding, Fill crops to cover — choose the right mode for each use case.' },
      { title: 'Aspect ratio lock', description: 'Lock icon keeps width and height proportional so you never accidentally stretch or squish an image.' },
      { title: 'Original dimensions shown', description: 'See the source image\'s pixel dimensions before resizing so you know if you\'re scaling up or down.' },
    ],
    howTo: {
      title: 'How to resize an image',
      steps: [
        'Upload your image by dropping it or clicking "Browse" — the original dimensions are shown automatically.',
        'Enter custom width and height in pixels, or click a social media preset.',
        'Choose a resize mode: Exact, Fit (with padding), or Fill (crop to cover).',
        'Click "Resize Image" and download the result as PNG.',
      ],
    },
    examples: [
      { title: 'Instagram post', description: 'Resize any photo to 1080×1080px for a perfectly square Instagram post without distortion using Fit mode.' },
      { title: 'YouTube thumbnail', description: 'Resize a screenshot or graphic to the standard 1280×720px YouTube thumbnail size.' },
      { title: 'Email header', description: 'Resize a banner image to an exact width to fit inside an email template without horizontal scrolling.' },
    ],
    faq: [
      { q: 'What is the difference between Fit, Fill, and Exact?', a: 'Exact stretches the image to your exact dimensions regardless of ratio. Fit places the image inside your dimensions and pads the rest with white. Fill scales the image to cover the full area and crops any overflow.' },
      { q: 'Can I resize to a smaller size than the original?', a: 'Yes. Downscaling (making smaller) always works well. Upscaling (making larger than the original) works but may appear blurry since no new pixel information is added.' },
      { q: 'Why is the output always PNG?', a: 'PNG is lossless, so the resized image has no additional compression artefacts. If you need JPEG or WebP output, use the Image Converter after resizing.' },
      { q: 'Does it preserve transparency?', a: 'Yes for PNG inputs. Transparent areas remain transparent in the output PNG. Only the Fit mode adds a white background fill in padded areas.' },
      { q: 'Can I set dimensions in cm or inches?', a: 'Currently only pixel dimensions are supported. For print sizing, multiply your target inches by your DPI (e.g. 4 inches at 300 DPI = 1200 pixels).' },
    ],
    related: ['image-converter', 'image-compressor', 'background-remover'],
  },

  'qr-code-generator': {
    title: 'QR Code Generator — Free Custom QR Codes Online | UtilKit',
    description: 'Generate QR codes for URLs, text, email, phone, and Wi-Fi. Customise colour and error correction level. Download as PNG — free, instant, no sign-up.',
    benefits: [
      { title: 'Five content types', description: 'Generate QR codes for URLs, plain text, email addresses, phone numbers, and Wi-Fi network credentials.' },
      { title: 'Custom colours', description: 'Change the foreground colour using a colour picker or hex input — create branded QR codes that match your design.' },
      { title: 'Error correction levels', description: 'L, M, Q, and H error correction levels allow a QR code to remain scannable even if up to 30% is obscured or damaged.' },
      { title: 'Four size options', description: '200px, 400px, 600px, and 800px output sizes — choose the right resolution for screen or print use.' },
    ],
    howTo: {
      title: 'How to create a QR code',
      steps: [
        'Select the content type: URL, Text, Email, Phone, or Wi-Fi.',
        'Enter the content — a URL, your phone number, or Wi-Fi credentials.',
        'Optionally change the foreground colour and select an error correction level.',
        'The QR code generates automatically. Click "Download PNG" to save it.',
      ],
    },
    examples: [
      { title: 'Restaurant menu', description: 'Create a QR code linking to an online menu URL and print it on table cards so customers can scan to view the menu.' },
      { title: 'Wi-Fi sharing', description: 'Generate a Wi-Fi QR code for your home or office network so guests can connect without typing the password.' },
      { title: 'Business card', description: 'Add a QR code linking to your LinkedIn profile or personal website to a business card.' },
    ],
    faq: [
      { q: 'What error correction level should I use?', a: 'M (15% recovery) is suitable for most uses. Use H (30%) if you plan to overlay a logo on the QR code, since the logo will cover part of it. Use L only if you need the smallest possible QR code.' },
      { q: 'How do I share the QR code without downloading?', a: 'Click the Copy button next to the Download button — it copies the original content (URL, text, etc.) to your clipboard, not the QR image itself.' },
      { q: 'Can I create a QR code for a vCard or contact?', a: 'Use the Text type and enter vCard format data. Most smartphones can read vCard QR codes and offer to save the contact directly.' },
      { q: 'What is the maximum amount of data a QR code can hold?', a: 'A standard QR code holds up to about 3,000 characters (alphanumeric). Longer content produces a denser, harder-to-scan code. Keep URLs short for best results.' },
      { q: 'Can I use a coloured QR code?', a: 'Yes — the colour picker lets you set any foreground colour. Ensure there is strong contrast with the background (white is recommended) for reliable scanning.' },
    ],
    related: ['url-shortener', 'password-generator'],
  },

  'url-shortener': {
    title: 'URL Shortener — Free Link Shortener with QR Code | UtilKit',
    description: 'Shorten long URLs into compact links. Add a custom slug, set an expiry date, track click counts, and generate a QR code — free, no account needed.',
    benefits: [
      { title: 'Custom slugs', description: 'Create memorable short links like /s/my-project instead of a random code. Great for sharing in presentations or print.' },
      { title: 'Expiry dates', description: 'Set links to expire after 1 day, 7 days, 30 days, or up to 1 year — useful for time-limited promotions or event links.' },
      { title: 'Click tracking', description: 'See how many times each short link has been clicked, shown live in your session history.' },
      { title: 'Built-in QR code', description: 'Generate a scannable QR code for any short link with one click and download it as a PNG.' },
    ],
    howTo: {
      title: 'How to shorten a URL',
      steps: [
        'Paste your long URL into the input field.',
        'Optionally enter a custom slug (e.g. "my-event") and choose an expiry period.',
        'Click "Shorten URL" — your short link appears instantly.',
        'Copy the link or click the QR icon to generate a scannable code.',
      ],
    },
    examples: [
      { title: 'Event invitations', description: 'Shorten a long event registration URL to share via SMS or print on a flyer, with a 30-day expiry set for after the event.' },
      { title: 'Marketing campaigns', description: 'Create a memorable slug like /s/summer-sale for a campaign link you\'ll use across social media and email.' },
      { title: 'Presentations', description: 'Replace a long resource URL with a short link (and QR code) on a presentation slide so attendees can easily access it.' },
    ],
    faq: [
      { q: 'Are short links permanent?', a: 'By default, links never expire. You can optionally set an expiry date when creating the link. Links can also be deleted manually from your session history.' },
      { q: 'Can two people use the same custom slug?', a: 'No — slugs are unique across the system. If the slug you entered is already taken, you\'ll be prompted to choose a different one.' },
      { q: 'Is there a limit to how many links I can create?', a: 'There\'s no hard limit for normal use. Rate limiting prevents abuse, allowing up to 100 requests per minute per user.' },
      { q: 'Can I edit a short link after creating it?', a: 'Currently links cannot be edited after creation. Delete the link from your history and create a new one if you need to change the destination.' },
      { q: 'Are short links public?', a: 'The redirect is public — anyone with the short link can use it. The link is not listed or discoverable; only people you share it with can access it.' },
    ],
    related: ['qr-code-generator', 'temp-email'],
  },

  'password-generator': {
    title: 'Password Generator — Strong Random Passwords Free | UtilKit',
    description: 'Generate cryptographically strong passwords, memorable passphrases, or numeric PINs. Uses crypto.getRandomValues() — nothing sent to any server.',
    benefits: [
      { title: 'Cryptographically random', description: 'Uses the browser\'s crypto.getRandomValues() — the same entropy source used by professional password managers.' },
      { title: 'Three generation modes', description: 'Random passwords, memorable passphrases (e.g. river-maple-frost), and numeric PINs in one tool.' },
      { title: 'Live strength indicator', description: 'Shows entropy in bits and a strength label (Weak / Fair / Strong / Very Strong) that updates as you change settings.' },
      { title: 'Batch generation', description: 'Generate 1, 3, 5, or 10 passwords at once — useful for setting up multiple accounts or testing password policies.' },
    ],
    howTo: {
      title: 'How to generate a strong password',
      steps: [
        'Choose a mode: Password, Passphrase, or PIN.',
        'For passwords: set length (8–128) and which character types to include.',
        'For passphrases: choose word count (3–8) and separator character.',
        'Click "Generate" and copy the password you want to use.',
      ],
    },
    examples: [
      { title: 'Account passwords', description: 'Generate a 20-character random password with all character types for a new bank or email account.' },
      { title: 'Memorable master password', description: 'Use passphrase mode to create a 5-word phrase like "orbit-flame-crisp-lunar-delta" that is both strong and memorable for a password manager.' },
      { title: 'Device PIN', description: 'Generate a random 6 or 8-digit PIN for a phone lock screen or security device.' },
    ],
    faq: [
      { q: 'Is this password generator truly random?', a: 'Yes. It uses crypto.getRandomValues(), which provides cryptographically secure randomness from the operating system\'s entropy source — not a predictable pseudo-random algorithm.' },
      { q: 'Are generated passwords stored anywhere?', a: 'No. Passwords are generated entirely in your browser and never transmitted or stored. Close the tab and they are gone.' },
      { q: 'How long should my password be?', a: 'For important accounts (email, banking), 16+ characters with mixed types gives 80+ bits of entropy — considered very strong. For less critical accounts, 12 characters is generally sufficient.' },
      { q: 'What is a passphrase and is it as secure as a random password?', a: 'A passphrase is multiple random words joined together. A 5-word passphrase from a 100-word list provides about 83 bits of entropy — equivalent to a 13-character random password, but far easier to remember.' },
      { q: 'Should I exclude ambiguous characters?', a: 'Use the "Exclude ambiguous" option when a password will be typed manually — characters like 0, O, l, and 1 are easy to mistake. If you\'re pasting the password, ambiguous characters are fine.' },
    ],
    related: ['temp-email', 'url-shortener', 'base64'],
  },

  'json-formatter': {
    title: 'JSON Formatter & Validator — Prettify & Minify JSON Free | UtilKit',
    description: 'Prettify, minify, and validate JSON instantly. Sort keys alphabetically, view structure stats, and download formatted JSON — all in your browser.',
    benefits: [
      { title: 'Prettify and minify', description: 'Format raw JSON with 2-space, 4-space, or tab indentation. Minify JSON to a single line for API payloads or config files.' },
      { title: 'Structure stats', description: 'See the total key count, nesting depth, and a breakdown of value types (strings, numbers, booleans, nulls, arrays, objects).' },
      { title: 'Sort keys', description: 'Alphabetically sort all object keys recursively — useful for comparing two JSON blobs or producing deterministic output.' },
      { title: 'File import & export', description: 'Load a .json file directly from disk and download the formatted output as a new .json file.' },
    ],
    howTo: {
      title: 'How to format JSON',
      steps: [
        'Paste your raw JSON into the input panel, or click "Load file" to open a .json file.',
        'Click "Prettify" to format with indentation, "Minify" for a single-line version, or "Validate" to check for syntax errors.',
        'Optionally enable "Sort keys" for alphabetically ordered output.',
        'Copy the output or click ".json" to download the formatted file.',
      ],
    },
    examples: [
      { title: 'API response debugging', description: 'Paste a minified API response to immediately see a readable, indented structure for debugging.' },
      { title: 'Config file validation', description: 'Validate a package.json or tsconfig.json before committing to catch syntax errors early.' },
      { title: 'Data comparison', description: 'Prettify and sort keys on two JSON blobs to make them directly comparable in a diff tool.' },
    ],
    faq: [
      { q: 'Why does validation fail on my JSON?', a: 'Common issues: trailing commas (not valid JSON), single quotes instead of double quotes, unquoted keys, or comments (JSON does not support comments). The error message shows the exact position of the problem.' },
      { q: 'What is the difference between JSON and JSON5?', a: 'JSON5 is a superset that allows comments, trailing commas, and single quotes. This tool validates strict JSON (RFC 8259). If your file has those features, it\'s JSON5 and needs a different parser.' },
      { q: 'Does sorting keys change the data?', a: 'No — JSON objects are unordered by definition. Sorting only affects the visual order of keys in the output; the data and values are unchanged.' },
      { q: 'Is there a size limit for JSON input?', a: 'No hard limit — the browser\'s memory is the practical limit. Very large files (10 MB+) may be slow to format. For large files, consider using a command-line tool like jq.' },
      { q: 'Can I use this to format JSONL (JSON Lines)?', a: 'JSONL is one JSON object per line, not a single JSON value. You would need to process each line individually — paste one object at a time into this tool.' },
    ],
    related: ['base64', 'regex-tester', 'code-diff'],
  },

  'base64': {
    title: 'Base64 Encoder & Decoder — Free Online Tool | UtilKit',
    description: 'Encode text or files to Base64 and decode Base64 strings back to content. Supports URL-safe Base64 and MIME line wrapping. Instant, in-browser.',
    benefits: [
      { title: 'Text and file encoding', description: 'Encode plain text strings or entire binary files (images, PDFs, any format) to Base64 with one click.' },
      { title: 'URL-safe variant', description: 'Toggle URL-safe mode to replace + and / with - and _ and remove padding — safe for use in URLs and filenames.' },
      { title: 'MIME line wrapping', description: 'Optional 76-character line wrapping produces MIME-compliant Base64 for use in email attachments and multipart form data.' },
      { title: 'Byte count display', description: 'Shows input and output byte sizes so you can see exactly how much the ~33% Base64 size overhead adds.' },
    ],
    howTo: {
      title: 'How to encode or decode Base64',
      steps: [
        'Choose Encode or Decode mode using the toggle at the top.',
        'Paste your text into the input panel, or click "Encode file" to load a binary file.',
        'Optionally enable URL-safe mode or 76-char line wrap.',
        'Click "Encode" or "Decode" and copy the output or click "Save file" to download.',
      ],
    },
    examples: [
      { title: 'Data URI for images', description: 'Encode a small icon as Base64 to embed directly in HTML or CSS as a data: URI, eliminating an extra HTTP request.' },
      { title: 'JWT inspection', description: 'Decode the payload section of a JWT token (the second segment) to read the claims without running backend code.' },
      { title: 'API authentication', description: 'Encode "username:password" to Base64 to construct an HTTP Basic Authentication header value.' },
    ],
    faq: [
      { q: 'What is Base64 used for?', a: 'Base64 encodes binary data as ASCII text. It\'s used in data URIs, JWT tokens, email attachments (MIME), HTTP Basic Auth headers, and anywhere binary data needs to be embedded in a text context.' },
      { q: 'Is Base64 encryption?', a: 'No. Base64 is encoding, not encryption. Anyone can decode a Base64 string — it provides no security. Never use it to protect sensitive data.' },
      { q: 'What is the difference between standard and URL-safe Base64?', a: 'Standard Base64 uses + and / which have special meaning in URLs. URL-safe mode replaces these with - and _ making the output safe for use in URLs and file names without percent-encoding.' },
      { q: 'Why does my decoded output look like gibberish?', a: 'If the original Base64 encoded a binary file (image, PDF, etc.), the decoded output is binary data — it will appear as unreadable characters in text mode. Use "Save file" to download and open it properly.' },
      { q: 'How much larger is Base64 compared to the original?', a: 'Base64 adds approximately 33% overhead. A 100 KB file becomes about 133 KB when Base64-encoded. The output byte count is shown below the output panel.' },
    ],
    related: ['json-formatter', 'password-generator', 'regex-tester'],
  },

  'regex-tester': {
    title: 'Regex Tester — Live Regular Expression Tester Online | UtilKit',
    description: 'Test JavaScript regular expressions in real time with colour-coded match highlighting. Find & Replace, preset patterns, and a full regex cheatsheet.',
    benefits: [
      { title: 'Live highlighting', description: 'Matches are colour-coded in real time as you type — up to 5 distinct colours for multiple capture groups.' },
      { title: 'Find & Replace mode', description: 'Test your regex as a replacement operation with back-reference support ($1, $2) and see the result before using it in code.' },
      { title: 'Preset patterns', description: 'Six ready-made patterns (email, URL, phone, IPv4, date, hex colour) you can load and modify for your use case.' },
      { title: 'Regex cheatsheet', description: 'A built-in quick reference covers anchors, quantifiers, groups, character classes, and look-arounds — no tab-switching needed.' },
    ],
    howTo: {
      title: 'How to test a regular expression',
      steps: [
        'Enter your regex pattern in the pattern field between the / delimiters.',
        'Toggle flags (g, i, m, s, u) as needed using the flag buttons.',
        'Paste your test string in the test area — matches are highlighted immediately.',
        'Switch to the Find & Replace tab to preview a replacement operation.',
      ],
    },
    examples: [
      { title: 'Email validation', description: 'Load the Email preset pattern and test it against a list of addresses to see which ones match and which don\'t.' },
      { title: 'Log parsing', description: 'Write a regex to extract timestamps and error codes from a log file paste — see all matches highlighted at once.' },
      { title: 'Text transformation', description: 'Use Find & Replace to transform a list of names from "First Last" to "Last, First" format using capture groups and back-references.' },
    ],
    faq: [
      { q: 'Which regex flavour does this use?', a: 'JavaScript\'s built-in RegExp engine. It supports most standard regex features: character classes, quantifiers, groups, lookaheads. It does not support lookbehinds in older browsers or atomic groups.' },
      { q: 'What does the "g" flag do?', a: 'The global flag makes the regex match all occurrences in the string, not just the first one. Without "g", only the first match is found and highlighted.' },
      { q: 'How do I use capture groups in Find & Replace?', a: 'Wrap part of your pattern in parentheses — e.g. (\w+). Then use $1 in the replacement string to insert what was captured. $2 for the second group, and so on.' },
      { q: 'Can I share my regex with someone?', a: 'Yes — click the "Share" button to copy a URL that encodes your pattern, flags, and test string. Anyone with the URL will see the same setup.' },
      { q: 'Why does my regex cause an error?', a: 'Common causes: unescaped special characters (use \\. not .), unbalanced parentheses, or invalid flag combinations. The error message from the JavaScript engine is shown in red.' },
    ],
    related: ['code-diff', 'json-formatter', 'base64'],
  },

  'code-diff': {
    title: 'Code Diff Checker — Compare Code Online Free | UtilKit',
    description: 'Compare two code blocks or text files side by side. See added and removed lines highlighted, download as a .patch file. Free, instant, in-browser.',
    benefits: [
      { title: 'LCS algorithm', description: 'Uses the Longest Common Subsequence algorithm — the same method behind git diff — for accurate line-by-line comparison.' },
      { title: 'Ignore whitespace', description: 'A toggle strips leading and trailing spaces before comparing, so re-indented code doesn\'t show as changed.' },
      { title: 'Download as .patch', description: 'Export the diff in standard unified diff format — compatible with the "patch" command and most code review tools.' },
      { title: 'File upload support', description: 'Load text files directly into either panel instead of pasting — works with any plain text or code file.' },
    ],
    howTo: {
      title: 'How to compare two code files',
      steps: [
        'Paste original code into the left panel and modified code into the right panel.',
        'Or click "Load" above each panel to import a text file directly.',
        'Toggle "Ignore whitespace" if the files differ only in indentation.',
        'Review the diff output — green lines are additions, red are removals. Download as .patch if needed.',
      ],
    },
    examples: [
      { title: 'Code review', description: 'Paste the old and new version of a function to quickly see what changed before approving a code review.' },
      { title: 'Config comparison', description: 'Compare two environment config files to find which settings differ between staging and production.' },
      { title: 'Document revision', description: 'Compare two versions of a text document to see exactly what was added, removed, or changed between revisions.' },
    ],
    faq: [
      { q: 'Does this work for non-code text?', a: 'Yes. Any plain text works — documents, config files, CSV data, HTML, anything line-based. The diff is purely line-by-line regardless of content type.' },
      { q: 'What is the ignore whitespace option for?', a: 'When code is reformatted or re-indented without logic changes, every line appears changed. Ignoring whitespace trims each line before comparison so only real content changes are shown.' },
      { q: 'What does the .patch file contain?', a: 'A standard unified diff with + for added lines and - for removed lines. It can be applied to the original file using "patch -p0 < changes.patch" in a terminal.' },
      { q: 'Is there a character or line limit?', a: 'No hard limit. However, very large files (10,000+ lines) may be slow because the LCS algorithm has O(m×n) complexity. For large files, a command-line tool like "diff" will be faster.' },
      { q: 'Can I compare binary files?', a: 'No. The tool is designed for plain text. Binary files (images, compiled executables) will display as garbled characters and produce meaningless diffs.' },
    ],
    related: ['regex-tester', 'json-formatter', 'base64'],
  },

  'word-counter': {
    title: 'Word Counter — Count Words, Characters & Readability | UtilKit',
    description: 'Count words, characters, sentences, and paragraphs in real time. Get reading time, speaking time, Flesch-Kincaid readability score, and keyword density.',
    benefits: [
      { title: 'Real-time stats', description: 'All counts update instantly as you type — no clicking a button, no waiting.' },
      { title: 'Flesch-Kincaid readability', description: 'Scores your text on the 0–100 readability scale. Know if your writing is easy to read or overly complex.' },
      { title: 'Reading and speaking time', description: 'Estimates how long your text takes to read (200 wpm) or speak aloud (130 wpm) — useful for blog posts and presentations.' },
      { title: 'Keyword density', description: 'Lists your top 10 most-used words after filtering out stop words, revealing which concepts dominate your writing.' },
    ],
    howTo: {
      title: 'How to analyse your text',
      steps: [
        'Paste or type your text into the editor panel.',
        'All statistics update in real time in the panel on the right.',
        'Set a word target to track progress towards a word count goal.',
        'Click "Export stats CSV" to download all metrics as a spreadsheet.',
      ],
    },
    examples: [
      { title: 'Blog post optimisation', description: 'Paste a blog draft to check word count, reading time, and readability score before publishing — most readers engage best with 60–70 Flesch scores.' },
      { title: 'Essay writing', description: 'Set a word target (e.g. 2,000 words) and track progress with the progress bar while writing your essay.' },
      { title: 'Presentation scripts', description: 'Check speaking time for a presentation script — 1,300 words takes about 10 minutes to deliver at a comfortable pace.' },
    ],
    faq: [
      { q: 'How is reading time calculated?', a: 'Based on the average adult silent reading speed of 200 words per minute. Speaking time uses 130 wpm — a comfortable presentation pace. Both are rounded up to the nearest minute.' },
      { q: 'What is the Flesch-Kincaid score?', a: 'A readability formula that measures average sentence length and syllables per word. Scores 70–80 are easy for most adults. Below 30 is university level. Higher is easier.' },
      { q: 'Why are common words excluded from the keyword list?', a: 'Stop words (the, a, in, is, etc.) are filtered out because they appear in every text and add no content insight. The top words panel shows meaningful content words only.' },
      { q: 'Does it count hyphenated words as one or two words?', a: 'Hyphenated words like "well-known" are counted as one word, since the counter splits on whitespace.' },
      { q: 'Can I analyse text in languages other than English?', a: 'Word and character counts work for any language. The Flesch-Kincaid readability score is designed for English and will not be meaningful for other languages.' },
    ],
    related: ['case-converter', 'lorem-ipsum', 'word-to-pdf'],
  },

  'case-converter': {
    title: 'Case Converter — Convert Text Case Online Free | UtilKit',
    description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, ROT13, and 9 more formats instantly. All 13 variants shown at once.',
    benefits: [
      { title: '13 formats simultaneously', description: 'All variants are generated and shown at the same time — no need to convert one at a time.' },
      { title: 'Programming cases included', description: 'camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and dot.case for renaming variables and API keys across language conventions.' },
      { title: 'Use as input', description: 'Click "Use as input →" on any result to chain conversions — e.g. convert Title Case to camelCase in two steps.' },
      { title: 'ROT13 and Reverse', description: 'ROT13 cipher for obscuring spoilers and puzzle answers. Reverse text for palindrome checking or creative effects.' },
    ],
    howTo: {
      title: 'How to convert text case',
      steps: [
        'Paste or type your text in the input box at the top.',
        'All 13 case variants appear instantly below.',
        'Hover over any result card to reveal the copy button.',
        'Click "Use as input →" on a result to use it as the new source for further conversion.',
      ],
    },
    examples: [
      { title: 'Variable renaming', description: 'Paste a database column name in snake_case to instantly see its camelCase and PascalCase equivalents for use in code.' },
      { title: 'Title formatting', description: 'Paste a blog post title to convert it to Title Case for consistent headline formatting across a publication.' },
      { title: 'Spoiler hiding', description: 'Use ROT13 to encode a movie spoiler before posting in a forum where readers can then decode it by passing it through ROT13 again.' },
    ],
    faq: [
      { q: 'What is camelCase vs. PascalCase?', a: 'camelCase starts with a lowercase letter (myVariableName) and is common in JavaScript and Java. PascalCase capitalises every word including the first (MyClassName) and is used for class names and components.' },
      { q: 'What is ROT13?', a: 'ROT13 shifts each letter 13 positions in the alphabet. Since the alphabet has 26 letters, applying ROT13 twice returns the original text. It\'s not encryption — anyone who knows ROT13 can decode it.' },
      { q: 'Why does camelCase strip hyphens and underscores?', a: 'camelCase, PascalCase, snake_case, and kebab-case conversions treat hyphens, underscores, spaces, and slashes as word boundaries and rebuild the word in the target format.' },
      { q: 'Can I convert very long text?', a: 'Yes. All conversions are O(n) string operations and handle any length of text. For very long documents, there may be a slight delay on some low-end devices.' },
      { q: 'Does it handle Unicode characters?', a: 'Uppercase/lowercase conversions support full Unicode. Programming cases (snake_case, camelCase, etc.) split on ASCII separators and may not handle CJK or Arabic scripts as expected.' },
    ],
    related: ['word-counter', 'lorem-ipsum', 'regex-tester'],
  },

  'lorem-ipsum': {
    title: 'Lorem Ipsum Generator — Placeholder Text Online Free | UtilKit',
    description: 'Generate lorem ipsum placeholder text by paragraphs, sentences, or words. HTML mode, corporate buzzword mode, and classic or random text — free and instant.',
    benefits: [
      { title: 'Three generation units', description: 'Generate by paragraphs, sentences, or individual words — match the placeholder text exactly to your layout slot.' },
      { title: 'HTML mode', description: 'Wrap output in <p> tags for direct pasting into HTML source without extra formatting work.' },
      { title: 'Corporate buzzword mode', description: 'Generate satirical startup-speak for placeholder pitch decks, mockups, or anywhere you want placeholder text with personality.' },
      { title: 'Word and character count', description: 'The output panel shows word and character counts so you can hit a specific length target for your layout.' },
    ],
    howTo: {
      title: 'How to generate placeholder text',
      steps: [
        'Choose a generation type: Paragraphs, Sentences, or Words.',
        'Drag the count slider to set how much text to generate.',
        'Toggle HTML mode if you need <p> tag wrapping, or Buzzword mode for fun placeholder text.',
        'Click "Generate" and use "Copy all" to copy the result to your clipboard.',
      ],
    },
    examples: [
      { title: 'Website wireframe', description: 'Generate 3 paragraphs to fill a homepage section in a design mockup so the layout can be reviewed with realistic text density.' },
      { title: 'Email template testing', description: 'Generate 150 words to fill an email template body and check how the layout handles a typical-length message.' },
      { title: 'Pitch deck placeholder', description: 'Use corporate buzzword mode to fill slide body text in a presentation template while the real content is being written.' },
    ],
    faq: [
      { q: 'What is lorem ipsum?', a: 'Lorem ipsum is scrambled Latin text derived from Cicero\'s "de Finibus Bonorum et Malorum" (45 BC). It\'s been used as placeholder text in publishing and design since the 1960s because it mimics natural text without distracting with readable content.' },
      { q: 'Is lorem ipsum Latin?', a: 'It is derived from Latin but is deliberately scrambled and does not form coherent sentences. Its value is purely visual — it looks like real text at a glance.' },
      { q: 'What is corporate buzzword mode?', a: 'A satirical generator that creates startup-style sentences from common business jargon. Useful as a fun placeholder alternative in informal mockups or to inject humour into a design review.' },
      { q: 'Can I use this for content testing?', a: 'Yes. Generate text to a specific word count to test how a CMS or form handles long-form content before real copy is ready.' },
      { q: 'What does the "Start with Lorem ipsum" option do?', a: 'It forces the first sentence to be the classic opening "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." — useful when clients or reviewers expect the traditional text.' },
    ],
    related: ['word-counter', 'case-converter', 'word-to-pdf'],
  },

  'temp-email': {
    title: 'Temporary Email — Free Disposable Email Address | UtilKit',
    description: 'Get a disposable email address instantly with a live inbox. Protect your real email from spam. Auto-expires in 30 minutes — no sign-up required.',
    benefits: [
      { title: 'Instant generation', description: 'A working email address is created in under a second — no form filling, no CAPTCHA, no wait.' },
      { title: 'Live inbox', description: 'Emails arrive in the inbox in real time. The inbox polls every 10 seconds and a manual refresh button lets you check immediately.' },
      { title: 'Extend lifetime', description: 'Need more time? Click "+15 min" to extend the inbox lifetime without losing received messages.' },
      { title: 'Multiple domains', description: 'Choose from multiple available email domains for the address, giving you variety if one domain is blocked by a sign-up form.' },
    ],
    howTo: {
      title: 'How to use a temporary email address',
      steps: [
        'Select a domain from the dropdown and click "Get Address".',
        'Copy the generated email address using the copy button.',
        'Use the address on a website sign-up form or anywhere you need an email.',
        'Return here to see the inbox — verification emails and messages will appear within seconds.',
      ],
    },
    examples: [
      { title: 'Free trial sign-ups', description: 'Use a temp email to sign up for a free trial without risking your real inbox receiving promotional emails afterwards.' },
      { title: 'One-time verification codes', description: 'Sign up for a service that requires email verification — receive the code here without creating a real account.' },
      { title: 'Testing email workflows', description: 'Developers can use a temp address to test registration and password reset flows without using real email addresses during development.' },
    ],
    faq: [
      { q: 'How long does the email address last?', a: 'By default, 30 minutes from creation. Click the "+15 min" button to add more time. The maximum single extension is 60 minutes.' },
      { q: 'Can I receive attachments?', a: 'Attachment metadata is captured, but downloading attachments is not currently supported. Text and HTML message bodies are displayed in full.' },
      { q: 'Can I reply to messages?', a: 'No. Temporary email is receive-only. You cannot send emails from the generated address.' },
      { q: 'What happens when the inbox expires?', a: 'All messages are permanently deleted and the address becomes inactive. Any mail sent after expiry will bounce or be discarded.' },
      { q: 'Will websites block temp email domains?', a: 'Some websites check against lists of known disposable email domains and may reject them. If one domain is blocked, try selecting a different domain from the dropdown.' },
    ],
    related: ['password-generator', 'url-shortener'],
  },
}
