import React from "react";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/core/styles";

const CumulativeChart = ({ timeline }) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: "Confirmed",
        borderColor: theme.palette.secondary.main,
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        data: timeline.map((o) => {
          return { x: new Date(o.date), y: o.confirmed };
        }),
      },
      {
        label: "Active",
        borderColor: theme.palette.warning.main,
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        data: timeline.map((o) => {
          return { x: new Date(o.date), y: o.active };
        }),
      },
      {
        label: "Recovered",
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        data: timeline.map((o) => {
          return { x: new Date(o.date), y: o.recovered };
        }),
      },
      {
        label: "Fatal",
        borderColor: theme.palette.grey[800],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        data: timeline.map((o) => {
          return { x: new Date(o.date), y: o.deaths };
        }),
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
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
  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default CumulativeChart;
