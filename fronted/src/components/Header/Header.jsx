import React from "react";
import {Link, NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <header>
     
      <nav>
        <div className="text-2xl bg-amber-900 text-amber-100 p-3 text-center">
            
            <NavLink
            to="/"
            className={({isActive})=> ` ${isActive ? "text-amber-600": "text-gray-100 "}`}
            >
            Home
            </NavLink>
            <NavLink
            to="/about"
            className={({isActive})=> ` ${isActive ? "text-amber-600": "text-gray-100 px-4"}`}
            >
            About
            </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
