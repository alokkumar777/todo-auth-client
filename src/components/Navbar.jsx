import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Todo App
        </Link>
        <ul className="flex items-center space-x-6">
          {user ? (
            <li>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
