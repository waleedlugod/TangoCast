import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./Search.css";
import axios from "axios";

export default function Search() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return axios.get("http://localhost:8000/podcast/get_categories/");
    },
    select: (data) => (data = data.data),
  });

  const { data: podcasts, isLoading } = useQuery({
    queryFn: () => {
      return axios.get(
        `http://localhost:8000/podcast/?search=${search}&category=${category}`
      );
    },
    queryKey: ["podcasts", { search, category }],
    select: (data) => data.data,
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
        {categories?.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="podcast-container">
        {isLoading ? (
          <p>loading...</p>
        ) : Object.keys(podcasts).length === 0 ? (
          <p>Could not find podcast</p>
        ) : (
          podcasts.map((podcast) => {
            return (
              <a
                key={podcast.title}
                className="podcast"
                // TODO: fix url after other TODOs are done
                href={`/podcast/${podcast.id}`}
              >
                <p>{podcast.title}</p>
                <img src={podcast.thumbnail} alt="" />
              </a>
            );
          })
        )}
      </div>
    </div>
  );
}
