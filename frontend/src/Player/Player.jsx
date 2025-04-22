import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.css";
import timerIcon from "/timer.svg";
import videoIcon from "/video.svg";
import transcriptIcon from "/transcript.svg";
import circleIcon from "/icon-circle.svg";
import shareIcon from "/share.svg";

/**
 * A component that holds information about the currently playing podcast.
 */
function PlayerPodcast({ podcast }) {
  return (
    <div className="player__info">
      <img src={podcast.thumbnail} alt={podcast.thumbnail_alt} />
      <div className="player__info-text">
        <p className="player__info-show">{podcast.title}</p>
        <p className="player__info-episode">
          Episode {podcast.episode_number}: {podcast.episode}
        </p>
      </div>
    </div>
  );
}

/**
 * A component that holds information about the current speed of playback.
 */
function PlayerSpeed(props) {
  const handleSpeedChange = props.handleSpeedChange;
  const [playerSpeed, setPlayerSpeed] = useState(1);

  function handleClick() {
    if (playerSpeed == 1) {
      setPlayerSpeed(2);
      handleSpeedChange(2);
    } else if (playerSpeed == 2) {
      setPlayerSpeed(0.5);
      handleSpeedChange(0.5);
    } else {
      setPlayerSpeed(1);
      handleSpeedChange(1);
    }
  }

  return (
    <div className="player__speed" onClick={handleClick}>
      Speed: x<span className="player__speed-number">{playerSpeed}</span>
    </div>
  );
}

