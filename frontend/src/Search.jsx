import { useQuery } from "@tanstack/react-query";

async function fetchPodcasts() {
  return (await fetch("http://localhost:8000/search")).json();
}

export default function Search() {
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchPodcasts(),
    queryKey: ["podcasts"],
  });
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      {podcasts?.map((podcast) => {
        return <p>{podcast.title}</p>;
      })}
    </>
  );
}
