import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  deletingAccount,
  gettingUser,
  updatingEmail,
  updatingPassword,
  updatingPhoneNumber,
} from "../store";

function AccountView(props) {
  const { user, notice } = props;
  const { firstName, lastName, email, phoneNumber } = user;
  const navigate = useNavigate();
  //////////
  const [confirmEmail, setEmail] = useState("");
  const [confirmPassword, setPassword] = useState("");
  //////////
  const [newPassword, setNewPassword] = useState("");
  ///////////
  const [newEmail, setNewEmail] = useState("");
  ///////////
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  ////////////
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  /////////////
  const [showConfirmNewEmail, setShowConfirmNewEmail] = useState(false);
  /////////////
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  ////////////
  const [showConfirmNewPhoneNumber, setShowConfirmNewPhoneNumber] =
    useState(false);
  ///////////////

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
    if (e.target.name === "newEmail") {
      setNewEmail(e.target.value);
    }
    if (e.target.name === "newPhoneNumber") {
      setNewPhoneNumber(e.target.value);
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
    setShowConfirmNewPassword(false);
  };
  const handleSubmitOnNewPassword = (e) => {
    e.preventDefault();
    setShowConfirmNewPassword(true);
  };
  /////////////////////
  const confirmNewEmail = async (e) => {
    e.preventDefault();
    await props.updateEmail(confirmEmail, confirmPassword, newEmail);
    document.getElementById("update-email").reset();
    await props.getUser()
    setShowConfirmNewEmail(false);
  };
  const handleSubmitOnNewEmail = (e) => {
    e.preventDefault();
    setShowConfirmNewEmail(true);
  };

  ////////////////////
  const confirmNewPhoneNumber = async (e) => {
    e.preventDefault();
    await props.updatePhoneNumber(confirmEmail, confirmPassword, newPhoneNumber);
    document.getElementById("update-phoneNumber").reset();
    await props.getUser()
    setShowConfirmNewPhoneNumber(false);
  };
  const handleSubmitOnNewPhoneNumber = (e) => {
    e.preventDefault();
    setShowConfirmNewPhoneNumber(true);
  };
  ///////////////////

  return (
    <div>
      <form className="update-name">
        <div className="account">
          <h3>Account</h3>
        </div>
        {/*//  //  //  //  //  //  //  //  //  //  // //  //  / / / // / / /   */}
        <div className="account-name">
          <label htmlFor="account-name">Name</label>
          <input type="text" value={firstName + " " + lastName} disabled />
        </div>
        <br />
      </form>
      {/*//  //  //  //  //  //  //  //  //  //  // //  //  / / / // / / /   */}
      {showConfirmNewPhoneNumber ? (
        <form onSubmit={confirmNewPhoneNumber} id="signup" className="white">
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
            <button id="confirm-delete">Confirm Update Phone Number</button>
          </div>
        </form>
      ) : null}

<form id="update-phoneNumber" onSubmit={handleSubmitOnNewPhoneNumber}>
        <div className="input-field">
          <label htmlFor="phoneNumber">Update Phone Number</label>
          <input
            type="text"
            name="newPhoneNumber"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <button id="confirm-update-phoneNumber">Update Phone Number</button>
          {showConfirmNewPhoneNumber ? (
            <span>^^^ Log In Above To Confirm Phone Number Update ^^^</span>
          ) : null}
          {notice.length ? <span>Phone Number Updated Successfully</span> : null}
        </div>
        <br />
      </form>
      {/*//  //  //  //  //  //  //  //  //  //  // //  //  / / / // / / /   */}
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
          {showConfirmNewPassword ? (
            <span>^^^ Log In Above To Confirm Email Update ^^^</span>
          ) : null}
          {notice.length ? <span>Email Updated Successfully</span> : null}
        </div>
        <br />
      </form>
      {/*//  //  //  //  //  //  //  //  //  //  // //  //  / / / // / / /   */}
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
          {notice.length ? <span>Password Updated Successfully</span> : null}
        </div>
        <br />
      </form>
      {/*//  //  //  //  //  //  //  //  //  //  // //  //  / / / // / / /   */}
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
    notice: state.accountNotice,
  };
};

const mapDisptach = (dispatch) => {
  return {
    deleteAccount: (navigate, confirmEmail, confirmPassword) =>
      dispatch(deletingAccount(navigate, confirmEmail, confirmPassword)),
    updatePassword: (confirmEmail, confirmPassword, newPassword) =>
      dispatch(updatingPassword(confirmEmail, confirmPassword, newPassword)),
    updateEmail: (confirmEmail, confirmPassword, newEmail) =>
      dispatch(updatingEmail(confirmEmail, confirmPassword, newEmail)),
    updatePhoneNumber: (confirmEmail, confirmPassword, newPhoneNumber) =>
      dispatch(
        updatingPhoneNumber(confirmEmail, confirmPassword, newPhoneNumber)
      ),
    getUser: () => dispatch(gettingUser())
  };
};

export default connect(mapState, mapDisptach)(AccountView);
