import { useState } from 'react'
import Reveal from './Reveal'
import Icon from './Icon'

// Fast lane to a quote: three fields here, the rest on the full form.
// The values are handed to <QuoteForm /> through a window event, then we scroll to it.
export default function QuickQuote() {
  const [v, setV] = useState({ origin: '', destination: '', phone: '' })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('msa:prefill', { detail: v }))
    const form = document.getElementById('quote-form')
    form?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => form?.querySelector('input')?.focus({ preventScroll: true }), 700)
  }

  return (
    <section className="quick" aria-labelledby="quick-title">
      <div className="container">
        <Reveal className="quick__card">
          <div className="quick__copy">
            <h2 id="quick-title">Need a rate?</h2>
            <p>Start with the lane. We&rsquo;ll take it from there.</p>
          </div>
          <form className="quick__form" onSubmit={onSubmit}>
            <label>
              <span>Pickup</span>
              <input required value={v.origin} onChange={set('origin')} placeholder="City, State" autoComplete="off" />
            </label>
            <span className="quick__arrow" aria-hidden="true"><Icon name="arrow" size={20} /></span>
            <label>
              <span>Delivery</span>
              <input required value={v.destination} onChange={set('destination')} placeholder="City, State" autoComplete="off" />
            </label>
            <label>
              <span>Phone</span>
              <input required type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} placeholder="(555) 123-4567" />
            </label>
            <button type="submit" className="btn btn--primary btn--lg">
              Get quote <Icon name="arrow" size={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
