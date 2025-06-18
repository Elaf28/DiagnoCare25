// src/components/DoctorRegisterForm/DoctorRegisterForm.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctor } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom'; // <--- إضافة useNavigate

export default function DoctorRegisterForm() {
  const navigate = useNavigate(); // <--- استخدام useNavigate hook

  const schema = z.object({
    firstName: z.string().nonempty('First Name is required').min(3, 'First Name must contain at least 3 character(s)'),
    lastName: z.string().nonempty('Last Name is required').min(3, 'Last Name must contain at least 3 character(s)'),
    gender: z.enum(['male', 'female'], { message: 'Please select a gender' }),
    dateOfBirth: z.string().nonempty('Date of Birth is required').refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime()) && date <= new Date();
    }, 'Date of Birth cannot be in the future or invalid'),
    email: z.string().email('Invalid email format').nonempty('Email is required'),
    phoneNumber: z.string()
      .regex(/^[0-9]+$/, 'Phone number must contain only digits')
      .min(10, 'Phone number must be at least 10 digits long')
      .nonempty('Phone Number is required'),
    address1: z.string().nonempty('Country and Governorate/State are required').max(255, 'Address cannot exceed 255 characters'),
    address2: z.string().nonempty('Street Name and Building/House Number are required').max(255, 'Address cannot exceed 255 characters'),
    password: z.string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/, {
        message: 'Password must contain at least one letter (uppercase or lowercase), one number, and one special character.'
      }),
    specialization: z.string().nonempty('Specialization is required'),
    yearsOfExperience: z.preprocess(
      (val) => Number(val),
      z.number()
        .int('Years of Experience must be an integer')
        .min(0, 'Years of Experience cannot be negative')
        .nonnegative('Years of Experience must be a non-negative number')
        .refine(val => val !== null && !isNaN(val), 'Years of Experience is required and must be a number')
    ),
    fees: z.string().nonempty('Fees is required'),
    workplace: z.string().nonempty('Workplace is required'),
    aboutDoctor: z.string().nonempty('About doctor is required').max(300),

    // --- Zod Schema for Files (updated for FileList) ---
    licenseImgUrl: z.custom((value) => {
      return value instanceof FileList && value.length > 0 && value[0] instanceof File;
    }, {
      message: 'Professional License is required',
    }),
    qualificationImgUrl: z.custom((value) => {
      return value instanceof FileList && value.length > 0 && value[0] instanceof File;
    }, {
      message: 'qualifications image is required',
    }),
    doctorImgUrl: z.custom((value) => {
      return value instanceof FileList && value.length > 0 && value[0] instanceof File;
    }, {
      message: 'Image is required',
    }),
    // --- End Zod Schema for Files ---
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'male',
      email: '',
      phoneNumber: '',
      address1: '',
      address2: '',
      password: '',
      specialization: '',
      yearsOfExperience: '',
      workplace: '',
      fees: '',
      licenseImgUrl: null,
      qualificationImgUrl: null,
      doctorImgUrl: null,
      professionalTitle: '',
      aboutDoctor: '',
    }
  });

  const imageField = watch('doctorImgUrl');
  const licenseFileField = watch('licenseImgUrl');
  const qualificationImgUrlFileField = watch('qualificationImgUrl');
  const getFileName = (fileField) => {
    return fileField && fileField.length > 0 ? fileField[0].name : 'No file chosen';
  };

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth); // لم نعد بحاجة لجلب 'error' من هنا مباشرة
  const isLoading = status === 'loading';

  const onSubmit = async (data) => {
    console.log('--- Original Data object from React Hook Form (before FormData) ---');
    console.log(data);

    const formData = new FormData();

    // تعديل هنا: استخدام Object.entries لتحسين طريقة بناء FormData
    for (const [key, value] of Object.entries(data)) {
      if (['licenseImgUrl', 'qualificationImgUrl', 'doctorImgUrl'].includes(key)) {
        if (value && value.length > 0) {
          formData.append(key, value[0]); // append the actual File object
        }
      } else if (value !== null && value !== undefined) {
        // لا نحتاج لشرط 'password' هنا، المفتاح هو نفسه
        formData.append(key, String(value));
      }
    }

    console.log('--- FormData contents for Network Request ---');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].size} bytes) `: pair[1]));
    }
    console.log('-------------------------------------------');

    try {
      await dispatch(registerDoctor(formData)).unwrap();
      // إذا نجح التسجيل:
      alert('Registration successful! Please log in to continue.');
      navigate('/login'); // <--- إعادة التوجيه لصفحة تسجيل الدخول
    } catch (err) {
      console.error('Registration failed:', err);
      // استخدام رسالة الخطأ من err مباشرة
      // err هو ما تم رفضه بواسطة rejectWithValue في الـ thunk
      alert(`Registration failed: ${err || 'Unknown error'}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className='register-input-group'>
                <input type="tel" id="phoneNumber" className='form-control' {...register("phoneNumber")} />
              </div>
              {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
            </div>
            {/* Address1 */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="address" className='register-label'>Address 1</label>
              <div className='register-input-group'>
                <input type="text" id="address" placeholder='Enter your Country and Governorate/State' className='form-control' {...register("address1")} />
              </div>
              {errors.address1 && <p className="text-danger">{errors.address1.message}</p>}
            </div>

            {/* Address2 */}
            <div className="form-group col-lg-5 col-md-6">
              <label htmlFor="address" className='register-label'>Address 2</label>
              <div className='register-input-group'>
                <input type="text" id="address" placeholder='Enter your Street Name and Building/House Number' className='form-control' {...register("address2")} />
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
                <select id="specialization" style={{ 'padding': '11px' }} className="form-select" {...register("specialization")}>
                  <option value="">--Select Specialization--</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
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
              <p className="text-muted mt-1">Selected file: {getFileName(qualificationImgUrlFileField)}</p>
              {errors.qualificationImgUrl && <p className="text-danger">{errors.qualificationImgUrl.message}</p>}
            </div>
          </div>

          <button type="submit" className="register-submit-button" disabled={isLoading}>
            {isLoading ? (
              <div><span className="spinner-border spinner-border-sm" aria-hidden="true"></span><span role="status">Registering...</span></div>
            ) : 'Sign Up'}
          </button>
        </div>
      </form>
    </>
  );
}












