import React from "react";
import { connect } from "react-redux";

import DeleteAccount from "./DeleteAccount";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import UpdatePhoneNumber from "./UpdatePhoneNumber";

function AccountView(props) {
  const { user } = props;
  const { firstName, lastName, phoneNumber, email } = user;

  return (
    <div>
      <form className="">
        <div className="display-1">
          <h3 className="display-1">Account Information</h3>
        </div>
        <div className="account-name">
          <label htmlFor="account-name">Name</label>
          <input type="text" value={firstName + " " + lastName} disabled />
        </div>
        <br />
      </form>
      <div className="account-phoneNumber">
          <label htmlFor="account-phoneNumber">Phone Number</label>
          <input type="text" value={phoneNumber} disabled />
        </div>
      <UpdatePhoneNumber />
      <div className="account-email">
          <label htmlFor="account-email">Email</label>
          <input type="text" value={email} disabled />
        </div>
      <UpdateEmail />
      <UpdatePassword />
      <DeleteAccount />
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    notice: state.accountNotice,
  };
};

export default connect(mapState, null)(AccountView);
