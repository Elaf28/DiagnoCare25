// import React, { useState } from 'react'; // استيراد useState
// import { RiDeleteBin6Line } from "react-icons/ri";
// import './PatientDashboard.css';


// export default function PatientDashboard() {
//     // بيانات المرضى التجريبية
//     const allPatientsData = [
//         { id: 1, firstName: 'Ahmed ', lastName: 'Ali', email: 'ahmed.ali@example.com', gender: 'male', dateOfBirth: '1990-05-15', phoneNumber: '01067187274', height: '170cm', weight: '60kg', bloodType: 'A+', allergies: 'Pollen, Penicillin', medicalHistory: 'Asthma since childhood, no recent flare-ups. Regular check-ups. Diagnosed with Hypertension 2 years ago.' },
//         { id: 2, firstName: 'Layla ', lastName: 'Hassan', email: 'layla.hassan@example.com', gender: 'female', dateOfBirth: '1988-11-22', phoneNumber: '01123456789', height: '165cm', weight: '55kg', bloodType: 'B-', allergies: 'None known', medicalHistory: 'Appendectomy in 2010. No chronic conditions. Follows healthy lifestyle.' },
//         { id: 3, firstName: 'Omar ', lastName: 'Mahmoud', email: 'omar.mahmoud@example.com', gender: 'male', dateOfBirth: '1975-03-01', phoneNumber: '01234567890', height: '180cm', weight: '85kg', bloodType: 'O+', allergies: 'Dust mites', medicalHistory: 'Type 2 Diabetes diagnosed 5 years ago, currently managed with medication. Annual eye exams recommended.' },
//         { id: 4, firstName: 'Sara ', lastName: 'Kamal', email: 'sara.kamal@example.com', gender: 'female', dateOfBirth: '1995-09-08', phoneNumber: '01001122334', height: '160cm', weight: '50kg', bloodType: 'AB+', allergies: 'Shellfish', medicalHistory: 'Mild eczema, controlled with topical creams. No significant medical history.' },
//         { id: 5, firstName: 'Youssef ', lastName: 'Farid', email: 'youssef.farid@example.com', gender: 'male', dateOfBirth: '1982-07-30', phoneNumber: '01112233445', height: '175cm', weight: '70kg', bloodType: 'A-', allergies: 'Peanuts', medicalHistory: 'Childhood measles. No ongoing medical issues. Active lifestyle.' },
//         { id: 6, firstName: 'Nour ', lastName: 'Said', email: 'nour.said@example.com', gender: 'female', dateOfBirth: '1998-01-10', phoneNumber: '01209876543', height: '168cm', weight: '62kg', bloodType: 'O-', allergies: 'Latex', medicalHistory: 'No major medical history. Annual physicals are normal.' },
//         { id: 7, firstName: 'Mostafa ', lastName: 'Ahmed', email: 'mostafa.ahmed@example.com', gender: 'male', dateOfBirth: '1980-04-25', phoneNumber: '01023456789', height: '178cm', weight: '78kg', bloodType: 'B+', allergies: 'None', medicalHistory: 'Migraine headaches managed with medication. No other significant history.' },
//         { id: 8, firstName: 'Hana ', lastName: 'Ali', email: 'hana.ali@example.com', gender: 'female', dateOfBirth: '1993-12-05', phoneNumber: '01154321098', height: '163cm', weight: '58kg', bloodType: 'AB-', allergies: 'Dust', medicalHistory: 'Seasonal allergies. Overall good health. Recent dental check-up.' },
//     ];

//     const [searchTerm, setSearchTerm] = useState('');

//     const filteredPatients = allPatientsData.filter(patient => {
//         const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
//         return fullName.includes(searchTerm.toLowerCase());
//     });

//     return (
//         <div className='patient-dashboard container'>
//             <div className='row d-flex align-items-center justify-content-between'>
//                 <h3 className='col-md-3 col-5'>All Patients Data</h3>
//                 <div className='mb-2 col-md-4 col-6'>
//                     <input
//                         type='text'
//                         placeholder='Search by Patient Name...'
//                         className='form-control patient-search-input' 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//             </div>
//             <div className='patient-dashboard-table-wrapper'>
//                 <table className='patient-dashboard-table'>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Gender</th>
//                             <th>Phone Number</th>
//                             <th>Date of Birth</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredPatients.map((patient) => ( 
//                             <tr key={patient.id}>
//                                 <td>{patient.id}</td>
//                                 <td>{patient.firstName} {patient.lastName}</td>
//                                 <td>{patient.email}</td>
//                                 <td>{patient.gender}</td>
//                                 <td>{patient.phoneNumber}</td>
//                                 <td>{patient.dateOfBirth}</td>
//                                 <td>
//                                     <button className='btn btn-outline-danger btn-sm'> Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
















import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import './PatientDashboard.css';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance'; // ✅ استخدام axiosInstance

export default function PatientDashboard() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // ✅ جلب بيانات المرضى من API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axiosInstance.get('/Patients/GET-Patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to delete this patient?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosInstance.delete(`/Patients/${id}`);
                setPatients(prev => prev.filter(p => p.id !== id));
                Swal.fire('Deleted!', 'Patient has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting patient:', error);
                Swal.fire('Error', 'Failed to delete patient.', 'error');
            }
        }
    };

    // ✅ فلترة المرضى بالاسم
    const filteredPatients = patients.filter((patient) => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className='patient-dashboard container'>
            <div className='row d-flex align-items-center justify-content-between'>
                <h3 className='col-md-3 col-5'>All Patients Data</h3>
                <div className='mb-2 col-md-4 col-6'>
                    <input
                        type='text'
                        placeholder='Search by Patient Name...'
                        className='form-control patient-search-input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className='patient-dashboard-table-wrapper'>
                <table className='patient-dashboard-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Phone Number</th>
                            <th>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient.patientId}>
                                <td>{patient.patientId}</td>
                                <td>{patient.fullName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.phoneNumber}</td>
                                <td>{new Date(patient.dateOfBirth).toLocaleDateString('en-GB')}</td>
                                <td>
                                    <button
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={() => handleDelete(patient.id)}
                                    >
                                        <RiDeleteBin6Line /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
