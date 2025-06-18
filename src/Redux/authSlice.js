// // src/Redux/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Thunk for Patient Registration
// export const registerPatient = createAsyncThunk(
//   'auth/registerPatient',
//   async (patientData, thunkAPI) => {
//     try {
//       const response = await axios.post('https://f3e0-41-232-91-48.ngrok-free.app/api/Patients/register',patientData,
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       return response.data.message;
//     } catch (error) {
//       if (error.response?.data?.message) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//       }
//       return thunkAPI.rejectWithValue(error.message || 'Patient registration failed');
//     }
//   }
// );

// // Thunk for Doctor Registration (Placeholder)
// // This thunk is a temporary placeholder until the actual API is available.
// // It is assumed to behave similarly to registerPatient, returning only a message.
// export const registerDoctor = createAsyncThunk(
//   'auth/registerDoctor',
//   async (doctorData, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {

//       // * IMPORTANT: When the actual Doctor API is available, update this URL *
//       // Example: 'https://localhost:7261/api/Doctors/register'
//       const response = await axios.post('https://07b6-41-232-91-48.ngrok-free.app/api/Doctors/register', doctorData,
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
//       return response.data.message; // Return only the success message
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         // Temporary error message for clarity
//         return rejectWithValue(error.response.data.message || 'Doctor registration endpoint not yet available');
//       }
//       return rejectWithValue(error.message || 'Doctor registration failed (endpoint not available)');
//     }
//   }
// );


// // Thunk for User Login - Unified Endpoint
// // ... (الكود السابق حتى `loginUser` thunk)

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     const loginEndpoint = 'https://5a1e-41-232-91-48.ngrok-free.app/api/Auth/login';

//     try {
//       console.log("Sending login request to:", loginEndpoint, "with data:", { email, password });
//       const response = await axios.post(loginEndpoint, { email, password });
//       const { token, role, status } = response.data; 
//       const user = { email, role, status: status || undefined };
//       console.log("Constructed user object:", user);

//       dispatch(loginSuccess(user));
//       if (token) {
//         localStorage.setItem('token', token);
//       }
//       return user;
//     } catch (error) {
//       console.error("API Error:", error.response?.status, error.response?.data);
//       if (error.response && error.response.data && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       }
//       return rejectWithValue(error.message || 'Login failed');
//     }
//   }
// );

// // ... (باقي الكود زي ما هو)

// export const loadUserFromToken = createAsyncThunk(
//   'auth/loadUserFromToken',
//   async (_, thunkAPI) => {
//     const { dispatch, rejectWithValue } = thunkAPI;
//     try {
//       const token = localStorage.getItem('token');
//       const userRole = localStorage.getItem('role');
//       const userEmail = localStorage.getItem('userEmail');
//       const userStatus = localStorage.getItem('status');
//       if (!token || !userRole || !userEmail) { 
//         return rejectWithValue('Please log in to continue.');
//       }
//       const user = { email: userEmail, role: userRole, status: userStatus || undefined };
//       dispatch(loginSuccess(user));
//       return user;
//     } catch (error) { 
//       localStorage.removeItem('token');
//       localStorage.removeItem('role');
//       localStorage.removeItem('userEmail');
//       return rejectWithValue(error.message || 'Failed to load user from token');
//     }
//   }
// );

// // Thunk for User Logout
// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (_, { dispatch }) => {
//     // Remove all authentication related data from localStorage
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('userEmail');
//     dispatch(logout()); // Dispatch the logout action to reset Redux state
//     return true;
//   }
// );

// const initialState = {
//   user: null, // Stores user data (e.g., {email: '...', role: '...'})
//   isAuthenticated: false, // True if user is logged in, false otherwise
//   status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed' - Current status of an async operation
//   error: null, // Stores error message if an operation fails
// };

// export const authSlice = createSlice({
//   name: 'auth', // Name of the slice
//   initialState, // Initial state
//   reducers: {
//     // Synchronous reducers that directly modify the state
//     loginSuccess: (state, action) => {
//       state.user = action.payload; // Set user data from action payload
//       state.isAuthenticated = true; // Set authenticated status to true
//       state.status = 'succeeded'; // Set status to succeeded
//       state.error = null; // Clear any previous errors
//       localStorage.setItem('role', action.payload.role); // Store the user's role in localStorage
//       if (action.payload.email) { // Store email if it's part of the payload (from login input)
//         localStorage.setItem('userEmail', action.payload.email);
//       }
//     },
//     logout: (state) => {
//       state.user = null; // Clear user data
//       state.isAuthenticated = false; // Set authenticated status to false
//       state.status = 'idle'; // Reset status to idle
//       state.error = null; // Clear any errors
//     },
// setAuthError: (state, action) => {
//       state.status = 'failed';
//       state.error = action.payload; // Set a specific error message
//     },
//     resetAuthStatus: (state) => {
//       state.status = 'idle';
//       state.error = null;
//       }
//   },
//   extraReducers: (builder) => {

