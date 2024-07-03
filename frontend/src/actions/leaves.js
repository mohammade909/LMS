import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to request leave
export const requestLeave = createAsyncThunk(
  'leave/requestLeave',
  async (leaveData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/leave/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leaveData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk to approve leave
export const approveLeave = createAsyncThunk(
  'leave/approveLeave',
  async (leaveId, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/leave/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leave_id: leaveId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk to decline leave
export const declineLeave = createAsyncThunk(
  'leave/declineLeave',
  async (leaveId, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/leave/decline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leave_id: leaveId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
