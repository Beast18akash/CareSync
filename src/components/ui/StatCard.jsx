import { useState, useEffect } from 'react'

const colorConfig = {
  primary: {
    gradient: 'from-[#2563EB] to-[#38BDF8]',
    bg: 'bg-gradient-to-br from-[#2563EB]/10 to-[#38BDF8]/10',
    iconBg: 'bg-gradient-to-br from-[#2563EB] to-[#38BDF8]',
    icon: 'text-white',
    shadow: 'shadow-[0_4px_20px_-4px_rgba(37,99,235,0.3)]',
  },
  secondary: {
    gradient: 'from-[#0EA5E9] to-[#38BDF8]',
    bg: 'bg-gradient-to-br from-[#0EA5E9]/10 to-[#38BDF8]/10',
    iconBg: 'bg-gradient-to-br from-[#0EA5E9] to-[#38BDF8]',
    icon: 'text-white',
    shadow: 'shadow-[0_4px_20px_-4px_rgba(14,165,233,0.3)]',
  },
  success: {
    gradient: 'from-[#10B981] to-[#34D399]',
    bg: 'bg-gradient-to-br from-[#10B981]/10 to-[#34D399]/10',
    iconBg: 'bg-gradient-to-br from-[#10B981] to-[#34D399]',
    icon: 'text-white',
    shadow: 'shadow-[0_4px_20px_-4px_rgba(16,185,129,0.3)]',
  },
  warning: {
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    bg: 'bg-gradient-to-br from-[#F59E0B]/10 to-[#FBBF24]/10',
    iconBg: 'bg-gradient-to-br from-[#F59E0B] to-[#FBBF24]',
    icon: 'text-white',
    shadow: 'shadow-[0_4px_20px_-4px_rgba(245,158,11,0.3)]',
  },
  danger: {
    gradient: 'from-[#EF4444] to-[#F87171]',
    bg: 'bg-gradient-to-br from-[#EF4444]/10 to-[#F87171]/10',
    iconBg: 'bg-gradient-to-br from-[#EF4444] to-[#F87171]',
    icon: 'text-white',
    shadow: 'shadow-[0_4px_20px_-4px_rgba(239,68,68,0.3)]',
  },
}

function AnimatedCounter({ value, duration = 800 }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = typeof value === 'number' ? value : parseInt(value, 10) || 0
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(start + (end - start) * easeOut)
      setDisplayValue(current)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  return displayValue
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'primary', animateValue = true }) {
  const config = colorConfig[color] || colorConfig.primary

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl border border-slate-200/60 p-6
        bg-white/80 backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 hover:scale-[1.02]
        ${config.bg}
      `}
    >
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="text-3xl font-bold text-text-dark mt-2 tabular-nums">
            {animateValue && typeof value === 'number' ? (
              <AnimatedCounter value={value} />
            ) : (
              value
            )}
          </p>
          {trend && (
            <p className="text-xs text-text-muted mt-2">{trend}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`
              flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl
              ${config.iconBg} ${config.icon} ${config.shadow}
              transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
            `}
          >
            <Icon className="h-7 w-7" strokeWidth={1.75} />
          </div>
        )}
      </div>
      <div className={`absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${config.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
    </div>
  )
}
