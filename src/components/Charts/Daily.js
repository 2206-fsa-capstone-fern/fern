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
            console.log("json: \n", json);
            setChart(json.transactions);
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
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

  let data = {
    labels: daysArr,
    datasets: [
      {
        label: "Spending Through The Week By Day",
        data: Object.values(datesAndAmount).reverse(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // red/pink
          "rgba(54, 162, 235, 0.2)", // blue
          "rgba(255, 206, 86, 0.2)", // yellow
          "rgba(75, 192, 192, 0.2)", // teal
          "rgba(153, 102, 255, 0.2)", // purple
          "rgba(255, 159, 64, 0.2)", // orange
          "rgba(50, 168, 82, 0.2)", // green
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(50, 168, 82, 1)",
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
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Spending Throughout Week",
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
};

export default Daily;
