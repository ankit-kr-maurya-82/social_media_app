import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <aside className="w-64 fixed bg-gray-900 text-gray-200 h-screen p-4 border-r border-gray-800">
      {/* User Info */}
      {user && (
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user.avatar || "https://via.placeholder.com/40"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-white">{user.fullName}</h4>
            <p className="text-sm text-gray-400">@{user.username}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-amber-500 font-medium"
              : "hover:text-white transition"
          }
        >
          Home
        </NavLink>
        {user && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "text-amber-500 font-medium"
                : "hover:text-white transition"
            }
          >
            Profile
          </NavLink>
        )}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-amber-500 font-medium"
              : "hover:text-white transition"
          }
        >
          About
        </NavLink>
      </nav>

      {/* Suggestions or extra links */}
      <div className="mt-6">
        <h5 className="text-gray-400 text-sm mb-2">Suggestions</h5>
        <ul className="flex flex-col gap-1 text-gray-300 text-sm">
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Trending Topic</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
