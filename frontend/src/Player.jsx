import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css'
import timerIcon from '/timer.svg';
import videoIcon from '/video.svg';
import transcriptIcon from '/transcript.svg';
import circleIcon from '/icon-circle.svg';

function PlayerPodcast(props) {
  const podcast = props.podcast;
  return (
    <div className="player__info">
      <img src={podcast.image} alt={podcast.imageAlt}/>
      <div className="player__info-text">
        <p className="player__info-show">{podcast.showName}</p>
        <p className="player__info-episode">Episode {podcast.epNumber}: {podcast.epName}</p>
      </div>
    </div>
  );
}

function PlayerSpeed() {
  return (
    <div>
      Speed: <span>x1</span>
    </div>
  )
}

function PlayerAdditional({ handleVideo, handleTranscript, startTimer, pauseTimer, stopTimer }) {
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
        <button className="player__additional-timer-button" onClick={toggleTimerOptions}>
          <img className="player__additional-icon" src={timerIcon} alt="Sleep timer" />
          <img className="player__additional-circle" id="js-timer-circle" src={circleIcon} alt="Circle" />
        </button>
        <div className="player__additional-timer-options" id="js-player-timer-options">
          <button onClick={() => {startTimer(60000);}}>1 min</button>
          <button onClick={() => {startTimer(120000);}}>2 min</button>
          <button onClick={() => {stopTimer();}} className="player__additional-timer-stop" id="js-player-timer-stop">Stop Timer</button>
        </div>
      </div>
      <button className="player__additional-video-button" onClick={() => {handleVideo(); toggleVideo();}}>
        <img className="player__additional-icon" src={videoIcon} alt="Enable or disable video" />
        <img className="player__additional-circle" id="js-video-circle" src={circleIcon} alt="Circle" />
      </button>
      <button className="player__additional-transcript-button" onClick={() => {handleTranscript(); toggleTranscript();}}>
        <img className="player__additional-icon" src={transcriptIcon} alt="Enable or disable transcript" />
        <img className="player__additional-circle" id="js-transcript-circle" src={circleIcon} alt="Circle" />
      </button>
    </div>
  );
}

export default function Player({ podcast, handleVideo, handleTranscript }) {

  const audioRef = useRef(null);
  const timerIDRef = useRef(null);
  const timerRemainingRef = useRef(0);
  const playerControls = [<PlayerSpeed key="0" />];
  const playerJumpSteps = {
    backward: 5000,
    forward: 5000,
  };
  let sleepTimer;

  // only one timer can exist at a time
  const Timer = function(callback, delay) {
    let start;
    timerRemainingRef.current = delay;

    this.pause = function() {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = null;
      timerRemainingRef.current = timerRemainingRef.current - (Date.now() - start);
    }

    this.resume = function() {
      if (timerIDRef.current) {
        return;
      }
      start = Date.now();
      timerIDRef.current = setTimeout(callback, timerRemainingRef.current);
    }

    this.resume();
  }

  function startTimer(duration) {
    let audio = audioRef.current.audio.current;
    let timerOptions = document.querySelector("#js-player-timer-options");
    let timerCircle = document.querySelector("#js-timer-circle");
    let timerStop = document.querySelector("#js-player-timer-stop");
    timerOptions.classList.toggle("visible");
    timerCircle.classList.toggle("visible");
    timerStop.classList.toggle("visible");
    sleepTimer = new Timer(() => {audio.pause(); stopTimer();}, duration);
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
  }

  function handlePause() {
    if (timerIDRef.current && sleepTimer) {
      pauseTimer();
    }
  }

  return(
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
          onPuase={handlePause}
        />
        <PlayerAdditional handleVideo={handleVideo} handleTranscript={handleTranscript} startTimer={startTimer} pauseTimer={pauseTimer} stopTimer={stopTimer}/>
      </div>
    </>
  );
}

