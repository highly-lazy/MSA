import { CONTACT } from '../data/company'

const ITEMS = [
  CONTACT.dot,
  CONTACT.mc,
  'Licensed & insured',
  'Dry van',
  'Refrigerated',
  'Power only',
  'Dedicated lanes',
  'Interstate truckload',
  'Jamison, PA',
  `Since ${CONTACT.founded}`,
]

// Continuous credentials ticker. Duplicated once so the loop is seamless;
// the copy is hidden from assistive tech.
export default function TrustStrip() {
  return (
    <section id="trust" className="strip" aria-label="Company credentials">
      <div className="strip__track">
        {[0, 1].map((n) => (
          <ul key={n} className="strip__row" aria-hidden={n === 1}>
            {ITEMS.map((t) => (
              <li key={t}>
                <span className="strip__dot" />
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
