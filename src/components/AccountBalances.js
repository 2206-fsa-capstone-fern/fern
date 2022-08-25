import React, { useState, useEffect } from "react";

const Balances = () => {
  const [chart, setChart] = useState([]); // chart is getter that gets whatever data we have in this application, setChart is setter

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
          client_id: process.env.PLAID_CLIENT_ID,
          secret: process.env.PLAID_SECRET,
          access_token: process.env.PLAID_ACCESS_TOKEN,
        }),
      })
        .then((response) => {
          // console.log('chart in .then: \n', chart)
          console.log("response: \n", response);
          response.json().then((data) => {
            console.log("data: \n", data)
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
      <table>
      <th style={{ textAlign: "center" }} className="">Accounts</th>
        <tbody>
          <th>Account Type</th>
          <th>Balance</th>
        </tbody>
        {/* {console.log("chart in return: \n", chart)} */}
        {chart.map((account) => (
          <tbody key={account.account_id}>
            <td>{account.name}</td>
            <td>{!account.balances.available ? account.balances.current.toFixed(2) : account.balances.available.toFixed(2)}</td>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default Balances