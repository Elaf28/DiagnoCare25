// import React, { useState, useEffect } from 'react';
// import './Login.css'; 
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Spinner } from 'react-bootstrap';
// import { loginUser, resetAuthStatus } from '../../Redux/authSlice';

// export default function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { status, error, isAuthenticated, user } = useSelector((state) => state.auth);
//     const isLoading = status === 'loading';

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const resultAction = await dispatch(loginUser({ email, password })).unwrap();
//             console.log("Login successful:", resultAction);

//         } catch (rejectedValueOrSerializedError) {
//             console.error("Login failed:", rejectedValueOrSerializedError);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             dispatch(resetAuthStatus());
//         };
//     }, [dispatch]);

//     useEffect(() => {
//         if (isAuthenticated && user) {
//             // إضافة شرط فحص حالة الدكتور هنا
//             if (user.role === 'Doctor') {
//                 if (user.status ==='Pending') { // لو الحالة pending (0)
//                     navigate('/doctor-pending-approval', { replace: true });
//                 } else if (user.status === 'Approved') { // لو الحالة approved (1)
//                     navigate('/doctorProfile', { replace: true });
//                 } else {
//                     // في حالة وجود دور دكتور ولكن حالة غير معرفة
//                     console.warn("Doctor status not recognized:", user.status);
//                     navigate('/', { replace: true });
//                 }
//             } else if (user.role === 'Admin') {
//                 navigate('/admin/dashboard', { replace: true });
//             } else if (user.role === 'Patient') {
//                 navigate('/patientProfile', { replace: true });
//             } else {
//                 console.warn("User type or status not handled:", user.role, user.status);
//                 navigate('/', { replace: true });
//             }
//         }
//     }, [isAuthenticated, user, navigate]);

//     return (
//         <>
//         <div className="py-3" style={{backgroundColor:'#FBFCFF'}}>
//             <div className='login-page container'>
//                 <div className="image-container">
//                     <div className='login-image'>
//                         <img src='/images/login.png' alt="Login" className="login-image-src" />
//                     </div>
//                 </div>
//                 <div className="login-box">
//                     <h1 className='login-title text-center'>LOGIN</h1>
//                     {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         {/* Input Email */}
//                         <div className="input-field-container">
//                             <label className='input-label' htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 className='login_input'
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                                 placeholder="Enter your email"
//                             />
//                         </div>

//                         {/* Input Password */}
//                         <div className="input-field-container">
//                             <label className='input-label' htmlFor="password">Password</label>
//                             <input
//                             type="password"
//                                 id="password"
//                                 className='login_input'
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                                 placeholder="Enter your password"
//                             />
//                         </div>

//                         <div className='text-center'>
//                             <button className='button-login' type="submit" disabled={isLoading}>
//                                 {isLoading ? (
//                                     <div className="d-flex align-items-center justify-content-center">
//                                         <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
//                                         <span className="ms-2" role="status">Loading...</span>
//                                     </div>
//                                 ) : 'Login'}
//                             </button>
//                         </div>
//                     </form>
//                     <div className="signup-link py-4">
//                         <p className='text-center'>Don't have an account ? <Link className='link' to={'/register'}>sign up</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// }







