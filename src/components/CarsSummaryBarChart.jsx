import React from "react";
import { Bar } from "react-chartjs-2";

const CarsSummaryBarChart = ({ title, groupedData, models }) => {
  const brands = Object.keys(groupedData);

  // Generate an array of unique colors
  const generateUniqueColors = (length) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      const color = `hsl(${(i * 360) / length}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  };

  // Generate unique colors for all models
  const modelColors = generateUniqueColors(models.length);

  // Prepare datasets with unique colors for each model
  const datasets = models.map((model, modelIndex) => {
    const modelData = brands.map((brand) => {
      return groupedData[brand][model]?.quantity || 0;
    });

    return {
      label: model,
      data: modelData,
      backgroundColor: modelColors[modelIndex],
    };
  });

  const data = {
    labels: brands,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CarsSummaryBarChart;
