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
       <header className="headerWrapper">
      <div className="header">
        {/* <NavLink to="/" className="logo">Sintax</NavLink> */}

        <nav className="navLinks">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          {user && <NavLink to="/profile">Profile</NavLink>}
        </nav>

        {user ? (
          <button className="btn" onClick={logout}>Logout</button>
        ) : (
          <NavLink to="/login" className="btn">Login</NavLink>
        )}
      </div>
    </header>
    
    </>
  );
};

export default Header;
