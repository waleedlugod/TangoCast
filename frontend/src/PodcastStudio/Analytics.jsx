import "./Analytics.css";

export default function Analytics() {
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
              <p>1.0M</p>
            </div>
          </div>
          <div className="data__bot">
            <p>Earnings</p>
            <p>PHP 1.0M</p>
          </div>
        </div>
        <div className="top-podcasts">
          <p>Top Podcasts</p>
        </div>
      </div>
    </main>
  );
}
