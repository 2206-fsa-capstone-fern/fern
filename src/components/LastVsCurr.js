// Line graph of last month spending vs currnet month spending

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

// ----------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LastVsCurr = () => {
  const [chart, setChart] = useState([]);
  const [chart2, setChart2] = useState([]);

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";

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
          start_date: "2022-08-01",
          end_date: "2022-09-01",
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("json55: \n", json);
            setChart(json.transactions);
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
        });
    };

    // const fetch2 = async () => {
    //   await fetch(`${proxyURL}${baseURL}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-access-token": `${apiKey}`,
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     body: JSON.stringify({
    //       client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
    //       secret: process.env.REACT_APP_PLAID_SECRET,
    //       access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
    //       start_date: "2022-07-01",
    //       end_date: "2022-08-01",
    //     }),
    //   })
    //     .then((response) => {
    //       response.json().then((json) => {
    //         console.log("json82: \n", json);
    //         setChart(json.transactions);
    //       });
    //     })
    //     .catch((error) => {
    //       console.log("error: \n", error);
    //     });
    // };
    fetchCoins();
    // fetch2();
  }, [baseURL, proxyURL, apiKey]);

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
          start_date: "2022-07-01",
          end_date: "2022-08-01",
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            console.log("json113: \n", json);
            setChart2(json.transactions);
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
        });
    };
    fetch2();
  }, [baseURL, proxyURL, apiKey]);

  console.log("chart: \n", chart);
  console.log("chart2: \n", chart2);

  const values = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      if (!obj.hasOwnProperty(chart[i].category[0])) {
        obj[chart[i].category[0]] = 0;
      }
      obj[chart[i].category[0]] += chart[i].amount;
      let numNum = obj[chart[i].category[0]].toFixed(2);
      // console.log('numnum', numNum)
      let anumNum = Number(numNum);
      // console.log('anumnum', anumNum)
      obj[chart[i].category[0]] = anumNum;
      if (obj[chart[i].category[0]] < 0) {
        obj[chart[i].category[0]] = 0;
      }
    }
    return obj;
  };
  console.log("values() \n", values());

  const values2 = () => {
    let obj = {};
    for (let i = 0; i < chart2.length; i++) {
      if (!obj.hasOwnProperty(chart2[i].category[0])) {
        obj[chart2[i].category[0]] = 0;
      }
      obj[chart2[i].category[0]] += chart2[i].amount;
      let numNum = obj[chart2[i].category[0]].toFixed(2);
      // console.log('numnum', numNum)
      let anumNum = Number(numNum);
      // console.log('anumnum', anumNum)
      obj[chart2[i].category[0]] = anumNum;
      if (obj[chart2[i].category[0]] < 0) {
        obj[chart2[i].category[0]] = 0;
      }
    }
    return obj;
  };
  console.log("values2() \n", values2());

  // const datesAndAmt = () => {
  //   let obj = {};
  //   for (let i = 0; i < chart.length; i++) {
  //     let dates = chart[i].date;
  //     let amounts = chart[i].amount;

  //     const date = new Date(dates);
  //     dates = date.toLocaleString('en-US', {
  //       month: 'long'
  //     })

  //     if (!obj.hasOwnProperty(dates)) {
  //       obj[dates] = amounts;
  //     }
  //     obj[dates] += amounts
  //   }
  //   return obj
  // }
  // console.log('datesAndAmt()', datesAndAmt())
  // let datesAndAmount = datesAndAmt();

  // x-axis as category
  // y-axis is amount

  let data = {
    labels: Object.keys(values()),
    datasets: [
      {
        label: 'Last Month',
        data: Object.values(values()),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: 'This Month',
        data: Object.values(values2()),
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Bar height={400} data={data} options={options} />
    </div>
  );

  // return <h2>Last vs Curr</h2>;
};

export default LastVsCurr;
