import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import Search from "../Search/Search.jsx";
import { useState } from "react";
import FullPlayer from "../FullPlayer/FullPlayer.jsx";
import Player from "../Player/Player.jsx";

export default function AppRoutes() {
  const [hasVideo, setHasVideo] = useState(false);
  const [hasTranscript, setHasTranscript] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);

  const retrievedPodcast = {
    audio: "/test.mp3",
    image: "/test.png",
    imageAlt: "The Magnus Archives, Episode 1: Anglerfish",
    showName: "The Magnus Archives",
    epName: "Anglerfish",
    epNumber: 1,
  };

  // enables video in FullPlayer from the Player
  function handleVideo() {
    if (hasVideo) {
      setHasVideo(false);
    } else {
      setHasVideo(true);
    }
  }

  // enables transcript in FullPlayer from the Player
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
          path="/podcast/:id"
          element={
            <FullPlayer
              setCurrentPodcast={setCurrentPodcast}
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
