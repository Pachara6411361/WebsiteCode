import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import carsData from '../components/cars.json';
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

            <h3>Car Summary by Brand and Model</h3>
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
                                    <td>{groupedData[brand][model].totalValue}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>

            <h3>Car Distribution by Brand</h3>
            <Pie data={pieChartData} />

            <h3>Car Models by Brand</h3>
            <Bar data={barChartData} options={barChartOptions} />
        </Container>
    );
};

export default DashboardPage;
