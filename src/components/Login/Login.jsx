import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { loginUser, resetAuthStatus } from '../../Redux/authSlice';
import { fetchPatientProfile } from '../../Redux/patientProfileReducer';
import login from '../../assets/images/login.png';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status: authStatus, isAuthenticated, user } = useSelector((state) => state.auth);
    const { status: profileStatus, error: profileError, data: profileData } = useSelector((state) => state.patientProfile);
    const isLoading = authStatus === 'loading' || profileStatus === 'loading';
    const hasRedirected = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const resultAction = await dispatch(loginUser({ email, password })).unwrap();

            if (resultAction?.role === 'Patient') {
                await dispatch(fetchPatientProfile()).unwrap();
            }
        } catch (error) {
            console.error("Login error:", error);

            let message = 'Something went wrong. Please try again later.';

            if (error === 'Network Error') {
                message = 'No internet connection. Please check your network and try again.';
            } else if (error === 'Request failed with status code 400') {
                message = 'Incorrect email or password. Please try again.';
            } else {
                message = `Unexpected error . Please try again later.`;
                }
            setErrorMessage(message);
        }
    
    };

    useEffect(() => {
        return () => {
            dispatch(resetAuthStatus());
        };
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated && user && !hasRedirected.current) {
            if (user.role === 'Patient') {
                if (profileStatus === 'succeeded' && profileData?.email) {
                    navigate('/patientProfile');
                    hasRedirected.current = true;
                } else if (profileStatus === 'failed') {
                    console.error("Failed to fetch patient profile:", profileError);
                }
            } else if (user.role === 'Doctor') {
                if (user.status === 'Pending') {
                    navigate('/doctor-pending-approval');
                } else if (user.status === 'Approved') {
                    navigate('/doctorProfile');
                } else {
                    navigate('/');
                }
                hasRedirected.current = true;
            } else if (user.role === 'Admin') {
                navigate('/admin');
                hasRedirected.current = true;
            } else {
                navigate('/');
                hasRedirected.current = true;
            }
        }
    }, [isAuthenticated, user, navigate, profileStatus, profileError, profileData]);

    return (
        <div className="py-3" style={{ backgroundColor: '#FBFCFF' }}>
            <div className='login-page container'>
                <div className="image-container">
                    <div className='login-image'>
                        <img src={login} alt="Login" className="login-image-src" />
                    </div>
                </div>
                <div className="login-box">
                    <h1 className='login-title text-center'>LOGIN</h1>

                    {errorMessage && (
                        <div className="alert alert-danger text-center" role="alert">
                            {errorMessage}
                        </div>
                    )}

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
    );
}
