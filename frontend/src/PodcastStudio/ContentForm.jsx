import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import axios from "axios";
import "./ContentForm.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ContentForm({ isUpload }) {
  let formRef = useRef(null);
  const { authTokens, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: podcast } = useQuery({
    queryKey: ["getstudiopodcast"],
    queryFn: () => {
      return axios.get(`http://localhost:8000/podcast/${id}/`);
    },
    enabled: !isUpload,
    select: (data) => (data = data.data),
  });

  const { mutate: upload } = useMutation({
    mutationKey: ["createPodcast"],
    mutationFn: () => {
      return axios.post(`http://127.0.0.1:8000/podcast/`, formRef.current, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
    },
    onSuccess: () => navigate("/studio/content"),
  });

  const { mutate: edit } = useMutation({
    mutationKey: ["editPodcast"],
    mutationFn: () => {
      return axios.patch(
        `http://127.0.0.1:8000/podcast/${id}/`,
        formRef.current,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
    },
    onSuccess: () => navigate("/studio/content"),
  });

  return (
    <main className="form-main">
      <div className="form-main-container">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            isUpload ? upload() : edit();
          }}
        >
          {user && (
            <input type="hidden" name="creator_id" value={user?.user.id} />
          )}
          <div className="form-body">
            <div className="form-heading">
              <div className="form-heading__left">
                <h1>Podcast Detail</h1>
              </div>
              <div className="form-heading__right">
                <button type="submit">Save</button>
                <Link to={"/studio/content"}>Cancel</Link>
              </div>
            </div>
            <div className="form-info">
              <div className="form-info__left">
                <div className="form-info__field">
                  <label htmlFor="title">Title (Required)</label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    required
                    defaultValue={podcast?.title}
                  />
                </div>
                <div className="form-info__field">
                  <label htmlFor="description">Description</label>
                  <input
                    id="description"
                    type="text"
                    name="description"
                    defaultValue={podcast?.description}
                  />
                </div>
                <div className="form-info__field">
                  <label htmlFor="category">Category</label>
                  <input
                    id="category"
                    type="text"
                    name="category"
                    defaultValue={podcast?.category}
                  />
                </div>
                <div className="form-info__field">
                  <label htmlFor="thumbnail">Thumbnail</label>
                  <input id="thumbnail" type="file" name="thumbnail" />
                </div>
                <div className="form-info__field">
                  <label htmlFor="episode">Episode Number</label>
                  <input
                    id="episode_number"
                    type="number"
                    name="episode_number"
                    defaultValue={podcast?.episode_number}
                  />
                </div>
                <div className="form-info__field">
                  <label htmlFor="episode">Podcast Episode</label>
                  <input
                    id="episode"
                    type="text"
                    name="episode"
                    defaultValue={podcast?.episode}
                  />
                </div>
              </div>
              <div className="form-info__right">
                {/* <div className="form-info__right__thumbnail">
                  Your Thumbnail Will Be Seen Here!
                </div> */}
                <div className="form-info__right__files">
                  <div className="form-info__file">
                    <label htmlFor="audio">Audio (Required)</label>
                    <input id="audio" type="file" name="audio" required />
                  </div>
                  <div className="form-info__file">
                    <label htmlFor="video">Video</label>
                    <input id="video" type="file" name="video" />
                  </div>
                  <div className="form-info__file">
                    <label htmlFor="transcript">Transcript</label>
                    <textarea
                      name="transcript"
                      id="transcript"
                      defaultValue={podcast?.transcript}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
