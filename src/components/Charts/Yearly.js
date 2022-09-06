import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Doughnut } from "react-chartjs-2";
ChartJS.register(...registerables, Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  const [chart, setChart] = useState([]); // chart is getter that gets whatever data we have in this application, setChart is setter

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = process.env.REACT_APP_PLAID_API_KEY;
  let firstDateThisOfYear = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0];
  let lastDateOfThisYear = new Date(new Date().getFullYear(), 11, 31)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const fetchCategories = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
          secret: process.env.REACT_APP_PLAID_SECRET,
          access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
          start_date: firstDateThisOfYear,
          end_date: lastDateOfThisYear,
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            setChart(data.transactions);
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchCategories();
  }, [baseURL, proxyURL, apiKey, firstDateThisOfYear, lastDateOfThisYear]);

  const values = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      if (!obj.hasOwnProperty(chart[i].category[0])) {
        obj[chart[i].category[0]] = 0;
      }

      obj[chart[i].category[0]] += chart[i].amount;
      let categoryVal = Number(obj[chart[i].category[0]].toFixed(2));
      obj[chart[i].category[0]] = categoryVal;

      if (obj[chart[i].category[0]] < 0) {
        obj[chart[i].category[0]] = 0;
      }
    }
    return obj;
  };

  let plans = values();

  let data = {
    labels: Object.keys(plans),
    datasets: [
      {
        data: Object.values(plans),
        backgroundColor: [
          "rgba(98, 12, 204, 0.8)",
          "rgba(12, 38, 204, 0.8)",
          "rgba(12, 111, 204, 0.8)",
          "rgba(9, 200, 204, 0.8)",
          "rgba(12, 204, 143, 0.8)",
          "rgba(114, 204, 12, 0.8)",
          "rgba(204, 204, 12, 0.8)",
        ],
        borderColor: [
          "rgba(98, 12, 204, 1)",
          "rgba(12, 38, 204, 1)",
          "rgba(12, 111, 204, 1)",
          "rgba(12, 191, 204, 1)",
          "rgba(12, 204, 143, 1)",
          "rgba(114, 204, 12, 1)",
          "rgba(204, 204, 12, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 20,
      },
    },
    plugins: {
      tooltip: {
        events: ["mousemove"],
      },
      title: {
        display: true,
        text: "Year Overview",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div>
      <Doughnut height={400} data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
