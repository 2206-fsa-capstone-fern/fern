import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { deletingAccount } from "../store";

function DeleteAccount(props) {
  const navigate = useNavigate();
  const [confirmEmail, setEmail] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const handleSubmitOnDelete = (e) => {
    e.preventDefault();
    setshowConfirmDelete(true);
  };

  const confirmSubmitOnDelete = (e) => {
    e.preventDefault();
    props.deleteAccount(navigate, confirmEmail, confirmPassword);
  };

  return (
    <div>
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
    notice: state.accountNotice,
  };
};

const mapDisptach = (dispatch) => {
  return {
    deleteAccount: (navigate, confirmEmail, confirmPassword) =>
      dispatch(deletingAccount(navigate, confirmEmail, confirmPassword)),
  };
};

export default connect(mapState, mapDisptach)(DeleteAccount);
