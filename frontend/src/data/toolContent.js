export const toolContent = {

  // ─── AI Tools ─────────────────────────────────────────────────────────────

  'ai-humanizer': {
    why: 'AI writing tools have a recognisable fingerprint: uniform sentence length, predictable transitions like "moreover" and "in conclusion", and a flat, over-polished tone. Detectors such as GPTZero, Originality.ai, Copyleaks, and Turnitin look for exactly that statistical regularity, and human readers feel it too — text that is technically correct but lifeless. Whether you are trying to pass an academic AI check or simply want copy that does not read like a robot wrote it, the raw AI output usually needs a rewrite.\n\nThis humanizer uses GPT-4o to rework that text the way a thoughtful editor would: varying sentence length and rhythm, swapping mechanical phrasing for natural word choices, and breaking the uniform patterns detectors key on — all while preserving your original meaning and key facts. You paste in the AI draft, click once, and get back a version that reads as genuinely human. Your text is sent to our API over HTTPS only to be processed and is not stored afterward. Results depend on the content and the detector version, so it is a strong rewrite aid rather than a guarantee against every checker.',
    howTo: [
      { step: '1', title: 'Paste your AI-generated text', body: 'Copy the output from ChatGPT, Claude, Gemini, or any AI tool and paste it into the input box.' },
      { step: '2', title: 'Click Humanize', body: 'GPT-4o rewrites the content with natural variation in sentence structure, rhythm, and word choice while keeping the meaning intact.' },
      { step: '3', title: 'Review and copy', body: 'Read the humanized output, make any tweaks you like, and copy it into your document, email, or submission.' },
    ],
    useCases: [
      { title: 'Students & academics', body: 'Rework AI-assisted drafts so they read naturally and align with university policies, without altering the underlying argument.' },
      { title: 'Content marketers', body: 'Turn AI-drafted blog posts into copy that reads human and passes editorial AI-detector checks before publishing.' },
      { title: 'Copywriters & agencies', body: 'Draft fast with AI, then humanize before delivering to clients who require original-sounding, on-brand writing.' },
      { title: 'Non-native English writers', body: 'Smooth stilted or overly formal phrasing into fluent, natural-sounding English.' },
      { title: 'Email & outreach', body: 'Make templated or AI-written messages feel personal and warm rather than generic.' },
    ],
    faq: [
      { q: 'Which AI detectors is this designed for?', a: 'It targets the patterns flagged by GPTZero, Originality.ai, Copyleaks, and Turnitin. Results vary with the content and the detector’s current version, so treat it as a strong aid, not a guarantee.' },
      { q: 'Does humanizing change the meaning?', a: 'No. It preserves your meaning and key information while restructuring phrasing, sentence length, and word choice.' },
      { q: 'Is my text stored anywhere?', a: 'No. Your text is sent to our API over HTTPS, processed, and returned — nothing is stored afterward.' },
      { q: 'Is there a character limit?', a: 'Up to 8,000 characters per request. For longer pieces, run it section by section.' },
      { q: 'Should I still proofread the result?', a: 'Yes. Always read it through — the humanizer improves flow and naturalness, but you should confirm tone and accuracy for your context.' },
      { q: 'Will it work on any language?', a: 'It works best on English. Other languages may produce more variable results.' },
      { q: 'Does it add new facts?', a: 'It is designed to rephrase, not invent. Still, verify any figures or claims against your source.' },
      { q: 'Is it free to use?', a: 'Yes — free, with no sign-up required.' },
    ],
  },

  'ai-paraphraser': {
    why: 'Rewording something in your own words sounds simple, but doing it well by hand is slow, and swapping words for synonyms one at a time produces clunky, thesaurus-stuffed sentences that read worse than the original. Yet there are countless moments you need exactly this: restating a source so it is not copied verbatim, finding a clearer way to phrase a stubborn sentence, adapting copy for a different audience, or smoothing writing that feels awkward.\n\nThis paraphraser uses GPT-4o to restructure sentences intelligently — changing the wording and the structure together while keeping your original meaning intact — so the result reads naturally rather than mechanically reworded. Paste a passage, click once, and get a fresh version you can use in an essay, article, or post. Your text is sent over HTTPS only for processing and is not stored. Used responsibly, it is a writing aid: when rephrasing a source for academic work, you should still cite the original.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Enter the sentence, paragraph, or passage you want reworded into the input box.' },
      { step: '2', title: 'Click Paraphrase', body: 'GPT-4o rewrites it with new structure and vocabulary while preserving the original meaning.' },
      { step: '3', title: 'Review and use', body: 'Read the output, adjust anything you like, and copy it into your document, essay, or post.' },
    ],
    useCases: [
      { title: 'Academic writers', body: 'Restate source material in your own words to support an argument — always alongside a proper citation.' },
      { title: 'Content teams', body: 'Refresh existing articles or adapt one piece of copy for different platforms and audiences.' },
      { title: 'Non-native English writers', body: 'Turn awkward or overly literal phrasing into fluent, natural-sounding English.' },
      { title: 'Students', body: 'Find a clearer way to express an idea you understand but are struggling to word.' },
      { title: 'Marketers', body: 'Produce several variations of a headline, tagline, or product description to test.' },
    ],
    faq: [
      { q: 'Does paraphrasing count as plagiarism?', a: 'Rewording a source without crediting it can still be plagiarism. Paraphrasing is acceptable when you cite the original — always add the citation.' },
      { q: 'Is the original meaning preserved?', a: 'Yes. It keeps your key information and intent while changing the structure and wording.' },
      { q: 'Is my text stored?', a: 'No. Text is sent over HTTPS, processed, and discarded immediately after the response.' },
      { q: 'What is the character limit?', a: 'Up to 8,000 characters per request. Run longer text in sections.' },
      { q: 'Can I get more than one version?', a: 'Run it again on the same input to get a fresh alternative, then pick the phrasing you prefer.' },
      { q: 'Will it keep technical terms correct?', a: 'It generally preserves terminology, but review specialised or legal text to confirm meaning is intact.' },
      { q: 'How is this different from the humanizer?', a: 'The paraphraser focuses on rewording for clarity and originality; the AI Humanizer specifically targets AI-detection patterns.' },
      { q: 'Is it free?', a: 'Yes — free, with no sign-up.' },
    ],
  },

  'ai-grammar-fixer': {
    why: 'A spell-checker only catches words that are misspelled. It sails right past the errors that actually make writing look unprofessional: a verb that disagrees with its subject, a tense that shifts mid-paragraph, a dangling modifier, a comma splice, or the wrong "its" versus "it’s". Those mistakes are easy to make and surprisingly hard to self-edit, because your brain reads what you meant rather than what you wrote.\n\nThis fixer uses GPT-4o, which understands the context of a sentence rather than matching patterns, so it corrects grammar, punctuation, and clumsy phrasing that rule-based checkers miss — while preserving your voice and only rewriting where it is genuinely needed. Paste your text, click once, and compare the corrected version against the original before copying. Your text is sent over HTTPS purely for processing and is not stored. It is excellent for emails, essays, and posts; for legal or high-stakes documents, treat it as a strong first pass and still give the result a human read.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Copy the email, paragraph, or document you want corrected into the input box.' },
      { step: '2', title: 'Click Fix Grammar', body: 'GPT-4o reads the full context and returns a corrected version, not just isolated word fixes.' },
      { step: '3', title: 'Review and copy', body: 'Compare the original and corrected text, accept what you agree with, and copy the result.' },
    ],
    useCases: [
      { title: 'Non-native English writers', body: 'Catch subtle grammar and article errors that are hard to learn from rules alone but obvious to native readers.' },
      { title: 'Professionals', body: 'Polish emails, reports, and proposals so they read cleanly before they reach clients or managers.' },
      { title: 'Students', body: 'Proofread essays and assignments for the mistakes spellcheck never flags, before you submit.' },
      { title: 'Job seekers', body: 'Make sure a CV, cover letter, or LinkedIn summary is error-free where a typo could cost an interview.' },
      { title: 'Social & content', body: 'Tidy posts and captions quickly so published writing looks credible.' },
    ],
    faq: [
      { q: 'Is this better than a basic spell-checker?', a: 'Yes for grammar — it understands context and fixes agreement, tense, and punctuation issues that spell-checkers and many rule-based tools miss.' },
      { q: 'Does it change my writing style?', a: 'It preserves your voice and only rewrites sentences where a correction is genuinely needed, rather than rephrasing everything.' },
      { q: 'Is my text stored?', a: 'No. It is sent over HTTPS, processed, and discarded immediately afterward.' },
      { q: 'Is there a character limit?', a: 'Up to 8,000 characters per request; run longer documents in sections.' },
      { q: 'Will it fix British or American English?', a: 'It works with both. It generally follows the spelling and conventions present in your input.' },
      { q: 'Should I still proofread the result?', a: 'Yes — for important documents, review the changes. It is a strong assistant, not a replacement for a final human check.' },
      { q: 'Can it improve clarity, not just grammar?', a: 'It focuses on correctness while keeping your style; for heavier rewording, use the AI Paraphraser.' },
      { q: 'Is it free?', a: 'Yes — free, with no sign-up.' },
    ],
  },

  'ai-summarizer': {
    why: 'There is always more to read than there is time to read it: long reports, research papers, dense articles, meeting notes, and email threads pile up faster than anyone can keep up. Often you do not need every word — you need the gist, fast, so you can decide whether something is worth a full read or pull the key points into your own notes. Skimming risks missing what matters; reading everything is not realistic.\n\nThis summarizer uses GPT-4o to read the whole text and distil it into a short, accurate summary of the main ideas, so you get the substance in a fraction of the time. Paste in an article or document, click once, and use the result in your notes, emails, or briefings. Your text is sent over HTTPS purely for processing and is not stored afterward. As with any AI summary, it is a fast first pass — always double-check critical figures and quotes against the original before relying on them.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Copy the article, report, thread, or document you want condensed and paste it into the input box.' },
      { step: '2', title: 'Click Summarize', body: 'GPT-4o reads the full text and returns a concise summary capturing the most important points.' },
      { step: '3', title: 'Copy and use it', body: 'Drop the summary into your notes, an email, a brief, or a presentation.' },
    ],
    useCases: [
      { title: 'Researchers & students', body: 'Decide whether a paper or article is relevant before committing to reading the whole thing.' },
      { title: 'Executives & managers', body: 'Get the takeaways from long reports and proposals without reading every page.' },
      { title: 'Professionals', body: 'Condense long email threads or meeting notes into a few clear action points.' },
      { title: 'Content creators', body: 'Summarise competitor articles or source material to inform your own writing quickly.' },
      { title: 'Newsletters & curation', body: 'Turn a long piece into a tight blurb for a roundup, digest, or social post.' },
    ],
    faq: [
      { q: 'How long can the input text be?', a: 'Up to 8,000 characters per request. For longer documents, summarise it section by section.' },
      { q: 'Is the summary accurate?', a: 'GPT-4o is designed to capture key facts without inventing them, but always verify critical figures, names, and quotes against the original.' },
      { q: 'Is my text stored?', a: 'No. It is processed over HTTPS and discarded right after the summary is returned.' },
      { q: 'Can I summarize a PDF?', a: 'Not directly. Extract the text first with our PDF → Word tool, then paste it here.' },
      { q: 'Can I control how short the summary is?', a: 'The tool aims for a concise overview of the key points; for a shorter result, summarise the output again or trim it yourself.' },
      { q: 'Does it work on any subject?', a: 'Yes — articles, reports, research, and general prose all work. Highly technical text still benefits from a human check.' },
      { q: 'Will it keep the original’s tone?', a: 'Summaries are written in a neutral, informative tone focused on the key ideas rather than mirroring the source style.' },
      { q: 'Is it free?', a: 'Yes — free to use, with no sign-up.' },
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
    why: 'PDF is built to be read, not edited. It freezes text, fonts, and layout into a fixed page so a document looks identical everywhere — which is exactly why you cannot easily change a word, fix a typo, or reuse a paragraph without the original source file or a paid converter like Adobe Acrobat. Most people just want the words back so they can paste them into Word, Google Docs, or an email and carry on.\n\nThis tool does that instantly and privately. It reads the selectable text layer of your PDF directly in your browser using PDF.js and gives you clean, editable text you can copy or download — no upload, no account, no watermark, and no software to install. Because nothing is sent to a server, even sensitive contracts, medical records, or financial statements stay entirely on your own device. It is text extraction rather than a pixel-perfect Word rebuild: you get every word, heading, and paragraph ready to edit, which is what the vast majority of "PDF to Word" searches are actually after.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click the upload area or drag and drop your PDF onto the page. The file is loaded into your browser only — it is never uploaded to any server.' },
      { step: '2', title: 'Preview the extracted text', body: 'The tool parses every page with PDF.js and shows a live, scrollable preview of the recovered text so you can confirm it captured what you need before saving.' },
      { step: '3', title: 'Copy or download', body: 'Copy the text straight to your clipboard, or click Download to save it as a .txt file. Paste it into Word or Google Docs, where you can re-apply headings, bold, and styles in seconds.' },
    ],
    useCases: [
      { title: 'Students & researchers', body: 'Pull quotes, data, and references out of academic papers, textbooks, and journal PDFs without retyping — then cite and annotate them in your own document.' },
      { title: 'Legal & compliance teams', body: 'Extract clauses from contracts and agreements to redline, compare versions, or reformat — without sending confidential documents to a third-party cloud service.' },
      { title: 'Content & marketing', body: 'Recover copy from old brochures, whitepapers, and PDF reports to repurpose into blog posts, slides, or refreshed web pages.' },
      { title: 'Administrators & HR', body: 'Lift text from forms, policy documents, and onboarding packs to update wording or paste into emails and templates.' },
      { title: 'Translators', body: 'Get the raw source text out of a PDF so you can run it through a translation workflow without fighting the original layout.' },
    ],
    faq: [
      { q: 'Does my PDF get uploaded to a server?', a: 'No. All processing happens locally in your browser using PDF.js. Your file never leaves your device, which makes this safe for confidential or sensitive documents.' },
      { q: 'Will the formatting be preserved?', a: 'Paragraphs and line breaks are preserved. Complex multi-column layouts, tables, and exact fonts are linearised into a clean single reading flow — you re-apply styling in your word processor, which takes moments.' },
      { q: 'Why does this give me text instead of a .docx file?', a: 'Most people searching for "PDF to Word" simply want editable text they can paste into Word or Docs. Extracting clean text avoids the broken, garbled .docx files that automated layout converters often produce, and keeps everything private in your browser.' },
      { q: 'Does it work on scanned PDFs or images?', a: 'Scanned PDFs are pictures of text and contain no selectable text layer, so extraction returns nothing. Use our OCR PDF tool first to convert the scan into real text, then bring it here.' },
      { q: 'What file size is supported?', a: 'PDFs up to about 100MB process comfortably. Very large files take a little longer because all the work happens on your own computer.' },
      { q: 'Is there a limit on the number of pages?', a: 'No fixed page limit. The tool reads the whole document; longer PDFs simply take a few seconds more to parse.' },
      { q: 'Can I edit the result on my phone?', a: 'Yes. The tool runs in any modern mobile browser. Copy the extracted text and paste it into the Google Docs or Word app on your device.' },
      { q: 'Is it really free with no watermark?', a: 'Yes — completely free, no sign-up, no watermark, and no daily conversion cap. The output is plain text exactly as it appears in your PDF.' },
    ],
  },

  'word-to-pdf': {
    why: 'PDF is the format people expect when you send a document: it looks the same on every device, cannot be accidentally edited, and is the standard for applications, contracts, and assignments. But you should not have to own Microsoft Word or pay for Acrobat just to produce one from some text you have already written. Plenty of people have the words ready in an email, a Google Doc, or a notes app and simply need them turned into a tidy, shareable PDF.\n\nThis tool does that without any software or account. Paste or type your content, adjust the font size, line height, and margins so it looks the way you want, and create the PDF using your browser’s built-in print-to-PDF engine. Because it relies on your browser, the PDF is generated entirely on your device — nothing is uploaded — and the result is a clean, correctly sized file you can save or share immediately. It is designed for text documents; for heavy formatting like tables and images, exporting straight from Google Docs is a better fit.',
    howTo: [
      { step: '1', title: 'Paste or type your content', body: 'Bring in text from Google Docs, Word, Notepad, an email — anywhere — and paste it into the editor.' },
      { step: '2', title: 'Adjust the formatting', body: 'Set the font size, line height, and page margins so the document reads cleanly on the page.' },
      { step: '3', title: 'Save as PDF', body: 'Click Convert to PDF to open your browser’s print dialog, then choose "Save as PDF" as the destination.' },
    ],
    useCases: [
      { title: 'Professionals', body: 'Turn letters, proposals, and notes into PDFs for tidy, uneditable sharing with clients and colleagues.' },
      { title: 'Freelancers', body: 'Produce PDFs of simple invoices or agreements drafted as text, without paying for office software.' },
      { title: 'Students', body: 'Submit work as a PDF when a course requires that format and you have no Word licence.' },
      { title: 'Job seekers', body: 'Convert a plain-text cover letter or reference into a clean PDF to attach to an application.' },
      { title: 'Anyone without Office', body: 'Get a properly formatted PDF on a Chromebook, phone, or shared computer with nothing installed.' },
    ],
    faq: [
      { q: 'Does it support bold, headings, and tables?', a: 'It is built for clean text with configurable font and margins. For complex layouts with tables or images, export from Google Docs (File → Download → PDF) instead.' },
      { q: 'Is the PDF generated on a server?', a: 'No. It is created entirely by your browser’s native print-to-PDF engine, so nothing you type is uploaded.' },
      { q: 'Will it look the same on every device?', a: 'Yes — that is the point of PDF. Once saved, the layout is fixed and displays identically everywhere.' },
      { q: 'How big will the PDF be?', a: 'It depends on length and font size, but most text documents come out under 500KB.' },
      { q: 'Is there a length limit?', a: 'No. Paste as much text as you need; it spans multiple pages automatically.' },
      { q: 'Can I do this on my phone?', a: 'Yes. Any modern mobile browser can print to PDF, so you can create and save the file on your phone.' },
      { q: 'Why use this instead of printing on paper?', a: 'Choosing "Save as PDF" in the print dialog creates a digital file instead of a paper copy — this tool sets up clean formatting for exactly that.' },
      { q: 'Is it free?', a: 'Yes — completely free, no sign-up, and no watermark.' },
    ],
  },

  'merge-pdf': {
    why: 'Sending someone five separate PDF attachments — a CV, a cover letter, two certificates, and a portfolio — is awkward to open, easy to lose, and reads as disorganised. Recipients have to download each one, guess the right order, and juggle multiple tabs. Combining everything into one tidy, correctly ordered document solves all of that in a single click, and it is one of the most common things people need a PDF tool for.\n\nThis merger does it instantly and privately, right in your browser. It uses pdf-lib to stitch your files together on your own device, so confidential contracts, financial records, or personal documents are never uploaded to a server — there is no account, no watermark, and no daily limit. You stay in control of the sequence: drag the files into the exact order you want before combining, and download a clean single PDF with the filename of your choice. Because the original page content is copied rather than re-rendered, text stays selectable and quality is untouched.',
    howTo: [
      { step: '1', title: 'Upload your PDFs', body: 'Click the upload area or drag and drop several PDF files at once. They load straight into your browser — nothing is sent anywhere.' },
      { step: '2', title: 'Set the order', body: 'Drag the rows up or down to arrange the files in the exact sequence you want them to appear in the final document.' },
      { step: '3', title: 'Merge and download', body: 'Click Merge PDF, give the combined file a name, and download it. The whole thing happens locally in a second or two.' },
    ],
    useCases: [
      { title: 'Job applicants', body: 'Combine CV, cover letter, references, and portfolio into one clean file so recruiters open a single, professional document.' },
      { title: 'Business & finance', body: 'Merge a report with its appendices, data tables, and signed approvals, or bundle monthly invoices into one file for accounting.' },
      { title: 'Students', body: 'Join multiple assignment parts, scanned worksheets, or lab reports into one submission before uploading to your course portal.' },
      { title: 'Legal & admin', body: 'Assemble contracts with their exhibits, or combine scanned forms and IDs into a single packet for filing.' },
      { title: 'Travel & personal', body: 'Put flight confirmations, hotel bookings, and insurance into one PDF you can pull up offline in the right order.' },
    ],
    faq: [
      { q: 'How many PDFs can I merge at once?', a: 'Up to 20 PDFs in a single merge. You can run the tool again on the result to combine even more.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. All merging happens in your browser using pdf-lib, so your files never leave your device — safe for confidential documents.' },
      { q: 'Can I choose the order of the files?', a: 'Yes. Drag the uploaded files into any order before merging, and the final PDF follows that exact sequence.' },
      { q: 'Is there a file size limit?', a: 'Each PDF can be up to about 100MB. For very large combined sizes the merge simply takes a little longer, since the work runs on your own computer.' },
      { q: 'Will the quality or text change?', a: 'No. Pages are copied as-is, so text stays selectable and images keep their original resolution — there is no recompression.' },
      { q: 'Are bookmarks, links, and form fields kept?', a: 'Page content is fully preserved. Some interactive elements such as bookmarks and form fields may not carry across when files are combined.' },
      { q: 'Can I merge PDFs on my phone?', a: 'Yes. The tool works in any modern mobile browser — upload the files from your device and download the merged PDF back to it.' },
      { q: 'Is it free and watermark-free?', a: 'Completely free, with no sign-up, no watermark, and no cap on how many times you can merge.' },
    ],
  },

  'compress-pdf': {
    why: 'A PDF that is too big is a daily frustration: email bounces back because it exceeds the 25MB Gmail limit, a government or university portal refuses the upload, or a scanned document eats far more storage than it should. The bulk almost always comes from high-resolution scanned images embedded in the file, not the text. Shrinking those images down to a sensible screen resolution can cut the file size by half or more while the document still looks perfectly clean on screen and in print.\n\nThis compressor does that locally in your browser using Canvas, so your file is never uploaded — important when the document is a contract, medical record, or ID scan. You pick how aggressive to be with a simple Low / Medium / High quality preset, see the before-and-after size side by side, and download the smaller version. There is no account, no watermark, and no daily limit, and your original file is left untouched so you can always re-try at a different quality if you need a different balance of size versus sharpness.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click the upload area or drag and drop the large PDF you want to shrink. It is processed entirely on your device.' },
      { step: '2', title: 'Choose a quality preset', body: 'Pick Low for the smallest possible file, Medium for a balanced result, or High to keep maximum sharpness while still saving space.' },
      { step: '3', title: 'Compare and download', body: 'Review the before/after size comparison, then download the compressed PDF. Not small enough? Re-run it on a lower preset.' },
    ],
    useCases: [
      { title: 'Emailing large documents', body: 'Get scanned contracts, reports, and brochures under the 25MB attachment limit so emails actually send.' },
      { title: 'Web form & portal uploads', body: 'Meet the strict file-size caps on government, visa, tax, legal, and HR portals that reject anything too large.' },
      { title: 'Job & university applications', body: 'Compress a scanned transcript, certificate, or portfolio so it fits an application form upload limit.' },
      { title: 'Cloud storage savings', body: 'Reduce the footprint of archived PDFs you rarely print at full resolution, freeing up Drive or Dropbox space.' },
      { title: 'Faster sharing', body: 'Make PDFs quicker to upload, download, and open on slow or mobile connections.' },
    ],
    faq: [
      { q: 'How much smaller will my PDF get?', a: 'Image-heavy and scanned PDFs typically shrink 40–70% on the Medium preset. Text-only PDFs are already compact, so they compress much less.' },
      { q: 'Will the text become blurry?', a: 'No. Text stays crisp at every preset — only embedded image resolution is reduced, which is where the size savings come from.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Compression runs entirely in your browser, so the file never leaves your device — safe for sensitive or confidential documents.' },
      { q: 'Why did my file barely get smaller?', a: 'PDFs that are mostly text or already optimised have little to squeeze. Try the Low preset; if it is still large, the file is likely already near its minimum size.' },
      { q: 'Which preset should I choose?', a: 'Start with Medium — it balances size and clarity for most documents. Use Low when you must hit a strict upload limit, or High when print sharpness matters most.' },
      { q: 'Can I compress a password-protected PDF?', a: 'Remove the password first with our PDF Unlocker tool, then compress the unlocked file here.' },
      { q: 'Is my original file changed?', a: 'No. The tool creates a new, smaller copy and leaves your original exactly as it was, so you can re-try at a different quality any time.' },
      { q: 'Is it free with no watermark?', a: 'Yes — completely free, no sign-up, no watermark, and no daily compression limit.' },
    ],
  },

  'split-pdf': {
    why: 'Often you only need a slice of a PDF: one chapter out of a 400-page textbook, the three slides that matter from a long deck, or a single signed page from a bulky contract. Sending the whole file is wasteful, slower to open, and can expose information the recipient should not see. Pulling out exactly the pages you want gives you a smaller, focused document that is easier to share, print, or archive.\n\nThis splitter lets you do that with a simple page selection — single pages, ranges, or any mix — and builds a brand-new PDF from just those pages. It runs entirely in your browser with pdf-lib, so even sensitive documents never leave your device, and there is no account, watermark, or limit. The original is untouched, and because pages are copied rather than re-rendered, the extracted PDF keeps the exact same text quality and layout as the source.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Click to upload the PDF you want to split. The tool reads it locally and shows the total page count.' },
      { step: '2', title: 'Enter the pages you want', body: 'Type specific pages and ranges, e.g. "1,3,5-8". Use this to grab a single chapter, a handful of slides, or scattered pages.' },
      { step: '3', title: 'Download the new PDF', body: 'Click Split PDF and download a fresh document containing only your selected pages, in the order you listed them.' },
    ],
    useCases: [
      { title: 'Students', body: 'Pull one chapter or a set of pages from a huge textbook or lecture PDF to study, annotate, or share without the whole file.' },
      { title: 'Legal & compliance', body: 'Extract specific exhibits, clauses, or signature pages from long contracts for standalone review or filing.' },
      { title: 'Designers & marketers', body: 'Lift individual slides or spreads from a presentation or brochure PDF to reuse as standalone assets.' },
      { title: 'Admin & HR', body: 'Separate one employee’s pages from a combined scan, or split a batch of forms into individual documents.' },
      { title: 'Privacy-conscious sharing', body: 'Send only the relevant pages of a bank statement or report instead of exposing the entire document.' },
    ],
    faq: [
      { q: 'How do I choose which pages to extract?', a: 'Enter comma-separated pages like "1,3,5", ranges like "2-7", or a combination such as "1,3,5-8". The tool shows the total page count to guide you.' },
      { q: 'Can I extract non-consecutive pages?', a: 'Yes. Something like "1,5,9,12" pulls only those specific pages, and they appear in the order you list them.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Splitting happens entirely in your browser using pdf-lib, so your file never leaves your device.' },
      { q: 'Will the extracted pages lose quality?', a: 'No. Pages are copied exactly as they are, so text stays selectable and the layout and resolution match the original.' },
      { q: 'Is the original PDF modified?', a: 'No. The tool creates a new PDF from your selected pages and leaves the source file unchanged.' },
      { q: 'Is there a limit on the source PDF size?', a: 'There is no fixed page limit; very large files simply take a little longer to process on your device.' },
      { q: 'Can I split a PDF on mobile?', a: 'Yes. It works in any modern mobile browser — upload, enter your pages, and download the result to your phone.' },
      { q: 'Is it free and watermark-free?', a: 'Completely free, with no sign-up, no watermark, and no usage cap.' },
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
    why: 'Every image format exists for a different job, and using the wrong one causes real problems. JPG is best for photographs and small file sizes but cannot hold transparency. PNG keeps transparency and sharp edges for logos and screenshots but produces large files. WebP gives the best of both for the web — small and transparent — but some older tools still expect JPG or PNG. So you constantly need to convert between them: a platform rejects your format, a logo needs a transparent background, or a page needs lighter images to load faster.\n\nThis converter handles all three formats instantly and entirely in your browser using the Canvas API, so your images are never uploaded to a server — important for unpublished designs or client work. You can convert up to 10 images at once, set the quality for lossy formats with a slider, and download them individually or together. No account, no watermark, and no limit, with your originals left untouched so you can re-export at a different format or quality whenever you need.',
    howTo: [
      { step: '1', title: 'Upload your image(s)', body: 'Click to upload or drag and drop up to 10 images at once. They are processed locally on your device.' },
      { step: '2', title: 'Choose the output format', body: 'Select JPG, PNG, or WebP. For the lossy formats, set the quality slider to balance size against sharpness.' },
      { step: '3', title: 'Download', body: 'Download each converted file individually, or grab them all at once. Your originals are never changed.' },
    ],
    useCases: [
      { title: 'Web developers', body: 'Convert PNG and JPG to WebP for 25–35% smaller files and faster pages — a direct Core Web Vitals and SEO win.' },
      { title: 'Designers', body: 'Convert a JPG photo to PNG to add transparency, or flatten a PNG to JPG when a smaller, opaque file is needed.' },
      { title: 'Social media & listings', body: 'Match each platform’s required format and size rules for profile images, posts, and marketplace photos.' },
      { title: 'Email & documents', body: 'Convert heavy PNG screenshots to JPG so they attach and embed without bloating the file.' },
      { title: 'Compatibility fixes', body: 'Turn a WebP someone sent you into a universally supported JPG or PNG that every app can open.' },
    ],
    faq: [
      { q: 'Which formats are supported?', a: 'Input: JPG, PNG, WebP, GIF, and BMP. Output: JPG, PNG, or WebP.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion runs entirely in your browser with the Canvas API, so your images never leave your device.' },
      { q: 'Will I lose quality when converting?', a: 'PNG output is lossless. Converting to JPG or WebP below 100% adds some compression — use 95%+ for near-lossless results.' },
      { q: 'Can I batch convert?', a: 'Yes. Upload up to 10 images and convert them in one go, then download them together.' },
      { q: 'When should I choose WebP?', a: 'For anything shown on the web — it is typically 25–35% smaller than JPG/PNG at similar quality and supports transparency.' },
      { q: 'Does converting JPG to PNG add transparency?', a: 'It changes the format, but a JPG has no transparent areas to recover. To get a transparent subject, use our Background Remover first.' },
      { q: 'Is there a file size limit?', a: 'Large images work fine; very big files simply take a little longer since all the work happens on your device.' },
      { q: 'Is it free with no watermark?', a: 'Yes — completely free, no sign-up, and no watermark on the output.' },
    ],
  },

  'image-compressor': {
    why: 'Photos straight from a phone or camera are often 4–10MB each — far bigger than they need to be for a website, an email, or a social post. Oversized images are the single most common reason web pages load slowly, and slow pages cost you both visitors and search ranking. They also bounce off email attachment limits and fill up cloud storage. The fix is compression: throwing away detail the human eye cannot notice so the file shrinks dramatically while still looking sharp.\n\nThis compressor gives you direct control with a quality slider and shows the exact KB saved before you commit, so you decide the trade-off rather than a server deciding for you. Everything runs in your browser via the Canvas API — your photos never get uploaded, which matters for personal or client images. There is no account, no watermark, and no limit, and you can re-compress at a different quality in seconds until the size and look are exactly right.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload or drag and drop a JPG, PNG, or WebP. It is loaded and processed entirely on your device.' },
      { step: '2', title: 'Adjust the quality slider', body: 'Drag to balance size against clarity. 70–80% is the sweet spot for most uses; the live size readout updates as you move it.' },
      { step: '3', title: 'Compare and download', body: 'Check the before/after file size, then download when you are happy. Re-run at a different quality any time.' },
    ],
    useCases: [
      { title: 'Web & SEO performance', body: 'Shrink hero images, product photos, and thumbnails so pages load faster — a direct Core Web Vitals and ranking win.' },
      { title: 'Email attachments', body: 'Get photo sets under attachment limits so emails send without bouncing.' },
      { title: 'Social media & marketplaces', body: 'Meet upload size limits on platforms and listing sites without visibly degrading the image.' },
      { title: 'Job & form uploads', body: 'Compress a photo or scanned document to fit a strict upload cap on an application or portal.' },
      { title: 'Storage savings', body: 'Reduce the size of large photo libraries before archiving them to Drive, Dropbox, or a backup drive.' },
    ],
    faq: [
      { q: 'What quality setting should I use?', a: '70–80% is ideal for most images — a big size reduction with virtually no visible difference. Drop lower only when you must hit a strict limit.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Compression happens in your browser with the Canvas API, so your image never leaves your device.' },
      { q: 'Which formats can I compress?', a: 'JPG, PNG, and WebP as input. The output is JPEG, which gives the best compression ratio for photos.' },
      { q: 'Why did my PNG get larger?', a: 'PNG is lossless and not built for photographic compression. Converting it to JPEG (which this tool does) is what produces a smaller file.' },
      { q: 'Will compression blur my image?', a: 'At 70–80% the difference is hard to spot. Heavy compression can introduce soft edges or artefacts, so use the preview and size readout to find your limit.' },
      { q: 'Can I compress many images?', a: 'Compress them one at a time — each takes only a moment. Your originals are never altered.' },
      { q: 'Does it work on mobile?', a: 'Yes. Upload a photo from your phone in any modern mobile browser and download the smaller version straight back.' },
      { q: 'Is it free with no watermark?', a: 'Completely free, no sign-up, no watermark, and no limit on how many images you compress.' },
    ],
  },

  'background-remover': {
    why: 'Cutting a subject out of its background by hand — masking hair, edges, and fine detail in Photoshop or GIMP — is slow, fiddly work that can take ten minutes per image even for someone who knows what they are doing. Yet a clean cut-out is exactly what you need for product listings, profile pictures, presentations, and design compositions, where a busy or inconsistent background looks unprofessional.\n\nThis tool removes the background automatically using the remove.bg AI model, which detects the subject and its edges and returns a clean transparent PNG in a few seconds — accurate enough for real product photography, including tricky areas like hair and fur. You can keep the transparency or drop in a solid white or custom colour behind the subject before downloading. To do this, the image is sent securely over HTTPS to the remove.bg API for processing; it is not stored by UtilKit afterwards. There is no software to install and no manual masking — upload, wait a moment, download.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Add a portrait, product shot, or any photo with a clear subject you want isolated from its background.' },
      { step: '2', title: 'Let the AI process it', body: 'The image is sent securely to the remove.bg AI model over HTTPS. Detection of the subject and edges usually takes about 5–10 seconds.' },
      { step: '3', title: 'Download the result', body: 'Download the transparent PNG, or first fill the background with white or a custom colour to match your needs.' },
    ],
    useCases: [
      { title: 'E-commerce sellers', body: 'Produce clean white or transparent product photos that meet Amazon, Shopify, and Etsy listing requirements.' },
      { title: 'Designers', body: 'Extract subjects to drop into posters, banners, mockups, and marketing compositions.' },
      { title: 'Social & content creators', body: 'Make crisp profile pictures, thumbnails, and stickers with no distracting background.' },
      { title: 'Presentations & docs', body: 'Place people or products onto slide backgrounds and branded templates without an awkward rectangle behind them.' },
      { title: 'ID & profile photos', body: 'Swap a messy background for a clean solid colour for headshots, badges, and application photos.' },
    ],
    faq: [
      { q: 'How accurate is the background removal?', a: 'Very accurate for people, products, and animals with clear edges — including hair and fur. Scenes where the subject and background are similar colours may need a small manual touch-up.' },
      { q: 'Is my image uploaded to a server?', a: 'Yes — unlike most tools here, this one sends the image to the remove.bg API over HTTPS for AI processing. It is not stored by UtilKit after the result is returned.' },
      { q: 'What formats are supported?', a: 'JPG and PNG input. The output is always a transparent PNG so the cut-out can sit on any background.' },
      { q: 'Can I add a solid background colour?', a: 'Yes. After removal you can fill the transparent area with white or a custom colour before downloading.' },
      { q: 'Why is the output a PNG and not a JPG?', a: 'JPG cannot store transparency. PNG preserves the see-through background so you can place the subject anywhere; convert to JPG afterwards if you need a solid background.' },
      { q: 'Is there a file size limit?', a: 'Images up to about 10MB are supported.' },
      { q: 'Will it work on complex or low-contrast images?', a: 'Most images work well. Very busy backgrounds or subjects that blend into the background are the main cases that may need light cleanup.' },
      { q: 'Is it free?', a: 'Yes — free to use with no sign-up required.' },
    ],
  },

  'image-resizer': {
    why: 'Almost every place you upload an image expects a specific size. Instagram wants a square, a YouTube thumbnail is 1280×720, a profile photo has a minimum, and a website hero needs exact pixels to look crisp. Upload the wrong dimensions and the platform crops off the important part, stretches the picture, or rejects it outright. The straight-from-camera photo is also usually far bigger than needed, which wastes bandwidth and slows pages.\n\nThis resizer lets you set exact width and height, with an aspect-ratio lock so changing one dimension adjusts the other automatically and your image never comes out squashed. Built-in presets cover the common social and web sizes so you do not have to look them up. Everything runs in your browser using the Canvas API, so your image is never uploaded — and your original is untouched, so you can re-export at another size in seconds. No account, no watermark, no limit.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload or drop in the image you want to resize. It is processed entirely on your device.' },
      { step: '2', title: 'Set dimensions or pick a preset', body: 'Type a custom width and height, or choose a built-in social/web preset. Keep aspect-ratio lock on to avoid distortion.' },
      { step: '3', title: 'Download', body: 'Click Resize and download the image at the exact new dimensions, ready to upload anywhere.' },
    ],
    useCases: [
      { title: 'Social media managers', body: 'Hit exact platform sizes for Instagram, YouTube, X, LinkedIn, and Facebook so nothing is cropped or rejected.' },
      { title: 'Web developers', body: 'Produce precise sizes for hero banners, card thumbnails, and avatars to keep layouts and load times tight.' },
      { title: 'Sellers & listings', body: 'Match the required photo dimensions for marketplace and store listings.' },
      { title: 'Print prep', body: 'Set images to exact pixel dimensions before sending them to a print service.' },
      { title: 'Profile & ID photos', body: 'Resize a headshot to the minimum or exact size a form or platform demands.' },
    ],
    faq: [
      { q: 'What is aspect-ratio lock?', a: 'With it on, changing the width updates the height automatically (and vice versa) so the image keeps its proportions and never looks stretched.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Resizing happens in your browser with the Canvas API, so your image never leaves your device.' },
      { q: 'Which formats are supported?', a: 'JPG, PNG, WebP, and GIF as input; output is JPEG or PNG.' },
      { q: 'Which social presets are included?', a: 'Common ones like Instagram post (1080×1080), YouTube thumbnail (1280×720), X post (1200×675), and Facebook cover (1200×628).' },
      { q: 'Will resizing reduce quality?', a: 'Making an image smaller keeps it crisp. Enlarging it beyond its original size can look soft — for that, use the AI Image Upscaler.' },
      { q: 'Can I resize without keeping the ratio?', a: 'Yes. Turn off the aspect-ratio lock to set width and height independently, though this can distort the image.' },
      { q: 'Can I resize on mobile?', a: 'Yes — it works in any modern mobile browser.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no watermark.' },
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
    why: 'PNG is a lossless format, which is great for screenshots and graphics but terrible for file size when the image is a photograph — a PNG photo can be five to ten times larger than the same picture saved as JPG. Those bloated files slow down web pages, bounce off email limits, and eat storage. Whenever an image does not actually need transparency, converting PNG to JPG usually cuts the size by 50–80% with almost no visible difference.\n\nThis converter makes that swap in one step, with a quality slider so you control the size-versus-sharpness trade-off, and batch support so you can do many files at once. It runs entirely in your browser using the Canvas API, so your images are never uploaded. The one thing to know is that JPG has no transparency: any transparent areas in the PNG are filled with white during conversion. No account, no watermark, no limit.',
    howTo: [
      { step: '1', title: 'Upload your PNG(s)', body: 'Click to upload one or several PNG files at once — all processed locally on your device.' },
      { step: '2', title: 'Set the JPEG quality', body: 'Drag the quality slider; 85–95% gives near-lossless results while still saving a lot of space.' },
      { step: '3', title: 'Download the JPGs', body: 'Grab each converted file individually or download them all together.' },
    ],
    useCases: [
      { title: 'Web publishing', body: 'Shrink heavy PNG screenshots and illustrations into light JPGs for faster pages and better Core Web Vitals.' },
      { title: 'Email attachments', body: 'Convert bulky PNGs to smaller JPGs so a batch of images fits under attachment limits.' },
      { title: 'CMS & storage', body: 'Upload JPGs instead of PNGs to cut storage use and speed up delivery on your site.' },
      { title: 'Photo sharing', body: 'Turn PNG photos exported from an app into compact JPGs that are quick to send and upload.' },
      { title: 'Form & listing uploads', body: 'Meet size caps on portals and marketplaces that a large PNG would exceed.' },
    ],
    faq: [
      { q: 'What happens to transparent areas?', a: 'JPG cannot store transparency, so transparent regions are filled with white. To pick a different background colour, use the Image Converter tool.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion runs in your browser with the Canvas API, so your images never leave your device.' },
      { q: 'Can I batch convert multiple PNGs?', a: 'Yes. Upload several files and they are all converted at the quality you set.' },
      { q: 'What quality should I use?', a: 'Around 85% is the sweet spot — typically ~60% smaller than the PNG with a barely visible difference.' },
      { q: 'How much smaller will the file get?', a: 'For photos and detailed images, expect 50–80% smaller. Simple flat graphics save less.' },
      { q: 'Should I ever keep the PNG?', a: 'Yes — keep PNG for logos, icons, screenshots with text, or anything needing transparency or perfectly crisp edges.' },
      { q: 'Does it work on my phone?', a: 'Yes — upload from your device in any modern mobile browser and download the JPG back.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no watermark.' },
    ],
  },

  'jpg-to-png': {
    why: 'JPEG is built for photographs, and its lossy compression leaves visible artifacts — fuzzy halos and blocky patches — around the sharp edges of logos, icons, text, and screenshots. It also cannot store transparency at all. When you need a clean, lossless image or a transparent-capable file for design and development work, converting JPG to PNG is the right move: PNG keeps every pixel exactly and supports an alpha channel.\n\nThis converter does it in one step with no settings to fiddle with, and supports batch conversion for multiple files at once. It runs entirely in your browser using the Canvas API, so nothing is uploaded. Two honest caveats worth knowing: converting cannot undo artifacts already baked into the original JPEG — it just prevents further loss from re-saving — and because PNG is lossless, the resulting file will usually be larger than the JPG, especially for photos. No account, no watermark, no limit.',
    howTo: [
      { step: '1', title: 'Upload your JPEG(s)', body: 'Click to upload one or more JPG/JPEG files; they are processed locally on your device.' },
      { step: '2', title: 'Convert', body: 'Conversion to lossless PNG is automatic — there are no quality settings to choose.' },
      { step: '3', title: 'Download the PNGs', body: 'Download each converted file individually or all at once.' },
    ],
    useCases: [
      { title: 'Logos & icons', body: 'Move a logo out of lossy JPG into PNG so it can be placed cleanly in designs and documents.' },
      { title: 'Screenshots & docs', body: 'Convert compressed JPG screenshots to crisp PNG for sharper, artifact-free technical documentation.' },
      { title: 'Editing pipelines', body: 'Switch to lossless PNG before editing so repeated saves do not keep degrading the image.' },
      { title: 'Transparency-ready base', body: 'Get a PNG that can hold transparency, ready to combine with a background-removed cut-out.' },
      { title: 'Tool compatibility', body: 'Produce a PNG for software or platforms that require it rather than JPG.' },
    ],
    faq: [
      { q: 'Will converting JPG to PNG improve quality?', a: 'It stops further loss from re-saving, but it cannot recover detail or remove artifacts already baked into the original JPEG.' },
      { q: 'Does this add transparency to my JPG?', a: 'It produces a PNG that can hold transparency, but a JPG has none to recover. To make the background transparent, use the Background Remover.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Conversion happens in your browser with the Canvas API, so your images never leave your device.' },
      { q: 'Will the PNG be larger than the JPG?', a: 'Usually yes. PNG is lossless, so for photographic content it typically produces a bigger file than JPEG.' },
      { q: 'When should I use JPG instead?', a: 'For photographs where small file size matters and you do not need transparency, JPG is the better choice.' },
      { q: 'Can I batch convert?', a: 'Yes — upload multiple JPGs and they are all converted at once.' },
      { q: 'Does it work on mobile?', a: 'Yes, in any modern mobile browser.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no watermark.' },
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
    why: 'QR codes are the quickest bridge between something physical and something digital. A single square on a menu, flyer, business card, poster, or product label lets anyone open a link, save a contact, or join a Wi-Fi network just by pointing their phone camera at it — no typing, no searching. That convenience is why QR codes are now everywhere from restaurant tables to event badges to shipping boxes.\n\nThis generator creates them instantly and entirely in your browser, with no account and no limits. Choose what you want to encode — a URL, plain text, email, phone number, or Wi-Fi credentials — and the preview updates live as you type. Because the content is encoded directly into the QR pattern and generated on your device, nothing is sent to a server and the codes are static: they never expire and keep working forever, with no scan caps or subscription. Download at the resolution you need, from a small web size up to a crisp 800px for print.',
    howTo: [
      { step: '1', title: 'Choose your QR type', body: 'Pick what to encode: a website URL, plain text, an email address, a phone number, or Wi-Fi network credentials.' },
      { step: '2', title: 'Enter your content', body: 'Fill in the link or details. The QR preview regenerates live so you can confirm it before downloading.' },
      { step: '3', title: 'Download at the right size', body: 'Save the code at 200, 400, 600, or 800px. Use a larger size for anything that will be printed.' },
    ],
    useCases: [
      { title: 'Restaurants & hospitality', body: 'Put a QR on each table linking to a digital menu, booking page, or loyalty sign-up — easy to update without reprinting.' },
      { title: 'Marketing & print', body: 'Add codes to ads, flyers, packaging, and business cards to send people straight to a landing page or app store.' },
      { title: 'Events & venues', body: 'Share Wi-Fi access, registration links, schedules, or check-in pages with a single scannable code.' },
      { title: 'Retail & products', body: 'Link packaging to instructions, warranty registration, reviews, or reorder pages.' },
      { title: 'Personal & networking', body: 'Encode your contact details or portfolio link so new contacts can save them in one scan.' },
    ],
    faq: [
      { q: 'Do these QR codes expire?', a: 'No. They are static codes that encode your content directly, so they never expire and have no scan limits — they work forever.' },
      { q: 'Is my content uploaded anywhere?', a: 'No. Codes are generated entirely in your browser, so nothing you enter is sent to any server.' },
      { q: 'What size should I use for print?', a: 'Use 800px for printed materials. As a rule, keep the printed code at least about 2cm × 2cm so phones can scan it reliably.' },
      { q: 'Can a QR code store Wi-Fi login details?', a: 'Yes. Choose the Wi-Fi type and enter the network name and password; scanning it lets a phone join the network without typing.' },
      { q: 'Will the code still scan if I resize it?', a: 'Yes, as long as it stays reasonably large and high-contrast. Avoid stretching it unevenly or printing it too small.' },
      { q: 'Can I change the colours or add a logo?', a: 'Currently codes are black on white for maximum scan reliability. Custom colours and logo embedding may be added later.' },
      { q: 'Is there a limit on how many I can make?', a: 'No. Generate as many codes as you like — it is free, with no sign-up and no daily cap.' },
      { q: 'Why is plain black-on-white recommended?', a: 'Scanners rely on strong contrast between the dark pattern and light background; black on white scans fastest in the widest range of lighting.' },
    ],
  },

  'url-shortener': {
    why: 'Long URLs are a problem in a lot of places: they blow past character limits on social platforms, wrap awkwardly in emails, are impossible to read aloud or type from a flyer, and look untrustworthy with a trail of tracking parameters. A short link fixes all of that — it is clean, fits anywhere, and with a custom slug like /s/blackfriday it is even memorable and on-brand.\n\nThis shortener turns any long URL into a tidy short link in one step, with an optional custom slug or an auto-generated code. It also counts clicks per link, so you can see which channel or post is actually driving traffic — useful for measuring a campaign without a heavyweight analytics setup. To make the redirect work, only the destination URL is stored; no personal data or IP addresses are collected, and links last until you delete them. It is free, with no account required.',
    howTo: [
      { step: '1', title: 'Paste your long URL', body: 'Enter the full destination URL — including any tracking parameters — into the input field.' },
      { step: '2', title: 'Set a custom slug (optional)', body: 'Type a memorable path like "spring-sale", or leave it blank to get a short random code.' },
      { step: '3', title: 'Copy, share, and track', body: 'Copy the short link and share it anywhere. Watch total clicks for each link in your created-links list.' },
    ],
    useCases: [
      { title: 'Social media', body: 'Fit links within character limits and tidy up previews on X, Instagram bios, and other platforms.' },
      { title: 'Marketing campaigns', body: 'Create branded, memorable links for print, ads, and email, and compare clicks across channels.' },
      { title: 'Print & offline', body: 'Use a short, typeable link on flyers, posters, slides, and business cards where a long URL is unusable.' },
      { title: 'Internal sharing', body: 'Shorten unwieldy dashboard, wiki, or document URLs to paste cleanly into chat.' },
      { title: 'QR codes', body: 'Encode a short link in a QR code so the pattern is simpler and easier to scan than a long URL.' },
    ],
    faq: [
      { q: 'Are short links permanent?', a: 'Yes. They keep working until you choose to delete them.' },
      { q: 'Is my URL stored?', a: 'Yes — the destination URL is stored so the redirect can work. Only the URL is kept; no personal data is collected.' },
      { q: 'Are clicks tracked?', a: 'A total click count is recorded per link. No IP addresses or personal identifiers are stored.' },
      { q: 'Can I choose my own short code?', a: 'Yes. Set a custom slug to make the link memorable, or leave it blank for an automatically generated code.' },
      { q: 'What happens if my custom slug is taken?', a: 'Slugs are unique, so if one is already in use you’ll be asked to pick another.' },
      { q: 'Can I use my own domain?', a: 'Not currently — all links use the default short domain.' },
      { q: 'Do the links work with tracking parameters?', a: 'Yes. The full destination, including UTM and other query parameters, is preserved on redirect.' },
      { q: 'Is it free?', a: 'Yes — free to use with no sign-up required.' },
    ],
  },

  'password-generator': {
    why: 'Reused and guessable passwords are behind the majority of account breaches. The moment one site you use leaks its database, attackers try that same email-and-password combination everywhere else — so a single weak password can unlock your email, bank, and social accounts at once. The only real defence is a long, random, unique password for every account, which is impossible to invent in your head and tedious to type by hand.\n\nThis generator creates them properly. It uses your browser’s cryptographic randomness — window.crypto.getRandomValues(), not the predictable Math.random() — so the output is genuinely unguessable, and it shows the entropy in bits as a live strength gauge. You control the length and whether to include uppercase, lowercase, numbers, and symbols. Everything happens on your device: the password is never sent over the network, logged, or stored anywhere, so it is safe to generate even for your most sensitive accounts. Generate, copy, and save it straight into your password manager.',
    howTo: [
      { step: '1', title: 'Set your options', body: 'Choose the length and which character types to include — uppercase, lowercase, numbers, and symbols. More types and length means stronger.' },
      { step: '2', title: 'Generate', body: 'A fresh password appears instantly, with its entropy in bits shown so you can see how strong it is. Regenerate until you are happy.' },
      { step: '3', title: 'Copy and store', body: 'Click Copy and paste it into your password manager or the signup form. Never reuse it on another account.' },
    ],
    useCases: [
      { title: 'Everyday account security', body: 'Create a unique strong password for every new signup so one leaked site can never compromise your other accounts.' },
      { title: 'IT & administrators', body: 'Generate strong temporary credentials for new user accounts, routers, databases, and shared systems.' },
      { title: 'Developers', body: 'Produce random secrets for environment variables, API keys, JWT signing keys, and webhook tokens.' },
      { title: 'Resetting after a breach', body: 'Quickly roll new passwords for every affected account when a service you use reports a data breach.' },
      { title: 'Wi-Fi & devices', body: 'Set a long, random password on your router or IoT devices that no one can guess or brute-force.' },
    ],
    faq: [
      { q: 'Is this truly random and secure?', a: 'Yes. It uses window.crypto.getRandomValues(), the browser’s cryptographically secure random source — far safer than the predictable Math.random() many generators rely on.' },
      { q: 'Is the password sent anywhere?', a: 'No. Generation is 100% client-side. Nothing is transmitted, logged, or stored, so even passwords for sensitive accounts stay private.' },
      { q: 'How long should my password be?', a: '16+ characters with mixed types is strong for everyday use. For high-value accounts, go 24+ characters.' },
      { q: 'What does "entropy in bits" mean?', a: 'It measures unpredictability — how hard the password is to brute-force. Roughly: 80+ bits is strong, 128+ bits is excellent.' },
      { q: 'Should I include symbols?', a: 'Yes where the site allows them — they increase entropy. If a site rejects symbols, compensate with extra length.' },
      { q: 'How do I remember these?', a: 'You don’t — that’s the point. Store each one in a password manager and only memorise the single master password.' },
      { q: 'Are generated passwords ever repeated?', a: 'The odds of a collision at reasonable lengths are astronomically small, so each generated password is effectively unique.' },
      { q: 'Is it free with no limits?', a: 'Yes — completely free, no sign-up, and you can generate as many passwords as you want.' },
    ],
  },

  // ─── Developer Tools ──────────────────────────────────────────────────────

  'json-formatter': {
    why: 'JSON is the language APIs, config files, and logs speak in, but it usually arrives minified — one giant line with no spacing — which is almost impossible to read or debug. When something is wrong, a single missing comma or unclosed bracket can break an entire payload, and hunting for it in a wall of text wastes real time. A formatter turns that mess into clean, indented, colour-readable structure and points straight at syntax errors.\n\nThis tool prettifies JSON with your choice of indentation, validates it and highlights where parsing fails, can minify it back down for production, and optionally sorts object keys alphabetically so two objects are easy to compare. It all runs in your browser in pure JavaScript, which matters more than it sounds: developers often paste API responses, tokens, or config containing secrets into online formatters, and here that data never leaves your device or touches a server. No account, no limits — paste, format, copy.',
    howTo: [
      { step: '1', title: 'Paste your JSON', body: 'Drop in the raw or minified JSON from an API response, log line, or config file.' },
      { step: '2', title: 'Choose indentation', body: 'Pick 2 spaces, 4 spaces, or tabs. If the JSON is invalid, the tool flags the error so you can fix it.' },
      { step: '3', title: 'Prettify, minify, or copy', body: 'Format it for reading, minify it for production, optionally sort keys, then copy the result.' },
    ],
    useCases: [
      { title: 'API debugging', body: 'Make a raw API response readable instantly to inspect field names, nesting, and values while developing.' },
      { title: 'Config file editing', body: 'Prettify dense config like package.json or tsconfig.json, edit it, then minify if needed.' },
      { title: 'Validation', body: 'Confirm a JSON string is syntactically valid — and find exactly where it breaks — before your code tries to parse it.' },
      { title: 'Comparing objects', body: 'Sort keys alphabetically on two payloads so a diff highlights real differences instead of key-order noise.' },
      { title: 'Documentation & sharing', body: 'Clean up example payloads before pasting them into docs, tickets, or a pull request.' },
    ],
    faq: [
      { q: 'Is my JSON sent to a server?', a: 'No. All formatting and validation happen in your browser, so sensitive payloads, tokens, and secrets never leave your device.' },
      { q: 'Does it support comments or JSON5?', a: 'No — it follows standard JSON (RFC 8259). Comments or trailing commas will be reported as a parse error.' },
      { q: 'How does it help me find errors?', a: 'When the JSON is invalid, the parser reports the failure so you can locate the missing comma, quote, or bracket quickly.' },
      { q: 'What does "Sort keys" do?', a: 'It reorders every object’s keys alphabetically, which makes large objects easier to scan and makes two payloads directly comparable.' },
      { q: 'What is the difference between prettify and minify?', a: 'Prettify adds indentation and line breaks for humans; minify strips all whitespace to produce the smallest possible string for production or transport.' },
      { q: 'Is there a size limit?', a: 'No hard limit, but very large documents (over ~10MB) may format slowly depending on your device.' },
      { q: 'Does formatting change my data?', a: 'No. It only changes whitespace and, if you choose, key order — the actual values and structure are untouched.' },
      { q: 'Is it free?', a: 'Yes — completely free, no sign-up, and no usage limits.' },
    ],
  },

  'base64': {
    why: 'Base64 is the standard way to carry binary data — images, files, credentials — through channels that only safely handle text, and it turns up all over development. You hit it when embedding an image directly in CSS or HTML as a data URI, building an HTTP Basic Auth header, reading a JWT, storing a small asset in JSON, or moving binary payloads through APIs and email. Doing the conversion by hand is impossible, and writing a throwaway script every time is a waste.\n\nThis tool encodes and decodes Base64 instantly, for both plain text and full files, with support for the URL-safe Base64URL variant used in tokens. Everything runs in your browser, so credentials, keys, or private files you paste in never touch a server — a real concern with online encoders. Encode text or upload a file to get its Base64 string, or paste a string to decode it back and download the original file. No account, no limits.',
    howTo: [
      { step: '1', title: 'Choose encode or decode', body: 'Pick whether you want to encode text or a file into Base64, or decode a Base64 string back to its original.' },
      { step: '2', title: 'Paste text or upload a file', body: 'To encode, paste text or drop in any file. To decode, paste the Base64 (or Base64URL) string.' },
      { step: '3', title: 'Copy or download', body: 'Copy the encoded string to your clipboard, or download the decoded file.' },
    ],
    useCases: [
      { title: 'Web development', body: 'Turn small images and fonts into Base64 data URIs to embed them inline in HTML/CSS and avoid extra network requests.' },
      { title: 'API authentication', body: 'Build HTTP Basic Auth headers by encoding "username:password" to Base64.' },
      { title: 'JWT & token inspection', body: 'Decode the Base64URL-encoded parts of a token to read its header and payload claims.' },
      { title: 'Data transport', body: 'Encode binary blobs so they can ride safely inside JSON, XML, query strings, or email bodies.' },
      { title: 'Debugging', body: 'Quickly decode a mysterious Base64 string from a log, config, or response to see what it actually contains.' },
    ],
    faq: [
      { q: 'Is my data sent to a server?', a: 'No. All encoding and decoding happen entirely in your browser, so credentials, keys, and private files never leave your device.' },
      { q: 'What is Base64URL?', a: 'A URL- and filename-safe variant that replaces + with - and / with _, and usually drops padding. It is what JWTs use.' },
      { q: 'Can I encode binary files?', a: 'Yes. Upload any file to get its Base64 string, ready for a data URI or an API payload — and decode it back to download the original.' },
      { q: 'Why does Base64 make data bigger?', a: 'It represents every 3 bytes as 4 text characters, so the output is about 33% larger than the input. That overhead is the cost of being text-safe.' },
      { q: 'Does Base64 encrypt my data?', a: 'No. Base64 is encoding, not encryption — anyone can decode it. Never use it to protect secrets.' },
      { q: 'Is there a size limit?', a: 'Text is effectively unlimited. File encoding works well up to around 10MB.' },
      { q: 'What character set is used for text?', a: 'Text is handled as UTF-8 before encoding, so accented characters and emoji round-trip correctly.' },
      { q: 'Is it free?', a: 'Yes — completely free, no sign-up, and no limits.' },
    ],
  },

  'regex-tester': {
    why: 'Regular expressions are powerful but unforgiving: a single misplaced quantifier or unescaped character changes what matches, and the bug often hides until it hits real data in production. Building a pattern blind — editing in your code, redeploying, and checking the logs — is painfully slow. What you actually need is a live sandbox where you can see, character by character, exactly what your pattern matches against real sample text.\n\nThis tester gives you that instant feedback. Type a pattern and paste your test string, and matches highlight in real time, with a match count and any captured groups shown below so you can confirm your pattern does exactly what you intend before it touches your codebase. It uses the JavaScript (ECMAScript) regex engine and supports the common flags, plus one-click preset patterns for everyday cases like emails and URLs. Everything runs in your browser, so the text you test — which might include real user data — never leaves your device.',
    howTo: [
      { step: '1', title: 'Enter your regex pattern', body: 'Type or paste your regular expression into the pattern field, and set flags like g, i, or m.' },
      { step: '2', title: 'Paste your test string', body: 'Add the sample text you want to match against — the more representative of real data, the better.' },
      { step: '3', title: 'Read the live results', body: 'Matches highlight as you type, and the match count and captured groups appear below so you can verify the pattern.' },
    ],
    useCases: [
      { title: 'Input validation', body: 'Prove out email, phone, URL, and postcode patterns against good and bad examples before wiring them into validation logic.' },
      { title: 'Search & replace', body: 'Build and verify patterns for find/replace in editors, scripts, and data-cleaning pipelines.' },
      { title: 'Log & data parsing', body: 'Design capture groups that pull structured fields out of log lines, CSVs, and error messages.' },
      { title: 'Learning regex', body: 'Experiment safely and watch how each change to the pattern affects what matches — the fastest way to learn.' },
      { title: 'Debugging a failing pattern', body: 'Paste a regex that misbehaves in production and the data it should match to see exactly where it goes wrong.' },
    ],
    faq: [
      { q: 'Which regex flavour is used?', a: 'JavaScript RegExp (ECMAScript). PCRE-only features such as lookbehind in older engines or recursion may not be available.' },
      { q: 'Is my data sent to a server?', a: 'No. All matching runs in your browser, so your pattern and test text — including any real data — never leave your device.' },
      { q: 'Which flags are supported?', a: 'The common ones: g (global), i (case-insensitive), m (multiline), and s (dotAll).' },
      { q: 'Does it show captured groups?', a: 'Yes. Along with the match count, it lists the captured groups so you can confirm your parentheses capture the right parts.' },
      { q: 'What preset patterns are included?', a: 'One-click presets for email, URL, phone number, IPv4 address, and common date formats to use as a starting point.' },
      { q: 'How do I match across multiple lines?', a: 'Use the m flag so ^ and $ match at line breaks, and the s flag if you need . to match newline characters too.' },
      { q: 'Why does my pattern match nothing?', a: 'Common causes are forgetting the g flag, not escaping special characters like . or ?, or a case mismatch — add the i flag to test.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no limits.' },
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
    why: 'A JSON Web Token looks like a meaningless blob of characters, but it is really three Base64URL-encoded parts — a header, a payload, and a signature — separated by dots. Inside the payload sit the things you actually care about when debugging authentication: who the user is, their roles and permissions, when the token was issued, and when it expires. When a login fails, an API returns 401, or a permission check misbehaves, the fastest way to understand why is to read what is actually in the token.\n\nThis decoder splits a JWT apart and shows the header and payload as clean, readable JSON, flags whether the token has expired, and reveals the signing algorithm. It runs entirely in your browser — nothing is uploaded — which matters because JWTs are live credentials. Paste a token and instantly see its contents instead of writing throwaway code or pasting it into a site that might log it. Note that decoding only reads the token; it does not and cannot verify the signature.',
    howTo: [
      { step: '1', title: 'Paste your JWT', body: 'Copy the token — the long string that usually starts with "eyJ" — and paste it into the input.' },
      { step: '2', title: 'View the decoded parts', body: 'The header, payload, and signature segment are split out and formatted as readable JSON automatically.' },
      { step: '3', title: 'Check expiry and claims', body: 'See whether the token is expired and read every claim — roles, subject, issuer, and timestamps — at a glance.' },
    ],
    useCases: [
      { title: 'Authentication debugging', body: 'Confirm a user’s roles, scopes, and token expiry while tracking down a login or 401 issue.' },
      { title: 'API integration', body: 'Decode tokens from a third-party provider to learn the claim names and structure you need to handle.' },
      { title: 'Security review', body: 'Check what data a token exposes and which algorithm the header declares (watching out for "none" or weak choices).' },
      { title: 'Support & QA', body: 'Quickly verify whether a reported auth bug is caused by an expired or malformed token.' },
      { title: 'Learning JWTs', body: 'See exactly how a real token is structured to understand how stateless authentication works.' },
    ],
    faq: [
      { q: 'Is my JWT sent to a server?', a: 'No. Decoding is 100% client-side, so your token never leaves your device.' },
      { q: 'Does this verify the signature?', a: 'No. Verifying the signature requires the secret or public key; this tool only decodes and displays the header and payload.' },
      { q: 'Is it safe to paste a production token?', a: 'Because nothing is uploaded, it is safer than most online decoders — but still treat JWTs as live credentials and avoid sharing your screen with one displayed.' },
      { q: 'Which algorithms are supported?', a: 'Any standard JWT in header.payload.signature format, including HS256, RS256, and ES256 — the algorithm is shown in the decoded header.' },
      { q: 'Why is the signature shown as unreadable?', a: 'The signature is a cryptographic hash, not encoded JSON, so it is not human-readable by design — only the header and payload decode to text.' },
      { q: 'How do I read the expiry?', a: 'The exp claim is a Unix timestamp; the tool converts it and tells you whether the token has already expired.' },
      { q: 'Can it decode an encrypted (JWE) token?', a: 'No. This handles signed JWTs (JWS). Encrypted JWE tokens cannot be read without the decryption key.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no limits.' },
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
    why: 'Almost every piece of writing comes with a number attached to it: an essay has a minimum and maximum, a meta description has a character limit, a tweet has 280 characters, a college application has a hard cap, and an SEO article has a target length. Guessing whether you have hit those limits — or pasting into a word processor just to check — slows you down and risks going over or under, which can cost marks, get a post truncated, or hurt search performance.\n\nThis counter shows everything live as you type: words, characters (with and without spaces), sentences, paragraphs, estimated reading and speaking time, and your most-used keywords with their density. You can set a target word count and watch a progress bar fill as you write. It all runs in your browser, so your draft — which might be confidential or unpublished — never gets uploaded. No account, no submit button, no limit on length.',
    howTo: [
      { step: '1', title: 'Paste or type your text', body: 'Write or paste your content into the text area. Every statistic updates instantly as you go.' },
      { step: '2', title: 'Review the stats', body: 'See words, characters, sentences, paragraphs, estimated reading time, and the top keywords by frequency.' },
      { step: '3', title: 'Set a target (optional)', body: 'Enter a target word count to get a live progress bar showing exactly how close you are to the goal.' },
    ],
    useCases: [
      { title: 'Students', body: 'Check essays and assignments against minimum and maximum word limits before submitting — no nasty surprises at the deadline.' },
      { title: 'SEO & content writers', body: 'Hit target article lengths and watch keyword density while drafting, so content is the right depth without keyword stuffing.' },
      { title: 'Social & marketing', body: 'Stay within character limits for tweets, meta descriptions, ad copy, and bios that get cut off when too long.' },
      { title: 'Authors & bloggers', body: 'Track length and estimated reading time to match what your audience expects from a post.' },
      { title: 'Speakers & presenters', body: 'Use the estimated speaking time to size a script to a talk’s time slot before rehearsing.' },
    ],
    faq: [
      { q: 'Is my text sent to a server?', a: 'No. All counting and analysis happen in your browser, so your draft never leaves your device — fine for confidential or unpublished work.' },
      { q: 'How is reading time calculated?', a: 'From an average adult reading speed of roughly 200–250 words per minute; speaking time uses a slower spoken pace.' },
      { q: 'Does it count characters with and without spaces?', a: 'Yes. Both are shown, which is useful for platforms and fields that count spaces toward their limit.' },
      { q: 'What are stop words in the keyword stats?', a: 'Common words like "the", "a", and "is" are excluded from keyword density because they carry no topical meaning and would otherwise dominate the list.' },
      { q: 'Does it update as I type?', a: 'Yes — every figure recalculates live with each keystroke, so there is no button to press or waiting.' },
      { q: 'Can I set a word-count goal?', a: 'Yes. Enter a target and a progress bar shows how close you are, which is handy for essays and articles with a required length.' },
      { q: 'Is there a length limit?', a: 'No. Paste documents of any size; everything is processed locally on your device.' },
      { q: 'Is it free?', a: 'Completely free, with no sign-up and no limits.' },
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

  // ─── Calculators ────────────────────────────────────────────────────────────

  'percentage-calculator': {
    why: 'Percentages are everywhere in daily life — a discount in a sale, a tip, a test score, a tax rate, a change in price or followers — but they trip people up because the word "percent" hides three different questions. "What is 20% of 80?", "15 is what percent of 60?", and "what is the change from 80 to 100?" each need a different formula, and grabbing the wrong one quietly gives the wrong answer.\n\nThis calculator separates those three questions into their own boxes, so you pick the one that matches what you are actually asking and just type the numbers. Results update instantly as you type, with increases and decreases colour-coded so a rise and a fall are impossible to confuse. Everything is calculated in your browser, so nothing is uploaded, and there is no sign-up — it is built to give you a quick, correct answer without you having to remember which formula goes where.',
    howTo: [
      { step: '1', title: 'Pick the calculation', body: 'Choose the box that matches your question: percent of a number, one number as a percent of another, or the percentage change between two numbers.' },
      { step: '2', title: 'Enter your numbers', body: 'Type the values into the fields. The result recalculates live as you type — no submit button.' },
      { step: '3', title: 'Read the result', body: 'The answer appears in bold; percentage decreases show in red and increases in green so you can’t misread the direction.' },
    ],
    useCases: [
      { title: 'Shopping & discounts', body: 'See how much a "30% off" actually saves, or work out the discount percentage from an original and sale price.' },
      { title: 'Grades & scores', body: 'Turn marks into a percentage — for example, 47 out of 60 — to check against a pass mark or grade boundary.' },
      { title: 'Finance & business', body: 'Calculate percentage growth or decline between two figures such as revenue, costs, or budget.' },
      { title: 'Tax, tips & VAT', body: 'Add or work back a percentage for sales tax, VAT, service charges, or commission.' },
      { title: 'Stats & reporting', body: 'Express one number as a share of a total, or report the change between two periods.' },
    ],
    faq: [
      { q: 'How do I calculate “X% of Y”?', a: 'Multiply: X ÷ 100 × Y. The first box does this for you — e.g. 20% of 80 is 16.' },
      { q: 'How do I find what percent one number is of another?', a: 'Divide and multiply by 100: part ÷ whole × 100. So 15 out of 60 is 25%.' },
      { q: 'How do I calculate percentage change?', a: 'Percentage change = (new − old) ÷ |old| × 100. The third box handles it automatically.' },
      { q: 'Does it handle decreases?', a: 'Yes. A drop from 100 to 80 shows as −20%, and a rise from 80 to 100 shows as +25%.' },
      { q: 'What’s the difference between percent change and percentage points?', a: 'Going from 10% to 12% is a 2 percentage-point rise but a 20% increase. This tool reports the percentage change of the values you enter.' },
      { q: 'Can I work backwards from a final price?', a: 'Yes — use the "percent of" and "change" boxes together, or the dedicated Discount Calculator for sale-price problems.' },
      { q: 'Is anything sent to a server?', a: 'No. All the maths runs in your browser; nothing you type is uploaded.' },
      { q: 'Is it free?', a: 'Yes — free, with no sign-up.' },
    ],
  },

  'age-calculator': {
    why: 'Working out an exact age in your head is deceptively hard. Months have different lengths, leap years add a day every four years, and "two years and a bit" is rarely precise enough for a form that asks for age in years, months, and days. Whether you are completing an application, checking eligibility for an age-restricted service, or just curious how many days old someone is, doing it by hand is fiddly and easy to get wrong by a day or two.\n\nThis calculator removes the guesswork. Enter a date of birth and it computes the exact difference to today — or to any date you choose — in years, months, and days, and also expresses the total in months, weeks, days, and hours. It even counts down to the next birthday. All calculations use real calendar dates so leap years are handled correctly, and everything runs in your browser, so the dates you enter are never uploaded. No account, no limit.',
    howTo: [
      { step: '1', title: 'Enter the date of birth', body: 'Pick the birth date with the date selector.' },
      { step: '2', title: 'Set the target date', body: 'Leave it on today for current age, or choose any past or future date to find the age at that point.' },
      { step: '3', title: 'View the breakdown', body: 'See the exact years, months, and days, plus totals in weeks, days, and hours, and a countdown to the next birthday.' },
    ],
    useCases: [
      { title: 'Forms & eligibility', body: 'Confirm an exact age for applications, age-restricted services, pensions, or benefits.' },
      { title: 'Milestones & gifts', body: 'Find out how many days or hours someone has been alive for a birthday surprise or card.' },
      { title: 'Event planning', body: 'Work out how old someone will be at a future wedding, graduation, or trip.' },
      { title: 'Parenting', body: 'Track a baby’s age in weeks and months for appointments and developmental milestones.' },
      { title: 'HR & records', body: 'Verify ages from birth dates accurately for compliance and record-keeping.' },
    ],
    faq: [
      { q: 'Does it account for leap years?', a: 'Yes. It uses real calendar dates, so the 29th of February and leap years are handled correctly.' },
      { q: 'Can I calculate age at a past or future date?', a: 'Yes. Set the target date to any date on or after the date of birth to get the age at that moment.' },
      { q: 'How is age in months and days calculated?', a: 'It counts full calendar months and the remaining days between the two dates, rather than averaging 30-day months, so the result is exact.' },
      { q: 'Does it show a countdown to the next birthday?', a: 'Yes — it tells you how long until the next birthday from the target date.' },
      { q: 'Can it calculate the gap between any two dates?', a: 'Yes; treat the first date as the "birth" date and the second as the target to measure any duration. For pure date gaps, the Date Duration Calculator is also available.' },
      { q: 'What date format does it use?', a: 'You select dates from a calendar picker, so there is no ambiguity between day-first and month-first formats.' },
      { q: 'Are my dates uploaded?', a: 'No. Everything is calculated locally in your browser.' },
      { q: 'Is it free?', a: 'Yes — free, with no sign-up.' },
    ],
  },

  'bmi-calculator': {
    why: 'Body Mass Index is a quick screening tool used by health services worldwide to flag whether weight may be too low or too high for a given height. It is easy to miscalculate by mixing units — this tool handles both metric and imperial correctly.',
    howTo: [
      { step: '1', title: 'Choose your units', body: 'Switch between metric (cm, kg) and imperial (ft/in, lb).' },
      { step: '2', title: 'Enter height and weight', body: 'Type your measurements into the fields.' },
      { step: '3', title: 'Read your category', body: 'Your BMI and weight category appear instantly, colour-coded against WHO ranges.' },
    ],
    useCases: [
      { title: 'Health check-ins', body: 'Track whether your weight sits in the healthy range over time.' },
      { title: 'Fitness goals', body: 'Use BMI as one reference point alongside other measures when setting targets.' },
      { title: 'Medical forms', body: 'Quickly compute BMI when a form or doctor asks for it.' },
    ],
    faq: [
      { q: 'What is a healthy BMI?', a: 'The WHO ranges are: under 18.5 underweight, 18.5–25 normal, 25–30 overweight, 30+ obese.' },
      { q: 'Is BMI accurate for everyone?', a: 'BMI is a screening tool, not a diagnosis. It does not distinguish muscle from fat, so very muscular people may read high. Consult a professional for personalised advice.' },
      { q: 'Is my data stored?', a: 'No. The calculation runs entirely in your browser.' },
    ],
  },

  'loan-calculator': {
    why: 'The monthly payment on an amortising loan is not simply the amount divided by the number of months — interest compounds over the term. This calculator uses the standard EMI formula so you can see your true monthly cost and total interest before you borrow.',
    howTo: [
      { step: '1', title: 'Enter the loan amount', body: 'Type the principal you intend to borrow.' },
      { step: '2', title: 'Set rate and term', body: 'Enter the annual interest rate and the term in years.' },
      { step: '3', title: 'Review the breakdown', body: 'See your monthly EMI, total interest paid, and total amount payable.' },
    ],
    useCases: [
      { title: 'Mortgages', body: 'Estimate monthly home-loan repayments across different rates and terms.' },
      { title: 'Car & personal loans', body: 'Compare offers by seeing the real total cost including interest.' },
      { title: 'Budgeting', body: 'Check whether a prospective repayment fits your monthly budget.' },
    ],
    faq: [
      { q: 'What is EMI?', a: 'EMI (Equated Monthly Instalment) is the fixed amount you pay each month, covering both principal and interest, until the loan is fully repaid.' },
      { q: 'Does it support a 0% rate?', a: 'Yes. With a 0% rate the payment is simply the principal divided by the number of months.' },
      { q: 'Is this financial advice?', a: 'No. It is an estimate for comparison. Lenders may add fees and use different rounding.' },
    ],
  },

  'discount-calculator': {
    why: 'Sales advertise percentages off, but what you really want to know is the final price and how much you actually save — especially when tax is added afterwards. This tool gives you all three figures at once.',
    howTo: [
      { step: '1', title: 'Enter the original price', body: 'Type the pre-discount price of the item.' },
      { step: '2', title: 'Enter the discount', body: 'Add the discount percentage, and optionally a tax rate to apply on top.' },
      { step: '3', title: 'See your savings', body: 'View the final price, the amount saved, and the price after discount before tax.' },
    ],
    useCases: [
      { title: 'Sales & coupons', body: 'Check the true price of a "25% off" deal before you buy.' },
      { title: 'Black Friday', body: 'Compare stacked discounts quickly while shopping.' },
      { title: 'Retail & invoicing', body: 'Apply a discount and tax line to quote a customer price.' },
    ],
    faq: [
      { q: 'How is the discount applied?', a: 'The discount percentage is subtracted from the original price first, then any tax is applied to the discounted amount.' },
      { q: 'Can I leave tax blank?', a: 'Yes. Leave tax at 0 to see just the discounted price.' },
      { q: 'Does it work in any currency?', a: 'Yes. The maths is currency-agnostic — just read the numbers in your own currency.' },
    ],
  },

  'unit-converter': {
    why: 'Switching between metric and imperial units by memory is unreliable. This converter uses precise SI conversion factors across six measurement categories plus temperature, so results are accurate every time.',
    howTo: [
      { step: '1', title: 'Pick a category', body: 'Choose length, weight, temperature, area, volume, or speed.' },
      { step: '2', title: 'Select units', body: 'Choose the unit to convert from and the unit to convert to. Use the swap button to reverse them.' },
      { step: '3', title: 'Enter a value', body: 'Type the value and read the converted result instantly.' },
    ],
    useCases: [
      { title: 'Travel', body: 'Convert miles to kilometres or Fahrenheit to Celsius while abroad.' },
      { title: 'Cooking', body: 'Switch recipe measurements between cups, millilitres, and grams.' },
      { title: 'Study & work', body: 'Convert engineering and science units accurately for homework or reports.' },
    ],
    faq: [
      { q: 'How accurate are the conversions?', a: 'Conversions use standard SI factors and are accurate to six decimal places.' },
      { q: 'Does it convert temperature correctly?', a: 'Yes. Temperature uses proper offset formulas (not simple ratios) for Celsius, Fahrenheit, and Kelvin.' },
      { q: 'Is it free?', a: 'Yes, completely free with no limits, and it runs entirely in your browser.' },
    ],
  },

  // ─── More Developer Tools ────────────────────────────────────────────────────

  'hash-generator': {
    why: 'Cryptographic hashes are used everywhere — verifying downloads, storing password fingerprints, and signing data. This tool computes them with the browser\'s native Web Crypto API, so your input never leaves your device.',
    howTo: [
      { step: '1', title: 'Type or paste text', body: 'Enter the text you want to hash into the input box.' },
      { step: '2', title: 'See all digests', body: 'SHA-1, SHA-256, SHA-384, and SHA-512 are computed automatically as you type.' },
      { step: '3', title: 'Copy a hash', body: 'Click the copy icon next to any algorithm to copy its digest.' },
    ],
    useCases: [
      { title: 'File & data integrity', body: 'Generate a checksum to confirm data has not been altered.' },
      { title: 'Development & testing', body: 'Produce known hash values for unit tests and fixtures.' },
      { title: 'Learning', body: 'See how the same input always maps to the same fixed-length hash.' },
    ],
    faq: [
      { q: 'Why no MD5?', a: 'MD5 is not provided by the browser\'s Web Crypto API and is cryptographically broken. SHA-256 or stronger is recommended for new work.' },
      { q: 'Is my text uploaded?', a: 'No. Hashing happens entirely in your browser using crypto.subtle.' },
      { q: 'Can I reverse a hash?', a: 'No. Cryptographic hashes are one-way — the original text cannot be recovered from the digest.' },
    ],
  },

  'timestamp-converter': {
    why: 'Logs, databases, and APIs store time as a Unix epoch number, which is unreadable at a glance. This converter translates between epoch timestamps and human dates in both directions, showing local, UTC, and ISO formats.',
    howTo: [
      { step: '1', title: 'Convert a timestamp', body: 'Paste a Unix timestamp (seconds or milliseconds) to see the matching date in local, UTC, and ISO formats.' },
      { step: '2', title: 'Convert a date', body: 'Pick a date and time to get its Unix timestamp in seconds.' },
      { step: '3', title: 'Copy the result', body: 'Click any value to copy it. The live clock shows the current Unix time.' },
    ],
    useCases: [
      { title: 'Debugging logs', body: 'Turn epoch timestamps in server logs into readable dates.' },
      { title: 'API development', body: 'Generate timestamps for requests or verify ones in responses.' },
      { title: 'Database work', body: 'Convert stored Unix times to human-readable values for inspection.' },
    ],
    faq: [
      { q: 'Seconds or milliseconds?', a: 'The tool auto-detects: values longer than 11 digits are treated as milliseconds, otherwise as seconds.' },
      { q: 'What timezone is used?', a: 'It shows your local timezone plus UTC and ISO 8601 so you can use whichever you need.' },
      { q: 'Is the conversion done online?', a: 'No. Everything runs in your browser.' },
    ],
  },

  'url-encoder': {
    why: 'URLs can only contain a limited set of characters, so spaces, ampersands, and non-ASCII text must be percent-encoded. Using the wrong function (whole URL vs. a single query value) is a frequent bug — this tool lets you pick the right one.',
    howTo: [
      { step: '1', title: 'Choose encode or decode', body: 'Switch between encoding plain text and decoding an encoded string.' },
      { step: '2', title: 'Pick the scope', body: 'Use component encoding for query values, or turn it off to preserve full-URL structure.' },
      { step: '3', title: 'Paste and copy', body: 'Enter your text and copy the converted output.' },
    ],
    useCases: [
      { title: 'Building query strings', body: 'Safely encode parameter values that contain spaces or symbols.' },
      { title: 'Debugging links', body: 'Decode an encoded URL to read what it actually points to.' },
      { title: 'API requests', body: 'Encode path and query components before sending requests.' },
    ],
    faq: [
      { q: 'Component vs. full-URL encoding?', a: 'Component encoding (encodeURIComponent) escapes characters like / ? & = and is for individual values. Full-URL encoding (encodeURI) leaves those intact to preserve the URL structure.' },
      { q: 'Why does decoding fail sometimes?', a: 'A malformed percent sequence (like a lone %) cannot be decoded. Check the input for incomplete escapes.' },
      { q: 'Is it private?', a: 'Yes. All encoding and decoding happens in your browser.' },
    ],
  },

  'csv-to-json': {
    why: 'Spreadsheet exports come as CSV, but most APIs and apps expect JSON. Converting by hand is tedious and naive splitting breaks on quoted fields containing commas. This parser handles quotes, escapes, and custom delimiters correctly.',
    howTo: [
      { step: '1', title: 'Paste your CSV', body: 'Paste the CSV data, with the first row as column headers.' },
      { step: '2', title: 'Set options', body: 'Choose the delimiter and whether numeric strings should become real numbers.' },
      { step: '3', title: 'Copy or download', body: 'Copy the JSON array or download it as a .json file.' },
    ],
    useCases: [
      { title: 'Seeding databases', body: 'Turn a CSV export into JSON to import into an app or database.' },
      { title: 'API payloads', body: 'Convert tabular data into a JSON array of objects for requests.' },
      { title: 'Data wrangling', body: 'Quickly reshape spreadsheet data for use in JavaScript.' },
    ],
    faq: [
      { q: 'Does it handle quoted commas?', a: 'Yes. Fields wrapped in double quotes can contain commas, line breaks, and escaped quotes ("").' },
      { q: 'Can I use a semicolon or tab delimiter?', a: 'Yes. Pick comma, semicolon, or tab from the delimiter dropdown.' },
      { q: 'Is my data uploaded?', a: 'No. Parsing happens entirely in your browser.' },
    ],
  },

  'color-converter': {
    why: 'Designers and developers need the same colour in different formats — HEX for CSS, RGB for canvas, HSL for adjusting lightness. This tool converts between all three and previews the result so you never copy the wrong value.',
    howTo: [
      { step: '1', title: 'Pick or type a colour', body: 'Use the colour swatch or type a HEX value like #6366f1.' },
      { step: '2', title: 'See every format', body: 'HEX, RGB, and HSL values are shown together with a live preview.' },
      { step: '3', title: 'Copy what you need', body: 'Click the copy icon next to the format you want to use.' },
    ],
    useCases: [
      { title: 'CSS styling', body: 'Convert a designer\'s HEX colour into HSL to fine-tune lightness.' },
      { title: 'Canvas & graphics', body: 'Get RGB values for drawing APIs that need numeric channels.' },
      { title: 'Brand consistency', body: 'Translate a brand colour across formats for different tools.' },
    ],
    faq: [
      { q: 'Does it accept short HEX codes?', a: 'Yes. Three-digit shorthand like #63f is expanded automatically.' },
      { q: 'Does it support alpha/opacity?', a: 'The converter focuses on solid colours (HEX, RGB, HSL). Add opacity separately in your CSS if needed.' },
      { q: 'Is it free and private?', a: 'Yes. It runs entirely in your browser with no limits.' },
    ],
  },

  'number-base-converter': {
    why: 'Working with binary, octal, and hexadecimal is routine in low-level programming, but mental conversion is slow and error-prone. This tool converts a number across all four bases at once, using BigInt so even very large numbers stay exact.',
    howTo: [
      { step: '1', title: 'Type in any base', body: 'Enter a value into the binary, octal, decimal, or hex field.' },
      { step: '2', title: 'See all bases', body: 'The other three fields update instantly with the equivalent value.' },
      { step: '3', title: 'Copy a value', body: 'Click the copy icon next to the base you need.' },
    ],
    useCases: [
      { title: 'Bitmasks & flags', body: 'Convert binary flag values to hex and decimal while coding.' },
      { title: 'Colour & encoding work', body: 'Translate hex colour or byte values into decimal and binary.' },
      { title: 'Learning CS', body: 'Understand how the same number is represented across number systems.' },
    ],
    faq: [
      { q: 'How large a number can it handle?', a: 'It uses JavaScript BigInt, so it stays accurate for numbers far beyond the normal 64-bit range.' },
      { q: 'Does it support negative numbers?', a: 'It is designed for non-negative whole numbers across bases.' },
      { q: 'Is the conversion done online?', a: 'No. It runs entirely in your browser.' },
    ],
  },

  // ─── More Image Tools ────────────────────────────────────────────────────────

  'image-to-pdf': {
    why: 'Sending several photos or scans is cleaner as a single PDF than as loose image files. This tool combines JPG and PNG images into one document, with control over page order and size, all without uploading anything.',
    howTo: [
      { step: '1', title: 'Add your images', body: 'Click or drag JPG and PNG files into the upload area. Add more at any time.' },
      { step: '2', title: 'Order and size', body: 'Use the arrows to reorder pages and choose fit-to-image, A4, or Letter.' },
      { step: '3', title: 'Create the PDF', body: 'Click Create PDF to generate and download the combined document.' },
    ],
    useCases: [
      { title: 'Receipts & expenses', body: 'Combine photographed receipts into one PDF for an expense claim.' },
      { title: 'Scanned documents', body: 'Merge phone-scanned pages into a single shareable PDF.' },
      { title: 'Portfolios', body: 'Bundle image-based work samples into one downloadable file.' },
    ],
    faq: [
      { q: 'Which image formats are supported?', a: 'JPG and PNG. Each image becomes one page in the PDF.' },
      { q: 'Are my images uploaded?', a: 'No. The PDF is built in your browser with pdf-lib — images never leave your device.' },
      { q: 'Can I reorder pages?', a: 'Yes. Use the left/right arrows on each thumbnail before creating the PDF.' },
    ],
  },

  'image-cropper': {
    why: 'Cropping to an exact region or aspect ratio is essential for profile pictures, thumbnails, and social posts. This cropper gives you a draggable selection with optional fixed ratios and exports the result at full source resolution.',
    howTo: [
      { step: '1', title: 'Upload an image', body: 'Click or drag an image into the upload area.' },
      { step: '2', title: 'Select the crop', body: 'Drag the selection box and its corner handle. Lock a ratio like 1:1 or 16:9 if needed.' },
      { step: '3', title: 'Download', body: 'Choose PNG or JPG and download just the cropped region.' },
    ],
    useCases: [
      { title: 'Profile pictures', body: 'Crop a square 1:1 avatar from any photo.' },
      { title: 'Thumbnails', body: 'Cut a 16:9 thumbnail for videos or articles.' },
      { title: 'Social posts', body: 'Trim images to the exact region you want to share.' },
    ],
    faq: [
      { q: 'Does cropping reduce quality?', a: 'No. The crop is taken from the original full-resolution image, not the on-screen preview.' },
      { q: 'Can I crop to a fixed shape?', a: 'Yes. Choose 1:1, 4:3, 16:9, or 3:4, or use Free for any rectangle.' },
      { q: 'Is my image uploaded?', a: 'No. Cropping happens on a canvas in your browser.' },
    ],
  },

  // ─── More Text Tools ─────────────────────────────────────────────────────────

  'text-cleaner': {
    why: 'Text copied from PDFs, emails, and web pages often arrives with broken line breaks, double spaces, and invisible characters. This cleaner applies the fixes you choose in one pass so you get tidy, paste-ready text.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Drop the messy text into the input box.' },
      { step: '2', title: 'Choose clean-up rules', body: 'Toggle options like collapsing spaces, removing blank lines, or stripping special characters.' },
      { step: '3', title: 'Copy the result', body: 'The cleaned text updates live — copy it with one click.' },
    ],
    useCases: [
      { title: 'PDF copy-paste', body: 'Fix text pulled from a PDF that breaks awkwardly mid-sentence.' },
      { title: 'Email & web text', body: 'Remove stray formatting from quoted emails or scraped content.' },
      { title: 'Data prep', body: 'Normalise whitespace before importing text into another tool.' },
    ],
    faq: [
      { q: 'What does "remove line breaks" do?', a: 'It joins everything into a single paragraph, replacing line breaks with spaces — useful for unwrapping hard-wrapped text.' },
      { q: 'Will it change my words?', a: 'No. It only adjusts whitespace, blank lines, case, and non-printable characters based on the options you select.' },
      { q: 'Is my text uploaded?', a: 'No. Cleaning runs entirely in your browser.' },
    ],
  },

  'slug-generator': {
    why: 'Clean, readable URLs rank better and are easier to share. Turning a title into a good slug means lowercasing, removing accents and punctuation, and replacing spaces with hyphens — this tool does all of it automatically.',
    howTo: [
      { step: '1', title: 'Enter a title', body: 'Type or paste the title or sentence you want to convert.' },
      { step: '2', title: 'Set the style', body: 'Choose hyphen or underscore separators and whether to lowercase the result.' },
      { step: '3', title: 'Copy the slug', body: 'The URL-safe slug appears instantly — copy it for your page or post.' },
    ],
    useCases: [
      { title: 'Blog & CMS URLs', body: 'Generate the slug for a new article from its headline.' },
      { title: 'File & folder names', body: 'Create safe, consistent names without spaces or symbols.' },
      { title: 'API & database keys', body: 'Produce readable identifiers from human-friendly labels.' },
    ],
    faq: [
      { q: 'Does it handle accented characters?', a: 'Yes. Accents are transliterated (é becomes e) and other special characters are removed.' },
      { q: 'Can I use underscores instead of hyphens?', a: 'Yes. Pick your separator from the dropdown.' },
      { q: 'Is it free?', a: 'Yes, and it runs entirely in your browser.' },
    ],
  },

  'tip-calculator': {
    why: 'Working out a tip and splitting the bill in your head is error-prone, especially with an odd number of people. This calculator does both instantly — pick a tip percentage, enter the bill, and see exactly what each person owes.',
    howTo: [
      { step: '1', title: 'Enter the bill amount', body: 'Type the total bill before the tip.' },
      { step: '2', title: 'Choose a tip percentage', body: 'Tap a preset (10–25%) or enter your own custom percentage.' },
      { step: '3', title: 'Split between people', body: 'Set how many people are paying to see the per-person amount, tip, and total.' },
    ],
    useCases: [
      { title: 'Restaurants & bars', body: 'Quickly calculate a fair tip and split the check with friends.' },
      { title: 'Group outings', body: 'Divide the total evenly so everyone pays the same amount.' },
      { title: 'Travel', body: 'Work out customary tips quickly when you are eating out abroad.' },
    ],
    faq: [
      { q: 'What is a standard tip percentage?', a: 'In the US, 15–20% is typical for table service; use the presets or enter your local custom.' },
      { q: 'Does it split the tip too?', a: 'Yes. The per-person figure includes each person’s share of both the bill and the tip.' },
      { q: 'Is my data saved?', a: 'No. Everything is calculated locally in your browser.' },
    ],
  },

  'compound-interest-calculator': {
    why: 'Compound interest is how savings and investments really grow — you earn interest on your interest, not just your original deposit. Seeing the numbers projected over years, with regular contributions, makes the long-term impact of saving clear.',
    howTo: [
      { step: '1', title: 'Enter your starting amount', body: 'Type the initial principal you are investing or saving.' },
      { step: '2', title: 'Add rate, years and contributions', body: 'Set the annual interest rate, the number of years, and any regular monthly contribution.' },
      { step: '3', title: 'Choose compounding frequency', body: 'Pick how often interest compounds, then read the final balance and total interest earned.' },
    ],
    useCases: [
      { title: 'Retirement planning', body: 'Project how a pension or long-term investment could grow over decades.' },
      { title: 'Savings goals', body: 'See how regular monthly deposits build toward a target amount.' },
      { title: 'Comparing accounts', body: 'Compare how different interest rates and compounding frequencies affect returns.' },
    ],
    faq: [
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is earned only on the principal; compound interest is earned on the principal plus previously earned interest, so it grows faster.' },
      { q: 'Does it account for monthly contributions?', a: 'Yes. Regular monthly contributions are compounded along with your starting balance.' },
      { q: 'Is this financial advice?', a: 'No. It is an estimate for illustration only and does not account for tax, fees, or inflation.' },
    ],
  },

  'date-duration-calculator': {
    why: 'Counting the exact time between two dates by hand is tricky because months and years have different lengths and leap years get in the way. This tool gives you the precise number of days, weeks, and months instantly.',
    howTo: [
      { step: '1', title: 'Pick a start date', body: 'Choose the first date using the date picker.' },
      { step: '2', title: 'Pick an end date', body: 'Choose the second date. It must be on or after the start date.' },
      { step: '3', title: 'Read the duration', body: 'See the breakdown in years, months and days, plus total days and weeks. Optionally include the end day.' },
    ],
    useCases: [
      { title: 'Project timelines', body: 'Measure how long a project ran or how many days remain until a deadline.' },
      { title: 'Notice & contracts', body: 'Count notice periods, trial periods, or contract lengths exactly.' },
      { title: 'Countdowns', body: 'Work out how many days until a wedding, holiday, or launch.' },
    ],
    faq: [
      { q: 'Does it count leap years correctly?', a: 'Yes. The day count uses real calendar dates, so February 29 is handled automatically.' },
      { q: 'What does “include the end day” do?', a: 'It adds one day so both the start and end dates are counted — useful for inclusive ranges.' },
      { q: 'Is the months figure exact?', a: 'The years/months/days breakdown is exact; the standalone “months” total is an approximation based on average month length.' },
    ],
  },

  'css-gradient-generator': {
    why: 'Hand-writing CSS gradient syntax is fiddly and hard to visualise. This generator lets you pick colours and an angle and see the result live, then copy production-ready CSS that works across modern browsers.',
    howTo: [
      { step: '1', title: 'Choose gradient type', body: 'Switch between a linear or radial gradient.' },
      { step: '2', title: 'Pick your colours', body: 'Select the start and end colours with the colour pickers.' },
      { step: '3', title: 'Adjust and copy', body: 'For linear gradients, drag the angle slider, then copy the generated CSS.' },
    ],
    useCases: [
      { title: 'Website backgrounds', body: 'Create eye-catching hero and section backgrounds.' },
      { title: 'Buttons & cards', body: 'Add subtle gradient fills to UI components.' },
      { title: 'Design prototyping', body: 'Quickly try colour combinations before committing in your stylesheet.' },
    ],
    faq: [
      { q: 'Does the CSS work in all browsers?', a: 'Yes. Standard linear-gradient and radial-gradient are supported in all modern browsers.' },
      { q: 'Can I use more than two colours?', a: 'This version uses two colours; you can add more stops manually in the copied CSS.' },
      { q: 'Is it free?', a: 'Yes, and nothing leaves your browser.' },
    ],
  },

  'box-shadow-generator': {
    why: 'The CSS box-shadow property has several values — offset, blur, spread, colour, and inset — that are hard to tune blindly. A visual editor with a live preview lets you dial in exactly the depth and softness you want.',
    howTo: [
      { step: '1', title: 'Adjust the sliders', body: 'Set the horizontal and vertical offset, blur, and spread while watching the preview.' },
      { step: '2', title: 'Set colour and opacity', body: 'Pick the shadow colour and how strong it appears.' },
      { step: '3', title: 'Copy the CSS', body: 'Toggle inset if needed, then copy the ready-to-use box-shadow code.' },
    ],
    useCases: [
      { title: 'Cards & panels', body: 'Give cards a subtle lift off the page with a soft shadow.' },
      { title: 'Buttons', body: 'Add depth or pressed (inset) effects to buttons.' },
      { title: 'Design systems', body: 'Generate consistent elevation shadows for a component library.' },
    ],
    faq: [
      { q: 'What does the spread value do?', a: 'Spread grows or shrinks the shadow before the blur is applied — positive values make it larger, negative smaller.' },
      { q: 'What is an inset shadow?', a: 'Inset draws the shadow inside the element instead of outside, useful for pressed or recessed effects.' },
      { q: 'Can I stack multiple shadows?', a: 'Yes — copy this value and combine several comma-separated shadows in your CSS.' },
    ],
  },

  'find-and-replace': {
    why: 'When you need to swap every occurrence of a word or pattern in a block of text, doing it by hand is slow and easy to miss. This tool replaces them all at once and tells you how many it changed.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Add the text you want to edit into the input box.' },
      { step: '2', title: 'Enter find and replace terms', body: 'Type what to look for and what to replace it with.' },
      { step: '3', title: 'Choose options and copy', body: 'Optionally enable case-insensitive matching or regular expressions, then copy the result.' },
    ],
    useCases: [
      { title: 'Editing drafts', body: 'Rename a character, product, or term throughout a document.' },
      { title: 'Cleaning data', body: 'Standardise values or strip unwanted strings from exported text.' },
      { title: 'Code snippets', body: 'Rename variables or update URLs across a block of code.' },
    ],
    faq: [
      { q: 'Does it support regular expressions?', a: 'Yes. Enable the regular expression option to use patterns, groups, and special characters.' },
      { q: 'Can I make it case-insensitive?', a: 'Yes. Tick the case-insensitive box to match regardless of capitalisation.' },
      { q: 'Is my text uploaded?', a: 'No. All find-and-replace happens locally in your browser.' },
    ],
  },

  'remove-duplicate-lines': {
    why: 'Lists exported from spreadsheets, logs, or scraped pages often contain repeated entries. Removing duplicates by hand is tedious; this tool keeps only the unique lines in one click.',
    howTo: [
      { step: '1', title: 'Paste your list', body: 'Add your list with one item per line.' },
      { step: '2', title: 'Set the options', body: 'Choose whether to ignore case, trim whitespace, and remove blank lines.' },
      { step: '3', title: 'Copy the unique lines', body: 'Read how many duplicates were removed, then copy the cleaned list.' },
    ],
    useCases: [
      { title: 'Email & contact lists', body: 'Remove repeated addresses before importing into a mailing tool.' },
      { title: 'Keyword research', body: 'De-duplicate keyword and tag lists for SEO and ads.' },
      { title: 'Log analysis', body: 'Collapse repeated log lines to spot unique entries.' },
    ],
    faq: [
      { q: 'Does it keep the original order?', a: 'Yes. The first occurrence of each line is kept in its original position.' },
      { q: 'Can it ignore case and spaces?', a: 'Yes. Enable “ignore case” and “trim whitespace” so near-identical lines are treated as duplicates.' },
      { q: 'Is there a size limit?', a: 'It handles large lists comfortably since everything runs in your browser.' },
    ],
  },

  'sort-text-lines': {
    why: 'Sorting a list alphabetically or numerically is a common chore that text editors make harder than it should be. This tool sorts your lines instantly with the order and options you choose.',
    howTo: [
      { step: '1', title: 'Paste your list', body: 'Enter your list with one item per line.' },
      { step: '2', title: 'Choose how to sort', body: 'Pick alphabetical or numerical sorting and ascending or descending order.' },
      { step: '3', title: 'Copy the result', body: 'Optionally ignore case or remove duplicates, then copy the sorted list.' },
    ],
    useCases: [
      { title: 'Organising lists', body: 'Alphabetise names, tags, or to-do items in seconds.' },
      { title: 'Data prep', body: 'Sort CSV columns or keyword lists before further processing.' },
      { title: 'Numbers', body: 'Order a list of numbers correctly instead of as text.' },
    ],
    faq: [
      { q: 'Does numerical sorting work?', a: 'Yes. Choose “numerical” to sort by value, so 2 comes before 10.' },
      { q: 'Can I remove duplicates while sorting?', a: 'Yes. Tick “remove duplicates” to keep only unique lines in the sorted output.' },
      { q: 'Is it case-sensitive?', a: 'You choose — enable “ignore case” for case-insensitive alphabetical sorting.' },
    ],
  },

  'background-changer': {
    why: 'Swapping a photo’s background usually means fiddly manual masking in an image editor. This tool removes the background automatically and lets you drop in a clean colour or your own image in seconds.',
    howTo: [
      { step: '1', title: 'Upload your photo', body: 'Choose the image whose background you want to change. The subject is cut out automatically.' },
      { step: '2', title: 'Pick a new background', body: 'Select a solid colour, or upload a background image to place behind the subject.' },
      { step: '3', title: 'Download', body: 'Preview the result and download the finished image as a PNG.' },
    ],
    useCases: [
      { title: 'Profile pictures', body: 'Put a clean, consistent background behind a headshot for LinkedIn or a CV.' },
      { title: 'Product photos', body: 'Place products on a plain white or branded background for stores and listings.' },
      { title: 'ID & passport photos', body: 'Replace a busy background with the solid colour an application requires.' },
    ],
    faq: [
      { q: 'How is the background removed?', a: 'The subject is detected and cut out automatically, then composited onto your chosen background in your browser.' },
      { q: 'What formats can I download?', a: 'The finished image downloads as a PNG, which preserves crisp edges.' },
      { q: 'Will the original photo be stored?', a: 'No. The cutout is processed for the request and the final image is created locally; nothing is kept.' },
    ],
  },
}
