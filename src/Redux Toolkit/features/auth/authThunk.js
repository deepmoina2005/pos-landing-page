import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// ✅ Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/signup", userData);
      localStorage.setItem("jwt", res.data.jwt);
      console.log("Signup success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Signup error:", err);
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// ✅ Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {

    console.log("Credentials:", credentials);
    try {
      const res = await api.post("/api/auth/login", credentials);
      const data = res.data;
      console.log("Login success:", data);
      localStorage.setItem("jwt", data.jwt);
      // Optional: Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      console.error("Login error:", err);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/forgot-password", data);
      console.log("Forgot password success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Forgot password error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);

// ✅ Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/reset-password", { token, password });
      console.log("Reset password success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Reset password error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to reset password");
    }
  }
);

// ✅ Verify Reset Token
export const verifyResetToken = createAsyncThunk(
  "auth/verifyResetToken",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/verify-reset-token", { token });
      console.log("Verify reset token success:", res.data);
      return res.data;
    } catch (err) {
      console.error("Verify reset token error:", err);
      return rejectWithValue(err.response?.data?.message || "Invalid or expired OTP");
    }
  }
);

// ✅ Send Email OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/send-otp", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send OTP");
    }
  }
);

// ✅ Verify Email OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/verify-otp", { email, otp });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid OTP");
    }
  }
);