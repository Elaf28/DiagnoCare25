// // src/redux/patientProfileSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const DEFAULT_PATIENT_PROFILE_DATA = {
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     gender: '',
//     email: '',
//     phoneNumber: '',
//     height: 0,
//     weight: 0,
//     bloodType: '',
//     allergies: '',
//     medicalHistory: '',
//     // Add any other patient profile specific fields here
// };

// // Async Thunk to fetch patient profile data using axios
// export const fetchPatientProfile = createAsyncThunk(
//   'patientProfile/fetchPatientProfile',
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         return rejectWithValue('No authentication token found for patient.');
//       }

//       // This is the actual API endpoint for fetching patient profile data as confirmed
//       const response = await axios.get('https://f3e0-41-232-91-48.ngrok-free.app/api/Patients/profile', {
//         headers: {
//           'Authorization':` Bearer ${token}`
//         }
//       });
//       return response.data; // Assuming payload is the full profile data object
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Async Thunk to update patient profile data using axios
// export const updatePatientProfile = createAsyncThunk(
//   'patientProfile/updatePatientProfile',
//   async (profileData, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         return rejectWithValue('No authentication token found for patient.');
//       }

//       // This is the actual API endpoint for updating patient profile data as confirmed
//       const response = await axios.put('https://f3e0-41-232-91-48.ngrok-free.app/api/Patients/profile-Update', profileData, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       return response.data; // Assuming payload is the updated profile data object
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const patientProfileSlice = createSlice({
//   name: 'patientProfile',
//   initialState: {
//     data: DEFAULT_PATIENT_PROFILE_DATA,
//     status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null,
//   },
//   reducers: {
//     resetPatientProfileStatus: (state) => {
//       state.status = 'idle';
//       state.error = null;
//     },
//     // Optional: A reducer to set profile data directly if needed from other sources
//     setPatientProfileData: (state, action) => {
//       state.data = { ...state.data, ...action.payload };
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatientProfile.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchPatientProfile.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload; // Set state data to the fetched profile
//         state.error = null;
//       })
//       .addCase(fetchPatientProfile.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//         state.data = DEFAULT_PATIENT_PROFILE_DATA; // Reset to default on failure
//       })
//       // Update Patient Data Cases
//       .addCase(updatePatientProfile.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(updatePatientProfile.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload; // Update state data with the returned updated profile
//         state.error = null;
//       })
//       .addCase(updatePatientProfile.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetPatientProfileStatus, setPatientProfileData } = patientProfileSlice.actions;
// export default patientProfileSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
        const token = localStorage.getItem('token');

        if (!token) {
        return rejectWithValue('Authentication token not found. Please log in again.');
        }

        try {
        const response = await axios.get(
            'http://dcare.runasp.net/api/Patients/profile',
            {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0',
            }
            }
        );

        return response.data;
        } catch (error) {
        console.error('API Error (fetchPatientProfile):', error.response?.status, error.response?.data);
        return rejectWithValue(
            error.response?.data?.message || error.message || 'Failed to fetch patient profile'
        );
        }
    }
);

// تعديل بيانات المريض
export const updatePatientProfile = createAsyncThunk(
  'patientProfile/updatePatientProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return rejectWithValue('No authentication token found for patient.');
      }

      const response = await axios.put(
        'https://605e-41-232-91-48.ngrok-free.app/api/Patients/profile-update',
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('API Error (updatePatientProfile):', error.response?.status, error.response?.data, error.message);

      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userId');
        localStorage.removeItem('status');
        return rejectWithValue('Session expired. Please log in again.');
      }

      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to update profile.');
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
    }
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
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.data = { ...DEFAULT_PATIENT_PROFILE_DATA, email: localStorage.getItem('userEmail') || '' };
      })
      .addCase(updatePatientProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
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
