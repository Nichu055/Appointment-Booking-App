import { LogOut, User, CalendarDays } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { useState } from 'react';
import { user } from './context/userData'; 

const Sidebar = ({ setLoading }: { setLoading: (v: boolean) => void }) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(path);
    }, 800);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin');
    }, 800);
  };

  return (
    <aside className="h-screen w-60 bg-white shadow flex flex-col py-8 px-4 justify-between">
      <div>
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-blue-200 shadow mr-3"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">{user.name}</span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-10">
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
            onClick={() => handleNavigate('/admin/dashboard/profile')}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
            onClick={() => handleNavigate('/admin/dashboard/appointments')}
          >
            <CalendarDays size={20} />
            <span>Appointments</span>
          </button>
        </div>
      </div>
      <div>
        <button
          className="flex items-center gap-3 text-gray-700 hover:text-red-600 py-2"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isDashboardRoot = location.pathname === '/admin/dashboard';

  return (
    <div className="flex min-h-screen">
      <Sidebar setLoading={setLoading} />
      <main className="flex-1 bg-blue-50 p-8 flex items-center justify-center">
        {loading ? (
          <Loader size={48} />
        ) : (
          <>
            {isDashboardRoot ? (
              <h1 className="text-2xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>
            ) : (
              <Outlet />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;