import React, { useState } from "react";
import { connect } from "react-redux";
import { gettingUser, resetingNotice, updatingPhoneNumber } from "../../store";
import { MDBBtn } from "mdb-react-ui-kit";
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
      <form id="update-phoneNumber" onSubmit={handleSubmitOnNewPhoneNumber}>
        <div style={{ color: "#c9e4ca" }} className="input-field">
          <label htmlFor="phoneNumber" style={{ color: "#c9e4ca" }}>
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
          <MDBBtn color="success" id="confirm-update-phoneNumber">
            Update Phone Number
          </MDBBtn>
          {showConfirmNewPhoneNumber ? (
            <div style={{ color: "#c9e4ca" }}>
              Input Password To Confirm Update
            </div>
          ) : null}
          {notice.phone && notice.phone !== "Incorrect Password" ? (
            <div style={{ color: "#c9e4ca" }}>
              Phone Number Updated Successfully
            </div>
          ) : null}
        </div>
        <br />
      </form>

      {showConfirmNewPhoneNumber ? (
        <form onSubmit={confirmNewPhoneNumber} id="signup" className="white">
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
            <MDBBtn
              color="success"
              id="confirm-delete"
              style={{ color: "#c9e4ca" }}
            >
              Confirm Update
            </MDBBtn>
            {notice.phone === "Incorrect Password" ? (
              <div style={{ color: "#c9e4ca" }}>{`${notice.phone}`}</div>
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
    updatePhoneNumber: (confirmEmail, confirmPassword, newPhoneNumber) =>
      dispatch(
        updatingPhoneNumber(confirmEmail, confirmPassword, newPhoneNumber)
      ),
    resetNotice: () => dispatch(resetingNotice()),
    getUser: () => dispatch(gettingUser()),
  };
};

export default connect(mapState, mapDisptach)(UpdatePhoneNumber);
