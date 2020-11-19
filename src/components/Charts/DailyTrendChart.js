import React from "react";
import { Bar } from "react-chartjs-2";

import { convertHexToRGBA } from "../../utils";

const DailyTrendChart = ({
  timeline,
  trend,
  label,
  backgroundColor,
  displayLegend = true,
}) => {
  const data = {
    datasets: [
      {
        label: label,
        backgroundColor: convertHexToRGBA(backgroundColor, 0.6),
        data: timeline.map((o) => {
          return { x: new Date(o.date), y: o[trend] };
        }),
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: displayLegend,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "month",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            // max: 5, min: 200000, stepSize: 200000,
            callback: function (value, index, array) {
              if (value > 1000000) return value / 1000000 + "M";
              if (value > 1000) return value / 1000 + "K";
              return value;
            },
          },
        },
      ],
    },
  };
  return <Bar data={data} options={options} />;
};

export default DailyTrendChart;
