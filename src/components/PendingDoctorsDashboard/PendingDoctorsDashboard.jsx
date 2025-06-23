// import React, { useState } from 'react';
// import './PendingDoctorsDashboard.css';
// import Swal from 'sweetalert2';

// export default function PendingDoctorsDashboard() {
//     const [pendingDoctorsData, setPendingDoctorsData] = useState([
//         { id: 1, firstName: 'Youssef', lastName: 'Ibrahim', email: 'youssef@example.com', image: '../../../images/5803206789716625859.jpg', gender: 'male', dateOfBirth: '1988-07-15', phoneNumber: '01098765432', address1: '321 Elm St', address2: 'Apt 7C', specialization: 'Oncology', yearsOfExperience: '8', workplace: 'Cancer Center', professionalTitle: 'Oncologist', fees: '550', aboutDoctor: 'Dr. Youssef Ibrahim specializes in cancer treatment...', licenseImgUrl: '../../../images/5803206789716625859.jpg', qualificationImgUrl: '../../../images/5990308166564432031.jpg' },
//         { id: 2, firstName: 'Sara', lastName: 'Khaled', email: 'sara@example.com', image: '../../../images/default-doctor.png', gender: 'female', dateOfBirth: '1993-04-10', phoneNumber: '01187654321', address1: '654 Cedar Rd', address2: 'Suite 12', specialization: 'Endocrinology', yearsOfExperience: '4', workplace: 'Endo Clinic', professionalTitle: 'Endocrinologist', fees: '400', aboutDoctor: 'Dr. Sara Khaled focuses on hormonal disorders...', licenseImgUrl: '../../../images/5803206789716625860.jpg', qualificationImgUrl: '../../../images/cancer-ribbon-svgrepo-com.png' },
//         { id: 3, firstName: 'Omar', lastName: 'Hassan', email: 'omar@example.com', image: '../../../images/5988056366750746677.jpg', gender: 'male', dateOfBirth: '1982-12-05', phoneNumber: '01234567891', address1: '888 Maple Ave', address2: 'Unit 3', specialization: 'Psychiatry', yearsOfExperience: '12', workplace: 'Mental Health Center', professionalTitle: 'Psychiatrist', fees: '500', aboutDoctor: 'Dr. Omar Hassan provides expert mental health care...', licenseImgUrl: '../../../images/5988056366750746677.jpg', qualificationImgUrl: '../../../images/home2.png' },
//     ]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const handleViewDetails = (doctor) => {
//         Swal.fire({
//             title: `${doctor.firstName} ${doctor.lastName} Details`,
//             html: `
//                 <ul style="text-align: left; padding-left: 20px;">
//                     <li><strong>ID:</strong> ${doctor.id}</li>
//                     <li><strong>Email:</strong> ${doctor.email}</li>
//                     <li><strong>Phone:</strong> ${doctor.phoneNumber}</li>
//                     <li><strong>Address:</strong> ${doctor.address1}, ${doctor.address2}</li>
//                     <li><strong>Specialization:</strong> ${doctor.specialization}</li>
//                     <li><strong>Years of Experience:</strong> ${doctor.yearsOfExperience}</li>
//                     <li><strong>Workplace:</strong> ${doctor.workplace}</li>
//                     <li><strong>Professional Title:</strong> ${doctor.professionalTitle}</li>
//                     <li><strong>Fees:</strong> ${doctor.fees}</li>
//                     <li><strong>About:</strong> ${doctor.aboutDoctor}</li>
//                     <li><strong>License:</strong> <a href="${doctor.licenseImgUrl}" target="_blank"><img src="${doctor.licenseImgUrl}" alt="License" style="max-width: 100px; max-height: 100px; cursor: pointer;"></a></li>
//                     <li><strong>Qualification:</strong> <a href="${doctor.qualificationImgUrl}" target="_blank"><img src="${doctor.qualificationImgUrl}" alt="Qualification" style="max-width: 100px; max-height: 100px; cursor: pointer;"></a></li>
//                 </ul>
//             `,
//             icon: 'info',
//             confirmButtonText: 'Close'
//         });
//     };

//     const handleApproveDoctor = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to approve this doctor?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, approve!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 setPendingDoctorsData(prevDoctors => prevDoctors.filter(doctor => doctor.id !== id));
//                 Swal.fire({
//                     title: "Approved!",
//                     text: "The doctor has been approved.",
//                     icon: "success"
//                 });
//             }
//         });
//     };

//     const handleRejectDoctor = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to reject this doctor? This action cannot be undone!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Yes, reject!"
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 setPendingDoctorsData(prevDoctors => prevDoctors.filter(doctor => doctor.id !== id));
//                 Swal.fire({
//                     title: "Rejected!",
//                     text: "The doctor has been rejected.",
//                     icon: "error"
//                 });
//             }
//         });
//     };

//     const filteredDoctors = pendingDoctorsData.filter(doctor => {
//         const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
//         return fullName.includes(searchTerm.toLowerCase());
//     });

