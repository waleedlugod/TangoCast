import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Search from "./Search.jsx";
import Player from "./Player.jsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/player" element={<Player />} />
    <Route path="/search" element={<Search />} />
  </Routes>
);

export default AppRoutes;
