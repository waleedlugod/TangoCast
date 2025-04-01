import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Search from "./Search.jsx";
import { useState } from "react";
import FullPlayer from "./FullPlayer.jsx";
import Player from "./Player.jsx";

export default function AppRoutes() {
  const [hasVideo, setHasVideo] = useState(false);
  const [hasTranscript, setHasTranscript] = useState(false);

  const retrievedPodcast = {
    audio: "/test.mp3",
    image: "/test.png",
    imageAlt: "The Magnus Archives, Episode 1: Anglerfish",
    showName: "The Magnus Archives",
    epName: "Anglerfish",
    epNumber: 1,
  };

  function handleVideo() {
    if (hasVideo) {
      setHasVideo(false);
    } else {
      setHasVideo(true);
    }
  }

  function handleTranscript() {
    if (hasTranscript) {
      setHasTranscript(false);
    } else {
      setHasTranscript(true);
    }
  }

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/player"
          element={
            <FullPlayer
              podcast={retrievedPodcast}
              hasVideo={hasVideo}
              hasTranscript={hasTranscript}
            />
          }
        />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Player
        podcast={retrievedPodcast}
        handleVideo={handleVideo}
        handleTranscript={handleTranscript}
      />
    </>
  );
}
