import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 text-center">
      <h2 className="text-danger">Payment Cancelled</h2>
      <p>Your payment was not completed. If this was a mistake, you can try again.</p>
      <button className="btn btn-outline-secondary mt-3" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}
