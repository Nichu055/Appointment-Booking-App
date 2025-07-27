import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { notifySuccess } from '../components/Notification';

const appointments = [
  {
    id: '1',
    patient: 'John Doe',
    email: 'john@example.com',
    phone: '+1 555-1234',
    reason: 'Checkup',
    datetime: '2024-06-03T10:00',
  },
  {
    id: '2',
    patient: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 555-5678',
    reason: 'Consultation',
    datetime: '2024-06-08T14:30',
  },
  {
    id: '3',
    patient: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1 555-4321',
    reason: 'Follow-up',
    datetime: '2024-06-15T09:00',
  },
  {
    id: '4',
    patient: 'Bob Lee',
    email: 'bob@example.com',
    phone: '+1 555-8765',
    reason: 'Dental',
    datetime: '2024-06-20T11:30',
  },
  {
    id: '5',
    patient: 'Carol King',
    email: 'carol@example.com',
    phone: '+1 555-6789',
    reason: 'Consultation',
    datetime: '2025-07-22T16:00',
  },
];

const ViewAppointment = () => {
  const { id } = useParams();
  const appointment = appointments.find(a => a.id === id);

  const [newDateTime, setNewDateTime] = useState(appointment?.datetime || '');

  const handleReschedule = () => {
    
    notifySuccess('Appointment rescheduled!');
  };

  if (!appointment) {
    return (
      <div className="max-w-md mx-auto bg-white rounded shadow p-8 mt-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Appointment not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Appointment Details</h2>
      <div className="space-y-3 mb-6">
        <div><span className="font-semibold">Patient:</span> {appointment.patient}</div>
        <div><span className="font-semibold">Email:</span> {appointment.email}</div>
        <div><span className="font-semibold">Phone:</span> {appointment.phone}</div>
        <div><span className="font-semibold">Reason for Visit:</span> {appointment.reason}</div>
        <div><span className="font-semibold">Date/Time:</span> {appointment.datetime}</div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-1 font-semibold">Reschedule Date/Time</label>
        <input
          type="datetime-local"
          value={newDateTime}
          onChange={e => setNewDateTime(e.target.value)}
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
        />
      </div>
      <button
        onClick={handleReschedule}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Reschedule
      </button>
    </div>
  );
};

export default ViewAppointment;
