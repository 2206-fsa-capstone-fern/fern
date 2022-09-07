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
  let apiKey = process.env.REACT_APP_PLAID_CLIENT_ID;
  let firstDateOfThisYear = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0];
  let lastDateOfThisYear = new Date(new Date().getFullYear(), 11, 31)
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
          start_date: firstDateOfThisYear,
          end_date: lastDateOfThisYear,
          options: {
            count: 500,
          },
        }),
      })
        .then((response) => {
          response.json().then((json) => {
            setChart(json.transactions);
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchCoins();
  }, [baseURL, proxyURL, apiKey, firstDateOfThisYear, lastDateOfThisYear]);

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
    labels: Object.keys(datesAndAmount).reverse(),
    datasets: [
      {
        label: "Amount Spent in a Given Month",
        data: Object.values(datesAndAmount).reverse(),
        backgroundColor: [
          "rgba(176, 215, 152, 1)",
          "rgba(162, 208, 133, 1)",
          "rgba(148, 201, 115, 1)",
          "rgba(134, 194, 97, 1)",
          "rgba(120, 187, 78, 1)",
          "rgba(107, 173, 67, 1)",
          "rgba(96, 155, 60, 1)",
          "rgba(85,137, 53, 1)",
          "rgba(73, 118, 46, 1)",
          "rgba(62, 100, 39, 1)",
          "rgba(50, 81, 32, 1)",
          "rgba(39, 63, 25, 1)",
        ],
        borderColor: [
          "rgba(176, 215, 152, 1)",
          "rgba(162, 208, 133, 1)",
          "rgba(148, 201, 115, 1)",
          "rgba(134, 194, 97, 1)",
          "rgba(120, 187, 78, 1)",
          "rgba(107, 173, 67, 1)",
          "rgba(96, 155, 60, 1)",
          "rgba(85,137, 53, 1)",
          "rgba(73, 118, 46, 1)",
          "rgba(62, 100, 39, 1)",
          "rgba(50, 81, 32, 1)",
          "rgba(39, 63, 25, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: 20,
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Amount Spent",
          font: {
            size: 16,
          },
        },
        min: 0,
      },
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            size: 16,
          },
        },
        min: "January",
      },
    },
    plugins: {
      tooltip: {
        events: ["mousemove"],
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Spending By Month",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <>
      <Bar height={400} data={data} options={options} />
    </>
  );
};

export default Month;
