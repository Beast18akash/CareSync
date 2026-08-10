/** Simplified medical/doctor illustration for login page */
export default function LoginIllustration({ className = 'w-full h-full' }) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="loginGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id="loginGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
      </defs>
      {/* Doctor with stethoscope */}
      <g transform="translate(100, 60)">
        <ellipse cx="120" cy="320" rx="100" ry="40" fill="url(#loginGrad2)" opacity="0.8" />
        <rect x="60" y="180" width="120" height="140" rx="60" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="120" cy="120" r="55" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="2" />
        <path d="M95 95 Q120 75 145 95 Q155 115 140 130 L130 145 L110 145 L100 130 Q85 115 95 95" fill="#FCD34D" />
        <path d="M85 100 Q120 70 155 100" stroke="#64748B" strokeWidth="4" fill="none" strokeLinecap="round" />
        <rect x="75" y="200" width="90" height="50" rx="10" fill="url(#loginGrad1)" />
        <circle cx="120" cy="225" r="6" fill="white" opacity="0.9" />
        <path d="M105 250 L135 250 M120 235 L120 265" stroke="url(#loginGrad1)" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Plus/medical cross */}
      <g transform="translate(280, 140)">
        <rect x="0" y="0" width="100" height="120" rx="16" fill="white" stroke="#E2E8F0" strokeWidth="2" />
        <path d="M50 30 L50 90 M20 60 L80 60" stroke="url(#loginGrad1)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="50" cy="60" r="12" fill="#10B981" />
      </g>
    </svg>
  )
}
