import { LogOut, User, CalendarDays, Menu } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { useState } from 'react'; 
import { getCurrentUser } from '../api/mockApi';

const Sidebar = ({
  setLoading,
  isOpen,
  onClose,
}: {
  setLoading: (v: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

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
      navigate('/clinic');
    }, 800);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow flex flex-col py-8 px-4 justify-between transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:h-screen md:w-60`}
      >
        <div>
          <div className="flex items-center">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-14 h-14 rounded-full border-2 border-blue-200 shadow mr-3"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">{user?.name}</span>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-10">
            <button
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
              onClick={() => {
                handleNavigate('/clinic/dashboard/profile');
                onClose();
              }}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            <button
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 py-2"
              onClick={() => {
                handleNavigate('/clinic/dashboard/appointments');
                onClose();
              }}
            >
              <CalendarDays size={20} />
              <span>Appointments</span>
            </button>
          </div>
        </div>
        <div>
          <button
            className="flex items-center gap-3 text-gray-700 hover:text-red-600 py-2"
            onClick={() => {
              handleLogout();
              onClose();
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
      </aside>
    </>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isDashboardRoot = location.pathname === '/clinic/dashboard';

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={28} />
      </button>
      <Sidebar setLoading={setLoading} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center overflow-auto">
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