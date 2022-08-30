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
  const [searchQuery, setSearchQuery] = useState("");
  const [searched, setSearched] = useState([]);

  //dropdown
  // const [selectCategory, setSelectCategory] = useState("");
  // const [filteredData, setFilteredData] = useState([]);

  // const options = [];

  // const handleCategoryChange = (event) => {
  //   setSelectCategory(event.target.value);
  // };

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
          });
        })

        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchTransactions();
  }, []);

  // useEffect(() => {
  //   // filteredData = chart.filter(
  //   //   (chart) => chart.account.category[0] === selectCategory
  //   // );
  //   setFilteredData(filteredData);
  // }, [selectCategory]);

  const searchFn = (transactions) => {
    return transactions.filter(
      (account) =>
        account.date.includes(searchQuery) ||
        account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.category[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.amount.toFixed(2).includes(searchQuery)
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearched(searchFn(chart));
    }, 400);

    setLoading(false);
    return () => clearTimeout(timeout);
  });

  if (loading) {
    return (
      <div>
        <input type="text" placeholder="Search" className="search" />
        {/* <select id="month" onChange={handleCategoryChange}>
          <option value="select Month">Month</option>
          <option value="January">January</option>
          <option value="January"></option>
        </select> */}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <></>
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
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <Table transactions={searched} />
    </div>
  );
}

export default AllTransactions;
