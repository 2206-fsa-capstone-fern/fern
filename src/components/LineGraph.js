import React from "react";
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto" // HAVE TO HAVE THIS LINE IN ORDER FOR CHART TO RENDER

function LineGraph({chartData}) {
  return(
    <Line data={chartData} />
  )
}

export default LineGraph
