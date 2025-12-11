import React, { useState } from "react";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLoginBtnClick = () => {
    navigate("/register");  
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          Radio <span className="navbar-sign">Scan</span>
        </Link>
      </h1>

      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">Home</Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">Services</a>
        </li>
      </ul>

      <button
        className="navbar-btn"
        type="button"
        onClick={handleLoginBtnClick}
      >
        Login
      </button>
    </div>
  );
}

export default Navbar;
