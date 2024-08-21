import React, { useState, useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import carsData from "../data/taladrod-cars.json";


const HighlightedCarPage = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("highlightedCars")) || [];
    setHighlightedCars(savedCars);
  }, []);

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
            <img src={car.Img100} alt={car.Model} style={{ marginRight: "10px" }} />
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
        {carsData.map((car) => (
          <ListGroup.Item key={car.Cid}>
            <img src={car.Img100} alt={car.Model} style={{ marginRight: "10px" }} />
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
