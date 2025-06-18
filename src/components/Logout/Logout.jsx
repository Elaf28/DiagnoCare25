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
        await dispatch(logoutUser()).unwrap(); // تنفيذ الـ logout
        navigate('/login'); // توجيه لـ /login بعد النجاح
      } catch (error) {
        console.error('Logout failed:', error); // تسجيل الخطأ لو حصل
        navigate('/login'); // توجيه لـ /login حتى لو فشل
      }
    };
    performLogout();
  }, [dispatch, navigate]);

  return null; // لا حاجة لـ UI لأن الـ redirect بيتم فورًا
};
