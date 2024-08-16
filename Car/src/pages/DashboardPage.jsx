import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Pie, Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom'; // Import Link for navigation
import carsData from '../components/cars.json';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DashboardPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(carsData);  // Set the car data from JSON file
    }, []);

    // Group cars by brand and model
    const groupedData = data.reduce((acc, car) => {
        if (!acc[car.brand]) {
            acc[car.brand] = {
                totalQuantity: 0,
                totalValue: 0,
                models: []
            };
        }
        acc[car.brand].totalQuantity += car.quantity;
        acc[car.brand].totalValue += car.quantity * car.price;
        acc[car.brand].models.push(car);
        return acc;
    }, {});

    // Pie chart data for car brands
    const pieChartData = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                data: Object.values(groupedData).map(brand => brand.totalQuantity),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
        ]
    };

    // Bar chart data for car models by brand
    const barChartData = {
        labels: Object.keys(groupedData),
        datasets: Object.keys(groupedData).map((brand, index) => ({
            label: brand,
            data: groupedData[brand].models.map(model => model.quantity),
            backgroundColor: `rgba(75,192,192,${0.2 + index * 0.2})`,
            borderColor: `rgba(75,192,192,${1})`,
            borderWidth: 1
        }))
    };

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
                            {groupedData[brand].models.map((model, modelIndex) => (
                                <tr key={modelIndex}>
                                    <td>{brand}</td>
                                    <td>{model.model}</td>
                                    <td>{model.quantity}</td>
                                    <td>{model.quantity * model.price}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>

            <h3>Car Distribution by Brand</h3>
            <Pie data={pieChartData} />

            <h3>Car Models by Brand</h3>
            <Bar data={barChartData} />

            {/* Button to navigate to the Highlighted Car Page */}
            <Link to="/highlighted-cars">
                <button className="btn btn-primary mt-3">Go to Highlighted Cars</button>
            </Link>
        </Container>
    );
};

export default DashboardPage;
