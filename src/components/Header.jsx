import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CONTACT, NAV_LINKS } from '../data/company'
import Logo from './Logo'
import Icon from './Icon'

const hashLink = (id) => ({ pathname: '/', hash: `#${id}` })

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav link for the section in the middle of the viewport.
  useEffect(() => {
    if (pathname !== '/' || typeof IntersectionObserver === 'undefined') {
      setActive('')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.dataset.nav)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-nav]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container header__bar">
        <Link to="/" className="brand" onClick={close} aria-label="MSA Transportation Inc — home">
          <Logo size={44} />
          <span className="brand__text">
            <strong>MSA Transportation</strong>
            <em>Truckload Carrier</em>
          </span>
        </Link>

        <nav className="header__nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.id} to={hashLink(l.id)} className={active === l.id ? 'is-active' : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <a href={`tel:${CONTACT.phoneHref}`} className="header__phone" aria-label={`Call ${CONTACT.phone}`}>
            <Icon name="phone" size={18} />
            <span>{CONTACT.phone}</span>
          </a>
          <Link to={hashLink('quote')} className="btn btn--primary btn--sm header__cta">
            Get a Quote
          </Link>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="sheet" aria-hidden={!open} inert={!open}>
        <nav className="sheet__nav container" aria-label="Mobile">
          <ul>
            {NAV_LINKS.map((l, i) => (
              <li key={l.id} style={{ '--i': i }}>
                <Link to={hashLink(l.id)} onClick={close} className={active === l.id ? 'is-active' : undefined}>
                  <span className="sheet__num">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="sheet__foot" style={{ '--i': NAV_LINKS.length }}>
            <Link to={hashLink('quote')} onClick={close} className="btn btn--primary btn--lg btn--block">
              Get a Quote <Icon name="arrow" size={18} />
            </Link>
            <Link to={hashLink('apply')} onClick={close} className="btn btn--ghost btn--lg btn--block">
              Apply as a Driver
            </Link>
            <a href={`tel:${CONTACT.phoneHref}`} className="sheet__call">
              <Icon name="phone" size={20} />
              <span>
                <small>Call dispatch</small>
                {CONTACT.phone}
              </span>
            </a>
            <p className="sheet__auth">{CONTACT.dot} · {CONTACT.mc}</p>
          </div>
        </nav>
      </div>
    </header>
  )
}
