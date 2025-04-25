import { Link } from "react-router";
import "./Landing.css";
import Logo from "../assets/Landing/logo.svg";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, user);

  return (
    <div className="landing">
      <div className="landing__logo">
        <img src={Logo} alt="Tangocast" />
        <p>
          Listen to podcasts <b>your way</b>.
        </p>
      </div>
      <div className="landing__buttons">
        <Link to="/login" className="landing__button--login">
          Log in
        </Link>
        <Link to="/register" className="landing__button--register">
          Register
        </Link>
      </div>
    </div>
  );
}
