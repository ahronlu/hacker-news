import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class='Navbar'>
      <img src='https://news.ycombinator.com/y18.gif' alt='Hacker News' />
      <Link to='/'>
        <span>Hacker News</span>
      </Link>
    </div>
  );
};

export default Navbar;
