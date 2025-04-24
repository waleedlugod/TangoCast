import { useContext } from "react";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * A component that holds the current page the user is on in the website.
 */
export default function Home() {
  const { authTokens, user } = useContext(AuthContext);

  async function fetchFollowingPodcasts() {
    const data = await axios.get(
      `http://localhost:8000/listeners/get_followed_podcasts/`,
      {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      }
    );
    return data;
  }

  async function fetchFollowingSharedPodcasts() {
    const data = await axios.get(
      `http://localhost:8000/listeners/get_followed_shares/`,
      {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      }
    );
    return data;
  }

  const {
    data: recentPodcasts,
    isLoading: isLoadingRecentPodcasts,
    isError: isErrorRecentPodcasts,
  } = useQuery({
    queryFn: () => fetchFollowingPodcasts(),
    queryKey: ["followingPodcasts"],
  });

  const {
    data: sharedPodcasts,
    isLoading: isLoadingSharedPodcasts,
    isError: isErrorSharedPodcasts,
  } = useQuery({
    queryFn: () => fetchFollowingSharedPodcasts(),
    queryKey: ["followingSharedPodcasts"],
  });

  return (
    <div className="home">
      {isErrorRecentPodcasts || isErrorSharedPodcasts ? (
        <p>Login first to access content.</p>
      ) : isLoadingRecentPodcasts || isLoadingSharedPodcasts ? (
        <p>Loading content...</p>
      ) : (
        <>
          <h1>Recently uploaded podcasts by creators you follow</h1>
          <div className="podcast-container">
            {recentPodcasts.data.map((podcast) => (
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
            {sharedPodcasts.data.map((podcast) => (
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
