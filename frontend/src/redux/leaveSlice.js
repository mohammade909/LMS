import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { approveLeave,declineLeave,requestLeave } from '../actions/leaves'; 

const leaveSlice = createSlice({
  name: 'leave',
  initialState: { status: '', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(requestLeave.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(requestLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(approveLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(approveLeave.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(approveLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(declineLeave.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(declineLeave.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(declineLeave.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default leaveSlice.reducer;
