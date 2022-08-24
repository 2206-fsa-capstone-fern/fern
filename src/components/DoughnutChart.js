import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from 'axios';

ChartJS.register(Tooltip, Legend, ArcElement);

const DoughnutChart = () => {
  // useState is used to create variables in React
  const [chart, setChart] = useState([]); // chart is getter that gets whatever data we have in this application, setChart is setter

  // let base = "http://localhost:3000/"
  let base = "https://sandbox.plaid.com/"
  let baseURL = `${base}api/transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";

  useEffect(() => {
    const fetchCategories = async () => {
      await fetch(`${proxyURL}${baseURL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-requested-with": `${apiKey}`,
        },
        body: JSON.stringify({
          "client_id": "62fd4373e8c0170014239c33",
          "secret": "49cd4bc5767c65e997992a8c122e3d",
          // "client_id": process.env.PLAID_CLIENT_ID,
          // "secret": process.env.PLAID_SECRET,
          "access_token": "access-sandbox-2caee1fa-ddde-4271-99f5-12bb05161137",
          "start_date": "2017-01-01",
          "end_date": "2018-01-01",
          "options": {
            "count": 250,
            "offset": 100
          }
        })
      })
        .then((response) => {
          console.log('response: \n', response)
          response.json().then((json) => {
            console.log("json: \n", json);
            setChart(json.data)
          });
        })
        .catch((error) => {
          console.log("error: \n", error);
        });
    };
    fetchCategories();
  }, [baseURL, proxyURL, apiKey]);

  console.log('chart: \n', chart)

  // let data = {
  //   labels: chart?.coins?.map(x => x.name),
  //   datasets: [
  //     {
  //       label: `${chart?.coins?.length} Coins Available`,
  //       data: chart?.coins?.map(x => x.price),
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // let options = {
  //   maintainAspectRatio: false,
  //   legend: {
  //     labels: {
  //       fontSize: 25,
  //     },
  //   },
  // };

  // return (
  //   <div>
  //     <Doughnut height={400} data={data} options={options} />
  //   </div>
  // );
  return(
    <h1>Donut</h1>
  )

};

export default DoughnutChart;



// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// for a line graph:
// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Doughnut } from "react-chartjs-2";


// ChartJS.register(Tooltip, Legend, ArcElement);

// const DoughnutChart = () => {
  // useState is used to create variables in React
  // const [chart, setChart] = useState([]); // chart is getter that gets whatever data we have in this application, setChart is setter

  // const [chartData, setChartData] = useState({
  //   datasets: [],
  // });
  
  // don't really need these two lines
  // const [employeeSalary, setEmployeeSalary] = useState([]);
  // const [employeeAge, setEmployeeAge] = useState([]);
  
  // useEffect(() => {
    // let empSal = [];
    // let empAge = [];
//     axios
//       .get('http://localhost:3000/api/transactions/get')
//       .then(res => {
//         console.log('res: \n', res)
//       })
//       .catch(err => {
//         console.log('err: \n', err)
//       // })
//       // console.log('empSal: \n', empSal, '\n', 'empAge: \n', empAge)
//       })}, [])

//   return (
//     <div>
//       <Doughnut height={400} />
//     </div>
//   );
// };

// export default DoughnutChart;

// ----------------------------------------------------------------------------------------------------------------------------------------------------------
