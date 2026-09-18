import { TRUSTED_CATEGORIES } from '../content'

const BADGE_ICON = (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 3 20 7v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function TrustedBy() {
  const items = [...TRUSTED_CATEGORIES, ...TRUSTED_CATEGORIES]

  return (
    <div className="trusted-strip">
      <div className="container">
        <p className="trusted-strip__label">Trusted by shippers &amp; brokers who move</p>
      </div>
      <div className="trusted-strip__track-wrap">
        <div className="trusted-strip__track">
          {items.map((label, i) => (
            <span className="trusted-strip__item" key={`${label}-${i}`}>
              {BADGE_ICON}
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