// // src/components/DoctorRegisterForm/DoctorRegisterForm.jsx
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerDoctor } from '../../Redux/authSlice'; // تأكد من المسار والاسم الصحيح للثنك
// import { useNavigate } from 'react-router-dom';
// import { Alert, Spinner } from 'react-bootstrap'; // إضافة Alert و Spinner للاستخدام في الـ UI

// export default function DoctorRegisterForm() {
//   const navigate = useNavigate();

//   const schema = z.object({
//     firstName: z.string().nonempty('First Name is required').min(3, 'First Name must contain at least 3 character(s)'),
//     lastName: z.string().nonempty('Last Name is required').min(3, 'Last Name must contain at least 3 character(s)'),
//     gender: z.enum(['Male', 'Female'], { message: 'Please select a gender' }), // تأكد من أن القيم هنا هي نفسها التي يتوقعها الـ backend
//     dateOfBirth: z.string().nonempty('Date of Birth is required').refine((val) => {
//       const date = new Date(val);
//       // تحقق أن التاريخ صالح وأنه ليس في المستقبل
//       return !isNaN(date.getTime()) && date <= new Date();
//     }, 'Date of Birth cannot be in the future or invalid'),
//     email: z.string().email('Invalid email format').nonempty('Email is required'),
//     phoneNumber: z.string()
//       .regex(/^[0-9]+$/, 'Phone number must contain only digits')
//       .min(10, 'Phone number must be at least 10 digits long')
//       .nonempty('Phone Number is required'),
//     address1: z.string().nonempty('Country and Governorate/State are required').max(255, 'Address cannot exceed 255 characters'),
//     address2: z.string().nonempty('Street Name and Building/House Number are required').max(255, 'Address cannot exceed 255 characters'),
//     password: z.string()
//       .min(8, { message: 'Password must be at least 8 characters long.' })
//       .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]).{8,}$/, {
//         message: 'Password must contain at least one letter (uppercase or lowercase), one number, and one special character.'
//       }),
//     specialization: z.string().nonempty('Specialization is required'),
//     yearsOfExperience: z.preprocess(
//       (val) => Number(val),
//       z.number()
//         .int('Years of Experience must be an integer')
//         .min(0, 'Years of Experience cannot be negative')
//         .nonnegative('Years of Experience must be a non-negative number')
//         .refine(val => val !== null && !isNaN(val), 'Years of Experience is required and must be a number')
//     ),
//     fees: z.preprocess( // تحويل الـ fees إلى رقم لضمان صحة البيانات إذا كان الـ backend يتوقع رقم
//         (val) => Number(val),
//         z.number()
//             .min(0, 'Fees cannot be negative')
//             .nonnegative('Fees must be a non-negative number')
//             .refine(val => val !== null && !isNaN(val), 'Fees is required and must be a number')
//     ),
//     workplace: z.string().nonempty('Workplace is required'),
//     professionalTitle: z.string().nonempty('Professional Title is required'), // إضافة validation لهذا الحقل
//     aboutDoctor: z.string().nonempty('About doctor is required').max(300),

