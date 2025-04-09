import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Search from "../Search/Search.jsx";
import { useState } from "react";
import FullPlayer from "../FullPlayer/FullPlayer.jsx";
import Player from "../Player/Player.jsx";
import Navbar from "../components/Navbar.jsx";

export default function AppRoutes() {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isTranscriptEnabled, setIsTranscriptEnabled] = useState(false);
  const [isPlayFullPlayer, setIsPlayFullPlayer] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
    </>
  );
}
