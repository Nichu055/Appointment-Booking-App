const Navbar = () => (
  <nav className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <span className="text-xl font-bold text-blue-600">Appointment Booking App</span>
      <div>
        <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Features</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 px-3">Contact</a>
      </div>
    </div>
  </nav>
);

export default Navbar;

