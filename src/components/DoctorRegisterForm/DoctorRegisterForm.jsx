import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchSpecialties } from '../../Redux/SpecialtiesSlice';

export default function DoctorRegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: specialties, status: specialtiesStatus } = useSelector((state) => state.specialties);
  const { status } = useSelector((state) => state.auth);
  const isLoading = status === 'loading';
  useEffect(() => {
  if (specialtiesStatus === 'idle') {
    dispatch(fetchSpecialties());
  }
}, [dispatch, specialtiesStatus]);
  const countryCodes = [
    { code: '+20', short: 'EG' },
    { code: '+966', short: 'SA' },
    { code: '+971', short: 'AE' },
    { code: '+964', short: 'IQ' },
    { code: '+962', short: 'JO' },
    { code: '+961', short: 'LB' },
    { code: '+212', short: 'MA' },
    { code: '+218', short: 'LY' },
    { code: '+1', short: 'US' },
    { code: '+44', short: 'UK' },
  ];

  const [countryCode, setCountryCode] = React.useState('+20');

  const schema = z.object({
    firstName: z.string().nonempty('First Name is required').min(3),
    lastName: z.string().nonempty('Last Name is required').min(3),
    gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
    dateOfBirth: z.string().nonempty('Date of Birth is required').refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= new Date();
    }, 'Invalid or future date'),
    email: z.string().email('Invalid email').nonempty('Email is required'),
    phoneNumber: z.string().regex(/^[0-9]+$/, 'Only digits').min(10, 'Phone number must be at least 10 digits'),
    address1: z.string().nonempty('Address 1 is required').max(255),
    address2: z.string().nonempty('Address 2 is required').max(255),
    password: z.string().min(8, 'Password must be at least 8 characters').regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/,
      'Password must contain letters, numbers, and special characters'
    ),
    specialization: z.string().nonempty('Specialization is required'),
    professionalTitle: z.string().nonempty('Professional Title is required'),
    yearsOfExperience: z.preprocess((val) => Number(val), z.number().int().min(0, 'Must be 0 or greater')),
    fees: z.string().nonempty('Fees is required'),
    workplace: z.string().nonempty('Workplace is required'),
    aboutDoctor: z.string().nonempty('About Doctor is required').max(300),
    licenseImgUrl: z.custom((value) => value instanceof FileList && value.length > 0, {
      message: 'Professional License is required',
    }),
    qualificationImgUrl: z.custom((value) => value instanceof FileList && value.length > 0, {
      message: 'Qualifications image is required',
    }),
    doctorImgUrl: z.custom((value) => value instanceof FileList && value.length > 0, {
      message: 'Image is required',
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: 'male',
    },
  });

  const imageField = watch('doctorImgUrl');
  const licenseFileField = watch('licenseImgUrl');
  const qualificationFileField = watch('qualificationImgUrl');

  const getFileName = (fileField) => (fileField?.length > 0 ? fileField[0].name : 'No file chosen');

  const onSubmit = async (data) => {
    if (!countryCode || !countryCode.startsWith('+')) {
      Swal.fire({ icon: 'warning', title: 'Invalid Country Code', text: 'Please select a valid country code.' });
      return;
  }

  const phone = `${countryCode.replace('+', '')}${data.phoneNumber}`;
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
  if (key === "licenseImgUrl") {
    formData.append("LicenseImg", value[0]);
  } else if (key === "qualificationImgUrl") {
    formData.append("QualificationImg", value[0]);
  } else if (key === "doctorImgUrl") {
    formData.append("DoctorImg", value[0]);
  } else if (key === "phoneNumber") {
    formData.append("PhoneNumber", phone);
  } else if (key === "yearsOfExperience") {
    formData.append("YearsOfExperience", Number(value));
  } else if (key === "fees") {
    formData.append("Fees", Number(value));
  } else {
    formData.append(key.charAt(0).toUpperCase() + key.slice(1), String(value).trim());
  }
}

  console.log('Form Data being sent:');
  for (let [key, val] of formData.entries()) {
    console.log(`${key}:`, val);
  }

  try {
    const message = await dispatch(registerDoctor(formData)).unwrap();
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: message || 'Please log in to continue.',
      confirmButtonColor: '#3085d6',
    }).then(() => navigate('/login'));
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: err?.message || 'An unknown error occurred.',
      confirmButtonColor: '#d33',
    });
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container">
      <div className='container'>
          <div className='row d-flex align-items-center justify-content-around'>
            {/* First Name */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="firstName" className='register-label'>First Name</label>
              <div className='register-input-group'>
                <input type="text" id="firstName" className='form-control' {...register("firstName")} />
              </div>
              {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="lastName" className='register-label '>Last Name</label>
              <div className='register-input-group'>
                <input type="text" id="lastName" className='form-control' {...register("lastName")} />
              </div>
              {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </div>

            {/* image */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="image" className='register-label'>Image</label>
              <div className='register-input-group'>
                <input type="file" className='form-control' id="image" {...register("doctorImgUrl")} />
              </div>
              <p className="text-muted mt-1">Selected image: {getFileName(imageField)}</p>
              {errors.doctorImgUrl && <p className="text-danger">{errors.doctorImgUrl.message}</p>}
            </div>
            {/* Gender */}
            <div className='col-lg-5 col-md-6'>
              <label className='register-label'>Gender</label>
              <div className="form-check my-1">
                <input className="form-check-input" type="radio" id='male' value="male" {...register("gender")} />
                <label className="form-check-label " htmlFor='male'>Male</label>
                </div>
              <div className="form-check my-1">
                <input className="form-check-input" type="radio" id='female' value="female" {...register("gender")} />
                <label className="form-check-label" htmlFor='female'>Female</label>
              </div>
              {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
            </div>
            {/* Date of Birth */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="dateOfBirth" className='register-label'>Date of Birth</label>
              <div className='register-input-group'>
                <input type="date" id="dateOfBirth" className='form-control' {...register("dateOfBirth")} />
              </div>
              {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Email */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="email" className='register-label'>Email</label>
              <div className='register-input-group'>
                <input type="email" id="email" className='form-control' {...register("email")} />
              </div>
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            {/* Phone Number */}
            <div className="form-group col-lg-5 col-md-6">
            <label htmlFor="phoneNumber" className='register-label'>Phone Number</label>
            <div className='register-input-group d-flex'>
              <div >
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="form-select me-2"
                  style={{ maxWidth: '110px' }}
                >
                  {countryCodes.map(({ code, short }) => (
                    <option key={code} value={code}>
                      {short} {code}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="tel"
                id="phoneNumber"
                className='form-control'
                placeholder="Enter phone number"
                {...register("phoneNumber")}
              />
            </div>
            {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
          </div>
            {/* Address1 */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="address1" className='register-label'>Address 1</label>
              <div className='register-input-group'>
                <input type="text" id="address1" placeholder='Enter your Country and Governorate/State' className='form-control' {...register("address1")} />
              </div>
              {errors.address1 && <p className="text-danger">{errors.address1.message}</p>}
            </div>

            {/* Address2 */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="address2" className='register-label'>Address 2</label>
              <div className='register-input-group'>
                <input type="text" id="address2" placeholder='Enter your Street Name and Building/House Number' className='form-control' {...register("address2")} />
              </div>
              {errors.address2 && <p className="text-danger">{errors.address2.message}</p>}
            </div>

            {/* Password */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="password" className='register-label'>Password</label>
              <div className='register-input-group'>
                <input type="password" id="password" className='form-control' {...register("password")} />
              </div>
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
            {/* Specialization */}
            <div className='col-lg-5 col-md-6'>
              <label htmlFor="specialization" className='register-label'>Specialization</label>
              <div className='register-input-group'>
                <select id="specialization" style={{ padding: '11px' }} className="form-select" {...register("specialization")}>
                  <option value="">--Select Specialization--</option>
                  {specialties.map((item) => (
                    <option key={item.specialtyId} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.specialization && <p className="text-danger">{errors.specialization.message}</p>}
            </div>
            {/* Professional Title */}
            <div className='col-lg-5 col-md-6'>
              <label htmlFor="professionalTitle" className='register-label'>Professional Title</label>
              <div className='register-input-group'>
                <select id="professionalTitle" style={{ 'padding': '11px' }} className="form-select" {...register("professionalTitle")}>
                  <option value="">--Select Title--</option>
                  <option value="Resident"> Resident</option>
                  <option value="General Practitioner"> General Practitioner</option>
                  <option value="Specialist"> Specialist</option>
                  <option value="Consultant"> Consultant</option>
                  <option value="Professor"> Professor</option>
                </select>
              </div>
              {errors.professionalTitle && <p className="text-danger">{errors.professionalTitle.message}</p>}
            </div>
            {/* Years Of Experience */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="yearsOfExperience" className='register-label'>Years Of Experience</label>
              <div className='register-input-group'>
                <input type="number" id="yearsOfExperience" className='form-control' {...register("yearsOfExperience")} />
              </div>
              {errors.yearsOfExperience && <p className="text-danger">{errors.yearsOfExperience.message}</p>}
            </div>
            {/* fees */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="fees" className='register-label '>Fees</label>
              <div className='register-input-group'>
                <input type="text" id="fees" className='form-control' {...register("fees")} />
              </div>
              {errors.fees && <p className="text-danger">{errors.fees.message}</p>}
            </div>

            {/* Work Places */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="workPlaces" className='register-label '>Work Places</label>
              <div className='register-input-group'>
                <textarea id="workPlaces" className='form-control' {...register("workplace")} />
              </div>
              {errors.workplace && <p className="text-danger">{errors.workplace.message}</p>}
            </div>

            {/* About doctor */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="aboutDoctor" className='register-label '>About doctor</label>
              <div className='register-input-group'>
                <textarea id="aboutDoctor" className='form-control' {...register("aboutDoctor")} />
              </div>
              {errors.aboutDoctor && <p className="text-danger">{errors.aboutDoctor.message}</p>}
            </div>
            {/* Professional License */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="professionalLicense" className='register-label'>Professional License</label>
              <div className='register-input-group'>
                <input type="file" className='form-control' id="professionalLicense" {...register("licenseImgUrl")} />
              </div>
              <p className="text-muted mt-1">Selected file: {getFileName(licenseFileField)}</p>
              {errors.licenseImgUrl && <p className="text-danger">{errors.licenseImgUrl.message}</p>}
            </div>

            {/* qualificationImgUrl */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="qualificationImgUrl" className='register-label'>Qualifications</label>
              <div className='register-input-group'>
                <input type="file" className='form-control' id="qualificationImgUrl" {...register("qualificationImgUrl")} />
              </div>
              <p className="text-muted mt-1">Selected file: {getFileName(qualificationFileField)}</p>
              {errors.qualificationImgUrl && <p className="text-danger">{errors.qualificationImgUrl.message}</p>}
            </div>
          </div>
          </div>
      <div className='container'>
            <button type="submit" className="register-submit-button" disabled={isLoading}>
              {isLoading ? (
                <div><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Registering...</span></div>
              ) : 'Sign Up'}
            </button>
          </div>
    </form>
  );
}
  