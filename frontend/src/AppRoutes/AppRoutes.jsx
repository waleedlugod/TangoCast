import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Search from "../Search/Search.jsx";
import FullPlayer from "../FullPlayer/FullPlayer.jsx";
import Player from "../Player/Player.jsx";
import Analytics from "../PodcastStudio/Analytics.jsx";
import PodcastStudio from "../PodcastStudio/Studio.jsx";
import Navbar from "../components/Navbar.jsx";
import AuthProvider from "../context/AuthContext.jsx";
import Home from "../Home/Home.jsx";

export default function AppRoutes() {
  const videoRef = useRef(null);
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
    <AuthProvider authTokens={authTokens} setAuthTokens={setAuthTokens}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
              isVideoEnabled={isVideoEnabled}
              isTranscriptEnabled={isTranscriptEnabled}
              videoRef={videoRef}
            />
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/creator/:pk" element={<PodcastStudio />}>
          <Route index element={<Analytics />} />
        </Route>
      </Routes>
      {currentPodcast ? (
        <Player
          podcast={currentPodcast}
          setIsVideoEnabled={setIsVideoEnabled}
          setIsTranscriptEnabled={setIsTranscriptEnabled}
          isPlayFullPlayer={isPlayFullPlayer}
          setIsPlayFullPlayer={setIsPlayFullPlayer}
          videoRef={videoRef}
        />
      ) : (
        <></>
      )}
    </AuthProvider>
  );
}