//     return (
//         <div className='pending-doctors-dashboard container'>
//             <div className='row d-flex align-items-center justify-content-between'>
//                 <h3 className='col-md-3 col-5'>Pending Doctors Data</h3>
//                 <div className='mb-2 col-md-4 col-5'> 
//                     <input
//                         type='text'
//                         placeholder='Search by Doctor Name...'
//                         className='form-control doctor-search-input' 
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//             </div>
//             <div className='pending-doctors-dashboard-table-wrapper'>
//                 <table className='pending-doctors-dashboard-table'>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredDoctors.map((doctor) => (
//                             <tr key={doctor.id}>
//                                 <td data-label="ID">{doctor.id}</td>
//                                 <td data-label="Image">
//                                     <img
//                                         src={doctor.image}
//                                         alt={`${doctor.firstName} ${doctor.lastName}`}
//                                         className="doctor-dashboard-image"
//                                     />
//                                 </td>
//                                 <td data-label="Name">{doctor.firstName} {doctor.lastName}</td>
//                                 <td data-label="Email">{doctor.email}</td>
//                                 <td data-label="Actions">
//                                     <button
//                                         className='btn btn-outline-primary btn-sm me-2'
//                                         onClick={() => handleViewDetails(doctor)}
//                                     >
//                                         View Details
//                                     </button>
//                                     <button
//                                         className='btn btn-outline-success btn-sm me-2'
//                                         onClick={() => handleApproveDoctor(doctor.id)}
//                                     >
//                                         Approve
//                                     </button>
//                                     <button
//                                         className='btn btn-outline-danger btn-sm'
//                                         onClick={() => handleRejectDoctor(doctor.id)}
//                                     >
//                                         Reject
//                                     </button>
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
import './PendingDoctorsDashboard.css';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance'; 

export default function PendingDoctorsDashboard() {
    const [pendingDoctorsData, setPendingDoctorsData] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchPendingDoctors = async () => {
            try {
                const response = await axiosInstance.get('/Doctors/pending');
                setPendingDoctorsData(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to fetch pending doctors.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingDoctors();
    }, []);

    const handleViewDetails = (doctor) => {
        Swal.fire({
            title: `${doctor.firstName} ${doctor.lastName} Details`,
            html: `
                <ul style="text-align: left; padding-left: 20px;">
                    <li><strong>ID:</strong> ${doctor.doctorId}</li>
                    <li><strong>Email:</strong> ${doctor.email}</li>
                    <li><strong>Phone:</strong> ${doctor.phoneNumber}</li>
                    <li><strong>Address:</strong> ${doctor.address1}, ${doctor.address2}</li>
                    <li><strong>Specialization:</strong> ${doctor.specialization}</li>
                    <li><strong>Years of Experience:</strong> ${doctor.yearsOfExperience}</li>
                    <li><strong>Workplace:</strong> ${doctor.workplace}</li>
                    <li><strong>Professional Title:</strong> ${doctor.professionalTitle}</li>
                    <li><strong>Fees:</strong> ${doctor.fees}</li>
                    <li><strong>About:</strong> ${doctor.aboutDoctor}</li>
                    <li><strong>License:</strong> <a href="${doctor.licenseImgUrl}" target="_blank"><img src="${doctor.licenseImgUrl}" alt="License" style="max-width: 100px; max-height: 100px;"></a></li>
                    <li><strong>Qualification:</strong> <a href="${doctor.qualificationImgUrl}" target="_blank"><img src="${doctor.qualificationImgUrl}" alt="Qualification" style="max-width: 100px; max-height: 100px;"></a></li>
                </ul>
            `,
            icon: '',
            confirmButtonText: 'Close'
        });
    };

    const filteredDoctors = pendingDoctorsData.filter(doctor => {
        const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    const handleApproveDoctor = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to approve this doctor?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, approve!",
            });

            if (confirm.isConfirmed) {
                await axiosInstance.put(`/Doctors/approve/${id}`);
                setPendingDoctorsData(prev => prev.filter(doctor => doctor.doctorId !== id));
                Swal.fire("Approved!", "Doctor has been approved.", "success");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Could not approve doctor.", "error");
        }
    };
    
    const handleRejectDoctor = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to reject this doctor?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, reject!",
            });

            if (confirm.isConfirmed) {
                await axiosInstance.put(`/Doctors/reject/${id}`);
                setPendingDoctorsData(prev => prev.filter(doctor => doctor.doctorId !== id));
                Swal.fire("Rejected!", "Doctor has been rejected.", "success");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Could not reject doctor.", "error");
        }
    };

    return (
        <div className='pending-doctors-dashboard container'>
            <div className='row d-flex align-items-center justify-content-between'>
                <h3 className='col-md-3 col-5'>Pending Doctors</h3>
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

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="alert alert-danger">{error}</p>
            ) : (
                <div className='pending-doctors-dashboard-table-wrapper'>
                    <table className='pending-doctors-dashboard-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <tr key={doctor.doctorId}>
                                    <td data-label="ID">{doctor.doctorId}</td>
                                    <td data-label="Image">
                                        <img
                                            src={doctor.image}
                                            alt={`${doctor.firstName} ${doctor.lastName}`}
                                            className="doctor-dashboard-image"
                                        />
                                    </td>
                                    <td data-label="Name">Dr. {doctor.firstName} {doctor.lastName}</td>
                                    <td data-label="Email">{doctor.email}</td>
                                    <td data-label="Actions">
                                        <button
                                            className='btn btn-outline-primary btn-sm'
                                            onClick={() => handleViewDetails(doctor)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className='btn btn-outline-success btn-sm me-2'
                                            onClick={() => handleApproveDoctor(doctor.doctorId)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className='btn btn-outline-danger btn-sm'
                                            onClick={() => handleRejectDoctor(doctor.doctorId)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
