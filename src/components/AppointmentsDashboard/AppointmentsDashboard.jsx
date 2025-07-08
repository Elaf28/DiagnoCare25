import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import './AppointmentsDashboard.css';

export default function AppointmentsDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('/Appointments/admin/all'); 
                setAppointments(response.data);
                console.log(response.data)
            } catch (err) {
                console.error(err);
                setError('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter((appointment) => {
        const term = searchTerm.toLowerCase();
        return (
            appointment.patientFullName?.toLowerCase().includes(term) ||
            appointment.doctorFullName?.toLowerCase().includes(term)
        );
    });

    return (
        <div className='appointments-dashboard container'>
            <div className='row d-flex align-items-center justify-content-between'>
                <h3 className='col-md-3 col-6'>All Appointments</h3>
                <div className='mb-2 col-md-4 col-6'>
                    <input
                        type='text'
                        placeholder='Search by Patient or Doctor Name...'
                        className='form-control patient-search-input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="alert alert-danger">{error}</p>
                ) : (
                    <div className='appointments-dashboard-table-wrapper'>
                    <table className='appointments-dashboard-table'>
                        <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => {
                                    const status = appointment.status?.toLowerCase();
                                    return (
                                        <tr key={appointment.appointmentId}>
                                            <td>{appointment.appointmentId}</td>
                                            <td>{appointment.patientFullName}</td>
                                            <td>{appointment.doctorFullName}</td>
                                            <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td> 
                                            <td>{appointment.time}</td>
                                            <td>
                                                <span className={`status-appointments badge px-3 py-2 bg-${
                                                    status === 'completed' ? 'success' :
                                                    status === 'pending' ? 'warning' :
                                                    status === 'canceled' ? 'danger' :
                                                    'secondary'
                                                }`}>
                                                    {appointment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-danger">No appointments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
            </div>
                )}
        </div>
    );
}
