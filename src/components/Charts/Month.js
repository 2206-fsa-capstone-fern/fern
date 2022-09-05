// Spending by month

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Month = () => {
  const [chart, setChart] = useState([]);

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  // let proxyURL = "https://api.allorigins.win/raw?url=/"
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
          start_date: "2022-01-01",
          end_date: "2022-12-01",
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            setChart(json.transactions);
          });
        })
        .catch((error) => {});
    };
    fetchCoins();
  }, [baseURL, proxyURL, apiKey]);

  const datesAndAmt = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      let dates = chart[i].date;
      let amounts = chart[i].amount;

      const date = new Date(dates);
      dates = date.toLocaleString("en-US", {
        month: "long",
      });

      if (!obj.hasOwnProperty(dates)) {
        obj[dates] = amounts;
      }
      obj[dates] += amounts;
    }
    return obj;
  };
  let datesAndAmount = datesAndAmt();

  let data = {
    labels: Object.keys(datesAndAmount).reverse(), // x-axis values HAS to be passed in as an array
    datasets: [
      {
        label: "Amount Spent in a Given Month",
        data: Object.values(datesAndAmount).reverse(), // y-axis values HAS to be passed in as an array, can pass in multiple data values
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount Spent",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    plugins: {
      tooltip: {
        events: ["mousemove"],
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Spending By Month",
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
      {/* <Line height={400} data={data} options={options} /> */}
    </div>
  );
};

export default Month;
