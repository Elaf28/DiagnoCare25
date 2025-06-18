import React from 'react'; 
import { Card, Alert, Table, Button } from 'react-bootstrap';
import { FaCalendarCheck, FaTimesCircle, FaDollarSign, FaBan, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MyAppointments.css'; 



export default function MyAppointments() {
    const [bookings, setBookings] = React.useState([
        {
            id: 1,
            doctorName: 'Ahmed',
            doctorSpecialization: 'Cardiology',
            appointmentDate: '2025-06-20',
            appointmentTime: '10:00 AM',
            status: 'Pending',
            isPaid: false,
            amount: 200
        },
        {
            id: 2,
            doctorName: 'Mona',
            doctorSpecialization: 'Dermatology',
            appointmentDate: '2025-06-22',
            appointmentTime: '02:30 PM',
            status: 'Confirmed',
            isPaid: false,
            amount: 150
        },
        {
            id: 3,
            doctorName: 'Mahmoud',
            doctorSpecialization: 'Ophthalmology',
            appointmentDate: '2025-06-25',
            appointmentTime: '09:15 AM',
            status: 'Confirmed',
            isPaid: true,
            amount: 250
        },
        {
            id: 4,
            doctorName: 'Sara',
            doctorSpecialization: 'Pediatrics',
            appointmentDate: '2025-06-10',
            appointmentTime: '11:00 AM',
            status: 'Done',
            isPaid: true,
            amount: 180
        },
        {
            id: 5,
            doctorName: 'Tarek',
            doctorSpecialization: 'Dentistry',
            appointmentDate: '2025-06-18',
            appointmentTime: '03:00 PM',
            status: 'Canceled',
            isPaid: true,
            amount: 220
        },
    ]);

    const navigate = useNavigate();

    const handlePay = (booking) => {
        console.log(`Navigating to payment for booking ID: ${booking.id}`);
        navigate('/payment', { state: { booking } });
    };

    const handleCancel = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this appointment? You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33", 
            cancelButtonColor: "#3085d6", 
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(`Cancellation confirmed for booking ID: ${bookingId}`);
                setBookings(prevBookings => prevBookings.map(b => 
                    b.id === bookingId ? { ...b, status: 'Canceled' } : b
                ));
                Swal.fire({
                    title: "Canceled!",
                    text: "Your appointment has been canceled.",
                    icon: "success"
                });
            } else {
                console.log(`Cancellation aborted for booking ID: ${bookingId}`);
            }
        });
    };

    return (
      <div className='container'>
        
        <Card className="shadow-lg border-0 my-5 patient-bookings-card"> 
            <Card.Header className="text-white py-3"> 
                <h5 className="mb-0">My Appointments</h5>
            </Card.Header>
            <Card.Body className="p-4">
                {bookings.length === 0 ? (
                    <Alert variant="info" className="text-center">
                      <FaCalendarCheck className="me-2" /> You don't have any upcoming appointments.
                    </Alert>
                ) : (
                    <Table striped bordered hover responsive className="text-center">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Specialization</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td data-label="Doctor">Dr. {booking.doctorName}</td> {/* تعليق: إضافة data-label */}
                                    <td data-label="Specialization">{booking.doctorSpecialization}</td>
                                    <td data-label="Date">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                    <td data-label="Time">{booking.appointmentTime}</td>
                                    <td data-label="Status">
                                        <span className={`badge bg-${
                                            booking.status === 'Confirmed' ? 'success' :
                                            booking.status === 'Pending' ? 'warning' :
                                            booking.status === 'Done' ? 'primary' :
                                            booking.status === 'Canceled' ? 'danger' :
                                            'secondary'
                                        }`}>
                                            {booking.status === 'Done' ? 'Completed' : booking.status}
                                        </span>
                                    </td>
                                    <td data-label="Actions">
                                        {booking.status === 'Pending' && !booking.isPaid && (
                                            <button 
                                                size="sm" 
                                                className="me-2 btn btn-outline-success" 
                                                onClick={() => handlePay(booking)}
                                            > Pay
                                            </button>
                                        )}

                                        {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                                            <button 
                                                className='btn btn-outline-danger'
                                                size="sm" 
                                                onClick={() => handleCancel(booking.id)}
                                            >Cancel
                                            </button>
                                        )}

                                        {booking.status === 'Done' && (
                                            <span className="text-primary fw-bold"> 
                                                <FaCheckCircle className="me-1" /> Visit Done
                                            </span>
                                        )}

                                        {booking.status === 'Canceled' && (
                                            <span className="text-danger fw-bold">
                                              <FaTimesCircle className="me-1" /> Canceled
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
        </Card>
      </div>
    );
};
