const statusConfig = {
  booked: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    label: 'Booked',
  },
  completed: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-700',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-700',
    label: 'Cancelled',
  },
  pending: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-700',
    label: 'Pending',
  },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}
