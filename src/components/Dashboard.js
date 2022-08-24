import React from 'react';
import { useState } from 'react';
import BarChart from './BarChart';
import LineGraph from './LineGraph';
import PieChart from './PieChart';
import { dummyTransactions } from '../DummyData/Transactions';
import SideNav from './SideNav/SideNav';

const Dashboard = () => {
  const dummyData = dummyTransactions[0].transactions.slice(0, 10);
  const transactionCategory = dummyData.map(
    (transaction) => transaction.category[0]
  );
  const transactionAmount = dummyData.map((transaction) => transaction.amount);
  const [chartData, setChartData] = useState({
    labels: transactionCategory,
    datasets: [
      {
        label: 'Transactions',
        data: transactionAmount,
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#ecf0f1',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: ['rgba(75,192,192,1)'],
        borderWidth: 5,
      },
    ],
  });
  console.log(transactionAmount);

  return (
    <div>
      <SideNav />

      {/* <div
        class='chart-container'
        style={{ position: 'relative', height: '1000px', width: '1000px' }}>
        <div>
          <BarChart chartData={chartData} />
        </div>
        <div>
          <LineGraph chartData={chartData} />
        </div>
        <div>
          <PieChart chartData={chartData} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
