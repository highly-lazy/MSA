import { Link } from 'react-router-dom'
import Icon from './Icon'

// Banner at the top of every inner page. `photo` is optional.
export default function PageHero({ crumb, title, lede, photo, photoAlt = '', photoPos, children }) {
  return (
    <section className={`page-hero${photo ? ' has-photo' : ''}`} aria-labelledby="page-title">
      {photo && (
        <div className="page-hero__media">
          <img src={photo} alt={photoAlt} style={photoPos ? { objectPosition: photoPos } : undefined} fetchPriority="high" decoding="async" />
        </div>
      )}
      <div className="container page-hero__inner">
        <div className="page-hero__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="arrow" size={14} />
            <span aria-current="page">{crumb}</span>
          </nav>
          <h1 id="page-title">
            <span>{title[0]}</span>
            {title[1] && <span className="display__accent">{title[1]}</span>}
          </h1>
        </div>
        <div className="page-hero__side">
          <p className="page-hero__lede">{lede}</p>
          {children && <div className="page-hero__actions">{children}</div>}
        </div>
      </div>
      <div className="tape" aria-hidden="true" />
    </section>
  )
}
