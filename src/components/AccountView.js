import React from "react";
import { Link } from "react-router-dom";

function AccountView() {
  return (
    <form className="account-view">
      <div className="account">
        <h3>Account</h3>
      </div>
      
      <div className="account-name">
        <label htmlFor="account-name">Name</label>
        <input type="text" value={"replace this with value of account owner's name"} disabled />
      </div>
      <br />

      <div className="account-phone-number">
        <label htmlFor="account-phone-number">Phone Number</label>
        <input type="text" value={"replace this with value of account owner's phone number"} disabled />
        <button className="update-info">
          <Link to="/update">Update</Link>
        </button>
      </div>
      <br />

      <div className="account-email">
        <label htmlFor="account-email">Email</label>
        <input type="text" value={"replace this with value of account owner's email"} disabled />
        <button className="update-info">
          <Link to="/update">Update</Link>
        </button>
      </div>
      <br />

      <div className="account-password">
        <label htmlFor="account-password">Password</label>
        <input type="password" value={"replace this with value of account owner's password.LENGTH"} disabled />
        <button className="update-info">
          <Link to="/update">Update</Link>
        </button>
      </div>
      <br />

      <div className="account-bank-number">
        <label htmlFor="account-bank-number">Bank Account Number</label>
        <input type="password" value={"replace this with value of account owner's bank account number.LENGTH"} disabled />
        <button className="view-info">View</button>
        <button className="update-info">
          <Link to="/update">Update</Link>
        </button>
      </div>
      <br />

      <div className="account-routing-number">
        <label htmlFor="account-routing-number">Bank Routing Number</label>
        <input type="password" value={"replace this with value of account owner's bank account routing.LENGTH"} disabled />
        <button className="view-info">View</button>
        <button className="update-info">
          <Link to="/update">Update</Link>
        </button>
      </div>
      <br />
    </form>
  );
}

export default AccountView;
