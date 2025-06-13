import React from 'react';
import './PaymentPage.css'; // Import CSS file
import { useNavigate } from 'react-router';


function PaymentPage() {
  const navigate = useNavigate();
  const handlePayment = (method) => {
    alert(`Payment successful via ${method}`);
    navigate('/');
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Choose Your Payment Method</h1>
      <div className="payment-buttons">
        <button className="payment-button" onClick={() => handlePayment('GPay')}>
          Pay with GPay
        </button>
        <button className="payment-button" onClick={() => handlePayment('Debit Card')}>
          Pay with Debit Card
        </button>
        <button className="payment-button" onClick={() => handlePayment('Credit Card')}>
          Pay with Credit Card
        </button>
        <button className="payment-button" onClick={() => handlePayment('Paytm')}>
          Pay with Paytm
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
