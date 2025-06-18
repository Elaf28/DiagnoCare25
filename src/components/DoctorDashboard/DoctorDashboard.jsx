import React, { useState } from 'react';
import './DoctorDashboard.css';
import Swal from 'sweetalert2'; // ** Modified: Added SweetAlert2 import **

export default function DoctorDashboard() {
    // بيانات الأطباء التجريبية
    const [allDoctorsData, setAllDoctorsData] = useState([
        { id: 1, firstName: 'Ahmed', lastName: 'Ali', email: 'ahmed.ali@example.com', image: '../../../images/5803206789716625859.jpg', gender: 'male', dateOfBirth: '1985-06-14', phoneNumber: '01067187274', address1: '123 Main St', address2: 'Apt 4B', specialization: 'Cardiology', yearsOfExperience: '10', workplace: 'City Hospital', professionalTitle: 'Senior Cardiologist', fees: '500', aboutDoctor: 'Dr. Ahmed Ali is a highly experienced cardiologist...', licenseImgUrl: 'license-ahmed.jpg', qualificationImgUrl: 'qual-ahmed.jpg' },
        { id: 2, firstName: 'Fatma', lastName: 'Mohamed', email: 'fatma@example.com', image: '../../../images/default-doctor.png', gender: 'female', dateOfBirth: '1990-03-20', phoneNumber: '01123456789', address1: '456 Oak Ave', address2: 'Suite 10', specialization: 'Pediatrics', yearsOfExperience: '7', workplace: 'Children\'s Clinic', professionalTitle: 'Pediatric Specialist', fees: '400', aboutDoctor: 'Dr. Fatma Mohamed specializes in child healthcare...', licenseImgUrl: 'license-fatma.jpg', qualificationImgUrl: 'qual-fatma.jpg' },
        { id: 3, firstName: 'Khaled', lastName: 'Hassan', email: 'khaled@example.com', image: '../../../images/5803206789716625860.jpg', gender: 'male', dateOfBirth: '1980-09-01', phoneNumber: '01234567890', address1: '789 Pine Ln', address2: 'Unit 5', specialization: 'Dermatology', yearsOfExperience: '15', workplace: 'Skin Care Center', professionalTitle: 'Senior Dermatologist', fees: '600', aboutDoctor: 'Dr. Khaled Hassan is an expert in dermatology...', licenseImgUrl: 'license-khaled.jpg', qualificationImgUrl: 'qual-khaled.jpg' },
        { id: 4, firstName: 'Mona', lastName: 'Gamal', email: 'mona@example.com', image: '../../../images/default-doctor.png', gender: 'female', dateOfBirth: '1992-01-25', phoneNumber: '01011223344', address1: '500 Palm Dr', address2: 'Building A', specialization: 'Neurology', yearsOfExperience: '5', workplace: 'Central Hospital', professionalTitle: 'Neurologist', fees: '450', aboutDoctor: 'Dr. Mona Gamal is a dedicated neurologist...', licenseImgUrl: 'license-mona.jpg', qualificationImgUrl: 'qual-mona.jpg' },
        { id: 5, firstName: 'Tarek', lastName: 'Fouad', email: 'tarek@example.com', image: '../../../images/5988056366750746677.jpg', gender: 'male', dateOfBirth: '1975-11-11', phoneNumber: '01223344556', address1: '999 River Rd', address2: 'Floor 2', specialization: 'Orthopedics', yearsOfExperience: '20', workplace: 'Orthopedic Clinic', professionalTitle: 'Chief Orthopedic Surgeon', fees: '700', aboutDoctor: 'Dr. Tarek Fouad is a highly respected orthopedic surgeon...', licenseImgUrl: 'license-tarek.jpg', qualificationImgUrl: 'qual-tarek.jpg' },
    ]);

    // حالة (state) لتخزين نص البحث
    const [searchTerm, setSearchTerm] = useState('');

    // دالة مساعدة لإنشاء مسار الصورة بشكل صحيح (تظل كما هي)
    // const getFileUrl = (fileName) => {
    //     return `/images/${fileName}`;
    // };

    // دالة لحذف الدكتور مع تأكيد
    const handleDeleteDoctor = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this doctor? This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setAllDoctorsData(prevDoctors => prevDoctors.filter(doctor => doctor.id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "The doctor has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    // فلترة الدكاترة بناءً على نص البحث
    const filteredDoctors = allDoctorsData.filter(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className='doctor-dashboard container'>
            <div className='row d-flex align-items-center justify-content-between'>
                <h3 className='col-md-3 col-5'>All Doctors Data</h3>
                <div className='mb-2 col-md-4 col-5'> 
                    <input
                        type='text'
                        placeholder='Search by Doctor Name...'
                        className='form-control doctor-search-input' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='doctor-dashboard-table-wrapper'>
                <table className='doctor-dashboard-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Workplace</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.firstName} {doctor.lastName}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phoneNumber}</td>
                                <td>{doctor.address1}</td>
                                <td>{doctor.workplace}</td>
                                <td>
                                    <button
                                        className='btn btn-outline-danger btn-sm'
                                        onClick={() => handleDeleteDoctor(doctor.id)}
                                    >
                                        Delete
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