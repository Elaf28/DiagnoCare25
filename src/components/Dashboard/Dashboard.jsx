import React from 'react';
import { FaUserAlt } from 'react-icons/fa'; 
import './Dashboard.css'; 
import { FaUserDoctor } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";

export default function DashboardPage() {
    const recentAppointment = [
        { id: '101', patientID: '1', specialty: 'Dentistry', date: '2025-06-24', time: '05:54', doctorId: '5', Fees: '$60' },
        { id: '102', patientID: '2', specialty: 'Cardiology', date: '2025-06-24', time: '06:00', doctorId: '12', Fees: '$80' },
        { id: '103', patientID: '3', specialty: 'Pediatrics', date: '2025-06-25', time: '09:30', doctorId: '8', Fees: '$50' },
        { id: '104', patientID: '4', specialty: 'Orthopedics', date: '2025-06-25', time: '10:15', doctorId: '15', Fees: '$75' },
        { id: '105', patientID: '5', specialty: 'Dermatology', date: '2025-06-26', time: '02:00', doctorId: '3', Fees: '$65' },
    ];

    return (
        <div className="dashboard-page">
            <section className="container">
                <div className='row d-flex gap-2 align-items-center justify-content-around mb-3'>
                    <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
                        <div className="dashboard-card-icon"> 
                            <FaUserDoctor className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">250</h2>
                            <p className="mb-0 text-muted">Doctors</p> 
                        </div>
                    </div>

                    <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
                        <div className="dashboard-card-icon"> 
                            <FaUserAlt className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">400</h2>
                            <p className="mb-0 text-muted">Patients</p> 
                        </div>
                    </div>

                    <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
                        <div className="dashboard-card-icon"> 
                            <MdAssignment className='fs-1'/>
                        </div>
                        <div>
                            <h2 className="mb-0">200</h2>
                            <p className="mb-0 text-muted">Appointments</p> 
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="recent-appointment dashboard-panel mb-5 p-4">
                    <h3>Recent Appointments</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>Specialty</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor ID</th>
                                <th>Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* استخدام appointment.id كـ key ليكون أكثر فعالية */}
                            {recentAppointment.map((appointment) => (
                                <tr key={appointment.id}> 
                                    <td>{appointment.patientID}</td>
                                    <td>{appointment.specialty}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.doctorId}</td>
                                    <td>{appointment.Fees}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
