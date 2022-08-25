import DoughnutChart from "./DoughnutChart";
import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);

const Month = () => {
  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";

  const [chart, setChart] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          client_id: "62fd4373e8c0170014239c33",
          secret: "49cd4bc5767c65e997992a8c122e3d",
          access_token: "access-sandbox-fc4eb4f9-9676-411a-9bcf-fa9a6e2aa6dd",
          // client_id: process.env.PLAID_CLIENT_ID,
          // secret: process.env.PLAID_SECRET,
          // access_token: process.env.PLAID_ACCESS_TOKEN,
          start_date: "2022-08-01",
          end_date: "2022-09-01",
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
    fetchTransactions();
  }, [baseURL, proxyURL, apiKey]);

  // console.log("chart: \n", chart);

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
    maintainAspectRatio: true,
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };


  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Monthly Overview</h3>

      <Doughnut height={400} data={data} options={options} />
      <br />
      <br />
      <br />
      <br />
      <p style={{ textAlign: "center" }} className="">
        Transactions From The Past Month
      </p>
      <table className="year">
        <tbody>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </tbody>
        {console.log("chart in return: \n", chart)}
        {chart.map((account) => (
          <tbody key={account.transaction_id}>
            <td>{account.date}</td>
            <td>{account.name}</td>
            <td>{account.category[0]}</td>
            <td>{account.amount.toFixed(2)}</td>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Month;



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// from the last month

// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement);

// const Month = () => {
//   const [chart, setChart] = useState([]); 

//   let base = "https://sandbox.plaid.com/";
//   let baseURL = `${base}transactions/get`;
//   let proxyURL = "https://cors-anywhere.herokuapp.com/";
//   let apiKey = "62fd4373e8c0170014239c33";

//   useEffect(() => {
//     const fetchCoins = async () => {
//       await fetch(`${proxyURL}${baseURL}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": `${apiKey}`,
//           "Access-Control-Allow-Origin": "*",
//         },
//         body: JSON.stringify({
//           client_id: "62fd4373e8c0170014239c33",
//           secret: "49cd4bc5767c65e997992a8c122e3d",
//           access_token: "access-sandbox-fc4eb4f9-9676-411a-9bcf-fa9a6e2aa6dd",
//           // client_id: process.env.PLAID_CLIENT_ID,
//           // secret: process.env.PLAID_SECRET,
//           // access_token: process.env.PLAID_ACCESS_TOKEN,
//           start_date: "2022-08-01",
//           end_date: "2022-09-01",
//         }),
//       })
//         .then((response) => {
//           response.json().then((json) => {
//             console.log("json: \n", json);
//             setChart(json.transactions)
//           });
//         })
//         .catch((error) => {
//           console.log("error: \n", error);
//         });
//     };
//     fetchCoins();
//   }, [baseURL, proxyURL, apiKey]);

//   console.log('chart: \n', chart)

//   // x-axis/labels = August 25 Thursday


//   // let data = {
//   //   labels: chart?.coins?.map(x => x.name),
//   //   datasets: [
//   //     {
//   //       label: `${chart?.coins?.length} Coins Available`,
//   //       data: chart?.coins?.map(x => x.price),
//   //       backgroundColor: [
//   //         "rgba(255, 99, 132, 0.2)",
//   //         "rgba(54, 162, 235, 0.2)",
//   //         "rgba(255, 206, 86, 0.2)",
//   //         "rgba(75, 192, 192, 0.2)",
//   //         "rgba(153, 102, 255, 0.2)",
//   //         "rgba(255, 159, 64, 0.2)",
//   //       ],
//   //       borderColor: [
//   //         "rgba(255, 99, 132, 1)",
//   //         "rgba(54, 162, 235, 1)",
//   //         "rgba(255, 206, 86, 1)",
//   //         "rgba(75, 192, 192, 1)",
//   //         "rgba(153, 102, 255, 1)",
//   //         "rgba(255, 159, 64, 1)",
//   //       ],
//   //       borderWidth: 1,
//   //     },
//   //   ],
//   // };

//   // let options = {
//   //   maintainAspectRatio: false,
//   //   scales: {
//   //     y: {
//   //       beginAtZero: true,
//   //     },
//   //   },
//   //   legend: {
//   //     labels: {
//   //       fontSize: 25,
//   //     },
//   //   },
//   // };

//   // return (
//   //   <div>
//   //     <Bar height={400} data={data} options={options} />
//   //   </div>
//   // );

//   return (
//     <h2>Month</h2>
//   )
// };

// export default Month;
