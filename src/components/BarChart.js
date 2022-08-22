import React from "react";
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto" // HAVE TO HAVE THIS LINE IN ORDER FOR CHART TO RENDER

function BarGraph({chartData}) {
  return(
    <Bar data={chartData} /> // has to have a sort of data
  )
}

export default BarGraph
