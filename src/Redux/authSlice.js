import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import axiosPublic from '../api/axiosPublic';

export const registerPatient = createAsyncThunk(
  'auth/registerPatient',
  async (patientData, thunkAPI) => {
    try {
      const response = await axiosPublic.post('/Patients/register', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Patient registration failed'
      );
    }
  }
);

export const registerDoctor = createAsyncThunk(
  'auth/registerDoctor',
  async (doctorData, thunkAPI) => {
    try {
      const response = await axiosPublic.post('/Doctors/register', doctorData);
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Doctor registration endpoint not yet available'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      const response = await axiosPublic.post('/Auth/login', { email, password });
      const { token } = response.data;

      if (!token) {
        return rejectWithValue('Login failed: Token not provided');
      }

      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);

      const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const userEmailFromToken = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
      const userRoleFromToken = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const userStatusFromToken = decodedToken['Status']; 

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRoleFromToken);
      localStorage.setItem('userEmail', userEmailFromToken);
      localStorage.setItem('userId', userId);
      if (userStatusFromToken) {
        localStorage.setItem('status', userStatusFromToken);
      } else {
        localStorage.removeItem('status');
      }

      const user = {
        id: userId,
        email: userEmailFromToken,
        role: userRoleFromToken,
        status: userStatusFromToken || undefined,
      };

      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

export const loadUserFromToken = createAsyncThunk(
  'auth/loadUserFromToken',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role');
      const userEmail = localStorage.getItem('userEmail');
      const userId = localStorage.getItem('userId');
      const userStatus = localStorage.getItem('status');

      if (!token || !userRole || !userEmail) {
        localStorage.clear();
        return rejectWithValue('Please log in to continue.');
      }

      const user = {
        id: userId,
        email: userEmail,
        role: userRole,
        status: userStatus || undefined,
      };
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      localStorage.clear();
      return rejectWithValue(error.message || 'Failed to load user from token');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    localStorage.clear();
    dispatch(logout());
    return true;
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',  
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'succeeded';
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    setAuthError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetAuthStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // تسجيل مريض
      .addCase(registerPatient.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerPatient.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // تسجيل دكتور
      .addCase(registerDoctor.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerDoctor.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // تسجيل دخول
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // تحميل المستخدم من التوكن
      .addCase(loadUserFromToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // تسجيل خروج
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { loginSuccess, logout, setAuthError, resetAuthStatus } = authSlice.actions;

export default authSlice.reducer;
