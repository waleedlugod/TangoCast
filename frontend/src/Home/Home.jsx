import { useContext } from "react";
import "./Home.css";
import { AuthContext } from "../context/AuthContext";

/**
 * A component that holds the current page the user is on in the website.
 */
export default function Home() {
  const { authTokens } = useContext(AuthContext);
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchFollowingPodcasts(authTokens),
    queryKey: ["followingPodcasts"],
  });

  return (
    <div className="home">
      {!authTokens ? (
        <p>Log in to get recent podcasts.</p>
      ) : isLoading ? (
        <p>Loading podcasts...</p>
      ) : (
        <div className="podcast-container">
          {podcasts.map((podcast) => (
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
