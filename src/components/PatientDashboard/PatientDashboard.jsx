import React, { useState, useEffect } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import './PatientDashboard.css';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance'; 

export default function PatientDashboard() {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
                setPatients(prev => prev.filter(p => p.patientId !== id));
                Swal.fire('Deleted!', 'Patient has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting patient:', error);
                Swal.fire('Error', 'Failed to delete patient.', 'error');
            }
        }
    };

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
                                        onClick={() => handleDelete(patient.patientId)}
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
