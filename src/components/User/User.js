import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";

const User = ({ match }) => {
  const userId = match.params.userId;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios(
          `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }

    getUser();
  }, [userId]);

  return (
    <div className='User'>
      {loading ? (
        <i className='fas fa-spinner fa-spin'></i>
      ) : (
        <>
          <p>user: {userId}</p>
          <p>
            created: <Moment format='MMM D, YYYY'>{user.created}</Moment>
          </p>
          <p>karma: {user.karma}</p>
          {user.about && (
            <div className='about'>
              about:
              <div
                className='preview rounded p-2'
                dangerouslySetInnerHTML={{ __html: user.about }}
                id='preview'
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default User;
