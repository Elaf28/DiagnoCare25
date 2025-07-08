import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorProfile, updateDoctorProfile, resetProfileStatus } from '../../Redux/DoctorProfileSlice';
import { FaRegFile } from 'react-icons/fa';
import WorkingHours from '../WorkingHoures/WorkingHoures';
import defaultDoctor from '../../assets/images/default-doctor.png';
import axiosInstance from '../../api/axiosInstance'; // ⭐ لإحضار الإحصائيات

export default function DoctorProfile() {
  const dispatch = useDispatch();
  const { data: doctorData, status, error } = useSelector((state) => state.doctorProfile);

  const [isEditing, setIsEditing] = useState(false);
  const [tempDoctorData, setTempDoctorData] = useState({});
  const [stats, setStats] = useState({ appointmentsCount: 0, totalEarnings: 0 });

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchDoctorProfile()).then((res) => {
      if (res.payload) {
        setTempDoctorData(res.payload);
      }
    });

    // ✅ جلب الإحصائيات
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get('/Doctors/earnings');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch doctor stats:', err);
      }
    };

    fetchStats();

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
      await dispatch(fetchDoctorProfile());
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
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '5px solid var(--first-color)',
                  margin: '0 auto',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <img
                    src={displayData.doctorImgUrl || defaultDoctor}
                    alt="Doctor Profile"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h4 style={{ color: 'var(--first-color)' }}>Dr. {displayData.fullName}</h4>

                <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                  <Card style={{ minWidth: '200px' }} className="text-center border-success shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">Total Appointments</h6>
                      <h4 className="text-success">{stats.confirmedAppointmentsCount}</h4>
                    </Card.Body>
                  </Card>

                  <Card style={{ minWidth: '200px' }} className="text-center border-primary shadow-sm">
                    <Card.Body>
                      <h6 className="text-muted">Total Earnings</h6>
                      <h4 className="text-primary">${stats.totalEarnings}</h4>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              <Form id="doctorProfileForm" onSubmit={handleSubmit}>
                <div className='row'>
                  {/* معلومات أساسية */}
                  <div className="mb-4 mb-md-0 col-md-6">
                    <Card className="h-100">
                      <Card.Header className="bg-light fs-5 fw-semibold" style={{ color: 'var(--first-color)' }}>Basic Information</Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item><strong>Full Name:</strong> {displayData.fullName}</ListGroup.Item>
                          <ListGroup.Item><strong>Status:</strong>
                            <span className={`badge px-3 py-2 ms-2 fs-6 ${displayData.status === 'Approved' ? 'bg-success' : displayData.status === 'Pending' ? 'bg-warning text-dark' : 'bg-danger'}`}>
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

                  {/* معلومات مهنية */}
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
                              <Form.Control type="number" name="fees" value={tempDoctorData.fees} onChange={handleChange} required />
                            ) : (
                              <span className='text-success'>${displayData.fees}</span>
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
