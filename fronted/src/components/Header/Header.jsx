import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import UserContext from "../../context/UserContext";
import "./header.css";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="headerWrapper">
      <div className={`header ${searchOpen ? "search-active" : ""}`}>

        

        {/* Search */}
        <div
          ref={searchRef}
          className={`searchBox ${searchOpen ? "open" : ""}`}
          onClick={() => setSearchOpen(true)}
        >
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            autoFocus={searchOpen}
          />
        </div>

        {/* Nav */}
        <nav className="navLinks hideOnSearch">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          {user && <NavLink to="/profile">Profile</NavLink>}
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
    </header>
  );
};

export default Header;