//     // --- Zod Schema for Files (updated for FileList) ---
//     // تأكد أن أسماء الحقول هنا (licenseImgUrl, qualificationImgUrl, doctorImgUrl) تتطابق مع الأسماء المتوقعة في الـ backend للـ FormData
//     // في الـ Backend، عادة ما يتم استخدام أسماء مثل 'licenseImg', 'qualificationImg', 'doctorImg' وليس '...ImgUrl' لملفات الـ Form-Data
//     // لذا، ممكن تحتاج لتغيير key عند formData.append(key, value[0]) في الـ onSubmit
//     licenseImgUrl: z.custom((value) => {
//       return value instanceof FileList && value.length > 0 && value[0] instanceof File;
//     }, {
//       message: 'Professional License is required',
//       }),
//     qualificationImgUrl: z.custom((value) => {
//       return value instanceof FileList && value.length > 0 && value[0] instanceof File;
//     }, {
//       message: 'Qualifications image is required',
//     }),
//     doctorImgUrl: z.custom((value) => {
//       return value instanceof FileList && value.length > 0 && value[0] instanceof File;
//     }, {
//       message: 'Image is required',
//     }),
//     // --- End Zod Schema for Files ---
//   });

//   const { register, handleSubmit, formState: { errors }, watch } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       dateOfBirth: '',
//       gender: 'Male', 
//       email: '',
//       phoneNumber: '',
//       address1: '',
//       address2: '',
//       password: '',
//       specialization: '',
//       yearsOfExperience: '',
//       fees: '', 
//       workplace: '',
//       professionalTitle: '', 
//       aboutDoctor: '',
//       licenseImgUrl: null,
//       qualificationImgUrl: null,
//       doctorImgUrl: null,
//     }
//   });

//   // Watch file fields for preview/name display
//   const doctorImgFile = watch('doctorImgUrl');
//   const licenseFile = watch('licenseImgUrl');
//   const qualificationFile = watch('qualificationImgUrl');

//   const getFileName = (fileField) => {
//     return fileField && fileField.length > 0 ? fileField[0].name : 'No file chosen';
//   };

//   const dispatch = useDispatch();
//   const { status,} = useSelector((state) => state.auth); // جلب 'error' من الـ slice
//   const isLoading = status === 'loading';
//   const [submissionError, setSubmissionError] = useState(null); // لإدارة الأخطاء الخاصة بالإرسال

//   const onSubmit = async (data) => {
//     setSubmissionError(null); // Clear any previous submission errors

//     console.log('--- Original Data object from React Hook Form (before FormData) ---');
//     console.log(data);

//     const formData = new FormData();

//     // Loop through all data from react-hook-form
//     for (const [key, value] of Object.entries(data)) {
//       if (key === 'doctorImgUrl'|| key ==='licenseImgUrl' || key === 'qualificationImgUrl') {
//         // Handle file inputs - append the actual File object if it exists
//         if (value && value.length > 0 && value[0] instanceof File) {
//           // IMPORTANT: The key used here for formData.append MUST match what your backend expects for the file.
//           // Example: If backend expects 'doctorImg' for doctorImgUrl, change 'key' to 'doctorImg'.
//           // Based on previous discussions, your backend expects 'doctorImg', 'licenseImg', 'qualificationImg'.
//           if (key === 'doctorImgUrl') formData.append('doctorImg', value[0]);
//           else if (key === 'licenseImgUrl') formData.append('licenseImg', value[0]);
//           else if (key === 'qualificationImgUrl') formData.append('qualificationImg', value[0]);
//         }
//       } else if (value !== null && value !== undefined) {
//         // Convert numbers to string explicitly for FormData,
//         // and append other non-file values
//         formData.append(key, String(value));
//       }
//     }

//     console.log('--- FormData contents for Network Request ---');
//     // لغرض التصحيح، يمكنك رؤية محتويات FormData
//     for (let pair of formData.entries()) {
//       console.log(pair[0] + ': ' + (pair[1] instanceof File ? `File: ${pair[1].name} (${pair[1].size} bytes)` : pair[1]));
//     }
//     console.log('-------------------------------------------');

