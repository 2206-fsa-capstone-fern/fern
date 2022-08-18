import React from "react";
import { Link } from "react-router-dom";

function Navbar(user) {
  return (
    <div className="navbar">
      <div className="navbar-link">
        <Link to="/settings">Settings</Link>
      </div>
      <div className="navbar-user">
        <p>{user.name}</p>
      </div>
    </div>
  );
}

export default Navbar;
