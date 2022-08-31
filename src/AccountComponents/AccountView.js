import React from "react";
import { connect } from "react-redux";

import DeleteAccount from "./DeleteAccount";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import UpdatePhoneNumber from "./UpdatePhoneNumber";

function AccountView(props) {
  const { user } = props;
  const { firstName, lastName } = user;

  return (
    <div>
      <form className="update-name">
        <div className="account">
          <h3>Account</h3>
        </div>
        <div className="account-name">
          <label htmlFor="account-name">Name</label>
          <input type="text" value={firstName + " " + lastName} disabled />
        </div>
        <br />
      </form>
      <UpdatePhoneNumber />
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
