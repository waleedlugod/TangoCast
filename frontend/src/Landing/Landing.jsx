import { Link } from "react-router";
import './Landing.css';
import Logo from "../assets/Landing/logo.svg";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__logo">
        <img src={Logo} alt="Tangocast" />
        <p>Listen to podcasts <b>your way</b>.</p>
      </div>
      <div className="landing__buttons">
        <Link to="/login" className="landing__button--login">Log in</Link>
        <Link to="/register" className="landing__button--register">Register</Link>
      </div>
    </div>
  )
}
