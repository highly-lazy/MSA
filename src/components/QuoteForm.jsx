import { useState } from 'react'
import { CONTACT } from '../constants'

const initial = { name: '', company: '', phone: '', email: '', origin: '', destination: '', freight: '', date: '' }

export default function QuoteForm() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div id="quote" className="form-panel">
      {submitted ? (
        <p className="form-success">
          Thanks{form.name ? `, ${form.name}` : ''} — we&rsquo;ve got your lane details.
          Dispatch will follow up with a rate shortly. For anything urgent, call{' '}
          <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Request a rate quote</h3>
          <p className="form-panel__lede">Tell us the lane and load — dispatch will get back to you with pricing.</p>

          <div className="form-row">
            <label>
              Full name
              <input type="text" required value={form.name} onChange={update('name')} placeholder="Jane Doe" />
            </label>
            <label>
              Company
              <input type="text" value={form.company} onChange={update('company')} placeholder="Acme Foods Inc." />
            </label>
          </div>
          <div className="form-row">
            <label>
              Phone
              <input type="tel" required value={form.phone} onChange={update('phone')} placeholder="(555) 123-4567" />
            </label>
            <label>
              Email
              <input type="email" required value={form.email} onChange={update('email')} placeholder="jane@company.com" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Pickup location
              <input type="text" required value={form.origin} onChange={update('origin')} placeholder="City, State" />
            </label>
            <label>
              Delivery location
              <input type="text" required value={form.destination} onChange={update('destination')} placeholder="City, State" />
            </label>
          </div>
          <div className="form-row">
            <label>
              Freight type & weight
              <input type="text" value={form.freight} onChange={update('freight')} placeholder="Palletized freight, 20,000 lbs" />
            </label>
            <label>
              Pickup date
              <input type="date" value={form.date} onChange={update('date')} />
            </label>
          </div>
          <button type="submit" className="btn btn--primary btn--block">Send Quote Request</button>
        </form>
      )}
    </div>
  )
}
