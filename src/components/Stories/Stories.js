import React, { useEffect, useState } from "react";
import axios from "axios";
import Story from "./Story/Story";

const Stories = ({ match }) => {
  const [storyIds, setStoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  let type = match.params.type || "topstories";

  useEffect(() => {
    setLoading(true);
    async function getStoryIds() {
      try {
        const res = await axios(
          `https://hacker-news.firebaseio.com/v0/${type}.json`
        );
        setStoryIds(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getStoryIds();
  }, [type]);

  const stories = storyIds.map((storyId, index) => (
    <Story key={storyId} index={index} storyId={storyId} />
  ));

  return (
    <div className='Stories'>
      {loading ? (
        <i className='fas fa-spinner fa-spin'></i>
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
