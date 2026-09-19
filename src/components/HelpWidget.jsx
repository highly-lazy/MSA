import { useEffect, useState } from 'react'
import { CONTACT } from '../data/company'
import submitForm from '../lib/submitForm'
import Icon from './Icon'

// Desktop-only "call me back" prompt that appears after the first screen of scrolling.
// (On phones the sticky MobileBar covers the same need.)
export default function HelpWidget() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('idle')
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('msa-help-dismissed') === '1') {
        setDismissed(true)
        return
      }
    } catch {
      // storage unavailable — fall through and show the widget
    }
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Step aside once the visitor reaches the quote form — it does the same job.
  useEffect(() => {
    const quote = document.getElementById('quote')
    if (!quote || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting || e.boundingClientRect.top < 0), { threshold: 0 })
    io.observe(quote)
    return () => io.disconnect()
  }, [])

  const close = () => {
    setVisible(false)
    setDismissed(true)
    try {
      sessionStorage.setItem('msa-help-dismissed', '1')
    } catch {
      // nothing to persist
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitForm({ subject: 'Callback request', fields: { Phone: phone } })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (dismissed) return null

  return (
    <aside className={`help${visible && !atEnd ? ' is-visible' : ''}`} aria-label="Request a call back">
      <button type="button" className="help__close" aria-label="Dismiss" onClick={close}>
        <Icon name="close" size={16} />
      </button>
      {status === 'sent' || status === 'mailto' ? (
        <p className="help__sent">
          Thanks — we&rsquo;ll be in touch. Need us now? Call <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>.
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <h4>Talk to dispatch</h4>
          <p>Leave your number and we&rsquo;ll call you back.</p>
          <div className="help__row">
            <input type="tel" required inputMode="tel" autoComplete="tel" placeholder="(___) ___-____" value={phone} onChange={(e) => setPhone(e.target.value)} aria-label="Your phone number" />
            <button type="submit" className="btn btn--primary btn--sm" disabled={status === 'sending'}>Call me</button>
          </div>
          {status === 'error' && <p className="form__error" role="alert">Couldn&rsquo;t send — call {CONTACT.phone}.</p>}
        </form>
      )}
    </aside>
  )
}
