import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3 text-sm">

        {/* Left: Logo */}
        <NavLink
          to="/"
          className="text-amber-400 font-bold text-lg"
        >
          SocialApp
        </NavLink>

        {/* Center: Links */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-medium"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-medium"
                : "text-gray-300 hover:text-white"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-medium"
                : "text-gray-300 hover:text-white"
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Right: Search */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-gray-200 px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 w-40"
        />
      </nav>
    </header>
  );
};

export default Header;
