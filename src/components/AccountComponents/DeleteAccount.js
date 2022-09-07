import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { deletingAccount } from "../../store";
import { MDBBtn } from "mdb-react-ui-kit";

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
      <form className="delete-form">
        <div>
          <MDBBtn
            color="success"
            id="delete-account"
            onClick={handleSubmitOnDelete}
          >
            Delete Account
          </MDBBtn>
          {showConfirmDelete ? (
            <div style={{ color: "#c9e4ca" }}>
              Input Password To Confirm Delete Account
            </div>
          ) : null}
        </div>
        <br />
      </form>
      {showConfirmDelete ? (
        <form onSubmit={confirmSubmitOnDelete} id="signup" className="white">
          <div className="input-field">
            <label htmlFor="password" style={{ color: "#c9e4ca" }}>
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
            <MDBBtn color="success" id="confirm-delete">
              Confirm Delete
            </MDBBtn>
            {notice.delete === "Incorrect Password" ? (
              <div style={{ color: "#c9e4ca" }}>{`${notice.delete}`}</div>
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
