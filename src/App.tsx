import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Layout/RootLayout';
import Home from './pages/Home';
import Form from './pages/Form';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
