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
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const DashboardPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(carsData); // Set the car data from JSON file
    }, []);

    // Group cars by brand and model
    const groupedData = data.reduce((acc, car) => {
        if (!acc[car.brand]) {
            acc[car.brand] = {};
        }
        if (!acc[car.brand][car.model]) {
            acc[car.brand][car.model] = {
                quantity: 0,
                totalValue: 0,
            };
        }
        acc[car.brand][car.model].quantity += car.quantity;
        acc[car.brand][car.model].totalValue += car.quantity * car.price;
        return acc;
    }, {});

    // Pie chart data for car brands
    const pieChartData = {
        labels: Object.keys(groupedData),
        datasets: [
            {
                data: Object.values(groupedData).map(brand =>
                    Object.values(brand).reduce((acc, model) => acc + model.quantity, 0)
                ),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    // Prepare the bar chart data for stacked chart
    const models = Array.from(
        new Set(
            data.map(car => car.model)
        )
    );

    const barChartData = {
        labels: Object.keys(groupedData),
        datasets: models.map((model, index) => ({
            label: model,
            data: Object.keys(groupedData).map(brand =>
                groupedData[brand][model] ? groupedData[brand][model].quantity : 0
            ),
            backgroundColor: `rgba(${index * 50}, 99, 132, 0.5)`,
            borderColor: `rgba(${index * 50}, 99, 132, 1)`,
            borderWidth: 1,
        })),
    };

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
