// src/components/DoctorBookings.jsx
import React, { useState, useEffect } from 'react';
import { Card, Alert, Table, Button, Spinner, Modal, Form } from 'react-bootstrap';
import { FaCalendarCheck, FaTimesCircle, FaCheckCircle, FaUser, FaBan, FaKey } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './DoctorAppointments.css'; 

export default function DoctorAppointments() {
    // تعليق: البيانات الثابتة (Static Data) للحجوزات
    // كل الحجوزات هنا مفترض أنها "مدفوعة" (isPaid: true)
    const initialMockBookings = [
        {
            id: 1,
            patientId: 101, 
            patientName: 'Ahmed Mahmoud',
            appointmentDate: '2025-06-25',
            appointmentTime: '09:00 AM',
            status: 'Pending', // حالة معلقة، لكنها مفترض مدفوعة
            uniqueKey: '444545', 
            currentUniqueKeyInput: '',
            isPaid: true // افتراض أنها مدفوعة
        },
        {
            id: 2,
            patientId: 102,
            patientName: 'Mona Ali',
            appointmentDate: '2025-06-26',
            appointmentTime: '11:30 AM',
            status: 'Confirmed', 
            uniqueKey: 'DEF456GHI',
            currentUniqueKeyInput: '',
            isPaid: true 
        },
        {
            id: 3,
            patientId: 103,
            patientName: 'Sara Mostafa',
            appointmentDate: '2025-06-20', 
            appointmentTime: '02:00 PM',
            status: 'Done', 
            uniqueKey: 'JKL789MNO',
            currentUniqueKeyInput: '',
            isPaid: true 
        },
        {
            id: 4,
            patientId: 104,
            patientName: 'Khaled Hassan',
            appointmentDate: '2025-06-28',
            appointmentTime: '04:00 PM',
            status: 'Canceled', 
            uniqueKey: 'PQR012STU',
            currentUniqueKeyInput: '',
            isPaid: true // حتى الملغية مفترض أنها كانت مدفوعة وظهرت للدكتور
        },
        {
            id: 5,
            patientId: 105,
            patientName: 'Fatma Reda',
            appointmentDate: '2025-07-01',
            appointmentTime: '10:00 AM',
            status: 'Pending', // حالة معلقة، لكنها مفترض مدفوعة
            uniqueKey: '444545', 
            currentUniqueKeyInput: '',
            isPaid: true // افتراض أنها مدفوعة
        },
    ];

    // تعليق: بيانات ثابتة (Mock Data) لتفاصيل المريض
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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null); 
    const [isPatientDetailsLoading, setIsPatientDetailsLoading] = useState(false);
    const [patientDetailsError, setPatientDetailsError] = useState(null);
    
    // تعليق: دالة "وهمية" لجلب الحجوزات من البيانات الثابتة
    // لا يوجد فلترة هنا، لأن جميع الحجوزات مفترض أنها مدفوعة
    const fetchDoctorBookings = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            // لا يوجد filter هنا: نأخذ جميع الحجوزات كما هي
            setBookings(initialMockBookings);
            setIsLoading(false);
        }, 500); 
    };

    // تعليق: دالة "وهمية" لجلب تفاصيل مريض معين من البيانات الثابتة
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

    // تعليق: دالة لتحديث الـ currentUniqueKeyInput لحجز معين في الـ frontend فقط
    const handleUniqueKeyInputChange = (bookingId, value) => {
        setBookings(prevBookings => prevBookings.map(b =>
            b.id === bookingId ? { ...b, currentUniqueKeyInput: value } : b
        ));
    };

    // تعليق: دالة لتأكيد الحجز بالـ Unique Key (بتستخدم البيانات الثابتة)
    const handleConfirmBooking = (bookingId) => {
        const bookingToConfirm = bookings.find(b => b.id === bookingId);
        if (!bookingToConfirm) return;

        const { currentUniqueKeyInput, uniqueKey } = bookingToConfirm;

        if (!currentUniqueKeyInput) {
            Swal.fire('Warning', 'Please enter the Unique Key.', 'warning');
            return;
        }

        // تعليق: التحقق من الـ Unique Key المدخل بالـ Key الفعلي
        if (currentUniqueKeyInput !== uniqueKey) {
            Swal.fire('Error', 'Invalid Unique Key. Please try again.', 'error');
            return;
        }

        Swal.fire({
            title: 'Confirm Appointment?',
            text: "Are you sure you want to confirm this appointment with the provided key?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, Confirm!',
            cancelButtonText: 'No, Keep Pending'
        }).then((result) => {
            if (result.isConfirmed) {
                // تعليق: تحديث الـ state محلياً للبيانات الثابتة
                // وتغيير الحالة إلى 'Confirmed' ومسح الـ input
                setBookings(prevBookings => prevBookings.map(b =>
                    b.id === bookingId ? { ...b, status: 'Confirmed', currentUniqueKeyInput: '' } : b
                ));
                Swal.fire('Confirmed!', 'Appointment has been confirmed.', 'success');
            }
        });
    };

    // تعليق: دالة لإلغاء الحجز (بتستخدم البيانات الثابتة)
    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this appointment? This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it"
        }).then((result) => {
            if (result.isConfirmed) {
                // تعليق: تحديث الـ state محلياً للبيانات الثابتة
                // وتغيير الحالة إلى 'Canceled'
                setBookings(prevBookings => prevBookings.map(b =>
                    b.id === bookingId ? { ...b, status: 'Canceled' } : b
                ));
                Swal.fire('Canceled!', 'Appointment has been canceled.', 'success');
                // تعليق: لا حاجة لإعادة fetchDoctorBookings هنا، لأن الحجز الملغي سيظل معروضًا إذا كانت الـ API بترجع الملغي المدفوع
            }
        });
    };

    // تعليق: Hook لجلب البيانات أول ما المكون يترندر
    useEffect(() => {
        fetchDoctorBookings();
    }, []);

    // تعليق: عرض حالات التحميل والأخطاء
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
                <Button variant="link" onClick={fetchDoctorBookings} className="ms-2">Retry</Button>
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
                                <th>Unique Key / Confirmation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td data-label="Patient Name">
                                        {booking.patientName || 'N/A'}
                                    </td>
                                    <td data-label="Date">{new Date(booking.appointmentDate).toLocaleDateString()}</td>
                                    <td data-label="Time">{booking.appointmentTime}</td>
                                    <td data-label="Status">
                                        <span className={`badge bg-${
                                            booking.status === 'Confirmed' ? 'success' :
                                            booking.status === 'Pending' ? 'warning' :
                                            booking.status === 'Done' || booking.status === 'Completed' ? 'primary' :
                                            booking.status === 'Canceled' ? 'danger' :
                                            'secondary'
                                        }`}>
                                            {booking.status === 'Done' || booking.status === 'Completed' ? 'Completed' : booking.status}
                                        </span>
                                    </td>
                                    <td data-label="Unique Key / Confirmation">
                                        {/* تعليق: حقل إدخال الـ Unique Key وزرار التأكيد يظهر فقط للحجوزات الـ Pending */}
                                        {booking.status === 'Pending' ? (
                                            <>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter Unique Key"
                                                    value={booking.currentUniqueKeyInput}
                                                    onChange={(e) => handleUniqueKeyInputChange(booking.id, e.target.value)}
                                                    className="mb-2"
                                                    style={{ maxWidth: '150px', display: 'inline-block' }}
                                                />
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    className="ms-2 mb-1 "
                                                    onClick={() => handleConfirmBooking(booking.id)}
                                                >
                                                    Confirm
                                                </Button>
                                            </>
                                        ) : (
                                            // تعليق: لو الحجز مؤكد أو تم، نعرض الـ uniqueKey أو 'N/A'
                                            booking.uniqueKey || 'N/A' 
                                        )}
                                    </td>
                                    <td data-label="Actions">
                                        {/* زرار عرض تفاصيل المريض */}
                                        <button
                                            size="sm"
                                            className="m-2 btn btn-outline-primary"
                                            onClick={() => fetchPatientDetails(booking.patientId)}
                                            disabled={isPatientDetailsLoading}
                                        >
                                            Patient Details
                                        </button>

                                        {/* زرار إلغاء الحجز - يظهر لو الحجز مش ملغي أو مكتمل */}
                                        {(booking.status !== 'Canceled' && booking.status !== 'Done' && booking.status !== 'Completed') && (
                                            <button
                                                className='m-2 btn btn-outline-danger'
                                                size="sm"
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

            {/* Modal لعرض تفاصيل المريض */}
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
