import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./header.css";

const Header = () => {
  const { user, logout } = useContext(UserContext);

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef(null);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="headerWrapper">
      <div className={`header ${searchOpen ? "search-active" : ""}`}>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Search */}
        <div
          ref={searchRef}
          className={`searchBox ${searchOpen ? "open" : ""}`}
          onClick={() => !searchOpen && setSearchOpen(true)}
        >
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="navLinks hideOnSearch">
          <NavLink to={user ? "/home" : "/"}>Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/features">Features</NavLink>
          {user && <NavLink to={`/profile/${user.username}`}>Profile</NavLink>}
        </nav>

        {/* Button */}
        <div className="hideOnSearch">
          {user ? (
            <button className="btn" onClick={logout}>Logout</button>
          ) : (
            <NavLink to="/login" className="btn">Login</NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobileMenu ${menuOpen ? "open" : ""}`}>
        <NavLink to={user ? "/home" : "/"} onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/explore" onClick={() => setMenuOpen(false)}>Explore</NavLink>
        {user && (
          <NavLink to={`/profile/${user.username}`} onClick={() => setMenuOpen(false)}>
            Profile
          </NavLink>
        )}

        {user ? (
          <button onClick={() => { logout(); setMenuOpen(false); }}>
            Logout
          </button>
        ) : (
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;