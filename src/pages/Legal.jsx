import { CONTACT } from '../data/company'
import PageHero from '../components/PageHero'

// DRAFT legal copy. Have counsel review before launch and adjust to how the
// business actually handles data.
const DOCS = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information we collect', 'When you submit a quote request, driver application or callback request, we collect the details you enter — such as your name, company, phone number, email address, lane and freight information, or driving experience.'],
      ['How we use it', 'We use this information only to respond to your request: to quote freight, evaluate driver applications and communicate with you about your shipment or application.'],
      ['Sharing', 'We do not sell your personal information. We may share it with service providers who help us run the business (for example email or form-handling tools) and where required by law.'],
      ['Cookies & storage', 'This site uses minimal browser storage for small conveniences (for example remembering that you dismissed a prompt). It does not use advertising trackers.'],
      ['Your choices', `To ask what we hold about you or to have it removed, contact us at ${CONTACT.email}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Use of this site', 'This website provides general information about MSA Transportation Inc and lets you request a quote or apply to drive. Content is provided as-is and may change without notice.'],
      ['Quotes & shipments', 'A quote request is not a booking. Rates, equipment and service are confirmed directly with our operations team, and shipments are governed by the written agreement or rate confirmation between the parties.'],
      ['Driver applications', 'Submitting an application does not guarantee employment or a contract. All drivers must meet applicable federal and company requirements.'],
      ['Liability', 'To the fullest extent permitted by law, MSA Transportation Inc is not liable for losses arising from use of this website.'],
      ['Contact', `Questions about these terms? Reach us at ${CONTACT.email} or ${CONTACT.phone}.`],
    ],
  },
}

export default function Legal({ doc }) {
  const d = DOCS[doc]

  return (
    <>
    <PageHero crumb={d.title} title={[d.title]} lede={`MSA Transportation Inc · ${CONTACT.address}`} />
    <section className="legal section section--light">
      <div className="container legal__inner">
        {d.sections.map(([h, p]) => (
          <div key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
