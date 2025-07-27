import { useState, useRef } from 'react';
import { Pencil, Phone, Mail, Building2, CalendarCheck2, Camera, Check } from 'lucide-react';
import { notifySuccess, notifyError } from '../components/Notification';
import { user } from './context/userData';

const getInitials = (name: string) => {
  const parts = name.split(' ');
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase();
};

const countryCodes = [
  { code: '+1', label: 'US/Canada' },
  { code: '+44', label: 'UK' },
  { code: '+91', label: 'India' },
  // ...add more as needed
];

const Profile = () => {
  const [available, setAvailable] = useState(true);
  const [countryCode, setCountryCode] = useState('+1');
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    role: 'Clinic Staff',
    phone: '555-123-4567', // Remove country code from initial value
    address: '123 Main St, Springfield',
    department: 'General Medicine',
    joined: 'Jan 10, 2022',
    avatar: user.avatar, // base64 or url
  });
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (!available) {
      notifySuccess('You are now marked as available.');
    } else {
      notifyError('You are now marked as unavailable.');
    }
    setAvailable(!available);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const validateProfile = () => {
    if (!profile.name.trim()) {
      notifyError('Name is required.');
      return false;
    }
    if (!profile.email.trim() || !profile.email.includes('@')) {
      notifyError('Valid email is required.');
      return false;
    }
    if (!profile.phone.trim()) {
      notifyError('Phone number is required.');
      return false;
    }
    // Add more validation as needed
    return true;
  };

  const handleEdit = () => {
    if (editing) {
      if (!validateProfile()) return;
      notifySuccess('Profile updated!');
    }
    setEditing((prev) => !prev);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
        notifySuccess('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow p-8">
      <div className="flex items-center justify-between">
        <div className="relative flex-shrink-0 mr-6 flex flex-col items-center">
          <div className="relative">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-600"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-2 border-blue-600">
                {getInitials(profile.name)}
              </div>
            )}
            <button
              type="button"
              className="absolute bottom-2 right-2 bg-white rounded-full p-1 border shadow"
              onClick={() => fileInputRef.current?.click()}
              title="Change profile picture"
            >
              <Camera size={16} className="text-blue-600" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>
          <h2 className="text-2xl font-bold text-blue-700 mt-3 mb-1">{profile.name}</h2>
          <span className="text-sm text-gray-500 mb-2">{profile.role}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleToggle}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              available
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {available ? 'Available' : 'Unavailable'}
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {editing ? <Check size={18} /> : <Pencil size={18} />}
            {editing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            <Mail size={18} /> Email
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            <Phone size={18} /> Phone
          </label>
          <div className="relative flex items-center">
            <select
              value={countryCode}
              onChange={handleCountryCodeChange}
              disabled={!editing}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent pr-6 text-gray-700 focus:outline-blue-600"
              style={{ minWidth: '70px' }}
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border px-20 py-2 focus:outline-blue-600"
              placeholder="Phone number"
              style={{ paddingLeft: '80px' }}
            />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            <Building2 size={18} /> Department
          </label>
          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            <CalendarCheck2 size={18} /> Joined
          </label>
          <input
            type="text"
            name="joined"
            value={profile.joined}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-gray-700 font-semibold">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded px-3 py-2 focus:outline-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;