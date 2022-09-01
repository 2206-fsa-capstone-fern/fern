import React, { useState, useEffect } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
import SideNav from "./SideNav/SideNav";

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
            <div>
              <CDBContainer>
                <CDBTable responsive hover borderless>
                  <CDBTableHeader>
                    <tr>
                      <th className="ab-header">Account Type</th>
                      <th className="ab-header">Balances</th>
                    </tr>
                  </CDBTableHeader>
                  <CDBTableBody>
                    <tr className="ab-acc-amount">Loading...</tr>
                  </CDBTableBody>
                </CDBTable>
              </CDBContainer>
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
          <div>
            <CDBContainer>
              <CDBTable responsive hover borderless>
                <CDBTableHeader>
                  <tr>
                    <th className="ab-header">Account Type</th>
                    <th className="ab-header">Balances</th>
                  </tr>
                </CDBTableHeader>
                <CDBTableBody>
                  {chart.map((account) => (
                    <tr key={account.account_id}>
                      <td className="ab-acc-name" style={{ textAlign: "center", color: "white" }}>{account.name}</td>
                      <td className="ab-acc-amount" style={{ textAlign: "center", color: "white" }}>
                        {!account.balances.available
                          ? account.balances.current.toFixed(2)
                          : account.balances.available.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </CDBTableBody>
              </CDBTable>
            </CDBContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balances;
