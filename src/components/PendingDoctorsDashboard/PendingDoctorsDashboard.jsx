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
        const { value: rejectionReason } = await Swal.fire({
            title: 'Reject Doctor',
            input: 'textarea',
            inputLabel: 'Reason for rejection',
            inputPlaceholder: 'Type the reason here...',
            inputAttributes: {
                'aria-label': 'Reason for rejection'
            },
            showCancelButton: true
        });

        if (rejectionReason) {
            try {
                await axiosInstance.put(`/Doctors/reject/${id}`, { rejectionReason }); // ✅ body يحتوي على rejectionReason
                setPendingDoctorsData(prev => prev.filter(doctor => doctor.doctorId !== id));
                Swal.fire("Rejected!", "Doctor has been rejected.", "success");
            } catch (error) {
                console.error(error);
                Swal.fire("Error!", "Could not reject doctor.", "error");
            }
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
                                            src={doctor.doctorImgUrl}
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







// import React, { useState, useEffect } from 'react';
// import './PendingDoctorsDashboard.css';
// import Swal from 'sweetalert2';

// // بيانات ثابتة (mock)
// const mockPendingDoctors = [
//   {
//     doctorId: 1,
//     firstName: "Sara",
//     lastName: "Abdelrahman",
//     email: "sara454@gmail.com",
//     phoneNumber: "01012345678",
//     address1: "Cairo",
//     address2: "Nasr City",
//     specialization: "Oncology",
//     yearsOfExperience: 10,
//     workplace: "57357 Hospital",
//     professionalTitle: "Consultant Oncologist",
//     fees: 400,
//     aboutDoctor: "Expert in breast and colon cancer with focus on patient support.",
//     doctorImgUrl: "https://randomuser.me/api/portraits/women/44.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36512",
//     licenseImgUrl: "https://images.unsplash.com/photo-1608471577686-410429ec9f9b",
//   },
//   {
//     doctorId: 2,
//     firstName: "Mohamed",
//     lastName: "Tarek",
//     email: "mohamed66@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "https://randomuser.me/api/portraits/men/23.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//     {
//     doctorId: 3,
//     firstName: "Reham",
//     lastName: "Youssef",
//     email: "Reham@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/doctor4.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//   {
//     doctorId: 4,
//     firstName: "Ahmed",
//     lastName: "Mohamed",
//     email: "mohamed32@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/5976647902820419584.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//   {
//     doctorId: 5,
//     firstName: "Youssef",
//     lastName: "Tarek",
//     email: "youssef5@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/5976647902820419583.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//   {
//     doctorId: 6,
//     firstName: "Amira",
//     lastName: "Ahmed",
//     email: "Amira696@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/5976647902820419582.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//   {
//     doctorId: 7,
//     firstName: "Saeed",
//     lastName: "Mohamed",
//     email: "saeed8@gmail.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/5976647902820419580.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },
//   {
//     doctorId: 8,
//     firstName: "Khaled",
//     lastName: "Saeed",
//     email: "khaled4565@example.com",
//     phoneNumber: "01098765432",
//     address1: "Giza",
//     address2: "Dokki",
//     specialization: "Oncology",
//     yearsOfExperience: 7,
//     workplace: "National Cancer Institute",
//     professionalTitle: "Oncology Specialist",
//     fees: 300,
//     aboutDoctor: "Specialist in blood cancers and immunotherapy.",
//     doctorImgUrl: "../../../images/5976647902820419581.jpg",
//     qualificationImgUrl: "https://images.unsplash.com/photo-1588776814413-7cd9a2f77c1f",
//     licenseImgUrl: "https://images.unsplash.com/photo-1581093588401-98d8d6267e3f",
//   },

// ];

// export default function PendingDoctorsDashboard() {
//   const [pendingDoctorsData, setPendingDoctorsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     // محاكاة جلب بيانات من API
//     setTimeout(() => {
//       setPendingDoctorsData(mockPendingDoctors);
//       setLoading(false);
//       setError(null);
//     }, 500);
//   }, []);

//   const handleViewDetails = (doctor) => {
//     Swal.fire({
//       title: `${doctor.firstName} ${doctor.lastName} Details`,
//       html: `
//         <ul style="text-align: left; padding-left: 20px;">
//             <li><strong>ID:</strong> ${doctor.doctorId}</li>
//             <li><strong>Email:</strong> ${doctor.email}</li>
//             <li><strong>Phone:</strong> ${doctor.phoneNumber}</li>
//             <li><strong>Address:</strong> ${doctor.address1}, ${doctor.address2}</li>
//             <li><strong>Specialization:</strong> ${doctor.specialization}</li>
//             <li><strong>Years of Experience:</strong> ${doctor.yearsOfExperience}</li>
//             <li><strong>Workplace:</strong> ${doctor.workplace}</li>
//             <li><strong>Professional Title:</strong> ${doctor.professionalTitle}</li>
//             <li><strong>Fees:</strong> ${doctor.fees}</li>
//             <li><strong>About:</strong> ${doctor.aboutDoctor}</li>
//             <li><strong>License:</strong> <a href="${doctor.licenseImgUrl}" target="_blank"><img src="${doctor.licenseImgUrl}" alt="License" style="max-width: 100px; max-height: 100px;"></a></li>
//             <li><strong>Qualification:</strong> <a href="${doctor.qualificationImgUrl}" target="_blank"><img src="${doctor.qualificationImgUrl}" alt="Qualification" style="max-width: 100px; max-height: 100px;"></a></li>
//         </ul>
//       `,
//       icon: '',
//       confirmButtonText: 'Close'
//     });
//   };

//   const handleApproveDoctor = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to approve this doctor?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, approve!",
//     });

//     if (confirm.isConfirmed) {
//       setPendingDoctorsData(prev => prev.filter(doctor => doctor.doctorId !== id));
//       Swal.fire("Approved!", "Doctor has been approved.", "success");
//     }
//   };

//   const handleRejectDoctor = async (id) => {
//     const { value: rejectionReason } = await Swal.fire({
//       title: 'Reject Doctor',
//       input: 'textarea',
//       inputLabel: 'Reason for rejection',
//       inputPlaceholder: 'Type the reason here...',
//       inputAttributes: {
//         'aria-label': 'Reason for rejection'
//       },
//       showCancelButton: true
//     });

//     if (rejectionReason) {
//       setPendingDoctorsData(prev => prev.filter(doctor => doctor.doctorId !== id));
//       Swal.fire("Rejected!", "Doctor has been rejected.", "success");
//     }
//   };

//   const filteredDoctors = pendingDoctorsData.filter(doctor => {
//     const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
//     return fullName.includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className='pending-doctors-dashboard container'>
//       <div className='row d-flex align-items-center justify-content-between'>
//         <h3 className='col-md-3 col-5'>Pending Doctors</h3>
//         <div className='mb-2 col-md-4 col-5'>
//           <input
//             type='text'
//             placeholder='Search by Doctor Name...'
//             className='form-control doctor-search-input'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p className="alert alert-danger">{error}</p>
//       ) : (
//         <div className='pending-doctors-dashboard-table-wrapper'>
//           <table className='pending-doctors-dashboard-table'>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredDoctors.map((doctor) => (
//                 <tr key={doctor.doctorId}>
//                   <td data-label="ID">{doctor.doctorId}</td>
//                   <td data-label="Image">
//                     <img
//                       src={doctor.doctorImgUrl}
//                       alt={`${doctor.firstName} ${doctor.lastName}`}
//                       className="doctor-dashboard-image"
//                     />
//                   </td>
//                   <td data-label="Name">Dr. {doctor.firstName} {doctor.lastName}</td>
//                   <td data-label="Email">{doctor.email}</td>
//                   <td data-label="Actions">
//                     <button
//                       className='btn btn-outline-primary btn-sm'
//                       onClick={() => handleViewDetails(doctor)}
//                     >
//                       View Details
//                     </button>
//                     <button
//                       className='btn btn-outline-success btn-sm me-2'
//                       onClick={() => handleApproveDoctor(doctor.doctorId)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className='btn btn-outline-danger btn-sm'
//                       onClick={() => handleRejectDoctor(doctor.doctorId)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
