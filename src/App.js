//React
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';

//Plaid
import { usePlaidLink } from 'react-plaid-link';
import './Plaid.scss';
import './index.css';

//Components
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import NavbarApp from './components/Navbar';
import Dashboard from './components/Dashboard';
import LinkAccount from './components/LinkAccount';
import BudgetApp from './BudgetApp';
import SideNav from './components/SideNav/SideNav';
import Trends from './components/Trends';
import AllTransactions from './components/AllTransactions';
import DoughnutChart from './components/DoughnutChart'; // to view chart
import Yearly from './components/Yearly';

//Redux
import { connect } from 'react-redux';
import { gettingUser, addingTransactions, gettingTransactions } from './store';

//functional component
function App(props) {
  const { isLoggedIn, isAdmin } = props;
  useEffect(async () => {
    props.loadInitialData();
    props.getTransactions();
  }, [isLoggedIn]);

  const [token, setToken] = useState(null);
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  let [transactions, setTransactions] = useState({});

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    await fetch('/api/exchange_public_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_token: publicToken }),
    });
    // await getBalance();
    await getTransactions();
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes('?oauth_state_id=')) {
      const linkToken = localStorage.getItem('link_token');
      setToken(linkToken);
    } else {
      const response = await fetch('/api/create_link_token', {});
      const data = await response.json();
      setToken(data.link_token);
      localStorage.setItem('link_token', data.link_token);
    }
  }, [setToken]);

  //Fetch transaction data, which includes accounts and balances data
  const getTransactions = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch('/api/transactions/get');

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
  if (window.location.href.includes('?oauth_state_id=')) {
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
      <div className='App'>
        <div className='Navbar'></div>

        {isLoggedIn ? (
          <div>
            {isAdmin ? (
              <div>
                <NavbarApp
                  open={open}
                  ready={ready}
                  transactions={props.transactions[0]}
                  transactions2={props.transactions[1]}
                />
                <Routes></Routes>
              </div>
            ) : (
              <div>
                <div className='navbar-logged-in'>
                  {/* navbar for logged in users */}
                  <NavbarApp
                    open={open}
                    ready={ready}
                    transactions={props.transactions[0]}
                    transactions2={props.transactions[1]}
                  />
                </div>
                <div className='SideNav'>
                  <SideNav />
                </div>

                <div className='app-container'>
                  <Routes>
                    <Route
                      exact
                      path='/link'
                      element={
                        <LinkAccount
                          open={open}
                          ready={ready}
                          transactions={props.transactions[0]}
                          transactions2={props.transactions[1]}
                        />
                      }
                    />
                    {/* <Route
                        path="/*"
                        element={<Navigate replace to="/dashboard" />}
                      /> */}
                    <Route
                      exact
                      path='/dashboard'
                      element={<Dashboard transactions={transactions} />}
                    />
                    <Route
                      exact
                      path='/'
                      element={<Navigate replace to='/dashboard' />}
                    />
                    <Route exact path='/budget' element={<BudgetApp />} />
                    <Route exact path='/trends' element={<Trends />} />
                    <Route
                      exact
                      path='/transactions'
                      element={<AllTransactions />}
                    />
                    <Route exact path='/donut' element={<DoughnutChart />} />{' '}
                    {/* to view chart */}
                    <Route exact path='/yearly' element={<Yearly />} />
                  </Routes>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* for users who aren't logged in */}
            <NavbarApp />
            <Routes>
              <Route exact path='/signup' element={<SignUp />} />
              {/* <Route path="/*" element={<Navigate replace to="/login" />} /> */}
              <Route exact path='/login' element={<LogIn />} />
              <Route exact path='/' element={<LogIn />} />
            </Routes>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
    isAdmin: !!state.user.admin,
    user: state.user,
    transactions: state.transactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(gettingUser()),
    addTransactions: (transactions, transaction) =>
      dispatch(addingTransactions(transactions, transaction)),
    getTransactions: () => dispatch(gettingTransactions()),
  };
};

export default connect(mapState, mapDispatch)(App);
