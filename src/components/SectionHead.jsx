import Reveal from './Reveal'

// Shared section heading: eyebrow, big display title (array = separate lines), lede.
export default function SectionHead({ eyebrow, title, lede, align = 'left', tone = 'dark', id }) {
  const lines = Array.isArray(title) ? title : [title]
  return (
    <Reveal className={`section-head section-head--${align} section-head--${tone}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>
        {lines.map((line, i) => (
          <span key={i} className="section-head__line">
            {line}
          </span>
        ))}
      </h2>
      {lede && <p className="lede">{lede}</p>}
    </Reveal>
  )
}
