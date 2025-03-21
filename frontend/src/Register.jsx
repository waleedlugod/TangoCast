import React, { useState } from "react";
import axios from "axios";

function Register() {
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
            const response = await axios.post("http://127.0.0.1:8000/register/", formData);
            setMessage(response.data.message); // Success message from backend
        } catch (error) {
            setMessage("Error: " + error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="listenerUser"
                        id="listener"
                        onChange={handleChange}
                    />Listener
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="creatorUser"
                        id="creator"
                        onChange={handleChange}
                    />Creator
                </label>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;