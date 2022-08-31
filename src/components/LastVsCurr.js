// Line graph of last month spending vs currnet month spending

// // By CATEGORY
// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement);

// const LastVsCurr = () => {
//   const [chart, setChart] = useState([]);
//   const [chart2, setChart2] = useState([]);

//   let base = "https://sandbox.plaid.com/";
//   let baseURL = `${base}transactions/get`;
//   let proxyURL = "https://cors-anywhere.herokuapp.com/";
//   let apiKey = "62fd4373e8c0170014239c33";

//   useEffect(() => {
//     const fetchCoins = async () => {
//       await fetch(`${proxyURL}${baseURL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": `${apiKey}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
//           secret: process.env.REACT_APP_PLAID_SECRET,
//           access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
//           start_date: "2022-08-01",
//           end_date: "2022-09-01",
//         }),
//       })
//         .then((response) => {
//           response.json().then((json) => {
//             console.log("json55: \n", json);
//             setChart(json.transactions);
//           });
//         })
//         .catch((error) => {
//           console.log("error: \n", error);
//         });
//     };

//     fetchCoins();
//   }, [baseURL, proxyURL, apiKey]);

//   useEffect(() => {
//     const fetch2 = async () => {
//       await fetch(`${proxyURL}${baseURL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": `${apiKey}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
//           secret: process.env.REACT_APP_PLAID_SECRET,
//           access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
//           start_date: "2022-07-01",
//           end_date: "2022-08-01",
//         }),
//       })
//         .then((response) => {
//           response.json().then((json) => {
//             console.log("json113: \n", json);
//             setChart2(json.transactions);
//           });
//         })
//         .catch((error) => {
//           console.log("error: \n", error);
//         });
//     };
//     fetch2();
//   }, [baseURL, proxyURL, apiKey]);

//   console.log("chart: \n", chart);
//   console.log("chart2: \n", chart2);

//   const values = () => {
//     let obj = {};
//     for (let i = 0; i < chart.length; i++) {
//       if (!obj.hasOwnProperty(chart[i].category[0])) {
//         obj[chart[i].category[0]] = 0;
//       }
//       obj[chart[i].category[0]] += chart[i].amount;
//       let numNum = obj[chart[i].category[0]].toFixed(2);
//       let anumNum = Number(numNum);
//       obj[chart[i].category[0]] = anumNum;
//       if (obj[chart[i].category[0]] < 0) {
//         obj[chart[i].category[0]] = 0;
//       }
//     }
//     return obj;
//   };
//   console.log("values() \n", values());

//   const values2 = () => {
//     let obj = {};
//     for (let i = 0; i < chart2.length; i++) {
//       if (!obj.hasOwnProperty(chart2[i].category[0])) {
//         obj[chart2[i].category[0]] = 0;
//       }
//       obj[chart2[i].category[0]] += chart2[i].amount;
//       let numNum = obj[chart2[i].category[0]].toFixed(2);
//       // console.log('numnum', numNum)
//       let anumNum = Number(numNum);
//       // console.log('anumnum', anumNum)
//       obj[chart2[i].category[0]] = anumNum;
//       if (obj[chart2[i].category[0]] < 0) {
//         obj[chart2[i].category[0]] = 0;
//       }
//     }
//     return obj;
//   };
//   console.log("values2() \n", values2());

//   // const datesAndAmt = () => {
//   //   let obj = {};
//   //   for (let i = 0; i < chart.length; i++) {
//   //     let dates = chart[i].date;
//   //     let amounts = chart[i].amount;

//   //     const date = new Date(dates);
//   //     dates = date.toLocaleString('en-US', {
//   //       month: 'long'
//   //     })

//   //     if (!obj.hasOwnProperty(dates)) {
//   //       obj[dates] = amounts;
//   //     }
//   //     obj[dates] += amounts
//   //   }
//   //   return obj
//   // }
//   // console.log('datesAndAmt()', datesAndAmt())
//   // let datesAndAmount = datesAndAmt();

//   // x-axis as category
//   // y-axis is amount

