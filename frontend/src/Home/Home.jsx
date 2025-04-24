import { useQuery } from "@tanstack/react-query";

async function fetchFollowingPodcasts(authTokens) {
  return (
    await fetch(`http://localhost:8000/listeners/get_followed_podcasts/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    })
  ).json();
}

export default function Home() {
  const authTokens = JSON.parse(localStorage.getItem("authTokens"));
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchFollowingPodcasts(authTokens),
    queryKey: ["followingPodcasts"],
  });

  return (
    <div className="home">
      {isLoading ? (
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