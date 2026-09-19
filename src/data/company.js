// ---------------------------------------------------------------------------
// MSA Transportation — single source of truth for company facts.
//
// VERIFIED  = public FMCSA record or confirmed directly by the company.
// PLACEHOLDER = `null` value. The UI renders "XX+" / "[Add …]" until a real
//               figure is supplied here. Replace the value and it shows up
//               everywhere, animated counters included.
// ---------------------------------------------------------------------------


export const CONTACT = {
  phone: '(267) 251-7878',
  phoneHref: '+12672517878',
  // TODO: placeholder inboxes — swap for real business mailboxes before launch.
  email: 'dispatch@msatransportationinc.com',
  recruiting: 'careers@msatransportationinc.com',
  address: '2004 Carmel Dr, Jamison, PA 18929',
  street: '2004 Carmel Dr',
  city: 'Jamison',
  state: 'PA',
  zip: '18929',
  mc: 'MC-1153963',
  dot: 'USDOT 3498597',
  founded: 2020,
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=2004+Carmel+Dr,+Jamison,+PA+18929',
}

// Add real profile URLs here; the footer only renders networks that have one.
export const SOCIAL = [
  // { label: 'Facebook', href: 'https://facebook.com/…' },
  // { label: 'LinkedIn', href: 'https://linkedin.com/company/…' },
  // { label: 'Instagram', href: 'https://instagram.com/…' },
]

// Animated counters. `value: null` renders a clearly-marked placeholder.
export const STATS = [
  {
    id: 'years',
    value: new Date().getFullYear() - CONTACT.founded, // VERIFIED: operating since 2020
    suffix: '+',
    label: 'Years on the road',
    note: `Operating since ${CONTACT.founded}`,
  },
  { id: 'units', value: 40, suffix: '+', label: 'Tractors & trailers', note: 'Confirmed fleet size' }, // VERIFIED
  { id: 'states', value: 48, suffix: '', label: 'States served', note: 'Contiguous U.S.' }, // VERIFIED (see COVERAGE)
  { id: 'drivers', value: null, suffix: '+', label: 'Professional drivers', note: 'Add headcount' }, // PLACEHOLDER
  { id: 'miles', value: null, suffix: 'K+', label: 'Miles covered', note: 'Add total miles (thousands)' }, // PLACEHOLDER
  { id: 'loads', value: null, suffix: 'K+', label: 'Loads delivered', note: 'Add loads (thousands)' }, // PLACEHOLDER
]

export const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Fleet', id: 'fleet' },
  { label: 'Safety', id: 'safety' },
  { label: 'Team', id: 'team' },
  { label: 'Drivers', id: 'drivers' },
  { label: 'Contact', id: 'contact' },
]

// Photography. Real MSA photos live in public/images/. Anything set to `null` is skipped.
export const IMAGES = {
  truckCutout: '/images/truck-blue.webp', // hero cut-out (Peterbilt), background removed
  og: '/images/og-image.jpg',
  seasons: '/images/seasons.webp', // 4-season panorama (illustrative)
  // Company trucks — native resolution, plus a 480px version for phones.
  own042: '/images/own-042.webp',
  own042Small: '/images/own-042-480.webp',
  own035: '/images/own-035.webp',
  own035Small: '/images/own-035-480.webp',
  safetyTruck: '/images/safety-truck.webp', // unit 035 for the inspection scanner
  // Studio product shots (white backgrounds — rendered with a multiply blend on a light panel)
  trailerDry: '/images/trailer-dry.webp',
  trailerReefer: '/images/trailer-reefer.webp',
  tractorVolvo: '/images/tractor-volvo.webp',
  // Optional full-bleed hero photo. Drop a file in public/images/ (e.g. '/images/hero-bg.webp')
  // and set the path here — the hero blends it under the headline automatically.
  heroBg: null,
}

// Background video for the "Delivering Excellence. Driving Trust." band.
// Put a landscape, silent, seamless 10–20 s loop in public/videos/ (1080p, ideally ≤ 6 MB;
// add a .webm too for smaller files) and set the paths. While `src` is null the band shows
// a built-in animated night-highway scene, so it never looks empty.
export const VIDEO = {
  src: null, // e.g. '/videos/highway-loop.mp4'
  webm: null, // e.g. '/videos/highway-loop.webm' (optional)
  poster: null, // e.g. '/images/highway-poster.webp' (optional)
}

// Where MSA runs. `served: 'all48'` reflects the company's stated coverage of
// the 48 contiguous states. If that ever changes, list state codes instead,
// e.g. served: ['pa', 'nj', 'ny', 'oh'].
export const COVERAGE = {
  served: 'all48',
  hq: { code: 'pa', label: 'MSA HQ · Jamison, PA' },
  // Illustrative lanes fanned out from HQ for the animated map. fx/fy nudge the
  // marker inside the state's bounding box. These are visual samples, not a lane list.
  sampleLanes: [
    { code: 'il', name: 'Midwest', fx: 0.5, fy: 0.6 },
    { code: 'ga', name: 'Southeast', fx: 0.5, fy: 0.5 },
    { code: 'fl', name: 'Florida', fx: 0.75, fy: 0.55 },
    { code: 'tx', name: 'Texas', fx: 0.5, fy: 0.6 },
    { code: 'mn', name: 'Upper Midwest', fx: 0.5, fy: 0.55 },
    { code: 'ca', name: 'West Coast', fx: 0.45, fy: 0.55 },
    { code: 'wa', name: 'Pacific Northwest', fx: 0.5, fy: 0.5 },
  ],
}
