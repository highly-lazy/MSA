// Original brand illustrations used where a real photo of MSA equipment is not
// available yet (dry van, reefer, lanes, highway). Crisp at any size, ~2 KB each.
// Drop real photos into IMAGES/data later and these become fallbacks.

function Wheels({ x }) {
  return (
    <g>
      {[0, 30].map((dx) => (
        <g key={dx}>
          <circle cx={x + dx} cy="186" r="15" className="art__tire" />
          <circle cx={x + dx} cy="186" r="7" className="art__hub" />
        </g>
      ))}
    </g>
  )
}

function Trailer({ reefer }) {
  const ribs = Array.from({ length: 13 }, (_, i) => 72 + i * 20)
  return (
    <>
      <ellipse cx="240" cy="204" rx="210" ry="9" className="art__shadow" />
      <rect x="30" y="46" width="356" height="126" rx="8" className="art__body" />
      {ribs.map((x) => (
        <line key={x} x1={x} y1="54" x2={x} y2="164" className="art__rib" />
      ))}
      <rect x="30" y="162" width="356" height="10" className="art__skirt" />
      {reefer && (
        <g>
          <rect x="386" y="58" width="26" height="70" rx="5" className="art__unit" />
          <line x1="392" y1="72" x2="406" y2="72" className="art__unit-line" />
          <line x1="392" y1="82" x2="406" y2="82" className="art__unit-line" />
          <line x1="392" y1="92" x2="406" y2="92" className="art__unit-line" />
          <g transform="translate(212 86)" className="art__flake">
            <path d="M0-24v48M-21-12l42 24M21-12l-42 24M-7-20 0-14l7-6M-7 20 0 14l7 6" />
          </g>
        </g>
      )}
      <g transform="translate(60 106)" className="art__wordmark">
        <text fontSize="30" letterSpacing="3">MSA</text>
      </g>
      <rect x="386" y="156" width="14" height="16" className="art__skirt" />
      <path d="M340 172v24h30v-24" className="art__gear" />
      <Wheels x={78} />
      <rect x="60" y="176" width="62" height="6" rx="3" className="art__skirt" />
    </>
  )
}

function Lane() {
  return (
    <>
      <path d="M90 150C90 60 390 60 390 150" className="art__route" />
      <path d="M390 150C390 210 90 210 90 150" className="art__route art__route--alt" />
      <circle r="6" className="art__pulse-dot">
        <animateMotion dur="5s" repeatCount="indefinite" path="M90 150C90 60 390 60 390 150" />
      </circle>
      <circle r="6" className="art__pulse-dot art__pulse-dot--alt">
        <animateMotion dur="5s" repeatCount="indefinite" path="M390 150C390 210 90 210 90 150" />
      </circle>
      {[90, 390].map((x, i) => (
        <g key={x} transform={`translate(${x} 150)`}>
          <circle r="22" className="art__node-ring" />
          <circle r="11" className="art__node" />
          <text y="5" textAnchor="middle" className="art__node-text">{i ? 'B' : 'A'}</text>
        </g>
      ))}
    </>
  )
}

function Road() {
  return (
    <>
      <path d="M60 220 210 40h60l150 180Z" className="art__asphalt" />
      <path d="M60 220 210 40M420 220 270 40" className="art__edge" />
      <path d="M240 46v170" className="art__dashes" />
      <g transform="translate(240 34)">
        <circle r="18" className="art__node-ring" />
        <path d="M0 8s-7-6-7-11.5a7 7 0 0 1 14 0C7 2 0 8 0 8Z" className="art__pin" />
      </g>
    </>
  )
}

export default function Art({ type, className = '' }) {
  return (
    <svg
      className={`art art--${type}${className ? ' ' + className : ''}`}
      viewBox="0 0 480 240"
      role="img"
      aria-label={
        { dry: 'Illustration of a 53-foot dry van trailer', reefer: 'Illustration of a 53-foot reefer trailer', lane: 'Illustration of a repeating dedicated lane', road: 'Illustration of an interstate highway' }[type]
      }
    >
      {type === 'dry' && <Trailer />}
      {type === 'reefer' && <Trailer reefer />}
      {type === 'lane' && <Lane />}
      {type === 'road' && <Road />}
    </svg>
  )
}
