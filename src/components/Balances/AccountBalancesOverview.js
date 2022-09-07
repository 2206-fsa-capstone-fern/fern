import React, { useState, useEffect } from "react";

const BalancesOverview = () => {
  const [chart, setChart] = useState([]);

  let base = "https://sandbox.plaid.com/";
  let baseURL = `${base}accounts/balance/get`;
  let proxyURL = "https://cors-anywhere.herokuapp.com/";
  let apiKey = "62fd4373e8c0170014239c33";

  useEffect(() => {
    const fetchBalances = async () => {
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
        }),
      })
        .then((response) => {
          response.json().then((data) => {
            setChart(data.accounts);
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error)
        });
    };
    fetchBalances();
  }, [baseURL, proxyURL, apiKey]);

  if (!chart[0]) {
    return (
      <div className="table-responsive mt-3" style={{ textAlign: "center" }}>
        <div
          className="mb-3 fw-bold"
          style={{
            fontSize: 21,
            color: "white",
            border: "1px solid #1CAC78",
            background: "#1CAC78",
            borderRadius: "7px",
            width: "26rem",
            margin: "0px 30px",
          }}
        >
          Accounts
        </div>
        <div
          className="card"
          style={{ width: "26rem", height: "17.64rem", margin: "0px 30px" }}
        >
          <table
            className="table"
            style={{
              width: "415px",
              borderColor: "#d3d3d3",
              borderRadius: "7px",
            }}
          >
            <thead>
              <tr>
                <th className="fw-bold">Account Type</th>
                <th className="fw-bold">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Depository</td>
                <td>Loading...</td>
              </tr>
              <tr>
                <td>Credit</td>
                <td>Loading...</td>
              </tr>
              <tr>
                <td>Investments</td>
                <td>Loading...</td>
              </tr>
              <tr>
                <td>Loans</td>
                <td>Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div className="table-responsive mt-3" style={{ textAlign: "center" }}>
      <div
        className="mb-3 fw-bold"
        style={{
          fontSize: 21,
          color: "white",
          border: "1px solid #1CAC78",
          background: "#1CAC78",
          borderRadius: "7px",
          width: "26rem",
          margin: "0px 30px",
        }}
      >
        Accounts
      </div>
      <div
        className="card"
        style={{ width: "26rem", height: "17.7rem", margin: "0px 30px" }}
      >
        <table
          className="table"
          style={{
            width: "415px",
            borderColor: "#d3d3d3",
            borderRadius: "7px",
          }}
        >
          <thead>
            <tr>
              <th className="fw-bold">Account Type</th>
              <th className="fw-bold">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Depository</td>
              <td>{`$${(
                Number(chart[0].balances.current) +
                Number(chart[1].balances.current) +
                Number(chart[2].balances.current) +
                Number(chart[4].balances.current)
              ).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Credit</td>
              <td>{`$${chart[3].balances.current.toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Investments</td>
              <td>{`$${(
                Number(chart[5].balances.current) +
                Number(chart[6].balances.current)
              ).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Loans</td>
              <td>{`-$${(
                Number(chart[7].balances.current) +
                Number(chart[8].balances.current)
              ).toFixed(2)}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalancesOverview;
