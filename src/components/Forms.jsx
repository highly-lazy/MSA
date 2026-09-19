import { useEffect, useState } from 'react'
import { CONTACT } from '../data/company'
import submitForm from '../lib/submitForm'
import Icon from './Icon'

// Generic form shell: tracks values, submit status and renders the result state.
function useForm(initial, { subject, to, format }) {
  const [values, setValues] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const { mode } = await submitForm({ subject: subject(values), to, fields: format(values) })
      setStatus(mode)
    } catch {
      setStatus('error')
    }
  }
  return { values, setValues, set, status, onSubmit }
}

function Result({ status, values, kind, phone }) {
  const name = values.name ? `, ${values.name.split(' ')[0]}` : ''
  return (
    <div className="form__result" role="status">
      <span className="form__result-icon"><Icon name="check" size={28} strokeWidth={2.4} /></span>
      {status === 'sent' ? (
        <>
          <h3>Thanks{name} — we&rsquo;ve got it.</h3>
          <p>
            {kind === 'quote'
              ? 'Dispatch will follow up with pricing, usually the same business day.'
              : 'Our recruiting team will be in touch shortly.'}
          </p>
        </>
      ) : (
        <>
          <h3>One last step{name}.</h3>
          <p>
            Your email app should have opened with the details ready to send — just hit send.
            Prefer to talk? Call <a href={`tel:${phone.href}`}>{phone.label}</a>.
          </p>
        </>
      )}
    </div>
  )
}

const Field = ({ label, children }) => (
  <label className="field">
    <span>{label}</span>
    {children}
  </label>
)

export function QuoteForm() {
  const { values, setValues, set, status, onSubmit } = useForm(
    { name: '', company: '', phone: '', email: '', origin: '', destination: '', equipment: 'Dry van', freight: '', date: '' },
    {
      subject: (v) => `Quote request — ${v.origin || 'lane'} to ${v.destination || ''}`.trim(),
      to: CONTACT.email,
      format: (v) => ({
        Name: v.name, Company: v.company, Phone: v.phone, Email: v.email,
        Pickup: v.origin, Delivery: v.destination, Equipment: v.equipment, Freight: v.freight, 'Pickup date': v.date,
      }),
    },
  )

  // Pick up the lane typed into the quick-quote bar.
  useEffect(() => {
    const onPrefill = (e) => setValues((v) => ({ ...v, ...e.detail }))
    window.addEventListener('msa:prefill', onPrefill)
    return () => window.removeEventListener('msa:prefill', onPrefill)
  }, [setValues])

  if (status === 'sent' || status === 'mailto') {
    return <div className="form-card"><Result status={status} values={values} kind="quote" phone={{ href: CONTACT.phoneHref, label: CONTACT.phone }} /></div>
  }

  return (
    <form className="form-card" onSubmit={onSubmit} id="quote-form">
      <h3>Request a quote</h3>
      <p className="form-card__lede">Tell us the lane and the load. We&rsquo;ll come back with pricing.</p>
      <div className="form-row">
        <Field label="Full name"><input required autoComplete="name" value={values.name} onChange={set('name')} placeholder="Jane Doe" /></Field>
        <Field label="Company"><input autoComplete="organization" value={values.company} onChange={set('company')} placeholder="Company name" /></Field>
      </div>
      <div className="form-row">
        <Field label="Phone"><input required type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set('phone')} placeholder="(555) 123-4567" /></Field>
        <Field label="Email"><input required type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@company.com" /></Field>
      </div>
      <div className="form-row">
        <Field label="Pickup"><input required value={values.origin} onChange={set('origin')} placeholder="City, State" /></Field>
        <Field label="Delivery"><input required value={values.destination} onChange={set('destination')} placeholder="City, State" /></Field>
      </div>
      <div className="form-row">
        <Field label="Equipment">
          <select value={values.equipment} onChange={set('equipment')}>
            <option>Dry van</option>
            <option>Reefer</option>
            <option>Power only</option>
            <option>Dedicated lane</option>
            <option>Not sure yet</option>
          </select>
        </Field>
        <Field label="Pickup date"><input type="date" value={values.date} onChange={set('date')} /></Field>
      </div>
      <Field label="Freight & weight"><input value={values.freight} onChange={set('freight')} placeholder="e.g. 22 pallets, 30,000 lbs" /></Field>
      {status === 'error' && <p className="form__error" role="alert">Something went wrong sending that. Please call {CONTACT.phone}.</p>}
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request a quote'} <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}

export function ApplicationForm() {
  const { values, set, status, onSubmit } = useForm(
    { name: '', phone: '', email: '', track: 'Company driver', experience: '' },
    {
      subject: (v) => `Driver application — ${v.name || 'new applicant'} (${v.track})`,
      to: CONTACT.recruiting,
      format: (v) => ({ Name: v.name, Phone: v.phone, Email: v.email, 'Interested in': v.track, 'CDL & experience': v.experience }),
    },
  )

  if (status === 'sent' || status === 'mailto') {
    return <div className="form-card form-card--dark"><Result status={status} values={values} kind="apply" phone={{ href: CONTACT.phoneHref, label: CONTACT.phone }} /></div>
  }

  return (
    <form className="form-card form-card--dark" onSubmit={onSubmit} id="apply-form">
      <h3>Apply in under a minute</h3>
      <p className="form-card__lede">Company drivers and owner operators — tell us a little about yourself.</p>
      <div className="form-row">
        <Field label="Full name"><input required autoComplete="name" value={values.name} onChange={set('name')} placeholder="John Smith" /></Field>
        <Field label="Phone"><input required type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={set('phone')} placeholder="(555) 123-4567" /></Field>
      </div>
      <Field label="Email"><input type="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@email.com" /></Field>
      <Field label="I'm interested in">
        <select value={values.track} onChange={set('track')}>
          <option>Company driver</option>
          <option>Owner operator</option>
        </select>
      </Field>
      <Field label="CDL class & experience">
        <textarea rows="3" value={values.experience} onChange={set('experience')} placeholder="Class A, 3 years OTR…" />
      </Field>
      {status === 'error' && <p className="form__error" role="alert">Something went wrong sending that. Please call {CONTACT.phone}.</p>}
      <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Submit application'} <Icon name="arrow" size={18} />
      </button>
    </form>
  )
}