//   let data = {
//     labels: Object.keys(values()),
//     datasets: [
//       {
//         label: 'Last Month',
//         data: Object.values(values()),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           // "rgba(54, 162, 235, 0.2)",
//           // "rgba(255, 206, 86, 0.2)",
//           // "rgba(75, 192, 192, 0.2)",
//           // "rgba(153, 102, 255, 0.2)",
//           // "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           // "rgba(54, 162, 235, 1)",
//           // "rgba(255, 206, 86, 1)",
//           // "rgba(75, 192, 192, 1)",
//           // "rgba(153, 102, 255, 1)",
//           // "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//       {
//         label: 'This Month',
//         data: Object.values(values2()),
//         backgroundColor: [
//           // "rgba(255, 99, 132, 0.2)",
//           // "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//           // "rgba(75, 192, 192, 0.2)",
//           // "rgba(153, 102, 255, 0.2)",
//           // "rgba(255, 159, 64, 0.2)",
//         ],
//         borderColor: [
//           // "rgba(255, 99, 132, 1)",
//           // "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           // "rgba(75, 192, 192, 1)",
//           // "rgba(153, 102, 255, 1)",
//           // "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   let options = {
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     legend: {
//       labels: {
//         fontSize: 25,
//       },
//     },
//   };

//   return (
//     <div>
//       <Bar height={400} data={data} options={options} />
//     </div>
//   );
// };

// export default LastVsCurr;

// ----------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement);

// ----------------------------------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LastVsCurr = () => {
  const [chart, setChart] = useState([]);
  const [chart2, setChart2] = useState([]);

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";
  let firstDateOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];
  let lastDateOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split("T")[0];
  let firstDateOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split("T")[0];
  let lastDateOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split("T")[0];
  // console.log('firstDayOfThisMonth', firstDayOfThisMonth)
  // console.log('lastDayOfThisMonth:', lastDayOfThisMonth)
  // console.log('firstDayOfLastMonth', firstDayOfLastMonth)
  // console.log('lastDayOfLastMonth:', lastDayOfLastMonth)

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
          secret: process.env.REACT_APP_PLAID_SECRET,
          access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
          start_date: firstDateOfThisMonth,
          end_date: lastDateOfThisMonth,
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("json285: \n", json);
            setChart(json.transactions);
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
        });
    };
    fetchCoins();
  }, [baseURL, proxyURL, apiKey, firstDateOfThisMonth, lastDateOfThisMonth]);

  useEffect(() => {
    const fetch2 = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
          secret: process.env.REACT_APP_PLAID_SECRET,
          access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
          start_date: firstDateOfLastMonth,
          end_date: lastDateOfLastMonth,
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("json315: \n", json);
            setChart2(json.transactions);
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
        });
    };
    fetch2();
  }, [baseURL, proxyURL, apiKey, firstDateOfLastMonth, lastDateOfLastMonth]);

  console.log("chart: \n", chart); // all transactions for August
  console.log("chart2: \n", chart2); // all transactions for July

  // GOAL:
  // { date: [lastMonth.amount, thisMonth.amount]}   // { date: [chart[i].amount, chart[j].amount]}
  // { 01: [5.83, 8.59],
  // 02: [1.34, 9.30],
  // 03: [0.00, 8.75], }

  const datesAndAmt = () => {
    let obj = {};
    for (let i = 1; i < 32; i++) {
      let key = i.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      obj[key] = 0;
    }

    for (let i = 0; i < chart.length; i++) {
      let dates = chart[i].date;
      let amounts = chart[i].amount;

      const date = new Date(dates);
      dates = date.toLocaleString("en-US", {
        day: "2-digit",
        // day: 'numeric',
      });

      // console.log('dates', dates)

      obj[dates] += amounts;
    }
    return obj;
  };
  console.log("datesAndAmt()", datesAndAmt());

  const datesAndAmt2 = () => {
    let obj2 = {};
    for (let j = 1; j < 32; j++) {
      let key2 = j.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      obj2[key2] = 0;
    }
    // console.log('obj2 presurgery', obj2)
    for (let j = 0; j < chart2.length; j++) {
      let dates = chart2[j].date;
      let amounts = chart2[j].amount;
      const date = new Date(dates);
      dates = date.toLocaleDateString("en-US", {
        day: "2-digit",
      });
      // console.log('dates2', dates)
      obj2[dates] += amounts;
    }
    // console.log('obj2', obj2)
    return obj2;
  };
  // console.log('datesAndAmt2()', datesAndAmt2())
  let datesAndAmount = datesAndAmt();
  let datesAndAmount2 = datesAndAmt2();
  console.log("datesAndAmount2", datesAndAmount2);
  let dates2 = Object.keys(datesAndAmount2);
  let objvals = Object.values(datesAndAmount);
  let objvals2 = Object.values(datesAndAmount2);
  // console.log('objvals2', objvals2)

  const rotateArr = (originalArr, rotateNum) => {
    let front = originalArr.slice(-rotateNum);
    let end = originalArr.slice(0, -rotateNum);
    return front.concat(end);
  };
  dates2 = rotateArr(dates2, 9);
  objvals = rotateArr(objvals, 11);
  objvals2 = rotateArr(objvals2, 9);
  console.log("objvals", objvals);
  console.log("objvals2", objvals2); // <-- works right
  // console.log('daets2', dates2)

  let data = {
    // labels: Object.keys(datesAndAmt2()),
    labels: dates2,
    datasets: [
      {
        label: "Last Month",
        // data: Object.values(datesAndAmt()),
        data: objvals,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          "rgba(143, 207, 155, 0.7)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
          "rgba(143, 207, 155, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "This Month",
        data: objvals2,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          "rgba(50, 168, 82, 0.7)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
          "rgba(50, 168, 82, 1)",
        ],
        borderWidth: 2.5,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Amount Spent',
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date of Month',
        }
      }
    },
    plugins: {
      title: {
        display: true,
        align: 'center',
        position: 'top',
        text: "Last Month Spending vs Current Month Spending",
        font: {
          size: 30,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        events: ["mousemove"],
      },
    },
  };

  return (
    <div>
      {/* <Bar height={400} data={data} options={options} /> */}
      <Line height={400} data={data} options={options} />
    </div>
  );
};

export default LastVsCurr;
