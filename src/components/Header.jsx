import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CONTACT, NAV_LINKS } from '../constants'
import Logo from './Logo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
      <div className="site-header__bar">
        <span>{CONTACT.mc} · {CONTACT.dot}</span>
        <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
      </div>
      <div className="site-header__main">
        <Link to="/" className="brand" onClick={close}>
          <Logo size={58} />
          <span className="brand__text">
            <strong>MSA Transportation</strong>
            <em>Dry Van &amp; Reefer Trucking</em>
          </span>
        </Link>

        <nav className="main-nav-inline">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'is-active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/services" className="btn btn--primary nav-cta">Get a Quote</Link>
          <button
            type="button"
            className={`menu-trigger${open ? ' is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-trigger__box">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-trigger__label">{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <div className={`nav-overlay${open ? ' is-open' : ''}`}>
        <div className="route-lines" />
        <nav className="nav-overlay__panel container">
          <ul className="nav-overlay__links">
            {NAV_LINKS.map((link, i) => (
              <li key={link.to} style={{ transitionDelay: `${i * 60}ms` }}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => (isActive ? 'is-active' : undefined)}
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-overlay__side">
            <div className="nav-overlay__ctas">
              <Link to="/services" className="btn btn--primary btn--arrow" onClick={close}>
                Get a Quote <span className="btn__arrow">&rarr;</span>
              </Link>
              <Link to="/careers" className="btn btn--outline btn--arrow" onClick={close}>
                Join Our Team <span className="btn__arrow">&rarr;</span>
              </Link>
            </div>
            <div className="nav-overlay__info">
              <span className="nav-overlay__info-label">Call dispatch</span>
              <a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a>
              <span className="nav-overlay__info-label">Authority</span>
              <span>{CONTACT.mc} &middot; {CONTACT.dot}</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
