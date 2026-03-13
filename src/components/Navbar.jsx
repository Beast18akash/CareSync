import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react'

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onMenuClick?.()}
          className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 text-text-muted hover:text-text-dark transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <h2 className="text-base font-semibold text-text-dark">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-text-muted hover:text-text-dark transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" strokeWidth={1.75} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
          </button>
          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-slate-200/80 py-3 z-20">
                <p className="px-4 py-2 text-sm font-semibold text-text-dark">Notifications</p>
                <p className="px-4 py-8 text-sm text-text-muted text-center">
                  No new notifications
                </p>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 pr-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-text-dark">{user?.name || 'User'}</p>
              <p className="text-xs text-text-muted">
                {user?.role === 'doctor' ? 'Doctor' : 'Receptionist'}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-text-muted shrink-0" strokeWidth={2} />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-elevated border border-slate-200/80 py-1 z-20">
                <button
                  onClick={logout}
                  className="w-full px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="h-4 w-4" strokeWidth={2} />
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
