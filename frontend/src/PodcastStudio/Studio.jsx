import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import AnalyticsIcon from "../assets/PodcastStudio/AnalyticsIcon.svg";
import ContentIcon from "../assets/PodcastStudio/ContentIcon.svg";
import "./Studio.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PodcastStudio() {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);
  useEffect(() => {
    !authTokens && navigate("/login");
    !user?.creator && navigate("/dashboard");
  }, [authTokens]);

  return (
    <section className="container">
      <section className="left-nav">
        <div className="left-nav__top">
          {user && (
            <img
              className="left-nav__icon"
              src={user?.user.profile_photo}
              alt="User Icon"
            />
          )}
        </div>
        <div className="left-nav__bot">
          <Link className="left-nav__link" to={"/studio"}>
            <img src={AnalyticsIcon} alt="" />
            <p>Analytics</p>
          </Link>
          <Link className="left-nav__link" to={"/studio/content"}>
            <img src={ContentIcon} alt="" />
            <p>Content</p>
          </Link>
        </div>
      </section>
      <Outlet />
    </section>
  );
}
