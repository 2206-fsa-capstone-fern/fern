import React from "react";

const Dashboard = () => {
  return (
    <div>
      <div>
        {/* account summary box */}
        <p>Total Balance #</p>
        <p>Checking and Savings #</p>
        <p>Credit Cards #</p>
      </div>
      <div>
        {/* monthly spending line graph */}
        <p>Monthly Spending</p>
      </div>
      <div>{/* monthly spending broken down by category */}</div>
      <div>
        {/* budget remaining */}
        <p>Monthly Budget</p>
        <p></p>
        <p>$ Remaining</p>
      </div>
    </div>
  );
};

export default Dashboard;
