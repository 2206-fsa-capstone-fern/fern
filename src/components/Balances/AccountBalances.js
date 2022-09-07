import React, { useState, useEffect } from "react";
import SideNav from "../NavBars/SideNav";

const Balances = () => {
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
          console.log("ERROR: \n", error);
        });
    };
    fetchBalances();
  }, [baseURL, proxyURL, apiKey]);

  if (!chart) {
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
            <div className="m4">
              <table className="table table-success">
                <thead>
                  <tr className="ab-headers">
                    <th className="ab-header">Account Type</th>
                    <th className="ab-header">Balances</th>
                  </tr>
                </thead>
                <tbody className="ab-body">
                  <tr className="ab-rows">
                    <td className="ab-acc-amount">Loading...</td>
                    <td className="ab-acc-name">Loading...</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          <div className="m2">
            <table className="table table-success">
              <thead className="ab-headers">
                <tr>
                  <th className="ab-header">Account Type</th>
                  <th className="ab-header">Balances</th>
                </tr>
              </thead>
              <tbody className="ab-body">
                {chart.map((account) => (
                  <tr key={account.account_id} className="ab-rows">
                    <td className="ab-acc-name">{account.name}</td>
                    <td className="ab-acc-amount">
                      {!account.balances.available
                        ? account.balances.current.toFixed(2)
                        : account.balances.available.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
