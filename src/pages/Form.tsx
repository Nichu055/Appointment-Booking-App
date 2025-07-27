import { useState } from 'react';
import { notifySuccess, notifyError } from '../notification/Notification';

const staffOptions = [
  { value: '', label: 'No preference' },
  { value: 'dr-smith', label: 'Dr. Smith' },
  { value: 'nurse-jane', label: 'Nurse Jane' },
  { value: 'dr-lee', label: 'Dr. Lee' },
];

const countryCodes = [
  { code: '+1', label: 'US/Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+234', label: 'Nigeria (+234)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+81', label: 'Japan (+81)' },
];

const Form = () => {
  const [form, setForm] = useState({
    name: '',
    datetime: '',
    reason: '',
    phone: '',
    email: '',
    staff: '',
    countryCode: '+1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validation checks
    if (!form.name || !form.datetime || !form.reason || !form.phone || !form.email) {
      notifyError('Please fill in all required fields.');
      return;
    }
    // check valid email format
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      notifyError('Please enter a valid email address.');
      return;
    }
    // check phone number length
    if (form.phone.length < 7) {
      notifyError('Please enter a valid phone number.');
      return;
    }

    notifySuccess('Appointment submitted successfully!');
    
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
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Date/Time</label>
        <input
          type="datetime-local"
          name="datetime"
          value={form.datetime}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Reason for Visit</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          rows={3}
          
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1 focus:outline-blue-600">Phone Number</label>
        <div className="flex space-x-2">
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={handleChange}
            className="border rounded px-3 py-2 focus:outline-blue-600"
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>{c.label}</option>
            ))}
          </select>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
            
            placeholder="Phone number"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Clinic Staff (optional)</label>
        <select
          name="staff"
          value={form.staff}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-blue-600"
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