//     try {
//       await dispatch(registerDoctor(formData)).unwrap();
//       // إذا نجح التسجيل:
//       // استخدام Alert بدلاً من alert() ليكون جزء من الـ UI
//       // بما إننا هنعيد التوجيه، ممكن نستخدم alert() مؤقتاً أو نعتمد على صفحة Pending Approval
//       alert('Registration successful! Your account is awaiting admin approval.');
//       navigate('/doctor-pending-approval'); // <--- إعادة التوجيه لصفحة قيد المراجعة
//     } catch (err) {
//       console.error('Registration failed:', err);
//       // err هو ما تم رفضه بواسطة rejectWithValue في الـ thunk (رسالة الخطأ من الـ Backend)
//       setSubmissionError(err || 'Failed to register. Please try again.');
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <div className="container my-5">
//         <div className="row d-flex justify-content-center">
//           <div className="col-lg-10">
//             <h2 className="text-center mb-4" style={{ color: 'var(--first-color)' }}>Doctor Registration</h2>
//             {submissionError && <Alert variant="danger">{submissionError}</Alert>} {/* عرض خطأ الإرسال هنا */}

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className='row d-flex align-items-center justify-content-around'>
//                 {/* First Name */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="firstName" className='register-label'>First Name</label>
//                   <div className='register-input-group'>
//                     <input type="text" id="firstName" className='form-control' {...register("firstName")} />
//                   </div>
//                   {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
//                 </div>

//                 {/* Last Name */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="lastName" className='register-label '>Last Name</label>
//                   <div className='register-input-group'>
//                     <input type="text" id="lastName" className='form-control' {...register("lastName")} />
//                   </div>
//                   {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
//                 </div>

//                 {/* image */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="doctorImgUrl" className='register-label'>Doctor Image</label>
//                   <div className='register-input-group'>
//                     <input type="file" className='form-control' id="doctorImgUrl" {...register("doctorImgUrl")} />
//                   </div>
//                   <p className="text-muted mt-1">Selected image: {getFileName(doctorImgFile)}</p>
//                   {errors.doctorImgUrl && <p className="text-danger">{errors.doctorImgUrl.message}</p>}
//                 </div>

//                 {/* Gender */}
//                 <div className='col-lg-5 col-md-6 mb-3'>
//                   <label className='register-label'>Gender</label>
//                   <div className="form-check my-1">
//                     <input className="form-check-input" type="radio" id='male' value="Male" {...register("gender")} />
//                     <label className="form-check-label " htmlFor='male'>Male</label>
//                   </div>
//                   <div className="form-check my-1">
//                     <input className="form-check-input" type="radio" id='female' value="Female" {...register("gender")} />
//                     <label className="form-check-label" htmlFor='female'>Female</label>
//                   </div>
//                   {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
//                 </div>

//                 {/* Date of Birth */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="dateOfBirth" className='register-label'>Date of Birth</label>
//                   <div className='register-input-group'>
//                     <input type="date" id="dateOfBirth" className='form-control' {...register("dateOfBirth")} />
//                   </div>
//                   {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
//                 </div>
//                 {/* Email */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="email" className='register-label'>Email</label>
//                   <div className='register-input-group'>
//                     <input type="email" id="email" className='form-control' {...register("email")} />
//                   </div>
//                   {errors.email && <p className="text-danger">{errors.email.message}</p>}
//                 </div>

//                 {/* Phone Number */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="phoneNumber" className='register-label'>Phone Number</label>
//                   <div className='register-input-group'>
//                     <input type="tel" id="phoneNumber" className='form-control' {...register("phoneNumber")} />
//                   </div>
//                   {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
//                 </div>

//                 {/* Address1 */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="address1" className='register-label'>Address 1</label> {/* تأكد من أن الـ htmlFor صحيح */}
//                   <div className='register-input-group'>
//                     <input type="text" id="address1" placeholder='Enter your Country and Governorate/State' className='form-control' {...register("address1")} />
//                   </div>
//                   {errors.address1 && <p className="text-danger">{errors.address1.message}</p>}
//                 </div>

//                 {/* Address2 */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="address2" className='register-label'>Address 2</label> {/* تأكد من أن الـ htmlFor صحيح */}
//                   <div className='register-input-group'>
//                     <input type="text" id="address2" placeholder='Enter your Street Name and Building/House Number' className='form-control' {...register("address2")} />
//                   </div>
//                   {errors.address2 && <p className="text-danger">{errors.address2.message}</p>}
//                 </div>

