import React from 'react';
import { Routes, Route } from 'react-router';
import Login from '../pages/common/Auth/Login';
import Register from '../pages/common/Auth/Register';
import Onboarding from '../pages/onboarding/Onboarding';
import ForgotPassword from '../pages/common/Auth/ForgotPassword';
import VerifyOTP from '../pages/common/Auth/VerifyOTP';
import UpdatePassword from '../pages/common/Auth/UpdatePassword';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify-otp" element={<VerifyOTP />} />
      <Route path="update-password" element={<UpdatePassword />} />
    </Routes>
  );
};

export default AuthRoutes;
