import React from "react";
import { Line } from "react-chartjs-2";

const colors = [
  "#3366cc",
  "#dc3912",
  "#ff9900",
  "#109618",
  "#990099",
  "#0099c6",
  "#dd4477",
  "#66aa00",
  "#b82e2e",
  "#316395",
  "#994499",
  "#22aa99",
  "#aaaa11",
  "#6633cc",
  "#e67300",
  "#8b0707",
  "#651067",
  "#329262",
  "#5574a6",
  "#3b3eac",
  "#b77322",
  "#16d620",
  "#b91383",
  "#f4359e",
  "#9c5935",
  "#a9c413",
  "#2a778d",
  "#668d1c",
  "#bea413",
  "#0c5922",
  "#743411",
];

const CompareCountryChart = ({ countries, dimension }) => {
  const data = {
    datasets: countries.map((country, index) => {
      return {
        label: country.name,
        borderColor: colors[index % colors.length],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        data: country.timeline.map((o) => {
          return { x: new Date(o.date), y: o[dimension] };
        }),
      };
    }),
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
  return <Line data={data} options={options} />;
};

export default CompareCountryChart;
