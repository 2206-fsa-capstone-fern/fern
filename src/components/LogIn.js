import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingIn } from "../store";
import Navbar from "./Navbar";
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIframe,
  MDBView,
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselControl,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCardImage,
} from "mdb-react-ui-kit";

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
    const { user } = this.props;
    const { toNext } = this.state;
    if (typeof user === "object" && user.length) {
      this.setState({
        toNext: true,
      });
    }

    return (
      <div>
      <div className="Auth-form-container">
          <img src="intro.png" alt="intro" className="text-blur-out" />
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
            <div className="d-grid gap-2 mt-3">
              <MDBBtn type="submit" color="success">
                Submit
              </MDBBtn>
            </div>
            <p
              className="forgot-password text-right mt-2"
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
//           <h5 className="grey-text text-darken-3">Log In</h5>
//           <div className="input-field">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               name="email"
//               onChange={this.handleChange}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={this.handleChange}
//               required
//             />
//           </div>
//           <div className="input-field">
//             <button className="btn">Login</button>
//             {toNext ? null : <span>{user.code}</span> }
//           </div>
//           <div>
//             <Link to="/signup">New User? Click here to sign up!</Link>
//           </div>
//         </form>
//       </div>
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
    login: (email, password) => dispatch(loggingIn(email, password)),
  };
};

export default connect(mapState, mapDisptach)(LogIn);
