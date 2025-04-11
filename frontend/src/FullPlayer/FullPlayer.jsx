import "./FullPlayer.css";
import playButton from "/play.svg";
import pauseButton from "/pause.svg";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import React from "react";

async function fetchPodcast(podcastId) {
  return (await fetch(`http://localhost:8000/podcast/${podcastId}`)).json();
}

/**
 * A component that contains the transcript and video of the currently playing podcast.
 */
export default function FullPlayer({
  setCurrentPodcast,
  isPlayFullPlayer,
  setIsPlayFullPlayer,
  isVideoEnabled,
  isTranscriptEnabled,
  videoRef,
}) {
  const { id: podcastId } = useParams();
  const { data: podcast, isLoading } = useQuery({
    queryFn: () => fetchPodcast(podcastId),
    queryKey: ["podcast"],
  });

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
                alt={podcast?.thumbnail_alt}
              />
              <div className="full-player__podcast-show-ep">
                <p className="full-player__podcast-show">{podcast?.title}</p>
                <p className="full-player__podcast-ep">
                  Episode {podcast?.episode_number}: {podcast?.episode}
                </p>
              </div>
              <img
                className="full-player__podcast-button"
                src={isPlayFullPlayer ? pauseButton : playButton}
                alt=""
                onClick={() => {
                  setCurrentPodcast(podcast);
                  setIsPlayFullPlayer((prev) => !prev);
                }}
              />
            </div>
          </div>
          <div className="full-player__video-transcript">
            <div className="full-player__video visible" id="js-podcast-video">
              {isVideoEnabled ? (
                <ReactPlayer
                  ref={videoRef}
                  url={podcast?.video}
                  muted={true}
                  playing={isPlayFullPlayer}
                  // width={"100%"}
                  height={"100%"}
                  stopOnUnmount={false}
                />
              ) : (
                <></>
              )}
            </div>
            {isTranscriptEnabled ? (
              <div
                className="full-player__transcript visible"
                id="js-podcast-transcript"
              >
                {podcast.transcript}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
}
