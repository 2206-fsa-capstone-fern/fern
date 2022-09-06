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
  let firstDateOfThisMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  )
    .toISOString()
    .split("T")[0];
  let lastDateOfThisMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  )
    .toISOString()
    .split("T")[0];
  let firstDateOfLastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1
  )
    .toISOString()
    .split("T")[0];
  let lastDateOfLastMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  )
    .toISOString()
    .split("T")[0];

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
            setChart(json.transactions);
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error)
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
            setChart2(json.transactions);
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error)
        });
    };
    fetch2();
  }, [baseURL, proxyURL, apiKey, firstDateOfLastMonth, lastDateOfLastMonth]);

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
      });

      obj[dates] += amounts;
    }
    return obj;
  };

  const datesAndAmt2 = () => {
    let obj2 = {};
    for (let j = 1; j < 32; j++) {
      let key2 = j.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      });
      obj2[key2] = 0;
    }

    for (let j = 0; j < chart2.length; j++) {
      let dates = chart2[j].date;
      let amounts = chart2[j].amount;
      const date = new Date(dates);
      dates = date.toLocaleDateString("en-US", {
        day: "2-digit",
      });

      obj2[dates] += amounts;
    }

    return obj2;
  };

  let datesAndAmount = datesAndAmt();
  let datesAndAmount2 = datesAndAmt2();
  let dates2 = Object.keys(datesAndAmount2);
  let objvals = Object.values(datesAndAmount);
  let objvals2 = Object.values(datesAndAmount2);

  const rotateArr = (originalArr, rotateNum) => {
    let front = originalArr.slice(-rotateNum);
    let end = originalArr.slice(0, -rotateNum);
    return front.concat(end);
  };
  dates2 = rotateArr(dates2, 9);
  objvals = rotateArr(objvals, 11);
  objvals2 = rotateArr(objvals2, 9);

  let data = {
    labels: dates2,
    datasets: [
      {
        label: "Last Month",

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
          text: "Amount Spent",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date of Month",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        align: "center",
        position: "top",
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
