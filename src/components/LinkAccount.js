import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LinkAccount(props) {
  const [component, setComponent] = useState(null);
  function displayContinue() {
    return <Link to="/dashboard">Continue</Link>;
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      displayContinue();
    }, 100);
    return () => clearTimeout(timeout);
  });

  return (
    <div className="budget d-flex">
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <div style={{ height: "100%", background: "#364958" }}>
          <div className="link-account-container">
            <div className="link-account-box">
              <div className="link-account-content">
                <h4>Before proceeding, please connect your bank account</h4>

                <div className="link-account-button-div">
                  <button
                    onClick={() => {
                      props.open();
                    }}
                    disabled={!props.ready}
                    className="link-account-button"
                  >
                    Link Account
                  </button>
                </div>
                <h4>Continue when your account has been linked</h4>
                <div className="continue-button-box">
                  <div className="continue-button" style={{ width: "90px" }}>
                    <Link
                      to="/dashboard"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Continue
                    </Link>
                  </div>
                </div>
                <div className="link-account-disclaimer">
                  <p className="link-account-disclaimer-text">
                    DISCLAIMER:
                    <br />
                    By clicking on the button above, the user agrees to submit
                    personal financial related data to Plaid. Any information
                    the user decides to submit to the Plaid API is the user's
                    choice. For applicable terms and conditions, refer to
                    Plaid's{" "}
                    <a href="https://plaid.com/legal/terms-of-use/">
                      Terms Of Use
                    </a>
                    . We at Fern are not responsible for the information any
                    user decides to put in and do not store user bank data. We
                    at Fern do not offer or provide financial advice, nor do we
                    change any user bank related data. Any changes reflected on
                    the app is a reflection based off the user's financial
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkAccount;
