import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import { connect } from 'react-redux'
import { gettingUser } from './store/reducers'

class App extends Component {
  componentDidMount(){
    this.props.loadInitialData();
  }
  render() {
    console.log(this.props.user)
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user,
    user: state.user
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadInitialData: () => dispatch(gettingUser())
  }
}

export default connect(mapState, mapDisptach)(App);
