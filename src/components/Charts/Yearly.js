import DoughnutChart from "./DoughnutChart";
import React, { useState, useEffect } from "react";

const Yearly = () => {
  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}transactions/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = process.env.REACT_APP_PLAID_API_Key;

  let firstDateOfThisYear = new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0];
  let lastDateOfThisYear = new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0];

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
          start_date: firstDateOfThisYear,
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
    fetchTransactions();
  }, [baseURL, proxyURL, apiKey, firstDateOfThisYear, lastDateOfThisYear]);

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
          <th>Amount</th>
        </tbody>
        {chart.map((account) => (
          <tbody key={account.transaction_id}>
            <td>{account.date}</td>
            <td>{account.name}</td>
            <td>
              {account.category[0]}
            </td>

            <td>{account.amount.toFixed(2)}</td>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Yearly;
