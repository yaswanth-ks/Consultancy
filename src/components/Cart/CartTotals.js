import React from 'react';

export default function CartTotals({ value, onProceedCheckout }) {
  const { clearCart } = value;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-right">
          {/* Button container for alignment */}
          <div className="d-inline-flex">
            {/* Clear Cart Button */}
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5 py-2 mr-3"
              type="button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            {/* Proceed to Checkout Button */}
            <button
              className="btn btn-outline-success text-uppercase mb-3 px-5 py-2"
              type="button"
              onClick={onProceedCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
