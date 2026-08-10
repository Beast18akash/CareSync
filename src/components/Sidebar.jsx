import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Calendar,
  Users,
  Settings,
  Stethoscope,
  UserRound,
  BarChart3,
} from 'lucide-react'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/appointments', icon: ClipboardList, label: 'Appointments' },
  { path: '/book-appointment', icon: CalendarPlus, label: 'Book Appointment' },
  { path: '/doctors', icon: UserRound, label: 'Doctors' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/reports', icon: BarChart3, label: 'Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

function CareSyncLogo() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white shadow-lg shadow-primary/20">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    </div>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          w-64 min-h-screen bg-white/90 backdrop-blur-xl border-r border-slate-200/80 flex flex-col fixed left-0 top-0 z-30
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          shadow-glass
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <CareSyncLogo />
            <div>
              <h1 className="text-lg font-bold text-text-dark">CareSync</h1>
              <p className="text-xs text-text-muted">Clinic Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium group relative overflow-hidden
                ${isActive
                  ? 'bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm border-l-4 border-l-primary'
                  : 'text-text-muted hover:bg-slate-50 hover:text-text-dark border-l-4 border-l-transparent'
                }
                `
              }
            >
              <Icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110" strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
