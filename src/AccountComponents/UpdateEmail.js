import React, { useState } from "react";
import { connect } from "react-redux";
import { gettingUser, updatingEmail } from "../store";

function UpdateEmail(props) {
  const { notice } = props;
  const [confirmEmail, setEmail] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showConfirmNewEmail, setShowConfirmNewEmail] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "newEmail") {
      setNewEmail(e.target.value);
    }
  };

  const confirmNewEmail = async (e) => {
    e.preventDefault();
    await props.updateEmail(confirmEmail, confirmPassword, newEmail);
    document.getElementById("update-email").reset();
    await props.getUser();
    setShowConfirmNewEmail(false);
  };

  const handleSubmitOnNewEmail = (e) => {
    e.preventDefault();
    setShowConfirmNewEmail(true);
  };

  return (
    <div>
      {showConfirmNewEmail ? (
        <form onSubmit={confirmNewEmail} id="signup" className="white">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <button id="confirm-delete">Confirm Update Email</button>
          </div>
        </form>
      ) : null}
      <form id="update-email" onSubmit={handleSubmitOnNewEmail}>
        <div className="input-field">
          <label htmlFor="email">Update Email</label>
          <input
            type="email"
            name="newEmail"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <button id="confirm-update-email">Update Email</button>
          {showConfirmNewEmail ? (
            <span>^^^ Log In Above To Confirm Email Update ^^^</span>
          ) : null}
          {notice.length ? <span>Email Updated Successfully</span> : null}
        </div>
        <br />
      </form>
    </div>
  );
}

const mapState = (state) => {
  return {
    notice: state.accountNotice,
  };
};

const mapDisptach = (dispatch) => {
  return {
    updateEmail: (confirmEmail, confirmPassword, newEmail) =>
      dispatch(updatingEmail(confirmEmail, confirmPassword, newEmail)),
    getUser: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(UpdateEmail);
