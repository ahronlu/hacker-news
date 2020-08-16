import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../services/hnApi";
import MapTime from "../MapTime/MapTime";
import Comment from "./Comment/Comment";

const SingleStory = (props) => {
  const storyId = props.match.params.id;
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }

    getStory();
    return function () {
      source.cancel();
    };
  }, [storyId]);

  return (
    <>
      {loading ? (
        <i className='fas fa-spinner fa-spin'></i>
      ) : (
        <div className='SingleStory'>
          <a href={story.url}>{story.title}</a>
          <p>
            {story.score} points by{" "}
            <Link to={`/user/${story.by}`}>{story.by}</Link>{" "}
            <MapTime timestamp={story.time} /> |{" "}
            <Link to={`/story/${story.id}`}>{story.descendants} comments</Link>
          </p>
          <hr />
          <div>
            {story.kids &&
              story.kids.map((kid, i) => <Comment key={i} id={kid} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default SingleStory;
