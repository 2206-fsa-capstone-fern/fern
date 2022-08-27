import React, { useState, useEffect } from "react";
import Table from "./Table";

function AllTransactions() {
  //loading transaction data
  const base = "https://sandbox.plaid.com/";
  const baseURL = `${base}transactions/get`;
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiKey = process.env.REACT_APP_PLAID_API_Key;
  const currentDate = new Date();
  const formattedCurrDate = currentDate.toISOString().split("T")[0];

  //pagination
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(false);

  //search
  const [search, setSearch] = useState("");

  //dropdown
  const [selectMonth, setSelectMonth] = useState("");

  const handleMonthChange = (event) => {
    setSelectMonth(event.target.value);
  };

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
          start_date: "2017-01-01",
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

  const searchFn = (transactions) => {
    return transactions.filter(
      (account) =>
        account.date.includes(search) ||
        account.name.toLowerCase().includes(search.toLowerCase()) ||
        account.category[0].toLowerCase().includes(search.toLowerCase()) ||
        account.amount.toFixed(2).includes(search)
    );
  };

  if (loading) {
    return (
      <div>
        <input type="text" placeholder="Search" className="search" />
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <>()</>
        </table>
      </div>
    );
  }

  return (
    <div className="transactions-page">
      <input
        type="text"
        className="search"
        placeholder="Search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <Table transactions={searchFn(chart)} />
    </div>
  );
}

export default AllTransactions;
