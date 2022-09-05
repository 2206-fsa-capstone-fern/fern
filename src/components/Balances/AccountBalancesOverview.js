import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
            // setChart(data)
          });
        })
        .catch((error) => {});
    };
    fetchBalances();
  }, [baseURL, proxyURL, apiKey]);

  if (!chart[0]) {
    return (
      <div>
        <Link to="balances" style={{ textAlign: "center" }} className="">
          Accounts Overview
        </Link>
        <table>
          <tr>
            <th>Account Type</th>
            <th>Balance</th>
          </tr>
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
        </table>
      </div>
    );
  }
  return (
    <div>
      <Link to="balances" style={{ textAlign: "center" }} className="">
        Accounts Overview
      </Link>
      <table>
        <tr>
          <th>Account Type</th>
          <th>Balance</th>
        </tr>
        <tr>
          <td>Depository</td>
          {/* <td>checking, savings, cd, money market</td> */}
          <td>{`$${(
            Number(chart[0].balances.current) +
            Number(chart[1].balances.current) +
            Number(chart[2].balances.current) +
            Number(chart[4].balances.current)
          ).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Credit</td>
          {/* <td>credit card</td> */}
          <td>{`$${chart[3].balances.current.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Investments</td>
          {/* <td>ira, 401k</td> */}
          <td>{`$${(
            Number(chart[5].balances.current) +
            Number(chart[6].balances.current)
          ).toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Loans</td>
          {/* <td>student, mortgage</td> */}
          <td>{`$${(
            Number(chart[7].balances.current) +
            Number(chart[8].balances.current)
          ).toFixed(2)}`}</td>
        </tr>
      </table>
    </div>
  );
};

export default BalancesOverview;
