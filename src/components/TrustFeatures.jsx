import Reveal from './Reveal'
import { TRUST_FEATURES } from '../content'

export default function TrustFeatures() {
  return (
    <section className="section trust-features section--light">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <p className="eyebrow-line" style={{ margin: '0 auto 14px' }}>Every load, every time</p>
          <h2>Everything it takes to move freight safely</h2>
        </Reveal>

        <div className="trust-features__grid">
          {TRUST_FEATURES.map((f, i) => (
            <Reveal key={f.title} className="trust-card" delay={i * 80}>
              <span className="trust-card__icon" style={{ '--accent': f.accent }}>{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
