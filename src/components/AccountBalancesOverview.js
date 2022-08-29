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
          // console.log('chart in .then: \n', chart)
          console.log("response: \n", response);
          response.json().then((data) => {
            console.log("data: \n", data);
            // console.log("data.transactions: \n", data.transactions);
            setChart(data.accounts);
            // setChart(data)
          });
        })
        .catch((error) => {
          console.log("ERROR: \n", error);
        });
    };
    fetchBalances();
  }, [baseURL, proxyURL, apiKey]);

  return (
    <div>
      <Link to="balances">
        <h5 style={{ textAlign: "center" }} className="">
          Accounts Overview
        </h5>
      </Link>
      <table>
        <tr>
          <th>Account Type</th>
          <th>Balance</th>
        </tr>
        <tr>
          <td>Depository</td>
          {/* <td>checking, savings, cd, money market</td> */}
          <td>{`$${Number(chart[0].balances.current) + Number(chart[1].balances.current) + Number(chart[2].balances.current) + Number(chart[4].balances.current)}`}</td>
        </tr>
        <tr>
          <td>Credit</td>
          {/* <td>credit card</td> */}
          <td>{`$${chart[3].balances.current.toFixed(2)}`}</td>
        </tr>
        <tr>
          <td>Investments</td>
          {/* <td>ira, 401k</td> */}
          <td>{`$${Number(chart[5].balances.current) + Number(chart[6].balances.current)}`}</td>
          {/* <td>{`$${Number(chart[5].balances.current.toFixed(2)) + Number(chart[6].balances.current.toFixed(2))}`}</td> */}
        </tr>
        <tr>
          <td>Loans</td>
          {/* <td>student, mortgage</td> */}
          <td>{`$${Number(chart[7].balances.current) + Number(chart[8].balances.current)}`}</td>
        </tr>
        {console.log("chart in return: \n", chart)}
      </table>
    </div>
  );
};

export default BalancesOverview;
