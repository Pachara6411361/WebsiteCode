import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Bar } from "react-chartjs-2";
import Alert from "react-bootstrap/Alert";

const barChartOptions = {
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      beginAtZero: true,
    },
  },
};

const CarsSummaryBarChart = ({
  title = "This is Bar Chart Title",
  groupedData = {},
  models = [],
}) => {
  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: Object.keys(groupedData),
      datasets: models.map((model, index) => ({
        label: model,
        data: Object.keys(groupedData).map((brand) =>
          groupedData[brand][model] ? groupedData[brand][model].quantity : 0
        ),
        backgroundColor: `rgba(${index * 50}, 99, 132, 0.5)`,
        borderColor: `rgba(${index * 50}, 99, 132, 1)`,
        borderWidth: 1,
      })),
    };
    setBarChartData(data);
  }, [groupedData]);

  if (Object.keys(groupedData).length === 0) {
    return (
      <Container>
        <h2>{title}</h2>
        <Alert variant="warning">No cars available to display.</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2>{title}</h2>
      <Bar data={barChartData} options={barChartOptions} />
    </Container>
  );
};

export default CarsSummaryBarChart;
