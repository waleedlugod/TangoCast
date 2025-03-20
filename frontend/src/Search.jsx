import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchPodcasts(search, category) {
  return (
    await fetch(
      `http://localhost:8000/search/?search=${search}&category=${category}`
    )
  ).json();
}

export default function Search() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => fetchPodcasts(search, category),
    queryKey: ["podcasts", { search, category }],
  });

  return (
    <>
      <form
        action={(formData) => setSearch(formData.get("podcast-search"))}
        method="get"
      >
        <input
          type="search"
          name="podcast-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        podcasts?.map((podcast) => {
          return <p key={podcast.title}>{podcast.title}</p>;
        })
      )}

      <select
        name="category"
        id=""
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">--Choose a category--</option>
        <option value="rock">Rock</option>
        <option value="pop">pop</option>
      </select>
    </>
  );
}
