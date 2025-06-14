import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../Landing/Landing.jsx";
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
import Content from "../PodcastStudio/Content.jsx";
import ContentForm from "../PodcastStudio/ContentForm.jsx";

export default function AppRoutes() {
  const videoRef = useRef(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isTranscriptEnabled, setIsTranscriptEnabled] = useState(false);
  const [isPlayFullPlayer, setIsPlayFullPlayer] = useState(false);

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/podcast/:id"
          element={
            <>
              <FullPlayer
                setCurrentPodcast={setCurrentPodcast}
                isPlayFullPlayer={isPlayFullPlayer}
                setIsPlayFullPlayer={setIsPlayFullPlayer}
                isVideoEnabled={isVideoEnabled}
                isTranscriptEnabled={isTranscriptEnabled}
                videoRef={videoRef}
              />
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
            </>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/studio" element={<PodcastStudio />}>
          <Route index element={<Analytics />} />
          <Route path="content" element={<Content />} />
          <Route path="edit/:id" element={<ContentForm isUpload={false} />} />
          <Route path="upload" element={<ContentForm isUpload={true} />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
