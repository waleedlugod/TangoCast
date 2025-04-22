import "./Home.css";
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
      {authTokens ? <>logged in</> : <p>You are not logged in.</p>}
    </div>
  );
}
