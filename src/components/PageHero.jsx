import { Link } from 'react-router-dom'

export default function PageHero({ crumb, eyebrow, title, lede, image, alt }) {
  return (
    <section className="page-hero">
      <div className="page-hero__media">
        <img src={image} alt={alt} loading="eager" />
        <div className="page-hero__scrim" />
        <div className="route-lines" />
      </div>
      <div className="container page-hero__content">
        <p className="page-hero__crumb">
          <Link to="/">Home</Link> / {crumb}
        </p>
        <p className="eyebrow-line eyebrow-line--light">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="page-hero__lede">{lede}</p>}
      </div>
    </section>
  )
}
