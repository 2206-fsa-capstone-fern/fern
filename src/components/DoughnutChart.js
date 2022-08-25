import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  const [chart, setChart] = useState([]); // chart is getter that gets whatever data we have in this application, setChart is setter

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = process.env.REACT_APP_PLAID_API_KEY;

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
          // client_id: "62fd4373e8c0170014239c33",
          // secret: "49cd4bc5767c65e997992a8c122e3d",
          // access_token: "access-sandbox-fc4eb4f9-9676-411a-9bcf-fa9a6e2aa6dd",
          client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
          secret: process.env.REACT_APP_PLAID_SECRET,
          access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
          // client_id: process.env.PLAID_CLIENT_ID,
          // secret: process.env.PLAID_SECRET,
          // access_token: process.env.PLAID_ACCESS_TOKEN,
          start_date: "2021-01-01",
          end_date: "2021-12-31",
        }),
      })
        .then((response) => {
          // console.log('chart in .then: \n', chart)
          // console.log("response: \n", response);
          response.json().then((data) => {
            // console.log("data: \n", data)
            // console.log("data.transactions: \n", data.transactions);
            setChart(data.transactions);
            // setChart(data)
          });
        })

        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchCategories();
  }, [baseURL, proxyURL, apiKey]);

  console.log("chart: \n", chart);

  const values = () => {
    let obj = {};
    for (let i = 0; i < chart.length; i++) {
      if (!obj.hasOwnProperty(chart[i].category[0])) {
        obj[chart[i].category[0]] = 0;
      }

      obj[chart[i].category[0]] += chart[i].amount;
      let categoryVal = obj[chart[i].category[0]].toFixed(2);
      // console.log('numnum', numNum)
      let categoryValNum = Number(categoryVal);
      // console.log('anumnum', anumNum)
      obj[chart[i].category[0]] = categoryValNum;

      if (obj[chart[i].category[0]] < 0) {
        obj[chart[i].category[0]] = 0;
      }
    }
    return obj;
  };
  console.log("values() \n", values()); // {Transfer: 0, Travel: 0, Payment: 300, Food and Drink: 1268.76}

  let plans = values();
  console.log("plans: \n", plans);

  let data = {
    // labels: labelArr(),
    labels: Object.keys(plans),
    datasets: [
      {
        data: Object.values(plans),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
    legend: {
      labels: {
        fontSize: 25,
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
