import React from "react";
import Daily from "./Charts/Daily";
import Month from "./Charts/Month";
import SideNav from "./NavBars/SideNav";

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
          <div style={{ height: "calc(100% - 64px)", overflowY: "scroll" }}>
            <div className="trends-graphs">
              <div className="daily-bar-graph">
                <Daily className="dailybargraph" />
              </div>
              <div className="monthly-bar-graph">
                <Month />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trends;
