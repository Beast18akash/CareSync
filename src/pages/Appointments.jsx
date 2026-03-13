import { useState, useMemo } from 'react'
import AppointmentTable from '../components/AppointmentTable'
import Modal from '../components/Modal'
import { useAppointments } from '../context/AppointmentsContext'

export default function Appointments() {
  const {
    appointments,
    updateAppointment,
    cancelAppointment,
    completeAppointment,
    DOCTORS,
  } = useAppointments()

  const [search, setSearch] = useState('')
  const [filterDoctor, setFilterDoctor] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({})

  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchSearch =
        !search ||
        apt.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        apt.doctor?.toLowerCase().includes(search.toLowerCase())
      const matchDoctor = !filterDoctor || apt.doctor === filterDoctor
      const matchStatus = !filterStatus || apt.status === filterStatus
      const matchDate = !filterDate || apt.date === filterDate
      return matchSearch && matchDoctor && matchStatus && matchDate
    })
  }, [appointments, search, filterDoctor, filterStatus, filterDate])

  const handleEdit = (apt) => {
    setSelectedAppointment(apt)
    setEditData({
      doctor: apt.doctor,
      date: apt.date,
      time: apt.time,
      reason: apt.reason,
    })
    setEditModalOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedAppointment) {
      updateAppointment(selectedAppointment.id, editData)
      setEditModalOpen(false)
      setSelectedAppointment(null)
    }
  }

  const handleCancel = (apt) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(apt.id)
    }
  }

  const handleComplete = (apt) => {
    completeAppointment(apt.id)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Appointments</h1>
        <p className="text-text-muted mt-1">Manage all appointments</p>
      </div>

      <div className="card space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by patient or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
            />
          </div>
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="input-field max-w-[180px]"
          >
            <option value="">All Doctors</option>
            {DOCTORS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input-field max-w-[150px]"
          >
            <option value="">All Status</option>
            <option value="booked">Booked</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input-field max-w-[160px]"
          />
        </div>

        <AppointmentTable
          appointments={filteredAppointments}
          onEdit={handleEdit}
          onReschedule={handleEdit}
          onCancel={handleCancel}
          onComplete={handleComplete}
        />
      </div>

      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit / Reschedule Appointment"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <p className="text-sm text-text-muted">
              Patient: <span className="font-medium text-text-dark">{selectedAppointment.patientName}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Doctor</label>
              <select
                value={editData.doctor}
                onChange={(e) => setEditData((p) => ({ ...p, doctor: e.target.value }))}
                className="input-field"
              >
                {DOCTORS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Date</label>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData((p) => ({ ...p, date: e.target.value }))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-dark mb-2">Time</label>
                <input
                  type="text"
                  value={editData.time}
                  onChange={(e) => setEditData((p) => ({ ...p, time: e.target.value }))}
                  className="input-field"
                  placeholder="09:00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark mb-2">Reason</label>
              <textarea
                value={editData.reason}
                onChange={(e) => setEditData((p) => ({ ...p, reason: e.target.value }))}
                className="input-field min-h-[80px]"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveEdit} className="btn-primary flex-1">
                Save Changes
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
