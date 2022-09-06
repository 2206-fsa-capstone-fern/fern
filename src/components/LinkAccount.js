// import React from "react";

// function LinkAccount(props) {
//   return (
//     <ul className="right">
//       <li>
//         <div></div>
//       </li>
//     </ul>
//   );
// }

// export default LinkAccount;

import React from "react";
import SideNav from "./SideNav/SideNav";

function LinkAccount(props) {
  return (
    <div className="budget d-flex">
      <div>
        <SideNav />
      </div>
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
                  <button className="link-account-button">
                    Link Bank Account
                  </button>
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
