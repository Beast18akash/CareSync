/**
 * Shared validation helpers — used by both frontend forms
 * and mirrored server-side via Zod in the backend.
 */

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
}

export function isValidPhone(phone) {
  // Accepts various formats: 555-0101, +1 555 010 1010, (555) 010-1010, etc.
  const digits = String(phone).replace(/\D/g, '')
  return digits.length >= 7 && digits.length <= 15
}

export function validateAppointmentForm(data) {
  const errors = {}
  if (!data.patientName?.trim()) errors.patientName = 'Patient name is required'
  else if (data.patientName.trim().length < 2) errors.patientName = 'Name must be at least 2 characters'
  if (!data.patientPhone?.trim()) errors.patientPhone = 'Phone is required'
  else if (!isValidPhone(data.patientPhone)) errors.patientPhone = 'Enter a valid phone number'
  if (!data.patientEmail?.trim()) errors.patientEmail = 'Email is required'
  else if (!isValidEmail(data.patientEmail)) errors.patientEmail = 'Enter a valid email address'
  if (!data.doctor) errors.doctor = 'Please select a doctor'
  if (!data.date) errors.date = 'Date is required'
  else {
    const selected = new Date(data.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selected < today) errors.date = 'Date cannot be in the past'
  }
  if (!data.time) errors.time = 'Please select a time slot'
  return errors
}

export function validatePatientForm(data) {
  const errors = {}
  if (!data.name?.trim()) errors.name = 'Name is required'
  else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!data.phone?.trim()) errors.phone = 'Phone is required'
  else if (!isValidPhone(data.phone)) errors.phone = 'Enter a valid phone number'
  if (!data.email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(data.email)) errors.email = 'Enter a valid email address'
  return errors
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  if (!email?.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'
  return errors
}
