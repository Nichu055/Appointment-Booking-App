import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from '../components/Notification';
import Loader from '../components/Loader';
import { login } from '../api/mockApi';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      notifyError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    login(form.username, form.password).then(profile => {
      setLoading(false);
      if (profile) {
        notifySuccess('Login successful!');
        navigate('/clinic/dashboard');
      } else {
        notifyError('Invalid username or password.');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      {loading ? (
        <Loader size={48} />
      ) : (
        <form
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Admin Login</h2>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-blue-600"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-blue-600 pr-10"
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-blue-600 text-sm focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? <Loader size={20} /> : 'Login'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
