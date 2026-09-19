import { useState } from 'react'
import { FAQ as DATA } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

const TABS = [
  ['shippers', 'Shippers & brokers'],
  ['drivers', 'Drivers'],
]

export default function FAQ() {
  const [tab, setTab] = useState('shippers')
  const [open, setOpen] = useState(0)
  const items = DATA[tab]

  // FAQPage structured data for search engines (all questions, both audiences).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [...DATA.shippers, ...DATA.drivers].map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <section className="section section--paper faq" id="faq" aria-labelledby="faq-title">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container faq__grid">
        <SectionHead id="faq-title" tone="light" eyebrow="Straight answers" title={['Questions', 'we hear a lot.']} />

        <Reveal delay={100} className="faq__panel">
          <div className="faq__tabs" role="tablist" aria-label="FAQ audience">
            {TABS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={tab === key ? 'is-active' : ''}
                onClick={() => {
                  setTab(key)
                  setOpen(0)
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <ul className="faq__list">
            {items.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className={isOpen ? 'is-open' : ''}>
                  <h3>
                    <button type="button" aria-expanded={isOpen} aria-controls={`faq-${tab}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {f.q}
                      <Icon name="plus" size={20} />
                    </button>
                  </h3>
                  <div className="faq__answer" id={`faq-${tab}-${i}`} role="region">
                    <p>{f.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
