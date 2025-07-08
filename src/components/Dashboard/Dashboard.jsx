import React, { useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'; 
import { FaUserDoctor } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import axiosInstance from '../../api/axiosInstance';
import './Dashboard.css'; 
import { AiOutlineDollar } from "react-icons/ai";
export default function DashboardPage() {
    const [doctorCount, setDoctorCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalIncome, setTotalIncome] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [doctorsRes, patientsRes, appointmentsRes ,incomeRes] = await Promise.all([
                    axiosInstance.get('/Doctors/approved-doctors'),
                    axiosInstance.get('/Patients/GET-Patients'),
                    axiosInstance.get('/Appointments/admin/all'),
                    axiosInstance.get('/Admin/earnings'),
                ]);

                setDoctorCount(doctorsRes.data.length);
                setPatientCount(patientsRes.data.length);
                setAppointmentCount(appointmentsRes.data.length);
                setAppointments(appointmentsRes.data);
                setTotalIncome(incomeRes.data.platformEarnings);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-page">
            <section className="container">
                <div className='row d-flex gap-2 align-items-center justify-content-around mb-3'>

                    <div className="d-flex align-items-center dashboard-card col-md-2 justify-content-between">
                        <div className="dashboard-card-icon"> 
                            <AiOutlineDollar className='fs-1 me-1'/> 
                        </div>
                        <div>
                            <h2 className="mb-0">{totalIncome}</h2>
                            <p className="mb-0 text-muted">Platform Earnings</p>
                        </div>
                    </div>


                    <div className="d-flex align-items-center dashboard-card col-md-2 justify-content-between">
                        <div className="dashboard-card-icon"> 
                            <FaUserDoctor className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">{doctorCount}</h2>
                            <p className="mb-0 text-muted">Doctors</p> 
                        </div>
                    </div>

                    <div className="d-flex align-items-center dashboard-card col-md-2 justify-content-between">
                        <div className="dashboard-card-icon"> 
                            <FaUserAlt className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">{patientCount}</h2>
                            <p className="mb-0 text-muted">Patients</p> 
                        </div>
                    </div>

                    <div className="d-flex align-items-center dashboard-card col-md-2 justify-content-between">
                        <div className="dashboard-card-icon"> 
                            <MdAssignment className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">{appointmentCount}</h2>
                            <p className="mb-0 text-muted">Appointments</p> 
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='appointments-dashboard container'>
                    <div className='row d-flex align-items-center justify-content-between'>
                        <h3 className='col-md-3 col-6'>Recent Appointments</h3>
                    </div>

                    <div className='appointments-dashboard-table-wrapper'>
                        {loading ? (
                            <p className="text-center">Loading appointments...</p>
                        ) : error ? (
                            <p className="text-danger text-center">{error}</p>
                        ) : (
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
                                    {appointments.length > 0 ? (
                                        appointments.slice(-10).map((appointment) => {
                                            const status = appointment.status?.toLowerCase();
                                            const statusColor =
                                                status === 'completed' ? 'success' :
                                                status === 'pending' ? 'warning' :
                                                status === 'canceled' ? 'danger' :
                                                'secondary';

                                            return (
                                                <tr key={appointment.appointmentId}>
                                                    <td>{appointment.appointmentId}</td>
                                                    <td>{appointment.patientFullName}</td>
                                                    <td>{appointment.doctorFullName}</td>
                                                    <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
                                                    <td>{appointment.time}</td>
                                                    <td>
                                                        <span className={`badge bg-${statusColor} status-appointments`}>
                                                            {appointment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-danger">
                                                No appointments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
