import { useParams } from "react-router-dom";
import "./Analytics.css";
import { useEffect, useState } from "react";

export default function Analytics() {
  let { pk } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [podcastResponse, userResponse] = await Promise.all([
          fetch(
            `http://127.0.0.1:8000/podcast/podcasts/creators/${pk}/podcasts`
          ),
          fetch(`http://127.0.0.1:8000/creators/${pk}/`),
        ]);

        const podcastResult = await podcastResponse.json();
        const userResult = await userResponse.json();

        setPodcasts(
          Array.isArray(podcastResult) ? podcastResult : [podcastResult]
        );
        setUser(userResult);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  let totalViews = 0,
    totalEarnings = 0;
  for (const podcast of podcasts) {
    totalViews += podcast.views;
    totalEarnings += podcast.earnings;
  }

  if (loading) {
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
                <p>Loading...</p>
              </div>
              <div className="data__views">
                <p>Views</p>
                <p>Loading...</p>
              </div>
            </div>
            <div className="data__bot">
              <p>Earnings</p>
              <p>Loading...</p>
            </div>
          </div>
          <div className="top-podcasts">
            <p>Top Podcasts</p>
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
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
              <p>{user?.creator_id?.followers}</p>
            </div>
            <div className="data__views">
              <p>Views</p>
              <p>{totalViews}</p>
            </div>
          </div>
          <div className="data__bot">
            <p>Earnings</p>
            <p>PHP {totalEarnings}</p>
          </div>
        </div>
        <div className="top-podcasts">
          <p className="top-podcasts__title">Top Podcasts</p>
          <div>
            {podcasts?.map((podcast, index) => (
              <div className="podcast-card" key={podcast.id}>
                <div className="podcast-card__left">
                  <p className="podcast-card__number">{index + 1}.</p>
                  <div className="podcast-card__mid">
                    <img
                      src={`http://127.0.0.1:8000${podcast.thumbnail}`}
                      alt={`${podcast.title} thumbnail`}
                    />
                    <div className="podcast-card__info">
                      <p className="podcast-card__title">{podcast.title}</p>
                      <p className="podcast-card__episode">{podcast.episode}</p>
                    </div>
                  </div>
                </div>
                <div className="podcast-card__right">
                  <p>{podcast.views} Views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
