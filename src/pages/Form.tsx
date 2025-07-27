import { useState, useEffect } from 'react';
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

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaValid, setCaptchaValid] = useState(false);

  useEffect(() => {
    setCaptcha({
      a: getRandomInt(1, 9),
      b: getRandomInt(1, 9),
    });
    setCaptchaAnswer('');
    setCaptchaValid(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'captchaAnswer') {
      setCaptchaAnswer(value);
      setCaptchaValid(Number(value) === captcha.a + captcha.b);
    }  {
      setForm({ ...form, [name]: value });
    }
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
    // check not a robot
    if (!captchaValid) {
      notifyError('Captcha failed. Please solve the challenge.');
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
      <div>
        <label className="block text-gray-700 mb-1 mt-10">Verify you're not a robot</label>
        <div className="flex items-center space-x-2 ">
          <span className="text-gray-700 font-medium">
            What is {captcha.a} + {captcha.b}?
          </span>
          <input
            type="text"
            name="captchaAnswer"
            value={captchaAnswer}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-20 focus:outline-blue-600"
            autoComplete="off"
          />
        </div>
        {!captchaValid && captchaAnswer && (
          <span className="text-red-600 text-sm">Incorrect answer</span>
        )}
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