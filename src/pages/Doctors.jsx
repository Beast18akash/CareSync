import { PageHeader } from '../components/ui'
import { useAppointments } from '../context/AppointmentsContext'
import { Stethoscope } from 'lucide-react'

function DoctorAvatar({ name }) {
  const initials = name?.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff&size=128`

  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-2xl overflow-hidden bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center shadow-lg shadow-primary/20 relative">
        <img
          src={avatarUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            const fb = e.target.nextElementSibling
            if (fb) fb.classList.remove('hidden')
          }}
        />
        <div className="h-full w-full hidden absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8]">
          {initials}
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg bg-success flex items-center justify-center">
        <span className="text-white text-xs">✓</span>
      </div>
    </div>
  )
}

export default function Doctors() {
  const { DOCTOR_PROFILES } = useAppointments()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Doctors"
        subtitle="Clinic medical staff and specializations"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DOCTOR_PROFILES?.map((doctor, i) => (
          <div
            key={doctor.name}
            className="card group hover:shadow-gradient-card hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 transition-transform duration-300 group-hover:scale-105">
                <DoctorAvatar name={doctor.name} />
              </div>
              <h3 className="font-semibold text-text-dark">{doctor.name}</h3>
              <p className="text-sm text-primary font-medium mt-1">{doctor.specialization}</p>
              <p className="text-xs text-text-muted mt-2 flex items-center justify-center gap-1">
                <Stethoscope className="h-3.5 w-3" strokeWidth={1.75} />
                {doctor.available}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
