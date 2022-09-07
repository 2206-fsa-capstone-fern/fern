import React, { useState } from "react";
import { connect } from "react-redux";
import { gettingUser, resetingNotice, updatingEmail } from "../../store";
import { Button } from "react-bootstrap";
function UpdateEmail(props) {
  let { notice, user } = props;
  const { email } = user;
  const [confirmPassword, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showConfirmNewEmail, setShowConfirmNewEmail] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "newEmail") {
      setNewEmail(e.target.value);
    }
  };

  const confirmNewEmail = async (e) => {
    e.preventDefault();
    const newNotice = await props.updateEmail(email, confirmPassword, newEmail);
    if (newNotice.notice.email !== "Incorrect Password") {
      document.getElementById("update-email").reset();
      await props.getUser();
      setShowConfirmNewEmail(false);
    }
  };

  const handleSubmitOnNewEmail = (e) => {
    e.preventDefault();
    props.resetNotice();
    setShowConfirmNewEmail(true);
  };

  return (
    <div>
      <form id="update-email" >
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
          <Button color="success" id="confirm-update-email" onClick={handleSubmitOnNewEmail}>
            Update Email
          </Button>
          {showConfirmNewEmail ? (
            <div style={{ color: "#364958" }}>Input Password To Confirm Update</div>
          ) : null}
          {notice.email && notice.email !== "Incorrect Password" ? (
            <div style={{ color: "#364958" }}>Email Updated Successfully</div>
          ) : null}
        </div>
        <br />
      </form>
      {showConfirmNewEmail ? (
        <form  id="signup" className="white">
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
            <Button color="success" id="confirm-delete" onClick={confirmNewEmail}>
              Confirm Update Email
            </Button>
            {notice.email === "Incorrect Password" ? (
              <div style={{ color: "#364958" }}>{`${notice.email}`}</div>
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
    updateEmail: (email, confirmPassword, newEmail) =>
      dispatch(updatingEmail(email, confirmPassword, newEmail)),
    resetNotice: () => dispatch(resetingNotice()),
    getUser: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(UpdateEmail);
