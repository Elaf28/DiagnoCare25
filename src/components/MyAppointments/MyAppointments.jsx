import React, { useEffect, useState } from 'react'; 
import { Card, Alert, Table, Button } from 'react-bootstrap';
import { FaTimesCircle, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './MyAppointments.css'; 
import axiosInstance from '../../api/axiosInstance';
import { useSelector } from 'react-redux';

export default function MyAppointments() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useSelector((state) => state.auth); 
    const patientId = user?.id;

    useEffect(() => {
        const fetchAppointments = async () => {
        try {
            const response = await axiosInstance.get('/Appointments/my-appointments');
            setBookings(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load appointments.');
        } finally {
            setLoading(false);
        }
        };

        if (patientId) {
        fetchAppointments();
        }
    }, [patientId]);

    const handleCancel = async (bookingId) => {
        const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to cancel this appointment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33", 
        cancelButtonColor: "#3085d6", 
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it"
        });

        if (confirm.isConfirmed) {
        try {
            await axiosInstance.put(`/Appointments/cancel/${bookingId}`);
            setBookings(prev =>
            prev.map(b => b.appointmentId === bookingId ? { ...b, status: 'Canceled' } : b)
            );
            Swal.fire("Canceled!", "The appointment has been canceled.", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to cancel the appointment.", "error");
        }
        }
    };

    const handleConfirmAppointment = async (bookingId) => {
    const confirm = await Swal.fire({
        title: "Confirm Appointment?",
        text: "Are you sure this appointment has been completed?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, confirm it",
        cancelButtonText: "No"
    });

    if (confirm.isConfirmed) {
        try {
        await axiosInstance.post('/Appointments/confirm', {
            appointmentId: bookingId
        });

        setBookings(prev =>
            prev.map(b => b.appointmentId === bookingId ? { ...b, status: 'Completed' } : b)
        );

        Swal.fire("Confirmed!", "The appointment has been marked as Completed.", "success");
        } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to confirm appointment.", "error");
        }
    }
    };

    return (
        <div className='container'>
        <Card className="shadow-lg border-0 my-5 patient-bookings-card"> 
            <Card.Header className="text-white py-3"> 
            <h5 className="mb-0">My Appointments</h5>
            </Card.Header>
            <Card.Body className="p-4">
            {loading ? (
                <p className='text-center'>Loading appointments...</p>
            ) : error ? (
                <Alert variant="danger" className='text-center'>{error}</Alert>
            ) : bookings.length === 0 ? (
                <Alert variant="info" className="text-center">
                    You don't have any upcoming appointments.
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
                    <tr key={booking.appointmentId }>
                        <td>Dr. {booking.doctorFullName}</td>
                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                        <td>{booking.time}</td>
                        <td>
                        {booking.doctorPhoneNumber && (
                            <a
                            href={`https://wa.me/${booking.doctorPhoneNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-success d-flex align-items-center justify-content-end justify-content-md-center gap-1"
                            >
                            <FaWhatsapp /> <span>{booking.doctorPhoneNumber}</span>
                            </a>
                        )}
                        </td>
                        <td>
                        <span className={`badge bg-${
                            booking.status === 'Completed' ? 'success' :
                            booking.status === 'Pending' ? 'warning' :
                            booking.status === 'Canceled' ? 'danger' :
                            'secondary'
                        }`}>
                            {booking.status}
                        </span>
                        </td>
                        <td>
                        {booking.status === 'Pending' && (
                            <>
                            <Button 
                                variant="outline-success" size="sm" className='me-2'
                                onClick={() => handleConfirmAppointment(booking.appointmentId )}
                            >
                                Confirm Appointment
                            </Button>
                            <Button 
                                variant="outline-danger" size="sm"
                                onClick={() => handleCancel(booking.appointmentId )}
                            >
                                Cancel
                            </Button>
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
}
