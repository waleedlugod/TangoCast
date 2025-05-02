import { useQuery } from "@tanstack/react-query";
import "./Content.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Content() {
  const { user } = useContext(AuthContext);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["podcasts", { user }],
    queryFn: () => {
      return axios.get(
        `http://localhost:8000/podcast/?creator=${user.user.id}`
      );
    },
    select: (data) => (data = data.data),
  });

  return (
    <main className="content-main">
      <div className="content-main-container">
        <div className="content-main-container__title">
          <h1>Channel Content</h1>
          <Link to={"/studio/upload"}>Upload Podcast</Link>
        </div>
        <div className="content__podcasts">
          <div className="content__titles">
            <p>Podcast</p>
            <p>Views</p>
          </div>
          {isPending ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error fetching podcasts. Please refresh.</p>
          ) : (
            data?.map((podcast, index) => {
              return (
                <Link
                  to={`/studio/edit/${podcast.id}`}
                  className="content-podcast-card"
                  key={podcast.id}
                >
                  <div className="content-podcast-card__left">
                    <div className="content-podcast-card__mid">
                      <img
                        src={podcast.thumbnail}
                        alt={`${podcast.title} thumbnail`}
                      />
                      <div className="content-podcast-card__info">
                        <p className="content-podcast-card__title">
                          {podcast.title}
                        </p>
                        <p className="content-podcast-card__episode">
                          {podcast.episode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="content-podcast-card__right">
                    <p>{podcast.views} Views</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
