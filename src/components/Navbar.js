import React from "react";
import { Header } from "./Navbar.style";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { NavLink } from "react-router-dom";
import { CDBNavbar } from "cdbreact";

const Navbar = (props) => {
  return (
    <div>
      <CDBNavbar style={{ background: "#c9e4ca" }}>
        <Header>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="navbar">
                  <h3
                    style={{
                      textAlign: "center",
                      paddingRight: "25px",
                      paddingLeft: "15px",
                    }}
                  >
                    FernFi
                  </h3>

                  <div className="navbar__links">
                    {props.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Header>
      </CDBNavbar>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);
