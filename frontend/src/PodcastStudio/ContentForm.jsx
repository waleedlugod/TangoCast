import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./ContentForm.css";

export default function ContentForm({ isUpload }) {
  let { pk, id } = useParams();

  return (
    <main className="form-main">
      <div className="form-main-container">
        <form action="">
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
                    <input id="transcript" type="file" name="transcript" />
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
