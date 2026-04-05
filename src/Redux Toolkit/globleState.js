import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice.js";
import userReducer from "./features/user/userSlice.js";

const globleState = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default globleState;
