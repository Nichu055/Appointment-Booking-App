import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAppointments } from '../api/mockApi';

function getDatesOfMonth(year: number, month: number) {
  const dates = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

const Appointments = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().slice(0, 10)); // YYYY-MM-DD

  const appointments = getAppointments(); // Use mock API

  const dates = getDatesOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getAppointmentForDate = (date: Date) =>
    appointments.find(a => a.datetime.slice(0, 10) === date.toISOString().slice(0, 10));

  return (
    <div className="w-full bg-white rounded-lg shadow p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div className="flex gap-2 items-center">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handlePrevMonth}
          >
            Prev
          </button>
          <select
            value={currentMonth}
            onChange={e => setCurrentMonth(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={e => setCurrentYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 10 }).map((_, i) => {
              const year = today.getFullYear() - 5 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleNextMonth}
          >
            Next
          </button>
        </div>
        <h2 className="text-xl font-bold text-blue-700">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-500">{day}</div>
        ))}
        {dates.map(date => {
          const appointment = getAppointmentForDate(date);
          const dateStr = date.toISOString().slice(0, 10);
          const isSelected = dateStr === selectedDate;
          return (
            <div
              key={date.toISOString()}
              className={`h-14 flex flex-col items-center justify-center border rounded cursor-pointer relative
                ${appointment ? 'border-green-500' : 'border-gray-200'}
                ${isSelected ? 'bg-blue-100 border-blue-600' : ''}
                hover:bg-blue-50`}
              onClick={() => {
                setSelectedDate(dateStr);
                if (appointment) navigate(`/admin/dashboard/view/${appointment.id}`);
              }}
            >
              <span className="font-bold">{date.getDate()}</span>
              {appointment && (
                <span className="w-8 h-1 bg-green-500 rounded absolute left-1/2 -translate-x-1/2 bottom-1"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Appointments;