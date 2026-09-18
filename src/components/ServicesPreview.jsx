import { Link } from 'react-router-dom'
import { SERVICES } from '../content'

export default function ServicesPreview() {
  return (
    <section id="services" className="section section--textured">
      <div className="route-lines route-lines--dark" />
      <div className="container">
        <p className="eyebrow-line">What we haul</p>
        <h2>Dry van and reefer, handled right</h2>
        <p className="section__lede">
          One standard on every load: on-time pickup, careful handling and
          clear communication from dispatch to delivery.
        </p>

        <div className="services__grid">
          {SERVICES.map((s) => (
            <Link key={s.slug} to="/services" className="service-card service-card--link">
              <span className="service-card__icon" style={{ '--accent': s.accent }}>{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <span className="service-card__more">Learn more <span>&rarr;</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
