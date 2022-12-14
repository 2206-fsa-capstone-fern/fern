import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { deletingAccount } from "../../store";
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
      <form className="delete-form" >
        <div>
          <Button
            color="success"
            id="delete-account"
            onClick={handleSubmitOnDelete}
          >
            Delete Account
          </Button>
          {showConfirmDelete ? (
            <div style={{ color: "#364958" }}>
              Input Password To Confirm Delete Account
            </div>
          ) : null}
        </div>
        <br />
      </form>
      {showConfirmDelete ? (
        <form id="signup" className="white">
          <div className="input-field">
            <label htmlFor="password" style={{ color: "#364958" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <Button color="success" id="confirm-delete" onClick={confirmSubmitOnDelete}>
              Confirm Delete
            </Button>
            {notice.delete === "Incorrect Password" ? (
              <div style={{ color: "#364958" }}>{`${notice.delete}`}</div>
            ) : null}
          </div>
        </form>
      ) : null}
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
