/**
 * ID generation — uses crypto.randomUUID when available, falls back to Math.random.
 */
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().slice(0, 9)
  }
  return Math.random().toString(36).slice(2, 11)
}
