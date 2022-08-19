// EXAMPLE of what chart rendering js file would look like

// import React, { useState } from "react";
// import "./App.css";
// import BarGraph from "./components/BarGraph";
// import LineGraph from "./components/LineGraph";
// import PieChart from "./components/PieChart";
// import { UserData } from "./data"; // <--- source of data

// function ChartApp() {
  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.year), // a list of all the labels that represent each bar (i.e. years), line in a line chart, etc
  //   datasets: [
  //     {
  //       label: "Users Gained", // what this data represents, can easily change to another category (i.e. Users Lost)
  //       data: UserData.map((data) => data.userGain), // can change this to data.userLost
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ], // set color pattern of bars
  //       borderColor: "black", // additional attributes
  //       borderWidth: "2",
  //     },
  //   ],
  // });

  // return (
  //   <div className="App">
  //     <div style={{ width: "700px" }}>
  //       <BarGraph chartData={userData} />
  //     </div>
  //     <br />
  //     <br />
  //     <br />
  //     <div style={{ width: "700px" }}>
  //       <LineGraph chartData={userData} />
  //     </div>
  //     <br />
  //     <br />
  //     <br />
  //     <div style={{ width: "700px" }}>
  //       <PieChart chartData={userData} />
  //     </div>
  //   </div>
  // );
// }

// export default ChartApp;