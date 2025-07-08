import React, { useState, useEffect } from 'react';
import { Card, Alert, Table, Button, Spinner, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance';
import './DoctorAppointments.css';

export default function DoctorAppointments() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isPatientDetailsLoading, setIsPatientDetailsLoading] = useState(false);
    const [patientDetailsError, setPatientDetailsError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        axiosInstance.get('/Appointments/appointments')
            .then(response => {
                setBookings(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load appointments.');
                setIsLoading(false);
            });
    }, []);

    const fetchPatientDetails = (appointmentId) => {
        setIsPatientDetailsLoading(true);
        setPatientDetailsError(null);

        axiosInstance.get(`/Appointments/patient-details/${appointmentId}`)
            .then(response => {
                setSelectedPatient(response.data);
                setShowPatientDetailsModal(true);
                console.log(response)
            })
            .catch(err => {
                console.error(err);
                setPatientDetailsError('Failed to load patient details.');
                Swal.fire('Error', 'Failed to load patient details.', 'error');
            })
            .finally(() => {
                setIsPatientDetailsLoading(false);
            });
    };

    const handleCancelBooking = (appointmentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this appointment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.put(`/Appointments/cancel/${appointmentId}`)
                    .then(() => {
                        setBookings(prev => prev.map(b =>
                            b.appointmentId === appointmentId ? { ...b, status: 'Canceled' } : b
                        ));
                        Swal.fire('Canceled!', 'Appointment has been canceled.', 'success');
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'Failed to cancel appointment.', 'error');
                    });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" >
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading appointments...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center my-4">
                Error: {error}
            </Alert>
        );
    }

    return (
        <div className='container'>
            <Card className="shadow-lg border-0 my-5 doctor-bookings-card">
                <Card.Header className="text-white py-3">
                    <h5 className="mb-0">Doctor Appointments</h5>
                </Card.Header>
                <Card.Body className="p-4">
                    {bookings.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            You don't have any upcoming appointments.
                        </Alert>
                    ) : (
                        <Table striped bordered hover responsive className="text-center">
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.appointmentId}>
                                        <td data-label="Patient Name">{booking.patientFullName }</td>
                                        <td data-label="Date">{new Date(booking.date).toLocaleDateString()}</td>
                                        <td data-label="Time">{booking.time}</td>
                                        <td data-label="Status">
                                            <span className={`badge bg-${
                                                booking.status === 'Completed' ? 'success' :
                                                booking.status === 'Pending' ? 'warning' :
                                                booking.status === 'Canceled' ? 'danger' : 'secondary'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td data-label="Actions">
                                            <button
                                                className="btn btn-outline-primary m-2"
                                                onClick={() => fetchPatientDetails(booking.appointmentId)}
                                                disabled={isPatientDetailsLoading}
                                            >
                                                Patient Details
                                            </button>
                                            {(booking.status !== 'Canceled' && booking.status !== 'Completed') && (
                                                <button
                                                    className='btn btn-outline-danger '
                                                    onClick={() => handleCancelBooking(booking.appointmentId)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>

                <Modal show={showPatientDetailsModal} onHide={() => setShowPatientDetailsModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Patient Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isPatientDetailsLoading ? (
                            <div className="text-center">
                                <Spinner animation="border" size="sm" /> Loading...
                            </div>
                        ) : patientDetailsError ? (
                            <Alert variant="danger">{patientDetailsError}</Alert>
                        ) : selectedPatient ? (
                            <div>
                                <h5>Basic Information</h5>
                                <p><strong>Full Name:</strong> {selectedPatient.fullName}</p>
                                <p><strong>Date of Birth:</strong> {new Date(selectedPatient.dateOfBirth).toLocaleDateString()}</p>
                                <p><strong>Email:</strong> {selectedPatient.email}</p>
                                <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>

                                <h5 className="mt-4">Medical Information</h5>
                                <p><strong>Height:</strong> {selectedPatient.height} cm</p>
                                <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
                                <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
                                <p><strong>Allergies:</strong> {selectedPatient.allergies }</p>
                                <p><strong>Medical History:</strong> {selectedPatient.medicalHistory }</p>
                            </div>
                        ) : (
                            <Alert variant="info">No patient details available.</Alert>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPatientDetailsModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card>
        </div>
    );
}
