/** Doctor consultation scene - professional healthcare illustration */
export default function HealthcareHero({ className = 'w-full h-full' }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="heroGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08" />
        </filter>
      </defs>
      {/* Background shapes */}
      <ellipse cx="500" cy="80" rx="120" ry="80" fill="url(#heroGrad1)" />
      <ellipse cx="80" cy="320" rx="100" ry="60" fill="url(#heroGrad1)" />
      
      {/* Doctor figure */}
      <g filter="url(#softShadow)" transform="translate(180, 80)">
        <rect x="0" y="120" width="140" height="200" rx="70" fill="#E0F2FE" />
        <circle cx="70" y="70" r="50" fill="#FEF3C7" />
        <path d="M55 60 Q70 45 85 60 Q90 75 80 85 L75 95 L65 95 L60 85 Q50 75 55 60" fill="#FCD34D" />
        <rect x="30" y="130" width="80" height="60" rx="8" fill="url(#heroGrad2)" />
        <rect x="50" y="200" width="60" height="100" rx="8" fill="#1E3A8A" />
        <ellipse cx="70" cy="280" rx="35" ry="15" fill="#1E3A8A" />
        <circle cx="70" cy="165" r="8" fill="#fff" opacity="0.9" />
        <path d="M60 245 L80 245 M70 235 L70 255" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Patient figure */}
      <g filter="url(#softShadow)" transform="translate(320, 120)">
        <rect x="0" y="100" width="120" height="180" rx="60" fill="#DBEAFE" />
        <circle cx="60" y="50" r="45" fill="#FEF3C7" />
        <path d="M48 42 Q60 30 72 42 Q78 55 68 68 L62 78 L58 78 L52 68 Q42 55 48 42" fill="#FCD34D" />
        <rect x="20" y="110" width="80" height="55" rx="8" fill="#10B981" />
        <rect x="35" y="175" width="50" height="90" rx="8" fill="#0F172A" />
        <ellipse cx="60" cy="250" rx="28" ry="12" fill="#0F172A" />
        <rect x="85" y="130" width="25" height="35" rx="4" fill="#F8FAFC" />
      </g>

      {/* Medical elements */}
      <g transform="translate(480, 200)">
        <rect x="0" y="0" width="80" height="100" rx="12" fill="white" stroke="#E2E8F0" strokeWidth="2" filter="url(#softShadow)" />
        <path d="M40 25 L40 75 M20 50 L60 50" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
        <circle cx="40" cy="50" r="8" fill="#10B981" />
      </g>

      {/* Floating elements */}
      <circle cx="100" cy="100" r="8" fill="#38BDF8" opacity="0.4" />
      <circle cx="520" cy="250" r="6" fill="#10B981" opacity="0.4" />
    </svg>
  )
}
