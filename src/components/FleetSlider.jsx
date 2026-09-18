import Reveal from './Reveal'
import { IMAGES } from '../constants'

const SLIDES = [
  { img: IMAGES.trailer, tag: 'Equipment', title: 'Dry Van Trailers' },
  { img: IMAGES.services, tag: 'On the Road', title: 'Reefer & Dry Van Freight' },
  { img: IMAGES.dock, tag: 'Operations', title: 'Loading & Dispatch' },
  { img: IMAGES.driver, tag: 'Our Team', title: 'Professional Drivers' },
  { img: IMAGES.maintenance, tag: 'Equipment', title: 'Fleet Maintenance' },
  { img: IMAGES.hero, tag: 'Coverage', title: 'Interstate Lanes' },
]

export default function FleetSlider() {
  const slides = [...SLIDES, ...SLIDES]

  return (
    <section className="section fleet-slider">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow-line eyebrow-line--light">Our fleet in motion</p>
          <h2>Dry van &amp; reefer, on the road every day</h2>
        </Reveal>
      </div>

      <div className="fleet-slider__track-wrap">
        <div className="fleet-slider__track">
          {slides.map((s, i) => (
            <div className="fleet-card" key={`${s.title}-${i}`}>
              <img src={s.img} alt={s.title} loading="lazy" />
              <span className="fleet-card__scrim" aria-hidden="true" />
              <span className="fleet-card__tag">{s.tag}</span>
              <span className="fleet-card__label">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
