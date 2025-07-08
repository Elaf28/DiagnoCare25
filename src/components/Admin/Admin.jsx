import React, {  useState } from 'react'; 
import { Outlet, NavLink, useNavigate } from 'react-router-dom'; 
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; 
import { useSelector, useDispatch } from 'react-redux';  
import { logoutUser } from '../../Redux/authSlice';      
import './Admin.css';

export default function Admin() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const {  status } = useSelector((state) => state.auth);     

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = async () => { 
        await dispatch(logoutUser()).unwrap();
        navigate('/login');
    };

    if (status === 'loading') {
        return (
            <div className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

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
                    <p className="admin-email">admin@dcare.com</p>
                </div>
                <nav className="admin-sidebar-nav">
                    <ul>
                        <li>
                            <NavLink 
                                to="/admin" 
                                end   
                                className={({ isActive }) => 
                                    isActive ? "admin-nav-item active" : "admin-nav-item"
                                } 
                                onClick={() => setIsSidebarOpen(false)}
                                >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/allSpecialties" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setIsSidebarOpen(false)}>
                                All Specialties
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/pendingDoctors" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setIsSidebarOpen(false)}>
                                Pending Doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/allDoctors" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setIsSidebarOpen(false)}>
                                All Doctors
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/allPatients" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setIsSidebarOpen(false)}>
                                All Patients
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/allAppointments" className={({ isActive }) => isActive ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setIsSidebarOpen(false)}>
                                All Appointments
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className="admin-main-wrapper">
                {/* Navbar */}
                <header className="admin-navbar">
                    <button className="hamburger-menu-btn" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <div className="admin-navbar-actions">
                        <button className="admin-logout-btn" onClick={handleLogout}> 
                            Logout <FaSignOutAlt className="admin-logout-icon" />
                        </button>
                    </div>
                </header>

                {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

                <main className="admin-page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
