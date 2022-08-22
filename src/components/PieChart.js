import React from "react";
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto" // HAVE TO HAVE THIS LINE IN ORDER FOR CHART TO RENDER

function PieChart({chartData}) {
  return(
    <Pie data={chartData} />
  )
}

export default PieChart
