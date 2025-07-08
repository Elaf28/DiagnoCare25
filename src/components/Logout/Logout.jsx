import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Redux/authSlice';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap(); 
        navigate('/login'); 
      } catch (error) {
        console.error('Logout failed:', error); 
        navigate('/login'); 
      }
    };
    performLogout();
  }, [dispatch, navigate]);

  return null; 
};
