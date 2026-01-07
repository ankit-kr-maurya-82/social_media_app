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
  <div>
    
  </div>
  );
};

export default Sidebar;
