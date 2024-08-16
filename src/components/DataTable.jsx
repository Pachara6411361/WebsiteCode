import React, { useContext, useEffect } from "react";  // <-- Import useContext and useEffect
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { TotalPriceContext } from "../context";

const DataTable = ({ data, onDelete, onFilter, onSort }) => {
    const sRef = React.useRef();
    const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);

    useEffect(() => {
        // Calculate the total price whenever the data changes
        const newTotalPrice = data.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [data, setTotalPrice]);

    const handleSearch = () => {
        const keyword = sRef.current.value;
        console.debug("Search", keyword);
        onFilter(keyword);
    };

    const handleDelete = (index) => {
        console.debug("Delete", index);
        onDelete(index);
    };

    const handleSort = (order) => {
        console.debug("Sort", order);
        onSort(order);
    };

    return (
        <Container>
            <input type="text" placeholder="Search..." ref={sRef} />{' '}
            <Button onClick={handleSearch}>Search</Button>
            <Button onClick={() => handleSort('asc')}>Sort Ascending</Button>{' '}
            <Button onClick={() => handleSort('desc')}>Sort Descending</Button>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <i className="bi bi-trash" onClick={() => handleDelete(index)}></i>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default DataTable;
