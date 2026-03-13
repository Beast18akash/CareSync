import { useMemo } from 'react'
import { StatCard, PageHeader } from '../components/ui'
import AppointmentTable from '../components/AppointmentTable'
import { useAppointments } from '../context/AppointmentsContext'
import { CalendarDays, CheckCircle2, XCircle, Users } from 'lucide-react'

export default function Dashboard() {
  const { appointments, patients } = useAppointments()

  const todayStr = new Date().toISOString().split('T')[0]

  const stats = useMemo(() => {
    const today = appointments.filter((a) => a.date === todayStr)
    const totalToday = today.length
    const upcoming = today.filter((a) => a.status === 'booked').length
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length
    const totalPatients = patients.length

    return {
      totalToday,
      upcoming,
      cancelled,
      totalPatients,
    }
  }, [appointments, patients, todayStr])

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === todayStr)
        .sort((a, b) => (a.time || '').localeCompare(b.time || '')),
    [appointments, todayStr]
  )

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your clinic today"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Appointments Today"
          value={stats.totalToday}
          icon={CalendarDays}
          color="primary"
        />
        <StatCard
          title="Upcoming"
          value={stats.upcoming}
          icon={CheckCircle2}
          color="green"
          trend="Scheduled for today"
        />
        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={XCircle}
          color="red"
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="blue"
        />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-text-dark mb-5">Today&apos;s Schedule</h2>
        <AppointmentTable
          appointments={todayAppointments}
          columns={['patient', 'doctor', 'time', 'status']}
          showActions={false}
        />
      </div>
    </div>
  )
}
