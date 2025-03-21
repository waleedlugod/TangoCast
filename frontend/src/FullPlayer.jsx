import './FullPlayer.css';

/**
 * A component that contains the transcript and video of the currently playing podcast.
*/
export default function FullPlayer({ podcast, hasVideo, hasTranscript }) {
  let videoElement = null;
  let transcriptElement = null;

  if (hasVideo) {
    videoElement = (
      <div className="full-player__video visible" id="js-podcast-video">
        This is where the video should be.
      </div>
    );
  }
  else {
    videoElement = null;
  }

  if (hasTranscript) {
    transcriptElement = (
      <div className="full-player__transcript visible" id="js-podcast-transcript">
        This is where the transcript should be.
      </div>
    );
  }
  else {
    transcriptElement = null;
  }

  return (
    <>
      <div className="full-player">
        <div className="full-player__podcast">
          <div className="full-player__podcast-details">
            <img className="full-player__podcast-image" src={podcast.image} alt={podcast.imageAlt} />
            <div className="full-player__podcast-show-ep">
              <p className="full-player__podcast-show">{podcast.showName}</p>
              <p className="full-player__podcast-ep">Episode {podcast.epNumber}: {podcast.epName}</p>
            </div>
          </div> 
        </div>
        <div className="full-player__video-transcript">
          {videoElement}
          {transcriptElement}
        </div>
      </div>
    </>
  );
}
