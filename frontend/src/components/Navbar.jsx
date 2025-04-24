import { useNavigate } from "react-router-dom";
import TangoCastLogo from "../assets/NavBar/TangoCastLogo.svg";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import "./NavBar.css";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav__left">
        <a href="/">
          <img className="nav__logo" src={TangoCastLogo} alt="TangoCast" />
        </a>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
        <button onClick={() => navigate("/register")}>Register</button>
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
