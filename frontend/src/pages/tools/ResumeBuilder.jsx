import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Plus, Trash2, Printer } from 'lucide-react'

const ABOUT = [
  'Resume Builder generates a clean, professional resume from a structured form. Fill in your details and print it as a PDF using your browser.',
  'Sections include contact info, professional summary, work experience, education, and skills — the core of any strong resume.',
  'No account, no watermark, no subscription. Your data never leaves your browser.',
]

let nextId = 10
function uid() { return nextId++ }

export default function ResumeBuilder() {
  const [contact, setContact] = useState({ name: 'Jane Smith', email: 'jane@email.com', phone: '+1 (555) 000-0000', location: 'New York, NY', linkedin: 'linkedin.com/in/janesmith' })
  const [summary, setSummary] = useState('Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and great user experiences.')
  const [experience, setExperience] = useState([
    { id: uid(), title: 'Senior Frontend Developer', company: 'Acme Corp', dates: '2021 – Present', bullets: 'Led redesign of the main product dashboard, improving NPS by 18%.\nMentored 3 junior developers and ran weekly code reviews.' },
  ])
  const [education, setEducation] = useState([
    { id: uid(), degree: 'B.Sc. Computer Science', school: 'State University', dates: '2015 – 2019', detail: 'GPA 3.8 / 4.0 · Dean\'s List' },
  ])
  const [skills, setSkills] = useState('React, TypeScript, Node.js, PostgreSQL, AWS, Docker, Git')

  function addExp() { setExperience(prev => [...prev, { id: uid(), title: '', company: '', dates: '', bullets: '' }]) }
  function updExp(id, f, v) { setExperience(prev => prev.map(e => e.id === id ? { ...e, [f]: v } : e)) }
  function delExp(id) { setExperience(prev => prev.filter(e => e.id !== id)) }

  function addEdu() { setEducation(prev => [...prev, { id: uid(), degree: '', school: '', dates: '', detail: '' }]) }
  function updEdu(id, f, v) { setEducation(prev => prev.map(e => e.id === id ? { ...e, [f]: v } : e)) }
  function delEdu(id) { setEducation(prev => prev.filter(e => e.id !== id)) }

  function printResume() {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial, sans-serif; font-size: 13px; color: #1a1a1a; padding: 36px 48px; max-width: 900px; margin: 0 auto; }
  h1 { font-size: 26px; font-weight: 800; letter-spacing: -0.5px; }
  .contact { color: #4b5563; font-size: 12px; margin-top: 4px; }
  .contact span { margin-right: 16px; }
  .section { margin-top: 20px; }
  .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-bottom: 10px; }
  .exp-header, .edu-header { display: flex; justify-content: space-between; align-items: flex-start; }
  .exp-header strong, .edu-header strong { font-size: 14px; }
  .exp-header span, .edu-header span { color: #6b7280; font-size: 12px; white-space: nowrap; margin-left: 16px; }
  .company, .school { color: #4b5563; font-size: 13px; margin-top: 1px; }
  ul { margin: 6px 0 14px 18px; }
  ul li { line-height: 1.6; }
  .skills { line-height: 1.8; }
  .summary { line-height: 1.7; color: #374151; }
</style>
</head>
<body>
<h1>${contact.name}</h1>
<div class="contact">
  ${contact.email ? `<span>${contact.email}</span>` : ''}
  ${contact.phone ? `<span>${contact.phone}</span>` : ''}
  ${contact.location ? `<span>${contact.location}</span>` : ''}
  ${contact.linkedin ? `<span>${contact.linkedin}</span>` : ''}
</div>
${summary ? `<div class="section"><div class="section-title">Summary</div><p class="summary">${summary}</p></div>` : ''}
${experience.length ? `
<div class="section">
  <div class="section-title">Experience</div>
  ${experience.map(e => `
    <div style="margin-bottom:14px">
      <div class="exp-header"><strong>${e.title}</strong><span>${e.dates}</span></div>
      <div class="company">${e.company}</div>
      ${e.bullets ? `<ul>${e.bullets.split('\n').filter(l => l.trim()).map(l => `<li>${l.trim()}</li>`).join('')}</ul>` : ''}
    </div>
  `).join('')}
</div>` : ''}
${education.length ? `
<div class="section">
  <div class="section-title">Education</div>
  ${education.map(e => `
    <div style="margin-bottom:10px">
      <div class="edu-header"><strong>${e.degree}</strong><span>${e.dates}</span></div>
      <div class="school">${e.school}</div>
      ${e.detail ? `<div style="color:#6b7280;font-size:12px;margin-top:2px">${e.detail}</div>` : ''}
    </div>
  `).join('')}
</div>` : ''}
${skills ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills}</div></div>` : ''}
</body></html>`

    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    setTimeout(() => w.print(), 300)
  }

  return (
    <ToolLayout title="Resume Builder" description="Build a professional resume in minutes. Fill in the form and print or save as PDF." toolId="resume-builder" about={ABOUT}>
      <div className="space-y-4">
        <div className="card">
          <p className="text-xs text-zinc-500 font-medium mb-3">Contact Information</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={contact.name} onChange={e => setContact(p => ({ ...p, name: e.target.value }))} placeholder="Full Name" className="input text-sm" />
            <input value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} placeholder="Email" className="input text-sm" />
            <input value={contact.phone} onChange={e => setContact(p => ({ ...p, phone: e.target.value }))} placeholder="Phone" className="input text-sm" />
            <input value={contact.location} onChange={e => setContact(p => ({ ...p, location: e.target.value }))} placeholder="Location (City, State)" className="input text-sm" />
            <input value={contact.linkedin} onChange={e => setContact(p => ({ ...p, linkedin: e.target.value }))} placeholder="LinkedIn / Website" className="input text-sm sm:col-span-2" />
          </div>
        </div>
        <div className="card">
          <p className="text-xs text-zinc-500 font-medium mb-2">Professional Summary</p>
          <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className="textarea text-sm w-full" />
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-500 font-medium">Work Experience</p>
            <button className="btn-ghost text-xs" onClick={addExp}><Plus size={12} /> Add</button>
          </div>
          {experience.map((e, idx) => (
            <div key={e.id} className={`space-y-2 ${idx < experience.length - 1 ? 'mb-5 pb-5 border-b border-zinc-800' : ''}`}>
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={e.title} onChange={ev => updExp(e.id, 'title', ev.target.value)} placeholder="Job Title" className="input text-sm" />
                <input value={e.company} onChange={ev => updExp(e.id, 'company', ev.target.value)} placeholder="Company" className="input text-sm" />
                <input value={e.dates} onChange={ev => updExp(e.id, 'dates', ev.target.value)} placeholder="Dates (e.g. 2020 – 2023)" className="input text-sm sm:col-span-2" />
              </div>
              <div className="relative">
                <textarea value={e.bullets} onChange={ev => updExp(e.id, 'bullets', ev.target.value)} placeholder="Key achievements, one per line…" rows={3} className="textarea text-sm w-full" />
                {experience.length > 1 && <button onClick={() => delExp(e.id)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400"><Trash2 size={13} /></button>}
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-500 font-medium">Education</p>
            <button className="btn-ghost text-xs" onClick={addEdu}><Plus size={12} /> Add</button>
          </div>
          {education.map((e, idx) => (
            <div key={e.id} className={`space-y-2 ${idx < education.length - 1 ? 'mb-4 pb-4 border-b border-zinc-800' : ''}`}>
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={e.degree} onChange={ev => updEdu(e.id, 'degree', ev.target.value)} placeholder="Degree / Certificate" className="input text-sm" />
                <input value={e.school} onChange={ev => updEdu(e.id, 'school', ev.target.value)} placeholder="School / Institution" className="input text-sm" />
                <input value={e.dates} onChange={ev => updEdu(e.id, 'dates', ev.target.value)} placeholder="Dates" className="input text-sm" />
                <div className="relative">
                  <input value={e.detail} onChange={ev => updEdu(e.id, 'detail', ev.target.value)} placeholder="GPA, honours, etc. (optional)" className="input text-sm w-full" />
                  {education.length > 1 && <button onClick={() => delEdu(e.id)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-red-400"><Trash2 size={13} /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <p className="text-xs text-zinc-500 font-medium mb-2">Skills</p>
          <textarea value={skills} onChange={e => setSkills(e.target.value)} placeholder="Comma-separated skills or write freely…" rows={2} className="textarea text-sm w-full" />
        </div>
        <button className="btn-primary" onClick={printResume}>
          <Printer size={15} /> Print / Save as PDF
        </button>
      </div>
    </ToolLayout>
  )
}
