import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    const handleConfirm = async () => {
        try {
        await axios.post(
            'http://dcare.runasp.net/api/Payments/confirm',
            { sessionId },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );

        Swal.fire('Confirmed!', 'Your booking has been confirmed.', 'success');
        navigate('/myAppointments'); 
        } catch (err) {
        console.error('Confirmation error:', err);
        Swal.fire('Error', 'Could not confirm your booking. Please try again.', 'error');
        }
    };

    return (
        <div className="container py-5 text-center">
        <h2 className="text-success">Payment Successful</h2>
        <p>Your payment was processed successfully. Please confirm your booking.</p>
        <button className="btn btn-outline-primary mt-3" onClick={handleConfirm}>
            Confirm Booking
        </button>
        </div>
    );
}
