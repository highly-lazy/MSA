import { useState } from 'react'
import { CONTACT } from '../constants'

const initial = { origin: '', destination: '', freight: '', phone: '' }

const PIN_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const TRAILER_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 10h3.2l2.8 3v3h-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="7" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const PHONE_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0-.6.4-1 1-1h2.6c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .9-.4 1.2L7.6 10.5a13 13 0 0 0 5.9 5.9l1.3-1.4c.3-.3.8-.5 1.2-.4l3.2.8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C9.9 20 4 14.1 4 6.6V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

export default function HeroQuoteCard() {
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="hero-quote">
      {submitted ? (
        <div className="hero-quote__success">
          <h3>Got it{form.origin && form.destination ? ` — ${form.origin} to ${form.destination}` : ''}</h3>
          <p>Dispatch will call you back shortly with a rate. Need it faster?</p>
          <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--primary btn--block">Call {CONTACT.phone}</a>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="hero-quote__eyebrow">Get a free rate quote</p>
          <h3>or call now <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a></h3>

          <label className="hero-quote__field">
            <span className="hero-quote__icon">{PIN_ICON}</span>
            <input
              type="text"
              required
              placeholder="Pickup (City or ZIP)"
              value={form.origin}
              onChange={update('origin')}
            />
          </label>

          <label className="hero-quote__field">
            <span className="hero-quote__icon">{PIN_ICON}</span>
            <input
              type="text"
              required
              placeholder="Delivery (City or ZIP)"
              value={form.destination}
              onChange={update('destination')}
            />
          </label>

          <label className="hero-quote__field">
            <span className="hero-quote__icon">{TRAILER_ICON}</span>
            <select required value={form.freight} onChange={update('freight')}>
              <option value="" disabled>Trailer type</option>
              <option value="dry-van">Dry Van</option>
              <option value="reefer">Refrigerated (Reefer)</option>
              <option value="either">Either / Not sure</option>
            </select>
          </label>

          <label className="hero-quote__field">
            <span className="hero-quote__icon">{PHONE_ICON}</span>
            <input
              type="tel"
              required
              placeholder="Phone number"
              value={form.phone}
              onChange={update('phone')}
            />
          </label>

          <button type="submit" className="btn btn--accent btn--block btn--arrow">
            Get My Rate <span className="btn__arrow">&rarr;</span>
          </button>
        </form>
      )}
    </div>
  )
}
