import { useState } from 'react'

const initial = { name: '', email: '', company: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="form-panel">
      {submitted ? (
        <p className="form-success">
          Thanks for reaching out{form.name ? `, ${form.name}` : ''} — a
          member of our team will get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Send us a message</h3>
          <p className="form-panel__lede">General questions, feedback or anything else — we read every message.</p>

          <div className="form-row">
            <label>
              Name
              <input type="text" required value={form.name} onChange={update('name')} placeholder="Jane Doe" />
            </label>
            <label>
              Company
              <input type="text" value={form.company} onChange={update('company')} placeholder="Acme Foods Inc." />
            </label>
          </div>
          <label>
            Email
            <input type="email" required value={form.email} onChange={update('email')} placeholder="jane@company.com" />
          </label>
          <label>
            How can we help?
            <textarea rows="4" required value={form.message} onChange={update('message')} placeholder="Your message..." />
          </label>
          <button type="submit" className="btn btn--primary btn--block">Send Message</button>
        </form>
      )}
    </div>
  )
}
