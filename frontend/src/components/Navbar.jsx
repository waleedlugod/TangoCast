import "./Navbar.css";
import { useNavigate } from "react-router-dom";

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
    <nav className="navbar">
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </nav>
  );
}

export default Navbar;
