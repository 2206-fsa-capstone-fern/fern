import React from "react";

function LinkAccount({ open, ready }) {
  return (
    <div className="accounts">
      <button onClick={() => open()} disabled={!ready}>
        <strong>Link an account</strong>
      </button>
    </div>
  );
}

export default LinkAccount;
