import { useParams } from "react-router-dom";
import "./Analytics.css";
import { useEffect, useState } from "react";

export default function Analytics() {
  let { pk } = useParams();
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/search/podcast/${pk}/`
        );
        const result = await response.json();
        setPodcasts(Array.isArray(result) ? result : [result]);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  let totalViews = 0;
  for (const podcast of podcasts) {
    totalViews += podcast.views;
  }

  return (
    <main>
      <div className="main-container">
        <div className="main-container__title">
          <h1>Channel Analytics</h1>
        </div>
        <div className="main-container__data">
          <div className="data__top">
            <div className="data__followers">
              <p>Followers</p>
              <p>500.0K</p>
            </div>
            <div className="data__views">
              <p>Views</p>
              <p>{totalViews}</p>
            </div>
          </div>
          <div className="data__bot">
            <p>Earnings</p>
            <p>PHP 1.0M</p>
          </div>
        </div>
        <div className="top-podcasts">
          <p>Top Podcasts</p>
          <div>
            {podcasts?.map((podcast) => (
              <div key={podcast.id}>{podcast.title}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
