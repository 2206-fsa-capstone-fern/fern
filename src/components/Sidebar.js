import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sb-link">
        <Link to="/">
          <img src="" alt="fern logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="sb-link">
        <button className="sb-overview">
          <Link to="/overview">Overview</Link>
        </button>
      </div>
      <div className="sb-link">
        <button>
          <Link to="/transactions" className="sb-transactions">
            Transactions
          </Link>
        </button>
      </div>
      <div className="sb-link">
        <button className="sb-goals">
          <Link to="/goals">Goals</Link>
        </button>
      </div>
      <div className="sb-link">
        <button className="sb-trends">
          <Link to="/trends">Trends</Link>
        </button>
      </div>
      <br />
      <br />
      <br />
      <div className="sb-link">
        <button className="sb-signout">
          <Link to="/">Sign Out</Link>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
