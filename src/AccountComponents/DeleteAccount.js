import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { deletingAccount } from "../store";
import { Button } from "react-bootstrap";
function DeleteAccount(props) {
  const { notice, user } = props;
  const { email } = user;
  const navigate = useNavigate();
  const [confirmPassword, setPassword] = useState("");
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmitOnDelete = (e) => {
    e.preventDefault();
    setshowConfirmDelete(true);
  };

  const confirmSubmitOnDelete = (e) => {
    e.preventDefault();
    props.deleteAccount(navigate, email, confirmPassword);
  };

  return (
    <div>
      {showConfirmDelete ? (
        <form onSubmit={confirmSubmitOnDelete} id="signup" className="white">
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
            <Button color="success" id="confirm-delete">
              CONFIRM DELETE
            </Button>
            {notice.delete === "Incorrect Password" ? (
              <span>{`${notice.delete}`}</span>
            ) : null}
          </div>
        </form>
      ) : null}

      <form className="delete-form">
        <div>
          <Button
            color="success"
            id="delete-account"
            onClick={handleSubmitOnDelete}
          >
            Delete Account
          </Button>
          {showConfirmDelete ? (
            <span>^^^ Input Password To Confirm Delete Account ^^^</span>
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
    user: state.user,
  };
};

const mapDisptach = (dispatch) => {
  return {
    deleteAccount: (navigate, email, confirmPassword) =>
      dispatch(deletingAccount(navigate, email, confirmPassword)),
  };
};

export default connect(mapState, mapDisptach)(DeleteAccount);
