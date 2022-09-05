import React from "react";
import { Header } from "./Navbar.style";
import { connect } from "react-redux";
import SignedInLinks from "../Auth/SignedInLinks";
import SignedOutLinks from "../Auth/SignedOutLinks";
import { MDBNavbar } from "mdb-react-ui-kit";

const Navbar = (props) => {
  return (
    <div>
      <MDBNavbar style={{ background: "#c9e4ca" }}>
        <Header>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="navbar">
                  <h3
                    style={{
                      textAlign: "center",
                      paddingRight: "50px",
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
      </MDBNavbar>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);
