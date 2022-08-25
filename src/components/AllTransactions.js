// monthly expenses as pie chart

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function AllTransactions() {
  //loading transaction data
  const base = "https://sandbox.plaid.com/";
  const baseURL = `${base}transactions/get`;
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiKey = process.env.REACT_APP_PLAID_API_Key;
  const currentDate = new Date();
  const formattedCurrDate = currentDate.toISOString().split("T")[0];

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
          start_date: "2010-01-01",
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

  //pagination
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  //to get the first page of transactions
  const transactionsPerPage = 30;
  const lastTransactionIndex = currentPage * transactionsPerPage;
  const currPageTransactions = chart.slice(
    lastTransactionIndex,
    lastTransactionIndex + transactionsPerPage
  );

  //for pagination
  let pageNums = Math.ceil(chart.length / transactionsPerPage);

  const changePage = ({ selected }) => setCurrentPage(selected);

  if (loading) {
    return (
      <div className="accounts">
        <table className="year">
          <thead>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </thead>
          <div>loading...</div>
        </table>
      </div>
    );
  }
  return (
    <div className="accounts">
      <table className="year">
        <thead>
          <th>Date </th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
        </thead>
        {currPageTransactions.map((account) => (
          <tbody key={account.transaction_id}>
            <td>{account.date}</td>
            <td>{account.name}</td>
            <td>{account.category[0]}</td>
            {account.amount > 0 ? (
              <div>
                <td>-${account.amount.toFixed(2)}</td>
              </div>
            ) : (
              <div className="refunds">
                <td>${`${-account.amount.toFixed(2)}`}</td>
              </div>
            )}
          </tbody>
        ))}
      </table>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageNums}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default AllTransactions;
