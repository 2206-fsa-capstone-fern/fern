import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { Router } from "react-router-dom";
import { CDBContainer } from "cdbreact";

const Navbar = (props) => {
  const { isLoggedIn, open, ready, transactions, transactions2 } = props;
  const [collapse, setCollapse] = useState(false);

  const bgBlack = { backgroundColor: "#000000", color: "#f4f4f4" };

  return (
    <CDBContainer>
      {isLoggedIn ? (
        <SignedInLinks
          open={open}
          ready={ready}
          transactions={transactions}
          transactions2={transactions2}
        />
      ) : (
        <SignedOutLinks />
      )}
    </CDBContainer>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);
