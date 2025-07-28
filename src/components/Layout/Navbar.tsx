import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md mb-9">
      <div className="container mx-auto px-4 py-4 flex justify-center items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 text-center w-full">
          MediBook
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;