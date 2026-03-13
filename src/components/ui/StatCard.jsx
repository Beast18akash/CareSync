const colorConfig = {
  primary: {
    bg: 'bg-primary/10',
    icon: 'text-primary',
  },
  green: {
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-600',
  },
  red: {
    bg: 'bg-rose-500/10',
    icon: 'text-rose-600',
  },
  blue: {
    bg: 'bg-sky-500/10',
    icon: 'text-sky-600',
  },
  amber: {
    bg: 'bg-amber-500/10',
    icon: 'text-amber-600',
  },
}

export default function StatCard({ title, value, icon: Icon, trend, color = 'primary' }) {
  const config = colorConfig[color] || colorConfig.primary

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <p className="text-2xl font-bold text-text-dark mt-2 tabular-nums">{value}</p>
          {trend && (
            <p className="text-xs text-text-muted mt-2">{trend}</p>
          )}
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.icon}`}>
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
        )}
      </div>
    </div>
  )
}
