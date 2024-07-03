import { createSlice } from '@reduxjs/toolkit';

import { getAllAttendances, markAttendance } from '../actions/attendance'; 


const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { 
     status: '',
     error: null ,
     attendances: [],
     loading: false,
     message: null,
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(markAttendance.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(getAllAttendances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllAttendances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendances = action.payload;
      })
      .addCase(getAllAttendances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });

  },
});

export default attendanceSlice.reducer;
