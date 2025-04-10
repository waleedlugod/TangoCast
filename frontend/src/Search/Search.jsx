import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./Search.css";

async function fetchPodcasts(search, category) {
  return (
    await fetch(
      `http://localhost:8000/podcast/?search=${search}&category=${category}`
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
    <div className="search-wrapper">
      <form action={(formData) => setSearch(formData.get("podcast-search"))}>
        <input
          type="search"
          name="podcast-search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <select
        name="category"
        className="search-dropdown"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">--Choose a category--</option>
        <option value="fiction">Fiction</option>
        <option value="comedy">Comedy</option>
        <option value="culture">Culture</option>
      </select>

      <div className="podcast-container">
        {isLoading ? (
          <p>loading...</p>
        ) : Object.keys(podcasts).length === 0 ? (
          <p>Could not find podcast</p>
        ) : (
          podcasts?.map((podcast) => {
            return (
              <div key={podcast.title} className="podcast">
                <a href={`/podcast/${podcast.id}`}>{podcast.title}</a>
                <img src={podcast.thumbnail} alt="" />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
