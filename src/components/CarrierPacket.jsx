import { useEffect, useRef, useState } from 'react'
import { CONTACT, mailto } from '../data/company'
import { PACKET_DOCS } from '../data/operations'
import SectionHead from './SectionHead'
import Reveal from './Reveal'
import Icon from './Icon'

const ROWS = [
  ['Legal name', CONTACT.legalName],
  ['USDOT', CONTACT.dot.replace('USDOT ', '')],
  ['MC number', CONTACT.mc.replace('MC-', '')],
  ['Dispatch', CONTACT.phone],
  ['Email', CONTACT.email],
  ['Address', CONTACT.address],
]

const packetMail = mailto({
  subject: 'Carrier packet request',
  body: [
    'Hello MSA dispatch,',
    '',
    'Please send your carrier packet:',
    ...PACKET_DOCS.map((d) => `- ${d}`),
    '',
    'Company:',
    'MC number (brokers):',
    'Contact name and phone:',
  ],
})

// Broker onboarding: copyable authority details, FMCSA lookup and a document request.
// `headless` drops the heading when the page banner already carries it.
export default function CarrierPacket({ headless = false }) {
  const [copied, setCopied] = useState('')
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(''), 1800)
    } catch {
      // Clipboard blocked: the value is plain text and can still be selected by hand.
    }
  }

  return (
    <section className="section section--light packet" id="brokers" data-nav="brokers" aria-labelledby="packet-title">
      <div className="container packet__grid">
        <div>
          {!headless && <SectionHead
            id="packet-title"
            tone="light"
            eyebrow="Broker & shipper setup"
            title={['Set us up.', 'Book the load.']}
            lede="Everything your onboarding team asks for, in one place. Copy the numbers, check our record with FMCSA, and request the rest by email."
          />}
          <Reveal delay={100}>
            <p className="packet__label">Sent on request</p>
            <ul className="packet__docs">
              {PACKET_DOCS.map((d) => (
                <li key={d}>
                  <Icon name="doc" size={18} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="packet__actions">
              <a href={packetMail} className="btn btn--primary btn--lg">
                Request carrier packet <Icon name="mail" size={18} />
              </a>
              <a href={CONTACT.saferUrl} target="_blank" rel="noreferrer" className="btn btn--outline-dark btn--lg">
                Verify on FMCSA <Icon name="external" size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Styled after the lettering on a tractor door. */}
        <Reveal className="door" variant="scale" delay={120}>
          <div className="door__head">
            <strong>{CONTACT.legalName}</strong>
            <span>{CONTACT.city}, {CONTACT.state}</span>
          </div>
          <dl className="door__rows">
            {ROWS.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
                <dd>
                  <button type="button" onClick={() => copy(label, value)} aria-label={`Copy ${label}`} className={copied === label ? 'is-copied' : ''}>
                    <Icon name={copied === label ? 'check' : 'copy'} size={18} />
                  </button>
                </dd>
              </div>
            ))}
          </dl>
          <div className="tape" aria-hidden="true" />
          <p className="visually-hidden" role="status">{copied ? `${copied} copied` : ''}</p>
        </Reveal>
      </div>
    </section>
  )
}
