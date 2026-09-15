export default function RouteDivider({ flip = false }) {
  return (
    <div className={`route-divider${flip ? ' flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none">
        <line x1="0" y1="12" x2="1200" y2="12" />
      </svg>
    </div>
  )
}
