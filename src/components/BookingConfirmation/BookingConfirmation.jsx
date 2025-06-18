import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaRegClock } from 'react-icons/fa';
import Swal from 'sweetalert2';
// import axios from 'axios'; // Uncomment this line if you use axios for the backend call

export default function BookingConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, doctorInfo } = location.state || {};

    const [showPaymentOptions, setShowPaymentOptions] = useState(false);

    // Handle cases where direct navigation without data occurs
    if (!formData || !doctorInfo) {
        return (
        <div className="container py-5 text-center">
            <h2>No booking details found. Please go back and try again.</h2>
            <Button variant="primary" onClick={() => navigate('/')}>Go to Home</Button>
        </div>
        );
    }

    const handleConfirmBooking = () => {
        // When the user clicks "Confirm Booking", we just show the payment options.
        // No backend API call is made at this stage.
        setShowPaymentOptions(true);
    };
    const handleCancelBooking = () => {
        Swal.fire({
            title: "Are you sure you want to cancel this booking?",
            text: "", 
            icon: "warning", 
            showCancelButton: true,
            confirmButtonColor: "#3085d6", 
            cancelButtonColor: "#d33", 
            confirmButtonText: "Yes, cancel it!", 
            cancelButtonText: "No, keep it" 
        }).then((result) => {
            if (result.isConfirmed) {
            navigate(`/doctor/${doctorInfo.id.id}`); 

            Swal.fire(
                'Cancelled!',
                'Your booking has been cancelled.',
                'success'
            );
            } else {
            console.log('User decided not to cancel the booking.');
            }
        });
};
    const handlePaymentMethodSelection = async (method) => { // Made async for potential axios call
        alert(`Payment via ${method} selected! Now sending booking data to backend.`);

        // ** PLACE YOUR BACKEND API CALL HERE **
        // Example using axios:
        /*
        try {
        const response = await axios.post('/api/bookings', {
            date: formData.date,
            time: formData.time,
            patientName: formData.patientName,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            doctorId: doctorInfo.id.id, // Ensure this is the correct doctor ID for your backend
            doctorName: ${doctorInfo.first_name} ${doctorInfo.last_name},
            paymentMethod: method, // Add the selected payment method
            status: 'Confirmed' // Or 'Paid' depending on your backend logic
        });
        console.log('Booking successfully created:', response.data);
        navigate('/booking-success'); // Navigate to success page after successful submission
        } catch (error) {
        console.error('Error creating booking:', error);
        alert('Failed to book appointment. Please try again.');
        // You might want to navigate back or show an error message
        }
        */
        // *********

        // For now, since we're not making an actual backend call, we'll just navigate:
        navigate('/booking-success');
    };

    return (
        <div className="container py-5">
        <h3 className="mb-4 text-center" style={{color:'var(--first-color)'}}>Confirm Your Appointment</h3>
        <Card className="shadow-sm p-4">
            <Card.Body>
            {/* Doctor Details */}
            <h5 className="mb-3" style={{color:'var(--first-color)'}}>Doctor Details:</h5>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <span className='fw-bolder'>Doctor: </span> Dr. {doctorInfo.first_name} {doctorInfo.last_name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className='fw-bolder'>Specialization: </span> {doctorInfo.specialization}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className='fw-bolder'>Fees: </span> <span className='text-success fw-bolder '>{doctorInfo.fees}</span>
                </ListGroup.Item>
            </ListGroup>
            {/* Patient's Booking Details */}
            <h5 className="mt-4 mb-3" style={{color:'var(--first-color)'}}>Your Booking Details:</h5>
            <ListGroup variant="flush">
                <ListGroup.Item className='d-flex align-items-center'>
                    <FaCalendarAlt className='me-2' style={{color:'var(--first-color)'}}/> <span className='fw-bolder'>Date: </span> {formData.date}
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                    <FaRegClock className='me-2' style={{color:'var(--first-color)'}}/> <span className='fw-bolder'>Time: </span> {formData.time}
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                    <FaUser className='me-2' style={{color:'var(--first-color)'}}/> <span className='fw-bolder'>Patient Name: </span> {formData.patientName}
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                    <FaPhone className='me-2' style={{color:'var(--first-color)'}}/> <span className='fw-bolder'>Phone Number: </span> {formData.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item className='d-flex align-items-center'>
                    <FaEnvelope className='me-2' style={{color:'var(--first-color)'}}/> <span className='fw-bolder'>Email: </span> {formData.email || 'N/A'}
                </ListGroup.Item>
            </ListGroup>

            {/* Conditional rendering for Confirm/Cancel vs. Payment Options */}
            {!showPaymentOptions ? (
                <div className="d-flex justify-content-center gap-3 mt-4">
                <Button variant="success" onClick={handleConfirmBooking} style={{background:'var(--first-color)'}}>
                    Confirm Booking
                </Button>
                <Button variant="danger" onClick={handleCancelBooking}>
                    Cancel Booking
                </Button>
                </div>
            ) : (
                <div className="mt-4 text-center">
                <h5>Choose Your Payment Method:</h5>
                <div className="d-flex justify-content-center gap-3">
                    <Button variant="" style={{background:'var(--first-color)',color:'white'}} onClick={() => handlePaymentMethodSelection('Credit Card')}>Pay with Credit Card</Button>
                    {/* <Button variant="" style={{background:'var(--first-color)',color:'white'}} onClick={() => handlePaymentMethodSelection('Fawry')}>Pay with Fawry</Button> */}
                </div>
                </div>
            )}
            </Card.Body>
        </Card>
        </div>
    );
}