async function writeClipboardLink() {
  try {
    await navigator.clipboard.writeText(location);
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * A component that holds the additional controls of the podcast player
 */
function PlayerAdditional({
  podcast,
  setIsVideoEnabled,
  setIsTranscriptEnabled,
  startTimer,
  stopTimer,
}) {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const { mutate: sharePodcast, data: respnose } = useMutation({
    mutationFn: () => {
      return fetch(`http://localhost:8000/share/shared/${podcast.id}/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
    },
  });

  function toggleVideo() {
    let videoCircle = document.querySelector("#js-video-circle");
    videoCircle.classList.toggle("visible");
  }

  function toggleTranscript() {
    let transcriptCircle = document.querySelector("#js-transcript-circle");
    transcriptCircle.classList.toggle("visible");
  }

  function toggleTimerOptions() {
    let timerOptions = document.querySelector("#js-player-timer-options");
    timerOptions.classList.toggle("visible");
  }

  return (
    <div className="player__additional">
      <div className="player__additional-timer">
        <button
          className="player__additional-timer-button"
          onClick={toggleTimerOptions}
        >
          <img
            className="player__additional-icon"
            src={timerIcon}
            alt="Sleep timer"
          />
          <img
            className="player__additional-circle"
            id="js-timer-circle"
            src={circleIcon}
            alt="Circle"
          />
        </button>
        <div
          className="player__additional-timer-options"
          id="js-player-timer-options"
        >
          <button
            onClick={() => {
              startTimer(60000);
            }}
          >
            1 min
          </button>
          <button
            onClick={() => {
              startTimer(120000);
            }}
          >
            2 min
          </button>
          <button
            onClick={() => {
              stopTimer();
            }}
            className="player__additional-timer-stop"
            id="js-player-timer-stop"
          >
            Stop Timer
          </button>
        </div>
      </div>
      <button
        className="player__additional-video-button"
        onClick={() => {
          setIsVideoEnabled((prev) => !prev);
          videoRef.current.seekTo(
            audioRef.current.audio.current.currentTime,
            "seconds"
          );
          toggleVideo();
        }}
      >
        <img
          className="player__additional-icon"
          src={videoIcon}
          alt="Enable or disable video"
        />
        <img
          className="player__additional-circle"
          id="js-video-circle"
          src={circleIcon}
          alt="Circle"
        />
      </button>
      <button
        className="player__additional-transcript-button"
        onClick={() => {
          setIsTranscriptEnabled((prev) => !prev);
          toggleTranscript();
        }}
      >
        <img
          className="player__additional-icon"
          src={transcriptIcon}
          alt="Enable or disable transcript"
        />
        <img
          className="player__additional-circle"
          id="js-transcript-circle"
          src={circleIcon}
          alt="Circle"
        />
      </button>
      <button
        onClick={() => {
          writeClipboardLink();
          sharePodcast();
        }}
      >
        <img src={shareIcon} alt="" />
      </button>
    </div>
  );
}

/**
 * A component that represents the podcast player. It holds information about
 * the currently playing podcast and controls to modify its playback.
 */
export default function Player({
  podcast,
  isVideoEnabled,
  setIsVideoEnabled,
  isTranscriptEnabled,
  setIsTranscriptEnabled,
  isPlayFullPlayer,
  setIsPlayFullPlayer,
  videoRef,
}) {
  const audioRef = useRef(null);
  const timerIDRef = useRef(null);
  const timerRemainingRef = useRef(0);
  const playerControls = [
    <PlayerSpeed key="0" handleSpeedChange={handleSpeedChange} />,
  ];
  const playerJumpSteps = {
    backward: 5000,
    forward: 5000,
  };
  let sleepTimer;

  const Timer = function (callback, delay) {
    let start;
    timerRemainingRef.current = delay;

    this.pause = function () {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = null;
      timerRemainingRef.current =
        timerRemainingRef.current - (Date.now() - start);
    };

    this.resume = function () {
      if (timerIDRef.current) {
        return;
      }
      start = Date.now();
      timerIDRef.current = setTimeout(callback, timerRemainingRef.current);
    };

    this.resume();
  };

  function startTimer(duration) {
    let audio = audioRef.current.audio.current;
    let timerOptions = document.querySelector("#js-player-timer-options");
    let timerCircle = document.querySelector("#js-timer-circle");
    let timerStop = document.querySelector("#js-player-timer-stop");
    timerOptions.classList.toggle("visible");
    timerCircle.classList.toggle("visible");
    timerStop.classList.toggle("visible");
    sleepTimer = new Timer(() => {
      audio.pause();
      setIsPlayFullPlayer(false);
      stopTimer();
    }, duration);
    if (audio.paused) {
      pauseTimer();
    }
  }

  function resumeTimer() {
    sleepTimer.resume();
  }

  function pauseTimer() {
    sleepTimer.pause();
  }

  function stopTimer() {
    sleepTimer.pause();
    sleepTimer = null;
    let timerCircle = document.querySelector("#js-timer-circle");
    let timerStop = document.querySelector("#js-player-timer-stop");
    timerCircle.classList.toggle("visible");
    timerStop.classList.toggle("visible");
  }

  function handlePlay() {
    if (!timerIDRef.current && sleepTimer) {
      resumeTimer();
    }
    if (videoRef.current) {
      videoRef.current.seekTo(
        audioRef.current.audio.current.currentTime,
        "seconds"
      );
    }
    setIsPlayFullPlayer(true);
  }

  function handlePause() {
    if (timerIDRef.current && sleepTimer) {
      pauseTimer();
    }
    setIsPlayFullPlayer(false);
  }

  function handleSpeedChange(speed) {
    let audio = audioRef.current.audio.current;
    audio.playbackRate = speed;
  }

  function handleOnSeeked() {
    if (videoRef.current) {
      videoRef.current.seekTo(
        audioRef.current.audio.current.currentTime,
        "seconds"
      );
    }
  }

  useEffect(() => {
    let audio = audioRef.current.audio.current;
    isPlayFullPlayer ? audio.play() : audio.pause();
  }, [isPlayFullPlayer]);

  return (
    <>
      <div className="player">
        <PlayerPodcast podcast={podcast} />
        <AudioPlayer
          src={podcast.audio}
          className="player__controls"
          showSkipControls="true"
          layout="stacked-reverse"
          customAdditionalControls={playerControls}
          progressJumpSteps={playerJumpSteps}
          ref={audioRef}
          onPlay={handlePlay}
          onPause={handlePause}
          onSeeked={handleOnSeeked}
        />
        <PlayerAdditional
          podcast={podcast}
          isVideoEnabled={isVideoEnabled}
          setIsVideoEnabled={setIsVideoEnabled}
          isTranscriptEnabled={isTranscriptEnabled}
          setIsTranscriptEnabled={setIsTranscriptEnabled}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
          stopTimer={stopTimer}
        />
      </div>
    </>
  );
}
