export default function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size * 1.08} viewBox="0 0 200 216" aria-hidden="true">
      <defs>
        <linearGradient id="msa-shield-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#123b6e" />
          <stop offset="55%" stopColor="#0a2540" />
          <stop offset="100%" stopColor="#061c33" />
        </linearGradient>
      </defs>
      <path
        d="M100 4
           L182 30
           V96
           C182 148 148 190 100 212
           C52 190 18 148 18 96
           V30
           Z"
        fill="url(#msa-shield-fill)"
        stroke="#5fb2ea"
        strokeWidth="6"
      />
      <path
        d="M100 16
           L170 38
           V96
           C170 141 141 176 100 197
           C59 176 30 141 30 96
           V38
           Z"
        fill="none"
        stroke="#8fcdf5"
        strokeWidth="2"
        opacity="0.55"
      />
      <text
        x="100"
        y="98"
        textAnchor="middle"
        fontFamily="'Oswald', 'Arial Narrow', sans-serif"
        fontWeight="700"
        fontSize="58"
        fill="#ffffff"
        letterSpacing="2"
      >
        MSA
      </text>
      <rect x="42" y="118" width="116" height="3" fill="#5fb2ea" />
      <rect x="42" y="126" width="116" height="3" fill="#5fb2ea" />
      <text
        x="100"
        y="152"
        textAnchor="middle"
        fontFamily="'Oswald', 'Arial Narrow', sans-serif"
        fontWeight="600"
        fontSize="15.5"
        fill="#ffffff"
        letterSpacing="1"
      >
        TRANSPORTATION
      </text>
      <text
        x="100"
        y="171"
        textAnchor="middle"
        fontFamily="'Oswald', 'Arial Narrow', sans-serif"
        fontWeight="600"
        fontSize="15.5"
        fill="#ffffff"
        letterSpacing="1.5"
      >
        INC.
      </text>
    </svg>
  )
}
