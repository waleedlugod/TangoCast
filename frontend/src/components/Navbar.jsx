import { Link, useNavigate } from "react-router-dom";
import TangoCastLogo from "../assets/NavBar/TangoCastLogo.svg";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import "./NavBar.css";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { authTokens, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav__left">
        <button
          onClick={() => (authTokens ? navigate("/dashboard") : navigate("/"))}
        >
          <img className="nav__logo" src={TangoCastLogo} alt="TangoCast" />
        </button>
        {authTokens ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
        <button onClick={() => navigate("/search")}>Search</button>
      </div>
      <div className="nav__right">
        {authTokens && (
          <Link to={"/studio"}>
            <img className="nav__icon" src={PlaceholderIcon} alt="User Icon" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
