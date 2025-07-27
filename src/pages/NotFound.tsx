import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
    <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
    <p className="text-lg text-gray-600 mb-8">Page not found.</p>
    <Link
      to="/"
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
