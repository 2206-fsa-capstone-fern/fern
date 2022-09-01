import React, { useState } from "react";
import { connect } from "react-redux";
import { resetingNotice, updatingPassword } from "../store";
import {MDBBtn} from 'mdb-react-ui-kit';
function UpdatePassword(props) {
  const { notice, user } = props;
  const { email } = user;
  const [confirmPassword, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
    }
  };

  const confirmNewPassword = async (e) => {
    e.preventDefault();
    const newNotice = await props.updatePassword(
      email,
      confirmPassword,
      newPassword
    );
    console.log(newNotice);
    if (newNotice.notice.pass !== "Incorrect Password") {
      document.getElementById("update-password").reset();
      setShowConfirmNewPassword(false);
    }
  };

  const handleSubmitOnNewPassword = (e) => {
    e.preventDefault();
    props.resetNotice();
    setShowConfirmNewPassword(true);
  };

  return (
    <div>
      {showConfirmNewPassword ? (
        <form onSubmit={confirmNewPassword} id="signup" className="white">
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
            <MDBBtn color="success" id="confirm-delete">
              Confirm Update Password
            </MDBBtn>
            {notice.pass === "Incorrect Password" ? (
              <span>{`${notice.pass}`}</span>
            ) : null}
          </div>
        </form>
      ) : null}

      <form id="update-password" onSubmit={handleSubmitOnNewPassword}>
        <div className="input-field">
          <label htmlFor="password">Update Password</label>
          <input
            type="password"
            name="newPassword"
            minLength={6}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <MDBBtn color="success" id="confirm-update-password">
            Update Password
          </MDBBtn>
          {showConfirmNewPassword ? (
            <span>^^^ Input Password Above To Confirm Password Update ^^^</span>
          ) : null}
          {notice.pass && notice.pass !== "Incorrect Password" ? (
            <span>Password Updated Successfully</span>
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
    updatePassword: (email, confirmPassword, newPassword) =>
      dispatch(updatingPassword(email, confirmPassword, newPassword)),
    resetNotice: () => dispatch(resetingNotice()),
  };
};

export default connect(mapState, mapDisptach)(UpdatePassword);