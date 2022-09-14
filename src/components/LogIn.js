import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingIn } from "../store";
import { Button } from "react-bootstrap";
import Navbar from "./NavBars/Navbar";
class LogIn extends Component {
  state = {
    email: "",
    password: "",
    toNext: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    document.getElementById("login").reset();
    this.props.login(email, password);
  };

  render() {
    let { user } = this.props;
    const { toNext } = this.state;
    if (typeof user === "object" && user.length) {
      this.setState({
        toNext: true,
      });
    }
    if (user.code === "auth/wrong-password") {
      user.code = "Incorrect Password. Please Try Again.";
    }
    if (user.code === "auth/user-not-found") {
      user.code = "Not A User. Please Sign Up.";
    }
    if (
      user.code === "User Exists. Please Log In." ||
      user.code === "Please Fill In All Your Information"
    ) {
      user = {};
    }

    return (
      <div>
        <Navbar />
        <div className="Auth-form-container">
          <form onSubmit={this.handleSubmit} id="login" className="Auth-form">
            {toNext ? <Navigate to="/login" /> : null}
            <div className="Auth-form-content">
              <h3 className="Auth-form-title" style={{ color: "#c9e4ca" }}>
                Log In
              </h3>
              <div className="form-group mt-3">
                <label style={{ color: "#c9e4ca" }}>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group mt-3">
                <label style={{ color: "#c9e4ca" }}>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  name="password"
                  placeholder="Enter password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="d-grid gap-2 mt-3" style={{ marginLeft: "75px" }}>
                <Button type="submit" color="success">
                  Submit
                </Button>
                {toNext ? null : (
                  <div style={{ color: "#01a314" }}>{user.code}</div>
                )}
              </div>
              <p
                className="forgot-password text-center mt-2"
                style={{ color: "#c9e4ca" }}
              >
                Forgot{" "}
                <a href="#" style={{ color: "#01a314" }}>
                  password?
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDisptach = (dispatch) => {
  return {
    login: (email, password) => dispatch(loggingIn(email, password)),
  };
};

export default connect(mapState, mapDisptach)(LogIn);
