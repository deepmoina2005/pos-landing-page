import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';
import AuthRoutes from './routes/AuthRoutes';
import Landing from './pages/common/Landing/Landing';
import PageNotFound from './pages/common/PageNotFound';
import DesktopApp from './pages/DesktopApp';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Solution from './pages/Solution';
import MobileApp from './pages/MobileApp';
import { getUserProfile } from './Redux Toolkit/features/user/userThunks';

const App = () => {
  const dispatch = useDispatch();

  // Load user profile from JWT on app start
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(getUserProfile(jwt));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/desktop" element={<DesktopApp />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/mobile" element={<MobileApp />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;