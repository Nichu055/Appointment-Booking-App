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
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-12 mt-16 text-center border border-red-200">
        <h2 className="text-2xl font-extrabold text-red-600 mb-6">Appointment not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-12 border border-blue-200">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-8 tracking-tight text-center">Appointment Details</h2>
      <div className="space-y-6 mb-2">
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-44">Patient:</span>
          <span className="text-lg text-gray-900">{appointment.patient}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-44">Email:</span>
          <span className="text-lg text-gray-900">{appointment.email}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-44">Phone:</span>
          <span className="text-lg text-gray-900">{appointment.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-44">Reason for Visit:</span>
          <span className="text-lg text-gray-900">{appointment.reason}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-gray-700 w-44">Date/Time:</span>
          <span className="text-lg text-gray-900">{appointment.datetime}</span>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-gray-700 mb-2 font-semibold text-lg">Reschedule Date/Time</label>
        <input
          type="datetime-local"
          value={newDateTime}
          onChange={e => setNewDateTime(e.target.value)}
          className="w-full border-2 border-blue-300 rounded-lg px-4 py-3 focus:outline-blue-600 text-lg shadow-sm transition"
        />
      </div>
      <button
        onClick={handleReschedule}
        className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-800 transition"
      >
        Reschedule
      </button>
    </div>
  );
};

export default ViewAppointment;
