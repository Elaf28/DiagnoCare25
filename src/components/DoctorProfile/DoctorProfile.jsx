// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {  Card, Image, Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
// import { FaRegFile } from 'react-icons/fa';
// import WorkingHours from '../WorkingHoures/WorkingHoures';
// export default function DoctorProfile() {
//   // Initial sample data for the doctor
//   const initialDoctorData = {
//     firstName: "Ahmed",
//     lastName: "Mohamed",
//     dateOfBirth: "1980-05-15",
//     gender: "Male",
//     email: "ahmed.mohamed@example.com",
//     phoneNumber: "01001234567",
//     address1: "Nile Street, Building 10",
//     address2: "Third Floor, Apt 5, Faiyum, Egypt",
//     specialization: "Pediatrician",
//     yearsOfExperience: 15,
//     fees: "200 EGP",
//     workplace: "Al Hayat Hospital",
//     professionalTitle: "Consultant",
//     aboutDoctor: "A highly experienced Pediatrician dedicated to providing comprehensive and compassionate care to children from infancy through adolescence. Specializes in routine check-ups, vaccinations, and management of chronic conditions.",
//     licenseImgUrl: '../../../images/5990308166564432031.jpg',
//     qualificationImgUrl: '../../../images/5803206789716625860.jpg',
//     doctorImgUrl: "../../../images/5803206789716625859.jpg",
//   };

//   const [doctorData, setDoctorData] = useState(initialDoctorData);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempDoctorData, setTempDoctorData] = useState({ ...initialDoctorData });
//   // Removed validationErrors state completely
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempDoctorData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//     // Removed validationErrors clearing logic
//   };

//   // Removed validateForm function entirely

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Browser's native HTML5 validation will now prevent submission if 'required' fields are empty
//     setError(null);

//     // No need for !validateForm() check anymore

//     setIsLoading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setDoctorData(tempDoctorData);
//       setIsEditing(false);

//     } catch (apiError) {
//       console.error("Error saving profile:", apiError);
//       setError("An error occurred while saving. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleCancel = () => {
//     setTempDoctorData({ ...doctorData });
//     setIsEditing(false);
//     // Removed validationErrors clearing
//     setError(null);
//   };

//   return (
//     <div className="my-5 container" >
//       <div className="row justify-content-center ">
//         <div className='col-md-10'>
//           <Card className="shadow-lg border-0">
//             <Card.Header className="text-white py-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--first-color)' }}>
//               <h4 className="mb-0">
//                 Doctor Profile
//               </h4>
//               {!isEditing ? (
//                 <Button variant="outline-light" onClick={() => {
//                   setIsEditing(true);
//                   setTempDoctorData({ ...doctorData });
//                   // Removed validationErrors clearing
//                   setError(null);
//                 }}>
//                   Edit Profile
//                 </Button>
//               ) : (
//                 <div>
//                   <Button variant="success" className="me-2" type="submit" form="doctorProfileForm" disabled={isLoading}>
//                     {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
//                   </Button>
//                   <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
//                     Cancel
//                   </Button>
//                 </div>
//               )}
//             </Card.Header>

//             <Card.Body className="p-4">
//               {error && <Alert variant="danger">{error}</Alert>}

//               <div className="row mb-4 justify-content-center text-center">
//                 <div className='col-md-12'>
//                   <div className="position-relative d-inline-block">
//                     <Image
//                       src={ doctorData.doctorImgUrl || "../../../images/default-doctor.png"}
//                       roundedCircle
//                       width="150"
//                       height="150"
//                       className="mb-3 object-fit-cover"
//                       alt="Doctor Profile"
//                       style={{border:'5px solid var(--first-color)'}}
//                     />
//                   </div>
//                   <h4 className="mb-1" style={{color:'var(--first-color)'}}>Dr. {doctorData.firstName} {doctorData.lastName}</h4>
//                 </div>
//               </div>

