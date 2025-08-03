import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          🚀 JobPortal
        </h1>
        <div className="space-x-8 text-lg font-medium">
          <Link to="/" className="text-white hover:text-yellow-300 transition duration-200">
            Home
          </Link>
          <Link to="/jobs" className="text-white hover:text-yellow-300 transition duration-200">
            Jobs
          </Link>
          <Link to="/profile" className="text-white hover:text-yellow-300 transition duration-200">
            Profile
          </Link>
          <Link to="/login" className="text-white hover:text-yellow-300 transition duration-200">
            Login
          </Link>
          <Link to="/post-job" className="text-white hover:text-yellow-300 transition duration-200">
            PostJob
          </Link>
        </div>
      </div>
    </nav>
  );
}
