import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

export default function CartTotals({ value, handleCheckout }) {
    const { cartSubTotal, cartTax, cartTotal, clearCart } = value;
    const navigate = useNavigate();  // Initialize navigate hook

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        {/* Clear Cart Button */}
                        <button
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button"
                            onClick={() => {
                                clearCart();
                            }}
                        >
                            Clear Cart
                        </button>

                        {/* Display Cart Subtotal, Tax, and Total */}
                        <h5>
                            <span className="text-title">Subtotal:</span>
                            <strong>{cartSubTotal}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">Tax:</span>
                            <strong>{cartTax}</strong>
                        </h5>
                        <h5>
                            <span className="text-title">Total:</span>
                            <strong>{cartTotal}</strong>
                        </h5>

                        {/* Proceed to Checkout Button */}
                        <button
                            className="btn btn-outline-success text-uppercase mt-4"
                            type="button"
                            onClick={() => {
                                // Handle checkout logic and navigate to payment page
                                navigate('/payment');  // Use navigate instead of history.push
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
