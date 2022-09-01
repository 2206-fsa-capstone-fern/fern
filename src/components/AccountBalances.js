import React, { useState, useEffect } from "react";
import { CDBTable, CDBTableHeader, CDBTableBody, CDBContainer } from "cdbreact";
import SideNav from "./SideNav/SideNav";

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

  // if (!account.balances) {
  //   return (
  //     <CDBContainer>
  //       <CDBTable hover>
  //         <CDBTableHeader style={{ textAlign: "center" }}>
  //           <tr>
  //             <th>Accounts</th>
  //           </tr>
  //         </CDBTableHeader>
  //         <CDBTableHeader>
  //           <tr>
  //             <th>Account Type</th>
  //             <th>Balances</th>
  //           </tr>
  //         </CDBTableHeader>
  //         <CDBTableBody>
  //           {chart.map((account) => (
  //             <td>Loading...
  //             </td>
  //             </tr>
  //           ))}
  //         </CDBTableBody>
  //       </CDBTable>
  //     </CDBContainer>
  //   );
  // }
  return (
    <div>
      <SideNav />
      <CDBContainer>
        <CDBTable responsive striped>
          <CDBTableHeader style={{ textAlign: "center" }}>
            <tr>
              <th>Accounts</th>
            </tr>
          </CDBTableHeader>
          <CDBTableHeader>
            <tr>
              <th>Account Type</th>
              <th>Balances</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            {chart.map((account) => (
              <tr key={account.account_id}>
                <td className="ab-acc-name">{account.name}</td>
                <td className="ab-acc-amount">
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
  );
};

export default Balances;