//                 {/* Password */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="password" className='register-label'>Password</label>
//                   <div className='register-input-group'>
//                     <input type="password" id="password" className='form-control' {...register("password")} />
//                   </div>
//                   {errors.password && <p className="text-danger">{errors.password.message}</p>}
//                 </div>

//                 {/* Specialization */}
//                 <div className='col-lg-5 col-md-6 mb-3'>
//                   <label htmlFor="specialization" className='register-label'>Specialization</label>
//                   <div className='register-input-group'>
//                     <select id="specialization" style={{ 'padding': '11px' }} className="form-select" {...register("specialization")}>
//                       <option value="">--Select Specialization--</option>
//                       <option value="cardiology">Cardiology</option>
//                       <option value="dermatology">Dermatology</option>
//                       {/* Add more specializations as needed */}
//                     </select>
//                   </div>
//                   {errors.specialization && <p className="text-danger">{errors.specialization.message}</p>}
//                 </div>

//                 {/* Professional Title */}
//                 <div className='col-lg-5 col-md-6 mb-3'>
//                   <label htmlFor="professionalTitle" className='register-label'>Professional Title</label>
//                   <div className='register-input-group'>
//                     <select id="professionalTitle" style={{ 'padding': '11px' }} className="form-select" {...register("professionalTitle")}>
//                       <option value="">--Select Title--</option>
//                       <option value="Resident">Resident</option>
//                       <option value="General Practitioner">General Practitioner</option>
//                       <option value="Specialist">Specialist</option>
//                       <option value="Consultant">Consultant</option>
//                       <option value="Professor">Professor</option>
//                     </select>
//                   </div>
//                   {errors.professionalTitle && <p className="text-danger">{errors.professionalTitle.message}</p>}
//                 </div>

//                 {/* Years Of Experience */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="yearsOfExperience" className='register-label'>Years Of Experience</label>
//                   <div className='register-input-group'>
//                     <input type="number" id="yearsOfExperience" className='form-control' {...register("yearsOfExperience")} />
//                   </div>
//                   {errors.yearsOfExperience && <p className="text-danger">{errors.yearsOfExperience.message}</p>}
//                 </div>

//                 {/* fees */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="fees" className='register-label '>Fees</label>
//                   <div className='register-input-group'>
//                     <input type="number" id="fees" className='form-control' step="0.01" {...register("fees")} /> {/* تغيير type="text" إلى "number" و step="0.01" */}
//                   </div>
//                   {errors.fees && <p className="text-danger">{errors.fees.message}</p>}
//                 </div>

//                 {/* Work Places */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="workplace" className='register-label '>Work Places</label> {/* تأكد من أن الـ htmlFor صحيح */}
//                   <div className='register-input-group'>
//                     <textarea id="workplace" className='form-control' {...register("workplace")} />
//                   </div>
//                   {errors.workplace && <p className="text-danger">{errors.workplace.message}</p>}
//                 </div>

//                 {/* About doctor */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="aboutDoctor" className='register-label '>About doctor</label>
//                   <div className='register-input-group'>
//                     <textarea id="aboutDoctor" className='form-control' {...register("aboutDoctor")} />
//                   </div>
//                   {errors.aboutDoctor && <p className="text-danger">{errors.aboutDoctor.message}</p>}
//                 </div>

//                 {/* Professional License */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="licenseImgUrl" className='register-label'>Professional License</label>
//                   <div className='register-input-group'>
//                     <input type="file" className='form-control' id="licenseImgUrl" {...register("licenseImgUrl")} />
//                   </div>
//                   <p className="text-muted mt-1">Selected file: {getFileName(licenseFile)}</p>
//                   {errors.licenseImgUrl && <p className="text-danger">{errors.licenseImgUrl.message}</p>}
//                 </div>

//                 {/* qualificationImgUrl */}
//                 <div className="form-group col-lg-5 col-md-6 mb-3">
//                   <label htmlFor="qualificationImgUrl" className='register-label'>Qualifications</label>
//                   <div className='register-input-group'>
//                     <input type="file" className='form-control' id="qualificationImgUrl" {...register("qualificationImgUrl")} />
//                   </div>
//                   <p className="text-muted mt-1">Selected file: {getFileName(qualificationFile)}</p>
//                   {errors.qualificationImgUrl && <p className="text-danger">{errors.qualificationImgUrl.message}</p>}
//                 </div>
//               </div>

//               <div className="text-center mt-4">
//                 <button type="submit" className="register-submit-button" disabled={isLoading}>
//                   {isLoading ? (
//                     <>
//                       <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                       <span role="status">Registering...</span>
//                     </>
//                   ) : 'Sign Up'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }