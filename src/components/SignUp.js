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
    const { user } = this.props;
    const { toNext } = this.state;
    if (typeof user === "object" && user.length) {
      this.setState({
        toNext: true,
      });
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
          </div>
        </form>
      </div>
    );
  }
}
/* <div className="container">
        <form onSubmit={this.handleSubmit} id="signup" className="white">
        { toNext ? <Navigate to="/login" /> : null }
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <button className="btn">SIGN UP</button>
            {toNext ? null : <span>{user.code}</span> }
          </div>
          <div>
            <Link to="/login">Existing User? Click here to log in!</Link>
          </div>
        </form>
      </div> */
//     );
//   }
// }

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
