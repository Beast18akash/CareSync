import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { StatCard, PageHeader } from '../components/ui'
import AppointmentTable from '../components/AppointmentTable'
import { useAppointments } from '../context/AppointmentsContext'
import { HealthcareHero } from '../components/illustrations'
import { CalendarDays, Stethoscope, Users, CheckCircle2, CalendarPlus, ClipboardList } from 'lucide-react'

export default function Dashboard() {
  const { appointments, patients, DOCTORS } = useAppointments()

  const todayStr = new Date().toISOString().split('T')[0]

  const stats = useMemo(() => {
    const today = appointments.filter((a) => a.date === todayStr)
    const totalToday = today.length
    const completed = appointments.filter((a) => a.status === 'completed').length

    return {
      todayAppointments: totalToday,
      activeDoctors: DOCTORS.length,
      totalPatients: patients.length,
      completedConsultations: completed,
    }
  }, [appointments, patients, todayStr, DOCTORS])

  const todayAppointments = useMemo(
    () =>
      appointments
        .filter((a) => a.date === todayStr)
        .sort((a, b) => (a.time || '').localeCompare(b.time || '')),
    [appointments, todayStr]
  )

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2563EB] via-[#2563EB] to-[#38BDF8] p-8 md:p-12 shadow-xl shadow-primary/20 animate-fade-in-up">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Smart Clinic Appointment System
            </h1>
            <p className="text-blue-100 mt-3 text-lg">
              Real-time clinic performance and today&apos;s schedule. Manage your appointments with ease.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <CalendarPlus className="h-5 w-5" strokeWidth={2} />
                Book Appointment
              </Link>
              <Link
                to="/appointments"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <ClipboardList className="h-5 w-5" strokeWidth={2} />
                View Schedule
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-80 xl:w-96 shrink-0">
            <HealthcareHero className="w-full h-56" />
          </div>
        </div>
      </div>

      <PageHeader
        title="Hospital Operations Overview"
        subtitle="Real-time clinic performance and today's schedule"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={CalendarDays}
          color="primary"
          trend="Scheduled for today"
        />
        <StatCard
          title="Active Doctors"
          value={stats.activeDoctors}
          icon={Stethoscope}
          color="secondary"
        />
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="success"
        />
        <StatCard
          title="Completed Consultations"
          value={stats.completedConsultations}
          icon={CheckCircle2}
          color="success"
        />
      </div>

      <div className="card animate-fade-in-up">
        <h2 className="text-lg font-semibold text-text-dark mb-5">Today&apos;s Schedule</h2>
        <AppointmentTable
          appointments={todayAppointments}
          columns={['patient', 'doctor', 'time', 'status']}
          showActions={false}
        />
      </div>

      {/* Floating Action Button */}
      <Link
        to="/book-appointment"
        className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-110 transition-all duration-300"
        aria-label="Book appointment"
      >
        <CalendarPlus className="h-7 w-7" strokeWidth={2} />
      </Link>
    </div>
  )
}

