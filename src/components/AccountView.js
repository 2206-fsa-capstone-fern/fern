import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { deletingAccount, updatingPassword } from "../store";

function AccountView(props) {
  const { user, notice } = props;
  const { firstName, lastName, email, phoneNumber } = user;
  const navigate = useNavigate();
  const [confirmEmail, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
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
  /////////////////
  const handleSubmitOnDelete = (e) => {
    e.preventDefault();
    setshowConfirmDelete(true);
  };
  const confirmSubmitOnDelete = (e) => {
    e.preventDefault();
    props.deleteAccount(navigate, confirmEmail, confirmPassword);
  };
  //////////////////////
  const confirmNewPassword = (e) => {
    e.preventDefault();
    props.updatePassword(confirmEmail, confirmPassword, newPassword);
    document.getElementById("update-password").reset();
    setShowConfirmNewPassword(false)
  };
  const handleSubmitOnNewPassword = (e) => {
    e.preventDefault();
    setShowConfirmNewPassword(true);
  };
  /////////////////////
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

      <form className="update-phone">
        <div className="account-phone-number">
          <label htmlFor="account-phone-number">Phone Number</label>
          <input type="text" value={phoneNumber} disabled />
          <button className="update-info">
            <Link to="/update">Update</Link>
          </button>
        </div>
        <br />
      </form>

      <form className="update-email">
        <div className="account-email">
          <label htmlFor="account-email">Email</label>
          <input type="text" value={email} disabled />
          <button className="update-info">
            <Link to="/update">Update</Link>
          </button>
        </div>
        <br />
      </form>

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
          <button id="confirm-delete">Update Password</button>
          {showConfirmNewPassword ? (
            <span>^^^ Log In Above To Confirm Password Update ^^^</span>
          ) : null}
          {notice.length ? (
            <span>Password Updated Successfully</span>
          ) : null}
        </div>
        <br />
      </form>

      {showConfirmDelete ? (
        <form onSubmit={confirmSubmitOnDelete} id="signup" className="white">
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
            <button id="confirm-delete">CONFIRM DELETE</button>
          </div>
        </form>
      ) : null}

      <form className="delete-form">
        <div>
          <button id="delete-account" onClick={handleSubmitOnDelete}>
            Delete Account
          </button>
          {showConfirmDelete ? (
            <span>^^^ Log In Above To Confirm Delete Account ^^^</span>
          ) : null}
        </div>
        <br />
      </form>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.user,
    notice: state.accountNotice
  };
};

const mapDisptach = (dispatch) => {
  return {
    deleteAccount: (navigate, confirmEmail, confirmPassword) =>
      dispatch(deletingAccount(navigate, confirmEmail, confirmPassword)),
    updatePassword: (confirmEmail, confirmPassword, newPassword) =>
      dispatch(updatingPassword(confirmEmail, confirmPassword, newPassword)),
  };
};

export default connect(mapState, mapDisptach)(AccountView);