//     builder
//       // registerPatient cases
//       .addCase(registerPatient.pending, (state) => { state.status = 'loading'; state.error = null; })
//       .addCase(registerPatient.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; console.log(state.response) }) // No auto-login here; user must redirect to login page
//       .addCase(registerPatient.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; state.isAuthenticated = false; state.user = null; })

//       // registerDoctor (placeholder) cases
//       .addCase(registerDoctor.pending, (state) => { state.status = 'loading'; state.error = null; })
//       .addCase(registerDoctor.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; }) // No auto-login here
//       .addCase(registerDoctor.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; state.isAuthenticated = false; state.user = null; })

//       // loginUser cases
//       .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
//       .addCase(loginUser.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; }) // loginSuccess is dispatched within the thunk
//       .addCase(loginUser.rejected, (state, action) => { state.status = 'failed'; state.isAuthenticated = false; state.user = null; state.error = action.payload; })
//       // loadUserFromToken cases
//       .addCase(loadUserFromToken.pending, (state) => { state.status = 'loading'; state.error = null; })
//       .addCase(loadUserFromToken.fulfilled, (state) => { state.status = 'succeeded'; state.error = null; }) // loginSuccess is dispatched within the thunk
//       .addCase(loadUserFromToken.rejected, (state, action) => { state.status = 'idle'; state.error = action.payload; })

//       // logoutUser cases
//       .addCase(logoutUser.pending, (state) => { state.status = 'loading'; state.error = null; }) // ** Modified: Added pending case **
//       .addCase(logoutUser.fulfilled, (state) => { state.status = 'idle'; state.error = null; })
//       .addCase(logoutUser.rejected, (state, action) => { // ** Modified: Added rejected case **
//         state.status = 'failed';
//         state.error = action.payload || 'Logout failed';
//       });
//   },
// });

// export const { loginSuccess, logout, setAuthError, resetAuthStatus } = authSlice.actions;

// export default authSlice.reducer;







import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// --- Patient Registration ---
export const registerPatient = createAsyncThunk(
    'auth/registerPatient',
    async (patientData, thunkAPI) => {
        try {
            const response = await axios.post('https://605e-41-232-91-48.ngrok-free.app/api/Patients/register', patientData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data.message;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || 'Patient registration failed');
        }
    }
);

// --- Doctor Registration ---
export const registerDoctor = createAsyncThunk(
    'auth/registerDoctor',
    async (doctorData, thunkAPI) => {
        try {
            const response = await axios.post('https://07b6-41-232-91-48.ngrok-free.app/api/Doctors/register', doctorData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data.message;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || 'Doctor registration endpoint not yet available');
        }
    }
);

// --- User Login ---
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI;
        const loginEndpoint = 'http://dcare.runasp.net/api/Auth/login';
        try {
            const response = await axios.post(loginEndpoint, { email, password });
            const { token, role, status } = response.data;
            console.log('Token:', token);
            let userId = null;
            let userEmailFromToken = email;
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
                    userEmailFromToken = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

                } catch (decodeError) {
                    console.warn("Error decoding token:", decodeError);
                }
                localStorage.setItem('token', token);
            }
            const user = { 
                id: userId,
                email: userEmailFromToken, 
                role, 
                status: status || undefined 
            };
            // Store essential info in localStorage
            localStorage.setItem('role', role);
            if (userEmailFromToken) localStorage.setItem('userEmail', userEmailFromToken);
            if (userId) localStorage.setItem('userId', userId);
            if (status) localStorage.setItem('status', status);

            // Use reducer to update state
            dispatch(loginSuccess(user));
            return user;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
        }
    }
);

// --- Load User from Token ---
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
                status: userStatus || undefined 
            };
            dispatch(loginSuccess(user));
            return user;
        } catch (error) {
            localStorage.clear();
            return rejectWithValue(error.message || 'Failed to load user from token');
        }
    }
);

// --- Logout ---
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

export const authSlice = createSlice({
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
                state.user = null;
                state.isAuthenticated = false;
            })
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
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loadUserFromToken.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loadUserFromToken.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'idle';
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Logout failed';
            });
    },
});

export const { loginSuccess, logout, setAuthError, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