import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { loginUser, resetAuthStatus } from '../../Redux/authSlice';
import { fetchPatientProfile } from '../../Redux/patientProfileReducer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status: authStatus, error: authError, isAuthenticated, user } = useSelector((state) => state.auth);
    const { status: profileStatus, error: profileError, data: profileData } = useSelector((state) => state.patientProfile);
    const isLoading = authStatus === 'loading' || profileStatus === 'loading';
    const hasRedirected = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login component: Sending login request for email:", email);
        try {
            // dispatch(loginUser) سيعود بـ user object (بما فيه الـ email من التوكن)
            const resultAction = await dispatch(loginUser({ email, password })).unwrap();
            console.log("Login component: Login successful, resultAction:", resultAction);
            
            // بناءً على الـ role، نقوم بجلب بيانات البروفايل إذا كان مريضًا
            if (resultAction && resultAction.role) {
                if (resultAction.role === 'Patient') {
                    console.log("Login component: User is Patient, fetching profile...");
                    await dispatch(fetchPatientProfile()).unwrap();
                    console.log("Login component: Patient profile fetch initiated.");
                }
            } else {
                console.warn("Login component: Invalid login response, missing role or resultAction is null:", resultAction);
            }
        } catch (rejectedValueOrSerializedError) {
            console.error("Login component: Login failed:", rejectedValueOrSerializedError);
            // الخطأ سيتم عرضه من الـ useSelector (authError)
        }
    };

    useEffect(() => {
        return () => {
            dispatch(resetAuthStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        console.log("Login useEffect: isAuthenticated:", isAuthenticated, "user:", user, "profileStatus:", profileStatus, "profileError:", profileError, "profileData:", profileData, "hasRedirected:", hasRedirected.current);

        if (isAuthenticated && user && !hasRedirected.current) {
            // إذا كان المستخدم مريضًا، ننتظر أن يتم جلب الـ profile data بنجاح
            if (user.role === 'Patient') {
                if (profileStatus === 'succeeded' && profileData && profileData.email) {
                    console.log("Login useEffect: Patient profile fetched successfully. Navigating to /patientProfile.");
                    navigate('/patientProfile');
                    hasRedirected.current = true;
                } else if (profileStatus === 'failed') {
                    console.error("Login useEffect: Failed to fetch patient profile. Not navigating.");
                    // هنا يمكنك إظهار رسالة خطأ للمستخدم إذا لم يتمكن من جلب البروفايل
                }
                // إذا كان `profileStatus` لا يزال 'loading' أو 'idle'، لن نفعل شيئًا، سننتظر أن ينتهي الـ fetch
            } else if (user.role === 'Doctor') {
                console.log("Login useEffect: User is Doctor. Navigating based on status...");
                if (user.status === 'Pending') {
                    navigate('/doctor-pending-approval');
                } else if (user.status === 'Approved') {
                    navigate('/doctorProfile');
                } else {
                    navigate('/'); // حالة افتراضية
                }
                hasRedirected.current = true;
            } else if (user.role === 'Admin') {
                console.log("Login useEffect: User is Admin. Navigating to /admin/dashboard.");
                navigate('/admin/dashboard');
                hasRedirected.current = true;
            } else {
                console.warn("Login useEffect: User role is unknown or not handled:", user.role);
                navigate('/'); // توجيه افتراضي
                hasRedirected.current = true;
            }
        }
    }, [isAuthenticated, user, navigate, profileStatus, profileError, profileData]); // أضف profileData هنا للمراقبة

    return (
        <>
            <div className="py-3" style={{ backgroundColor: '#FBFCFF' }}>
                <div className='login-page container'>
                    <div className="image-container">
                        <div className='login-image'>
                            <img src='/images/login.png' alt="Login" className="login-image-src" />
                        </div>
                    </div>
                    <div className="login-box">
                        <h1 className='login-title text-center'>LOGIN</h1>
                        {(authError || profileError) && <p className="text-danger text-center" style={{ marginTop: '10px' }}>{authError || profileError}</p>}
                        {/* لا داعي لإظهار رسالة فشل دائمة إذا لم يكن هناك خطأ محدد */}
                        {(!isAuthenticated && authStatus === 'failed') && <p className="text-danger text-center" style={{ marginTop: '10px' }}>Login failed. {authError || 'Please check your credentials.'}</p>}

                        <form onSubmit={handleSubmit}>
                            <div className="input-field-container">
                                <label className='input-label' htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className='login_input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="input-field-container">
                                <label className='input-label' htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className='login_input'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className='text-center'>
                                <button className='button-login' type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="d-flex align-items-center justify-content-center">
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            <span className="ms-2">Logging in...</span>
                                        </div>
                                    ) : (
                                        'Login'
                                    )}
                                </button>
                                <p className="mt-3 text-center">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}