import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = "https://react-interview.crd4lc.easypanel.host";


export const getcourse = createAsyncThunk(
  'course/getcourse',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token'); 
    try {
      const response = await axios.get(`${base_url}/api/course`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log(response.data.data.data)
      return response.data.data.data; 
    } catch (error) {
      
      const errorMessage = error.response?.data?.detail || 'Failed to fetch courses';
      return rejectWithValue(errorMessage); 
    }
  }
);

const initialState = {
  course: [], 
  status: 'idle', 
  error: null, 
};

const coursedata = createSlice({
  name: 'coursedata', 
  initialState, 
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getcourse.pending, (state) => {
        state.status = 'loading'; 
      })
      .addCase(getcourse.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.course = action.payload; 
      })
      .addCase(getcourse.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload; 
      });
  },
});

export default coursedata.reducer;
