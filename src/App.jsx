import React, { useEffect } from 'react'; 
import { Routes, Route, Navigate, Link ,useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserFromToken} from './Redux/authSlice';
import PublicLayout from './components/PublicLayout/PublicLayout';
import Home from './components/Home/Home'; 
import Login from './components/Login/Login'; 
import Admin from './components/Admin/Admin'; 
import Register from './components/Register/Register';
import Specialties from './components/Specialties/Specialties';
import PatientProfile from './components/PatientProfile/PatientProfile';
import DoctorProfile from './components/DoctorProfile/DoctorProfile';
import Doctors from './components/Doctors/Doctors';
import DoctorDetails from './components/DoctorDetails/DoctorDetails';
import BookingConfirmation from './components/BookingConfirmation/BookingConfirmation';
import Diagnosis from './components/Diagnosis/Diagnosis';
import ScanImage from './components/ScanImage/ScanImage';
import BloodDiagnosis from './components/BloodDiagnosis/BloodDiagnosis';
import HeartDisease from './components/HeartDisease/HeartDisease';
import Labs from './components/Labs/Labs';
import DiabetesDiagnosis from './components/DiabetesDiagnosis/DiabetesDiagnosis';
import UserProfile from './components/UserProfile/UserProfile';
import NotFound from './components/NotFound/NotFound';
import MyAppointments from './components/MyAppointments/MyAppointments';
import DoctorAppointments from './components/DoctorAppointments/DoctorAppointments';
import Dashboard from './components/Dashboard/Dashboard';
import DoctorDashboard from './components/DoctorDashboard/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard/PatientDashboard';
import SpecialtiesDashboard from './components/SpecialtiesDashboard/SpecialtiesDashboard';
import AppointmentsDashboard from './components/AppointmentsDashboard/AppointmentsDashboard';
import DoctorPending from './components/DoctorPending/DoctorPending';
import WorkingHours from './components/WorkingHoures/WorkingHoures';
import Logout from './components/Logout/Logout';


  function ScrollToHashElement() {
    const location = useLocation(); 
    useEffect(() => {
      if (location.hash) { 
        const id = location.hash.substring(1); 
        const element = document.getElementById(id); 
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]); 
    return null; 
  }

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, status } = useSelector((state) => state.auth);

    if (status === 'loading') {
        return <div className="text-center p-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />; 
    }

    return children;
};

export default function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUserFromToken());
    }, [dispatch]); 

    return (<>
        <ScrollToHashElement /> 
        <Routes> 
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} /> 
                <Route path='register' element={<Register/>}/>
                <Route path='specialties' element={<Specialties/>}/>
                <Route path='userprofile' element={<UserProfile/>}/>
                <Route path='/patientProfile' element={<PatientProfile />}/>
                <Route path='/doctorProfile' element={<DoctorProfile />}/>
                <Route path='/doctors/:specialtyName' element={<Doctors/>}/>
                <Route path='/doctor/:id' element={<DoctorDetails/>}/>
                <Route path='/booking-confirmation' element={<BookingConfirmation/>}/>
                <Route path='diagnosis' element={<Diagnosis/>}/>
                <Route path='/examinations/heartDisease' element={<HeartDisease/>}/>
                <Route path='/diagnosis/scanImage' element={<ScanImage/>}/>
                <Route path='/examinations/bloodDiagnosis' element={<BloodDiagnosis/>}/>
                <Route path='examinations' element={<Labs/>}/>
                <Route path='/examinations/diabetesDiagnosis' element={<DiabetesDiagnosis/>}/>
                <Route path='/myAppointments' element={<MyAppointments/>}/>
                <Route path='/DoctorAppointments' element={<DoctorAppointments/>}/>
                <Route path='/doctor-pending-approval' element={<DoctorPending/>}/>
                <Route path='/WorkingHours' element={<WorkingHours/>}/>
                {/* <Route path='/admin' element={<Admin/>}/> */}

            </Route>

            <Route path='login' element={<Login />} /> 

            {/* <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="DoctorDashboard" element={<DoctorDashboard />} />
              <Route path="PatientDashboard" element={<PatientDashboard />} />
              <Route path="SpecialtiesDashboard" element={<SpecialtiesDashboard />} />
              <Route path="AppointmentsDashboard" element={<AppointmentsDashboard />} />
            </Route> */}

            <Route path="/logout" element={<Logout />} />

            <Route path="/unauthorized" element={
              <div className="mt-5 text-center container">
                <h1>403 - Unauthorized</h1>
                <p>Sorry, you do not have sufficient permissions to view this page.</p>
                <Link to="/" className="btn mt-3" style={{ background: 'var(--first-color)',color:'white' }}>Return to Homepage</Link>
              </div>
            } />

              <Route path='*' element={<NotFound/>}/>
            

        </Routes>
      </>
    );
}