import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaPlus, FaHome, FaUser, FaCompass } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./CSS/Sidebar.css";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      {/* Mobile Toggle */}
      <button className="sidebar-toggle mobileOnly" onClick={() => setOpen(!open)}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Top */}
        <div className="sidebar-top">
          <h2 className="sidebar-logo">Sintax</h2>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <NavLink to="/" onClick={() => setOpen(false)}>
            <FaHome /> Home
          </NavLink>

          <NavLink to="/explore" onClick={() => setOpen(false)}>
            <FaCompass /> Explore
          </NavLink>

          {user && (
            <NavLink to="/profile" onClick={() => setOpen(false)}>
              <FaUser /> Profile
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
              <FaPlus /> Create Post
            </button>
          )}
        </nav>

        {/* Bottom */}
        <div className="sidebar-bottom">
          {user ? (
            <>
              <div className="user-info">
                <img src={user.avatar || "/default-avatar.png"} alt="avatar" />
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
