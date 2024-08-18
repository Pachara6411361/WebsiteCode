import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const CarsSummaryTable = ({
  title = "This is Table Title",
  groupedData = {},
}) => {
  const formattedNumber = (number) =>
    number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Total Value (Baht)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((brand, index) => (
            <React.Fragment key={index}>
              {Object.keys(groupedData[brand]).map((model, modelIndex) => (
                <tr key={modelIndex}>
                  <td>{brand}</td>
                  <td>{model}</td>
                  <td>{groupedData[brand][model].quantity}</td>
                  <td>
                    {formattedNumber(groupedData[brand][model].totalValue)}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CarsSummaryTable;
