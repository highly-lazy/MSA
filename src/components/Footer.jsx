import { Link } from 'react-router-dom'
import { CONTACT, NAV_LINKS, SOCIAL, mailto, sectionLink } from '../data/company'
import { SERVICES } from '../data/operations'
import Logo from './Logo'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="tape" aria-hidden="true" />
      <div className="footer__cta">
        <div className="container footer__cta-inner">
          <h2>
            <span>Let&rsquo;s move</span>
            <span className="display__accent">freight.</span>
          </h2>
          <div className="footer__cta-actions">
            <Link to={sectionLink('quote')} className="btn btn--primary btn--lg">
              Get a quote <Icon name="arrow" size={18} />
            </Link>
            <Link to={sectionLink('apply')} className="btn btn--ghost btn--lg">
              Apply as a driver
            </Link>
            <a href={mailto()} className="footer__cta-mail">{CONTACT.email}</a>
          </div>
        </div>
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand" aria-label="MSA Transportation Inc — home">
            <Logo size={52} />
            <span className="brand__text">
              <strong>MSA Transportation Inc</strong>
              <em>Delivering Excellence. Driving Trust.</em>
            </span>
          </Link>
          <p>
            Dry van, reefer and power-only truckload carrier based in Jamison, Pennsylvania — professional
            drivers, well-maintained equipment and a dispatch team that answers the phone.
          </p>
          {SOCIAL.length > 0 && (
            <ul className="footer__social" aria-label="Social media">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer navigation">
          <h3>Navigate</h3>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.id}><Link to={sectionLink(l.id)}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>Services</h3>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.id}><Link to={sectionLink('services')}>{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Driver resources</h3>
          <ul>
            <li><Link to={sectionLink('apply')}>Apply now</Link></li>
            <li><Link to={sectionLink('drivers')}>Requirements</Link></li>
            <li><Link to={{ pathname: '/drivers', hash: '#faq' }}>Driver FAQ</Link></li>
            <li><a href={mailto({ to: CONTACT.recruiting, subject: 'Driver inquiry' })}>Contact recruiting</a></li>
          </ul>
        </div>

        <address>
          <h3>Contact</h3>
          <ul>
            <li><a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a></li>
            <li><a href={mailto()}>{CONTACT.email}</a></li>
            <li>
              <a href={CONTACT.mapDirectionsUrl} target="_blank" rel="noreferrer">
                {CONTACT.street}<br />{CONTACT.city}, {CONTACT.state} {CONTACT.zip}
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} MSA Transportation Inc. All rights reserved.</p>
        <p className="footer__auth">{CONTACT.dot} · {CONTACT.mc}</p>
        <ul>
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </footer>
  )
}
