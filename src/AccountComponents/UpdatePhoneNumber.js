import React, { useState } from "react";
import { connect } from "react-redux";
import { gettingUser, updatingPhoneNumber } from "../store";

function UpdatePhoneNumber(props) {
  const { notice } = props;
  const [confirmEmail, setEmail] = useState("");
  const [confirmPassword, setPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showConfirmNewPhoneNumber, setShowConfirmNewPhoneNumber] =
    useState(false);

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "newPhoneNumber") {
      setNewPhoneNumber(e.target.value);
    }
  };

  const confirmNewPhoneNumber = async (e) => {
    e.preventDefault();
    await props.updatePhoneNumber(
      confirmEmail,
      confirmPassword,
      newPhoneNumber
    );
    document.getElementById("update-phoneNumber").reset();
    await props.getUser();
    setShowConfirmNewPhoneNumber(false);
  };

  const handleSubmitOnNewPhoneNumber = (e) => {
    e.preventDefault();
    setShowConfirmNewPhoneNumber(true);
  };

  return (
    <div>
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
          {notice.phone && notice.phone !== "Incorrect Email/Password" ? <span>Phone Number Updated Successfully</span> : null}
          {notice.phone === "Incorrect Email/Password" ? <span>{`${notice.phone}`}</span> : null}
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
    updatePhoneNumber: (confirmEmail, confirmPassword, newPhoneNumber) =>
      dispatch(
        updatingPhoneNumber(confirmEmail, confirmPassword, newPhoneNumber)
      ),
    getUser: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(UpdatePhoneNumber);
