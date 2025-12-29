import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

const Sidebar = () => {
   const { user, setUser } = useContext(UserContext);
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside className="w-64 fixed top-14 left-0 bg-gray-900 text-gray-200 h-[calc(100vh-4rem)] p-4 border-r border-gray-800 relative">

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-amber-500 font-medium" : "hover:text-white transition"
          }
        >
          Home
        </NavLink>

        {user && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-medium" : "hover:text-white transition"
            }
          >
            Profile
          </NavLink>
        )}

        <NavLink
          to="/post"
          className={({ isActive }) =>
            isActive ? "text-amber-500 font-medium" : "hover:text-white transition"
          }
        >
          Post
        </NavLink>
      </nav>

     
      {/* User Info (Bottom) */}
      {user && (
        <div className="absolute bottom-5 left-4 right-4 flex items-center gap-3 border-t border-gray-800 pt-3">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-white">{user?.fullName || "Guest"}</h4>
            <p className="text-sm text-gray-400">@{user?.username || "guest"}</p>
          </div>
        </div>
        
      )}
      
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
    </aside>
  );
};

export default Sidebar;
