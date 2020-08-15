import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ params }) => {
  console.log(params);
  return (
    <div className='Navbar'>
      <img src='https://news.ycombinator.com/y18.gif' alt='Hacker News' />
      <Link to='/'>
        <span>Hacker News</span>
      </Link>
      <Link
        to='/'
        style={{ marginLeft: "10px", color: params === "/" && "#FFF" }}
      >
        Top
      </Link>
      <Link to='/newstories' style={{ marginLeft: "10px" }}>
        New
      </Link>
    </div>
  );
};

export default Navbar;
