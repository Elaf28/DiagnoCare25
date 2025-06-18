import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorProfileReducer from './DoctorProfileSlice';
import adminReducer from './adminSlice'; 
import patientProfileReducer from './patientProfileReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,     
    doctorProfile: doctorProfileReducer,
    admin: adminReducer, 
    patientProfile: patientProfileReducer,
  },
});