// src/redux/doctorProfileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const DEFAULT_DOCTOR_PROFILE_DATA = {
    doctorImgUrl: null, // سيتغير ليحمل URL فعلي من الـ backend
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    specialization: '',
    yearsOfExperience: '',
    workplace: '',
    professionalTitle: '',
    fees: '',
    aboutDoctor: '',
    licenseImgUrl:null, // سيتغير ليحمل URL فعلي من الـ backend
    qualificationImgUrl:null, // سيتغير ليحمل URL فعلي من الـ backend
};

// Async Thunk لجلب بيانات الدكتور باستخدام axios
export const fetchDoctorProfile = createAsyncThunk(
  'doctorProfile/fetchDoctorProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // احصل على التوكن
      if (!token) {
        return rejectWithValue('No authentication token found.');
      }

      //  نقطة نهاية الـ API الفعلية لجلب بيانات بروفايل الدكتور 
      const response = await axios.get('http://localhost:5000/api/doctor/profile', {
        headers: {
          'Authorization': `Bearer ${token}` // إرسال التوكن في الـ Header
        }
      });
      return response.data; // axios يضع البيانات في response.data تلقائياً
    } catch (error) {
      // axios يضع الخطأ في error.response.data أو error.message
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async Thunk لحفظ بيانات الدكتور باستخدام axios
export const updateDoctorProfile = createAsyncThunk(
  'doctorProfile/updateDoctorProfile',
  async (profileData, { rejectWithValue }) => {
    // profileData ستكون FormData عند التعامل مع الملفات
    try {
      const token = localStorage.getItem('token'); // احصل على التوكن

      if (!token) {
        return rejectWithValue('No authentication token found.');
      }

      //  نقطة نهاية الـ API الفعلية لحفظ بيانات بروفايل الدكتور 
      // إذا كنت ترسل FormData (بسبب الملفات)، فـ axios سيتعامل مع Content-Type تلقائياً
      const response = await axios.put('http://localhost:5000/api/doctor/profile', profileData, {
        headers: {
          'Authorization': `Bearer ${token},`
          // 'Content-Type': 'multipart/form-data' // axios سيتعامل مع هذا تلقائياً
        }
      });
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
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // reducer نقي لإعادة تعيين حالة التحميل والأخطاء
    resetProfileStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    // يمكن إضافة reducers نقية هنا لتحديثات فورية صغيرة إذا لزم الأمر،
    // لكن يفضل أن يكون المصدر الرئيسي للبيانات هو الـ thunks التي تتفاعل مع الـ API
    // مثلاً: setDoctorField: (state, action) => { state.data[action.payload.field] = action.payload.value; }
  },
  extraReducers: (builder) => {
    builder
      // حالات الثنك fetchDoctorProfile
      .addCase(fetchDoctorProfile.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(fetchDoctorProfile.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload; state.error = null; })
      .addCase(fetchDoctorProfile.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; state.data = DEFAULT_DOCTOR_PROFILE_DATA; }) // إعادة للبيانات الافتراضية عند الفشل

      // حالات الثنك updateDoctorProfile
      .addCase(updateDoctorProfile.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(updateDoctorProfile.fulfilled, (state, action) => { state.status = 'succeeded'; state.data = action.payload; state.error = null; })
      .addCase(updateDoctorProfile.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; });
  },
});

export const { resetProfileStatus } = doctorProfileSlice.actions;
export default doctorProfileSlice.reducer;