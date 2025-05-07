import React from 'react';

const Orders = () => {
    // Example of orders data, this could be fetched from a backend
    const orders = [
        { id: 1, date: '2025-04-25', total: '$100', status: 'Delivered' },
        { id: 2, date: '2025-04-20', total: '$50', status: 'Processing' },
    ];

    return (
        <div className="container">
            <h2>Your Previous Orders</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;
