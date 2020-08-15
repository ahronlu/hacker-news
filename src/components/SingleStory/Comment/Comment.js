import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { mapTime } from "../../../utils/mapTime";

const Comment = ({ id }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let source = axios.CancelToken.source();
    async function getComment() {
      try {
        const res = await axios(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          { cancelToken: source.token }
        );
        setComment(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getComment();

    return function () {
      source.cancel();
    };
  }, [id]);

  return (
    <>
      {loading ? (
        <i className='fas fa-spinner fa-spin'></i>
      ) : (
        <div className='Comment'>
          <div>
            *<Link to={`/user/${comment.by}`}> {comment.by}</Link>{" "}
            {mapTime(comment.time)} ago{" "}
            <span onClick={() => setShow(!show)}>[{show ? "-" : "+"}]</span>
          </div>
          {show ? (
            <>
              <div
                className='preview rounded p-2'
                dangerouslySetInnerHTML={{ __html: comment.text }}
                id='preview'
              />
              {comment.kids &&
                comment.kids.map((kid, i) => <Comment key={i} id={kid} />)}
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
