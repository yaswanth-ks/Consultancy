import React from 'react';

const PaymentPage = () => {
    return (
        <div className="container">
            <h2>Payment Options</h2>
            <div className="payment-methods">
                <div className="payment-option">
                    <h4>Credit/Debit Card</h4>
                    <form>
                        {/* Add your credit card payment integration here */}
                        <input type="text" placeholder="Card Number" />
                        <input type="text" placeholder="Cardholder Name" />
                        <input type="text" placeholder="Expiry Date" />
                        <input type="text" placeholder="CVV" />
                        <button type="submit" className="btn btn-primary">Pay with Card</button>
                    </form>
                </div>

                <div className="payment-option">
                    <h4>UPI</h4>
                    {/* Implement UPI payment integration */}
                    <input type="text" placeholder="Enter UPI ID" />
                    <button className="btn btn-primary">Pay with UPI</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
