import "./FullPlayer.css";
import playPauseButton from "/play.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

async function fetchPodcast(podcastId) {
  return (await fetch(`http://localhost:8000/podcast/${podcastId}`)).json();
}

/**
 * A component that contains the transcript and video of the currently playing podcast.
 */
export default function FullPlayer({ hasVideo, hasTranscript }) {
  let videoElement = null;
  let transcriptElement = null;
  let { id: podcastId } = useParams();
  const { data: podcast, isLoading } = useQuery({
    queryFn: () => fetchPodcast(podcastId),
    queryKey: ["podcast"],
  });
  console.log(podcast);

  if (hasVideo) {
    videoElement = (
      <div className="full-player__video visible" id="js-podcast-video">
        This is where the video should be.
      </div>
    );
  } else {
    videoElement = null;
  }

  if (hasTranscript) {
    transcriptElement = (
      <div
        className="full-player__transcript visible"
        id="js-podcast-transcript"
      >
        This is where the transcript should be.
      </div>
    );
  } else {
    transcriptElement = null;
  }

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className="full-player">
          <div className="full-player__podcast">
            <div className="full-player__podcast-details">
              <img
                className="full-player__podcast-image"
                src={podcast?.thumbnail}
                alt={podcast?.thumbnailAlt}
              />
              <div className="full-player__podcast-show-ep">
                <p className="full-player__podcast-show">{podcast?.title}</p>
                <p className="full-player__podcast-ep">
                  Episode {podcast?.episode_number}: {podcast?.episode}
                </p>
              </div>
              <img
                className="full-player__podcast-button"
                src={playPauseButton}
                alt=""
              />
            </div>
          </div>
          <div className="full-player__video-transcript">
            {videoElement}
            {transcriptElement}
          </div>
        </div>
      )}
    </>
  );
}
