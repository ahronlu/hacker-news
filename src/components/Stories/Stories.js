import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../services/api";
import Story from "./Story/Story";

const TOPSTORIES = "topstories";

const Stories = ({ match }) => {
  const [storyIds, setStoryIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  let type = match.params.type || TOPSTORIES;

  useEffect(() => {
    setPage(1);
    setLoading(true);
    async function getStoryIds() {
      try {
        const res = await axiosInstance(`/${type}.json`);
        setStoryIds(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getStoryIds();
  }, [type, match.url]);

  const stories = storyIds.map((storyId, index) => (
    <Story key={storyId} index={index} storyId={storyId} />
  ));

  return (
    <div className='Stories'>
      {loading ? (
        <i className='fas fa-spinner fa-spin'></i>
      ) : (
        stories.map(
          (story, i) => i < page * 30 && i + 1 > (page - 1) * 30 && story
        )
      )}
      <div className='pagination'>
        {page > 1 && <span onClick={() => setPage(page - 1)}>Prev</span>}
        {page < stories.length / 30 && (
          <span onClick={() => setPage(page + 1)}>Next</span>
        )}
      </div>
    </div>
  );
};

export default Stories;
