import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Pie } from "react-chartjs-2";
import Alert from "react-bootstrap/Alert";

const CarsSummaryPieChart = ({
  title = "This is Pie Chart Title",
  groupedData = {},
}) => {
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    const data = {
      labels: Object.keys(groupedData),
      datasets: [
        {
          data: Object.values(groupedData).map((brand) =>
            Object.values(brand).reduce((acc, model) => acc + model.quantity, 0)
          ),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    };
    setPieChartData(data);
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
      <Pie data={pieChartData} />
    </Container>
  );
};

export default CarsSummaryPieChart;
