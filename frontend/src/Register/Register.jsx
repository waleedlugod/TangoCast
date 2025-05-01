import { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register/",
        formData
      );
      setMessage(response.data.message); // Success message from backend
      navigate("/login");
    } catch (error) {
      setMessage("Error: " + error.response.data);
    }
  };

  return (
    <div className="register">
      <div className="register__modal">
        <h2 className="register__heading">Register</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <div className="register__radio-buttons">
              <label className="register__radio-buttons__label">
                <input
                  className="register__radio-buttons__input"
                  type="radio"
                  name="role"
                  value="listenerUser"
                  id="listener"
                  onChange={handleChange}
                />
                <span className="register__radio-buttons__button"></span>
                Listener
              </label>
              <label className="register__radio-buttons__label">
                <input
                  className="register__radio-buttons__input"
                  type="radio"
                  name="role"
                  value="creatorUser"
                  id="creator"
                  onChange={handleChange}
                />
                <span className="register__radio-buttons__button"></span>
                Creator
              </label>
            </div>
          </div>
          <button className="register__submit-button" type="submit">
            Register
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Register;
