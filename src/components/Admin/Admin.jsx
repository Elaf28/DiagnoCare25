// import React, { useState } from 'react'; 
// import { Link, Outlet } from 'react-router-dom';
// import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; 
// import './Admin.css';
// // import Dashboard from '../Dashboard/Dashboard';

// export default function Admin() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
        
//         <div className="admin-layout-container">
//             <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
//                 <div className="admin-sidebar-header">
//                     <span className="admin-logo-text">DiagnoCare</span>
//                     <button className="close-sidebar-btn" onClick={toggleSidebar}>
//                         <FaTimes />
//                     </button>
//                 </div>
//                 <div className="admin-profile">
//                     <p className="admin-name">Admin</p>
//                     <p className="admin-email">admin@enaya.com</p>
//                 </div>
//                 <nav className="admin-sidebar-nav">
//                     <ul>
//                         <li>
//                             <Link to="/admin/dashboard" className="admin-nav-item active" onClick={() => setIsSidebarOpen(false)}>
//                                 Dashboard
                                
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/admin/pendingDoctors" className="admin-nav-item" onClick={() => setIsSidebarOpen(false)}>
//                                 Pending Doctors
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/admin/allDoctors" className="admin-nav-item" onClick={() => setIsSidebarOpen(false)}>
//                                 All Doctors
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/admin/allPatients" className="admin-nav-item" onClick={() => setIsSidebarOpen(false)}>
//                                 All Patients
//                             </Link>
//                         </li>
//                         <li>
//                             <Link to="/admin/allAppointments" className="admin-nav-item" onClick={() => setIsSidebarOpen(false)}>
//                                 All Appointments
//                             </Link>
//                         </li>
//                     </ul>
//                 </nav>
//             </aside>

//             {/* Main Content Wrapper */}
//             <div className="admin-main-wrapper">
//                 {/* Navbar */}
//                 <header className="admin-navbar">
//                     <button className="hamburger-menu-btn" onClick={toggleSidebar}>
//                         <FaBars />
//                     </button>
//                     <div className="admin-navbar-actions">
//                         <Link to="/logout" className="admin-logout-btn">
//                             Logout <FaSignOutAlt className="admin-logout-icon" />
//                         </Link>
//                     </div>
//                 </header>
//                 {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

//                 {/* Page Specific Content */}
//                 <main className="admin-page-content">
//                     <Outlet />
//                 </main>
//             </div>
//         </div>
//     );
// }


import React, { useState } from 'react'; 
import { Link, Outlet, NavLink } from 'react-router-dom'; 
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; 
// import { useSelector, useDispatch } from 'react-redux';  // *************
// import { logoutUser } from '../../Redux/authSlice';      // *************
import './Admin.css';


import Dashboard from '../Dashboard/Dashboard';
import DoctorDashboard from '../DoctorDashboard/DoctorDashboard';
import PatientDashboard from '../PatientDashboard/PatientDashboard';
import AppointmentsDashboard from '../AppointmentsDashboard/AppointmentsDashboard';
import SpecialtiesDashboard from '../SpecialtiesDashboard/SpecialtiesDashboard';
import PendingDoctorsDashboard from '../PendingDoctorsDashboard/PendingDoctorsDashboard';



export default function Admin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    // const dispatch = useDispatch();          // *************
    // const { isAuthenticated, user } = useSelector((state) => state.auth);     // *************

    // useEffect(() => {
    //     if (!isAuthenticated || user?.role !== 'admin') { // ** Modified: Changed 'Admin' to 'admin' for consistency with authSlice **
    //         window.location.href = '/login';
    //     }
    // }, [isAuthenticated, user]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // const handleLogout = async () => { // ** Modified: Changed to use logoutUser thunk **
    //     await dispatch(logoutUser()).unwrap();
    //     window.location.href = '/login';
    // };

    return (
        <div className="admin-layout-container">
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <span className="admin-logo-text">DiagnoCare</span>
                    <button className="close-sidebar-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <div className="admin-profile">
                    <p className="admin-name">Admin</p>
                    <p className="admin-email">admin@enaya.com</p>
                </div>
                <nav className="admin-sidebar-nav">
                    <ul>
                        <li>
                            {/* استخدام NavLink ليقوم بتحديد الـ 'active' تلقائياً */}
                            <NavLink 
                                to="/admin" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            {/* استخدام NavLink ليقوم بتحديد الـ 'active' تلقائياً */}
                            <NavLink 
                                to="/admin/allSpecialties" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                All Specialties
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/pendingDoctors" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Pending Doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/allDoctors" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                All Doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/allPatients" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                All Patients
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/admin/allAppointments" 
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                All Appointments
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>
            {/* Main Content Wrapper */}
            <div className="admin-main-wrapper">
                {/* Navbar */}
                <header className="admin-navbar">
                    <button className="hamburger-menu-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <div className="admin-navbar-actions">
                        {/* <button to="/logout" className="admin-logout-btn" onClick={handleLogout}> */} 
                        <button to="/logout" className="admin-logout-btn " >
                            Logout <FaSignOutAlt className="admin-logout-icon" />
                        </button>
                    </div>
                </header>

                {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
                <main className="admin-page-content">
                    <Outlet />
                    {/* <Dashboard/> */}
                    {/* <DoctorDashboard/> */}
                    {/* <PatientDashboard/> */}
                    {/* <AppointmentsDashboard/> */}
                    {/* <SpecialtiesDashboard/> */}
                    {/* <PendingDoctorsDashboard/> */}
                </main>
            </div>
        </div>
    );
}














