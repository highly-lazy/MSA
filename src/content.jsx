// Shared content arrays (icons + copy) used across Home and Services pages.

export const SERVICES = [
  {
    slug: 'dry-van',
    title: 'Dry Van Freight',
    copy: 'Enclosed 53\' trailers built for palletized, boxed and general freight that needs to stay clean, dry and secure from pickup to delivery.',
    detail: 'Our dry van trailers are air-ride equipped and inspected before every run, so boxed, palletized and general commodities move without damage claims or delays.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="4" y="12" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M34 20h6l4 6v8h-10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="14" cy="38" r="3.4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="38" r="3.4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12 18h18M12 24h18M12 30h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'dedicated-lanes',
    title: 'Dedicated Lanes',
    copy: 'Consistent capacity on your recurring routes, with the same drivers and predictable pickup and delivery windows every week.',
    detail: 'For shippers who move freight on a repeating schedule, we assign drivers and equipment to your lane so pickup and delivery times stay predictable, week after week.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 40 20 8h8l12 32" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M24 8v32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="24" cy="8" r="3" fill="currentColor" />
        <circle cx="24" cy="40" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    slug: 'reefer',
    title: 'Refrigerated (Reefer)',
    copy: 'Temperature-controlled 53\' trailers for produce, dairy and other cold-chain freight, monitored from pickup to delivery.',
    detail: 'Our reefer trailers run on Carrier units with continuous temperature monitoring, so cold-chain freight stays in range from pickup to delivery.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <rect x="4" y="12" width="30" height="22" rx="2" stroke="currentColor" strokeWidth="2.5" />
        <path d="M34 20h6l4 6v8h-10" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="14" cy="38" r="3.4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="36" cy="38" r="3.4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M19 6v8M15 8l4-2 4 2M15 10l4 2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'nationwide-coverage',
    title: 'Interstate Coverage',
    copy: 'Full truckload service across state lines, backed by a dispatch team that answers the phone and knows where your load is.',
    detail: 'We operate under our own MC and USDOT authority to run interstate freight, with dispatch tracking every load from pickup to proof of delivery.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 24h36M24 6c5 5 7.5 11 7.5 18S29 37 24 42c-5-5-7.5-11-7.5-18S19 11 24 6Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
]

export const WHY_POINTS = [
  {
    title: 'On-time, every time',
    copy: 'Proactive dispatch means you always know where your load is — and when it lands.',
  },
  {
    title: 'Well-maintained equipment',
    copy: 'Tractors and 53\' dry van & reefer trailers inspected and serviced on a strict preventive-maintenance schedule.',
  },
  {
    title: 'Fully licensed & insured',
    copy: 'Operating under our own MC and USDOT authority, with full cargo and liability coverage on every load.',
  },
  {
    title: 'Drivers who care',
    copy: 'Experienced, safety-first drivers who treat every shipment — and every customer relationship — with respect.',
  },
]

export const CAREER_TRACKS = [
  {
    title: 'Company Driver',
    points: [
      'Consistent weekly miles on dry van & reefer freight',
      'Late-model, well-maintained equipment',
      'Home-time that respects your schedule',
      'Direct line to dispatch — no runaround',
    ],
  },
  {
    title: 'Owner Operator',
    points: [
      'Competitive percentage or mileage pay',
      'Consistent freight — no chasing loads',
      'Fuel and maintenance support',
      'Respectful dispatch that works with you, not against you',
    ],
  },
]

export const DRIVER_REQUIREMENTS = [
  'Valid Class A CDL',
  'At least 1 year of verifiable OTR or regional experience',
  'Clean driving record and current medical card',
  'Able to pass DOT drug screen and background check',
]

export const FLEET_SPECS = [
  ['Tractors', 'Late-model day-cab & sleeper trucks, regularly serviced'],
  ['Dry van trailers', '53\' high-cube trailers, air-ride equipped'],
  ['Reefer trailers', '53\' Carrier-equipped trailers with continuous temp monitoring'],
  ['Maintenance', 'Scheduled preventive maintenance & DOT inspections'],
]

// Trust / capability tiles — the "how your freight moves safely" promise.
export const TRUST_FEATURES = [
  {
    title: 'On-Time Pickup & Delivery',
    copy: 'Routes are planned around your pickup and delivery windows, not the other way around.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="26" r="16" stroke="currentColor" strokeWidth="2.5" />
        <path d="M24 17v10l7 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 6h14M24 6v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Updates',
    copy: 'Dispatch tracks every load from pickup to proof of delivery, so you always know where it is.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 4C13 4 6 13 6 24s7 20 18 20 18-9 18-20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 4v10M40 8l-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="26" r="4" fill="currentColor" />
        <path d="M24 26 32 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Safety First',
    copy: 'Inspected equipment, trained drivers and full cargo & liability coverage on every load.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M24 5 40 12v13c0 11-7 18-16 18S8 36 8 25V12Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M16 24l6 6 11-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '24/7 Dispatch Support',
    copy: 'A real person answers the phone, day or night, for shippers and drivers alike.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M8 26v-4a16 16 0 0 1 32 0v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="4" y="26" width="10" height="12" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <rect x="34" y="26" width="10" height="12" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 38c0 4 4 6 10 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export const FAQ_SHIPPERS = [
  {
    q: 'How do I request a quote?',
    a: 'Fill out the quote form on our Services page with your pickup and delivery locations, freight type and target date. Dispatch will call or email you back with pricing, usually the same business day.',
  },
  {
    q: 'What kind of freight do you haul?',
    a: 'Dry van and refrigerated (reefer) freight — palletized or boxed general commodities as well as temperature-controlled loads like produce and dairy, from single pallets to full truckloads.',
  },
  {
    q: 'Do you offer dedicated lanes?',
    a: 'Yes. If you move freight on a repeating schedule, we can assign a driver and equipment to your lane so pickup and delivery times stay consistent week after week.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We run interstate freight across the 48 contiguous states under our own MC and USDOT authority.',
  },
  {
    q: 'How can I track my shipment?',
    a: 'Dispatch tracks every load from pickup to proof of delivery and will proactively update you on status — call or email your dispatcher any time for a live update.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes — we operate under our own authority (MC-1153963 / USDOT 3498597) with full cargo and liability coverage on every load.',
  },
]

export const FAQ_DRIVERS = [
  {
    q: 'What do I need to apply?',
    a: 'A valid Class A CDL, at least 1 year of verifiable OTR or regional experience, a clean driving record, a current medical card, and the ability to pass a DOT drug screen and background check.',
  },
  {
    q: 'Company driver or owner operator — what\'s the difference?',
    a: 'Company drivers run our equipment for consistent weekly miles, home-time and benefits. Owner operators run their own truck under our dispatch for competitive percentage or mileage pay, with fuel and maintenance support.',
  },
  {
    q: 'How much home time will I get?',
    a: 'We build routes around a schedule that respects your home time — tell us what you need during the application call and dispatch will work with it.',
  },
  {
    q: 'What will I be hauling?',
    a: 'A mix of dry van and reefer loads — palletized and boxed general commodities plus temperature-controlled freight, mostly no-touch.',
  },
  {
    q: 'How soon can I start?',
    a: 'Most applicants hear back from recruiting the same day. Once your paperwork, background check and orientation are done, most drivers are on the road within a couple of weeks.',
  },
  {
    q: 'Who do I call once I\'m on the road?',
    a: 'You get a direct line to dispatch — no call centers, no runaround. Real people who know your load and your route.',
  },
]
