import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css'
import timerIcon from '/timer.svg';
import videoIcon from '/video.svg';
import transcriptIcon from '/transcript.svg';

export default function Player({ podcast, handleVideo, handleTranscript }) {

  const audioRef = useRef(null);
  const playerControls = [];
  const playerJumpSteps = {
    backward: 5000,
    forward: 5000,
  };

  function toggleTimerOptions(e) {
    e.preventDefault();
    let timerOptions = document.querySelector("#js-player-timer-options");
    timerOptions.classList.toggle("player__additional-timer-options--shown");
  }
  
  // TODO: add functionality for saving duration even when audio isn't playing
  // TODO: add dot under timer icon if sleep timer is set
  function startSleepTimer(duration) {
    let audio = audioRef.current.audio.current;
    let timerOptions = document.querySelector("#js-player-timer-options");
    if (!audio.paused) {
      timerOptions.classList.toggle("player__additional-timer-options--shown");
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
              <img src={timerIcon} alt="Sleep timer" />
            </button>
            <div className="player__additional-timer-options" id="js-player-timer-options">
              <button onClick={() => {startSleepTimer(60000);}}>1 min</button>
              <button onClick={() => {startSleepTimer(120000);}}>2 min</button>
            </div>
          </div>
          <button className="player__additional-video-button" onClick={handleVideo}>
            <img src={videoIcon} alt="Enable or disable video" />
          </button>
          <button className="player__additional-transcript-button" onClick={handleTranscript}>
            <img src={transcriptIcon} alt="Enable or disable transcript" />
          </button>
        </div>
      </div>
    </>
  );
}

