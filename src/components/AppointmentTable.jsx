import StatusBadge from './StatusBadge'

export default function AppointmentTable({
  appointments,
  onEdit,
  onReschedule,
  onCancel,
  onComplete,
  showActions = true,
  columns = ['patient', 'doctor', 'date', 'time', 'status', 'actions'],
}) {
  if (!appointments?.length) {
    return (
      <div className="card text-center py-12">
        <p className="text-text-muted">No appointments found</p>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (time) => {
    if (!time) return '-'
    const [h, m] = time.split(':')
    const hour = parseInt(h, 10)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${m} ${ampm}`
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.includes('patient') && (
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Patient</th>
            )}
            {columns.includes('doctor') && (
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Doctor</th>
            )}
            {columns.includes('date') && (
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Date</th>
            )}
            {columns.includes('time') && (
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Time</th>
            )}
            {columns.includes('status') && (
              <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Status</th>
            )}
            {showActions && columns.includes('actions') && (
              <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr
              key={apt.id}
              className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
            >
              {columns.includes('patient') && (
                <td className="py-4 px-4">
                  <p className="font-medium text-text-dark">{apt.patientName}</p>
                  {apt.patientEmail && (
                    <p className="text-sm text-text-muted">{apt.patientEmail}</p>
                  )}
                </td>
              )}
              {columns.includes('doctor') && (
                <td className="py-4 px-4 text-text-dark">{apt.doctor}</td>
              )}
              {columns.includes('date') && (
                <td className="py-4 px-4 text-text-dark">{formatDate(apt.date)}</td>
              )}
              {columns.includes('time') && (
                <td className="py-4 px-4 text-text-dark">{formatTime(apt.time)}</td>
              )}
              {columns.includes('status') && (
                <td className="py-4 px-4">
                  <StatusBadge status={apt.status} />
                </td>
              )}
              {showActions && columns.includes('actions') && (
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {apt.status === 'booked' && (
                      <>
                        {onEdit && (
                          <button
                            onClick={() => onEdit(apt)}
                            className="p-2 rounded-lg hover:bg-primary-light text-primary text-sm"
                            title="Edit"
                          >
                            Edit
                          </button>
                        )}
                        {onReschedule && (
                          <button
                            onClick={() => onReschedule(apt)}
                            className="p-2 rounded-lg hover:bg-primary-light text-primary text-sm"
                            title="Reschedule"
                          >
                            Reschedule
                          </button>
                        )}
                        {onComplete && (
                          <button
                            onClick={() => onComplete(apt)}
                            className="p-2 rounded-lg hover:bg-green-100 text-green-600 text-sm"
                            title="Mark completed"
                          >
                            Complete
                          </button>
                        )}
                        {onCancel && (
                          <button
                            onClick={() => onCancel(apt)}
                            className="p-2 rounded-lg hover:bg-red-100 text-red-600 text-sm"
                            title="Cancel"
                          >
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                    {apt.status === 'cancelled' && (
                      <span className="text-sm text-text-muted">—</span>
                    )}
                    {apt.status === 'completed' && (
                      <span className="text-sm text-text-muted">—</span>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
