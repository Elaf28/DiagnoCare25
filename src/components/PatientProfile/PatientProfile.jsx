// // src/components/PatientProfile.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, ListGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

// // Import your thunks and actions from patientProfileSlice
// import {
//   fetchPatientProfile,
//   updatePatientProfile,
//   resetPatientProfileStatus,
// } from '../../Redux/patientProfileReducer'; // تأكد من المسار الصحيح

// export default function PatientProfile() {
//   const dispatch = useDispatch();
//   // Get patient data and status from Redux store
//   const { data: patientData, status, error } = useSelector((state) => state.patientProfile);
//   const authStatus = useSelector((state) => state.auth.status); // To check auth status before fetching profile

//   const [isEditing, setIsEditing] = useState(false);
//   const [tempPatientData, setTempPatientData] = useState({}); // Initialize as empty object
//   const [validationErrors, setValidationErrors] = useState({}); // Renamed 'errors' to 'validationErrors' for clarity

//   const isLoading = status === 'loading'; // Check if profile is being fetched or updated

//   // --- Fetch patient profile when component mounts or auth status changes ---
//   useEffect(() => {
//     // Fetch only if user is authenticated and profile data is not yet loaded
//     // Or if profile data loading previously failed and we want to retry (adjust logic if needed)
//     if (authStatus === 'succeeded' && !patientData.email && !isLoading && status !== 'succeeded') {
//       dispatch(fetchPatientProfile());
//     }
//   }, [dispatch, authStatus, patientData.email, isLoading, status]);

//   // --- Initialize tempPatientData when patientData from Redux changes or when starting edit ---
//   // This ensures that when patientData is fetched, tempPatientData is populated.
//   useEffect(() => {
//     if (patientData && Object.keys(patientData).length > 0) {
//       setTempPatientData(patientData);
//     }
//   }, [patientData]);

//   // --- Reset profile status on component unmount ---
//   useEffect(() => {
//     return () => {
//       dispatch(resetPatientProfileStatus());
//     };
//   }, [dispatch]);

//   // --- Render loading spinner or error message based on Redux status ---
//   if (status === 'loading' && (!patientData || Object.keys(patientData).length === 0)) {
//     return (
//       <div className="my-5 text-center container">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading Patient Profile...</span>
//         </Spinner>
//         <p className="text-muted mt-2">Loading patient profile...</p>
//       </div>
//     );
//   }

//   if (status === 'failed' && (!patientData || Object.keys(patientData).length === 0)) {
//     return (
//       <div className="my-5 text-center container">
//         <Alert variant="danger">
//           Error loading patient profile: {error || "Unknown error."}
//           <Button variant="link" onClick={() => dispatch(fetchPatientProfile())}>Try Again</Button>
//         </Alert>
//       </div>
//     );
//   }

//   // If patientData is still not available after loading (e.g., new user or no profile exists yet)
//   // This handles the case where fetch might have succeeded but returned empty data, or no data exists
//   if (!patientData || Object.keys(patientData).length === 0 || !patientData.email) {
//     return (
//       <div className="my-5 text-center container">
//         <p className="text-muted">No patient profile data available. Please ensure you are logged in or create a profile.</p>
//         {/* You might add a button here to redirect to a profile creation page */}
//       </div>
//     );
//   }

