import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Player.css'
import podcastAudio from '/test.mp3';
import podcastImage from '/test.png';
import timerIcon from '/timer.svg';
import videoIcon from '/video.svg';
import transcriptIcon from '/transcript.svg';

const playerControls = [];
const playerJumpSteps = {
  backward: 5000,
  forward: 5000,
};
const podcastShowName = "The Magnus Archives"
const podcastEpisodeName = "Anglerfish"
const podcastEpisodeNumber = 1;

function toggleTimerOptions(e) {
  e.preventDefault();
  const timerOptions = document.querySelector("#js-player-timer-options");
  timerOptions.classList.toggle("player-timer-options-shown");
}

export default function Player() {
  
  const audioUrl = "http://localhost:8000/search/";
  const audio = fetch(audioUrl).then((res) => {
    return res.json();
  });

  console.log(audio);

  return(
    <>
      <div className="player-container">
        <div className="player-info">
          <img src={podcastImage} />
          <div className="player-info-text">
            <p className="player-info-show">{podcastShowName}</p>
            <p className="player-info-episode">Episode {podcastEpisodeNumber}: {podcastEpisodeName}</p>
          </div>
        </div>
        <AudioPlayer 
          src={podcastAudio} 
          className="player"
          showSkipControls="true"
          layout="stacked-reverse"
          customAdditionalControls={playerControls}
          progressJumpSteps={playerJumpSteps}
        />
        <div className="player-additional-controls">
          <div className="player-timer-container">
            <button onClick={toggleTimerOptions}><img src={timerIcon} /></button>
            <div className="player-timer-options" id="js-player-timer-options">
              <button>2 sec</button>
              <button>5 sec</button>
            </div>
          </div>
          <button><img src={videoIcon} /></button>
          <button><img src={transcriptIcon} /></button>
        </div>
      </div>
    </>
  );
}

