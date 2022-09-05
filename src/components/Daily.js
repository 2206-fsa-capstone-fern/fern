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
  // let proxyURL = "https://api.allorigins.win/raw?url=/"
  let apiKey = "62fd4373e8c0170014239c33";
  let todaysDate = new Date().toISOString().split("T")[0];
  let lastWeeksDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split("T")[0];
  console.log('todaysDate:', todaysDate)
  console.log('lastWeeksDate:', lastWeeksDate)

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

  console.log("chart: \n", chart);

  const daysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const daysAndAmt = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      let dates = chart[i].date;
      let amounts = chart[i].amount;

      const date = new Date(dates);
      let dayName = daysArr[date.getDay()];
      console.log("dayName", dayName);

      if (!obj.hasOwnProperty(dates)) {
        obj[dayName] = amounts;
      }
    }
    return obj;
  };
  console.log("daysAndAmt()", daysAndAmt());
  let datesAndAmount = daysAndAmt();

  let data = {
    labels: daysArr,
    datasets: [
      {
        label: "Spending Through The Week By Day",
        data: Object.values(datesAndAmount).reverse(),
        backgroundColor: [
          "rgba(190, 222, 170, 1)",
          "rgba(176, 215, 152, 1)",
          "rgba(162, 208, 133, 1)",
          "rgba(148, 201, 115, 1)",
          "rgba(134, 194, 97, 1)",
          "rgba(120, 187, 78, 1)",
          "rgba(107, 173, 67, 1)",
          "rgba(96, 155, 60, 1)",
          "rgba(84, 136, 53, 1)",
          "rgba(73, 118, 46, 1)"
        ],
        borderColor: [
          "rgba(190, 222, 170, 1)",
          "rgba(176, 215, 152, 1)",
          "rgba(162, 208, 133, 1)",
          "rgba(148, 201, 115, 1)",
          "rgba(134, 194, 97, 1)",
          "rgba(120, 187, 78, 1)",
          "rgba(107, 173, 67, 1)",
          "rgba(96, 155, 60, 1)",
          "rgba(84, 136, 53, 1)",
          "rgba(73, 118, 46, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    // maintainAspectRatio: true,
    maintainAspectRatio: false,
    responsive: true,
    // responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Spending',
      },
    },
    legend: {
      labels: {
        fontSize: 25,
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
