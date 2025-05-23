import React from 'react';

const Orders = () => {
  // Example orders with relevant statuses for street light projects
  const orders = [
    { id: 1, date: '2025-04-25', total: '$1000', status: 'Installation Complete', location: 'Downtown Blvd', technician: 'John Doe' },
    { id: 2, date: '2025-04-20', total: '$500', status: 'Under Maintenance', location: '5th Avenue', technician: 'Jane Smith' },
  ];

  // Status colors for better visual distinction
  const statusColors = {
    'Installation Complete': '#4CAF50', // green
    'Under Maintenance': '#FF9800',    // orange
    'Pending': '#2196F3',               // blue
    'Cancelled': '#F44336'              // red
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Street Light Work Orders</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '1.5rem',
              backgroundColor: '#fafafa',
              boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              alignItems: 'center'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.5rem', color: '#222' }}>Work Order #{order.id}</h3>
              <p style={{ margin: '0.2rem 0' }}><strong>Date:</strong> {order.date}</p>
              <p style={{ margin: '0.2rem 0' }}><strong>Location:</strong> {order.location}</p>
              <p style={{ margin: '0.2rem 0' }}><strong>Technician:</strong> {order.technician}</p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: statusColors[order.status] || '#000' }}>
                {order.status}
              </p>
              <p style={{ margin: '0.2rem 0', fontStyle: 'italic', color: '#666' }}>Cost: {order.total}</p>
              {/* Optionally add a progress bar or icon here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
