// src/components/DoctorBookings.jsx
import React, { useState } from 'react';
import { Card, Alert, Table, Button, Spinner, Modal } from 'react-bootstrap';
import { FaCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './DoctorAppointments.css'; 

export default function DoctorAppointments() {
    const initialMockBookings = [
        {
            id: 1,
            patientId: 101, 
            patientName: 'Ahmed Mahmoud',
            appointmentDate: '2025-06-25',
            appointmentTime: '09:00 ',
            status: 'Pending',
            isPaid: true
        },
        {
            id: 2,
            patientId: 102,
            patientName: 'Mona Ali',
            appointmentDate: '2025-06-26',
            appointmentTime: '11:30 ',
            status: 'Completed',
            isPaid: true 
        },
        {
            id: 3,
            patientId: 103,
            patientName: 'Sara Mostafa',
            appointmentDate: '2025-06-20', 
            appointmentTime: '02:00 ',
            status: 'Canceled',
            isPaid: true 
        },
        {
            id: 4,
            patientId: 104,
            patientName: 'Khaled Hassan',
            appointmentDate: '2025-06-28',
            appointmentTime: '04:00 ',
            status: 'Pending',
            isPaid: true
        },
        {
            id: 5,
            patientId: 105,
            patientName: 'Fatma Reda',
            appointmentDate: '2025-07-01',
            appointmentTime: '10:00 AM',
            status: 'Completed',
            isPaid: true
        },
    ];

    const mockPatients = {
        101: {
            id: 101,
            fullName: 'Ahmed Mahmoud',
            dateOfBirth: '1990-01-15',
            gender: 'Male',
            email: 'ahmed.m@example.com',
            phoneNumber: '01012345678',
            height: 175,
            weight: 70,
            bloodType: 'A+',
            allergies: 'Penicillin',
            medicalHistory: 'Asthma since childhood.',
        },
        102: {
            id: 102,
            fullName: 'Mona Ali',
            dateOfBirth: '1985-05-20',
            gender: 'Female',
            email: 'mona.a@example.com',
            phoneNumber: '01198765432',
            height: 162,
            weight: 55,
            bloodType: 'B-',
            allergies: 'None',
            medicalHistory: 'No significant medical history.',
        },
        103: {
            id: 103,
            fullName: 'Sara Mostafa',
            dateOfBirth: '1992-09-01',
            gender: 'Female',
            email: 'sara.m@example.com',
            phoneNumber: '01234567890',
            height: 168,
            weight: 60,
            bloodType: 'O+',
            allergies: 'Pollen',
            medicalHistory: 'Seasonal allergies.',
        },
        104: {
            id: 104,
            fullName: 'Khaled Hassan',
            dateOfBirth: '1978-03-10',
            gender: 'Male',
            email: 'khaled.h@example.com',
            phoneNumber: '01511223344',
            height: 180,
            weight: 85,
            bloodType: 'AB+',
            allergies: 'Dust Mites',
            medicalHistory: 'Hypertension controlled by medication.',
        },
        105: {
            id: 105,
            fullName: 'Fatma Reda',
            dateOfBirth: '2000-11-25',
            gender: 'Female',
            email: 'fatma.r@example.com',
            phoneNumber: '01099887766',
            height: 160,
            weight: 50,
            bloodType: 'A-',
            allergies: 'Cats',
            medicalHistory: 'Mild asthma.',
        },
    };

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [showPatientDetailsModal, setShowPatientDetailsModal] = React.useState(false);
    const [selectedPatient, setSelectedPatient] = React.useState(null);
    const [isPatientDetailsLoading, setIsPatientDetailsLoading] = React.useState(false);
    const [patientDetailsError, setPatientDetailsError] = React.useState(null);

    // محاكاة جلب الحجوزات
    React.useEffect(() => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            setBookings(initialMockBookings);
            setIsLoading(false);
        }, 500);
    }, []);

    const fetchPatientDetails = (patientId) => {
        setIsPatientDetailsLoading(true);
        setPatientDetailsError(null);
        setTimeout(() => {
            const patient = mockPatients[patientId];
            if (patient) {
                setSelectedPatient(patient);
                setShowPatientDetailsModal(true);
            } else {
                setPatientDetailsError('Patient details not found.');
                Swal.fire('Error', 'Patient details not found.', 'error');
            }
            setIsPatientDetailsLoading(false);
        }, 500);
    };

    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this appointment? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "No, Keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                setBookings(prev => prev.map(b =>
                    b.id === bookingId ? { ...b, status: 'Canceled' } : b
                ));
                Swal.fire('Canceled!', 'Appointment has been canceled.', 'success');
            }
        });
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading appointments...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="text-center my-4">
                <FaTimesCircle className="me-2" /> Error: {error}
                <Button variant="link" onClick={() => window.location.reload()} className="ms-2">Retry</Button>
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
                        <FaCalendarCheck className="me-2" /> You don't have any upcoming appointments.
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
                                <tr key={booking.id}>
                                    <td data-label="Patient Name">{booking.patientName || 'N/A'}</td>
                                    <td data-label="Date">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                    <td data-label="Time">{booking.appointmentTime}</td>
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
                                        <button
                                            className="btn btn-outline-primary m-2"
                                            onClick={() => fetchPatientDetails(booking.patientId)}
                                            disabled={isPatientDetailsLoading}
                                        >
                                            Patient Details
                                        </button>

                                        {(booking.status !== 'Canceled' && booking.status !== 'Completed') && (
                                            <button
                                                className='btn btn-outline-danger m-2'
                                                onClick={() => handleCancelBooking(booking.id)}
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
                            <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                            <p><strong>Email:</strong> {selectedPatient.email}</p>
                            <p><strong>Phone Number:</strong> {selectedPatient.phoneNumber}</p>

                            <h5 className="mt-4">Medical Information</h5>
                            <p><strong>Height:</strong> {selectedPatient.height} cm</p>
                            <p><strong>Weight:</strong> {selectedPatient.weight} kg</p>
                            <p><strong>Blood Type:</strong> {selectedPatient.bloodType}</p>
                            <p><strong>Allergies:</strong> {selectedPatient.allergies || 'N/A'}</p>
                            <p><strong>Medical History:</strong> {selectedPatient.medicalHistory || 'N/A'}</p>
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
};
