// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/Chat App Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img className="logo" src={logo} />
      <ul>
        <li>
          <Link to="/userlist">Users</Link>
        </li>
        <li>
          <Link to="/">Chats</Link>
        </li>
        {localStorage.getItem("token") ? <li onClick={handleLogout}>Logout</li>: ""}
      </ul>
    </nav>
  );
};

export default Navbar;
