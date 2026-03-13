import { useState, useMemo } from 'react'
import { PageHeader } from '../components/ui'
import { useAppointments } from '../context/AppointmentsContext'
import { CheckCircle } from 'lucide-react'

const today = new Date().toISOString().split('T')[0]

export default function BookAppointment() {
  const {
    addAppointment,
    getBookedSlots,
    DOCTORS,
    TIME_SLOTS,
  } = useAppointments()

  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: DOCTORS[0],
    date: today,
    time: '',
    reason: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const bookedSlots = useMemo(
    () => getBookedSlots(formData.date, formData.doctor),
    [formData.date, formData.doctor, getBookedSlots]
  )

  const availableSlots = useMemo(
    () => TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot)),
    [bookedSlots, TIME_SLOTS]
  )

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'date' || field === 'doctor') {
      setFormData((prev) => ({ ...prev, time: '' }))
    }
    setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.patientName.trim()) newErrors.patientName = 'Required'
    if (!formData.patientPhone.trim()) newErrors.patientPhone = 'Required'
    if (!formData.patientEmail.trim()) newErrors.patientEmail = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Invalid email'
    }
    if (!formData.doctor) newErrors.doctor = 'Required'
    if (!formData.date) newErrors.date = 'Required'
    if (!formData.time) newErrors.time = 'Please select a time slot'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      addAppointment(formData)
      setSuccess(true)
      setFormData({
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        doctor: DOCTORS[0],
        date: today,
        time: '',
        reason: '',
      })
      setTimeout(() => setSuccess(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <PageHeader
        title="Book Appointment"
        subtitle="Schedule a new patient appointment"
      />

      <form onSubmit={handleSubmit} className="card space-y-6">
        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
            <CheckCircle className="h-5 w-5 shrink-0" strokeWidth={2} />
            Appointment booked successfully!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => handleChange('patientName', e.target.value)}
              className={`input-field ${errors.patientName ? 'border-rose-300 focus:ring-rose-200' : ''}`}
              placeholder="Full name"
            />
            {errors.patientName && (
              <p className="text-rose-600 text-xs mt-1.5">{errors.patientName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.patientPhone}
              onChange={(e) => handleChange('patientPhone', e.target.value)}
              className={`input-field ${errors.patientPhone ? 'border-rose-300 focus:ring-rose-200' : ''}`}
              placeholder="555-0000"
            />
            {errors.patientPhone && (
              <p className="text-rose-600 text-xs mt-1.5">{errors.patientPhone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.patientEmail}
            onChange={(e) => handleChange('patientEmail', e.target.value)}
            className={`input-field ${errors.patientEmail ? 'border-rose-300 focus:ring-rose-200' : ''}`}
            placeholder="patient@email.com"
          />
          {errors.patientEmail && (
            <p className="text-rose-600 text-xs mt-1.5">{errors.patientEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Doctor *
          </label>
          <select
            value={formData.doctor}
            onChange={(e) => handleChange('doctor', e.target.value)}
            className="input-field"
          >
            {DOCTORS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={today}
              className={`input-field ${errors.date ? 'border-rose-300 focus:ring-rose-200' : ''}`}
            />
            {errors.date && (
              <p className="text-rose-600 text-xs mt-1.5">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Time Slot *
            </label>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => {
                const isBooked = bookedSlots.includes(slot)
                const isSelected = formData.time === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => !isBooked && handleChange('time', slot)}
                    disabled={isBooked}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isBooked
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-100 text-text-dark hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {parseInt(slot.split(':')[0], 10) % 12 || 12}:{slot.split(':')[1]}{' '}
                    {parseInt(slot.split(':')[0], 10) >= 12 ? 'PM' : 'AM'}
                  </button>
                )
              })}
            </div>
            {errors.time && (
              <p className="text-rose-600 text-xs mt-1.5">{errors.time}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Appointment Reason
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => handleChange('reason', e.target.value)}
            className="input-field min-h-[100px] resize-none"
            placeholder="Brief description of visit reason..."
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  )
}
