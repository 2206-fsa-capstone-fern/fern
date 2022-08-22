import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { connect } from "react-redux";
import { gettingUser } from "./store";

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {isLoggedIn ? (
            <div>
              {isAdmin ? (
                <Routes></Routes>
              ) : (
                <Routes>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route exact path="/signup" element={<Dashboard />} />
                  <Route path="/login" element={<Dashboard />} />
                </Routes>
              )}
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LogIn />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
    isAdmin: !!state.user.admin,
    user: state.user,
  };
};

const mapDisptach = (dispatch) => {
  return {
    loadInitialData: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(App);
