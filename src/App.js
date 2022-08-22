import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";
import Navbar from "./components/layout/Navbar";
import Plaid from "./components/Plaid";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Plaid />
          <Routes>
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/link" element={<Plaid />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
