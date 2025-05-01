import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * A component that holds the current page the user is on in the website.
 */
export default function Home() {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);
  useEffect(() => {
    if (!authTokens) navigate("/login");
    if (user && !user?.listener) navigate("/studio");
  }, [authTokens, user]);

  const {
    data: recentPodcasts,
    isLoading: isLoadingRecentPodcasts,
    isError: isErrorRecentPodcasts,
  } = useQuery({
    queryFn: () => {
      return axios.get(
        `http://localhost:8000/listeners/get_followed_podcasts/`,
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      );
    },
    queryKey: ["followingPodcasts"],
    select: (data) => data.data,
  });

  const {
    data: sharedPodcasts,
    isLoading: isLoadingSharedPodcasts,
    isError: isErrorSharedPodcasts,
  } = useQuery({
    queryFn: () => {
      return axios.get(`http://localhost:8000/listeners/get_followed_shares/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      });
    },
    queryKey: ["followingSharedPodcasts"],
    select: (data) => data.data,
  });

  return (
    <div className="home">
      {!authTokens ? (
        <p>Login first to access content.</p>
      ) : isLoadingRecentPodcasts || isLoadingSharedPodcasts ? (
        <p>Loading content...</p>
      ) : (
        <>
          <h1>Recently uploaded podcasts by creators you follow</h1>
          <div className="podcast-container">
            {recentPodcasts.map((podcast) => (
              <a
                key={podcast.id}
                href={`/podcast/${podcast.id}`}
                className="podcast"
              >
                <p>{podcast.title}</p>
                <p>By: {podcast.creator.creator_id.username}</p>
              </a>
            ))}
          </div>
          <h1>Podcasts shared by those you follow</h1>
          <div className="podcast-container">
            {sharedPodcasts.map((podcast) => (
              <a
                key={podcast.id}
                href={`/podcast/${podcast.id}`}
                className="podcast"
              >
                <p>{podcast.title}</p>
                <p>By: {podcast.creator.creator_id.username}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
