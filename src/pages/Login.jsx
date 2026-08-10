import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('receptionist')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    setLoading(true)
    try {
      const name = role === 'doctor' ? 'Dr. User' : 'Receptionist'
      login(email, role, name)
      navigate('/', { replace: true })
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background-subtle min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans text-text-primary">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-soft-green-surface blur-[120px] opacity-60 z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-surface-container-high blur-[140px] opacity-40 z-0 pointer-events-none" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-6xl px-8 py-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Branding & Value Prop */}
        <div className="hidden lg:flex flex-col flex-1 max-w-xl text-left animate-fade-in">
          <h1 className="text-primary mb-6 leading-tight text-5xl font-bold font-sans">
            Smart Clinic <br/>Appointment System
          </h1>
          <p className="text-on-surface-variant mb-10 max-w-md text-lg leading-relaxed font-sans">
            Streamline your clinic operations with an intelligent scheduling platform. Manage appointments, patients, and doctors — all in one place.
          </p>
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] font-bold">check_circle</span>
              <span className="text-sm font-medium text-on-surface-variant font-sans">Real-time scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px] font-bold">check_circle</span>
              <span className="text-sm font-medium text-on-surface-variant font-sans">Patient management</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md bg-surface-white rounded-xl border border-border-quiet p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up">
          {/* Logo Header */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="CareSync Logo" className="h-28 w-auto object-contain mb-2" />
            <p className="text-xs text-on-surface-variant font-sans">Sign in to your clinic dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-2 font-sans" htmlFor="email">
                Email
              </label>
              <input
                className="w-full h-11 px-4 bg-surface-white border border-border-quiet rounded-lg text-sm text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-sans"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@clinic.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-2 font-sans" htmlFor="password">
                Password
              </label>
              <input
                className="w-full h-11 px-4 bg-surface-white border border-border-quiet rounded-lg text-sm text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors font-sans"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-3 font-sans">
                Role
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value="receptionist"
                    checked={role === 'receptionist'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-primary border-slate-300 focus:ring-primary focus:ring-offset-0 bg-surface-white"
                  />
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors font-sans">
                    Receptionist
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="role"
                    value="doctor"
                    checked={role === 'doctor'}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-4 h-4 text-primary border-slate-300 focus:ring-primary focus:ring-offset-0 bg-surface-white"
                  />
                  <span className="text-sm font-medium text-on-surface-variant group-hover:text-primary transition-colors font-sans">
                    Doctor
                  </span>
                </label>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20 text-danger text-xs font-medium animate-scale-in">
                <span className="material-symbols-outlined text-[16px]">error</span>
                <span className="font-sans">{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-secondary text-white font-semibold text-sm rounded-lg hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 flex justify-center items-center font-sans"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
              
              <div className="mt-6 text-center">
                <a className="text-xs text-secondary hover:text-primary font-semibold transition-colors font-sans" href="#">
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