//               <Form id="doctorProfileForm" onSubmit={handleSubmit}>
//                 <div className='row'>
//                   <div className="mb-4 mb-md-0 col-md-6">
//                     <Card className="h-100">
//                       <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Basic Information</Card.Header>
//                       <Card.Body>
//                         <ListGroup variant="flush">
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Full Name:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control
//                                   type="text"
//                                   name="firstName"
//                                   value={tempDoctorData.firstName || ''}
//                                   onChange={handleChange}
//                                   className="mb-2"
//                                   required 
//                                 />
//                                 <Form.Control
//                                   type="text"
//                                   name="lastName"
//                                   value={tempDoctorData.lastName || ''}
//                                   onChange={handleChange}
//                                   required 
//                                 />
//                               </>
//                             ) : (
//                               `${doctorData.firstName} ${doctorData.lastName}`
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Date of Birth:</span>
//                               {doctorData.dateOfBirth ? new Date(doctorData.dateOfBirth).toLocaleDateString():''}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Gender:</span>
//                             {doctorData.gender}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Email:</span>
//                               {doctorData.email}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Phone Number:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="phoneNumber"
//                                 value={tempDoctorData.phoneNumber || ''}
//                                 onChange={handleChange}
//                                 required 
//                               />
//                             ) : (
//                               doctorData.phoneNumber 
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Address:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control
//                                   type="text"
//                                   name="address1"
//                                   value={tempDoctorData.address1}
//                                   onChange={handleChange}
//                                   className="mb-2"
//                                   required 
//                                 />
//                                 <Form.Control
//                                   type="text"
//                                   name="address2"
//                                   value={tempDoctorData.address2 }
//                                   onChange={handleChange}
//                                   // Optional: Add required here if address2 is always mandatory
//                                 />
//                               </>
//                             ) : (
//                               `${doctorData.address1} ${doctorData.address2}`
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>

//                   <div className='col-md-6'>
//                     <Card className="h-100">
//                       <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Professional Details</Card.Header>
//                       <Card.Body>
//                         <ListGroup variant="flush">
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Professional Title:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="professionalTitle"
//                                 value={tempDoctorData.professionalTitle }
//                                 onChange={handleChange}
//                                 required 
//                               />
//                             ) : (
//                               doctorData.professionalTitle 
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Years Exp.:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control
//                                   type="number"
//                                   name="yearsOfExperience"
//                                   value={tempDoctorData.yearsOfExperience }
//                                   onChange={handleChange}
//                                   required 
//                                 />
//                               </>
//                             ) : (
//                               ` ${doctorData.yearsOfExperience }`
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Consultation Fees:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="fees"
//                                 value={tempDoctorData.fees}
//                                 onChange={handleChange}
//                                 required 
//                               />
//                             ) : (
//                               doctorData.fees 
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Workplace:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="workplace"
//                                 value={tempDoctorData.workplace }
//                                 onChange={handleChange}
//                                 required 
//                               />
//                             ) : (
//                               doctorData.workplace
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Qualification:</span>
//                                 <a href={doctorData.qualificationImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>License:</span>
//                                 <a href={doctorData.licenseImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>About Doctor:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 as="textarea"
//                                 name="aboutDoctor"
//                                 value={tempDoctorData.aboutDoctor }
//                                 onChange={handleChange}
//                                 rows={3}
//                                 required 
//                                 maxLength={300}
//                               />
//                             ) : (
//                               doctorData.aboutDoctor 
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 </div>
//               </Form>
//               <div className='col-md-12 mt-4'>
//                 <WorkingHours/>
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };










// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Image, Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDoctorProfile, updateDoctorProfile, resetProfileStatus } from '../../Redux/DoctorProfileSlice';
// import { FaRegFile } from 'react-icons/fa';
// import WorkingHours from '../WorkingHoures/WorkingHoures';

// export default function DoctorProfile() {
//   const dispatch = useDispatch();
//   const { data: doctorData, status, error } = useSelector((state) => state.doctorProfile);

//   const [isEditing, setIsEditing] = useState(false);
//   const [tempDoctorData, setTempDoctorData] = useState({});
//   const isLoading = status === 'loading';

//   useEffect(() => {
//     dispatch(fetchDoctorProfile()).then((res) => {
//       if (res.payload?.fullName) {
//         const [firstName, ...lastNameParts] = res.payload.fullName.split(' ');
//         const lastName = lastNameParts.join(' ');
//         setTempDoctorData({
//           ...res.payload,
//           firstName,
//           lastName,
//         });
//       }
//     });
//     return () => {
//       dispatch(resetProfileStatus());
//     };
//   }, [dispatch]);

//   const startEditing = () => {
//     const [firstName, ...lastNameParts] = doctorData.fullName.split(' ');
//     const lastName = lastNameParts.join(' ');
//     setTempDoctorData({ ...doctorData, firstName, lastName });
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempDoctorData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const fullName = `${tempDoctorData.firstName} ${tempDoctorData.lastName}`;
//   const payload = {
//     ...doctorData,
//     ...tempDoctorData,
//     fullName,
//   };

//   console.log('Payload sent to API:', payload);
//   try {
//     await dispatch(updateDoctorProfile(payload)).unwrap();
//     setIsEditing(false);
//   } catch (err) {
//     console.error("Failed to update doctor profile:", err);
//   }
// };


//   const handleCancel = () => {
//     const [firstName, ...lastNameParts] = doctorData.fullName.split(' ');
//     const lastName = lastNameParts.join(' ');
//     setTempDoctorData({ ...doctorData, firstName, lastName });
//     setIsEditing(false);
//   };

