import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";

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
        <i class='fas fa-spinner fa-spin'></i>
      ) : (
        <div className='Comment'>
          <h4>
            *<Link to={`/user/${comment.by}`}> {comment.by}</Link> on{" "}
            <Moment format='MMM D, YYYY'>{comment.time}</Moment>{" "}
            <span onClick={() => setShow(!show)}>[ {show ? "-" : "+"} ]</span>
          </h4>
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
