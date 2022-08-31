// donut chart with categories of things spent on and  table with every single transaction from the year

import DoughnutChart from "./DoughnutChart";
import React, { useState, useEffect } from "react";

const Yearly = () => {
  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = process.env.REACT_APP_PLAID_API_Key;
  let firstDateThisOfYear = new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0];
  let lastDateOfThisYear = new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0]
  // console.log('firstDateThisOfYear', firstDateThisOfYear)
  // console.log('lastDateOfThisYear', lastDateOfThisYear)

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
          client_id: process.env.REACT_APP_PLAID_CLIENT_ID,
          secret: process.env.REACT_APP_PLAID_SECRET,
          access_token: process.env.REACT_APP_PLAID_ACCESS_TOKEN,
          // start_date: "2022-01-01",
          // end_date: "2022-12-31",
          start_date: firstDateThisOfYear,
          end_date: lastDateOfThisYear,
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
  }, [baseURL, proxyURL, apiKey, firstDateThisOfYear, lastDateOfThisYear]);

  // console.log("chart: \n", chart);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Yearly Overview</h3>
      <DoughnutChart />
      <br />
      <br />
      <br />
      <br />
      <p style={{ textAlign: "center" }} className="">
        Transactions From This Year
      </p>
      <table className="year">
        <tbody>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          {/* <th>Type</th> */}
          <th>Amount</th>
        </tbody>
        {console.log("chart in return: \n", chart)}
        {chart.map((account) => (
          <tbody key={account.transaction_id}>
            <td>{account.date}</td>
            <td>{account.name}</td>
            <td>
              {account.category[0]} ({account.category[1]})
            </td>
            {/* <td>{account.category[1]}</td> */}
            <td>{account.amount.toFixed(2)}</td>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Yearly;
