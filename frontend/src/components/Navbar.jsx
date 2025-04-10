import React from "react";
import { useNavigate } from "react-router-dom";
import TangoCastLogo from "../assets/NavBar/TangoCastLogo.svg";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import "./NavBar.css";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/Register");
  };

  return (
    <nav>
      <div className="nav__left">
        <a href="#">
          <img className="nav__logo" src={TangoCastLogo} alt="TangoCast" />
        </a>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
      <div className="nav__right">
        <a href="#">
            <img className="nav__icon" src={PlaceholderIcon} alt="User Icon" />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
