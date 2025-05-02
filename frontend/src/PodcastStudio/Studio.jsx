import { useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import PlaceholderIcon from "../assets/NavBar/PlaceholderIcon.png";
import AnalyticsIcon from "../assets/PodcastStudio/AnalyticsIcon.svg";
import ContentIcon from "../assets/PodcastStudio/ContentIcon.svg";
import "./Studio.css";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function PodcastStudio() {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);
  useEffect(() => {
    !authTokens && navigate("/login");
    user && !user?.creator && navigate("/dashboard");
  }, [authTokens, user]);
  let uploadPfpRef = useRef(null);
  const queryClient = useQueryClient();

  const { mutate: uploadPfp } = useMutation({
    mutationKey: ["uploadProfilePhoto"],
    mutationFn: () => {
      return axios.patch(
        `http://localhost:8000/users/${user.user.id}/`,
        uploadPfpRef.current,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return (
    <section className="container">
      <section className="left-nav">
        <div className="left-nav__top">
          {user && (
            <img
              className="left-nav__icon"
              src={
                user?.user.profile_photo
                  ? `http://localhost:8000${user?.user.profile_photo}`
                  : PlaceholderIcon
              }
              alt="User Icon"
            />
          )}
        </div>
        <form
          ref={uploadPfpRef}
          onSubmit={(e) => {
            e.preventDefault();
            uploadPfp();
          }}
        >
          <div className="form-info__field">
            <label htmlFor="profile_photo">Change Profile Photo</label>
            <input id="profile_photo" type="file" name="profile_photo" />
            <button type="submit">Upload</button>
          </div>
        </form>
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
