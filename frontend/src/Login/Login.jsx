import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <div className="login__modal">
        <h2 className="login__heading">Log in</h2>
        <form
          className="login__form"
          onSubmit={(e) => {
            e.preventDefault();
            login(formData);
          }}
        >
          <div className="login__inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button className="login__button" type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
