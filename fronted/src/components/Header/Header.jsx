import React from "react";
import {Link, NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <header>
     
      <nav className="text-[15px] bg-gray-900 text-amber-100 p-3 text-center">
        
            
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
          
              <input type="text" className="bg-[#515151] rounded px-4 py-[1px]" name="" id="" />
      </nav>
    </header>
  );
};

export default Header;
