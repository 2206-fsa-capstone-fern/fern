import React, { useState } from "react";
import { connect } from "react-redux";
import { resetingNotice, updatingPassword } from "../../store";
import { Button } from "react-bootstrap";
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
      <form id="update-password" >
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
          <Button color="success" id="confirm-update-password" onClick={handleSubmitOnNewPassword}>
            Update Password
          </Button>
          {showConfirmNewPassword ? (
            <div style={{ color: "#364958" }}>Input Password To Confirm Password Update</div>
          ) : null}
          {notice.pass && notice.pass !== "Incorrect Password" ? (
            <div style={{ color: "#364958" }}>Password Updated Successfully</div>
          ) : null}
        </div>
        <br />
      </form>
      {showConfirmNewPassword ? (
        <form id="signup" className="white">
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
            <Button color="success" id="confirm-delete" onClick={confirmNewPassword}>
              Confirm Update Password
            </Button>
            {notice.pass === "Incorrect Password" ? (
              <div style={{ color: "#364958" }}>{`${notice.pass}`}</div>
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
    updatePassword: (email, confirmPassword, newPassword) =>
      dispatch(updatingPassword(email, confirmPassword, newPassword)),
    resetNotice: () => dispatch(resetingNotice()),
  };
};

export default connect(mapState, mapDisptach)(UpdatePassword);
