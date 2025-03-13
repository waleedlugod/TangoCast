import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css'
import timerIcon from '/timer.svg';
import videoIcon from '/video.svg';
import transcriptIcon from '/transcript.svg';
import circleIcon from '/icon-circle.svg';

export default function Player({ podcast, handleVideo, handleTranscript }) {

  const audioRef = useRef(null);
  const playerControls = [];
  const playerJumpSteps = {
    backward: 5000,
    forward: 5000,
  };

  function toggleTimerOptions(e) {
    e.preventDefault();
    let audio = audioRef.current.audio.current;
    let timerOptions = document.querySelector("#js-player-timer-options");
    if (!audio.paused) {
      timerOptions.classList.toggle("player__additional-timer-options--shown");
    }
  }
  
  // TODO: add functionality for cancelling sleep timer if player is paused
  function startSleepTimer(duration) {
    let audio = audioRef.current.audio.current;
    let timerOptions = document.querySelector("#js-player-timer-options");
    let timerCircle = document.querySelector("#js-timer-circle");
    if (!audio.paused) {
      timerOptions.classList.toggle("player__additional-timer-options--shown");
      timerCircle.classList.toggle("visible");
      setTimeout(() => {
        audio.pause();
      }, duration);
    }
  }

  return(
    <>
      <div className="player">
        {/* put into its own component */}
        <div className="player__info">
          <img src={podcast.image} alt={podcast.imageAlt}/>
          <div className="player__info-text">
            <p className="player__info-show">{podcast.showName}</p>
            <p className="player__info-episode">Episode {podcast.epNumber}: {podcast.epName}</p>
          </div>
        </div>
        <AudioPlayer 
          src={podcast.audio} 
          className="player__controls"
          showSkipControls="true"
          layout="stacked-reverse"
          customAdditionalControls={playerControls}
          progressJumpSteps={playerJumpSteps}
          ref={audioRef}
        />
        {/* put into its own component */}
        <div className="player__additional">
          <div className="player__additional-timer">
            <button className="player__additional-timer-button" onClick={toggleTimerOptions}>
              <img className="player__additional-icon" src={timerIcon} alt="Sleep timer" />
              <img className="player__additional-circle" id="js-timer-circle" src={circleIcon} alt="Circle" />
            </button>
            <div className="player__additional-timer-options" id="js-player-timer-options">
              <button onClick={() => {startSleepTimer(60000);}}>1 min</button>
              <button onClick={() => {startSleepTimer(120000);}}>2 min</button>
            </div>
          </div>
          <button className="player__additional-video-button" onClick={handleVideo}>
            <img className="player__additional-icon" src={videoIcon} alt="Enable or disable video" />
            <img className="player__additional-circle" id="js-video-circle" src={circleIcon} alt="Circle" />
          </button>
          <button className="player__additional-transcript-button" onClick={handleTranscript}>
            <img className="player__additional-icon" src={transcriptIcon} alt="Enable or disable transcript" />
            <img className="player__additional-circle" id="js-transcript-circle" src={circleIcon} alt="Circle" />
          </button>
        </div>
      </div>
    </>
  );
}

