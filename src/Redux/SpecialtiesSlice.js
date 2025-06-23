import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export const fetchSpecialties = createAsyncThunk(
  'specialties/fetchSpecialties',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/Specialties/GetAllSpecialties');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch specialties'
      );
    }
  }
);

const specialtiesSlice = createSlice({
  name: 'specialties',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchSpecialties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default specialtiesSlice.reducer;
