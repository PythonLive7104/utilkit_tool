import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Plus, Trash2, Printer } from 'lucide-react'

const ABOUT = [
  'Invoice Generator lets you create professional invoices with your business details, client info, line items, taxes, and notes.',
  'Fill in the form, see a live preview, and print or save as PDF using your browser\'s built-in print dialog.',
  'No account, no watermark, no subscription — completely free and private.',
]

const INIT_ITEMS = [{ id: 1, description: 'Web Design', qty: 1, price: 1500 }]
let nextItemId = 2

export default function InvoiceGenerator() {
  const today = new Date().toISOString().split('T')[0]
  const [from, setFrom] = useState({ name: 'Your Business Name', address: '123 Main St, City', email: 'you@business.com' })
  const [to, setTo] = useState({ name: 'Client Name', address: '456 Client Ave, City', email: 'client@company.com' })
  const [invoiceNum, setInvoiceNum] = useState('INV-001')
  const [date, setDate] = useState(today)
  const [dueDate, setDueDate] = useState('')
  const [items, setItems] = useState(INIT_ITEMS)
  const [tax, setTax] = useState(0)
  const [notes, setNotes] = useState('')
  const [currency, setCurrency] = useState('$')

  function addItem() {
    setItems(prev => [...prev, { id: nextItemId++, description: '', qty: 1, price: 0 }])
  }
  function updateItem(id, field, val) {
    setItems(prev => prev.map(it => it.id === id ? { ...it, [field]: val } : it))
  }
  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id))
  }

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0), 0)
  const taxAmt = subtotal * (parseFloat(tax) || 0) / 100
  const total = subtotal + taxAmt

  function fmt(n) { return `${currency}${n.toFixed(2)}` }

  function printInvoice() {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; color: #1a1a1a; font-size: 14px; padding: 40px; }
  h1 { font-size: 28px; font-weight: 800; color: #4f46e5; margin-bottom: 6px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
  .meta { text-align: right; }
  .meta table { margin-left: auto; }
  .meta td { padding: 2px 0 2px 16px; }
  .meta td:first-child { color: #6b7280; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 36px; }
  .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; margin-bottom: 6px; }
  .party p { line-height: 1.6; }
  table.items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  table.items th { border-bottom: 2px solid #e5e7eb; padding: 10px 8px; text-align: left; font-size: 11px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em; }
  table.items td { padding: 12px 8px; border-bottom: 1px solid #f3f4f6; }
  .text-right { text-align: right; }
  .totals { margin-left: auto; width: 240px; margin-bottom: 32px; }
  .totals tr td { padding: 6px 0; }
  .totals tr td:last-child { text-align: right; }
  .total-row td { font-weight: 700; font-size: 16px; border-top: 2px solid #e5e7eb; padding-top: 10px; }
  .notes { background: #f9fafb; padding: 16px; border-radius: 8px; }
  .notes .label { margin-bottom: 8px; }
</style>
</head>
<body>
<div class="header">
  <div>
    <h1>INVOICE</h1>
    <p><strong>${from.name}</strong></p>
    <p style="white-space:pre-line;color:#6b7280">${from.address}</p>
    <p style="color:#6b7280">${from.email}</p>
  </div>
  <div class="meta">
    <table>
      <tr><td>Invoice #</td><td><strong>${invoiceNum}</strong></td></tr>
      <tr><td>Date</td><td>${date}</td></tr>
      ${dueDate ? `<tr><td>Due Date</td><td>${dueDate}</td></tr>` : ''}
    </table>
  </div>
</div>
<div class="parties">
  <div class="party"><div class="label">From</div><p><strong>${from.name}</strong></p><p style="white-space:pre-line">${from.address}</p><p>${from.email}</p></div>
  <div class="party"><div class="label">Bill To</div><p><strong>${to.name}</strong></p><p style="white-space:pre-line">${to.address}</p><p>${to.email}</p></div>
</div>
<table class="items">
  <thead><tr><th>Description</th><th class="text-right">Qty</th><th class="text-right">Unit Price</th><th class="text-right">Amount</th></tr></thead>
  <tbody>
    ${items.map(it => `<tr><td>${it.description}</td><td class="text-right">${it.qty}</td><td class="text-right">${fmt(parseFloat(it.price) || 0)}</td><td class="text-right">${fmt((parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0))}</td></tr>`).join('')}
  </tbody>
</table>
<table class="totals">
  <tr><td>Subtotal</td><td>${fmt(subtotal)}</td></tr>
  ${tax > 0 ? `<tr><td>Tax (${tax}%)</td><td>${fmt(taxAmt)}</td></tr>` : ''}
  <tr class="total-row"><td>Total</td><td>${fmt(total)}</td></tr>
</table>
${notes ? `<div class="notes"><div class="label">Notes</div><p>${notes}</p></div>` : ''}
</body></html>`

    const w = window.open('', '_blank')
    w.document.write(html)
    w.document.close()
    setTimeout(() => w.print(), 300)
  }

  return (
    <ToolLayout title="Invoice Generator" description="Create professional invoices with line items and tax. Print or save as PDF for free." toolId="invoice-generator" about={ABOUT}>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="card">
            <p className="text-xs text-zinc-500 font-medium mb-3">Your Business</p>
            <div className="space-y-2">
              <input value={from.name} onChange={e => setFrom(p => ({ ...p, name: e.target.value }))} placeholder="Business name" className="input w-full text-sm" />
              <input value={from.address} onChange={e => setFrom(p => ({ ...p, address: e.target.value }))} placeholder="Address" className="input w-full text-sm" />
              <input value={from.email} onChange={e => setFrom(p => ({ ...p, email: e.target.value }))} placeholder="Email" className="input w-full text-sm" />
            </div>
          </div>
          <div className="card">
            <p className="text-xs text-zinc-500 font-medium mb-3">Bill To</p>
            <div className="space-y-2">
              <input value={to.name} onChange={e => setTo(p => ({ ...p, name: e.target.value }))} placeholder="Client name" className="input w-full text-sm" />
              <input value={to.address} onChange={e => setTo(p => ({ ...p, address: e.target.value }))} placeholder="Address" className="input w-full text-sm" />
              <input value={to.email} onChange={e => setTo(p => ({ ...p, email: e.target.value }))} placeholder="Email" className="input w-full text-sm" />
            </div>
          </div>
          <div className="card">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Invoice #</label>
                <input value={invoiceNum} onChange={e => setInvoiceNum(e.target.value)} className="input w-full text-sm" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Currency</label>
                <select value={currency} onChange={e => setCurrency(e.target.value)} className="input w-full text-sm">
                  {['$', '€', '£', '₦', '¥', '₹'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Invoice Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input w-full text-sm" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Due Date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input w-full text-sm" />
              </div>
            </div>
            <p className="text-xs text-zinc-500 font-medium mb-2">Line Items</p>
            <div className="space-y-2">
              {items.map(it => (
                <div key={it.id} className="flex gap-2 items-center">
                  <input value={it.description} onChange={e => updateItem(it.id, 'description', e.target.value)} placeholder="Description" className="input flex-1 text-sm min-w-0" />
                  <input type="number" min={0} value={it.qty} onChange={e => updateItem(it.id, 'qty', e.target.value)} className="input w-16 text-sm text-center" title="Qty" />
                  <input type="number" min={0} value={it.price} onChange={e => updateItem(it.id, 'price', e.target.value)} className="input w-24 text-sm text-right" title="Price" />
                  {items.length > 1 && <button onClick={() => removeItem(it.id)} className="text-zinc-600 hover:text-red-400"><Trash2 size={14} /></button>}
                </div>
              ))}
              <button className="btn-ghost text-xs" onClick={addItem}><Plus size={12} /> Add Item</button>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-800">
              <label className="text-xs text-zinc-500">Tax %</label>
              <input type="number" min={0} max={100} value={tax} onChange={e => setTax(e.target.value)} className="input w-20 text-sm" />
              <div className="ml-auto text-right">
                <div className="text-xs text-zinc-500">Subtotal: {fmt(subtotal)}</div>
                {tax > 0 && <div className="text-xs text-zinc-500">Tax: {fmt(taxAmt)}</div>}
                <div className="text-base font-bold text-zinc-100">Total: {fmt(total)}</div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">Notes / Payment Terms</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Payment due within 30 days. Thank you for your business!" rows={3} className="textarea text-sm" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-zinc-500">Preview</label>
            <button className="btn-primary text-sm" onClick={printInvoice}><Printer size={14} /> Print / Save PDF</button>
          </div>
          <div className="rounded-xl border border-zinc-700 bg-white text-zinc-900 p-6 text-xs leading-relaxed overflow-auto max-h-[600px]">
            <div className="text-2xl font-extrabold text-indigo-600 mb-1">INVOICE</div>
            <div className="flex justify-between mb-6">
              <div><strong>{from.name}</strong><br /><span className="text-zinc-500">{from.address}</span><br /><span className="text-zinc-500">{from.email}</span></div>
              <div className="text-right text-zinc-600">
                <div><strong>Invoice #</strong> {invoiceNum}</div>
                <div><strong>Date:</strong> {date}</div>
                {dueDate && <div><strong>Due:</strong> {dueDate}</div>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div><div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">From</div><strong>{from.name}</strong><br />{from.address}<br />{from.email}</div>
              <div><div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">Bill To</div><strong>{to.name}</strong><br />{to.address}<br />{to.email}</div>
            </div>
            <table className="w-full mb-4 border-collapse">
              <thead><tr className="border-b-2 border-zinc-200 text-zinc-500"><th className="text-left pb-2">Description</th><th className="text-right pb-2">Qty</th><th className="text-right pb-2">Price</th><th className="text-right pb-2">Amount</th></tr></thead>
              <tbody>
                {items.map(it => (
                  <tr key={it.id} className="border-b border-zinc-100">
                    <td className="py-2">{it.description || '—'}</td>
                    <td className="text-right py-2">{it.qty}</td>
                    <td className="text-right py-2">{fmt(parseFloat(it.price) || 0)}</td>
                    <td className="text-right py-2">{fmt((parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="ml-auto w-40 text-right space-y-1">
              <div className="flex justify-between"><span className="text-zinc-500">Subtotal</span><span>{fmt(subtotal)}</span></div>
              {tax > 0 && <div className="flex justify-between"><span className="text-zinc-500">Tax ({tax}%)</span><span>{fmt(taxAmt)}</span></div>}
              <div className="flex justify-between font-bold text-sm border-t border-zinc-300 pt-1"><span>Total</span><span>{fmt(total)}</span></div>
            </div>
            {notes && <div className="mt-4 bg-zinc-50 rounded p-3 text-zinc-600">{notes}</div>}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
