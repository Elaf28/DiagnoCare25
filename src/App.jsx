import React, { useEffect } from 'react'; 
import { Routes, Route, Navigate, Link ,useLocation ,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
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
import Diagnosis from './components/Diagnosis/Diagnosis';
import ScanImage from './components/ScanImage/ScanImage';
import BloodDiagnosis from './components/BloodDiagnosis/BloodDiagnosis';
import HeartDisease from './components/HeartDisease/HeartDisease';
import Labs from './components/Labs/Labs';
import DiabetesDiagnosis from './components/DiabetesDiagnosis/DiabetesDiagnosis';
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
import PendingDoctorsDashboard from './components/PendingDoctorsDashboard/PendingDoctorsDashboard';
import ChatPot from './components/ChatPot/ChatPot';
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel/PaymentCancel';

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

const PrivateRoute = ({ children, allowedRoles, showLoginAlert = false }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && status !== 'loading' && showLoginAlert) {
      Swal.fire({
        title: 'Login Required',
        text: 'You must be logged in to access this page.',
        icon: 'warning',
        confirmButtonText: 'Go to Login',
      }).then(() => {
        navigate('/login');
      });
    }
  }, [isAuthenticated, status, showLoginAlert, navigate]);

  if (!isAuthenticated && showLoginAlert) {
    return null;
  }
  if (!isAuthenticated && !showLoginAlert) {
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
                <Route path='/doctor/:id' element={<DoctorDetails/>}/>
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
                <Route path='/chatBot' element={<ChatPot/>}/>
                <Route path='/payment-success' element={<PaymentSuccess/>}/>
                <Route path='/payment-cancel' element={<PaymentCancel/>}/>
                <Route
                  path='/doctors/:specialtyName'
                  element={
                    <PrivateRoute showLoginAlert={true}>
                      <Doctors />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/patientProfile"
                  element={
                    <PrivateRoute allowedRoles={['Patient']}>
                      <PatientProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/doctorProfile"
                  element={
                    <PrivateRoute allowedRoles={['Doctor']}>
                      <DoctorProfile />
                    </PrivateRoute>
                  }
                />

            </Route>

            <Route path='login' element={<Login />} /> 

            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={['Admin']}>
                  <Admin />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="allDoctors" element={<DoctorDashboard />} />
              <Route path="allPatients" element={<PatientDashboard />} />
              <Route path="allSpecialties" element={<SpecialtiesDashboard />} />
              <Route path="allAppointments" element={<AppointmentsDashboard />} />
              <Route path="pendingDoctors" element={<PendingDoctorsDashboard />} />
            </Route>



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