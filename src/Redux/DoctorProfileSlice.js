import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

const DEFAULT_DOCTOR_PROFILE_DATA = {
  doctorId: '',
  fullName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  address1: '',
  address2: '',
  yearsOfExperience: 0,
  workplace: '',
  fees: 0,
  licenseImgUrl: null,
  qualificationImgUrl: null,
  doctorImgUrl: null,
  professionalTitle: '',
  aboutDoctor: '',
  status: '',
};


export const fetchDoctorProfile = createAsyncThunk(
  'doctorProfile/fetchDoctorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/Doctors/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateDoctorProfile = createAsyncThunk(
  'doctorProfile/updateDoctorProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/Doctors/Profile-Update', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const doctorProfileSlice = createSlice({
  name: 'doctorProfile',
  initialState: {
    data: DEFAULT_DOCTOR_PROFILE_DATA,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetProfileStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDoctorProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.data = DEFAULT_DOCTOR_PROFILE_DATA;
      })

      .addCase(updateDoctorProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateDoctorProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetProfileStatus } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;
