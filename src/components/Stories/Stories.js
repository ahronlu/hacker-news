import React, { useEffect, useState } from "react";
import axios from "axios";
import Story from "./Story/Story";

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  const stories = storyIds.map((storyId, index) => (
    <Story key={storyId} index={index} storyId={storyId} />
  ));

  return (
    <div className='Stories'>
      {loading ? (
        <i class='fas fa-spinner fa-spin'></i>
      ) : (
        stories.slice(page * 30 - 30, page * 30)
      )}
      <div className='pagination'>
        {page > 1 && <span onClick={() => setPage(page - 1)}>Prev</span>}
        {page < 17 && <span onClick={() => setPage(page + 1)}>Next</span>}
      </div>
    </div>
  );
};

export default Stories;
