import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { Router } from 'react-router-dom';
import {
  CDBNavbar,
  CDBNavBrand,
  CDBNavItem,
  CDBNavToggle,
  CDBIcon,
  CDBCollapse,
  CDBNavbarNav,
  CDBContainer,
} from 'cdbreact';

const Navbar = (props) => {
  const { isLoggedIn, open, ready, transactions, transactions2 } = props;
  const [collapse, setCollapse] = useState(false);

  const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };

  return (
    <CDBNavbar
      className='navbar-dark'
      expand='md'
      style={bgBlack}
      collapseOnSelect={true}>
      <CDBNavBrand>
        <Link to='/'>
          <CDBIcon className='fa fa-home' />
          <span className='ml-2'>FernFi</span>
        </Link>
      </CDBNavBrand>
      <CDBNavToggle
        aria-controls='navbar-nav'
        aria-expanded={collapse}
        onClick={() => setCollapse(!collapse)}>
        <CDBIcon className='fa fa-bars' />
      </CDBNavToggle>
      <CDBCollapse isOpen={collapse} navbar>
        <CDBNavbarNav>
          <CDBNavItem>
            <Link to='/'>
              <CDBIcon className='fa fa-home' />
              <span className='ml-2'>Home</span>
            </Link>
          </CDBNavItem>
          <CDBNavItem>
            <Link to='/transactions'>
              <CDBIcon className='fa fa-money-bill' />
              <span className='ml-2'>Transactions</span>
            </Link>
          </CDBNavItem>
          <CDBNavItem>
            <Link to='/trends'>
              <CDBIcon className='fa fa-chart-line' />
              <span className='ml-2'>Trends</span>
            </Link>
          </CDBNavItem>
          <CDBNavItem>
            <Link to='/settings'>
              <CDBIcon className='fa fa-cog' />
              <span className='ml-2'>Settings</span>
            </Link>
          </CDBNavItem>
          <CDBNavItem>
            <Link to='/about'>
              <CDBIcon className='fa fa-info-circle' />
              <span className='ml-2'>About</span>
            </Link>
          </CDBNavItem>
        </CDBNavbarNav>
        <CDBContainer>
          {isLoggedIn ? <SignedInLinks /> : <SignedOutLinks />}
        </CDBContainer>
      </CDBCollapse>
    </CDBNavbar>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);
