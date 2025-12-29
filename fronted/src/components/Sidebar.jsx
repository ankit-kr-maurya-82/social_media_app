import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./sidebar.css";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
          )}

          <button
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Post
          </button>
        </nav>

        {/* Bottom Section */}
        <div className="sidebar-bottom">
          {user ? (
            <>
              <div className="user-info">
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt="avatar"
                />
                <div>
                  <h4>{user.fullName || "Guest"}</h4>
                  <p>@{user.username || "guest"}</p>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="auth-links">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
