import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ...registerables,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

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
        label: "Current Month",
        data: objvals2,
        backgroundColor: ["rgba(0, 102, 34, 1)"],
        borderColor: ["rgba(0, 102, 34, 1)"],
        borderWidth: 2,
      },
      {
        label: "Previous Month",
        data: objvals,
        backgroundColor: ["rgba(2, 135, 28, 0.6)"],
        borderColor: ["rgba(2, 135, 28, 0.6)"],
        borderWidth: 1.5,
      },
    ],
  };

  let options = {
    responsive: true,
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
          text: "Day of the Month",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        align: "center",
        position: "top",
        text: "Month Overview",
        font: {
          size: 20,
        },
        padding: {
          top: 0,
          bottom: 7,
        },
      },
      tooltip: {
        events: ["mousemove"],
      },
    },
  };

  return (
    <div>
      <Line height={400} data={data} options={options} />
    </div>
  );
};

export default LastVsCurr;
