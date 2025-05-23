import React from 'react';

export default function CartTotals({ value, onProceedCheckout }) {
  const { clearCart } = value;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-right">
          <div className="d-inline-flex">
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5 py-2 mr-3"
              type="button"
              onClick={clearCart}
            >
              Clear Inquiry List
            </button>

            <button
              className="btn btn-outline-primary text-uppercase mb-3 px-5 py-2"
              type="button"
              onClick={onProceedCheckout}
            >
              Send Inquiry to Manufacturer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
