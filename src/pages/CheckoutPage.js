import React, { useState, useEffect } from 'react';
import '../styles/CheckoutPage.css'; 


export default function CheckoutPage() {
  const [isLoggedIn] = useState(true);
  const [user] = useState({ name: "Satheesh", email: "satheesh@gmail.com" });
  const [cart] = useState([
    { id: 1, name: "LED High Bay Light ", price: 150, quantity: 1 },
    { id: 2, name: "LED Street Light", price: 120, quantity: 1 },
    { id: 3, name: "LED Flood Light", price: 95, quantity: 1 },
  ]);
  const [showCart, setShowCart] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("12 Ranganathan Street, T. Nagar, Chennai");
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [codSelected, setCodSelected] = useState(false);

  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [upiError, setUpiError] = useState('');
  const [cardError, setCardError] = useState('');
  const [cvvError, setCvvError] = useState('');

  const defaultAddresses = [
    "12 Ranganathan Street, T. Nagar, Chennai",
    "55 Eldams Road, Alwarpet, Chennai",
    "89 OMR Road, Sholinganallur, Chennai"
  ];

  const loginComplete = Boolean(user);
  const deliveryComplete = Boolean(selectedAddress);
  const summaryComplete = cart.length > 0;

  useEffect(() => {
    if (
      (paymentMethod === 'upi' && upiId && !upiError) ||
      (paymentMethod === 'card' && cardNumber && cvv && !cardError && !cvvError) ||
      (paymentMethod === 'cod' && selectedAddress)
    ) {
      setPaymentComplete(true);
    } else {
      setPaymentComplete(false);
    }
  }, [selectedAddress, paymentMethod, upiId, cardNumber, cvv, expiryDate, upiError, cardError, cvvError]);

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleConfirmOrder = () => {
    if (!paymentComplete) {
      alert("Please complete payment section properly.");
      return;
    }

    setOrderPlaced(true); // Show the success message after order is placed
    setTimeout(() => {
      setOrderPlaced(false); // Hide success message after 5 seconds
    }, 1000);
  };

  const handleUpiChange = (e) => {
    const value = e.target.value;
    setUpiId(value);

    // UPI validation: Should be in the form of username@okaxis, username@oksbi, etc.
    const validUpiDomains = ['@okaxis', '@oksbi', '@ybl', '@paytm', '@ibl'];
const upiPattern = /^[a-zA-Z0-9_.+-]+(@okaxis|@oksbi|@ybl|@paytm|@ibl)$/;

if (!upiPattern.test(value)) {
  setUpiError('UPI must be in format username@bank (okaxis, oksbi, ybl, paytm, ibl only)');
} else {
  setUpiError('');
}

  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    setCardNumber(value);
    if (value.length !== 16) {
      setCardError('Card number must be 16 digits');
    } else {
      setCardError('');
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    setCvv(value);
    if (value.length !== 3) {
      setCvvError('CVV must be 3 digits');
    } else {
      setCvvError('');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      {/* 1. Login */}
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>1. Login</span>
          {loginComplete && <span style={{ color: 'green' }}>✅</span>}
        </div>
        <div className="card-body">
          <p>You're logged in as <strong>{user.name}</strong>.</p>
          <p>{user.email}</p>
        </div>
      </div>

      {/* 2. Delivery Address */}
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>2. Delivery Address</span>
          {deliveryComplete && <span style={{ color: 'green' }}>✅</span>}
        </div>
        <div className="card-body">
          <label>Select an address:</label>
          <select
            className="form-control"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <option value="">-- Select --</option>
            {defaultAddresses.map((address, index) => (
              <option key={index} value={address}>{address}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Order Summary */}
<div className="card mb-3">
  <div
    className="card-header d-flex justify-content-between align-items-center"
    onClick={() => setShowCart(!showCart)}
    style={{ cursor: 'pointer' }}
  >
    <span>3. Order Summary {showCart ? '▲' : '▼'}</span>
    {summaryComplete && <span style={{ color: 'green' }}>✅</span>}
  </div>

  {showCart && (
    <div className="card-body">
      <h5>Items in Cart:</h5>
      {cart.map((item) => (
        <div key={item.id} className="mb-2">
          <strong>{item.name}</strong><br />
          Price: ${item.price}<br />
          Item total: ${item.price * item.quantity}
        </div>
      ))}
      <hr />
      <h6>Subtotal: ${calculateCartTotal().toFixed(2)}</h6>
      <h6>Tax (10%): ${(calculateCartTotal() * 0.1).toFixed(2)}</h6>
      <h5>Total: ${(calculateCartTotal() * 1.1).toFixed(2)}</h5>
    </div>
  )}
</div>


      {/* 4. Payment */}
      <div className="card mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>4. Payment</span>
          {paymentComplete && <span style={{ color: 'green' }}>✅</span>}
        </div>
        <div className="card-body">
          <div className="mb-3 d-flex flex-wrap gap-3">
            <button className="btn btn-success" onClick={() => setPaymentMethod('upi')}>Pay with UPI</button>
            <button className="btn btn-info" onClick={() => setPaymentMethod('card')}>Pay with Card</button>
            <button className="btn btn-warning" onClick={() => setPaymentMethod('cod')}>Cash on Delivery</button>
          </div>

          {/* UPI */}
          {paymentMethod === 'upi' && (
            <div className="row align-items-center">
              <div className="col-md-4">
                <img src="/path-to-qr-code.png" alt="QR Code" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={handleUpiChange}
                />
                {upiError && <div className="text-danger">{upiError}</div>}
              </div>
              <div className="col-md-2">
                <button className="btn btn-outline-success mt-2" onClick={() => alert("UPI ID Saved!")}>
                  Done
                </button>
              </div>
            </div>
          )}

          {/* Card */}
          {paymentMethod === 'card' && (
            <div className="row">
              <div className="col-md-6 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Card Number"
                  value={cardNumber}
                  maxLength="16"
                  onChange={handleCardNumberChange}
                />
                {cardError && <div className="text-danger">{cardError}</div>}
              </div>
              <div className="col-md-3 mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="CVV"
                  value={cvv}
                  maxLength="3"
                  onChange={handleCvvChange}
                />
                {cvvError && <div className="text-danger">{cvvError}</div>}
              </div>
              <div className="col-md-3 mb-2 d-flex gap-2">
                <select
                  className="form-control"
                  value={expiryDate.split('/')[0]}
                  onChange={(e) =>
                    setExpiryDate(`${e.target.value}/${expiryDate.split('/')[1] || ''}`)
                  }
                >
                  <option value="">MM</option>
                  {[...Array(12).keys()].map((m) => (
                    <option key={m + 1} value={(m + 1).toString().padStart(2, '0')}>
                      {(m + 1).toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control"
                  value={expiryDate.split('/')[1]}
                  onChange={(e) =>
                    setExpiryDate(`${expiryDate.split('/')[0] || ''}/${e.target.value}`)
                  }
                >
                  <option value="">YY</option>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(
                    (year) => (
                      <option key={year} value={year.toString().slice(2)}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          )}

          {/* COD */}
          {paymentMethod === 'cod' && (
            <div>
              <div className="form-check">
                <input
                  type="radio"
                  id="cod-address"
                  className="form-check-input"
                  checked={codSelected}
                  onChange={() => setCodSelected(true)}
                />
                <label className="form-check-label" htmlFor="cod-address">
                  Pay on Delivery (COD)
                </label>
              </div>
              <p><strong>Selected Address:</strong> {selectedAddress}</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Button */}
      <div className="card mb-3">
        <div className="card-body text-center">
          <button className="btn btn-primary" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>

      {orderPlaced && (
  <div className="overlay">
    <div className="success-card">
      <div className="tick-animation">✔️</div>
      <h2>Congratulations!</h2>
      <p>Your order has been placed successfully.</p>
    </div>
  </div>
)}
    </div>
  );
}

