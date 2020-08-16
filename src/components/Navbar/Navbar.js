import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className='Navbar'>
      <img src='https://news.ycombinator.com/y18.gif' alt='Hacker News' />
      <Link to='/'>
        <span>Hacker News</span>
      </Link>
      <Link to='/'>Top</Link>
      <Link to='/newstories'>New</Link>
    </div>
  );
};

export default Navbar;
