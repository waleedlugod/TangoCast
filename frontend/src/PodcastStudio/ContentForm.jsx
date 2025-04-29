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

  return (
    <main className="form-main">
      <div className="form-main-container">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            upload();
          }}
        >
          <input type="hidden" name="creator_id" value={user.user.id} />
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
                  <input id="title" type="text" name="title" required />
                </div>
                <div className="form-info__field">
                  <label htmlFor="desc">Description</label>
                  <input id="desc" type="text" name="desc" />
                </div>
                <div className="form-info__field">
                  <label htmlFor="thumbnail">Thumbnail</label>
                  <input id="thumbnail" type="file" name="thumbnail" />
                </div>
                <div className="form-info__field">
                  <label htmlFor="show">Podcast Show</label>
                  <input id="show" type="text" name="show" />
                </div>
              </div>
              <div className="form-info__right">
                <div className="form-info__right__thumbnail">
                  Your Thumbnail Will Be Seen Here!
                </div>
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
                    <textarea name="transcript" id="transcript"></textarea>
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
