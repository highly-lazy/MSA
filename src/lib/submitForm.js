import { CONTACT } from '../data/company'

// Delivers a form submission.
//
// 1. If VITE_FORM_ENDPOINT is set (Formspree, Netlify, your own API…), the data
//    is POSTed there as JSON.
// 2. Otherwise it falls back to opening the visitor's email app with the
//    details pre-filled, so a request is never silently dropped.
//
// Resolves to { mode: 'sent' | 'mailto' }; rejects if the endpoint fails.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

export default async function submitForm({ subject, to = CONTACT.email, fields }) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...fields }),
    })
    if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`)
    return { mode: 'sent' }
  }

  const body = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { mode: 'mailto' }
}
