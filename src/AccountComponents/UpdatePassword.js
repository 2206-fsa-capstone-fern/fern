import React, { useState } from "react";
import { connect } from "react-redux";
import { updatingPassword } from "../store";

function UpdatePassword(props) {
  const { notice } = props;
  const [confirmEmail, setEmail] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  const confirmNewPassword = (e) => {
    e.preventDefault();
    props.updatePassword(confirmEmail, confirmPassword, newPassword);
    document.getElementById("update-password").reset();
    setShowConfirmNewPassword(false);
  };

  const handleSubmitOnNewPassword = (e) => {
    e.preventDefault();
    setShowConfirmNewPassword(true);
  };

  return (
    <div>
      {showConfirmNewPassword ? (
        <form onSubmit={confirmNewPassword} id="signup" className="white">
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
            <button id="confirm-delete">Confirm Update Password</button>
          </div>
        </form>
      ) : null}

      <form id="update-password" onSubmit={handleSubmitOnNewPassword}>
        <div className="input-field">
          <label htmlFor="password">Update Password</label>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <button id="confirm-update-password">Update Password</button>
          {showConfirmNewPassword ? (
            <span>^^^ Log In Above To Confirm Password Update ^^^</span>
          ) : null}
          {notice.pass && notice.pass !== "Incorrect Email/Password" ? <span>Password Updated Successfully</span> : null}
          {notice.pass === "Incorrect Email/Password" ? <span>{`${notice.pass}`}</span> : null}
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
    updatePassword: (confirmEmail, confirmPassword, newPassword) =>
      dispatch(updatingPassword(confirmEmail, confirmPassword, newPassword)),
  };
};

export default connect(mapState, mapDisptach)(UpdatePassword);
