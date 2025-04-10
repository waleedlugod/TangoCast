import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Search from "../Search/Search.jsx";
import FullPlayer from "../FullPlayer/FullPlayer.jsx";
import Player from "../Player/Player.jsx";
import Navbar from "../components/Navbar.jsx";
import AuthProvider from "../context/AuthContext.jsx";

export default function AppRoutes() {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isTranscriptEnabled, setIsTranscriptEnabled] = useState(false);
  const [isPlayFullPlayer, setIsPlayFullPlayer] = useState(false);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  return (
    <AuthProvider authTokens={authTokens}>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setAuthTokens={setAuthTokens} />}
        />
        <Route
          path="/podcast/:id"
          element={
            <FullPlayer
              setCurrentPodcast={setCurrentPodcast}
              isPlayFullPlayer={isPlayFullPlayer}
              setIsPlayFullPlayer={setIsPlayFullPlayer}
              isVideoEnabled={setIsVideoEnabled}
              isTranscriptEnabled={isTranscriptEnabled}
            />
          }
        />
        <Route path="/search" element={<Search />} />
      </Routes>
      {currentPodcast ? (
        <Player
          podcast={currentPodcast}
          isVideoEnabled={isVideoEnabled}
          setIsVideoEnabled={setIsVideoEnabled}
          isTranscriptEnabled={isTranscriptEnabled}
          setIsTranscriptEnabled={setIsTranscriptEnabled}
          isPlayFullPlayer={isPlayFullPlayer}
        />
      ) : (
        <></>
      )}
    </AuthProvider>
  );
}
