import React from 'react'
import { useState } from 'react';
import PatientRegisterForm from '../PatientRegisterForm/PatientRegisterForm';
import DoctorRegisterForm from '../DoctorRegisterForm/DoctorRegisterForm';
import './Register.css'; 
export default function Register() {
  const [role, setRole] = useState('patient'); 
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <>
      <div className=''>
      <div className="register-grid ">
          <div className="register-image">
              <img className='img-fluid h-100 object-fit-cover' src="/images/Screenshot 2025-05-05 230159.png" alt="" />
          </div>
          
          <div className="register-container register-form py-4">
          <div className="register-header d-flex  align-items-center justify-content-around my-3">
            <div className="user-type-selection ">
              <label className='mx-3 fs-5 fw-medium'>
                <input
                  type="radio"
                  value="patient"
                  checked={role === 'patient'}
                  onChange={handleRoleChange}
                  className="form-check-input"
                />
                Patient
              </label>
              <label className='mx-3 fs-5 fw-medium'>
                <input
                  type="radio"
                  value="doctor"
                  checked={role === 'doctor'}
                  onChange={handleRoleChange}
                  className="form-check-input"
                />
                Doctor
              </label>
            </div>
          </div>

          <div className="">
            {role === 'patient' ? (
              <PatientRegisterForm role={role}/>
            ) : (
              <DoctorRegisterForm role={role}/>
            )}
          </div>
        </div>

        </div>
      </div>
    </>
  )
}

