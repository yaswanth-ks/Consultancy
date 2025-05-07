import React, { useState } from 'react';

export default function CheckoutPage() {
  const [isLoggedIn] = useState(true); // Replace with real auth logic
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      {/* 1. Login Section */}
      <div className="card mb-3">
        <div className="card-header">1. Login</div>
        <div className="card-body">
          {isLoggedIn ? (
            <p>You're logged in as <strong>John Doe</strong>.</p>
          ) : (
            <button className="btn btn-primary">Login to continue</button>
          )}
        </div>
      </div>

      {/* 2. Delivery Address */}
      <div className="card mb-3">
        <div className="card-header">2. Delivery Address</div>
        <div className="card-body">
          <p>123, MG Road, Bangalore, 560001</p>
          <button className="btn btn-secondary">Change Address</button>
        </div>
      </div>

      {/* 3. Order Summary */}
      <div className="card mb-3">
        <div className="card-header" onClick={() => setShowCart(!showCart)} style={{ cursor: 'pointer' }}>
          3. Order Summary {showCart ? '▲' : '▼'}
        </div>
        {showCart && (
          <div className="card-body">
            {/* Replace with cart items from context/state */}
            <ul>
              <li>Product 1 - ₹100</li>
              <li>Product 2 - ₹200</li>
              <li>Product 3 - ₹150</li>
              <li><strong>Total: ₹450</strong></li>
            </ul>
          </div>
        )}
      </div>

      {/* 4. Payment Options */}
      <div className="card mb-3">
        <div className="card-header">4. Payment</div>
        <div className="card-body">
          <button className="btn btn-success">Pay with UPI</button>{' '}
          <button className="btn btn-info">Pay with Card</button>{' '}
          <button className="btn btn-warning">Cash on Delivery</button>
        </div>
      </div>
    </div>
  );
}
