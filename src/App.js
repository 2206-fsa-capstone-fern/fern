import React, { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import "./Plaid.scss";
import LinkAccount from "./components/LinkAccount";
import { connect } from "react-redux";
import { addingTransactions } from "./store/transactionsReducer";

function App(props) {
  console.log("props", props);
  const [token, setToken] = useState(null);
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let [transactions, setTransactions] = useState({});

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    await fetch("/api/exchange_public_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    // await getBalance();
    await getTransactions();
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem("link_token");
      setToken(linkToken);
    } else {
      const response = await fetch("/api/create_link_token", {});
      const data = await response.json();
      setToken(data.link_token);
      localStorage.setItem("link_token", data.link_token);
    }
  }, [setToken]);

  //Fetch transaction data, which includes accounts and balances data
  const getTransactions = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/transactions/get");

    transactions = await response.json();
    props.addTransactions(transactions);

    setLoading(false);
  }, [setTransactions, setLoading]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open]);

  // <div>
  //   <button onClick={() => open()
  //     } disabled={!ready}>
  //     <strong>Link account</strong>
  //   </button>

  // try {
  //   if (!loading && transactions !== null) {
  //     const dataObj = transactions.Transactions;
  //     transactions = dataObj.transactions;
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar
          open={open}
          ready={ready}
          transactions={props.transactions[0]}
          transactions2={props.transactions[1]}
        />
        <Routes>
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/link"
            element={
              <LinkAccount
                open={open}
                ready={ready}
                transactions={props.transactions[0]}
                transactions2={props.transactions[1]}
              />
            }
          />
          <Route
            exact
            path="/dashboard"
            element={<Dashboard transactions={transactions} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const mapState = (state) => {
  return {
    transactions: state.transactions,
  };
};
const mapDispatch = (dispatch) => {
  return {
    addTransactions: (transaction) => dispatch(addingTransactions(transaction)),
  };
};

export default connect(mapState, mapDispatch)(App);
