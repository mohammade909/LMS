import { createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser,deleteUser, updateUser, getUserById } from "../actions/user";
// Example asynchronous thunk to handle login

const initialState = {
  users: null,
  loading: false,
  error: null,
  message: null,
  user: null,
  absents: null,
};

const staffSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Define any synchronous actions here if needed
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        // Remove deleted student from the state
        state.staff = state.staff.filter(
          (staf) => staf.staff_id !== action.payload.staffId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // .addCase(getEntries.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getEntries.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.absents = action.payload.absents;
      // })
      // .addCase(getEntries.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload.error;
      // })
      // .addCase(setAbsent.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(setAbsent.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.message = action.payload.message;
      // })
      // .addCase(setAbsent.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload.error;
      // })
      // .addCase(setPresent.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      //   state.message = null;
      // })
      // .addCase(setPresent.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.message = action.payload.message;
      // })
      // .addCase(setPresent.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload.error;
      // });
  },
});

export const { clearErrors, clearMessage } = staffSlice.actions;

export default staffSlice.reducer;
