import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import Form from './pages/Form';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AdminProfile from './admin/Profile';

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
    path: '/admin',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    children: [
      {
        path: 'profile',
        element: <AdminProfile />,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
