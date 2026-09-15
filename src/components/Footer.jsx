import { Link } from 'react-router-dom'
import { CONTACT, NAV_LINKS } from '../constants'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__map-block">
        <div className="site-footer__map">
          <iframe
            title="MSA Transportation Inc location"
            src={CONTACT.mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="site-footer__map-copy">
          <p className="eyebrow-line eyebrow-line--light">Find us</p>
          <h3>{CONTACT.address}</h3>
          <p>Dispatch and recruiting run out of our Jamison, PA home base.</p>
          <a href={CONTACT.mapDirectionsUrl} target="_blank" rel="noreferrer" className="btn btn--outline btn--arrow">
            Get Directions <span className="btn__arrow">&rarr;</span>
          </a>
        </div>
      </div>

      <div className="container site-footer__grid">
        <div>
          <div className="footer-brand">
            <Logo size={52} />
            <span className="brand__text brand__text--footer">
              <strong>MSA Transportation Inc</strong>
              <em>Delivering Excellence. Driving Trust.</em>
            </span>
          </div>
          <p className="site-footer__desc">
            Dry van &amp; reefer trucking, based in Jamison, PA and
            running interstate lanes across the country.
          </p>
        </div>

        <div>
          <h4>Navigate</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href={`tel:${CONTACT.phoneHref}`}>{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li>{CONTACT.address}</li>
          </ul>
        </div>

        <div>
          <h4>Authority</h4>
          <ul>
            <li>{CONTACT.mc}</li>
            <li>{CONTACT.dot}</li>
            <li>Operating since {CONTACT.founded}</li>
          </ul>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>&copy; {new Date().getFullYear()} MSA Transportation Inc. All rights reserved.</span>
        <span className="site-footer__credit">
          Hero truck photography: MotoJo321 (CC BY-SA 4.0), via Wikimedia Commons
        </span>
      </div>
    </footer>
  )
}
