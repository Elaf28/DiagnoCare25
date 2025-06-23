// import React, { useState, useMemo} from 'react';
// import { IoMdSearch } from 'react-icons/io';
// import './Specialties.css';
// import { Link } from 'react-router-dom';
// const SpecialtyList = () => {
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const originalSpecialties = [
//     { id:'1' , name: 'Dermatology', image: '/images/i-dermatology-svgrepo-com.png' },
//     { id:'2' , name: 'Dentistry', image: '/images/tooth-dentistry-svgrepo-com.png' },
//     { id:'3' , name: 'Cardiology and Vascular Disease', image: '/images/heart-pulse-svgrepo-com.png' },
//     { id:'4' , name: 'Pediatrics', image: '/images/baby-svgrepo-com.png' },
//     { id:'5' , name: 'Psychiatry', image: '/images/ADHD.png' },
//     { id:'6' , name: 'Orthopedics', image: '/images/skeleton-view-on-x-ray-svgrepo-com.png' },
//     { id:'7' , name: 'Otolaryngology', image: '/images/ear-svgrepo-com.png' },
//     { id:'8' , name: 'Ophthalmology', image: '/images/i-ophthalmology-svgrepo-com.png' },
//     { id:'9' , name: 'Oncology', image: '/images/cancer-ribbon-svgrepo-com.png' },
//     { id:'10', name: 'Internal Medicine', image: '/images/stomach-svgrepo-com.png' },
//     { id:'11', name: 'Hepatology', image: '/images/liver-svgrepo-com.png' },
//     { id:'12', name: 'Urology', image: '/images/kidney-svgrepo-com.png' },
//     { id:'13', name: 'Neurosurgery', image: '/images/brain-illustration-12-svgrepo-com.png' },
//     { id:'14', name: 'Dietitian and Nutrition', image: '/images/weighing-weight-svgrepo-com.png' },
//     { id:'15', name: 'Chest and Respiratory', image: '/images/lungs-lung-svgrepo-com.png' },
//   ];

//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredResults = useMemo(() => {
//     if (!searchTerm) {
//       return originalSpecialties;
//     }
//     return originalSpecialties.filter((specialty) =>
//       specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, originalSpecialties]);

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <>
//       <div className="container my-5">
//         <div className='d-flex align-items-center justify-content-center m-5 '>
//           <div className='w-100 d-flex align-items-center justify-content-center'>
//             <input style={{border: '3px solid var(--first-color) ' }} className="form-control form-control-lg w-50 " type="text" placeholder="Search for specialty . . ." aria-label=".form-control-lg example" value={searchTerm} onChange={handleChange}></input>
//             <IoMdSearch className='search' />
//           </div>
//         </div>

//         <div className="specialty-grid">
//           {filteredResults.map((specialty,index) => (
//             <Link key={index} to={`/doctors/${specialty.name.toLowerCase().replace(/ /g, '-')} `} className="specialty-card link allCard">
//               <img src={specialty.image} alt={specialty.name} className="specialty-image" />
//               <span className="specialty-name fs-5">{specialty.name}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default SpecialtyList;














import React, { useEffect, useMemo, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import './Specialties.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecialties } from '../../Redux/SpecialtiesSlice';

export default function Specialties() {
  const dispatch = useDispatch();

  // استدعاء البيانات من الريدكس
  const { list: specialties, status, error } = useSelector((state) => state.specialties);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSpecialties());
    }
  }, [dispatch, status]);

  const filteredResults = useMemo(() => {
    if (!searchTerm) return specialties;
    return specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, specialties]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-center m-5">
        <div className="w-100 d-flex align-items-center justify-content-center">
          <input
            style={{ border: '3px solid var(--first-color)' }}
            className="form-control form-control-lg w-50"
            type="text"
            placeholder="Search for specialty . . ."
            value={searchTerm}
            onChange={handleChange}
          />
          <IoMdSearch className="search" />
        </div>
      </div>

      {status === 'loading' ? (
        <p className="text-center fs-4 text-muted">Loading specialties...</p>
      ) : status === 'failed' ? (
        <p className="text-center fs-4 text-danger">Error: {error}</p>
      ) : (
        <div className="specialty-grid">
          {filteredResults.length > 0 ? (
            filteredResults.map((specialty) => (
              <Link
                key={specialty.specialtyId}
                to={`/doctors/${specialty.name.toLowerCase().replace(/ /g, '-')}`}
                className="specialty-card link allCard"
              >
                <img src={`https://corsproxy.io/?${specialty.imageUrl}`} alt={specialty.name} className="specialty-image" />
                <span className="specialty-name fs-5">{specialty.name}</span>
              </Link>
            ))
          ) : (
            <p className="text-center fs-4 text-muted">No specialties found.</p>
          )}
        </div>
      )}
    </div>
  );
}
