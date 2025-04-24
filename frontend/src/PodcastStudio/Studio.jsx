import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import AnalyticsIcon from "../assets/NavBar/PodcastStudio/AnalyticsIcon.svg";
import ContentIcon from "../assets/NavBar/PodcastStudio/ContentIcon.svg";
import ActivityIcon from "../assets/NavBar/PodcastStudio/ActivityIcon.svg";
import "./Studio.css";

export default function PodcastStudio() {
  let { pk } = useParams();

  return (
    <section className="container">
      <section className="left-nav">
        <div className="left-nav__top">
          <a href="#">
            <img
              className="left-nav__icon"
              src={PlaceholderIcon}
              alt="User Icon"
            />
          </a>
        </div>
        <div className="left-nav__bot">
          <Link className="left-nav__link" to={`/creator/${pk}`}>
            <img src={AnalyticsIcon} alt="" />
            <p>Analytics</p>
          </Link>
          <a className="left-nav__link" href="#">
            <img src={ContentIcon} alt="" />
            <p>Content</p>
          </a>
          <a className="left-nav__link" href="#">
            <img src={ActivityIcon} alt="" />
            <p>Activity</p>
          </a>
        </div>
      </section>
      <Outlet />
    </section>
  );
}
