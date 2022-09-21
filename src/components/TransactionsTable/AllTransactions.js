import React, { useState, useEffect } from "react";
import Table from "./Table";
import SideNav from "../NavBars/SideNav";
import { MDBInput } from "mdb-react-ui-kit";

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
  }, [apiKey, baseURL, formattedCurrDate]);

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
      <div className="budget d-flex">
        <div>
          <SideNav />
        </div>
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexFlow: "column",
            height: "100vh",
          }}
        >
          <MDBInput type="text" placeholder="Search" className="search" />

          <div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Loading...</th>
                </tr>
              </tbody>
              <></>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <MDBInput
            style={{ width: "41%", marginLeft: "30%", marginTop: "2%" }}
            type="text"
            placeholder="Search"
            className="search mb-4"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div>
            <Table transactions={searched} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllTransactions;
