import { useState, useMemo } from 'react'
import Modal from '../components/Modal'
import { useAppointments } from '../context/AppointmentsContext'

export default function Patients() {
  const { patients, addPatient } = useAppointments()
  const [search, setSearch] = useState('')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const filteredPatients = useMemo(() => {
    if (!search.trim()) return patients
    const s = search.toLowerCase()
    return patients.filter(
      (p) =>
        p.name?.toLowerCase().includes(s) ||
        p.email?.toLowerCase().includes(s) ||
        p.phone?.includes(search)
    )
  }, [patients, search])

  const handleAddPatient = (e) => {
    e.preventDefault()
    if (!newPatient.name || !newPatient.phone || !newPatient.email) return
    addPatient(newPatient)
    setNewPatient({ name: '', phone: '', email: '' })
    setAddModalOpen(false)
  }

  const handleViewDetail = (patient) => {
    setSelectedPatient(patient)
    setDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">Patients</h1>
          <p className="text-text-muted mt-1">Manage patient records</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <PlusIcon className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      <div className="card">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Patient Name</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Phone</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Email</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Last Visit</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-text-muted">Upcoming Appointment</th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-muted">
                    No patients found
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-text-dark">{patient.name}</p>
                    </td>
                    <td className="py-4 px-4 text-text-dark">{patient.phone}</td>
                    <td className="py-4 px-4 text-text-dark">{patient.email}</td>
                    <td className="py-4 px-4 text-text-dark">{patient.lastVisit}</td>
                    <td className="py-4 px-4 text-text-dark">{patient.upcomingAppointment}</td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleViewDetail(patient)}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Patient"
      >
        <form onSubmit={handleAddPatient} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">Name *</label>
            <input
              type="text"
              value={newPatient.name}
              onChange={(e) => setNewPatient((p) => ({ ...p, name: e.target.value }))}
              className="input-field"
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">Phone *</label>
            <input
              type="tel"
              value={newPatient.phone}
              onChange={(e) => setNewPatient((p) => ({ ...p, phone: e.target.value }))}
              className="input-field"
              placeholder="555-0000"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">Email *</label>
            <input
              type="email"
              value={newPatient.email}
              onChange={(e) => setNewPatient((p) => ({ ...p, email: e.target.value }))}
              className="input-field"
              placeholder="patient@email.com"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Add Patient
            </button>
            <button
              type="button"
              onClick={() => setAddModalOpen(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Patient Details"
      >
        {selectedPatient && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-text-muted">Name</p>
              <p className="font-medium text-text-dark">{selectedPatient.name}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Phone</p>
              <p className="font-medium text-text-dark">{selectedPatient.phone}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Email</p>
              <p className="font-medium text-text-dark">{selectedPatient.email}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Last Visit</p>
              <p className="font-medium text-text-dark">{selectedPatient.lastVisit}</p>
            </div>
            <div>
              <p className="text-sm text-text-muted">Upcoming Appointment</p>
              <p className="font-medium text-text-dark">{selectedPatient.upcomingAppointment}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function PlusIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}
