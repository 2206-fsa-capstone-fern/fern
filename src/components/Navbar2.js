import React from "react";
import { Link } from "react-router-dom";

function Navbar2() {
  return (
    <div className="navbar">
      <div className="navbar-accts">
        <Link to="/addaccount">+ Add Accounts</Link>
        {/* Depends on how the plaid integration works, linking for now */}
      </div>
      <div className="navbar-settings">
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}

export default Navbar2;
