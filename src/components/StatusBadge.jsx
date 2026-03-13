const statusConfig = {
  booked: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Booked',
  },
  completed: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    label: 'Cancelled',
  },
  pending: {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    label: 'Pending',
  },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.pending

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  )
}
