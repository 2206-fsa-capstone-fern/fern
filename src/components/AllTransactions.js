// monthly expenses as pie chart

import React, { useState, useEffect } from "react";

function AllTransactions() {
  const base = "https://sandbox.plaid.com/";
  const baseURL = `${base}transactions/get`;
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiKey = process.env.REACT_APP_PLAID_API_Key;
  const currentDate = new Date();
  const formattedCurrDate = currentDate.toISOString().split("T")[0];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(50);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
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
          start_date: `${currentYear}-${
            currentMonth < 10 ? `0${currentMonth}` : currentMonth
          }-01`,
          end_date: formattedCurrDate,
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            setChart(data.transactions);
            setLoading(false);
          });
        })

        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchTransactions();
  }, []);

  return (
    <div className="accounts">
      <table className="year">
        <thead>
          <th>Date </th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </thead>
        {chart.map((account) => (
          <tbody key={account.transaction_id}>
            <td>{account.date}</td>
            <td>{account.name}</td>
            <td>{account.category[0]}</td>
            <td>${account.amount.toFixed(2)}</td>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default AllTransactions;
