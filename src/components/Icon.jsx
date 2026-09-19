// Small stroke icon set (24×24). Usage: <Icon name="shield" />
const PATHS = {
  shield: <><path d="M12 3 20 6v6c0 4.6-3.2 7.9-8 9-4.8-1.1-8-4.4-8-9V6Z" /><path d="m8.5 12 2.4 2.4 4.6-5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>,
  route: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M19 20c0 1.4-2 2-5 2" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.5 17.2a1.9 1.9 0 0 0 2.7 2.7l5.8-5.8a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.2-.4-.4-2.2Z" />,
  clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9zM8.5 12l2 2 3.5-4M8.5 17.5h7" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.4" /><path d="M16.5 14.2c2.6.2 4.5 2.3 4.5 5" /></>,
  invoice: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
  handshake: <><path d="m3 12 4-4 4 1 3-2 4 3 3 2-6 6-2-1-2 2-4-3-3-1Z" /><path d="m9 15 2 1.5M12 13l2.5 1.6" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />,
  badge: <><circle cx="12" cy="9" r="5" /><path d="m8.8 13.5-1.3 7 4.5-2.3 4.5 2.3-1.3-7" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" /></>,
  radio: <><circle cx="12" cy="12" r="2" /><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" /></>,
  gauge: <><path d="M4.5 18a9 9 0 1 1 15 0" /><path d="m12 13 4-4" /><circle cx="12" cy="13.5" r="1.2" /></>,
  pin: <><path d="M12 21s7-6 7-11.5A7 7 0 0 0 5 9.5C5 15 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  doc: <><path d="M7 3h7l5 5v13H7Z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></>,
  truck: <><path d="M2 6h11v10H2zM13 9h4.5L21 12.5V16h-8" /><circle cx="6.5" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" /></>,
  box: <><path d="m12 3 8.5 4.5v9L12 21l-8.5-4.5v-9Z" /><path d="m3.5 7.5 8.5 4.5 8.5-4.5M12 12v9" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8Z" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m6-6-6 6 6 6" />,
  phone: <path d="M4.5 5.5c0-.6.4-1 1-1h2.6c.5 0 .9.3 1 .8l.8 3.2c.1.4 0 .9-.4 1.2L8 10.9a13 13 0 0 0 5.1 5.1l1.2-1.5c.3-.4.8-.5 1.2-.4l3.2.8c.5.1.8.5.8 1v2.6c0 .6-.4 1-1 1C10.6 19.5 4.5 13.4 4.5 6.5Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9.5 4.5 12 6.5l2.5-2M9.5 19.5 12 17.5l2.5 2" />,
  play: <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  user: <><circle cx="12" cy="8.5" r="4" /><path d="M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5" /></>,
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 1.7 }) {
  return (
    <svg
      className={`icon${className ? ' ' + className : ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
