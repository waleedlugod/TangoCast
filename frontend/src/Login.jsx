import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", formData);
            setToken(response.data.access); // Store token (you may save it in localStorage)
            setMessage("Login successful!");
        } catch (error) {
            setMessage("Error: " + error.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
