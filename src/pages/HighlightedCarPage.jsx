import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import carsData from "../data/cars.json";

const HighlightedCarPage = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(savedCars);
  }, []);

  const handleHighlight = (car) => {
    if (
      !highlightedCars.some(
        (c) => c.brand === car.brand && c.model === car.model
      )
    ) {
      const newHighlightedCars = [...highlightedCars, car];
      setHighlightedCars(newHighlightedCars);
      localStorage.setItem(
        "highlightedCars",
        JSON.stringify(newHighlightedCars)
      );
    }
  };

  const handleRemoveHighlight = (car) => {
    const newHighlightedCars = highlightedCars.filter(
      (c) => c.brand !== car.brand || c.model !== car.model
    );
    setHighlightedCars(newHighlightedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(newHighlightedCars));
  };

  return (
    <Container>
      <h2>Highlighted Cars</h2>
      <ListGroup>
        {highlightedCars.map((car, index) => (
          <ListGroup.Item key={`${car.brand}-${car.model}`}>
            {car.brand} {car.model} - {car.quantity} units
            <Button
              variant="danger"
              onClick={() => handleRemoveHighlight(car)}
              className="float-right"
            >
              Remove
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <h3>All Cars</h3>
      <ListGroup>
        {carsData.map((car, index) => (
          <ListGroup.Item key={`${car.brand}-${car.model}`}>
            {car.brand} {car.model} - {car.quantity} units
            <Button
              variant="primary"
              onClick={() => handleHighlight(car)}
              className="float-right"
            >
              Highlight
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Button to navigate back to the Dashboard */}
      <Link to="/">
        <Button variant="secondary" className="mt-3">
          Return to Dashboard
        </Button>
      </Link>
    </Container>
  );
};

export default HighlightedCarPage;
