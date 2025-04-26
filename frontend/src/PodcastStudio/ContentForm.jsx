import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import axios from "axios";
import "./ContentForm.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ContentForm({ isUpload }) {
  let formRef = useRef(null);
  let { pk, id } = useParams();
  const { authTokens } = useContext(AuthContext);

  const { data } = useQuery({
    queryKey: ["creator", { pk }],
    queryFn: async () => {
      return await axios
        .get(`http://127.0.0.1:8000/creators/${pk}`)
        .then((res) => res.data);
    },
  });

  const mutation = useMutation({
    mutationKey: ["createPodcast"],
    mutationFn: (formData) => {
      // TODO: fix url after other TODOs are done
      return axios.post(`http://127.0.0.1:8000/podcast/`, formData, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formRaw = new FormData(formRef.current);
    formRaw.set("creator", data.creator_id.id);
    console.log(formRaw.audio);
    mutation.mutate(formRaw);
  };

  return (
    <main className="form-main">
      <div className="form-main-container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="form-heading">
              <div className="form-heading__left">
                <h1>Podcast Detail</h1>
              </div>
              <div className="form-heading__right">
                <button type="submit">Save</button>
                <Link to={`/creator/${pk}/content`}>Cancel</Link>
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
