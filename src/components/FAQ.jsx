import { useState } from 'react'

export default function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = i === openIndex
        return (
          <div key={item.q} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="faq-item__question"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <span>{item.q}</span>
              <svg viewBox="0 0 24 24" fill="none" className="faq-item__chevron">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="faq-item__answer">
              <p>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
