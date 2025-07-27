import { useState } from 'react';

const staffOptions = [
  { value: '', label: 'No preference' },
  { value: 'dr-smith', label: 'Dr. Smith' },
  { value: 'nurse-jane', label: 'Nurse Jane' },
  { value: 'dr-lee', label: 'Dr. Lee' },
];

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    datetime: '',
    reason: '',
    phone: '',
    email: '',
    staff: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission logic here
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Date/Time</label>
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Reason for Visit</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Clinic Staff (optional)</label>
        <select
          name="staff"
          value={form.staff}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {staffOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
