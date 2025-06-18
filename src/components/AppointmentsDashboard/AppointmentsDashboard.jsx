import React from 'react'
import './AppointmentsDashboard.css'
export default function AppointmentsDashboard() {
        const recentAppointment = [
        { patientID: '1', specialty: 'Dentistry', date: '2025-06-24', time: '05:54',doctorId:'5',Fees:'$60' },
        { patientID: '1', specialty: 'Dentistry', date: '2025-06-24', time: '05:54',doctorId:'5',Fees:'$60' },
        { patientID: '1', specialty: 'Dentistry', date: '2025-06-24', time: '05:54',doctorId:'5',Fees:'$60' },
        { patientID: '1', specialty: 'Dentistry', date: '2025-06-24', time: '05:54',doctorId:'5',Fees:'$60' },
    ];
    return (
    <div>
        <div className="recent-appointment dashboard-panel mb-5 p-4">
                    <h3>Recent Appointment</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient ID</th>
                                <th>specialty</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor ID</th>
                                <th>Fees</th>

                            </tr>
                            </thead>
                        <tbody>
                            {recentAppointment.map((appointment,index) => (
                                <tr key={index}>
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
    </div>
  )
}
