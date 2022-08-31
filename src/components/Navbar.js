import React  from 'react';
import { Header } from "./Navbar.style";
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {
  CDBNavbar,
} from 'cdbreact';

const Navbar = (props) => {

  return (
    <Header style={{background:"#55828B", color:"#55828B"}}>
      <CDBNavbar height='30px'expand="md" className="justify-content-start">
        {props.isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
          </CDBNavbar>
        </Header>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);
