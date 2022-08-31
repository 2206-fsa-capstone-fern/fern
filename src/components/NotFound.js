import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="cover-container bg-overlay">
      <div className="home-main">
        <p>
          The forest is a big scary place
          <br />
          and it looks like you got lost
          <br />
          Let's be safe and head back <Link to="/">home</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
