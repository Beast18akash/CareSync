/**
 * Reusable Avatar — replaces three duplicated avatar implementations.
 * Falls back to initials when image fails or name is missing.
 */
export default function Avatar({ name, size = 'md', className = '' }) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-20 w-20 text-xl',
  }
  const sizeClass = sizes[size] || sizes.md
  const initials =
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?'

  const avatarUrl = name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=128`
    : null

  return (
    <div
      className={`${sizeClass} ${className} shrink-0 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#38BDF8]/20 overflow-hidden flex items-center justify-center font-semibold text-primary border-2 border-primary/20 relative`}
    >
      {avatarUrl ? (
        <>
          <img
            src={avatarUrl}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              const fb = e.target.nextElementSibling
              if (fb) fb.classList.remove('hidden')
            }}
          />
          <span className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-[#2563EB]/20 to-[#38BDF8]/20">
            {initials}
          </span>
          <span className="relative hidden">{initials}</span>
        </>
      ) : (
        initials
      )}
    </div>
  )
}
