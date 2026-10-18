/**
 * Shared formatting utilities — single source of truth for date/time display.
 * Replaces 5 duplicated formatTime/formatDate implementations.
 */

export function formatTime(time) {
  if (!time) return '—'
  const [h, m] = time.split(':')
  const hour = parseInt(h, 10)
  if (Number.isNaN(hour)) return time
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${m} ${ampm}`
}

export function formatDate(dateStr, options) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', options || { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatDateLong(dateStr) {
  return formatDate(dateStr, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

export function toDateKey(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function todayKey() {
  return toDateKey(new Date())
}
