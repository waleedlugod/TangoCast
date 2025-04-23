import { useContext } from "react";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

/**
 * A component that holds the current page the user is on in the website.
 */
export default function Home() {
  const { authTokens } = useContext(AuthContext);
  async function fetchFollowingPodcasts() {
    return (
      await fetch(`http://localhost:8000/listeners/get_followed_podcasts/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
    ).json();
  }

  async function fetchFollowingSharedPodcasts() {
    return (
      await fetch(`http://localhost:8000/listeners/get_followed_shares/`, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
    ).json();
  }

  const { data: recentPodcasts, isLoading: isLoadingRecentPodcasts } = useQuery(
    {
      queryFn: () => fetchFollowingPodcasts(),
      queryKey: ["followingPodcasts", authTokens],
    }
  );

  const { data: sharedPodcasts, isLoading: isLoadingSharedPodcasts } = useQuery(
    {
      queryFn: () => fetchFollowingSharedPodcasts(),
      queryKey: ["followingSharedPodcasts", authTokens],
    }
  );

  return (
    <div className="home">
      <h1>Recently uploaded podcasts by creators you follow</h1>
      {isLoadingRecentPodcasts ? (
        <p>Loading podcasts...</p>
      ) : !authTokens || recentPodcasts.code == "token_not_valid" ? (
        <p>Log in to get recent podcasts.</p>
      ) : Object.keys(recentPodcasts).length == 0 ? (
        <p>Could not find any podcasts</p>
      ) : (
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
      )}
      <h1>Podcasts shared by those you follow</h1>
      {isLoadingSharedPodcasts ? (
        <p>Loading shared podcasts...</p>
      ) : (
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
      )}
    </div>
  );
}
