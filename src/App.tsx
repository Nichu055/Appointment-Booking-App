import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import Form from './pages/Form';
import ClinicLogin from './ClinicStaff/Login';
import ClinicDashboard from './ClinicStaff/Dashboard';
import ClinicProfile from './ClinicStaff/Profile';
import ClinicAppointments from './ClinicStaff/Appointments';
import ViewAppointment from './ClinicStaff/ViewAppointment';
import NotFound from './pages/NotFound';
import Notification from './components/Notification';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },{
        path: '/form',
        element: <Form />,
      }
    ],
  },
  {
    path: '/clinic',
    element: <ClinicLogin />,
  },
  {
    path: '/clinic/dashboard',
    element: <ClinicDashboard />,
    children: [
      {
        path: 'profile',
        element: <ClinicProfile />,
      },
      {
        path: 'appointments',
        element: <ClinicAppointments />,
      },
      {
        path: 'view/:id',
        element: <ViewAppointment />,
      }

    ],
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

function App() {
  return (
    <>
      <Notification />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
