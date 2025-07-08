import React, { useState, useEffect, useRef } from 'react';
import { Card, ListGroup, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientProfile, updatePatientProfile, resetPatientProfileStatus, setPatientProfileData } from '../../Redux/patientProfileReducer';
import { useNavigate } from 'react-router-dom';

export default function PatientProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: patientData, status, error } = useSelector((state) => state.patientProfile);
    const { isAuthenticated, authStatus, user } = useSelector((state) => state.auth); 
    const [isEditing, setIsEditing] = useState(false);
    const [tempPatientData, setTempPatientData] = useState({});
    const [validationErrors, setValidationErrors] = useState({});
    const isLoading = status === 'loading';
    const hasFetched = useRef(false);

    useEffect(() => {
        console.log("PatientProfile useEffect 1: isAuthenticated:", isAuthenticated, "authStatus:", authStatus, "patientData.email:", patientData.email, "status (profile):", status);

        if (!isAuthenticated || !user || !user.email) {
            console.log("PatientProfile: Not authenticated or auth not succeeded, navigating to login.");
            navigate('/login');
            return; 
        }

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
                            hasFetched.current = false; 
                        }}>Try Again</Button>
                    )}
                </Alert>
            </div>
        );
    }

    if (!patientData || Object.keys(patientData).length === 0 || !patientData.email) {
        const initialEmail = user?.email || ''; 
        return (
            <div className="my-5 text-center container">
                <p className="text-muted">No patient profile data available. Please complete your profile.</p>
                <Button variant="primary" onClick={() => {
                    setIsEditing(true);
                    setTempPatientData(prev => ({ ...prev, email: initialEmail })); 
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
                dispatch(setPatientProfileData(tempPatientData)); 

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