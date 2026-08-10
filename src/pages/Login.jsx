import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoginIllustration } from '../components/illustrations'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40 flex">
      {/* Left: Hero with illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#38BDF8]/5" />
        <div className="relative z-10 max-w-lg w-full animate-fade-in-up">
          <div className="mb-8">
            <h1 className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#38BDF8] bg-clip-text text-transparent leading-tight">
              Smart Clinic Appointment System
            </h1>
            <p className="text-lg text-text-muted mt-4 leading-relaxed">
              Streamline your clinic operations with an intelligent scheduling platform. 
              Manage appointments, patients, and doctors — all in one place.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-sm font-medium text-text-dark">Real-time scheduling</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-soft">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm font-medium text-text-dark">Patient management</span>
            </div>
          </div>
          <div className="mt-12 rounded-2xl overflow-hidden shadow-glass border border-white/50 bg-white/40 backdrop-blur-sm p-4">
            <LoginIllustration className="w-full h-64" />
          </div>
        </div>
      </div>

      {/* Right: Login form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-glass">
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] text-white mb-4 shadow-lg shadow-primary/25">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20M12 6v12M6 12h12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-dark">CareSync</h2>
              <p className="text-text-muted mt-1.5 text-sm">Sign in to your clinic dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="you@clinic.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">
                  Role
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="receptionist"
                      checked={role === 'receptionist'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Receptionist</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={role === 'doctor'}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Doctor</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm font-medium animate-scale-in">
                  <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base"
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

              <a
                href="#"
                className="block text-center text-sm text-primary hover:underline font-medium transition-opacity hover:opacity-80"
              >
                Forgot password?
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
