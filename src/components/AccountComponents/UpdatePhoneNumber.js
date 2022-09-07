import React, { useState } from "react";
import { connect } from "react-redux";
import { gettingUser, resetingNotice, updatingPhoneNumber } from "../store";
import { Button } from "react-bootstrap";
function UpdatePhoneNumber(props) {
  const { notice, user } = props;
  const { email } = user;
  const [confirmPassword, setPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showConfirmNewPhoneNumber, setShowConfirmNewPhoneNumber] =
    useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "newPhoneNumber") {
      setNewPhoneNumber(e.target.value);
    }
  };

  const confirmNewPhoneNumber = async (e) => {
    e.preventDefault();
    let newNotice = await props.updatePhoneNumber(
      email,
      confirmPassword,
      newPhoneNumber
    );
    if (newNotice.notice.phone !== "Incorrect Password") {
      document.getElementById("update-phoneNumber").reset();
      await props.getUser();
      setShowConfirmNewPhoneNumber(false);
    }
  };

  const handleSubmitOnNewPhoneNumber = (e) => {
    e.preventDefault();
    props.resetNotice();
    setShowConfirmNewPhoneNumber(true);
  };

  return (
    <div>
      {showConfirmNewPhoneNumber ? (
        <form onSubmit={confirmNewPhoneNumber} id="signup" className="white">
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
              Confirm Update Phone Number
            </Button>
            {notice.phone === "Incorrect Password" ? (
              <span>{`${notice.phone}`}</span>
            ) : null}
          </div>
        </form>
      ) : null}

      <form id="update-phoneNumber" onSubmit={handleSubmitOnNewPhoneNumber}>
        <div className="input-field">
          <label htmlFor="phoneNumber">
            Update Phone Number (123-456-7890)
          </label>
          <input
            type="tel"
            name="newPhoneNumber"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <Button color="success" id="confirm-update-phoneNumber">
            Update Phone Number
          </Button>
          {showConfirmNewPhoneNumber ? (
            <span>
              ^^^ Input Password Above To Confirm Phone Number Update ^^^
            </span>
          ) : null}
          {notice.phone && notice.phone !== "Incorrect Password" ? (
            <span>Phone Number Updated Successfully</span>
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
    updatePhoneNumber: (confirmEmail, confirmPassword, newPhoneNumber) =>
      dispatch(
        updatingPhoneNumber(confirmEmail, confirmPassword, newPhoneNumber)
      ),
    resetNotice: () => dispatch(resetingNotice()),
    getUser: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(UpdatePhoneNumber);
