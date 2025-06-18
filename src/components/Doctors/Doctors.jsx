import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Doctors.css';
import { IoMdSearch } from 'react-icons/io';
import { MdAdd } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function Doctors() {
  const { specialtyName, } = useParams();
  const[searchTerm,setSearchTerm]=useState('');
  const navigate = useNavigate();
  const doctors = [
    {
      id:1,
      name: 'Vincent Brinky',
      specialty: 'Cardiology and Vascular Disease',
      image: '/images/doctor1.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:2,
      name: 'Chewing Shiniong',
      specialty: 'Cardiology and Vascular Disease',
      image: '/images/doctor2.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:3,
      name: 'Shayn Cannon',
      specialty: 'Cardiology and Vascular Disease',
      image: '/images/doctor4.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:4,
      name: 'Shayn Cannon',
      specialty: 'Pediatrics',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:5,
      name: 'mohsen Cannon',
      specialty: 'Urology',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:6,
      name: 'Vincent Brinky',
      specialty: 'Dermatology',
      image: '/images/doctor1.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:7,
      name: 'Chewing Shiniong',
      specialty: 'Dermatology',
      image: '/images/doctor2.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:8,
      name: 'Shayn Cannon',
      specialty: 'Dentistry',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:9,
      name: 'Shayn Cannon',
      specialty: 'Psychiatry',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:10,
      name: 'mohsen Cannon',
      specialty: 'Urology',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:11,
      name: 'Vincent Brinky',
      specialty: 'Dentistry',
      image: '/images/doctor1.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:12,
      name: 'Chewing Shiniong',
      specialty: 'Dentistry',
      image: '/images/doctor2.jpg',
      position:'specialist Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:13,
      name: 'Shayn Cannon',
      specialty: 'Cardiology and Vascular Disease',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:13,
      name: 'Shayn Cannon',
      specialty: 'Dermatology',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:14,
      name: 'mohsen Cannon',
      specialty: 'Orthopedics',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:15,
      name: 'Shayn Cannon',
      specialty: 'Otolaryngology',
      image: '/images/doctor3.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:16,
      name: 'mohsen Cannon',
      specialty: 'Otolaryngology',
      image: '/images/doctor2.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
    {
      id:17,
      name: 'mohsen Cannon',
      specialty: 'Otolaryngology',
      image: '/images/doctor2.jpg',
      position:'Consultant Cardiologist',
      address: '34 Sandpiper Lane,Amaganset Caifornia 11930',
    },
  ];
  const filteredDoctors = doctors.filter(
    (doctor) => doctor.specialty.toLowerCase() === specialtyName.replace(/-/g, ' ') &&
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (<>
    <div className='container'>
      <div className='d-flex align-items-center justify-content-center my-5 '>
        <div className='w-100 d-flex align-items-center justify-content-center'>
          <input style={{border: '3px solid var(--first-color) ' }} className="form-control form-control-lg w-50 " type="text" placeholder="Search for doctor . . ." aria-label=".form-control-lg example" value={searchTerm} onChange={handleSearchChange} ></input>
          <IoMdSearch className='search' />
        </div>
      </div>
      <div className="doctors-grid my-5 align-items-center justify-content-center row gap-2">
        {filteredDoctors.map((doctor,index) => (
          <div key={index} className="doctor-card col-md-2 col-5 ">
            <div className="doctor-image">
              <img src={doctor.image || '/images/default-doctor.jpg'} alt={doctor.name} className='dr-image' />
            </div>
            <div className="doctor-details ">
              <p className="doctor-name">Dr. {doctor.name}</p>
              <p className="doctor-position">{doctor.position}</p>
              <div className="doctor-address"><FaLocationDot className='fs-4 icon'/> {doctor.address}</div>
              <button onClick={()=>navigate(`/doctor/${doctor.id}`)} className="see-more-button "><MdAdd className='fs-4 icon'/> See more details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}












// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import './Doctors.css';
// import { IoMdSearch } from 'react-icons/io';
// import { MdAdd } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";

// export default function Doctors() {
//   const { specialtyName } = useParams();
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const normalizedSpecialty = specialtyName.replace(/-/g, ' ');

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         const {data} = await axios.get(`http://localhost:5000/api/doctors/specialty/${normalizedSpecialty}`);
//         setDoctors(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [normalizedSpecialty]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredDoctors = doctors.filter(doctor =>
//     doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className='container'>
//       <div className='d-flex align-items-center justify-content-center my-5'>
//         <div className='w-100 d-flex align-items-center justify-content-center'>
//           <input
//             style={{ border: '3px solid var(--first-color)' }}
//             className="form-control form-control-lg w-50"
//             type="text"
//             placeholder="Search for doctor . . ."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <IoMdSearch className='search' />
//         </div>
//       </div>

//       {loading ? (
//         <p className="text-center">Loading doctors...</p>
//       ) : filteredDoctors.length === 0 ? (
//         <p className="text-center">No doctors found for this specialty.</p>
//       ) : (
//         <div className="doctors-grid my-5 align-items-center justify-content-center row gap-2">
//           {filteredDoctors.map((doctor) => (
//             <div key={doctor.id} className="doctor-card col-md-2 col-5">
//               <div className="doctor-image">
//                 <img src={doctor.image || '/images/default-doctor.jpg'} alt={doctor.name} className='dr-image' />
//               </div>
//               <div className="doctor-details">
//                 <p className="doctor-name">Dr. {doctor.name}</p>
//                 <p className="doctor-position">{doctor.position}</p>
//                 <div className="doctor-address"><FaLocationDot className='fs-4 icon' /> {doctor.address}</div>
//                 <button onClick={() => navigate(`/doctor/${doctor.id}`)} className="see-more-button">
//                   <MdAdd className='fs-4 icon' /> See more details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