//   if (status === 'loading') {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <div className="text-center mt-5">
//         <Alert variant="danger">Failed to load doctor profile: {error}</Alert>
//       </div>
//     );
//   }
//   const displayData = isEditing ? tempDoctorData : doctorData;

//   return (
//     <div className="my-5 container">
//       <div className="row justify-content-center">
//         <div className="col-md-10">
//           <Card className="shadow-lg border-0">
//             <Card.Header className="text-white py-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--first-color)' }}>
//               <h4 className="mb-0">Doctor Profile</h4>
//               {!isEditing ? (
//                 <Button variant="outline-light" onClick={startEditing}>Edit Profile</Button>
//               ) : (
//                 <div>
//                   <Button variant="success" className="me-2" type="submit" form="doctorProfileForm" disabled={isLoading}>
//                     {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
//                   </Button>
//                   <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
//                 </div>
//               )}
//             </Card.Header>

//             <Card.Body className="p-4">
//               {error && <Alert variant="danger">{error}</Alert>}

//               <div className="text-center mb-4">
//                 <Image
//                   src={displayData.doctorImgUrl || "../../../images/default-doctor.png"}
//                   roundedCircle
//                   width="150"
//                   height="150"
//                   className="object-fit-cover"
//                   style={{ border: '5px solid var(--first-color)' }}
//                   alt="Doctor Profile"
//                 />
//                 <h4 style={{ color: 'var(--first-color)' }}>Dr. {displayData.fullName}</h4>
//               </div>

//               <Form id="doctorProfileForm" onSubmit={handleSubmit}>
//                 <div className='row'>
//                   <div className="mb-4 mb-md-0 col-md-6">
//                     <Card className="h-100">
//                       <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Basic Information</Card.Header>
//                       <Card.Body>
//                         <ListGroup variant="flush">
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Full Name:</span>
//                             {displayData.fullName}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             {displayData.status && (
//                                 <div className="mb-3">
//                                   <span className="fw-bold">Status: </span>
//                                   <span
//                                     className={`badge px-3 py-2 fs-6 ${
//                                       displayData.status === 'Approved'
//                                         ? 'bg-success'
//                                         : displayData.status === 'Pending'
//                                         ? 'bg-warning text-dark'
//                                         : 'bg-danger'
//                                     }`}
//                                   >
//                                     {displayData.status}
//                                   </span>
//                                 </div>
//                               )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Date of Birth:</span>
//                             {displayData.dateOfBirth ? new Date(displayData.dateOfBirth).toLocaleDateString() : ''}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Gender:</span>
//                             {displayData.gender}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Email:</span>
//                             {displayData.email}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Phone Number:</span>
//                             {displayData.phoneNumber}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Address:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control type="text" name="address1" value={tempDoctorData.address1} onChange={handleChange} className="mb-2" required />
//                                 <Form.Control type="text" name="address2" value={tempDoctorData.address2} onChange={handleChange} />
//                               </>
//                             ) : (
//                               `${displayData.address1} ${displayData.address2}`
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>

//                   <div className='col-md-6'>
//                     <Card className="h-100">
//                       <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Professional Details</Card.Header>
//                       <Card.Body>
//                         <ListGroup variant="flush">
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Professional Title:</span>
//                             {displayData.professionalTitle}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Years Exp:</span>
//                             {isEditing ? (
//                               <Form.Control type="number" name="yearsOfExperience" value={tempDoctorData.yearsOfExperience} onChange={handleChange} required />
//                             ) : (
//                               displayData.yearsOfExperience
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Fees:</span>
//                             {isEditing ? (
//                               <Form.Control type="text" name="fees" value={tempDoctorData.fees} onChange={handleChange} required />
//                             ) : (
//                               displayData.fees
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Workplace:</span>
//                             {isEditing ? (
//                               <Form.Control type="text" name="workplace" value={tempDoctorData.workplace} onChange={handleChange} required />
//                             ) : (
//                               displayData.workplace
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Qualification:</span>
//                             <a href={displayData.qualificationImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>License:</span>
//                             <a href={displayData.licenseImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>About Doctor:</span>
//                             {isEditing ? (
//                               <Form.Control as="textarea" name="aboutDoctor" value={tempDoctorData.aboutDoctor} onChange={handleChange} rows={3} required maxLength={300} />
//                             ) : (
//                               displayData.aboutDoctor
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 </div>
//               </Form>

