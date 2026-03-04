// Import React + Chart.js essentials
import React from "react";
import {
  Chart as ChartJS,          // The main ChartJS object
  CategoryScale,            // X-axis scale for categories (days)
  LinearScale,              // Y-axis numeric scale
  PointElement,             // Points for line chart
  LineElement,              // The line itself
  Tooltip,                  // Hover tooltips
  Legend,                   // Chart legend
  BarElement
} from "chart.js";

import { Bar, Line, Pie } from "react-chartjs-2"; // React wrapper for Line chart

// Register the components with Chart.js (required in v4)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  BarElement
);

// Main chart component
const MessagesChart = ({ data, type, label }) => {
  // 1️⃣ Prepare chart data
  const chartData = {
    // X-axis labels
    labels: data.map((item) => item.day), 
    // Datasets array (can have multiple lines)
    datasets: [
      {
        label: label,                     // Line label in legend
        data: data.map((item) => item.count),  // Y-axis values
        borderColor: "#c31100",                // Line color
        backgroundColor: "rgba(206, 78, 27, 0.3)", // Fill under line (fake 3D effect)
        tension: 0.4,                          // Smooth curves (0 = straight lines)
        fill: true,                             // Fill under the line
        pointRadius: 5,                         // Size of points on the line
        pointBackgroundColor: "#ce4e1b",       // Point color
        pointHoverRadius: 7,                    // Size on hover
      },
    ],
  };

  // 2️⃣ Chart options
  const options = {
    responsive: true,           // Chart adapts to container
    maintainAspectRatio: false, // So it fills the div height
    plugins: {
      legend: {
        display: true,          // Show legend
        position: "top" as const,
      },
      tooltip: {
        enabled: true,          // Enable tooltips
        mode: "index" as const,           // Show all points at same X on hover
      },
    },
    scales: {
      y: {
        beginAtZero: true,      // Always start Y-axis from 0
        ticks: {
          stepSize: 20,         // Optional: control step increment
        },
      },
      x: {
        grid: {
          display: false,       // Optional: hide vertical grid lines
        },
      },
    },
  };

  // 3️⃣ Render chart inside a fixed-height container
  return (
    <>
    <div style={{ height: "300px", width: "100%" }}>
      {type === "bar" ? <Bar data={chartData} options={options} /> : type === "line" && <Line data={chartData} options={options} />}
    </div>
    </>
  );
};

export default MessagesChart;