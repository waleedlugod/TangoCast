import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchPodcasts(search) {
  return (await fetch(`http://localhost:8000/search/?search=${search}`)).json();
}

export default function Search() {
  const [search, setSearch] = useState("");
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchPodcasts(search),
    queryKey: ["podcasts", { search }],
  });

  return (
    <>
      <form
        action={(formData) => setSearch(formData.get("podcast-search"))}
        method="get"
      >
        <input type="search" name="podcast-search" />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        podcasts?.map((podcast) => {
          return <p key={podcast.title}>{podcast.title}</p>;
        })
      )}
    </>
  );
}
