import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import carsRawData from "../data/taladrod-cars.json";
import CarsSummaryTable from "../components/CarsSummaryTable";
import CarsSummaryPieChart from "../components/CarsSummaryPieChart";
import CarsSummaryBarChart from "../components/CarsSummaryBarChart";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const DashboardPage = () => {
  const [cars, setCars] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    setCars(prepareCarsData(carsRawData)); // Set the car data from JSON file
  }, []);

  const prepareCarsData = (carsData) => {
    const cars = [...carsData.Cars];
    const brands = [...carsData.MMList];

    cars.map((car) => {
      car["Brand"] = getCarBrandBybrandID(brands, car.MkID);

      return car;
    });

    return cars;
  };

  const getCarBrandBybrandID = (brands, brandID) => {
    const brand = brands.find((brand) => brand.mkID === brandID);

    return brand !== undefined ? brand.Name : "N/A";
  };

  useEffect(() => {
    const groupData = () => {
      const data = cars.reduce((acc, car) => {
        if (!acc[car.Brand]) {
          acc[car.Brand] = {};
        }

        if (!acc[car.Brand][car.Model]) {
          acc[car.Brand][car.Model] = {
            quantity: 0,
            totalValue: 0,
          };
        }

        acc[car.Brand][car.Model].quantity += 1;
        acc[car.Brand][car.Model].totalValue += Number(
          car.Prc.replace(/[^0-9.]/g, "")
        );

        return acc;
      }, {});
      setGroupedData(data);
    };

    groupData();
  }, [cars]);

  // Prepare the bar chart data for stacked chart
  const models = Array.from(new Set(cars.map((car) => car.Model)));

  return (
    <Container>
      <h2>Dashboard</h2>

      <CarsSummaryTable
        title={"Car Summary by Brand and Model"}
        groupedData={groupedData}
      />

      <CarsSummaryPieChart
        title={"Car Distribution by Brand"}
        groupedData={groupedData}
      />

      <CarsSummaryBarChart
        title={"Car Models by Brand"}
        groupedData={groupedData}
        models={models}
      />
    </Container>
  );
};

export default DashboardPage;
