import { useEffect, useRef, useState } from 'react'
import { IMAGES, CONTACT } from '../data/company'
import { OWN_TRUCKS } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'
import useDragScroll from '../hooks/useDragScroll'

// Gallery of the company's own trucks. Cards open a full-resolution lightbox (native <dialog>).
export default function OwnTrucks() {
  const [open, setOpen] = useState(null)
  const dialog = useRef(null)
  const grid = useRef(null)
  useDragScroll(grid)
  const item = OWN_TRUCKS.find((t) => t.id === open)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (item && !d.open) d.showModal()
    if (!item && d.open) d.close()
  }, [item])

  const close = () => setOpen(null)

  return (
    <section className="section section--dark trucks" id="trucks" data-nav="fleet" aria-labelledby="trucks-title">
      <div className="container">
        <SectionHead
          id="trucks-title"
          eyebrow="Our trucks"
          title={['Real trucks.', 'Real MSA iron.']}
          lede={`The equipment you will see at your dock — marked with our name, ${CONTACT.mc.replace('-', '\u2011')} and ${CONTACT.dot}.`}
        />

        <ul className="trucks__grid" ref={grid} data-count={OWN_TRUCKS.length}>
          {OWN_TRUCKS.map((t, i) => (
            <Reveal as="li" key={t.id} className="truck" delay={i * 120} threshold={0.01}>
              <button type="button" className="truck__btn" onClick={() => setOpen(t.id)} aria-label={`View ${t.unit} full size`}>
                <img
                  src={IMAGES[t.image]}
                  srcSet={`${IMAGES[t.small]} 480w, ${IMAGES[t.image]} 800w`}
                  sizes="(max-width: 719px) 84vw, (max-width: 1240px) 46vw, 570px"
                  alt={t.alt}
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
                <span className="truck__shade" aria-hidden="true" />
                <span className="truck__unit">{t.unit}</span>
                <span className="truck__zoom" aria-hidden="true"><Icon name="plus" size={20} /></span>
                <span className="truck__cap">
                  <strong>{t.title}</strong>
                  <span>{t.caption}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={item ? item.alt : 'Truck photo'}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {item && (
          <figure>
            <img src={IMAGES[item.image]} alt={item.alt} />
            <figcaption>
              <strong>{item.unit}</strong> · {item.title}
            </figcaption>
          </figure>
        )}
        <button type="button" className="lightbox__close" onClick={close} aria-label="Close photo">
          <Icon name="close" size={22} />
        </button>
      </dialog>
    </section>
  )
}
