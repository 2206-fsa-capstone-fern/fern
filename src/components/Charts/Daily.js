import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Daily = () => {
  const [chart, setChart] = useState([]);

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";
  let todaysDate = new Date().toISOString().split("T")[0];
  let lastWeeksDate = new Date(new Date().setDate(new Date().getDate() - 7))
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
          start_date: lastWeeksDate,
          end_date: todaysDate,
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
  }, [baseURL, proxyURL, apiKey, todaysDate, lastWeeksDate]);

  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const daysAndAmt = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      let dates = chart[i].date;
      let amounts = chart[i].amount;

      const date = new Date(dates);
      let dayName = daysArr[date.getDay()];

      if (!obj.hasOwnProperty(dates)) {
        obj[dayName] = amounts;
      }
    }
    return obj;
  };
  let datesAndAmount = daysAndAmt();
  console.log('Object.keys(datesAndAmount).reverse()', Object.keys(datesAndAmount).reverse())
  console.log('Object.values(datesAndAmount).reverse()', Object.values(datesAndAmount).reverse())

  let data = {
    labels: daysArr,
    datasets: [
      {
        label: "Spending Through The Week By Day",
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
          "rgba(39, 63, 25, 1)"
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
          "rgba(39, 63, 25, 1)"
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
          text: 'Amount Spent',
          font: {
            size: 16,
          }
        },
        min: 0, // makes it so that negative amounts/refunds aren't included
      },
      x: {
        title: {
          display: true,
          text: 'Day',
          font: {
            size: 16,
          }
        },
      }
    },
    plugins: {
      tooltip: {
        events: ['mousemove'],
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Daily Spending',
        font: {
          size: 18,
        },
        position: "top",
      },
    },
  };

  return (
    <>
      <Bar height={400} data={data} options={options} />
    </>
  );
};

export default Daily;
