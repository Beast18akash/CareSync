/** Appointment booking / calendar illustration */
export default function BookingIllustration({ className = 'w-full h-32' }) {
  return (
    <svg viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <rect x="40" y="20" width="120" height="80" rx="12" fill="url(#bookGrad)" opacity="0.2" />
      <rect x="45" y="25" width="110" height="70" rx="8" fill="white" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="55" y="35" width="90" height="8" rx="4" fill="#E2E8F0" />
      <rect x="55" y="50" width="60" height="8" rx="4" fill="#E2E8F0" />
      <rect x="55" y="65" width="70" height="8" rx="4" fill="#E2E8F0" />
      <circle cx="200" cy="60" r="25" fill="url(#bookGrad)" />
      <path d="M192 60 L198 66 L212 52" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="260" y="30" width="80" height="60" rx="8" fill="#10B981" opacity="0.2" />
      <rect x="265" y="35" width="70" height="50" rx="6" fill="white" stroke="#10B981" strokeWidth="2" />
      <path d="M280 55 L295 55 M280 65 L295 65 M280 75 L290 75" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
