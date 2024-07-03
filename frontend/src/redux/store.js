// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import attendanceReducer from "./attendanceSlice";
import leaveReducer from "./leaveSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  attendance: attendanceReducer,
  leaves: leaveReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
