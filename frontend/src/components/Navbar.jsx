import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
      // Fetch username from Django API
      axios.get("http://127.0.0.1:8000/api/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setUsername(res.data.username))
      .catch(() => setUsername(localStorage.getItem("username") || ""));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/"); // redirect to login
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/home">
          Radio <span className="navbar-sign">Scan</span>
        </Link>
      </h1>

      <ul className="navbar-items">
        <li>
          <Link to="/home" className="navbar-links">Home</Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">Services</a>
        </li>
      </ul>

      <div className="navbar-user">
        {isLoggedIn && (
          <span className="text-gray-700 font-medium bg-gray-100 px-3 py-1 rounded-full shadow-sm">
            Hello, <span className="text-blue-500">{username}</span>
          </span>
        )}
        <button
          className="navbar-btn"
          onClick={isLoggedIn ? handleLogout : () => navigate("/")}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;

     