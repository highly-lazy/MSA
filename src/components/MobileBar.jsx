import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/company'
import Icon from './Icon'

// Phone-only sticky action bar: the two things every visitor wants — call, or get a quote.
export default function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`mobile-bar${show ? ' is-visible' : ''}`}>
      <a href={`tel:${CONTACT.phoneHref}`} className="btn btn--ghost">
        <Icon name="phone" size={18} /> Call
      </a>
      <Link to={{ pathname: '/', hash: '#quote' }} className="btn btn--primary">
        Get a quote <Icon name="arrow" size={18} />
      </Link>
    </div>
  )
}
