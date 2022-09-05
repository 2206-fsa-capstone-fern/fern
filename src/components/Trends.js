import React from "react";
import Daily from "./Daily";
import Month from "./Month";
import SideNav from "./SideNav/SideNav";

function Trends() {
  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <div className="trends-graphs">
            <div
              // className="card-bg w-200 border d-flex flex-column h-2000"
              className="daily-bar-graph"
            >
              <Daily className="dailybargraph" />
          </div>
          <div className="monthly-bar-graph">
            <Month />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
