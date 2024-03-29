import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../services/api";
import MapTime from "../../MapTime/MapTime";

const Story = ({ storyId, index }) => {
  const [story, setStory] = useState({});

  useEffect(() => {
    let source = axios.CancelToken.source();

    async function getStory() {
      try {
        const res = await axiosInstance(`/item/${storyId}.json`, {
          cancelToken: source.token,
        });
        setStory(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getStory();

    return function () {
      source.cancel();
    };
  }, [storyId]);

  return story && story.url ? (
    <div className="Story">
      <div>{index + 1}.</div>
      <div>
        <a href={story.url}>{story.title}</a>
        <p>
          {story.score} points by{" "}
          <Link to={`/user/${story.by}`}>{story.by}</Link>{" "}
          <MapTime timestamp={story.time} /> |{" "}
          <Link to={`/story/${story.id}`}>
            {story.descendants || 0} comments
          </Link>
        </p>
      </div>
    </div>
  ) : null;
};

export default Story;
