import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingIn } from "../store";

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
    document.getElementById("login").reset()
    this.props.login(email, password)
  };

  render() {
    const { user } = this.props
    const { toNext } = this.state
    if(typeof user === "object" && user.length) {
      this.setState({
        toNext: true
      })
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} id="login" className="white">
        { toNext ? <Navigate to="/login" /> : null }
          <h5 className="grey-text text-darken-3">Log In</h5>
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
            <button className="btn">Login</button>
            {toNext ? null : <span>{user}</span> }
          </div>
          <div>
            <Link to="/signup">New User? Click here to sign up!</Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDisptach = (dispatch) => {
  return {
    login: (email, password) => dispatch(loggingIn(email, password)),
  };
};

export default connect(mapState, mapDisptach)(LogIn);
