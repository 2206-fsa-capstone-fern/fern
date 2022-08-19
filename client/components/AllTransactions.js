// monthly expenses as pie chart

import React from "react";

function AllTransactions() {
  return (
    <div className="accounts">
      <div className="transactions-bar">
        <div>Date</div>
        <div>Description</div>
        <div>Category</div>
        <div>Amount</div>
        {/* this view totally depends on how it comes through from the api */}
      </div>
    </div>
  );
}

export default AllTransactions;
