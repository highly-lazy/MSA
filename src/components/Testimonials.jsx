import Reveal from './Reveal'
import { TESTIMONIALS } from '../content'

const STAR = (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 1.5l2.6 5.4 5.9.7-4.3 4.1 1.1 5.9L10 14.7l-5.3 2.9 1.1-5.9L1.5 7.6l5.9-.7L10 1.5Z" />
  </svg>
)

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section className="section testimonials section--light">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <p className="eyebrow-line" style={{ margin: '0 auto 14px' }}>What partners say</p>
          <h2>Feedback from brokers &amp; shippers</h2>
        </Reveal>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name + i} className="testimonial-card" delay={i * 90}>
              <span className="testimonial-card__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <span key={s}>{STAR}</span>
                ))}
              </span>
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-card__by">
                <span className="testimonial-card__avatar" aria-hidden="true">{initials(t.name)}</span>
                <span>
                  <span className="testimonial-card__name">{t.name}</span>
                  <span className="testimonial-card__role">{t.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
