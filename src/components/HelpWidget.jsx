import { useEffect, useState } from 'react'
import { CONTACT } from '../constants'

const PHONE_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M4 5c0-.6.4-1 1-1h2.6c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .9-.4 1.2L7.6 10.5a13 13 0 0 0 5.9 5.9l1.3-1.4c.3-.3.8-.5 1.2-.4l3.2.8c.5.1.8.5.8 1V19c0 .6-.4 1-1 1h-1C9.9 20 4 14.1 4 6.6V5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
)

export default function HelpWidget() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let wasDismissed = false
    try {
      wasDismissed = sessionStorage.getItem('msa-help-dismissed') === '1'
    } catch {
      wasDismissed = false
    }
    if (wasDismissed) {
      setDismissed(true)
      return
    }
    const onScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setVisible(false)
    setDismissed(true)
    try {
      sessionStorage.setItem('msa-help-dismissed', '1')
    } catch {
      // storage unavailable — nothing to persist
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (dismissed) return null

  return (
    <div className={`help-widget${visible ? ' is-visible' : ''}`} role="complementary" aria-label="Get help now">
      <button type="button" className="help-widget__close" aria-label="Dismiss" onClick={close}>&times;</button>

      {sent ? (
        <p className="help-widget__sent">
          Thanks — dispatch will call you back shortly. Or call{' '}
          <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a> now.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h4>We&rsquo;re here to help 24/7</h4>
          <p>Share your phone number&hellip;</p>
          <div className="help-widget__row">
            <span className="help-widget__icon">{PHONE_ICON}</span>
            <input
              type="tel"
              required
              placeholder="(___) ___-____"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn--primary btn--block">Get help</button>
        </form>
      )}
    </div>
  )
}
