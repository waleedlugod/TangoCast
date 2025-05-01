import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * A component that holds the current page the user is on in the website.
 */
export default function Home() {
  const navigate = useNavigate();
  const { authTokens, user } = useContext(AuthContext);
  useEffect(() => {
    if (!authTokens) navigate("/login");
    if (user && !user?.listener) navigate("/studio");
  }, [authTokens, user]);
  let uploadPfpRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: recentPodcasts, isLoading: isLoadingRecentPodcasts } = useQuery(
    {
      queryFn: () => {
        return axios.get(
          `http://localhost:8000/listeners/get_followed_podcasts/`,
          {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }
        );
      },
      queryKey: ["followingPodcasts"],
      select: (data) => data.data,
    }
  );

  const { data: sharedPodcasts, isLoading: isLoadingSharedPodcasts } = useQuery(
    {
      queryFn: () => {
        return axios.get(
          `http://localhost:8000/listeners/get_followed_shares/`,
          {
            headers: { Authorization: `Bearer ${authTokens.access}` },
          }
        );
      },
      queryKey: ["followingSharedPodcasts"],
      select: (data) => data.data,
    }
  );

  const { mutate: uploadPfp } = useMutation({
    mutationKey: ["uploadProfilePhoto"],
    mutationFn: () => {
      return axios.patch(
        `http://localhost:8000/users/${user?.user.id}/`,
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
              src={`http://localhost:8000${user?.user.profile_photo}`}
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
        <div className="left-nav__bot"></div>
      </section>
      {!authTokens ? (
        <p>Login first to access content.</p>
      ) : isLoadingRecentPodcasts || isLoadingSharedPodcasts ? (
        <p>Loading content...</p>
      ) : (
        <>
          <h1>Recently uploaded podcasts by creators you follow</h1>
          <div className="podcast-container">
            {recentPodcasts.map((podcast) => (
              <a
                key={podcast.id}
                href={`/podcast/${podcast.id}`}
                className="podcast"
              >
                <p>{podcast.title}</p>
                <p>By: {podcast.creator.creator_id.username}</p>
              </a>
            ))}
          </div>
          <h1>Podcasts shared by those you follow</h1>
          <div className="podcast-container">
            {sharedPodcasts.map((podcast) => (
              <a
                key={podcast.id}
                href={`/podcast/${podcast.id}`}
                className="podcast"
              >
                <p>{podcast.title}</p>
                <p>By: {podcast.creator.creator_id.username}</p>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
