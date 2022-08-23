import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
                  <Route exact path="/Dashboard" element={<Dashboard />} />
                  <Route path="/*" element={<Navigate replace to="/Dashboard" />} />
                </Routes>
              )}
            </div>
          ) : (
            <Routes>
              <Route exact path="/signup" element={<SignUp />} />
              <Route path="/*" element={<Navigate replace to="/login" />} />
              <Route exact path="/login" element={<LogIn />} />
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