//               <div className='col-md-12 mt-4'>
//                 <WorkingHours />
//               </div>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorProfile, updateDoctorProfile, resetProfileStatus } from '../../Redux/DoctorProfileSlice';
import { FaRegFile } from 'react-icons/fa';
import WorkingHours from '../WorkingHoures/WorkingHoures';

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { data: doctorData, status, error } = useSelector((state) => state.doctorProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [tempDoctorData, setTempDoctorData] = useState({});
  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchDoctorProfile()).then((res) => {
      if (res.payload) {
        setTempDoctorData(res.payload);
      }
    });
    return () => {
      dispatch(resetProfileStatus());
    };
  }, [dispatch]);

  const startEditing = () => {
    setTempDoctorData({ ...doctorData });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempDoctorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      address1: tempDoctorData.address1,
      address2: tempDoctorData.address2,
      fees: Number(tempDoctorData.fees),
      workplace: tempDoctorData.workplace,
      yearsOfExperience: Number(tempDoctorData.yearsOfExperience),
      aboutDoctor: tempDoctorData.aboutDoctor,
    };


    try {
      await dispatch(updateDoctorProfile(payload)).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update doctor profile:", err);
    }
  };

  const handleCancel = () => {
    setTempDoctorData(doctorData);
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">Failed to load doctor profile: {error}</Alert>
      </div>
    );
  }

  const displayData = isEditing ? tempDoctorData : doctorData;

  return (
    <div className="my-5 container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <Card className="shadow-lg border-0">
            <Card.Header className="text-white py-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--first-color)' }}>
              <h4 className="mb-0">Doctor Profile</h4>
              {!isEditing ? (
                <Button variant="outline-light" onClick={startEditing}>Edit Profile</Button>
              ) : (
                <div>
                  <Button variant="success" className="me-2" type="submit" form="doctorProfileForm" disabled={isLoading}>
                    {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                  </Button>
                  <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
                </div>
              )}
            </Card.Header>

            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <div className="text-center mb-4">
                <Image
                  src={displayData.doctorImgUrl || "../../../images/default-doctor.png"}
                  roundedCircle
                  width="150"
                  height="150"
                  className="object-fit-cover"
                  style={{ border: '5px solid var(--first-color)' }}
                  alt="Doctor Profile"
                />
                <h4 style={{ color: 'var(--first-color)' }}>Dr. {displayData.fullName}</h4>
              </div>

              <Form id="doctorProfileForm" onSubmit={handleSubmit}>
                <div className='row'>
                  <div className="mb-4 mb-md-0 col-md-6">
                    <Card className="h-100">
                      <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Basic Information</Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item><strong>Full Name:</strong> {displayData.fullName}</ListGroup.Item>
                          <ListGroup.Item><strong>Status:</strong>
                            <span className={`badge px-3 py-2 ms-2 fs-6 ${
                              displayData.status === 'Approved'
                                ? 'bg-success'
                                : displayData.status === 'Pending'
                                ? 'bg-warning text-dark'
                                : 'bg-danger'
                            }`}>
                              {displayData.status}
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item><strong>Date of Birth:</strong> {new Date(displayData.dateOfBirth).toLocaleDateString()}</ListGroup.Item>
                          <ListGroup.Item><strong>Gender:</strong> {displayData.gender}</ListGroup.Item>
                          <ListGroup.Item><strong>Email:</strong> {displayData.email}</ListGroup.Item>
                          <ListGroup.Item><strong>Phone Number:</strong> {displayData.phoneNumber}</ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Address:</strong>
                            {isEditing ? (
                              <>
                                <Form.Control className="mb-2" name="address1" value={tempDoctorData.address1 || ''} onChange={handleChange} required />
                                <Form.Control name="address2" value={tempDoctorData.address2 || ''} onChange={handleChange} />
                              </>
                            ) : (
                              `${displayData.address1} ${displayData.address2}`
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className='col-md-6'>
                    <Card className="h-100">
                      <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Professional Details</Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item><strong>Professional Title:</strong> {displayData.professionalTitle}</ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Years of Experience:</strong>
                            {isEditing ? (
                              <Form.Control type="number" name="yearsOfExperience" value={tempDoctorData.yearsOfExperience || ''} onChange={handleChange} required />
                            ) : (
                              displayData.yearsOfExperience
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Fees:</strong>
                            {isEditing ? (
                              <Form.Control type="number" name="fees" value={tempDoctorData.fees || ''} onChange={handleChange} required />
                            ) : (
                              `${displayData.fees}`
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Workplace:</strong>
                            {isEditing ? (
                              <Form.Control type="text" name="workplace" value={tempDoctorData.workplace || ''} onChange={handleChange} required />
                            ) : (
                              displayData.workplace
                            )}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Qualification:</strong>
                            <a href={displayData.qualificationImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>License:</strong>
                            <a href={displayData.licenseImgUrl} target="_blank" rel="noopener noreferrer"><FaRegFile /></a>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>About Doctor:</strong>
                            {isEditing ? (
                              <Form.Control as="textarea" rows={3} name="aboutDoctor" value={tempDoctorData.aboutDoctor || ''} onChange={handleChange} maxLength={300} />
                            ) : (
                              displayData.aboutDoctor
                            )}
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Form>

              <div className='col-md-12 mt-4'>
                <WorkingHours />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
