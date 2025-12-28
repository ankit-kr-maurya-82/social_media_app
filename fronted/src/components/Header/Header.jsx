import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.js";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 text-sm">

        {/* Left: Logo */}
        <NavLink to="/" className="text-amber-400 font-bold text-lg">
          SocialApp
        </NavLink>

        {/* Center: Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-medium" : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-medium" : "text-gray-300 hover:text-white"
            }
          >
            About
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-amber-500 font-medium" : "text-gray-300 hover:text-white"
              }
            >
              Profile
            </NavLink>
          )}
        </div>

        {/* Right: User Actions */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-gray-200 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 w-40"
          />

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1.5 rounded-lg text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-gray-300 hover:text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-gray-300 hover:text-white"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
