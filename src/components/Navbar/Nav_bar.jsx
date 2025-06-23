import React, { useState, useRef, useEffect } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/authSlice';

import './Navbar.css';

export default function Nav_bar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const userRole = user?.role?.toLowerCase();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const navigateToProfile = () => {
    setIsMenuOpen(false);
    if (userRole === 'doctor') {
      navigate('/doctorProfile');
    } else if (userRole === 'patient') {
      navigate('/patientProfile');
    } else {
      console.warn("Unhandled user role for profile navigation:", userRole);
    }
  };

  const navigateToAppointments = () => {
    setIsMenuOpen(false);
    if (userRole === 'doctor') {
      navigate('/DoctorAppointments');
    } else if (userRole === 'patient') {
      navigate('/myAppointments');
    } else {
      console.warn("Unhandled user role for appointments navigation:", userRole);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className='nav-content'>
        <div className="myNavbar">
          <h1 className="logo">DiagnoCare</h1>
          <ul className='d-flex gap-2 gap-sm-3 gap-lg-5'>
            <Link to="/" className="navbar-link">
              <li>HOME</li>
            </Link>
            <li className='navbar-link' onClick={() => navigate('/#about-us')} style={{ cursor: 'pointer' }}>ABOUT</li>
            <li className='navbar-link' onClick={() => navigate('/#our-services')} style={{ cursor: 'pointer' }}>SERVICES</li>
          </ul>

          {isAuthenticated ? (
            userRole !== 'admin' && (
              <div
                className='d-flex align-items-center justify-content-around gap-1 position-relative nav-group'
                onClick={toggleMenu}
                ref={userMenuRef}
              >
                <span className="nav-icon"><FaUserAlt /></span>
                <span className="nav-icon"><IoMdArrowDropdown /></span>
                <div>
                  <div className={`nav-group-content ${isMenuOpen ? 'show-menu' : ''}`}>
                    <p onClick={navigateToProfile}>My Profile</p>
                    <p onClick={navigateToAppointments}>My Appointments</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className='d-flex align-items-center gap-1 gap-sm-2 gap-lg-3'>
              <button onClick={() => navigate('/login')} className="nav-button">Login</button>
              <button onClick={() => navigate('/register')} className="nav-button">Create account</button>
            </div>
          )}
        </div>
      </div>
      <div>
      </div>
    </>
  );
}