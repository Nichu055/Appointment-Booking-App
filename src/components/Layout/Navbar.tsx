import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <span className="text-xl font-bold text-blue-600">Appoint Booking</span>
        {/* Desktop links */}
        <div className="hidden md:flex">
          {/* <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Home</a> */}
          <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Features</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Login</a>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-blue-600 border-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden absolute right-4 top-full w-40 bg-white rounded shadow px-4 py-2 z-10">
            {/* <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Home</a> */}
            <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Features</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Login</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

