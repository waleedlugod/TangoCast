import React from "react"
import { Routes, Route } from "react-router-dom"
import Register from "./Register.jsx"
import Login from "./Login.jsx"

const AppRoutes = () => (
    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default AppRoutes;
