import { useQuery } from "@tanstack/react-query";
import "./Content.css";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

async function fetchPodcasts(pk) {
  return await axios
    .get(`http://127.0.0.1:8000/podcast/podcasts/creators/${pk}/podcasts`)
    .then((res) => res.data);
}

export default function Content() {
  let { pk } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["podcasts", { pk }],
    queryFn: () => fetchPodcasts(pk),
  });

  return (
    <main className="content-main">
      <div className="content-main-container">
        <div className="content-main-container__title">
          <h1>Channel Content</h1>
          <Link to={`/creator/${pk}/upload`}>Upload Podcast</Link>
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
                <Link to={`/creator/${pk}/edit/${podcast.id}`} className="content-podcast-card" key={podcast.id}>
                  <div className="content-podcast-card__left">
                    <div className="content-podcast-card__mid">
                      <img
                        src={`http://127.0.0.1:8000${podcast.thumbnail}`}
                        alt={`${podcast.title} thumbnail`}
                      />
                      <div className="content-podcast-card__info">
                        <p className="content-podcast-card__title">{podcast.title}</p>
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
