import { useState } from 'react'
import { CONTACT } from '../constants'

const initial = { name: '', phone: '', email: '', track: 'Company Driver', experience: '' }

export default function ApplicationForm() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div id="apply" className="form-panel">
      {submitted ? (
        <p className="form-success">
          Thanks{form.name ? `, ${form.name}` : ''} — we&rsquo;ve got your application.
          Our recruiting team will call you at {form.phone || 'the number you provided'} shortly.
          You can also reach us directly at{' '}
          <a href={`mailto:${CONTACT.recruiting}`}>{CONTACT.recruiting}</a>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Apply in under a minute</h3>
          <p className="form-panel__lede">Company drivers &amp; owner operators — tell us a bit about yourself.</p>

          <div className="form-row">
            <label>
              Full name
              <input type="text" required value={form.name} onChange={update('name')} placeholder="John Smith" />
            </label>
            <label>
              Phone number
              <input type="tel" required value={form.phone} onChange={update('phone')} placeholder="(555) 123-4567" />
            </label>
          </div>
          <label>
            Email
            <input type="email" value={form.email} onChange={update('email')} placeholder="john@email.com" />
          </label>
          <label>
            I&rsquo;m interested in
            <select value={form.track} onChange={update('track')}>
              <option>Company Driver</option>
              <option>Owner Operator</option>
            </select>
          </label>
          <label>
            CDL class &amp; experience
            <textarea rows="3" value={form.experience} onChange={update('experience')} placeholder="Class A, 3 years OTR experience..." />
          </label>
          <button type="submit" className="btn btn--primary btn--block">Submit Application</button>
        </form>
      )}
    </div>
  )
}
