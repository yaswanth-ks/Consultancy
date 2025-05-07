import React from 'react';

export default function CartTotals({ value, onProceedCheckout }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <div className="container">
      <div className="row">
        <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
          {/* Clear Cart Button */}
          <button
            className="btn btn-outline-danger text-uppercase mb-3 px-5"
            type="button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          {/* Cart Totals */}
          <h5>
            <span className="text-title">Subtotal:</span>
            <strong> ₹{cartSubTotal} </strong>
          </h5>
          <h5>
            <span className="text-title">Tax:</span>
            <strong> ₹{cartTax} </strong>
          </h5>
          <h5>
            <span className="text-title">Total:</span>
            <strong> ₹{cartTotal} </strong>
          </h5>

          {/* Proceed to Checkout */}
          <button
            className="btn btn-outline-success text-uppercase mt-4"
            type="button"
            onClick={onProceedCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
