import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="cover-container bg-overlay">
      <div className="home-main">
        <p>
          It looks like you might be lost.
          <br />
          Head back{" "}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
