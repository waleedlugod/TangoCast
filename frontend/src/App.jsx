import { useState } from 'react';
import './App.css';
import Player from './Player.jsx';
import FullPlayer from './FullPlayer.jsx';
import Home from './Home.jsx';

/**
 * A component that represents the entire app.
*/
export default function App() {
  let [hasVideo, setHasVideo] = useState(false);
  let [hasTranscript, setHasTranscript] = useState(false);

  let retrievedPodcast = {
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
    }
    else {
      setHasVideo(true);
    }
  }

  function handleTranscript() {
    if (hasTranscript) {
      setHasTranscript(false);
    }
    else {
      setHasTranscript(true);
    }
  }

  let currentPage = null;
  if (hasVideo || hasTranscript) {
    currentPage = <FullPlayer podcast={retrievedPodcast} hasVideo={hasVideo} hasTranscript={hasTranscript} />;
  }
  else {
    currentPage = <Home />;
  }

  return (
    <>
      <div className="main-container">
        {currentPage}
        <Player podcast={retrievedPodcast} handleVideo={handleVideo} handleTranscript={handleTranscript} />
      </div>
    </>
  );
}
