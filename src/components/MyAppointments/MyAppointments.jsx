import React from 'react'; 
import { Card, Alert, Table, Button } from 'react-bootstrap';
import { FaCalendarCheck, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './MyAppointments.css'; 
import { FaWhatsapp } from 'react-icons/fa';
export default function MyAppointments() {
    const [bookings, setBookings] = React.useState([
        {
            id: 1,
            doctorName: 'Ahmed',
            appointmentDate: '2025-06-20',
            appointmentTime: '10:00 ',
            status: 'Pending',
            isPaid: true,
            amount: 200,
            doctorPhone: '201012345678'
        },
        {
            id: 2,
            doctorName: 'Mona',
            appointmentDate: '2025-06-22',
            appointmentTime: '02:30 ',
            status: 'Completed',
            isPaid: true,
            amount: 150,
            doctorPhone: '201158521815'
        },
        {
            id: 3,
            doctorName: 'Mahmoud',
            appointmentDate: '2025-06-25',
            appointmentTime: '17:15 ',
            status: 'Canceled',
            isPaid: true,
            amount: 250,
            doctorPhone: '201069349822'
        },
    ]);

    const handleCancel = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33", 
            cancelButtonColor: "#3085d6", 
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                setBookings(prevBookings => prevBookings.map(b => 
                    b.id === bookingId ? { ...b, status: 'Canceled' } : b
                ));
                Swal.fire("Canceled!", "Your appointment has been canceled.", "success");
            }
        });
    };

    const handleConfirmVisit = (bookingId) => {
        Swal.fire({
            title: "Confirm Visit?",
            text: "Are you sure the visit has been completed?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, it’s done",
            cancelButtonText: "No"
        }).then(result => {
            if (result.isConfirmed) {
                setBookings(prev =>
                    prev.map(b => b.id === bookingId ? { ...b, status: 'Completed' } : b)
                );
                Swal.fire("Updated!", "The appointment status is now Completed.", "success");
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
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Contact</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.id}>
                                        <td data-label="Doctor">Dr. {booking.doctorName}</td>
                                        <td data-label="Date">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                        <td data-label="Time">{booking.appointmentTime}</td>
                                        <td data-label="Contact">
                                            {booking.doctorPhone && (
                                                <a
                                                href={`https://wa.me/${booking.doctorPhone}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-success d-flex align-items-center justify-content-end justify-content-md-center gap-1"
                                                >
                                                <FaWhatsapp /> <span >{booking.doctorPhone}</span>
                                                </a>
                                            )}
                                            </td>
                                        <td data-label="Status">
                                            <span className={`badge bg-${
                                                booking.status === 'Completed' ? 'success' :
                                                booking.status === 'Pending' ? 'warning' :
                                                booking.status === 'Canceled' ? 'danger' :
                                                'secondary'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td data-label="Actions">
                                            {booking.status === 'Pending' && (
                                                <>
                                                    <button 
                                                        className='btn btn-outline-success me-2'
                                                        onClick={() => handleConfirmVisit(booking.id)}
                                                    >
                                                        Confirm 
                                                    </button>
                                                    <button 
                                                        className='btn btn-outline-danger'
                                                        onClick={() => handleCancel(booking.id)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            {booking.status === 'Completed' && (
                                                <span className="text-success fw-bold"> 
                                                    <FaCheckCircle className="me-1" /> Completed
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
