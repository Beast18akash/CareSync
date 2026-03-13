import { useState, useMemo } from 'react'
import { useAppointments } from '../context/AppointmentsContext'

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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Book Appointment</h1>
        <p className="text-text-muted mt-1">Schedule a new patient appointment</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5">
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
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
              className={`input-field ${errors.patientName ? 'border-red-500' : ''}`}
              placeholder="Full name"
            />
            {errors.patientName && (
              <p className="text-red-500 text-xs mt-1">{errors.patientName}</p>
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
              className={`input-field ${errors.patientPhone ? 'border-red-500' : ''}`}
              placeholder="555-0000"
            />
            {errors.patientPhone && (
              <p className="text-red-500 text-xs mt-1">{errors.patientPhone}</p>
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
            className={`input-field ${errors.patientEmail ? 'border-red-500' : ''}`}
            placeholder="patient@email.com"
          />
          {errors.patientEmail && (
            <p className="text-red-500 text-xs mt-1">{errors.patientEmail}</p>
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
              className={`input-field ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date}</p>
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
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isBooked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : isSelected
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-text-dark hover:bg-primary-light hover:text-primary'
                    }`}
                  >
                    {parseInt(slot.split(':')[0], 10) % 12 || 12}:{slot.split(':')[1]}{' '}
                    {parseInt(slot.split(':')[0], 10) >= 12 ? 'PM' : 'AM'}
                  </button>
                )
              })}
            </div>
            {errors.time && (
              <p className="text-red-500 text-xs mt-1">{errors.time}</p>
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
