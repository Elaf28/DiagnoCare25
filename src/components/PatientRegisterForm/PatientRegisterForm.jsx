import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerPatient, resetAuthStatus } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

const patientSchema = z.object({
  firstName: z.string().nonempty('First Name is required').min(3, 'First Name must contain at least 3 character(s)'),
  lastName: z.string().nonempty('Last Name is required').min(3, 'Last Name must contain at least 3 character(s)'),
  gender: z.enum(['male', 'female'], { message: 'Please select a gender' }),
  dateOfBirth: z.string().nonempty('Date of Birth is required').refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date <= new Date();
  }, 'Date of Birth cannot be in the future or invalid'),
  email: z.string().email('Invalid email format').nonempty('Email is required'),
  phoneNumber: z.string().regex(/^\+?[0-9]{7,15}$/, { message: 'Invalid phone number format' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/, {
      message: 'Password must contain at least one letter (uppercase or lowercase), one number, and one special character.'
    }),
  height: z.preprocess(
    (val) => Number(val),
    z.number().positive({ message: 'Height must be a positive number' })
  ),
  weight: z.preprocess(
    (val) => Number(val),
    z.number().positive({ message: 'Weight must be a positive number' })
  ),
  bloodType: z.string().min(1, { message: 'Blood type is required' }),
  allergies: z.string().nonempty('Allergies is required'),
  medicalHistory: z.string().nonempty('Medical History is required').max(350)
});

export default function PatientRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'male',
      dateOfBirth: '',
      email: '',
      phoneNumber: '',
      password: '',
      height: '',
      weight: '',
      bloodType: '',
      allergies: '',
      medicalHistory: '',
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status} = useSelector((state) => state.auth);
  const isLoading = status === 'loading';

  const onSubmit = async (data) => {
    console.log('Patient Registration Data:', data);

    try {
      await dispatch(registerPatient(data)).unwrap();
      navigate('/login');
    } catch (err) {
      console.error('Patient registration failed:', err);
      dispatch(resetAuthStatus());
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container patient_register_container'>
          <div className='row d-flex align-items-center justify-content-around'>
            {/* First Name */}
            <div className="form-group col-lg-5 col-md-6">
              <label className='register-label' htmlFor="firstName">First Name</label>
              <div className='register-input-group'>
                <input type="text" id="firstName" className='form-control' {...register('firstName')} />
              </div>
              {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="lastName" className='register-label'>Last Name</label>
              <div className='register-input-group'>
                <input type="text" id="lastName" className='form-control' {...register('lastName')} />
              </div>
              {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </div>
            {/* Gender */}
            <div className='col-lg-5 col-md-6'>
              <label className='register-label'>Gender</label>
              <div className="form-check my-1">
                <input className="form-check-input" type="radio" id='male' value="male" {...register('gender')} />
                <label className="form-check-label" htmlFor='male'>Male</label>
              </div>
              <div className="form-check my-1">
                <input className="form-check-input" type="radio" id='female' value="female" {...register('gender')} />
                <label className="form-check-label" htmlFor='female'>Female</label>
              </div>
              {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
            </div>
            {/* Date of Birth */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="dateOfBirth" className='register-label'>Date of Birth</label>
              <div className='register-input-group'>
                <input type="date" id="dateOfBirth" className='form-control' {...register('dateOfBirth')} />
              </div>
              {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
            </div>
            {/* Email */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="email" className='register-label'>Email</label>
              <div className='register-input-group'>
                <input type="email" id="email" className='form-control' {...register('email')} />
              </div>
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            {/* Phone Number */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="phoneNumber" className='register-label'>Phone Number</label>
              <div className='register-input-group'>
                <input type="tel" id="phoneNumber" className='form-control' {...register('phoneNumber')} />
              </div>
              {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="password" className='register-label'>Password</label>
              <div className='register-input-group'>
                <input type="password" id="password" className='form-control' {...register('password')} />
              </div>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            {/* Height */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="height" className='register-label'>Height (cm)</label>
              <div className='register-input-group'>
                <input type="number" id="height" step="0.1" className='form-control' {...register('height')} />
              </div>
              {errors.height && <p className="text-danger">{errors.height.message}</p>}
            </div>
            {/* Weight */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="weight" className='register-label'>Weight (kg)</label>
              <div className='register-input-group'>
                <input type="number" id="weight" step="0.1" className='form-control' {...register('weight')} />
              </div>
              {errors.weight && <p className="text-danger">{errors.weight.message}</p>}
            </div>

            {/* Blood Type */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="bloodType" className='register-label'>Blood Type</label>
              <div className='register-input-group'>
                <input type="text" id="bloodType" className='form-control' {...register('bloodType')} />
              </div>
              {errors.bloodType && <p className="text-danger">{errors.bloodType.message}</p>}
            </div>
            {/* Allergies */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="allergies" className='register-label'>Allergies</label>
              <div className='register-input-group'>
                <textarea id="allergies" className='form-control' {...register('allergies')} />
              </div>
              {errors.allergies && <p className="text-danger">{errors.allergies.message}</p>}
            </div>

            {/* Medical History */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="medicalHistory" className='register-label'>Medical History</label>
              <div className='register-input-group'>
                <textarea id="medicalHistory" className='form-control' {...register('medicalHistory')} />
              </div>
              {errors.medicalHistory && <p className="text-danger">{errors.medicalHistory.message}</p>}
            </div>
          </div>
          <div className='container'>
            <button type="submit" className="register-submit-button" disabled={isLoading}>
              {isLoading ? (
                <div><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Registering...</span></div>
              ) : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}