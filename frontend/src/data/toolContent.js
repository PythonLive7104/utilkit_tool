export const toolContent = {

  // ─── AI Tools ─────────────────────────────────────────────────────────────

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
      { q: 'Is it free?', a: 'Yes — paraphrase as much text as you need for free, with no account and no daily rewrite limit.' },
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
      { q: 'Is it free?', a: 'Yes — it is free with no sign-up; check as many documents as you like without a word cap.' },
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
      { q: 'Is it free?', a: 'Yes — summarise as many documents as you need for free, with no account beyond the per-request length limit.' },
    ],
  },

  'ai-title-generator': {
    why: 'The headline does most of the work. People decide whether to click an article, watch a video, or open an email almost entirely on the title, and a stronger one can dramatically lift click-through — yet writers often burn far too long staring at a blank line trying to word it well. The hard part is not writing one title; it is generating enough varied options to find the angle that lands.\n\nThis generator produces 8 headline options at once from a short description of your topic, spanning the formats that reliably perform — listicles ("7 ways to…"), how-tos, questions, curiosity-gap hooks, and direct statements. Pick the best, tweak it, or regenerate for a fresh batch in seconds. It uses GPT-4o, and your topic is sent over HTTPS only to be processed, not stored. Include your target keyword in the description and the titles will work for search as well as clicks.',
    howTo: [
      { step: '1', title: 'Describe your topic', body: 'Type a short description of your article, video, or post — e.g. "how to make sourdough bread at home".' },
      { step: '2', title: 'Generate titles', body: 'Click Generate for 8 varied options spanning different proven headline styles.' },
      { step: '3', title: 'Copy your favourite', body: 'Copy any title with one click, tweak it to fit, or hit Regenerate for a fresh batch.' },
    ],
    useCases: [
      { title: 'Bloggers', body: 'Find a high-click headline before you write, so the finished article actually gets opened.' },
      { title: 'YouTube creators', body: 'Compare title angles for a video to pick the most watch-worthy option before publishing.' },
      { title: 'Email marketers', body: 'Generate subject-line options that lift open rates for newsletters and campaigns.' },
      { title: 'Social & ads', body: 'Spin up hook variations for posts and ad copy to test what resonates.' },
      { title: 'Beating writer’s block', body: 'Get unstuck with instant options when you cannot find the words for a title.' },
    ],
    faq: [
      { q: 'Can I generate more than 8 titles?', a: 'Yes. Click Regenerate for another batch of 8 as many times as you like.' },
      { q: 'Are the titles SEO-friendly?', a: 'They are written to be compelling and clickable. For search, include your target keyword in the topic description so it appears in the options.' },
      { q: 'Should I edit the suggestions?', a: 'Treat them as strong starting points — tweak wording, length, and specifics to match your content and brand voice.' },
      { q: 'What title styles does it produce?', a: 'A mix of listicles, how-tos, questions, curiosity-gap hooks, and direct-statement formats.' },
      { q: 'Will it write clickbait?', a: 'It aims for compelling but honest headlines; avoid promising more than your content delivers, which hurts trust and bounce rate.' },
      { q: 'Is my input stored?', a: 'No. Your topic description is sent over HTTPS, processed, and immediately discarded.' },
      { q: 'Does it work for any niche?', a: 'Yes — give it a clear topic and it adapts to the subject and audience you describe.' },
      { q: 'Is it free?', a: 'Yes — generate unlimited batches of headlines for free, with no account required.' },
    ],
  },

  'ai-email-writer': {
    why: 'Some emails are genuinely hard to write — a follow-up that does not sound pushy, an apology that strikes the right tone, cold outreach that gets a reply, a firm-but-polite chase. Getting the wording and tone right takes time most people do not have, and the blank page is where it stalls. The structure is usually the same (subject, greeting, a clear point, a call to action, a sign-off); what is hard is the phrasing.\n\nThis writer turns a one-line description into a complete, ready-to-send email — subject line, greeting, body, CTA, and sign-off — in the tone you pick: Professional, Friendly, Formal, Apologetic, Persuasive, or Follow-up. Describe the goal, choose the tone, and get a polished draft using GPT-4o, in any language you write the request in. Your description is sent over HTTPS only for processing and is not stored. The output is fully editable, so always slot in real names, dates, and specifics before you hit send.',
    howTo: [
      { step: '1', title: 'Describe your email', body: 'Say what it should achieve — e.g. "follow up with a client who hasn’t replied in two weeks".' },
      { step: '2', title: 'Choose a tone', body: 'Pick Professional, Friendly, Formal, Apologetic, Persuasive, or Follow-up to match the situation.' },
      { step: '3', title: 'Copy, personalise, and send', body: 'Copy the subject line and body, fill in names and specific details, then send.' },
    ],
    useCases: [
      { title: 'Sales & outreach', body: 'Draft cold emails and follow-ups quickly instead of stalling on a blank page.' },
      { title: 'Customer support', body: 'Produce polished, empathetic responses for common situations and complaints.' },
      { title: 'Job seekers', body: 'Write cover-letter emails, interview thank-yous, and networking messages that read well.' },
      { title: 'Managers & admin', body: 'Compose announcements, reminders, and requests in a consistent, professional tone.' },
      { title: 'Non-native speakers', body: 'Get fluent, correctly toned business English from a short brief in any language.' },
    ],
    faq: [
      { q: 'Can I edit the generated email?', a: 'Yes — the output is fully editable. Always personalise names, dates, and specific details before sending.' },
      { q: 'How many tone options are there?', a: 'Six: Professional, Friendly, Formal, Apologetic, Persuasive, and Follow-up.' },
      { q: 'Does it write the subject line too?', a: 'Yes. It produces a complete email — subject, greeting, body, call to action, and sign-off.' },
      { q: 'Can it write in other languages?', a: 'Yes. Describe your email in any language and it drafts the email in that language.' },
      { q: 'Should I review before sending?', a: 'Always. Check facts, names, and tone for your specific recipient — treat it as a strong first draft, not a final send.' },
      { q: 'Is my input stored?', a: 'No. Your description is sent over HTTPS, processed, and immediately discarded.' },
      { q: 'How detailed should my description be?', a: 'A sentence works, but adding the recipient, context, and goal produces a sharper, more usable draft.' },
      { q: 'Is it free?', a: 'Yes — draft as many emails as you want for free, with no sign-up.' },
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
      { q: 'Is it free?', a: 'Yes — create as many PDFs as you need for free, with no sign-up and no watermark on the document.' },
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
      { step: '1', title: 'Upload your PDF', body: 'Click the upload area or drag and drop the large PDF you want to shrink. The entire compression happens on your device.' },
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

  'pdf-watermark': {
    why: 'A watermark across a PDF removes any ambiguity about its status and discourages misuse. Stamping DRAFT stops an early version being mistaken for the signed final; CONFIDENTIAL signals that a proposal should not be forwarded; and a studio name or copyright notice marks creative work as yours before it reaches a client. Doing this by hand in an editor, page by page, is tedious — especially on long documents.\n\nThis tool adds your chosen text diagonally across every page in one step. Upload the PDF, set the watermark text, colour, font size, and opacity, and download the marked copy. It is built with pdf-lib and runs entirely in your browser, so sensitive documents are never uploaded. The watermark is embedded into each page’s content rather than added as a removable layer, so it cannot simply be deleted in a standard PDF reader.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Add the PDF you want to watermark.' },
      { step: '2', title: 'Customise the watermark', body: 'Enter your text and choose the colour (grey, red, blue, green), font size, and opacity.' },
      { step: '3', title: 'Download the watermarked PDF', body: 'Click Add Watermark and download the marked copy.' },
    ],
    useCases: [
      { title: 'Legal & compliance', body: 'Stamp drafts as DRAFT so they can’t be confused with final, signed versions.' },
      { title: 'Sharing proposals', body: 'Mark proposals and quotes CONFIDENTIAL before sending to discourage redistribution.' },
      { title: 'Photographers & designers', body: 'Brand portfolio PDFs with your name or copyright before showing clients.' },
      { title: 'Samples & previews', body: 'Add SAMPLE or PREVIEW to documents you share before payment or sign-off.' },
      { title: 'Internal documents', body: 'Label files INTERNAL or the version/status so their handling is unambiguous.' },
    ],
    faq: [
      { q: 'Is the watermark permanent?', a: 'It is embedded into the page content, so it cannot be removed with standard PDF readers — unlike a simple annotation layer.' },
      { q: 'Can I choose where it appears?', a: 'It is applied diagonally across the centre of each page; custom positioning is not currently supported.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Watermarking runs entirely in your browser with pdf-lib, so your file never leaves your device.' },
      { q: 'Can I control how subtle it is?', a: 'Yes — adjust the opacity and font size for a faint background mark or a bold, prominent stamp.' },
      { q: 'Can I watermark only some pages?', a: 'Currently the watermark is applied to every page at once.' },
      { q: 'Can I use an image or logo as the watermark?', a: 'The tool applies text watermarks; for a logo, add it to your text-based mark or use a dedicated image overlay workflow.' },
      { q: 'Will it change the original file?', a: 'No. It produces a new watermarked copy and leaves your original untouched.' },
      { q: 'Is it free?', a: 'Yes — watermark as many PDFs as you like for free, with no account and no UtilKit branding added to your file.' },
    ],
  },

  'rotate-pdf': {
    why: 'Scanned and phone-captured pages frequently come out sideways or upside down, and rotating them in a PDF viewer only changes how they look on your screen — reopen the file or send it to someone else and it is crooked again. The rotation has to be saved into the file itself to actually fix it, which most readers will not do.\n\nThis tool rotates pages permanently in the document. Upload the PDF, choose all pages or specific ones, pick 90°, 180°, or 270°, and download a corrected copy whose orientation is baked in. It runs in your browser with pdf-lib, so your file is never uploaded, and because rotation only updates each page’s orientation rather than re-rendering it, there is zero quality loss and no recompression. No account, no watermark.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Add the PDF that has incorrectly oriented pages.' },
      { step: '2', title: 'Select pages and angle', body: 'Choose all pages or specific ranges, and pick 90°, 180°, or 270° rotation.' },
      { step: '3', title: 'Download the corrected PDF', body: 'Click Rotate PDF and download the file with its orientation permanently fixed.' },
    ],
    useCases: [
      { title: 'Scanned documents', body: 'Turn landscape-scanned contract or form pages upright so they read correctly.' },
      { title: 'Phone captures', body: 'Fix pages photographed at the wrong angle before sharing or filing them.' },
      { title: 'Mixed orientation', body: 'Correct individual pages that were rotated by accident during assembly or export.' },
      { title: 'Archiving', body: 'Standardise orientation across a PDF before storing it long-term.' },
      { title: 'Pre-processing', body: 'Straighten pages before running OCR or merging, so the output is consistent.' },
    ],
    faq: [
      { q: 'Which rotation angles are supported?', a: '90° clockwise, 180° (a flip), or 270° clockwise (the same as 90° counter-clockwise).' },
      { q: 'Can I rotate only specific pages?', a: 'Yes — enter page numbers or ranges like "1,3,5-8" to rotate just those, leaving the rest as they are.' },
      { q: 'Is the rotation permanent this time?', a: 'Yes. It is written into the file, so it stays correct in every reader and when shared — unlike a temporary view rotation.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Rotation runs in your browser with pdf-lib, so the file never leaves your device.' },
      { q: 'Does rotating reduce quality?', a: 'No. It only updates page orientation; nothing is re-rendered or recompressed, so quality is identical.' },
      { q: 'Can different pages have different rotations?', a: 'Yes — rotate one set of pages, then run it again for others that need a different angle.' },
      { q: 'Does it work on scanned image PDFs?', a: 'Yes. It rotates the page regardless of whether the content is text or a scanned image.' },
      { q: 'Is it free?', a: 'Yes — rotate as many PDFs as you like for free, with no sign-up and nothing added to the file.' },
    ],
  },

  'ocr-pdf': {
    why: 'A scanned PDF looks like a document but is really just a picture of one — you cannot select a sentence, search for a word, or copy a figure out of it, because there is no text layer underneath, only pixels. That makes scanned contracts, receipts, and old papers frustrating to work with. OCR (Optical Character Recognition) solves it by analysing the image of each page and reconstructing the actual text.\n\nThis tool runs OCR on your scanned PDF and gives you the recognised text as a downloadable file you can copy, edit, and search. Remarkably, it does this entirely in your browser using Tesseract.js — each page is rendered and read locally — so even confidential scans never leave your device, unlike most OCR services that upload your files. Upload the PDF, watch the per-page progress, and download the text. Accuracy is high for clear printed text; handwriting and poor scans are harder.',
    howTo: [
      { step: '1', title: 'Upload your scanned PDF', body: 'Add a PDF whose pages are scans/images where the text is not selectable.' },
      { step: '2', title: 'Start OCR extraction', body: 'Click Extract Text. Each page is rendered to canvas and read by Tesseract.js, with a progress bar showing status.' },
      { step: '3', title: 'Download the text', body: 'When it finishes, download the recognised text as a .txt file.' },
    ],
    useCases: [
      { title: 'Digitising paper', body: 'Turn scanned contracts, letters, and forms into searchable, editable text without retyping.' },
      { title: 'Receipts & invoices', body: 'Pull amounts and details out of scanned receipts for expenses and accounting.' },
      { title: 'Research & archives', body: 'Convert scanned papers and historical documents into readable, searchable text.' },
      { title: 'Accessibility', body: 'Extract text from an image-only PDF so it can be read by screen readers.' },
      { title: 'Search & reuse', body: 'Make an old scan searchable so you can find and quote from it later.' },
    ],
    faq: [
      { q: 'How accurate is the OCR?', a: 'Very accurate for clear, high-contrast printed text. Handwriting, low-resolution scans, skewed pages, and decorative fonts produce more errors — straighten and use the best scan you have for the cleanest result.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. OCR runs entirely in your browser with Tesseract.js, so even sensitive scans never leave your device.' },
      { q: 'How long does it take?', a: 'Roughly 5–15 seconds per page depending on your device, so a 10-page scan takes about 1–2 minutes.' },
      { q: 'Does it keep the original layout?', a: 'It extracts the text content; complex columns and tables are linearised into a reading flow rather than reproduced exactly.' },
      { q: 'Which languages are supported?', a: 'English in the current version, via the default Tesseract.js language pack.' },
      { q: 'Will it work on a normal (non-scanned) PDF?', a: 'If the PDF already has selectable text, use PDF → Word to extract it directly — OCR is for image-only pages.' },
      { q: 'Can I improve results on a bad scan?', a: 'Rotate it upright first (try the Rotate PDF tool) and use the highest-resolution, most evenly lit scan available.' },
      { q: 'Is it free?', a: 'Yes — run OCR on as many PDFs as you need for free, with no sign-up or page limit.' },
    ],
  },

  'esign-pdf': {
    why: 'The print-sign-scan ritual is one of the most pointless chores in modern office life: you take a digital file, turn it into paper, sign it, and turn it back into a (worse-quality) digital file — assuming you even have a printer and scanner to hand. For everyday agreements, drawing your signature straight onto the PDF achieves the same thing in under a minute.\n\nThis tool lets you sign a PDF on screen: draw your signature with a mouse or finger, choose the page and corner to place it, and download the signed document. It is built with pdf-lib and runs entirely in your browser, so your PDF and your signature — both sensitive — never leave your device. For most routine documents a drawn signature is perfectly adequate; for high-stakes contracts that require a certified, audit-trailed e-signature, a dedicated service like DocuSign or Adobe Sign is the right tool.',
    howTo: [
      { step: '1', title: 'Upload your PDF', body: 'Add the document you need to sign.' },
      { step: '2', title: 'Draw your signature', body: 'Sign on the canvas with your mouse or touchscreen; click Clear to redo until it looks right.' },
      { step: '3', title: 'Position and download', body: 'Choose the page and corner for the signature, then download the signed PDF.' },
    ],
    useCases: [
      { title: 'Freelancers & contractors', body: 'Sign client contracts and service agreements without printing or scanning.' },
      { title: 'Property & rentals', body: 'Sign tenancy and property documents on the spot for a faster turnaround.' },
      { title: 'HR & hiring', body: 'Sign offer letters and employment forms quickly from any device.' },
      { title: 'Everyday forms', body: 'Add a signature to permission slips, consent forms, and letters.' },
      { title: 'On the go', body: 'Sign with a finger on a phone or tablet when you’re away from a desk.' },
    ],
    faq: [
      { q: 'Is a drawn digital signature legally binding?', a: 'For most everyday documents, yes. For high-stakes agreements that require certified, audit-trailed signatures, use a service like DocuSign or Adobe Sign.' },
      { q: 'Does my file get uploaded to a server?', a: 'No. Signing happens entirely in your browser with pdf-lib, so your PDF and signature never leave your device.' },
      { q: 'Can I place the signature where I want?', a: 'Choose the page and a corner position; the signature is sized relative to the page for a clean fit.' },
      { q: 'Can I sign more than one page?', a: 'Currently a signature is placed on one selected page per download; re-run it to sign another page.' },
      { q: 'Can I type my signature instead of drawing it?', a: 'This tool captures a hand-drawn signature, which looks more authentic than typed text.' },
      { q: 'Will the rest of the document change?', a: 'No. Only your signature is added; the original content is untouched.' },
      { q: 'Does it work on touchscreens?', a: 'Yes — draw with your finger or a stylus on a phone or tablet.' },
      { q: 'Is it free?', a: 'Yes — sign as many documents as you need for free, with no account and no watermark on the PDF.' },
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
      { q: 'Is it free?', a: 'Yes — remove backgrounds from as many photos as you like for free, with no account and no watermark.' },
    ],
  },

  'image-resizer': {
    why: 'Almost every place you upload an image expects a specific size. Instagram wants a square, a YouTube thumbnail is 1280×720, a profile photo has a minimum, and a website hero needs exact pixels to look crisp. Upload the wrong dimensions and the platform crops off the important part, stretches the picture, or rejects it outright. The straight-from-camera photo is also usually far bigger than needed, which wastes bandwidth and slows pages.\n\nThis resizer lets you set exact width and height, with an aspect-ratio lock so changing one dimension adjusts the other automatically and your image never comes out squashed. Built-in presets cover the common social and web sizes so you do not have to look them up. Everything runs in your browser using the Canvas API, so your image is never uploaded — and your original is untouched, so you can re-export at another size in seconds. No account, no watermark, no limit.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Click to upload or drop in the image you want to resize. Resizing runs entirely on your device.' },
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
      { q: 'Can I resize on mobile?', a: 'Yes — resize on phone or desktop in any modern browser.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up, and no watermark.' },
    ],
  },

  'meme-generator': {
    why: 'Memes are the fastest way to land a joke or an idea — a familiar image with bold top-and-bottom caption text communicates instantly in a way a paragraph never could, which is why they dominate social feeds and group chats. The classic look (an image with white Impact text and a black outline) is simple, but recreating it in Photoshop or a phone editor is more hassle than the joke is worth.\n\nThis generator makes one in seconds: upload any image, type your top and bottom text, adjust the size and colour, and download a share-ready PNG. It draws everything on a Canvas in your browser, so your image is never uploaded, there is no watermark, and there is no account. The output matches your original image’s dimensions, so it stays crisp wherever you post it.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Add any image to use as the meme background — a classic template or your own photo.' },
      { step: '2', title: 'Add your text', body: 'Type the top and bottom captions and adjust the font size and colour to taste.' },
      { step: '3', title: 'Download the meme', body: 'Click Download to save the finished meme as a PNG, ready to post or send.' },
    ],
    useCases: [
      { title: 'Social media', body: 'Make shareable memes for X, Instagram, Reddit, and Facebook in seconds.' },
      { title: 'Marketing teams', body: 'Use recognisable meme formats to make brand content more relatable and shareable.' },
      { title: 'Team chat', body: 'Whip up internal jokes for Slack, Teams, or a company newsletter.' },
      { title: 'Communities & groups', body: 'React to a moment with a custom meme in a group chat or forum.' },
      { title: 'Events & campaigns', body: 'Create themed memes to build buzz around a launch, holiday, or hashtag.' },
    ],
    faq: [
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and GIF (the static first frame).' },
      { q: 'Does my image get uploaded to a server?', a: 'No. The meme is rendered entirely in your browser with the Canvas API, so nothing is uploaded.' },
      { q: 'Is there a watermark?', a: 'No. The downloaded PNG is clean, with no watermark or branding.' },
      { q: 'Can I change the font?', a: 'It currently uses Impact — the classic meme font — with adjustable size and colour. More fonts may be added later.' },
      { q: 'What resolution is the meme?', a: 'The output PNG matches your original image’s dimensions, so quality is preserved.' },
      { q: 'Can I make a meme on my phone?', a: 'Yes — it works in any modern mobile browser; upload a photo and download the result back to your device.' },
      { q: 'Can I add text in the middle, not just top and bottom?', a: 'The tool focuses on the classic top/bottom caption layout; for free placement you would need a full image editor.' },
      { q: 'Is it free?', a: 'Yes — make and download as many memes as you want for free, with no watermark on the image.' },
    ],
  },

  'ai-image-upscaler': {
    why: 'Sometimes the only copy of an image you have is too small — a thumbnail, an old profile picture, a low-resolution logo — and blowing it up in a normal editor just makes it blocky and pixelated. Enlarging an image properly means generating new pixels in between the existing ones intelligently, so edges stay smooth instead of turning into jagged squares.\n\nThis upscaler increases image dimensions to 2×, 3×, or 4× using high-quality canvas interpolation, producing a larger, smoother result suitable for display, print, and repurposing. Upload an image, pick a scale factor, and download the enlarged PNG. It runs entirely in your browser, so your image is never uploaded. One honest expectation to set: upscaling adds and smooths pixels, but it cannot invent detail that was never captured — so the output is bigger and cleaner, not magically sharper than the original.',
    howTo: [
      { step: '1', title: 'Upload your image', body: 'Add the small image you want to enlarge.' },
      { step: '2', title: 'Choose a scale factor', body: 'Pick 2×, 3×, or 4× depending on how much larger you need it.' },
      { step: '3', title: 'Download the result', body: 'Click Upscale and download the enlarged image as a PNG.' },
    ],
    useCases: [
      { title: 'Print preparation', body: 'Enlarge small web images toward print-ready dimensions for flyers, banners, and handouts.' },
      { title: 'Thumbnails & previews', body: 'Scale up a small thumbnail for use as a larger preview in a post or portfolio.' },
      { title: 'Old & archival photos', body: 'Enlarge small-format photos for better on-screen visibility and digital keeping.' },
      { title: 'Logos & assets', body: 'Make a too-small logo or graphic larger when the original file is unavailable.' },
      { title: 'Display & presentations', body: 'Size an image up so it does not look tiny on a big screen or slide.' },
    ],
    faq: [
      { q: 'Will upscaling make my image sharper?', a: 'It makes it larger and smoother, not sharper. Interpolation adds pixels but cannot recover detail that was never in the original.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. Upscaling runs in your browser with the Canvas API, so your image never leaves your device.' },
      { q: 'Which formats are supported?', a: 'JPG, PNG, and WebP as input; the output is always PNG.' },
      { q: 'Should I use 2×, 3×, or 4×?', a: 'For most needs 2× is plenty. Higher factors make much larger files with diminishing visual gains from interpolation alone.' },
      { q: 'Why does my upscaled image look soft?', a: 'Enlarging spreads the existing detail over more pixels, which can look soft — that is expected behaviour, not a fault.' },
      { q: 'Can it fix a blurry photo?', a: 'No. It changes size, not focus; a blurry source stays blurry when enlarged.' },
      { q: 'Is there a size limit?', a: 'Very large source images plus a high scale factor produce big outputs and take longer to process on your device.' },
      { q: 'Is it free?', a: 'Yes — upscale as many images as you like for free, with no sign-up and no watermark.' },
    ],
  },

  'png-to-jpg': {
    why: 'PNG is a lossless format, which is great for screenshots and graphics but terrible for file size when the image is a photograph — a PNG photo can be five to ten times larger than the same picture saved as JPG. Those bloated files slow down web pages, bounce off email limits, and eat storage. Whenever an image does not actually need transparency, converting PNG to JPG usually cuts the size by 50–80% with almost no visible difference.\n\nThis converter makes that swap in one step, with a quality slider so you control the size-versus-sharpness trade-off, and batch support so you can do many files at once. It runs entirely in your browser using the Canvas API, so your images are never uploaded. The one thing to know is that JPG has no transparency: any transparent areas in the PNG are filled with white during conversion.',
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
      { q: 'Is it free?', a: 'Completely free, with no sign-up and no file-count limit — convert a whole folder of PNGs in one go, and none of the JPGs are watermarked.' },
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
      { q: 'Does my image get uploaded to a server?', a: 'No — the conversion is done locally by your browser, so the original JPEGs never leave your computer or phone.' },
      { q: 'Will the PNG be larger than the JPG?', a: 'Usually yes. PNG is lossless, so for photographic content it typically produces a bigger file than JPEG.' },
      { q: 'When should I use JPG instead?', a: 'For photographs where small file size matters and you do not need transparency, JPG is the better choice.' },
      { q: 'Can I batch convert?', a: 'Yes — upload multiple JPGs and they are all converted at once.' },
      { q: 'Does it work on mobile?', a: 'Yes, in any modern mobile browser.' },
      { q: 'Is it free?', a: 'Yes — there is no charge and no account step. Convert as many JPGs to PNG as you need, and the output is never stamped with a watermark.' },
    ],
  },

  'webp-converter': {
    why: 'WebP is the format the modern web is built for: it produces files 25–35% smaller than JPEG and far smaller than PNG at the same visual quality, while still supporting transparency. Since images are usually the heaviest thing on a page, switching them to WebP is one of the single most effective ways to speed up load times — which directly improves Core Web Vitals and, in turn, your search ranking.\n\nThis converter turns JPG, PNG, GIF, or BMP files into WebP right in your browser, with a quality slider so you control the size-versus-sharpness balance and batch support for multiple files. Nothing is uploaded — the Canvas API does the work on your device — and transparency from PNGs is preserved in the WebP output. WebP is supported by every modern browser, so for almost any website it is a safe, high-impact upgrade.',
    howTo: [
      { step: '1', title: 'Upload your images', body: 'Add JPG, PNG, GIF, or BMP files — one or several at once.' },
      { step: '2', title: 'Set the quality', body: 'Drag the slider; 80–90% gives excellent results with big size savings.' },
      { step: '3', title: 'Download WebP files', body: 'Download the converted files and use them in place of your originals on your site.' },
    ],
    useCases: [
      { title: 'Web developers', body: 'Convert site images to WebP to improve Largest Contentful Paint (LCP) and PageSpeed scores.' },
      { title: 'E-commerce', body: 'Cut product-image sizes by 30%+ with no visible quality loss to speed up a busy shop.' },
      { title: 'Bloggers & content', body: 'Convert featured and inline images to WebP for faster pages and better SEO.' },
      { title: 'CDN & hosting savings', body: 'Lower bandwidth and storage costs by serving smaller image files.' },
      { title: 'App & email assets', body: 'Ship lighter images where smaller payloads matter for performance.' },
    ],
    faq: [
      { q: 'Do all browsers support WebP?', a: 'Yes — every modern browser, including Chrome, Firefox, Safari 14+, and Edge, supports WebP.' },
      { q: 'Does my image get uploaded to a server?', a: 'No. The WebP encoding happens entirely on your device, so none of your source images are ever transmitted or stored.' },
      { q: 'How much smaller will WebP files be?', a: 'Typically 25–35% smaller than JPEG and 50–70% smaller than PNG at similar visual quality.' },
      { q: 'Does WebP keep transparency?', a: 'Yes. Transparent PNGs converted to WebP preserve the alpha channel.' },
      { q: 'Should I keep fallback JPG/PNG versions?', a: 'For very old browsers you can, but modern browser support is universal, so most sites no longer need fallbacks.' },
      { q: 'Will it convert animated GIFs?', a: 'It converts the static frame to WebP; animation is not preserved in the output.' },
      { q: 'Can I convert many images at once?', a: 'Yes — batch-upload multiple files and convert them in one pass.' },
      { q: 'Is it free?', a: 'Yes, and there is no batch cap — convert as many images to WebP as your site needs, free, with no account and no watermark.' },
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
      { q: 'Is it free?', a: 'Yes — shorten and track as many links as you need for free, with no sign-up.' },
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
      { q: 'Is it free?', a: 'Yes — test as many patterns as you like for free, with no account or usage limit.' },
    ],
  },

  'code-diff': {
    why: 'When you have two versions of something — a function before and after a change, two drafts of a contract, yesterday’s config and today’s — the question is always "what actually changed?" Eyeballing two blocks of text side by side is slow and unreliable; it is easy to miss a flipped value, a deleted line, or a subtle edit buried in a wall of unchanged text. That is exactly the kind of mistake that causes bugs and misunderstandings.\n\nThis tool compares the two versions and highlights precisely what was added (green) and removed (red), using the Longest Common Subsequence algorithm — the same approach Git and professional diff tools use — so the result is accurate every time. Paste the before and after into the two panels and read the differences instantly; you can also download the result as a standard .patch file. It all runs in your browser, so your code or documents never leave your device, and it works on any text, not just code.',
    howTo: [
      { step: '1', title: 'Paste the original', body: 'Add the original (before) version into the left panel.' },
      { step: '2', title: 'Paste the modified version', body: 'Add the updated (after) version into the right panel.' },
      { step: '3', title: 'Review the diff', body: 'Scroll through the added (green) and removed (red) lines, and download a .patch file if you need one.' },
    ],
    useCases: [
      { title: 'Code review', body: 'Compare two versions of a function, file, or snippet to see exactly what changed before merging.' },
      { title: 'Document editing', body: 'Spot every change between two drafts of a report, contract, or policy.' },
      { title: 'Config management', body: 'Diff configuration files to find differences between dev, staging, and production.' },
      { title: 'Debugging', body: 'Compare a working and broken version of code or data to isolate what changed.' },
      { title: 'Content & translation', body: 'Check what was edited between two versions of copy, JSON, or CSV.' },
    ],
    faq: [
      { q: 'Is my code sent to a server?', a: 'No. All diffing happens in your browser, so your code or documents never leave your device.' },
      { q: 'What algorithm is used?', a: 'Longest Common Subsequence (LCS) — the same core approach used by Git and most professional diff tools.' },
      { q: 'Can I diff non-code text?', a: 'Yes. Any text works — prose, JSON, CSV, configuration, or plain documents.' },
      { q: 'Is the comparison line-by-line or character-by-character?', a: 'It highlights changes at the line level, the standard way developers review diffs.' },
      { q: 'What does "Download patch" produce?', a: 'A standard unified diff (.patch) that can be applied with `git apply` or the `patch` command.' },
      { q: 'Does whitespace count as a change?', a: 'Yes — differing whitespace or indentation registers as a change, since it can be meaningful in some files.' },
      { q: 'Is there a size limit?', a: 'No fixed limit, though very large inputs take longer to compare on your device.' },
      { q: 'Is it free?', a: 'Yes — compare as many files as you like for free, with no sign-up.' },
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
      { q: 'Is it free?', a: 'Yes — decode as many tokens as you need for free, with no sign-up.' },
    ],
  },

  'sql-formatter': {
    why: 'SQL has a habit of arriving as a single unreadable line — copied from application logs, an ORM’s output, or a colleague who never indents. A long SELECT with multiple joins, a WHERE clause, and a GROUP BY crammed onto one line is almost impossible to review or debug, and that is exactly when a subtle logic error hides in plain sight.\n\nThis formatter rewrites your query with consistent keyword casing, sensible indentation, and line breaks before the major clauses, so the structure jumps out and you can actually read what the query does. It can also minify a query back to a compact single line when you need it for code or a config value. Formatting only touches whitespace and casing — the query logic is untouched — and everything runs in your browser, so your SQL (which may reveal schema or business logic) never leaves your device.',
    howTo: [
      { step: '1', title: 'Paste your SQL', body: 'Copy your query — however messy — and paste it into the editor.' },
      { step: '2', title: 'Format or minify', body: 'Click Format to prettify with indentation and uppercase keywords, or Minify to collapse it to one line.' },
      { step: '3', title: 'Copy the result', body: 'Copy the formatted SQL into your code, migration, documentation, or review.' },
    ],
    useCases: [
      { title: 'Code review', body: 'Format queries consistently before committing so reviewers can read them at a glance.' },
      { title: 'Debugging', body: 'Prettify a complex one-line query to see its structure and spot a misplaced join or condition.' },
      { title: 'Documentation', body: 'Include clean, well-indented SQL examples in docs, wikis, and runbooks.' },
      { title: 'Learning SQL', body: 'See how a query is structured by clause to understand how it executes.' },
      { title: 'Log analysis', body: 'Reformat a query pulled from application logs so you can read and re-run it.' },
    ],
    faq: [
      { q: 'Is my SQL sent to a server?', a: 'No. All formatting happens in your browser, so your queries never leave your device.' },
      { q: 'Which SQL dialects are supported?', a: 'Standard SQL, with MySQL, PostgreSQL, and SQLite syntax generally handled well.' },
      { q: 'Does formatting change what the query does?', a: 'No. Only whitespace and keyword casing change; the logic and results are identical.' },
      { q: 'Can it format stored procedures?', a: 'Basic procedures format fine. Very complex PL/SQL or T-SQL blocks may not format perfectly.' },
      { q: 'Will it uppercase my table and column names?', a: 'No — it uppercases SQL keywords (SELECT, FROM, WHERE) while leaving your identifiers as written.' },
      { q: 'Can I minify as well as prettify?', a: 'Yes. Minify collapses the query to a single compact line for embedding in code or config.' },
      { q: 'Does it validate or run the query?', a: 'No. It only formats text; it does not check syntax against a database or execute anything.' },
      { q: 'Is it free?', a: 'Yes — format unlimited queries for free, with no account needed.' },
    ],
  },

  'html-minifier': {
    why: 'The HTML you write is full of things that help you and mean nothing to a browser: indentation, blank lines between sections, and comments explaining the markup. The browser downloads every one of those bytes anyway. On a high-traffic page or an email template sent thousands of times, that wasted weight adds up — slowing the first byte and the render, and costing bandwidth.\n\nThis minifier strips the readability overhead — collapsing whitespace and removing comments and blank lines — to produce the smallest functional HTML, typically 10–30% lighter. Paste your markup, click minify, and copy the output for your production build, template, or CDN. It runs entirely in your browser, so your markup never leaves your device. It works at the HTML level only, leaving inline scripts and styles alone, and it preserves IE conditional comments so legacy targeting still works.',
    howTo: [
      { step: '1', title: 'Paste your HTML', body: 'Copy your HTML markup and paste it into the editor.' },
      { step: '2', title: 'Click Minify', body: 'Whitespace, blank lines, and comments are stripped instantly to produce compact markup.' },
      { step: '3', title: 'Copy the minified HTML', body: 'Copy the output into your production build, template, or CDN upload.' },
    ],
    useCases: [
      { title: 'Web performance', body: 'Shrink templates and static pages to cut payload size and improve load times.' },
      { title: 'Build pipelines', body: 'Pre-minify HTML partials before deploying to a server or CDN.' },
      { title: 'Email templates', body: 'Reduce HTML email size, which can help with size limits and deliverability.' },
      { title: 'Embeds & snippets', body: 'Compact a widget or ad snippet so it adds as little weight as possible to host pages.' },
      { title: 'Bandwidth savings', body: 'Lower transfer costs on pages served at high volume.' },
    ],
    faq: [
      { q: 'Is my HTML sent to a server?', a: 'No. Minification runs entirely in your browser, so your markup never leaves your device.' },
      { q: 'How much smaller will it get?', a: 'Typically 10–30% for standard HTML, and more if your source has heavy commenting or lots of whitespace.' },
      { q: 'Are IE conditional comments preserved?', a: 'Yes. Conditional comments (<!--[if IE]>…<![endif]-->) are kept; all other HTML comments are removed.' },
      { q: 'Does it break inline JavaScript or CSS?', a: 'No. Only HTML-level whitespace and comments are removed; inline scripts and styles are left untouched.' },
      { q: 'Will minifying change how my page looks?', a: 'No. Rendered output is identical — be aware that whitespace between some inline elements is meaningful, so review spacing-sensitive layouts.' },
      { q: 'Should I keep an unminified copy?', a: 'Yes. Edit the readable source and minify as a final step; minified HTML is hard to maintain by hand.' },
      { q: 'Can I do CSS and JS too?', a: 'Use the CSS Minifier for stylesheets. This tool focuses on HTML markup.' },
      { q: 'Is it free?', a: 'Yes — minify as much HTML as you want for free, with no sign-up.' },
    ],
  },

  'css-minifier': {
    why: 'Stylesheets are written to be read by humans — comments grouping sections, indentation, spaces around values, one rule per line. None of that matters to a browser, but it all gets downloaded, and CSS is render-blocking: the browser will not paint the page until the stylesheet arrives. So every extra kilobyte of formatting directly delays how fast your page appears.\n\nThis minifier removes comments and collapses whitespace into a single compact line, typically cutting 20–40% off a well-formatted stylesheet. Paste your CSS, click minify, and drop the result into production. It runs entirely in your browser, so your styles never leave your device, and it only touches whitespace and comments — selectors, properties, values, custom properties, and calc() are all preserved exactly, so specificity and behaviour are unchanged.',
    howTo: [
      { step: '1', title: 'Paste your CSS', body: 'Copy your stylesheet and paste it into the editor.' },
      { step: '2', title: 'Click Minify', body: 'Comments are removed and whitespace is collapsed into a single compact line.' },
      { step: '3', title: 'Copy the minified CSS', body: 'Copy the output into your production stylesheet or build.' },
    ],
    useCases: [
      { title: 'Faster first paint', body: 'Because CSS blocks rendering, a smaller stylesheet lets the browser paint the page sooner.' },
      { title: 'CDN deployment', body: 'Minify before uploading for smaller transfers and lower bandwidth costs.' },
      { title: 'WordPress & CMS themes', body: 'Compact theme CSS to lift PageSpeed scores without installing a plugin.' },
      { title: 'Embeds & widgets', body: 'Keep injected styles as light as possible on pages you do not control.' },
      { title: 'Quick one-offs', body: 'Minify a stylesheet without setting up a full build pipeline.' },
    ],
    faq: [
      { q: 'Is my CSS sent to a server?', a: 'No — the stylesheet is minified locally by your browser and is never uploaded anywhere.' },
      { q: 'How much smaller will it get?', a: 'A well-formatted stylesheet usually drops 20–40%, and more when it carries lots of comments or deep indentation.' },
      { q: 'Are custom properties and calc() preserved?', a: 'Yes. All CSS — including variables, calc(), media queries, and modern syntax — is preserved correctly.' },
      { q: 'Does minifying change specificity or behaviour?', a: 'No. Only whitespace and comments are removed; selectors, properties, and values are untouched, so the rendered result is identical.' },
      { q: 'Should I keep the original stylesheet?', a: 'Yes. Keep editing the readable .css file and run this only as the final build step; minified CSS is impractical to hand-edit.' },
      { q: 'Does it combine multiple files?', a: 'It minifies what you paste. To bundle files, concatenate them first, then minify the combined CSS.' },
      { q: 'Can I minify HTML and JS too?', a: 'Use the HTML Minifier for markup. This tool is focused on CSS.' },
      { q: 'Is it free?', a: 'Yes — minify any number of stylesheets for free, with no account required.' },
    ],
  },

  'uuid-generator': {
    why: 'When you need an identifier that is guaranteed not to clash — a database primary key, a request ID across microservices, a file name, an idempotency key — you reach for a UUID. Their whole point is that any machine can generate one independently and it will still be unique, with no central coordination. Typing one by hand is impossible, and generating one in a console every time is a chore.\n\nThis generator produces version 4 (random) UUIDs on demand, using your browser’s cryptographic API (crypto.randomUUID / getRandomValues) rather than the weak Math.random(), so they are genuinely random and safe to rely on. Generate from one up to a hundred at a time, pick the format you need — standard, uppercase, no hyphens, or wrapped in braces — and copy them all at once. Everything runs in your browser; nothing is sent anywhere.',
    howTo: [
      { step: '1', title: 'Set the quantity', body: 'Choose how many UUIDs to generate, from 1 up to 100 at once.' },
      { step: '2', title: 'Choose a format', body: 'Pick standard, UPPERCASE, no-hyphens, or {braces} to match what your system expects.' },
      { step: '3', title: 'Copy', body: 'Click Copy All to put every generated UUID on your clipboard at once.' },
    ],
    useCases: [
      { title: 'Database keys', body: 'Generate primary-key IDs that stay unique across distributed systems with no coordination.' },
      { title: 'API & events', body: 'Create request IDs, correlation IDs, and idempotency keys for requests and event tracking.' },
      { title: 'Test fixtures', body: 'Produce batches of UUIDs for test data, mock objects, and seed scripts.' },
      { title: 'File & resource names', body: 'Name uploads or resources uniquely to avoid collisions and overwrites.' },
      { title: 'Config & secrets scaffolding', body: 'Drop in unique identifiers while wiring up services and infrastructure.' },
    ],
    faq: [
      { q: 'Are these truly unique?', a: 'UUID v4 has 122 random bits, so the chance of a collision is astronomically small — safe to treat as unique in practice.' },
      { q: 'Is anything sent to a server?', a: 'No. Generation uses crypto.randomUUID() / crypto.getRandomValues() entirely in your browser.' },
      { q: 'What is UUID v4?', a: 'A randomly generated UUID — the most widely used type for general-purpose unique IDs.' },
      { q: 'How is this different from v1 or v7?', a: 'v1 is time/MAC-based and v7 is time-ordered; v4 is purely random. This tool generates v4, the common default.' },
      { q: 'Can I get sortable, sequential IDs?', a: 'v4 is random, not sortable. If you need time-ordered IDs, consider ULIDs or UUID v7 instead.' },
      { q: 'Are they cryptographically secure?', a: 'They use a cryptographically secure random source, but a UUID is an identifier, not a secret — do not use one as a password or token.' },
      { q: 'Why do all my UUIDs have a 4 in the same spot?', a: 'That fixed digit marks the version (4). It is part of the spec, not a sign of low randomness.' },
      { q: 'Is it free?', a: 'Yes — generate as many UUIDs as you need for free, with no limit or sign-up.' },
    ],
  },

  'markdown-previewer': {
    why: 'Markdown is everywhere — README files, GitHub issues, docs, and blog posts — but writing it blind is guesswork. Tables, nested lists, fenced code blocks, and links are exactly the parts that are easy to get subtly wrong, and you usually only find out after you commit or publish and the formatting comes out broken.\n\nThis previewer shows an accurate HTML rendering side by side with your Markdown, updating live as you type, so you can see precisely how it will look before it goes anywhere. It supports GitHub Flavored Markdown — tables, task lists, strikethrough, and code blocks — and lets you copy either the raw Markdown or the rendered HTML for your project. It renders in your browser with the marked library, so nothing you write is transmitted. It is the fastest way to draft and proof Markdown without committing to a repo just to check the output.',
    howTo: [
      { step: '1', title: 'Type or paste Markdown', body: 'Write or paste your Markdown into the left editor panel.' },
      { step: '2', title: 'See the live preview', body: 'The right panel renders the HTML output in real time as you type, including tables and code blocks.' },
      { step: '3', title: 'Copy Markdown or HTML', body: 'Copy the raw Markdown, or copy the rendered HTML to drop into a project.' },
    ],
    useCases: [
      { title: 'README files', body: 'Proof a GitHub README locally so the formatting is right before you commit.' },
      { title: 'Documentation', body: 'Write and preview docs, wikis, and changelogs with instant feedback.' },
      { title: 'Blog posts', body: 'Preview Markdown posts before publishing to Ghost, Hugo, Jekyll, or Gatsby.' },
      { title: 'Issues & PRs', body: 'Check that a tricky comment with tables or checklists will render correctly before posting.' },
      { title: 'Learning Markdown', body: 'Experiment and see immediately how each syntax element renders.' },
    ],
    faq: [
      { q: 'Which Markdown features are supported?', a: 'GitHub Flavored Markdown (GFM): tables, task lists, strikethrough, fenced code blocks, and the standard formatting elements.' },
      { q: 'Is my content sent to a server?', a: 'No. Markdown is rendered in your browser with the marked library, so nothing is transmitted.' },
      { q: 'Can I export the HTML?', a: 'Yes. Click "Copy HTML" to grab the full rendered HTML output.' },
      { q: 'Will the preview match GitHub exactly?', a: 'It follows GFM closely, so it is a faithful guide; some platform-specific styling (like GitHub’s exact CSS) can differ slightly.' },
      { q: 'Is syntax highlighting applied in code blocks?', a: 'Code blocks are formatted with correct structure; coloured syntax highlighting is not currently applied.' },
      { q: 'Does it support raw HTML inside Markdown?', a: 'Standard inline HTML in Markdown renders in the preview as it normally would.' },
      { q: 'Is there a length limit?', a: 'No — write as much as you need; it all renders locally.' },
      { q: 'Is it free?', a: 'Yes — preview unlimited Markdown for free, with no account.' },
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
    why: 'Changing the capitalisation of text by hand is slow and easy to get wrong — retyping a heading in Title Case, fixing a sentence someone left in ALL CAPS, or converting a variable from snake_case to camelCase one character at a time. Writers, developers, and data workers all hit this constantly, and the rules differ: Title Case has exceptions, camelCase and PascalCase differ by the first letter, and snake_case versus kebab-case matters in code.\n\nThis converter takes your text once and instantly shows all 11 case formats side by side, so you just copy the one you need. It covers everyday writing cases (UPPERCASE, lowercase, Title Case, Sentence case) and every common programming convention (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case), plus aLtErNaTiNg CaSe for fun. Everything runs in your browser, so your text never leaves your device, and you can feed any result back in as new input to chain conversions. No limits, no sign-up.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Type or paste the text you want to reformat into the input box.' },
      { step: '2', title: 'View all variants', body: 'All 11 case formats are generated instantly and shown side by side.' },
      { step: '3', title: 'Copy what you need', body: 'Click the copy icon beside any variant to copy it, or "Use as input" to convert it further.' },
    ],
    useCases: [
      { title: 'Developers', body: 'Convert identifiers between naming conventions when moving code or data across languages.' },
      { title: 'Database & API work', body: 'Flip column and field names between snake_case (SQL) and camelCase (JS/JSON) in one click.' },
      { title: 'Writers & editors', body: 'Fix a heading stuck in caps, or switch between Title Case and sentence case for different channels.' },
      { title: 'Marketers', body: 'Standardise capitalisation across titles, tags, slugs, and CTAs.' },
      { title: 'Data cleanup', body: 'Normalise inconsistent casing in pasted lists and spreadsheets before reusing them.' },
    ],
    faq: [
      { q: 'Is my text sent to a server?', a: 'No. All conversion happens in your browser, so your text never leaves your device.' },
      { q: 'What are the 11 formats?', a: 'UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, and aLtErNaTiNg CaSe.' },
      { q: 'What’s the difference between camelCase and PascalCase?', a: 'Both join words with no spaces; camelCase starts lowercase (myVariable) while PascalCase capitalises the first letter (MyVariable).' },
      { q: 'When should I use snake_case vs kebab-case?', a: 'snake_case (with underscores) is common in Python and databases; kebab-case (with hyphens) is used for URLs, CSS classes, and file names.' },
      { q: 'Can I chain conversions?', a: 'Yes. Click "Use as input" beside any result to feed it back in for further conversion.' },
      { q: 'Does Title Case handle small words?', a: 'It capitalises the main words; always glance over names and acronyms, as no automatic Title Case handles every edge case perfectly.' },
      { q: 'Is there a character limit?', a: 'No limit — convert as much text as you want at once.' },
      { q: 'Is it free?', a: 'Yes — free, no sign-up.' },
    ],
  },

  'lorem-ipsum': {
    why: 'When you are designing a layout, the real copy is rarely ready — but you still need text in the boxes to judge spacing, line length, and how a heading sits above a paragraph. Using random keyboard mashing looks wrong, and pasting real draft copy distracts everyone into reading and editing it instead of reviewing the design. Lorem Ipsum solves this: it has the rhythm and letter distribution of real Latin-based text without meaning, so the eye treats it as content and focuses on the layout.\n\nThis generator produces classic Lorem Ipsum on demand by paragraphs, sentences, or exact word count, so you get precisely the amount your mockup or test fixture needs. You can copy it as plain text or as ready-to-paste HTML with each paragraph wrapped in `<p>` tags. It is generated from a local word bank entirely in your browser — nothing is sent anywhere — with no limits and no sign-up.',
    howTo: [
      { step: '1', title: 'Choose your unit', body: 'Select whether to generate by paragraphs, sentences, or words.' },
      { step: '2', title: 'Set the quantity', body: 'Enter how many paragraphs, sentences, or words you need for your layout or fixture.' },
      { step: '3', title: 'Copy', body: 'Copy it as plain text, or toggle HTML output to get it wrapped in <p> tags for markup.' },
    ],
    useCases: [
      { title: 'UI/UX designers', body: 'Fill wireframes and mockups with realistic-length placeholder text to judge spacing and hierarchy.' },
      { title: 'Developers', body: 'Seed databases, test fixtures, and components with varied-length content during development.' },
      { title: 'Template builders', body: 'Drop placeholder copy into email and document templates for client previews.' },
      { title: 'Print & layout', body: 'Mock up brochures, posters, and editorial layouts before the final copy arrives.' },
      { title: 'QA & testing', body: 'Generate long strings to test how a UI handles overflow, wrapping, and truncation.' },
    ],
    faq: [
      { q: 'Is my data sent to a server?', a: 'No. The text is generated from a local word bank entirely in your browser.' },
      { q: 'What is Lorem Ipsum?', a: 'Scrambled placeholder text derived from Cicero’s "de Finibus Bonorum et Malorum" (45 BC), used in typesetting and design since the 1960s.' },
      { q: 'Why use it instead of real text?', a: 'Meaningless filler keeps reviewers focused on layout and typography instead of reading and editing the words.' },
      { q: 'Can I get HTML output?', a: 'Yes — toggle HTML output to wrap each paragraph in <p> tags, ready to paste into markup.' },
      { q: 'Can I generate an exact word count?', a: 'Yes. Choose the "words" unit and enter the exact number you need.' },
      { q: 'Should I ship Lorem Ipsum to production?', a: 'No — it is placeholder only. Always replace it with real copy before launching, or search engines may index meaningless text.' },
      { q: 'Is there a generation limit?', a: 'No limit — generate as much as you need.' },
      { q: 'Is it free?', a: 'Yes — generate as much placeholder text as you need for free, with no sign-up.' },
    ],
  },

  // ─── Viral Tools ──────────────────────────────────────────────────────────

  'invoice-generator': {
    why: 'When you freelance or run a small business, getting paid starts with a clear, professional invoice — it sets the amount, the due date, and the payment terms, and it makes you look organised and trustworthy. But dedicated invoicing apps charge a monthly subscription for what is, at heart, a simple document, and cobbling one together in Word never quite looks right or adds up the totals reliably.\n\nThis generator gives you a clean, correct invoice in a couple of minutes with no software or account. Enter your business and client details, an invoice number and dates, then add line items with quantities and prices — the subtotal, tax, and total are calculated for you, in the currency you choose. You download it as a PDF through your browser’s print-to-PDF, so everything stays on your device and nothing is uploaded. Because the data only lives in your current session, download the finished PDF before you close the tab.',
    howTo: [
      { step: '1', title: 'Fill in the details', body: 'Add your business name, the client’s name, an invoice number, and the issue and due dates.' },
      { step: '2', title: 'Add line items', body: 'List each product or service with quantity and unit price; the subtotal, tax, and total update automatically.' },
      { step: '3', title: 'Save as PDF', body: 'Click Print Invoice to open your browser’s print dialog, then choose "Save as PDF" to download it.' },
    ],
    useCases: [
      { title: 'Freelancers', body: 'Bill clients with a tidy, professional invoice without paying for accounting software.' },
      { title: 'Small businesses', body: 'Produce quick invoices for one-off sales and services without a full billing system.' },
      { title: 'Contractors & trades', body: 'Invoice per project with a clear line-item breakdown and automatic tax calculation.' },
      { title: 'Consultants & agencies', body: 'Issue itemised invoices for hours or deliverables in the client’s currency.' },
      { title: 'Side hustles', body: 'Look professional from the first sale with a proper invoice rather than a plain message.' },
    ],
    faq: [
      { q: 'Is my invoice data stored anywhere?', a: 'No. The data exists only in your browser session and is never saved to a server.' },
      { q: 'Can I save and edit an invoice later?', a: 'Not currently — the data is not persisted between sessions, so download the PDF before closing the tab.' },
      { q: 'Is the tax calculated automatically?', a: 'Yes. Enter your tax rate and the tool computes the tax and grand total from your line items.' },
      { q: 'Does it support multiple currencies?', a: 'Yes — choose from currency symbols including USD, GBP, EUR, and more.' },
      { q: 'Can I add a company logo?', a: 'Not in the current version; logo support is planned for a future update.' },
      { q: 'Will it look professional when printed?', a: 'Yes — the layout is designed as a clean business invoice and saves as a properly formatted PDF.' },
      { q: 'Can I do this on my phone?', a: 'Yes. Fill it in and save to PDF in any modern mobile browser.' },
      { q: 'Is it free?', a: 'Completely free, with no sign-up and no watermark.' },
    ],
  },

  'resume-builder': {
    why: 'Your CV is often the only thing standing between you and an interview, so it needs clean structure, consistent formatting, and a layout recruiters can scan in seconds. Yet popular resume-builder sites charge $10–30 a month, frequently lock the download behind a subscription, or stamp a watermark on the free version — a lot to ask for a one- or two-page document you will tweak a handful of times.\n\nThis builder is free and adds no watermark. Fill in your contact details, a short professional summary, your skills, and your work and education history with bullet-point achievements, and it lays everything out in a clean, professional template you save as a PDF through your browser. Nothing is uploaded — your personal details stay on your device — and there is no account to create. Because the data lives only in the current session, download your PDF before closing the tab, and keep the file so you can re-import the details when you need to update it.',
    howTo: [
      { step: '1', title: 'Fill in your profile', body: 'Add your contact information, a concise professional summary, and your key skills.' },
      { step: '2', title: 'Add experience and education', body: 'Enter work history and education with dates and bullet-point achievements that show impact.' },
      { step: '3', title: 'Save as PDF', body: 'Click Print Resume to open your browser’s print dialog, then choose "Save as PDF".' },
    ],
    useCases: [
      { title: 'Job seekers', body: 'Produce a polished CV without paying for a subscription resume service or accepting a watermark.' },
      { title: 'Career changers', body: 'Reframe and reformat your experience quickly when targeting a new industry or role.' },
      { title: 'Recent graduates', body: 'Build a well-structured first resume even with limited work history.' },
      { title: 'Freelancers & contractors', body: 'Keep a clean profile of skills and project history to send to prospective clients.' },
      { title: 'Quick updates', body: 'Refresh dates, add a recent role, and re-export a PDF in minutes before applying.' },
    ],
    faq: [
      { q: 'Is my resume data stored?', a: 'No. Everything lives only in your browser during the session — nothing is sent to a server.' },
      { q: 'Can I save and continue editing later?', a: 'The data is not kept between sessions, so download the PDF before closing. Keep that file as your master copy for future edits.' },
      { q: 'Is there a watermark?', a: 'No. The exported PDF is clean, with no watermark or branding added.' },
      { q: 'What format does it download as?', a: 'A PDF, created with your browser’s native print-to-PDF — the standard format employers and ATS systems expect.' },
      { q: 'Will it pass applicant tracking systems (ATS)?', a: 'The template uses a simple, text-based single-column layout that ATS software reads well; avoid adding images or unusual fonts.' },
      { q: 'Are there multiple templates?', a: 'Currently one clean professional template, with more planned.' },
      { q: 'Can I build it on my phone?', a: 'Yes — it works in any modern mobile browser and saves to PDF.' },
      { q: 'Is it really free?', a: 'Yes — build and print your resume for free, with no account and no watermark on the page.' },
    ],
  },

  'bio-link-generator': {
    why: 'Instagram, TikTok, and X each give you just one clickable link in your bio, but you usually have several places you want people to go — your website, shop, latest video, newsletter, and other socials. A "link in bio" page solves that by putting all of them behind one shareable URL. Services like Linktree do this but charge monthly for customisation and own the page, your audience, and your data.\n\nThis generator builds that page for you as a single, self-contained HTML file you fully own. Add your name, a short bio, an optional photo, and as many links as you like with titles and emoji icons, pick a theme, then download or copy the code. Everything is generated in your browser — nothing is uploaded — and because you get raw HTML, you can host it for free on GitHub Pages, Netlify, or Cloudflare Pages and edit it however you want. No monthly fee, no account, and no platform between you and your audience.',
    howTo: [
      { step: '1', title: 'Enter your profile details', body: 'Add your name, a short bio, and an optional profile image URL.' },
      { step: '2', title: 'Add your links', body: 'Add each destination with a title, URL, and optional emoji icon, and choose a theme.' },
      { step: '3', title: 'Download or copy the HTML', body: 'Download the self-contained HTML file (or copy the code) and host it anywhere — or edit it first.' },
    ],
    useCases: [
      { title: 'Content creators', body: 'Replace a paid Linktree with a free bio-link page you own and fully control.' },
      { title: 'Small businesses', body: 'Make a simple landing page pointing to your shop, booking page, and socials.' },
      { title: 'Influencers & brands', body: 'Gather affiliate links, brand deals, and channels in one shareable place.' },
      { title: 'Musicians & podcasters', body: 'Link out to every streaming platform from a single URL in your bio.' },
      { title: 'Events & portfolios', body: 'Point followers to tickets, RSVP forms, or your latest work from one link.' },
    ],
    faq: [
      { q: 'Where is the bio-link page hosted?', a: 'You host it yourself. GitHub Pages, Netlify, and Cloudflare Pages all offer free hosting — upload the HTML file and it’s live.' },
      { q: 'Is my data sent to a server?', a: 'No. The HTML is generated entirely in your browser; nothing is uploaded.' },
      { q: 'Do I need to know how to code?', a: 'No. You fill in a form and get a ready-to-upload file. The raw HTML is there if you ever want to tweak it.' },
      { q: 'Can I customise the design?', a: 'Yes — pick from built-in themes, and since you receive the HTML you can edit colours and styles directly for full control.' },
      { q: 'Is there a limit on links?', a: 'No. Add as many links as you want.' },
      { q: 'Do I own the page and my audience?', a: 'Yes — unlike hosted services, the file is yours, on your hosting, with no platform in between and no monthly fee.' },
      { q: 'Can I update it later?', a: 'Yes. Re-generate the page or edit the HTML directly, then re-upload it to your host.' },
      { q: 'Is it free?', a: 'Yes — free to generate, with no sign-up.' },
    ],
  },

  'typing-speed-test': {
    why: 'Typing is something most of us do all day without ever measuring, yet speed and accuracy make a real difference — to how fast you get through work, and to roles like data entry, transcription, and admin that set minimum WPM requirements. The average person types around 40 WPM, competent typists hit 60–80, and fast ones exceed 100. You cannot improve what you do not measure, and a quick test gives you a baseline plus immediate feedback on where you slow down.\n\nThis test times you on a real passage: the clock starts on your first keystroke, wrong characters are highlighted in red as you go, and at the end you get your words-per-minute, accuracy percentage, and a rating. It runs entirely in your browser, so nothing you type is recorded or uploaded. Take it repeatedly with new passages to track progress over time — regular, deliberate practice reliably pushes WPM up over a few weeks.',
    howTo: [
      { step: '1', title: 'Start typing', body: 'Click the passage to focus the input. The timer starts automatically on your first keystroke — no separate start button.' },
      { step: '2', title: 'Type the passage', body: 'Type as quickly and accurately as you can; incorrect characters are highlighted in red in real time so you can correct them.' },
      { step: '3', title: 'See your results', body: 'When you finish, your WPM, accuracy percentage, and a performance rating are shown. Try a new passage to go again.' },
    ],
    useCases: [
      { title: 'Professionals', body: 'Set a baseline WPM and track how it improves with practice over time.' },
      { title: 'Students', body: 'Build speed before exams and essays that involve long stretches of typing.' },
      { title: 'Job applicants', body: 'Prepare for roles that list a minimum WPM — data entry, transcription, customer support, and admin.' },
      { title: 'Learners', body: 'Use the live error highlighting to find which keys and patterns slow you down.' },
      { title: 'Friendly competition', body: 'Compare scores with friends or colleagues on the same passage for fun.' },
    ],
    faq: [
      { q: 'How is WPM calculated?', a: 'Words Per Minute = words typed ÷ time in minutes, where a "word" is standardised as 5 characters — the common convention so scores are comparable.' },
      { q: 'What is a good WPM?', a: 'Roughly: under 40 is slow, 40–70 average, 70–100 fast, and over 100 excellent. Top typists exceed 120 WPM.' },
      { q: 'Does accuracy affect my score?', a: 'Yes. Errors are highlighted and factored into your accuracy percentage; raw speed with many mistakes is not a true measure.' },
      { q: 'Is my typing data recorded?', a: 'No. The test runs entirely in your browser — nothing is recorded or uploaded.' },
      { q: 'Can I choose the passage?', a: 'A random passage loads each time; click "New Passage" for a different one.' },
      { q: 'How can I get faster?', a: 'Practise regularly, keep your fingers on the home row, and prioritise accuracy first — speed follows once errors drop.' },
      { q: 'Does it work on mobile?', a: 'It works best with a physical keyboard, but you can run it in any modern browser.' },
      { q: 'Is it free?', a: 'Yes — take the test as many times as you like for free, with no account.' },
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
      { q: 'Is it free?', a: 'Yes — run unlimited percentage calculations for free, with no sign-up.' },
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
      { q: 'Are my dates uploaded?', a: 'No. All the date math runs locally in your browser.' },
      { q: 'Is it free?', a: 'Yes — calculate as many ages and dates as you like for free, with no account needed.' },
    ],
  },

  'bmi-calculator': {
    why: 'Body Mass Index is the quick screening number health services worldwide use to flag whether someone’s weight may be too low or too high for their height. It is simple in principle — weight divided by height squared — but easy to get wrong in practice, because the formula differs between metric and imperial and people routinely mix units or misremember the multiplier. Getting an accurate figure matters when a form, a doctor, or your own tracking asks for it.\n\nThis calculator handles both metric (cm, kg) and imperial (ft/in, lb) correctly, so you never have to convert by hand, and it shows your result colour-coded against the official WHO categories the moment you enter your measurements. It runs entirely in your browser, so nothing you type is stored or uploaded. One important caveat built into how you should read the result: BMI is a screening tool, not a diagnosis — it does not distinguish muscle from fat, so use it as one reference point alongside other measures and professional advice.',
    howTo: [
      { step: '1', title: 'Choose your units', body: 'Switch between metric (cm, kg) and imperial (ft/in, lb) — whichever you have your measurements in.' },
      { step: '2', title: 'Enter height and weight', body: 'Type your measurements into the fields; there is no need to convert anything yourself.' },
      { step: '3', title: 'Read your category', body: 'Your BMI and weight category appear instantly, colour-coded against the WHO ranges.' },
    ],
    useCases: [
      { title: 'Health check-ins', body: 'See whether your weight sits in the healthy range and track the trend over time.' },
      { title: 'Fitness goals', body: 'Use BMI as one reference point alongside body measurements when setting targets.' },
      { title: 'Medical & insurance forms', body: 'Compute BMI quickly whenever a form, doctor, or application asks for it.' },
      { title: 'Unit conversion', body: 'Get a correct BMI even when your height and weight are in different systems.' },
      { title: 'Parents & carers', body: 'Check an adult household member’s BMI without needing to remember the formula.' },
    ],
    faq: [
      { q: 'What is a healthy BMI?', a: 'The WHO ranges are: under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, and 30+ obese.' },
      { q: 'How is BMI calculated?', a: 'Metric: weight (kg) ÷ height (m)². Imperial: 703 × weight (lb) ÷ height (in)². This tool applies the right formula for your chosen units.' },
      { q: 'Is BMI accurate for everyone?', a: 'No — it is a screening tool, not a diagnosis. It does not separate muscle from fat, so very muscular people can read high and it is less reliable for the very tall or short.' },
      { q: 'Does it work for children?', a: 'Adult BMI categories do not apply to children and teens, who use age- and sex-specific percentile charts instead. Use this for adults.' },
      { q: 'Should I use metric or imperial?', a: 'Either — pick whichever matches your measurements. The result is the same once converted correctly.' },
      { q: 'What should I do with the result?', a: 'Treat it as a starting point. For personalised advice, discuss it with a healthcare professional who can consider your full picture.' },
      { q: 'Is my data stored?', a: 'No. The calculation runs entirely in your browser; nothing is saved or uploaded.' },
      { q: 'Is it free?', a: 'Yes — it is completely free with no sign-up, in both metric and imperial units.' },
    ],
  },

  'loan-calculator': {
    why: 'Before you take on a mortgage, car loan, or personal loan, the question that actually matters is "what will this cost me each month, and how much interest will I pay in total?" — and you cannot answer it by dividing the amount by the number of months, because interest compounds over the term. A small change in the rate or the length of the loan can swing the monthly payment and the total interest by a surprising amount.\n\nThis calculator uses the standard EMI (Equated Monthly Instalment) formula to show your true monthly payment, the total interest over the life of the loan, and the total amount you will repay. Enter the amount, the annual rate, and the term, and the figures update instantly so you can compare scenarios — a shorter term, a lower rate, a bigger deposit — side by side. It runs in your browser with nothing stored. It is built for comparison and budgeting; lenders may add fees and round differently, so treat the result as a close estimate rather than a formal quote.',
    howTo: [
      { step: '1', title: 'Enter the loan amount', body: 'Type the principal — the amount you intend to borrow.' },
      { step: '2', title: 'Set the rate and term', body: 'Enter the annual interest rate (APR) and the term in years.' },
      { step: '3', title: 'Review the breakdown', body: 'See your monthly EMI, the total interest paid, and the total amount payable over the term.' },
    ],
    useCases: [
      { title: 'Mortgages', body: 'Estimate monthly home-loan repayments and compare how rate and term change the total cost.' },
      { title: 'Car & personal loans', body: 'Judge competing offers by their real total cost, not just the headline monthly figure.' },
      { title: 'Budgeting', body: 'Check whether a prospective repayment comfortably fits your monthly budget before committing.' },
      { title: 'Deposit decisions', body: 'See how borrowing less (a bigger deposit) lowers both the payment and the total interest.' },
      { title: 'Refinancing', body: 'Compare a new rate or term against your current loan to see if switching saves money.' },
    ],
    faq: [
      { q: 'What is EMI?', a: 'EMI (Equated Monthly Instalment) is the fixed amount you pay each month — covering both principal and interest — until the loan is fully repaid.' },
      { q: 'How is the monthly payment calculated?', a: 'It uses the standard amortisation formula: EMI = P·r·(1+r)ⁿ ÷ ((1+r)ⁿ−1), where P is the principal, r the monthly rate, and n the number of months.' },
      { q: 'Why is my total interest so high?', a: 'Longer terms mean more months of interest. Lowering the rate or shortening the term reduces total interest, often a lot — try both to compare.' },
      { q: 'Does it support a 0% rate?', a: 'Yes. At 0% the payment is simply the principal divided by the number of months.' },
      { q: 'Does it include fees, taxes, or insurance?', a: 'No. It calculates principal and interest only. Real-world costs like arrangement fees, property tax, or insurance are extra.' },
      { q: 'What’s the difference between APR and interest rate?', a: 'The interest rate is the cost of borrowing the principal; APR also rolls in certain fees, so it can be higher. Enter the figure your lender quotes for the closest estimate.' },
      { q: 'Is this financial advice?', a: 'No. It is an estimate for comparison — lenders may add fees and round differently. Confirm exact figures with the lender.' },
      { q: 'Is it free?', a: 'Yes — free, runs in your browser, with no sign-up.' },
    ],
  },

  'discount-calculator': {
    why: 'Shops advertise the percentage off because it sounds dramatic, but the number you actually need is the final price and how much you really save — and that gets fiddly when tax is added on top or when you are comparing deals on the spot. Working out "25% off, then add tax" in your head while standing in a store or scrolling a sale is exactly where people overpay or misjudge whether a deal is worth it.\n\nThis calculator gives you all the figures at once: enter the original price and the discount, optionally add a tax rate, and see the final price, the amount saved, and the discounted price before tax. The order matches how checkouts work — the discount comes off first, then tax applies to the reduced amount — so the result mirrors what you will actually pay. It runs in your browser, the maths is currency-agnostic, and there is no sign-up.',
    howTo: [
      { step: '1', title: 'Enter the original price', body: 'Type the item’s pre-discount price.' },
      { step: '2', title: 'Enter the discount', body: 'Add the discount percentage, and optionally a tax rate to apply afterward.' },
      { step: '3', title: 'See your savings', body: 'View the final price, how much you save, and the discounted price before tax.' },
    ],
    useCases: [
      { title: 'Sales & coupons', body: 'Find the true price of a "30% off" deal — and how much you actually save — before buying.' },
      { title: 'Black Friday & big sales', body: 'Compare deals quickly while shopping so you can tell a real bargain from a small one.' },
      { title: 'Retail & invoicing', body: 'Apply a discount and tax line to quote a clear customer price.' },
      { title: 'Budget shopping', body: 'Check whether a sale item lands within your budget once tax is included.' },
      { title: 'Reselling & markdowns', body: 'Work out a markdown price and confirm the final figure after tax.' },
    ],
    faq: [
      { q: 'How is the discount applied?', a: 'The discount is taken off the original price first, then any tax is applied to the discounted amount — the same order as a typical checkout.' },
      { q: 'How do I calculate the final price myself?', a: 'Final = original × (1 − discount%) × (1 + tax%). The tool does this for you and also shows the amount saved.' },
      { q: 'Can I leave tax blank?', a: 'Yes. Set tax to 0 to see just the discounted price with no tax added.' },
      { q: 'Can it handle stacked discounts?', a: 'Apply them in sequence: take the result of the first discount as the original price, then apply the second.' },
      { q: 'Does it tell me the amount saved?', a: 'Yes — it shows the savings in money, not just the percentage, so you can see the real benefit.' },
      { q: 'Does it work in any currency?', a: 'Yes. The maths is currency-agnostic; just read the figures in your own currency.' },
      { q: 'Is my data stored?', a: 'No. Everything is calculated in your browser.' },
      { q: 'Is it free?', a: 'Yes — work out as many discounts as you need for free, with no account.' },
    ],
  },

  'unit-converter': {
    why: 'Converting between units from memory is where small, costly mistakes creep in — a recipe in cups when you only have scales, a distance in miles when your car shows kilometres, a temperature in Fahrenheit when you think in Celsius. The conversion factors are easy to half-remember and easy to apply the wrong way round, and temperature is especially tricky because it needs an offset, not a simple multiplication.\n\nThis converter removes the guesswork across the everyday categories — length, weight, temperature, area, volume, and speed. Pick a category, choose the units to convert from and to (with a swap button to reverse them), and the result updates instantly. It uses precise SI conversion factors for accuracy, and handles temperature with the correct offset formulas for Celsius, Fahrenheit, and Kelvin rather than treating them as simple ratios. Everything runs in your browser, with no limits and no sign-up.',
    howTo: [
      { step: '1', title: 'Pick a category', body: 'Choose length, weight, temperature, area, volume, or speed.' },
      { step: '2', title: 'Select the units', body: 'Choose the unit to convert from and the unit to convert to; use the swap button to reverse the direction.' },
      { step: '3', title: 'Enter a value', body: 'Type your value and read the converted result instantly.' },
    ],
    useCases: [
      { title: 'Travel', body: 'Convert miles to kilometres, or Fahrenheit to Celsius, when you’re somewhere that uses the other system.' },
      { title: 'Cooking & baking', body: 'Switch recipe amounts between cups, millilitres, grams, and ounces.' },
      { title: 'Study & work', body: 'Convert science and engineering units accurately for homework, labs, and reports.' },
      { title: 'DIY & home', body: 'Move between feet/inches and metres/centimetres for measuring and building.' },
      { title: 'Fitness & health', body: 'Convert weights between kilograms and pounds, or distances between miles and kilometres.' },
    ],
    faq: [
      { q: 'How accurate are the conversions?', a: 'They use standard SI conversion factors and are accurate to six decimal places.' },
      { q: 'Does it convert temperature correctly?', a: 'Yes. Temperature uses proper offset formulas (e.g. °F = °C × 9/5 + 32), not simple ratios, for Celsius, Fahrenheit, and Kelvin.' },
      { q: 'Which categories are supported?', a: 'Length, weight/mass, temperature, area, volume, and speed, each with the common metric and imperial units.' },
      { q: 'Can I reverse the conversion quickly?', a: 'Yes — the swap button flips the "from" and "to" units instantly.' },
      { q: 'Does it handle US vs UK units that share a name?', a: 'Where units differ (such as US vs imperial gallons), they are listed separately so you pick the correct one.' },
      { q: 'Is my data uploaded?', a: 'No. All conversions run in your browser.' },
      { q: 'Does it work offline once loaded?', a: 'The conversion maths is fully client-side, so it keeps working without sending anything to a server.' },
      { q: 'Is it free?', a: 'Yes — completely free, with no limits or sign-up.' },
    ],
  },

  // ─── More Developer Tools ────────────────────────────────────────────────────

  'hash-generator': {
    why: 'A cryptographic hash turns any input into a fixed-length fingerprint, and the same input always produces the same digest. That property underpins a lot of everyday computing: verifying that a downloaded file was not corrupted or tampered with, comparing data without storing the original, and generating checksums for tests and caches. Computing one usually means a command-line tool or a snippet of code.\n\nThis generator does it instantly in the browser, showing SHA-1, SHA-256, SHA-384, and SHA-512 digests for your text as you type, each copyable with one click. It uses the native Web Crypto API (crypto.subtle), so your input never leaves your device — which matters if you are hashing anything sensitive. Hashes are one-way by design: you cannot recover the original text from a digest, and that is exactly why they are useful for integrity checks and fingerprints.',
    howTo: [
      { step: '1', title: 'Type or paste text', body: 'Enter the text you want to hash into the input box.' },
      { step: '2', title: 'See all digests', body: 'SHA-1, SHA-256, SHA-384, and SHA-512 are computed automatically as you type.' },
      { step: '3', title: 'Copy a hash', body: 'Click the copy icon next to any algorithm to copy its digest.' },
    ],
    useCases: [
      { title: 'File & data integrity', body: 'Generate a checksum to confirm text or data has not been altered in transit or storage.' },
      { title: 'Development & testing', body: 'Produce known hash values for unit tests, fixtures, and cache keys.' },
      { title: 'Verifying downloads', body: 'Compare a computed SHA-256 against a published checksum to confirm a file is genuine.' },
      { title: 'Deduplication', body: 'Hash content to detect duplicates without comparing the full data.' },
      { title: 'Learning cryptography', body: 'See how the same input always maps to the same fixed-length digest, and how one tiny change alters it completely.' },
    ],
    faq: [
      { q: 'Why is there no MD5?', a: 'MD5 is not provided by the browser’s Web Crypto API and is cryptographically broken. Use SHA-256 or stronger for new work.' },
      { q: 'Is my text uploaded?', a: 'No. Hashing runs entirely in your browser via crypto.subtle, so the input never leaves your device.' },
      { q: 'Can I reverse a hash?', a: 'No. Cryptographic hashes are one-way; the original cannot be recovered from the digest.' },
      { q: 'Which algorithm should I use?', a: 'SHA-256 is the sensible default for integrity and general use. SHA-384/512 give longer digests; SHA-1 is legacy and best avoided for security.' },
      { q: 'Should I use this to hash passwords?', a: 'No. Plain SHA hashing is unsuitable for passwords — use a purpose-built algorithm like bcrypt, scrypt, or Argon2 with a salt on the server.' },
      { q: 'Why does a tiny change rewrite the whole hash?', a: 'That is the avalanche effect: a good hash spreads any change across the entire output, which is what makes tampering detectable.' },
      { q: 'Can I hash a file?', a: 'This tool hashes text input. For file checksums, use a file-hashing utility or your OS command line.' },
      { q: 'Is it free?', a: 'Yes — generate unlimited hashes for free, with no sign-up.' },
    ],
  },

  'timestamp-converter': {
    why: 'Computers love Unix time — the number of seconds since 1 January 1970 — because it is a single, timezone-free integer that is easy to store and compare. Humans cannot read it at all: "1718539620" tells you nothing at a glance. Logs, databases, JWTs, and API responses are full of these epoch numbers, and when you are debugging you constantly need to know what date one represents, or to produce the timestamp for a specific moment.\n\nThis converter goes both ways. Paste a Unix timestamp to see the date in your local time, UTC, and ISO 8601 formats; or pick a date and time to get its epoch value. It auto-detects whether your number is in seconds or milliseconds, shows a live clock of the current Unix time, and copies any value with a click. Everything runs in your browser, so nothing is sent anywhere — handy when the timestamps come from private logs.',
    howTo: [
      { step: '1', title: 'Convert a timestamp', body: 'Paste a Unix timestamp (seconds or milliseconds) to see the matching date in local, UTC, and ISO formats.' },
      { step: '2', title: 'Convert a date', body: 'Pick a date and time to get its Unix timestamp in seconds.' },
      { step: '3', title: 'Copy the result', body: 'Click any value to copy it. A live clock shows the current Unix time for reference.' },
    ],
    useCases: [
      { title: 'Debugging logs', body: 'Turn epoch timestamps in server and application logs into readable dates.' },
      { title: 'API development', body: 'Generate timestamps for requests, or verify exp/iat values returned in responses and tokens.' },
      { title: 'Database work', body: 'Convert stored Unix times into human-readable dates for inspection and reporting.' },
      { title: 'Scheduling & cron', body: 'Confirm exactly when an epoch-based job or expiry will fire.' },
      { title: 'Cross-timezone checks', body: 'See a moment in both your local time and UTC to avoid off-by-hours mistakes.' },
    ],
    faq: [
      { q: 'Seconds or milliseconds — does it matter?', a: 'No. The tool auto-detects: values longer than about 11 digits are treated as milliseconds, otherwise as seconds.' },
      { q: 'What is a Unix timestamp?', a: 'The number of seconds elapsed since 00:00:00 UTC on 1 January 1970 (the "epoch"), a standard, timezone-independent way to represent a moment.' },
      { q: 'What timezone are results shown in?', a: 'Your local timezone plus UTC and ISO 8601, so you can use whichever your task needs.' },
      { q: 'Why does my timestamp look wrong by hours?', a: 'Usually a timezone mix-up — compare the UTC value, and check whether the source stores local or UTC time.' },
      { q: 'What is ISO 8601?', a: 'A standard date-time format like 2024-06-16T12:00:00Z that is unambiguous and widely used in APIs and config.' },
      { q: 'Is the conversion done online?', a: 'No. Everything runs in your browser; nothing is uploaded.' },
      { q: 'Does it handle dates before 1970?', a: 'Yes — those are represented as negative Unix timestamps and convert correctly.' },
      { q: 'Is it free?', a: 'Yes — convert as many timestamps as you like for free, with no account required.' },
    ],
  },

  'url-encoder': {
    why: 'A URL can only safely contain a limited set of characters, so anything else — spaces, ampersands, slashes, question marks, accented letters, emoji — has to be percent-encoded (a space becomes %20, and so on). Get this wrong and links break, query parameters get cut off, or search terms come through garbled. The most common bug is using the wrong scope: encoding a whole URL when you should only encode a single query value, which mangles the structure, or vice versa.\n\nThis tool encodes and decodes both ways and lets you pick the right scope. Component encoding (encodeURIComponent) escapes structural characters like / ? & = and is what you want for an individual parameter value; full-URL encoding (encodeURI) leaves those intact so the overall URL keeps working. Paste your text, choose encode or decode, and copy the result. Everything runs in your browser, so the URLs and data you paste — which may include tokens or query parameters — never leave your device.',
    howTo: [
      { step: '1', title: 'Choose encode or decode', body: 'Switch between encoding plain text into a URL-safe form and decoding an encoded string back.' },
      { step: '2', title: 'Pick the scope', body: 'Use component encoding for an individual query value, or full-URL encoding to preserve the structure of a complete link.' },
      { step: '3', title: 'Paste and copy', body: 'Enter your text and copy the converted output.' },
    ],
    useCases: [
      { title: 'Building query strings', body: 'Safely encode parameter values containing spaces, symbols, or non-ASCII text before adding them to a URL.' },
      { title: 'Debugging links', body: 'Decode an encoded URL to read what it actually points to and spot a broken parameter.' },
      { title: 'API requests', body: 'Encode path segments and query values correctly before sending requests.' },
      { title: 'Tracking & campaigns', body: 'Encode UTM values and redirect targets so they survive being passed through a URL.' },
      { title: 'Fixing garbled text', body: 'Decode percent-encoded strings from logs or addresses to recover the original characters.' },
    ],
    faq: [
      { q: 'Component vs. full-URL encoding — which do I use?', a: 'Use component encoding (encodeURIComponent) for a single value like one query parameter; it escapes / ? & =. Use full-URL encoding (encodeURI) for a whole URL, which leaves those structural characters intact.' },
      { q: 'Why does decoding sometimes fail?', a: 'A malformed percent sequence — like a lone % not followed by two hex digits — cannot be decoded. Check the input for incomplete escapes.' },
      { q: 'What does %20 mean?', a: 'It is an encoded space. Percent-encoding represents a character by % followed by its hex byte value; a space is 0x20.' },
      { q: 'Why are some characters left unchanged?', a: 'Unreserved characters (letters, digits, and - _ . ~) are always safe in URLs, so they are not encoded.' },
      { q: 'How does this differ from Base64?', a: 'Percent-encoding makes text URL-safe; Base64 encodes binary data as text. They solve different problems — see the Base64 tool for the latter.' },
      { q: 'Does it handle emoji and non-English text?', a: 'Yes. They are encoded as UTF-8 byte sequences and round-trip correctly when decoded.' },
      { q: 'Is it private?', a: 'Yes. All encoding and decoding happens in your browser; nothing is uploaded.' },
      { q: 'Is it free?', a: 'Yes — encode and decode as much as you need for free, with no sign-up.' },
    ],
  },

  'csv-to-json': {
    why: 'Spreadsheets and database exports hand you CSV, but apps, APIs, and JavaScript almost always want JSON. The conversion looks trivial until you hit real data: a field like "Smith, John" or an address with a comma inside quotes breaks any naive split-on-comma approach, and line breaks inside quoted fields wreck it entirely. Doing it by hand is tedious and error-prone exactly where the data is messiest.\n\nThis converter parses CSV properly — honouring double-quoted fields that contain commas, line breaks, and escaped quotes ("") — and turns each row into a JSON object keyed by the header row. You can choose the delimiter (comma, semicolon, or tab) and have numeric strings converted into real numbers, then copy the JSON array or download it as a file. It runs entirely in your browser, so your data — which might be customer records or exports — is never uploaded.',
    howTo: [
      { step: '1', title: 'Paste your CSV', body: 'Paste the CSV data with the first row as the column headers.' },
      { step: '2', title: 'Set options', body: 'Choose the delimiter (comma, semicolon, or tab) and whether numeric strings should become real numbers.' },
      { step: '3', title: 'Copy or download', body: 'Copy the resulting JSON array of objects, or download it as a .json file.' },
    ],
    useCases: [
      { title: 'Seeding databases', body: 'Turn a spreadsheet export into JSON to import into an app, database, or seed script.' },
      { title: 'API payloads', body: 'Convert tabular data into a JSON array of objects ready to send in a request.' },
      { title: 'Frontend data', body: 'Reshape spreadsheet data into JSON you can drop straight into JavaScript.' },
      { title: 'Config & fixtures', body: 'Convert a list maintained in a spreadsheet into JSON for tests or configuration.' },
      { title: 'Data migration', body: 'Move tabular exports from one system into another that expects JSON.' },
    ],
    faq: [
      { q: 'Does it handle commas inside quoted fields?', a: 'Yes. Fields wrapped in double quotes can contain commas, line breaks, and escaped quotes ("") — they are parsed correctly, not split naively.' },
      { q: 'Can I use a semicolon or tab delimiter?', a: 'Yes. Pick comma, semicolon, or tab from the delimiter option — useful for European CSVs and TSV files.' },
      { q: 'Does it convert numbers and booleans?', a: 'You can opt to turn numeric strings into real numbers; otherwise values are kept as strings to avoid surprises.' },
      { q: 'What becomes the JSON keys?', a: 'The first row is treated as headers, and each becomes a key in the objects generated for the remaining rows.' },
      { q: 'What if a row has missing or extra columns?', a: 'Rows are mapped against the headers; keep columns consistent for clean output, as ragged rows can produce missing or unexpected keys.' },
      { q: 'Is my data uploaded?', a: 'No. Parsing happens entirely in your browser, so the data never leaves your device.' },
      { q: 'Is there a size limit?', a: 'No fixed limit, though very large CSVs take longer to parse on your device.' },
      { q: 'Is it free?', a: 'Yes — convert any number of CSV files to JSON for free, with no account.' },
    ],
  },

  'color-converter': {
    why: 'The same colour is written three different ways depending on what you are doing. CSS and design handoffs use HEX (#6366f1); canvas and drawing APIs want RGB channels; and HSL is the one you reach for when you need to nudge a colour lighter, darker, or more saturated without guessing. Constantly translating between them in your head — or copying the wrong value from a design tool — wastes time and causes mismatched colours.\n\nThis converter takes a colour in any of those formats and shows all of them together with a live preview, so you always copy the correct value. Pick a colour from the swatch or type a HEX code, and read off the HEX, RGB, and HSL equivalents instantly. It runs entirely in your browser with no limits. Working in HSL in particular makes adjustments intuitive: change just the lightness number to build a tint or shade of the same hue.',
    howTo: [
      { step: '1', title: 'Pick or type a colour', body: 'Use the colour swatch, or type a HEX value like #6366f1 (or an RGB/HSL value).' },
      { step: '2', title: 'See every format', body: 'HEX, RGB, and HSL are shown together with a live preview so you can confirm the colour.' },
      { step: '3', title: 'Copy what you need', body: 'Click the copy icon next to the format your tool or code expects.' },
    ],
    useCases: [
      { title: 'CSS styling', body: 'Convert a designer’s HEX into HSL to fine-tune lightness and build consistent tints and shades.' },
      { title: 'Canvas & graphics', body: 'Get RGB channel values for drawing APIs and image work that need numeric components.' },
      { title: 'Design handoff', body: 'Translate a colour from a mockup into the exact format your codebase uses.' },
      { title: 'Brand consistency', body: 'Express a single brand colour across every format different tools require.' },
      { title: 'Accessibility tuning', body: 'Adjust lightness in HSL to push text/background contrast toward accessible levels.' },
    ],
    faq: [
      { q: 'Does it accept short HEX codes?', a: 'Yes. Three-digit shorthand like #63f is expanded to the full six-digit form automatically.' },
      { q: 'What do HSL’s three numbers mean?', a: 'Hue (0–360° around the colour wheel), Saturation (how vivid, 0–100%), and Lightness (how light/dark, 0–100%).' },
      { q: 'Why convert to HSL to adjust a colour?', a: 'Because you can change one number — usually lightness or saturation — to get a related shade, which is far harder to do directly in HEX or RGB.' },
      { q: 'Does it support alpha/opacity?', a: 'It focuses on solid colours (HEX, RGB, HSL). Add opacity separately in your CSS (e.g. rgba() or an alpha hex) if you need it.' },
      { q: 'Will HEX, RGB, and HSL match exactly?', a: 'They represent the same colour, with tiny rounding when converting to HSL’s percentages — visually identical.' },
      { q: 'Can I type an RGB or HSL value as input?', a: 'Yes — enter a value in any supported format and the others update to match.' },
      { q: 'Is it free and private?', a: 'Yes. It runs entirely in your browser with no limits and nothing uploaded.' },
      { q: 'Is there a sign-up?', a: 'No — just open it and use it.' },
    ],
  },

  'number-base-converter': {
    why: 'Binary, octal, decimal, and hexadecimal are just different ways of writing the same number, and low-level programming moves between them constantly — reading a hex memory address, setting binary bitmask flags, interpreting a byte value, or matching a colour channel. Converting in your head is slow and a single misplaced digit gives a silently wrong result, which is a nasty bug to chase.\n\nThis converter shows a value in all four bases at once: type into any field — binary, octal, decimal, or hex — and the other three update instantly. It uses JavaScript BigInt under the hood, so even very large values stay exact rather than losing precision the way ordinary numbers do beyond a certain size. Everything runs in your browser, and you can copy whichever representation you need with one click.',
    howTo: [
      { step: '1', title: 'Type in any base', body: 'Enter a value into the binary, octal, decimal, or hexadecimal field.' },
      { step: '2', title: 'See all bases', body: 'The other three fields update instantly with the equivalent value.' },
      { step: '3', title: 'Copy a value', body: 'Click the copy icon next to the base you need.' },
    ],
    useCases: [
      { title: 'Bitmasks & flags', body: 'Convert binary flag combinations to hex and decimal while writing or reading code.' },
      { title: 'Colour & byte work', body: 'Translate hex colour channels or byte values into decimal and binary.' },
      { title: 'Memory & addresses', body: 'Read hexadecimal addresses and offsets as decimal when debugging.' },
      { title: 'Networking', body: 'Convert values between bases when working with masks, ports, and protocol fields.' },
      { title: 'Learning CS', body: 'See exactly how one number is represented across number systems to understand place value.' },
    ],
    faq: [
      { q: 'How large a number can it handle?', a: 'It uses JavaScript BigInt, so it stays exact for numbers far beyond the usual 64-bit limit where normal numbers lose precision.' },
      { q: 'What do the bases mean?', a: 'Binary is base-2 (0–1), octal base-8 (0–7), decimal base-10, and hexadecimal base-16 (0–9, a–f). Each is a compact way of writing the same value.' },
      { q: 'Does it support negative numbers?', a: 'It is designed for non-negative whole numbers across the four bases.' },
      { q: 'Does it handle fractions or decimals points?', a: 'No — it converts whole numbers (integers) between bases.' },
      { q: 'Is hex case-sensitive?', a: 'No. You can enter hex digits in upper or lower case; a–f and A–F are treated the same.' },
      { q: 'Why use hex for bytes and colours?', a: 'Two hex digits map exactly to one byte (0–255), so hex is a tidy, readable shorthand for binary data and colour channels.' },
      { q: 'Is the conversion done online?', a: 'No. It runs entirely in your browser.' },
      { q: 'Is it free?', a: 'Yes — convert as many values as you like for free, with no sign-up.' },
    ],
  },

  // ─── More Image Tools ────────────────────────────────────────────────────────

  'image-to-pdf': {
    why: 'When you have several photos or phone scans to send — receipts for an expense claim, pages of a signed document, a set of work samples — firing them off as loose image files is messy. They open in a random order, clutter the recipient’s downloads, and look unprofessional. A single PDF keeps everything in order, in one tidy file that opens the same way on every device.\n\nThis tool combines JPG and PNG images into one PDF, with control over the page order and page size (fit-to-image, A4, or Letter). Add your images, arrange them, and create the document — each image becomes one page. It is built in your browser with pdf-lib, so your images never leave your device, which matters for receipts, IDs, and personal scans. No account, no watermark, no limit.',
    howTo: [
      { step: '1', title: 'Add your images', body: 'Click or drag JPG and PNG files into the upload area; add more at any time.' },
      { step: '2', title: 'Order and size', body: 'Use the arrows to reorder pages, and choose fit-to-image, A4, or Letter page size.' },
      { step: '3', title: 'Create the PDF', body: 'Click Create PDF to build and download the combined document.' },
    ],
    useCases: [
      { title: 'Receipts & expenses', body: 'Combine photographed receipts into one PDF for an expense claim or your records.' },
      { title: 'Scanned documents', body: 'Merge phone-scanned pages into a single, ordered, shareable PDF.' },
      { title: 'Applications & forms', body: 'Bundle photos of a signed form, ID, or supporting documents into one upload.' },
      { title: 'Portfolios', body: 'Package image-based work samples into one downloadable file to send.' },
      { title: 'Notes & whiteboards', body: 'Turn snapshots of notes or whiteboards into a tidy PDF to file or share.' },
    ],
    faq: [
      { q: 'Which image formats are supported?', a: 'JPG and PNG. Each image becomes one page in the resulting PDF.' },
      { q: 'Are my images uploaded?', a: 'No. The PDF is assembled in your browser with pdf-lib, so images never leave your device.' },
      { q: 'Can I set the page order?', a: 'Yes. Reorder the thumbnails with the arrows before creating the PDF.' },
      { q: 'Can I choose the page size?', a: 'Yes — fit-to-image keeps each image’s own dimensions, or pick A4 or Letter for standard pages.' },
      { q: 'How many images can I combine?', a: 'There is no fixed limit; large batches of high-resolution images simply take a little longer to process.' },
      { q: 'Will it reduce the image quality?', a: 'Images are embedded as-is; to shrink the final file, compress the images first or run the PDF through the Compress PDF tool.' },
      { q: 'Does it work on mobile?', a: 'Yes — add photos from your phone in any modern mobile browser and download the PDF back.' },
      { q: 'Is it free?', a: 'Yes — combine any number of images into PDFs for free, with no account and no watermark.' },
    ],
  },

  'image-cropper': {
    why: 'Most images need cropping before they are useful: a profile picture has to be a square, a video thumbnail wants 16:9, a social post has its own ratio, and a photo often has dead space or something you want to cut out. Get the ratio wrong and the platform crops it for you — usually badly, lopping off a face or key detail. Cropping deliberately to the exact region and shape you need avoids all of that.\n\nThis cropper gives you a draggable selection box with optional locked aspect ratios (1:1, 4:3, 16:9, 3:4, or free), and exports the result at the original full resolution rather than the smaller on-screen preview — so there is no quality loss. Upload an image, drag the selection, and download just the region you want as PNG or JPG. It all runs on a canvas in your browser, so the image is never uploaded. No account, no watermark.',
    howTo: [
      { step: '1', title: 'Upload an image', body: 'Click or drag an image into the upload area.' },
      { step: '2', title: 'Select the crop', body: 'Drag the selection box and its corner handles; lock a ratio like 1:1 or 16:9 if you need a fixed shape.' },
      { step: '3', title: 'Download', body: 'Choose PNG or JPG and download just the cropped region at full resolution.' },
    ],
    useCases: [
      { title: 'Profile pictures', body: 'Crop a clean square 1:1 avatar from any photo so platforms don’t mis-crop it.' },
      { title: 'Thumbnails', body: 'Cut a precise 16:9 thumbnail for videos or article headers.' },
      { title: 'Social posts', body: 'Trim an image to the exact region and ratio a platform expects.' },
      { title: 'Tidying photos', body: 'Remove dead space, distractions, or edges to focus on the subject.' },
      { title: 'Listings & products', body: 'Crop product shots to a consistent shape for a clean grid.' },
    ],
    faq: [
      { q: 'Does cropping reduce quality?', a: 'No. The crop is taken from the original full-resolution image, not the smaller on-screen preview.' },
      { q: 'Can I crop to a fixed shape?', a: 'Yes. Lock 1:1, 4:3, 16:9, or 3:4, or use Free mode for any rectangle.' },
      { q: 'Is my image uploaded?', a: 'No. Cropping happens on a canvas in your browser, so the image never leaves your device.' },
      { q: 'Can I export as PNG or JPG?', a: 'Yes — choose either on download; pick PNG to preserve transparency, JPG for a smaller photo file.' },
      { q: 'Does it change the file size?', a: 'Cropping removes pixels outside the selection, so the output is usually smaller than the original.' },
      { q: 'Can I crop to an exact pixel size?', a: 'Use a locked ratio to control the shape; the export resolution follows the selected region of the source image.' },
      { q: 'Does it work on mobile?', a: 'Yes — crop on mobile or desktop in any modern browser.' },
      { q: 'Is it free?', a: 'Yes — crop as many images as you want for free, with no sign-up and no watermark.' },
    ],
  },

  // ─── More Text Tools ─────────────────────────────────────────────────────────

  'text-cleaner': {
    why: 'Text rarely arrives clean. Copy from a PDF and it breaks awkwardly mid-sentence; paste from an email and you get quote markers and stray indentation; grab content from a web page and it carries double spaces, blank lines, and invisible Unicode characters that quietly break search, imports, and formatting later. Fixing all of that by hand — or with a series of find-and-replace passes — is tedious and easy to do inconsistently.\n\nThis cleaner applies the fixes you choose in a single pass and updates live as you toggle them: collapse repeated spaces, strip blank lines, unwrap hard line breaks, remove special or non-printable characters, trim leading and trailing whitespace, and adjust case. It only touches formatting — your actual words are untouched — and everything runs in your browser, so the text is never uploaded. The result is tidy, predictable, paste-ready text. No limits, no sign-up.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Drop the messy text — from a PDF, email, or web page — into the input box.' },
      { step: '2', title: 'Choose clean-up rules', body: 'Toggle the fixes you need: collapse spaces, remove blank lines, unwrap line breaks, strip special characters, trim, or change case.' },
      { step: '3', title: 'Copy the result', body: 'The cleaned text updates live as you toggle options — copy it with one click.' },
    ],
    useCases: [
      { title: 'PDF copy-paste', body: 'Repair text pulled from a PDF that wraps and breaks awkwardly mid-sentence.' },
      { title: 'Email & web text', body: 'Strip quote markers, stray indentation, and formatting from forwarded emails or copied web content.' },
      { title: 'Data prep', body: 'Normalise whitespace and remove hidden characters before importing text into a spreadsheet or script.' },
      { title: 'Writing & publishing', body: 'Clean up a draft before pasting into a CMS so no invisible characters slip into the published page.' },
      { title: 'Developers', body: 'Sanitise pasted strings and config snippets that carry non-printable or zero-width characters.' },
    ],
    faq: [
      { q: 'What does "remove line breaks" do?', a: 'It joins the text into a single flowing paragraph by replacing line breaks with spaces — ideal for unwrapping hard-wrapped text from PDFs.' },
      { q: 'Will it change my words?', a: 'No. It only adjusts whitespace, blank lines, case, and non-printable characters based on the options you select — the words themselves are untouched.' },
      { q: 'What are invisible/non-printable characters?', a: 'Things like zero-width spaces, non-breaking spaces, and control characters that you cannot see but that can break search, sorting, and imports. The cleaner can strip them.' },
      { q: 'Can I collapse multiple spaces into one?', a: 'Yes. Toggle the collapse-spaces option to reduce runs of spaces (and often tabs) to a single space.' },
      { q: 'Does it remove blank lines?', a: 'Yes, optionally. You can strip empty lines to tighten up spacing between paragraphs.' },
      { q: 'Is my text uploaded?', a: 'No. All cleaning runs in your browser, so the text never leaves your device.' },
      { q: 'Is there a length limit?', a: 'No cap — clean any amount of text in one go.' },
      { q: 'Is it free?', a: 'Yes — clean as much text as you need for free, with no account.' },
    ],
  },

  'slug-generator': {
    why: 'The slug is the readable part of a URL — the "my-first-post" in /blog/my-first-post. A clean slug is easier to read, share, and remember, and search engines treat a tidy keyword-based URL as a small ranking and click signal. Generating one by hand means lowercasing everything, stripping punctuation, transliterating accents, and swapping spaces for hyphens consistently — fiddly to get right every time, and a single stray character or space can break a link.\n\nThis generator does all of that automatically. Type or paste a title and it returns a URL-safe slug instantly: lowercased (optionally), accents converted to plain letters (é → e), punctuation and symbols removed, and spaces replaced with your chosen separator. It runs entirely in your browser, so nothing is uploaded, and you can copy the result straight into your CMS, code, or file name. No account, no limits.',
    howTo: [
      { step: '1', title: 'Enter a title', body: 'Type or paste the title, heading, or phrase you want to convert.' },
      { step: '2', title: 'Set the style', body: 'Choose hyphen or underscore separators and whether to force lowercase.' },
      { step: '3', title: 'Copy the slug', body: 'The URL-safe slug updates instantly — copy it for your page, post, or file.' },
    ],
    useCases: [
      { title: 'Blog & CMS URLs', body: 'Generate the slug for a new article straight from its headline for a clean, SEO-friendly link.' },
      { title: 'File & folder names', body: 'Create safe, consistent names with no spaces or symbols that could break paths.' },
      { title: 'API & database keys', body: 'Turn human-friendly labels into readable identifiers and keys.' },
      { title: 'Anchor links', body: 'Produce stable in-page anchors (#section-name) from heading text.' },
      { title: 'Asset & image names', body: 'Standardise upload names so they’re tidy and URL-safe.' },
    ],
    faq: [
      { q: 'What makes a good slug?', a: 'Short, lowercase, keyword-relevant, hyphen-separated, and free of stop-word clutter — readable to a human and a search engine alike.' },
      { q: 'Does it handle accented characters?', a: 'Yes. Accents are transliterated (é becomes e) and other special characters are removed.' },
      { q: 'Hyphens or underscores for URLs?', a: 'Hyphens are recommended for web URLs — search engines treat them as word separators, whereas underscores are not. Use underscores mainly for code or file names.' },
      { q: 'Will it remove punctuation and symbols?', a: 'Yes — punctuation, symbols, and repeated separators are stripped to leave a clean slug.' },
      { q: 'Does it shorten long titles?', a: 'It converts whatever you give it; trim very long titles to the key words yourself for the tidiest URL.' },
      { q: 'Is my text uploaded?', a: 'No. The slug is generated in your browser; nothing leaves your device.' },
      { q: 'Can I change a slug after publishing?', a: 'You can, but set up a redirect from the old URL to avoid broken links and lost SEO.' },
      { q: 'Is it free?', a: 'Yes — generate unlimited slugs for free, with no sign-up.' },
    ],
  },

  'tip-calculator': {
    why: 'The end of a meal out is a small maths test nobody enjoys: work out a fair tip on the total, then split everything between the table — and it gets messy fast with an odd number of people or when you want to round to something sensible. Doing it in your head is error-prone, and getting it wrong means someone quietly overpays or the tip comes up short.\n\nThis calculator handles both steps at once. Enter the bill, tap a tip preset (or set your own percentage), and choose how many people are paying; it shows the tip amount, the grand total, and exactly what each person owes — with their share of the tip included. Everything is calculated in your browser, nothing is saved, and there is no sign-up. It is just the fast, accurate way to settle the bill without the awkward huddle over a phone calculator.',
    howTo: [
      { step: '1', title: 'Enter the bill amount', body: 'Type the total bill before the tip.' },
      { step: '2', title: 'Choose a tip percentage', body: 'Tap a preset (commonly 10–25%) or enter your own custom percentage.' },
      { step: '3', title: 'Split between people', body: 'Set how many people are paying to see the per-person amount, the tip, and the total.' },
    ],
    useCases: [
      { title: 'Restaurants & bars', body: 'Calculate a fair tip and split the check with friends in seconds.' },
      { title: 'Group outings', body: 'Divide the total evenly so everyone pays the same, tip included.' },
      { title: 'Travel', body: 'Work out customary tips quickly when eating out somewhere with different tipping norms.' },
      { title: 'Deliveries & taxis', body: 'Add a quick percentage tip to a delivery or ride total.' },
      { title: 'Services', body: 'Calculate a tip for a haircut, spa, or other service where tipping is expected.' },
    ],
    faq: [
      { q: 'What is a standard tip percentage?', a: 'In the US, 15–20% is typical for table service. Norms vary by country and service, so use a preset or enter your local custom.' },
      { q: 'Does it split the tip too?', a: 'Yes. The per-person figure includes each person’s share of both the bill and the tip.' },
      { q: 'Is the tip on the pre-tax or post-tax amount?', a: 'It applies your tip percentage to the bill amount you enter — type the pre-tax total if you prefer to tip on that.' },
      { q: 'Can everyone pay a different share?', a: 'It splits the total evenly between the number of people you set; for uneven shares, calculate each portion separately.' },
      { q: 'Can I split between any number of people?', a: 'Yes — set any group size and it divides the total, handling awkward splits cleanly.' },
      { q: 'Does it round the per-person amount?', a: 'It shows the exact split; round up manually if you want to leave a little extra.' },
      { q: 'Is my data saved?', a: 'No. The bill split is worked out on your device, instantly.' },
      { q: 'Is it free?', a: 'Yes — split as many bills as you like for free, with no account needed.' },
    ],
  },

  'compound-interest-calculator': {
    why: 'Compound interest is the engine behind long-term saving and investing: you earn interest not just on your original deposit but on all the interest it has already earned, so the balance grows faster and faster over time. The effect is hard to picture in your head — the difference between a 5% and 7% return, or saving for 20 years versus 30, is far larger than it intuitively feels — which is exactly why seeing it projected makes the case for starting early so compelling.\n\nThis calculator projects that growth clearly. Enter a starting amount, an annual rate, a number of years, and any regular monthly contribution, choose how often interest compounds, and it shows your final balance and the total interest earned. It is built for understanding and goal-setting — comparing rates, terms, and contribution levels side by side. It runs in your browser with nothing stored, and it is an illustration only: it does not account for tax, fees, or inflation, so treat the figures as a model rather than a promise.',
    howTo: [
      { step: '1', title: 'Enter your starting amount', body: 'Type the initial principal you are saving or investing.' },
      { step: '2', title: 'Add rate, years, and contributions', body: 'Set the annual interest rate, the number of years, and any regular monthly contribution.' },
      { step: '3', title: 'Choose compounding frequency', body: 'Pick how often interest compounds (e.g. monthly or annually), then read the final balance and total interest earned.' },
    ],
    useCases: [
      { title: 'Retirement planning', body: 'Project how a pension or long-term investment could grow over decades of contributions.' },
      { title: 'Savings goals', body: 'See how regular monthly deposits build toward a target like a house deposit or fund.' },
      { title: 'Comparing accounts', body: 'Compare how different rates and compounding frequencies change the end result.' },
      { title: 'Teaching & learning', body: 'Show, with real numbers, why starting to save earlier beats saving more later.' },
      { title: 'Debt awareness', body: 'Understand how compounding also works against you on interest-bearing debt.' },
    ],
    faq: [
      { q: 'What is the difference between simple and compound interest?', a: 'Simple interest is earned only on the principal; compound interest is earned on the principal plus previously earned interest, so the balance grows faster over time.' },
      { q: 'How does compounding frequency affect the result?', a: 'More frequent compounding (e.g. monthly vs annually) earns slightly more, because interest is added — and starts earning — sooner.' },
      { q: 'Does it account for monthly contributions?', a: 'Yes. Regular monthly contributions are added and compounded alongside your starting balance.' },
      { q: 'Does it include tax, fees, or inflation?', a: 'No. It shows gross growth only. Real returns are reduced by tax and fees, and inflation lowers future purchasing power.' },
      { q: 'What rate should I use?', a: 'Use a realistic expected annual return for your account or investment; try a range to see best- and worst-case projections.' },
      { q: 'Why does the total grow so much in later years?', a: 'That is compounding: the bigger the balance, the more interest it earns each period, so growth accelerates toward the end of the term.' },
      { q: 'Is this financial advice?', a: 'No. It is an estimate for illustration only — consult a qualified adviser for decisions.' },
      { q: 'Is it free?', a: 'Yes — free, runs in your browser, no sign-up.' },
    ],
  },

  'date-duration-calculator': {
    why: 'Working out exactly how long is between two dates is deceptively hard to do by hand. Months have 28 to 31 days, leap years add a day, and "about three months" is not good enough when you are counting a notice period, a contract term, or the days until a deadline. Miscount by even a day and you can miss a cut-off or misstate a duration on a form.\n\nThis calculator gives you the precise gap between any two dates instantly: an exact breakdown in years, months, and days, plus the totals in days and weeks. Pick the start and end dates and read the result, with an option to include the end day for inclusive ranges. It uses real calendar dates, so leap years and varying month lengths are handled automatically, and everything is calculated in your browser with nothing stored. No sign-up, no limits.',
    howTo: [
      { step: '1', title: 'Pick a start date', body: 'Choose the first date with the date picker.' },
      { step: '2', title: 'Pick an end date', body: 'Choose the second date; it should be on or after the start date.' },
      { step: '3', title: 'Read the duration', body: 'See the breakdown in years, months, and days, plus total days and weeks — and toggle "include the end day" for inclusive ranges.' },
    ],
    useCases: [
      { title: 'Project timelines', body: 'Measure how long a project ran, or how many days remain until a deadline.' },
      { title: 'Notice & contracts', body: 'Count notice periods, probation/trial periods, and contract lengths exactly.' },
      { title: 'Countdowns', body: 'Work out how many days until a wedding, holiday, launch, or exam.' },
      { title: 'Billing & leave', body: 'Count billable days, rental periods, or days of annual leave between two dates.' },
      { title: 'Anniversaries & milestones', body: 'See how long it has been since a start date in days, weeks, months, and years.' },
    ],
    faq: [
      { q: 'Does it count leap years correctly?', a: 'Yes. The calculation uses real calendar dates, so February 29 and varying month lengths are handled automatically.' },
      { q: 'What does “include the end day” do?', a: 'It adds one day so both the start and end dates are counted — useful for inclusive ranges like rental or billing periods.' },
      { q: 'Is the years/months/days breakdown exact?', a: 'Yes — it counts full calendar months and the remaining days rather than averaging, so the breakdown is exact.' },
      { q: 'Why might the standalone “months” total look approximate?', a: 'The total-months figure is based on average month length for convenience; the years/months/days breakdown is the precise calendar value.' },
      { q: 'Can I measure to a future date?', a: 'Yes. Set a future end date to count down the days, weeks, and months remaining.' },
      { q: 'How is this different from the Age Calculator?', a: 'They share the same maths; the Age Calculator is framed around a birth date and next birthday, while this one measures any two dates.' },
      { q: 'Are my dates uploaded?', a: 'No. The day, week, and month counts are computed right in your browser.' },
      { q: 'Is it free?', a: 'Yes — calculate any number of date ranges for free, with no sign-up.' },
    ],
  },

  'css-gradient-generator': {
    why: 'CSS gradients make backgrounds, buttons, and cards look modern, but the syntax is fiddly to write blind — remembering the angle convention, the order of colour stops, and whether you want linear or radial means a lot of save-refresh-tweak cycles just to land on the look you want. It is the classic case where seeing the result as you adjust it is far faster than editing numbers in a stylesheet.\n\nThis generator gives you that live preview. Choose linear or radial, pick your start and end colours, drag the angle, and watch the gradient update in real time — then copy production-ready CSS that works across all modern browsers. Everything happens in your browser, nothing is uploaded, and the output is standard `linear-gradient()` / `radial-gradient()` you can paste straight into your stylesheet. It is the quick way to experiment with colour combinations before committing.',
    howTo: [
      { step: '1', title: 'Choose the gradient type', body: 'Switch between a linear or radial gradient depending on the effect you want.' },
      { step: '2', title: 'Pick your colours', body: 'Set the start and end colours with the colour pickers and watch the live preview.' },
      { step: '3', title: 'Adjust and copy', body: 'For linear gradients, drag the angle slider, then copy the generated CSS.' },
    ],
    useCases: [
      { title: 'Website backgrounds', body: 'Create eye-catching hero and section backgrounds without writing gradient syntax by hand.' },
      { title: 'Buttons & cards', body: 'Add subtle gradient fills that give UI components depth and polish.' },
      { title: 'Design prototyping', body: 'Try colour combinations quickly and visually before committing them to your stylesheet.' },
      { title: 'Overlays', body: 'Build gradient overlays to keep text readable over images.' },
      { title: 'Brand theming', body: 'Generate on-brand gradients to reuse consistently across a site or app.' },
    ],
    faq: [
      { q: 'Does the CSS work in all browsers?', a: 'Yes. Standard linear-gradient and radial-gradient are supported across all modern browsers.' },
      { q: 'What does the angle control?', a: 'For linear gradients it sets the direction the colours blend — e.g. 90deg goes left-to-right, 180deg top-to-bottom.' },
      { q: 'What is the difference between linear and radial?', a: 'Linear blends colours along a straight line/angle; radial blends outward from a centre point in a circle or ellipse.' },
      { q: 'Can I use more than two colours?', a: 'This generator uses two stops; you can add extra comma-separated colour stops manually in the copied CSS.' },
      { q: 'Can I add transparency?', a: 'Yes — use an rgba() or alpha-hex colour as a stop to fade a gradient to transparent, handy for overlays.' },
      { q: 'Will it slow down my page?', a: 'No. CSS gradients are rendered by the browser and are far lighter than using a background image.' },
      { q: 'Is my data uploaded?', a: 'No. Everything runs in your browser.' },
      { q: 'Is it free?', a: 'Yes — build and copy as many gradients as you want for free, with no account.' },
    ],
  },

  'box-shadow-generator': {
    why: 'A good shadow is what makes a card lift off the page or a button feel pressable, but CSS box-shadow packs five things into one property — horizontal and vertical offset, blur, spread, colour, and an optional inset flag — and tuning them blind by editing numbers and refreshing is slow and frustrating. Small changes to blur and spread make a big visual difference, so seeing them live is the only sane way to dial in the exact depth and softness you want.\n\nThis generator gives you sliders for every value with a real-time preview, then hands you ready-to-use CSS. Adjust the offsets, blur, and spread, set the shadow colour and strength, toggle inset for a recessed look, and copy the result. It runs entirely in your browser. Because box-shadow accepts multiple comma-separated shadows, you can also stack several generated values for layered, more realistic depth.',
    howTo: [
      { step: '1', title: 'Adjust the sliders', body: 'Set the horizontal and vertical offset, blur, and spread while watching the live preview.' },
      { step: '2', title: 'Set colour and strength', body: 'Pick the shadow colour and how strong (opaque) it appears.' },
      { step: '3', title: 'Copy the CSS', body: 'Toggle inset if you want a recessed effect, then copy the ready-to-use box-shadow code.' },
    ],
    useCases: [
      { title: 'Cards & panels', body: 'Give cards a subtle lift off the background with a soft, natural shadow.' },
      { title: 'Buttons', body: 'Add depth, hover lift, or pressed (inset) effects to buttons.' },
      { title: 'Design systems', body: 'Generate a consistent set of elevation shadows for a component library.' },
      { title: 'Inputs & wells', body: 'Use inset shadows to make fields and wells look recessed.' },
      { title: 'Prototyping', body: 'Experiment with depth quickly before settling on a value in your stylesheet.' },
    ],
    faq: [
      { q: 'What do the offset values do?', a: 'They move the shadow horizontally and vertically. A small positive vertical offset with some blur gives the natural "light from above" look.' },
      { q: 'What does spread do?', a: 'Spread grows or shrinks the shadow before blur is applied — positive makes it larger, negative pulls it tighter.' },
      { q: 'What is an inset shadow?', a: 'Inset draws the shadow inside the element rather than outside, useful for pressed buttons and recessed inputs.' },
      { q: 'How do I get a soft, subtle shadow?', a: 'Use a small offset, a larger blur, little or no spread, and a low-opacity colour — harsh shadows usually come from too little blur or too much opacity.' },
      { q: 'Can I stack multiple shadows?', a: 'Yes. box-shadow accepts comma-separated values, so layer several (e.g. a tight one plus a soft wide one) for more realistic depth.' },
      { q: 'Does box-shadow affect layout?', a: 'No. Shadows are painted outside the box model and do not take up space or push other elements.' },
      { q: 'Is my data uploaded?', a: 'No. Everything runs in your browser.' },
      { q: 'Is it free?', a: 'Yes — generate unlimited box-shadow code for free, with no sign-up.' },
    ],
  },

  'find-and-replace': {
    why: 'Swapping every occurrence of a word or phrase across a block of text is the kind of job that is quick in theory and painful in practice — scroll through manually and you will inevitably miss one, or accidentally change something you meant to keep. It comes up constantly: renaming a term throughout a draft, standardising values in exported data, or updating a URL across a snippet of code.\n\nThis tool replaces them all in one pass and tells you how many it changed, so you have confidence nothing was missed. Paste your text, enter what to find and what to replace it with, and optionally turn on case-insensitive matching or full regular expressions for pattern-based replacements. Everything runs in your browser, so the text never leaves your device, and your input stays put until you copy the result — making it easy to tweak the terms and run it again.',
    howTo: [
      { step: '1', title: 'Paste your text', body: 'Add the text you want to edit into the input box.' },
      { step: '2', title: 'Enter find and replace terms', body: 'Type what to look for and what to replace it with.' },
      { step: '3', title: 'Choose options and copy', body: 'Optionally enable case-insensitive matching or regular expressions, then copy the result.' },
    ],
    useCases: [
      { title: 'Editing drafts', body: 'Rename a character, product, or recurring term consistently throughout a document.' },
      { title: 'Cleaning data', body: 'Standardise values or strip unwanted strings out of exported text.' },
      { title: 'Code snippets', body: 'Rename a variable or update a URL across a block of code in one go.' },
      { title: 'Formatting fixes', body: 'Swap straight quotes for curly ones, or replace double spaces, across a whole document.' },
      { title: 'Bulk edits', body: 'Apply the same change to a long list or transcript without manual scrolling.' },
    ],
    faq: [
      { q: 'Does it replace every occurrence?', a: 'Yes — all matches are replaced at once, and the tool reports how many changes it made.' },
      { q: 'Does it support regular expressions?', a: 'Yes. Enable the regex option to match patterns, use groups, and reference captures in the replacement.' },
      { q: 'Can I make it case-insensitive?', a: 'Yes. Tick the case-insensitive box to match regardless of capitalisation.' },
      { q: 'Can I replace across line breaks?', a: 'With plain text it works line by line; with regex you can use multiline patterns to span lines.' },
      { q: 'Will it change my original until I copy?', a: 'Your input stays as you typed it; the result is shown separately, so you can adjust the terms and re-run.' },
      { q: 'How do I delete a phrase entirely?', a: 'Put the phrase in "find" and leave "replace" empty to remove every occurrence.' },
      { q: 'Is my text uploaded?', a: 'No. All find-and-replace happens locally in your browser.' },
      { q: 'Is it free?', a: 'Yes — run as many find-and-replace passes as you need for free, with no account.' },
    ],
  },

  'remove-duplicate-lines': {
    why: 'Lists that come out of spreadsheets, logs, exports, or scraped pages are full of repeats, and duplicates cause real problems downstream — double-emailing the same contact, skewed keyword counts, or noise that hides the entries that actually matter. Spotting and deleting repeats by hand in a long list is slow and unreliable.\n\nThis tool keeps only the unique lines in one click, and tells you how many duplicates it removed so you can see the effect. Paste your list (one item per line), and optionally ignore case, trim surrounding whitespace, and drop blank lines so near-identical entries are correctly treated as the same. It preserves the original order — keeping the first occurrence of each line — and runs entirely in your browser, so even large or sensitive lists never leave your device.',
    howTo: [
      { step: '1', title: 'Paste your list', body: 'Add your list with one item per line.' },
      { step: '2', title: 'Set the options', body: 'Choose whether to ignore case, trim whitespace, and remove blank lines so duplicates are caught reliably.' },
      { step: '3', title: 'Copy the unique lines', body: 'See how many duplicates were removed, then copy the cleaned list.' },
    ],
    useCases: [
      { title: 'Email & contact lists', body: 'Strip repeated addresses before importing into a mailing or CRM tool.' },
      { title: 'Keyword research', body: 'De-duplicate keyword and tag lists for SEO and ad campaigns.' },
      { title: 'Log analysis', body: 'Collapse repeated log lines to surface the unique events.' },
      { title: 'Data cleanup', body: 'Tidy a column pasted from a spreadsheet before further processing.' },
      { title: 'Inventory & catalogues', body: 'Remove duplicate SKUs, tags, or entries from a combined list.' },
    ],
    faq: [
      { q: 'Does it keep the original order?', a: 'Yes. The first occurrence of each line stays in its original position; later repeats are removed.' },
      { q: 'Can it ignore case and spaces?', a: 'Yes. Enable “ignore case” and “trim whitespace” so entries that differ only by capitalisation or padding are treated as duplicates.' },
      { q: 'Does it count how many it removed?', a: 'Yes — it reports the number of duplicates removed so you can confirm the result.' },
      { q: 'What counts as a duplicate?', a: 'An exact line match by default; with the options on, lines that match after trimming and case-folding also count.' },
      { q: 'Can it also remove blank lines?', a: 'Yes — toggle the remove-blank-lines option to drop empty lines as well.' },
      { q: 'Is there a size limit?', a: 'It handles large lists comfortably since everything runs locally in your browser.' },
      { q: 'Is my data uploaded?', a: 'No. The whole process happens in your browser, so nothing leaves your device.' },
      { q: 'Is it free?', a: 'Yes — de-duplicate lists of any length for free, with no sign-up.' },
    ],
  },

  'sort-text-lines': {
    why: 'Putting a list in order — alphabetical or numerical — is a tiny task that desktop apps make weirdly awkward, and spreadsheets are overkill for a quick column of text. Worse, naive sorting often gets numbers wrong, ordering them as text so that "10" comes before "2". An ordered list is far easier to scan, compare, and de-duplicate.\n\nThis tool sorts your lines instantly with the options you choose: alphabetical or true numerical order, ascending or descending, case-sensitive or not, and with an option to remove duplicates in the same pass. Paste a list with one item per line, pick how to sort, and copy the result. Everything runs in your browser, so even large or private lists stay on your device. No account, no limits.',
    howTo: [
      { step: '1', title: 'Paste your list', body: 'Enter your list with one item per line.' },
      { step: '2', title: 'Choose how to sort', body: 'Pick alphabetical or numerical sorting, and ascending or descending order.' },
      { step: '3', title: 'Copy the result', body: 'Optionally ignore case or remove duplicates, then copy the sorted list.' },
    ],
    useCases: [
      { title: 'Organising lists', body: 'Alphabetise names, tags, glossaries, or to-do items in seconds.' },
      { title: 'Data prep', body: 'Sort a column or keyword list before importing or comparing it.' },
      { title: 'Numbers', body: 'Order a list of numbers by value, not as text, so 2 comes before 10.' },
      { title: 'Reference lists', body: 'Sort a bibliography, contact list, or inventory for easy scanning.' },
      { title: 'Comparing lists', body: 'Sort two lists the same way so a diff highlights real differences, not order.' },
    ],
    faq: [
      { q: 'Does numerical sorting work correctly?', a: 'Yes. Choose “numerical” to sort by value so 2 comes before 10, rather than the text-order 1, 10, 2.' },
      { q: 'Can I sort descending (Z–A or high–low)?', a: 'Yes — pick descending order for reverse alphabetical or largest-first numerical sorting.' },
      { q: 'Is it case-sensitive?', a: 'Your choice — enable “ignore case” for case-insensitive alphabetical sorting.' },
      { q: 'Can I remove duplicates while sorting?', a: 'Yes. Tick “remove duplicates” to keep only unique lines in the sorted output.' },
      { q: 'Does it keep blank lines?', a: 'Blank lines are grouped during sorting; pair this with the Remove Duplicate Lines tool if you want them stripped.' },
      { q: 'What about lines mixing text and numbers?', a: 'Use alphabetical for general text; numerical works best when every line is a number.' },
      { q: 'Is my data uploaded?', a: 'No. Sorting runs entirely in your browser.' },
      { q: 'Is it free?', a: 'Yes — sort as many lines as you like for free, with no account.' },
    ],
  },

  'background-changer': {
    why: 'Changing the background behind a person or product normally means painstaking manual masking in Photoshop — tracing around hair and edges with a lasso or pen tool — which is slow and hard to do cleanly. Yet a consistent background is what separates an amateur snapshot from a professional headshot or a sellable product photo, and many applications (IDs, passports, listings) actually require a specific plain background.\n\nThis tool automates the whole thing: it detects and cuts out the subject with AI, then drops in the new background you choose — a solid colour or your own image — and gives you a downloadable PNG. The background-removal step uses the same AI as our Background Remover, so the image is sent securely over HTTPS to the remove.bg API for that part; the new background is then composited and the final image produced on your device, with nothing stored afterward. No manual masking, no software to install.',
    howTo: [
      { step: '1', title: 'Upload your photo', body: 'Choose the image whose background you want to change — the subject is detected and cut out automatically.' },
      { step: '2', title: 'Pick a new background', body: 'Select a solid colour, or upload your own background image to place behind the subject.' },
      { step: '3', title: 'Download', body: 'Preview the composited result and download the finished image as a PNG.' },
    ],
    useCases: [
      { title: 'Profile pictures', body: 'Put a clean, consistent background behind a headshot for LinkedIn, a CV, or a team page.' },
      { title: 'Product photos', body: 'Place products on a plain white or branded background for stores and marketplaces.' },
      { title: 'ID & passport photos', body: 'Swap a busy background for the solid colour an application or document requires.' },
      { title: 'Marketing & social', body: 'Drop a subject onto a branded or themed backdrop for posts and ads.' },
      { title: 'Consistency', body: 'Give a set of photos the same background so a gallery or grid looks uniform.' },
    ],
    faq: [
      { q: 'How is the background removed?', a: 'The subject is detected and cut out by AI, then composited onto your chosen background. The cutout step uses the remove.bg API; the new background is applied on your device.' },
      { q: 'Is my image uploaded?', a: 'For the AI cutout, the image is sent securely over HTTPS to the remove.bg API; it is not stored by UtilKit, and the final composite is produced locally.' },
      { q: 'How accurate is the cutout?', a: 'Very accurate for people and products with clear edges, including hair. Subjects that blend into the original background may need a small touch-up.' },
      { q: 'Can I use my own background image?', a: 'Yes — upload any image to use as the new background, or pick a solid colour.' },
      { q: 'What format do I download?', a: 'A PNG, which keeps the edges of the subject crisp against the new background.' },
      { q: 'What formats can I upload?', a: 'Standard JPG and PNG photos work best.' },
      { q: 'How is this different from the Background Remover?', a: 'The Background Remover gives you a transparent cutout; this tool goes a step further and drops the subject onto a new colour or image.' },
      { q: 'Is it free?', a: 'Yes — change as many photo backgrounds as you like for free, with no watermark on the result.' },
    ],
  },
}
