import { Link } from 'react-router-dom'

export default function CTABand() {
  return (
    <section className="cta-band">
      <div className="route-lines" />
      <div className="cta-band__grid">
        <Link to="/services" className="cta-band__card cta-band__card--quote">
          <span className="cta-band__icon">
            <svg viewBox="0 0 48 48" fill="none">
              <rect x="4" y="14" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="2.5" />
              <path d="M32 20h6l6 7v7h-12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
              <circle cx="14" cy="36" r="3.6" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="38" cy="36" r="3.6" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </span>
          <div className="cta-band__copy">
            <h3>Need freight moved?</h3>
            <p>Tell us the lane, the load and the date — we&rsquo;ll get back to you with a rate.</p>
            <span className="btn btn--white btn--arrow">Get a Quote <span className="btn__arrow">&rarr;</span></span>
          </div>
        </Link>
        <Link to="/careers" className="cta-band__card cta-band__card--drive">
          <span className="cta-band__icon">
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2.5" />
              <path d="M24 6v8M24 34v8M6 24h8M34 24h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <div className="cta-band__copy">
            <h3>Want to drive for us?</h3>
            <p>Company drivers and owner operators — consistent freight, respectful dispatch.</p>
            <span className="btn btn--outline btn--arrow">Join Our Team <span className="btn__arrow">&rarr;</span></span>
          </div>
        </Link>
      </div>
    </section>
  )
}
