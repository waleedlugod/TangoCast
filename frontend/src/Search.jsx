import { useQuery } from "@tanstack/react-query";

async function fetchPodcasts() {
  const res = await fetch("http://localhost:8000/search");
  return await res.json();
}

export default function Search() {
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchPodcasts(),
    queryKey: ["podcasts"],
  });
  if (isLoading) return <div>loading...</div>;

  console.log(podcasts);

  return (
    <>
      <p>{JSON.stringify(podcasts)}</p>
      {/* {podcasts?.map((podcast) => {
        return podcast;
      })} */}
    </>
  );
}
