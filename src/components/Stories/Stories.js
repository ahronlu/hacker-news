import React, { useEffect, useState } from "react";
import axios from "axios";
import Story from "./Story/Story";

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getStoryIds() {
      try {
        const res = await axios(
          "https://hacker-news.firebaseio.com/v0/newstories.json"
        );
        setStoryIds(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getStoryIds();
  }, []);

  return (
    <div className='Stories'>
      {loading ? (
        <i class='fas fa-spinner fa-spin'></i>
      ) : (
        storyIds.map((storyId, i) => (
          <Story key={storyId} index={i} storyId={storyId} />
        ))
      )}
    </div>
  );
};

export default Stories;
