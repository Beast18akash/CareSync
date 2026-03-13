import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  Calendar,
  Users,
  Settings,
  Stethoscope,
} from 'lucide-react'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/book-appointment', icon: CalendarPlus, label: 'Book Appointment' },
  { path: '/appointments', icon: ClipboardList, label: 'Appointments' },
  { path: '/calendar', icon: Calendar, label: 'Calendar' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`
          w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col fixed left-0 top-0 z-30
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Stethoscope className="h-5 w-5" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text-dark">ClinicPro</h1>
              <p className="text-xs text-text-muted">Appointment System</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(({ path, icon: Icon, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-muted hover:bg-slate-100 hover:text-text-dark'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
