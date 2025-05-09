// src/LineChart.js
import React from 'react';

const LineChart = ({ data }) => {
  const width = 100; // Chart width
  const height = 40; // Chart height
  const padding = 5; // Padding for the chart

  // Ensure we have valid data, or set default values
  const prices = data?.slice(0, 7) || [1, 1, 1, 1, 1, 1, 1];

  const max = Math.max(...prices); // Maximum value of the prices
  const min = Math.min(...prices); // Minimum value of the prices

  // Scaling factors for the X and Y axis
  const scaleX = (width - padding * 2) / (prices.length - 1);
  const scaleY = (height - padding * 2) / (max - min || 1);

  // Calculate the points for the polyline to create the line chart
  const points = prices
    .map((price, index) => {
      const x = index * scaleX + padding;
      const y = height - padding - (price - min) * scaleY;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height}>
      <polyline
        fill="none"
        stroke="#00b894" // Line color (greenish)
        strokeWidth="2"
        points={points} // Polyline points generated by price data
      />
    </svg>
  );
};

export default LineChart;
