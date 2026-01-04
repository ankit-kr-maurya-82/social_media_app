import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./header.css";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header">
        {/* Left */}
        <div className="leftSection">
          <NavLink to="/" className="logo">
            SocialApp
          </NavLink>
        </div>

        {/* Center Search */}
        <div className="searchBox desktopOnly">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
          />
        </div>

        {/* Right */}
        <nav className="navLinks desktopOnly">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          {user && <NavLink to="/profile">Profile</NavLink>}

          {user ? (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div
          className="hamburger mobileOnly"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobileMenu">
          <div className="searchBox">
            <FaSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Search..."
              className="searchInput"
            />
          </div>

          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/explore" onClick={() => setMenuOpen(false)}>
            Explore
          </NavLink>

          {user && (
            <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </NavLink>
          )}

          {user ? (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          ) : (
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
