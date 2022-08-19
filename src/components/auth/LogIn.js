import React, { Component } from "react";
import { auth } from "../../config/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user logged in:", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
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
          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
