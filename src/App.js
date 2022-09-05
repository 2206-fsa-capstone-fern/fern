//React
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

//Plaid
import { usePlaidLink } from 'react-plaid-link';
import './Plaid.scss';
import './App.css';

//Components
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import LinkAccount from "./components/LinkAccount";
import BudgetApp from "./BudgetApp";
import SideNav from "./components/SideNav/SideNav";
import Trends from "./components/Trends";
import AccountView from "./AccountComponents/AccountView";
import AllTransactions from "./components/TransactionsTable/AllTransactions";
import Balances from "./components/AccountBalances";
import QuizApp from "./components/QuizComponents/QuizApp";
import Month from "./components/Month"
import Daily from "./components/Daily"
import NotFound from "./components/NotFound";

//Redux
import { connect } from "react-redux";
import { gettingUser, addingTransactions, gettingTransactions } from "./store";

//functional component
function App(props) {
  const { isLoggedIn, isAdmin } = props;
  useEffect(() => {
    props.getUser();
    props.getTransactions();
  }, [isLoggedIn]);

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
    props.addTransactions(props.transactions, transactions);

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
   
      <div className='App'>
        {isLoggedIn ? (
          <div>
            {isAdmin ? (
              <div>
                {/* <Navbar
                  open={open}
                  ready={ready}
                  transactions={props.transactions[0]}
                  transactions2={props.transactions[1]}
                />
                 */}
              </div>
            ) : (
              <div>
                {/* <div className='navbar-logged-in'>
              
                  <Navbar
                    open={open}
                    ready={ready}
                    transactions={props.transactions[0]}
                    transactions2={props.transactions[1]}
                  />
                </div> */}
               

                <div className="app-container">
                  <Routes>
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
                      element={
                        <Dashboard transactions={props.transactions[0]} />
                      }
                    />
                    <Route
                      exact
                      path="/"
                      element={<Navigate replace to="/dashboard" />}
                    />
                    <Route
                      exact
                      path="/login"
                      element={<Navigate replace to="/dashboard" />}
                    />
                    <Route
                      exact
                      path="/signup"
                      element={<Navigate replace to="/dashboard" />}
                    />
                    <Route exact path="/budget" element={<BudgetApp />} />
                    <Route exact path="/trends" element={<Trends />} />
                    <Route
                      exact
                      path="/transactions"
                      element={<AllTransactions />}
                    />
                    <Route exact path="/month" element={<Month />} />
                    <Route exact path="/daily" element={<Daily />} />
                    <Route exact path="/account" element={<AccountView />} />
                    <Route exact path="/balances" element={<Balances />} />
                    <Route exact path="/quiz" element={<QuizApp />} />
                    <Route exact path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* for users who aren't logged in */}
            <Navbar />
            <Routes>
              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/login" element={<LogIn />} />
              <Route exact path="/" element={<LogIn />} />
            </Routes>
          </div>
        )}
      </div>
  
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
    isAdmin: !!state.user.admin,
    user: state.user,
    transactions: state.transactions,
    notice: state.notice,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: () => dispatch(gettingUser()),
    addTransactions: (transactions, transaction) =>
      dispatch(addingTransactions(transactions, transaction)),
    getTransactions: () => dispatch(gettingTransactions()),
  };
};

export default connect(mapState, mapDispatch)(App);