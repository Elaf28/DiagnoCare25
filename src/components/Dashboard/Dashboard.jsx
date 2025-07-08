// import React from 'react';
// import { FaUserAlt } from 'react-icons/fa'; 
// import './Dashboard.css'; 
// import { FaUserDoctor } from "react-icons/fa6";
// import { MdAssignment } from "react-icons/md";

// export default function DashboardPage() {
//     const recentAppointment =  [
//   { id: '1', patientFullName: 'Sarah Ahmed', doctorFullName: 'Dr. Mohamed Ali', date: '2025-06-24', time: '10:00 ', status: 'Completed' },
//   { id: '2', patientFullName: 'Youssef Kamal', doctorFullName: 'Dr. Hala Mahmoud', date: '2025-06-25', time: '12:30 ', status: 'Completed' },
//   { id: '3', patientFullName: 'Mai Hassan', doctorFullName: 'Dr. Sherif Nabil', date: '2025-06-26', time: '13:00 ', status: 'Cancelled' },
//   { id: '4', patientFullName: 'Tamer Salah', doctorFullName: 'Dr. Amina Farouk', date: '2025-06-20', time: '09:15 ', status: 'Completed' },
//   { id: '5', patientFullName: 'Mona Yassin', doctorFullName: 'Dr. Karim Hassan', date: '2025-06-28', time: '11:00 ', status: 'Pending' },
//   { id: '6', patientFullName: 'Ziad Amin', doctorFullName: 'Dr. Dina Saeed', date: '2025-07-03', time: '14:15', status: 'Cancelled' },
//   { id: '7', patientFullName: 'Omar Fathy', doctorFullName: 'Dr. Salma Hamed', date: '2025-07-01', time: '18:45 ', status: 'Pending' },
//   { id: '8', patientFullName: 'Lina Reda', doctorFullName: 'Dr. Heba Ezzat', date: '2025-07-04', time: '06:00 ', status: 'Pending' },
//   { id: '9', patientFullName: 'Reem Galal', doctorFullName: 'Dr. Ahmed Magdy', date: '2025-06-30', time: '21:30 ', status: 'Completed' },
//   { id: '10', patientFullName: 'Ali Mostafa', doctorFullName: 'Dr. Laila Nasser', date: '2025-06-29', time: '09:00 ', status: 'Cancelled' },
//   { id: '11', patientFullName: 'Nour Hesham', doctorFullName: 'Dr. Youssef Zaki', date: '2025-07-02', time: '15:00 ', status: 'Completed' },
//   { id: '12', patientFullName: 'Marwan Adel', doctorFullName: 'Dr. Mostafa Galal', date: '2025-07-05', time: '08:30 ', status: 'Completed' },
// ];

//     return (
//         <div className="dashboard-page">
//             <section className="container">
//                 <div className='row d-flex gap-2 align-items-center justify-content-around mb-3'>
//                     <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
//                         <div className="dashboard-card-icon"> 
//                             <FaUserDoctor className='fs-1'/>
//                         </div>
//                         <div>
//                             <h2 className="mb-0">250</h2>
//                             <p className="mb-0 text-muted">Doctors</p> 
//                         </div>
//                     </div>

//                     <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
//                         <div className="dashboard-card-icon"> 
//                             <FaUserAlt className='fs-1'/>
//                         </div>
//                         <div>
//                             <h2 className="mb-0">400</h2>
//                             <p className="mb-0 text-muted">Patients</p> 
//                         </div>
//                     </div>

//                     <div className="d-flex align-items-center dashboard-card col-md-3 justify-content-around">
//                         <div className="dashboard-card-icon"> 
//                             <MdAssignment className='fs-1'/>
//                         </div>
//                         <div>
//                             <h2 className="mb-0">200</h2>
//                             <p className="mb-0 text-muted">Appointments</p> 
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section>
//                 <div className='appointments-dashboard container'>
//             <div className='row d-flex align-items-center justify-content-between'>
//                 <h3 className='col-md-3 col-6'>Recent Appointments</h3>
//             </div>

//             <div className='appointments-dashboard-table-wrapper'>
//                 <table className='appointments-dashboard-table'>
//                     <thead>
//                         <tr>
//                             <th>Appointment ID</th>
//                             <th>Patient Name</th>
//                             <th>Doctor Name</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recentAppointment.length > 0 ? (
//                             recentAppointment.map((appointment) => {
//                                 const status = appointment.status?.toLowerCase();
//                                 const statusColor =
//                                     status === 'completed' ? 'success' :
//                                     status === 'pending' ? 'warning' :
//                                     status === 'cancelled' ? 'danger' :
//                                     'secondary';

//                                 return (
//                                     <tr key={appointment.appointmentId}>
//                                         <td>{appointment.appointmentId}</td>
//                                         <td>{appointment.patientFullName}</td>
//                                         <td>Dr. {appointment.doctorFullName}</td>
//                                         <td>{appointment.date}</td>
//                                         <td>{appointment.time}</td>
//                                         <td >
//                                             <span className={`badge bg-${statusColor} status-appointments`}>
//                                                 {appointment.status}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 );
//                             })
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center text-danger">
//                                     No appointments found.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//             </section>
//         </div>
//     );
// }












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
