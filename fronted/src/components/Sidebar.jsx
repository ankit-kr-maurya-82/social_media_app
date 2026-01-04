import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./CSS/Sidebar.css";

const Sidebar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Navigation */}
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          {user && (
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              Profile
            </NavLink>
          )}

          {user && (
            <button
              className="sidebar-btn"
              onClick={() => {
                setOpen(false);
                navigate("/create-post");
              }}
            >
              Create Post
            </button>
          )}
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
                  <h4>{user.fullName}</h4>
                  <p>@{user.username}</p>
                </div>
              </div>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="auth-links">
              <NavLink to="/login" onClick={() => setOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
