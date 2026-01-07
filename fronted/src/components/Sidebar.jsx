import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaPlus, FaHome, FaUser, FaCompass, FaSignOutAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import "./CSS/Sidebar.css";

const Sidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${open ? "open" : "collapsed"}`}>
      
      {/* Toggle */}
      <div className="sidebarToggle" onClick={() => setOpen(!open)}>
        <FaBars />
      </div>

      {/* Menu */}
      <nav className="sidebarMenu">
        <NavLink to="/" className="sidebarItem">
          <FaHome />
          <span>Home</span>
        </NavLink>

        <NavLink to="/explore" className="sidebarItem">
          <FaCompass />
          <span>Explore</span>
        </NavLink>

        {user && (
          <NavLink to="/profile" className="sidebarItem">
            <FaUser />
            <span>Profile</span>
          </NavLink>
        )}

        <NavLink to="/create" className="sidebarItem">
          <FaPlus />
          <span>Create</span>
        </NavLink>
      </nav>

      {/* Footer */}
      {user && (
        <div className="sidebarFooter">
          <button onClick={handleLogout} className="sidebarItem logout">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
