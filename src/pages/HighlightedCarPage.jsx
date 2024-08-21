import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import carsData from "../data/taladrod-cars.json"; // Import your car data

const HighlightedCarPage = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  // Load highlighted cars from local storage on component mount
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(savedCars);
  }, []);

  // Function to handle adding a car to the highlighted list
  const handleHighlight = (car) => {
    if (!highlightedCars.some((c) => c.Cid === car.Cid)) {
      const newHighlightedCars = [...highlightedCars, car];
      setHighlightedCars(newHighlightedCars);
      localStorage.setItem(
        "highlightedCars",
        JSON.stringify(newHighlightedCars)
      );
    }
  };

  // Function to handle removing a car from the highlighted list
  const handleRemoveHighlight = (car) => {
    const newHighlightedCars = highlightedCars.filter((c) => c.Cid !== car.Cid);
    setHighlightedCars(newHighlightedCars);
    localStorage.setItem("highlightedCars", JSON.stringify(newHighlightedCars));
  };

  return (
    <Container>
      <h2>Highlighted Cars</h2>
      <ListGroup>
        {highlightedCars.map((car) => (
          <ListGroup.Item key={car.Cid}>
            <img
              src={car.Img100}
              alt={car.Model}
              style={{ marginRight: "10px", width: "50px", height: "50px" }}
            />
            {car.NameMMT} - {car.Province} - {car.Prc}
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
        {carsData.Cars.map((car) => (
          <ListGroup.Item key={car.Cid}>
            <img
              src={car.Img100}
              alt={car.Model}
              style={{ marginRight: "10px", width: "50px", height: "50px" }}
            />
            {car.NameMMT} - {car.Province} - {car.Prc}
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
