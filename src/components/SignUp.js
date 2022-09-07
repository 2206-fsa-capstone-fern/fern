import React, { Component } from "react";
import { signup } from "../store";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    toNext: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, phoneNumber } = this.state;
    document.getElementById("signup").reset();
    this.props.signUp(email, password, firstName, lastName, phoneNumber);
  };

  render() {
    let { user } = this.props;
    const { toNext } = this.state;
    if (typeof user === "object" && user.length) {
      this.setState({
        toNext: true,
      });
    }
    if(user.code === "auth/internal-error") {
      user.code = "Please Fill In All Your Information"
    }
    if(user.code === "auth/email-already-in-use") {
      user.code = "User Exists. Please Log In."
    }
    if(user.code === "Not A User. Please Sign Up." || user.code === "Incorrect Password. Please Try Again.") {
      user = {}
    }

    return (
      <div className="Auth-form-container">
        <form onSubmit={this.handleSubmit} id="signup" className="Auth-form">
          {toNext ? <Navigate to="/signup" /> : null}
          <div className="Auth-form-content">
            <h3 className="Auth-form-title" style={{ color: "#c9e4ca" }}>
              Sign Up
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
                minLength={6}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#c9e4ca" }}>First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                name="firstName"
                placeholder="Enter first name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#c9e4ca" }}>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                name="lastName"
                placeholder="Enter last name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label style={{ color: "#c9e4ca" }}>
                Phone Number (ex. 123-456-7890)
              </label>
              <input
                type="tel"
                className="form-control mt-1"
                name="phoneNumber"
                placeholder="Enter phone number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={this.handleChange}
              />
            </div>
            <Button type="submit" color="success">
              Submit
            </Button>
            {toNext ? null : <div style={{ color: "#01a314" }}>{user.code}</div> }
          </div>
        </form>
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
    signUp: (email, password, firstName, lastName, phoneNumber) =>
      dispatch(signup(email, password, firstName, lastName, phoneNumber)),
  };
};

export default connect(mapState, mapDisptach)(SignUp);
