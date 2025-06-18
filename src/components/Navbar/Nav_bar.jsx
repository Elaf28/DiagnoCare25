// import React, { useState, useRef, useEffect } from 'react';
// import { FaUserAlt } from "react-icons/fa";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { Link,useNavigate } from 'react-router-dom';
// import './Navbar.css'
// export default function Nav_bar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const userMenuRef = useRef(null); 
//   const toggleMenu = () => {
//     setIsMenuOpen(prev => !prev); 
//   };
//   const [token,setToken]=useState(true);
//   const navigate =useNavigate();

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setIsMenuOpen(false); 
//       }
//     };
//     if (isMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isMenuOpen]);
//   return (
//       <>
//       <div className='nav-content'>
//         <div className="myNavbar ">
//           <h1 className="logo">DiagnoCare</h1>
//           <ul className='d-flex gap-5'>
//             <Link to="/" className="navbar-link">
//               <li className='py-1'>HOME</li>
//             </Link>
//             <Link to="/#about-us" className="navbar-link">
//               <li className='py-1 '>ABOUT</li>
//             </Link >
//             <Link to="#our-services" className="navbar-link ">
//               <li className='py-1'>SERVICES</li>
//             </Link>
//           </ul>
//           {
//             token?
//             <div
//                 className='d-flex align-items-center justify-content-around gap-1 position-relative nav-group'
//                 onClick={toggleMenu} 
//                 ref={userMenuRef} 
//             >
//               <span className="nav-icon"><FaUserAlt /></span>
//               <span className="nav-icon"><IoMdArrowDropdown /></span>
//               <div> 
//                 <div className={`nav-group-content ${isMenuOpen ? 'show-menu' : ''}`}>
//                   <p onClick={()=>navigate('/userprofile')}>My Profile</p>
//                   <p>My Appointments</p>
//                   <p onClick={()=>setToken(false)}>Logout</p>
//               </div>
//               </div>
//             </div>
//             :<div className='d-flex align-items-center  gap-3'>
//               <button onClick={()=>navigate('/login')} className="nav-button">Login</button>
//               <button onClick={()=>navigate('/register')} className="nav-button">Create account</button>
//             </div>
//           }
//         </div>
//       </div>
// <div></div>
//       </>
//   )
// }







import React, { useState, useRef, useEffect } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/authSlice'; // تأكد من المسار الصحيح

import './Navbar.css';

export default function Nav_bar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // جلب isAuthenticated و user object مباشرةً من Redux state
  const { isAuthenticated, user } = useSelector(state => state.auth);

  // استخراج userRole من الـ user object لو موجود
  // استخدمت lowercase للتأكد من التطابق مع الأدوار في الـ Redux state والـ backend
  const userRole = user ? user.role : null;

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false); // إغلاق القائمة
    navigate('/login'); // التوجيه لصفحة تسجيل الدخول بعد تسجيل الخروج
  };

  const navigateToProfile = () => {
    setIsMenuOpen(false); // إغلاق القائمة
    if (userRole === 'Doctor') {
      navigate('/doctorProfile');
    } else if (userRole === 'Patient') {
      navigate('/patientProfile');
    } else if (userRole === 'admin') {
      navigate('/admin/dashboard'); // مسار لو فيه دور admin
    } else {
      console.warn("Unhandled user role for profile navigation:", userRole);
      navigate('/'); // مسار افتراضي أو صفحة خطأ
    }
  };

  const navigateToAppointments = () => {
    setIsMenuOpen(false); // إغلاق القائمة
    if (userRole === 'Doctor') {
      navigate('/DoctorAppointments');
    } else if (userRole === 'Patient') {
      navigate('/myAppointments');
    } else {
      console.warn("Unhandled user role for appointments navigation:", userRole);
      navigate('/'); // مسار افتراضي
    }
  };

  // useEffect للتعامل مع النقر خارج القائمة عشان يقفل الـ dropdown
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
          <ul className='d-flex gap-5'>
            <Link to="/" className="navbar-link">
              <li className='py-1'>HOME</li>
            </Link>
            {/* تم تغيير Link لـ a tag إذا كنت تريد smooth scrolling لنفس الصفحة */}
            <a href="#about-us" className="navbar-link">
              <li className='py-1 '>ABOUT</li>
            </a>
            <a href="#our-services" className="navbar-link ">
              <li className='py-1'>SERVICES</li>
            </a>
          </ul>
          {
            isAuthenticated ? ( // هنا بنستخدم isAuthenticated اللي بتيجي من Redux
              <div
                className='d-flex align-items-center justify-content-around gap-1 position-relative nav-group'
                onClick={toggleMenu}
                ref={userMenuRef}
              >
                <span className="nav-icon"><FaUserAlt /></span>
                <span className="nav-icon"><IoMdArrowDropdown /></span>
                <div>
                  {/* تصحيح صياغة className باستخدام backticks (``) */}
                  <div className={`nav-group-content ${isMenuOpen ? 'show-menu' : ''}`}>
                    <p onClick={navigateToProfile}>My Profile</p>
                    <p onClick={navigateToAppointments}>My Appointments</p>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='d-flex align-items-center  gap-3'>
                <button onClick={() => navigate('/login')} className="nav-button">Login</button>
                <button onClick={() => navigate('/register')} className="nav-button">Create account</button>
              </div>
            )
          }
        </div>
      </div>
      <div></div>
    </>
  );
}