import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance'; 
const DEFAULT_PATIENT_PROFILE_DATA = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phoneNumber: '',
  height: 0,
  weight: 0,
  bloodType: '',
  allergies: '',
  medicalHistory: '',
};

export const fetchPatientProfile = createAsyncThunk(
  'patientProfile/fetchPatientProfile',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axiosInstance.get('/Patients/profile', {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Error (fetchPatientProfile):', error.response?.status, error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch patient profile'
      );
    }
  }
);

export const updatePatientProfile = createAsyncThunk(
  'patientProfile/updatePatientProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/Patients/profile-update', profileData);
      return response.data;
    } catch (error) {
      console.error('API Error (updatePatientProfile):', error.response?.status, error.response?.data);

      if (error.response?.status === 401) {
        localStorage.clear();
        return rejectWithValue('Session expired. Please log in again.');
      }

      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to update profile.'
      );
    }
  }
);

const patientProfileReducer = createSlice({
  name: 'patientProfile',
  initialState: {
    data: DEFAULT_PATIENT_PROFILE_DATA,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetPatientProfileStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    setPatientProfileData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
        console.log('Patient profile data:', action.payload);
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.data = {
          ...DEFAULT_PATIENT_PROFILE_DATA,
          email: localStorage.getItem('userEmail') || '',
        };
      })
      .addCase(updatePatientProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = { ...state.data, ...action.payload }; 
        state.error = null;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetPatientProfileStatus, setPatientProfileData } = patientProfileReducer.actions;
export default patientProfileReducer.reducer;