//   // Handler for when an input field changes during editing
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTempPatientData({
//       ...tempPatientData,
//       [name]: value,
//     });
//     // Clear error for this field as user starts typing
//     if (validationErrors[name]) {
//       setValidationErrors(prevErrors => {
//         const newErrors = { ...prevErrors };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };
//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};
//     if (!tempPatientData.firstName || tempPatientData.firstName.trim() === '') {
//       newErrors.firstName = 'First Name is required.';
//     }
//     if (!tempPatientData.lastName || tempPatientData.lastName.trim() === '') {
//       newErrors.lastName = 'Last Name is required.';
//     }
//     if (!tempPatientData.height || parseFloat(tempPatientData.height) <= 0) {
//       newErrors.height = 'Height is required and must be a positive number.';
//     }
//     if (!tempPatientData.weight || parseFloat(tempPatientData.weight) <= 0) {
//       newErrors.weight = 'Weight is required and must be a positive number.';
//     }
//     // Add more validation for other required fields as needed

//     setValidationErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handler for Save button (now handleSubmit)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         await dispatch(updatePatientProfile(tempPatientData)).unwrap();
//         setIsEditing(false);
//         setValidationErrors({}); // Clear any previous errors on successful save
//         console.log("Patient profile updated successfully!");
//       } catch (rejectedValueOrSerializedError) {
//         console.error("Failed to update patient profile:", rejectedValueOrSerializedError);
//         // Display API error to the user
//         setValidationErrors({ apiError: rejectedValueOrSerializedError || 'Failed to save profile.' });
//       }
//     } else {
//       console.log("Validation failed. Please fill in all required fields correctly.");
//     }
//   };

//   // Handler for Cancel button
//   const handleCancel = () => {
//     setTempPatientData(patientData); // Revert temporary data to the original from Redux
//     setIsEditing(false);
//     setValidationErrors({}); // Clear any errors if canceling
//   };

//   return (
//     <div className="my-5 container" >
//       <div className="justify-content-center row">
//         <div className='col-md-10'>
//           <Card className="shadow-lg border-0">
//             <Card.Header className="text-white py-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--first-color)' }}>
//               <h4 className="mb-0">
//                 Patient Profile
//               </h4>
//               {/* Edit/Save/Cancel Button */}
//               {!isEditing ? (
//                 <Button variant="outline-light" onClick={() => {
//                   setIsEditing(true);
//                   // Ensure tempPatientData is a fresh copy of current patientData
//                   setTempPatientData({ ...patientData });
//                   setValidationErrors({}); // Clear errors when starting edit
//                 }}>
//                   Edit Profile
//                   </Button>
//               ) : (
//                 <div>
//                   <Button variant="success" className="me-2" type="submit" form="patientProfileForm" disabled={isLoading}>
//                     {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
//                   </Button>
//                   <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
//                     Cancel
//                   </Button>
//                 </div>
//               )}
//             </Card.Header>
//             <Card.Body className="p-4">
//               {/* Display API-level error if any */}
//               {error && <Alert variant="danger">{error}</Alert>}
//               {validationErrors.apiError && <Alert variant="danger">{validationErrors.apiError}</Alert>}

//               {/* Wrap your content in a Form component and link it to handleSubmit */}
//               <Form id="patientProfileForm" onSubmit={handleSubmit}>
//                 <div className='row'>
//                   {/* Basic Information Section */}
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
//                                   value={tempPatientData.firstName || ''}
//                                   onChange={handleChange}
//                                   className="mb-2"
//                                   required
//                                   isInvalid={!!validationErrors.firstName}
//                                 />
//                                 {validationErrors.firstName && <Form.Text className="text-danger">{validationErrors.firstName}</Form.Text>}
//                                 <Form.Control
//                                   type="text"
//                                   name="lastName"
//                                   value={tempPatientData.lastName || ''}
//                                   onChange={handleChange}
//                                   required
//                                   isInvalid={!!validationErrors.lastName}
//                                 />
//                                 {validationErrors.lastName && <Form.Text className="text-danger">{validationErrors.lastName}</Form.Text>}
//                               </>
//                             ) : (
//                               `${patientData.firstName || ''} ${patientData.lastName || ''}`
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Date of Birth:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="date"
//                                 name="dateOfBirth"
//                                 value={tempPatientData.dateOfBirth ? tempPatientData.dateOfBirth.split('T')[0] : ''}
//                                 onChange={handleChange}
//                               />
//                             ) : (
//                               patientData.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString() : 'N/A'
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Gender:</span>
//                             {isEditing ? (
//                               <Form.Select
//                                 name="gender"
//                                 value={tempPatientData.gender || ''}
//                                 onChange={handleChange}
//                               >
//                                 <option value="">Select Gender</option>
//                                 <option value="Male">Male</option>
//                                 <option value="Female">Female</option>
//                               </Form.Select>
//                             ) : (
//                               patientData.gender || 'N/A'
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Email:</span>
//                             {patientData.email || 'N/A'}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Phone Number:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="phoneNumber"
//                                 value={tempPatientData.phoneNumber || ''}
//                                 onChange={handleChange}
//                               />
//                             ) : (
//                               patientData.phoneNumber || 'N/A'
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                   {/* Medical Information Section */}
//                   <div className='col-md-6'>
//                     <Card className="h-100">
//                       <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Medical Information</Card.Header>
//                       <Card.Body>
//                         <ListGroup variant="flush">
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Height:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control
//                                   type="number"
//                                   name="height"
//                                   value={tempPatientData.height || ''}
//                                   onChange={handleChange}
//                                   step="0.1"
//                                   required
//                                   isInvalid={!!validationErrors.height}
//                                 />
//                                 {validationErrors.height && <Form.Text className="text-danger">{validationErrors.height}</Form.Text>}
//                               </>
//                             ) : (
//                               `${patientData.height || 'N/A'} cm`
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Weight:</span>
//                             {isEditing ? (
//                               <>
//                                 <Form.Control
//                                   type="number"
//                                   name="weight"
//                                   value={tempPatientData.weight || ''}
//                                   onChange={handleChange}
//                                   step="0.1"
//                                   required
//                                   isInvalid={!!validationErrors.weight}
//                                 />
//                                 {validationErrors.weight && <Form.Text className="text-danger">{validationErrors.weight}</Form.Text>}
//                               </>
//                             ) : (
//                               `${patientData.weight || 'N/A'} kg`
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Blood Type:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 type="text"
//                                 name="bloodType"
//                                 value={tempPatientData.bloodType || ''}
//                                 onChange={handleChange}
//                               />
//                             ) : (
//                               patientData.bloodType || 'N/A'
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Allergies:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 as="textarea"
//                                 name="allergies"
//                                 value={tempPatientData.allergies || ''}
//                                 onChange={handleChange}
//                                 rows={2}
//                               />
//                             ) : (
//                               patientData.allergies || 'N/A'
//                             )}
//                           </ListGroup.Item>
//                           <ListGroup.Item>
//                             <span className='fw-bolder pe-1'>Medical History:</span>
//                             {isEditing ? (
//                               <Form.Control
//                                 as="textarea"
//                                 name="medicalHistory"
//                                 value={tempPatientData.medicalHistory || ''}
//                                 onChange={handleChange}
//                                 rows={2}
//                               />
//                             ) : (
//                               patientData.medicalHistory || 'N/A'
//                             )}
//                           </ListGroup.Item>
//                         </ListGroup>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }


















import React, { useState, useEffect, useRef } from 'react';
import { Card, ListGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientProfile, updatePatientProfile, resetPatientProfileStatus } from '../../Redux/patientProfileReducer';
import { useNavigate } from 'react-router-dom';

export default function PatientProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: patientData, status, error } = useSelector((state) => state.patientProfile);
    const { isAuthenticated, authStatus, user } = useSelector((state) => state.auth); // أضف user هنا
    const [isEditing, setIsEditing] = useState(false);
    const [tempPatientData, setTempPatientData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const isLoading = status === 'loading';
    const hasFetched = useRef(false);

    useEffect(() => {
        console.log("PatientProfile useEffect 1: isAuthenticated:", isAuthenticated, "authStatus:", authStatus, "patientData.email:", patientData.email, "status (profile):", status);

        // التأكد من أن المستخدم مسجل الدخول قبل محاولة جلب البروفايل
        if (!isAuthenticated || authStatus !== 'succeeded') {
            console.log("PatientProfile: Not authenticated or auth not succeeded, navigating to login.");
            navigate('/login');
            return; // توقف التنفيذ هنا
        }

        // فقط اجلب بيانات البروفايل إذا لم يتم جلبها بعد وكان المكون ليس في حالة تحميل
        // و user.email (الموجود الآن في حالة الـ Redux بعد اللوجين) موجود
        if (!hasFetched.current && (!patientData || !patientData.email) && !isLoading && status === 'idle' && user?.email) {
            console.log("PatientProfile: Attempting to fetch patient profile for email:", user.email);
            dispatch(fetchPatientProfile());
            hasFetched.current = true; // لمنع الجلب المتكرر
        } else if (hasFetched.current && patientData && patientData.email) {
            // بمجرد أن يتم جلب البيانات بنجاح، يمكنك إعادة تعيين hasFetched.current إلى false إذا أردت جلبها مرة أخرى عند أي تحديث مستقبلي (مثلاً عند تعديل البروفايل)
            // ولكن للحفاظ على الأداء، يمكن تركه true
            // hasFetched.current = false; // إذا أردت إعادة الجلب في كل مرة يزور فيها الصفحة مثلاً
        }

    }, [dispatch, authStatus, isAuthenticated, patientData, isLoading, status, navigate, user?.email]); // أضف user.email كـ dependency

    useEffect(() => {
        if (patientData && Object.keys(patientData).length > 0) {
            setTempPatientData(patientData);
        }
    }, [patientData]);

    useEffect(() => {
        return () => {
            dispatch(resetPatientProfileStatus());
        };
    }, [dispatch]);

    // ... (باقي الكود لم يتغير)
    // العرض بناءً على حالة التحميل والفشل
    if (isLoading && (!patientData || Object.keys(patientData).length === 0 || !patientData.email)) {
        return (
            <div className="my-5 text-center container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading Patient Profile...</span>
                </Spinner>
                <p className="text-muted mt-2">Loading patient profile...</p>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="my-5 text-center container">
                <Alert variant="danger">
                    {error || "Failed to load patient profile."}
                    {error && error.includes('Session expired') ? (
                        <Button variant="link" onClick={() => navigate('/login')}>Log In</Button>
                    ) : (
                        <Button variant="link" onClick={() => {
                            dispatch(fetchPatientProfile());
                            hasFetched.current = false; // اسمح بإعادة المحاولة
                        }}>Try Again</Button>
                    )}
                </Alert>
            </div>
        );
    }

    // إذا لم يتم العثور على بيانات بعد التحميل
    if (!patientData || Object.keys(patientData).length === 0 || !patientData.email) {
        // يمكنك هنا عرض رسالة تدعو المستخدم لإكمال بياناته
        // ويمكننا استخدام tempPatientData لملء الإيميل إذا كان موجودًا في الـ Redux user object
        const initialEmail = user?.email || ''; // الحصول على الإيميل من user object
        return (
            <div className="my-5 text-center container">
                <p className="text-muted">No patient profile data available. Please complete your profile.</p>
                <Button variant="primary" onClick={() => {
                    setIsEditing(true);
                    setTempPatientData(prev => ({ ...prev, email: initialEmail })); // تهيئة الإيميل في النموذج
                }}>
                    Complete Profile
                </Button>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempPatientData({
            ...tempPatientData,
            [name]: value,
        });
        if (validationErrors[name]) {
            setValidationErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!tempPatientData.firstName || tempPatientData.firstName.trim() === '') {
            newErrors.firstName = 'First Name is required.';
        }
        if (!tempPatientData.lastName || tempPatientData.lastName.trim() === '') {
            newErrors.lastName = 'Last Name is required.';
        }
        if (!tempPatientData.height || parseFloat(tempPatientData.height) <= 0) {
            newErrors.height = 'Height is required and must be a positive number.';
        }
        if (!tempPatientData.weight || parseFloat(tempPatientData.weight) <= 0) {
            newErrors.weight = 'Weight is required and must be a positive number.';
        }
        setValidationErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await dispatch(updatePatientProfile(tempPatientData)).unwrap();
                setIsEditing(false);
                setValidationErrors({});
            } catch (rejectedValueOrSerializedError) {
                console.error("Failed to update patient profile:", rejectedValueOrSerializedError);
                setValidationErrors({ apiError: rejectedValueOrSerializedError || 'Failed to save profile.' });
            }
        }
    };

    const handleCancel = () => {
        setTempPatientData(patientData);
        setIsEditing(false);
        setValidationErrors({});
    };

    return (
        <div className="my-5 container">
            <div className="justify-content-center row">
                <div className='col-md-10'>
                    <Card className="shadow-lg border-0">
                        <Card.Header className="text-white py-3 d-flex justify-content-between align-items-center" style={{ background: 'var(--first-color)' }}>
                            <h4 className="mb-0">Patient Profile</h4>
                            {!isEditing ? (
                                <Button variant="outline-light" onClick={() => {
                                    setIsEditing(true);
                                    setTempPatientData({ ...patientData });
                                    setValidationErrors({});
                                }}>
                                    Edit Profile
                                </Button>
                            ) : (
                                <div>
                                    <Button variant="success" className="me-2" type="submit" form="patientProfileForm" disabled={isLoading}>
                                        {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
                                    </Button>
                                    <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </Card.Header>
                        <Card.Body className="p-4">
                            {validationErrors.apiError && <Alert variant="danger">{validationErrors.apiError}</Alert>}
                            <Form id="patientProfileForm" onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className="mb-4 mb-md-0 col-md-6">
                                        <Card className="h-100">
                                            <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Basic Information</Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Full Name:</span>
                                                        {isEditing ? (
                                                            <>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="firstName"
                                                                    value={tempPatientData.firstName || ''}
                                                                    onChange={handleChange}
                                                                    className="mb-2"
                                                                    required
                                                                    isInvalid={!!validationErrors.firstName}
                                                                />
                                                                {validationErrors.firstName && <Form.Text className="text-danger">{validationErrors.firstName}</Form.Text>}
                                                                <Form.Control
                                                                    type="text"
                                                                    name="lastName"
                                                                    value={tempPatientData.lastName || ''}
                                                                    onChange={handleChange}
                                                                    required
                                                                    isInvalid={!!validationErrors.lastName}
                                                                />
                                                                {validationErrors.lastName && <Form.Text className="text-danger">{validationErrors.lastName}</Form.Text>}
                                                            </>
                                                        ) : (
                                                            `${patientData.firstName || ''} ${patientData.lastName || ''}`
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Date of Birth:</span>
                                                        {isEditing ? (
                                                            <Form.Control
                                                                type="date"
                                                                name="dateOfBirth"
                                                                value={tempPatientData.dateOfBirth ? tempPatientData.dateOfBirth.split('T')[0] : ''}
                                                                onChange={handleChange}
                                                            />
                                                        ) : (
                                                            patientData.dateOfBirth ? new Date(patientData.dateOfBirth).toLocaleDateString() : 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Gender:</span>
                                                        {isEditing ? (
                                                            <Form.Select
                                                                name="gender"
                                                                value={tempPatientData.gender || ''}
                                                                onChange={handleChange}
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </Form.Select>
                                                        ) : (
                                                            patientData.gender || 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Email:</span>
                                                        {/* عرض الإيميل دائمًا من patientData */}
                                                        {patientData.email || 'N/A'}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Phone Number:</span>
                                                        {isEditing ? (
                                                            <Form.Control
                                                                type="text"
                                                                name="phoneNumber"
                                                                value={tempPatientData.phoneNumber || ''}
                                                                onChange={handleChange}
                                                            />
                                                        ) : (
                                                            patientData.phoneNumber || 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className='col-md-6'>
                                        <Card className="h-100">
                                            <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Medical Information</Card.Header>
                                            <Card.Body>
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Height:</span>
                                                        {isEditing ? (
                                                            <>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="height"
                                                                    value={tempPatientData.height || ''}
                                                                    onChange={handleChange}
                                                                    step="0.1"
                                                                    required
                                                                    isInvalid={!!validationErrors.height}
                                                                />
                                                                {validationErrors.height && <Form.Text className="text-danger">{validationErrors.height}</Form.Text>}
                                                            </>
                                                        ) : (
                                                            `${patientData.height || 'N/A'} cm`
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Weight:</span>
                                                        {isEditing ? (
                                                            <>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="weight"
                                                                    value={tempPatientData.weight || ''}
                                                                    onChange={handleChange}
                                                                    step="0.1"
                                                                    required
                                                                    isInvalid={!!validationErrors.weight}
                                                                />
                                                                {validationErrors.weight && <Form.Text className="text-danger">{validationErrors.weight}</Form.Text>}
                                                            </>
                                                        ) : (
                                                            `${patientData.weight || 'N/A'} kg`
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Blood Type:</span>
                                                        {isEditing ? (
                                                            <Form.Control
                                                                type="text"
                                                                name="bloodType"
                                                                value={tempPatientData.bloodType || ''}
                                                                onChange={handleChange}
                                                            />
                                                        ) : (
                                                            patientData.bloodType || 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Allergies:</span>
                                                        {isEditing ? (
                                                            <Form.Control
                                                                as="textarea"
                                                                name="allergies"
                                                                value={tempPatientData.allergies || ''}
                                                                onChange={handleChange}
                                                                rows={2}
                                                            />
                                                        ) : (
                                                            patientData.allergies || 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <span className='fw-bolder pe-1'>Medical History:</span>
                                                        {isEditing ? (
                                                            <Form.Control
                                                                as="textarea"
                                                                name="medicalHistory"
                                                                value={tempPatientData.medicalHistory || ''}
                                                                onChange={handleChange}
                                                                rows={2}
                                                            />
                                                        ) : (
                                                            patientData.medicalHistory || 'N/A'
                                                        )}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}