// // src/pages/admin/AppointmentsDashboard.jsx

// import React, { useState } from 'react';
// import './AppointmentsDashboard.css'; // استخدمي نفس تنسيق جدول المرضى أو التخصصات

// export default function AppointmentsDashboard() {
//    const appointmentsData = [
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

//     const [searchTerm, setSearchTerm] = useState('');

//     const filteredAppointments = appointmentsData.filter((appointment) => {
//         const term = searchTerm.toLowerCase();
//         return (
//             appointment.patientFullName.toLowerCase().includes(term) ||
//             appointment.doctorFullName.toLowerCase().includes(term)
//         );
//     });

//     return (
//         <div className='appointments-dashboard container'>
//             <div className='row d-flex align-items-center justify-content-between'>
//                 <h3 className='col-md-3 col-6'>All Appointments</h3>
//                 <div className='mb-2 col-md-4 col-6'>
//                     <input
//                         type='text'
//                         placeholder='Search by Patient or Doctor Name...'
//                         className='form-control patient-search-input'
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
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
//                         {filteredAppointments.length > 0 ? (
//                             filteredAppointments.map((appointment) => {
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
//     );
// }













// src/pages/admin/AppointmentsDashboard.jsx

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import './AppointmentsDashboard.css';

export default function AppointmentsDashboard() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // جلب بيانات المواعيد
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
