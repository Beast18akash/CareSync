import { useMemo } from 'react'
import DashboardCard from '../components/DashboardCard'
import AppointmentTable from '../components/AppointmentTable'
import { useAppointments } from '../context/AppointmentsContext'

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function CheckCircleIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function XCircleIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Dashboard</h1>
        <p className="text-text-muted mt-1">Overview of your clinic today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Appointments Today"
          value={stats.totalToday}
          icon={CalendarIcon}
          color="primary"
        />
        <DashboardCard
          title="Upcoming"
          value={stats.upcoming}
          icon={CheckCircleIcon}
          color="green"
          trend="Scheduled for today"
        />
        <DashboardCard
          title="Cancelled"
          value={stats.cancelled}
          icon={XCircleIcon}
          color="red"
        />
        <DashboardCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={UsersIcon}
          color="blue"
        />
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-text-dark mb-4">Today's Schedule</h2>
        <AppointmentTable
          appointments={todayAppointments}
          columns={['patient', 'doctor', 'time', 'status']}
          showActions={false}
        />
      </div>
    </div>
  )
}
