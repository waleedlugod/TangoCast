import "./FullPlayer.css";
import playButton from "/play.svg";
import pauseButton from "/pause.svg";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
  const { authTokens, user } = useContext(AuthContext);
  const { id: podcastId } = useParams();
  const { data: podcast, isLoading } = useQuery({
    queryFn: () => {
      return axios.get(`http://localhost:8000/podcast/${podcastId}`);
    },
    queryKey: ["podcast"],
    select: (data) => (data = data.data),
  });

  const queryClient = useQueryClient();

  const { mutate: follow, isSuccess: isSuccessFollow } = useMutation({
    mutationKey: ["follow"],
    mutationFn: () => {
      return axios.patch(`http://localhost:8000/listeners/${user.user.id}/`, {
        follows: [...user.listener.follows, podcast.creator.creator_id.id],
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUser"] }),
  });

  const { mutate: unfollow, isSuccess: isSuccessUnfollow } = useMutation({
    mutationKey: ["unfollow"],
    mutationFn: () => {
      return axios.patch(`http://localhost:8000/listeners/${user.user.id}/`, {
        follows: [
          ...user.listener.follows.filter(
            (value) => value != podcast.creator.creator_id.id
          ),
        ],
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUser"] }),
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
                src={podcast.thumbnail}
                alt={podcast.thumbnail_alt}
              />
              <div className="full-player__podcast-show-ep">
                <p className="full-player__podcast-show">{podcast.title}</p>
                <p className="full-player__podcast-ep">
                  Episode {podcast.episode_number}: {podcast.episode}
                </p>
                <div className="full-player_podcast-creator-wrapper">
                  <p>By: {podcast.creator.creator_id.username}</p>
                  {authTokens &&
                  user.listener.follows.includes(
                    podcast.creator.creator_id.id
                  ) ? (
                    <button onClick={unfollow}>unfollow</button>
                  ) : (
                    <button onClick={follow}>follow</button>
                  )}
                </div>
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
                  url={podcast.video}
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
