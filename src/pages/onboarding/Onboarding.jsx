/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import OwnerDetailsForm from './OwnerDetailsForm';
import StoreDetailsForm from './StoreDetailsForm';
import { signup } from '../../Redux Toolkit/features/auth/authThunk';
import { createStore, getStoreByAdmin } from '../../Redux Toolkit/features/store/storeThunks';
import { getUserProfile } from '../../Redux Toolkit/features/user/userThunks';
import { useNavigate, useLocation } from 'react-router';
import { ThemeToggle } from '../../components/theme-toggle';
import { CheckCircle2, Store, User, Mail, ArrowRight, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { normalizeRole } from '../../utils/userRole';

const Onboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading: authLoading, error: authError } = useSelector((state) => state.auth || {});

  const verifiedEmail = location.state?.verifiedEmail || '';

  const [step, setStep] = useState(1);
  const [fadeIn, setFadeIn] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: verifiedEmail,
    password: '',
    confirmPassword: '',
    storeName: '',
    storeType: '',
    storeAddress: '',
  });
  const [localError, setLocalError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        setLocalLoading(true);
        try {
          const userRes = await dispatch(getUserProfile(jwt)).unwrap();

          if (userRes && normalizeRole(userRes.role) === 'STORE_ADMIN') {
            try {
              const storeRes = await dispatch(getStoreByAdmin(jwt)).unwrap();

              if (storeRes && storeRes.id) {
                navigate('/store');
                return;
              } else {
                setStep(2); // Go to store details
              }
            } catch (err) {
              setStep(2);
            }
          }
        } catch (err) {
          localStorage.removeItem('jwt');
        }
        setLocalLoading(false);
      }
    };

    checkOnboarding();
  }, [dispatch, navigate]);

  const handleStepSubmit = async (stepData) => {
    setLocalError(null);
    const updatedFormData = { ...formData, ...stepData };
    setFormData(updatedFormData);

    if (step === 1) {
      setLocalLoading(true);
      try {
        const signupRes = await dispatch(
          signup({
            fullName: updatedFormData.fullName,
            email: updatedFormData.email?.trim().toLowerCase(),
            password: updatedFormData.password,
            role: 'STORE_ADMIN',
            // phoneNumber is now optional
          })
        ).unwrap();

        if (signupRes && signupRes.jwt) {
          localStorage.setItem('jwt', signupRes.jwt);
        }

        setFadeIn(false);
        setTimeout(() => {
          setStep(2); // Store Details Step
          setFadeIn(true);
        }, 150);
      } catch (err) {
        setLocalError(err || 'Signup failed');
      }
      setLocalLoading(false);
    } else if (step === 2) {
      setLocalLoading(true);
      try {
        await dispatch(
          createStore({
            name: updatedFormData.storeName,
            storeType: updatedFormData.storeType,
            contactAddress: updatedFormData.storeAddress,
          })
        ).unwrap();

        setFadeIn(false);
        setTimeout(() => {
          setStep(3);
          setFadeIn(true);
        }, 150);
      } catch (err) {
        setLocalError(err || 'Store creation failed');
      }
      setLocalLoading(false);
    }
  };

  const handleStepBack = () => {
    if (step > 1 && step < 3) {
      setFadeIn(false);
      setTimeout(() => {
        setStep(step - 1);
        setFadeIn(true);
      }, 150);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OwnerDetailsForm
            initialValues={{
              fullName: formData.fullName,
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      case 2:
        return (
          <StoreDetailsForm
            initialValues={{
              storeName: formData.storeName,
              storeType: formData.storeType,
              storeAddress: formData.storeAddress,
            }}
            onSubmit={handleStepSubmit}
            onBack={handleStepBack}
          />
        );
      case 3:
        return (
          <div className="text-center space-y-8 py-6">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-primary/5">
                <CheckCircle2 className="w-12 h-12 text-primary animate-in zoom-in duration-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-900">
                <Award className="w-4 h-4 text-yellow-900" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">Perfectly Set Up!</h2>
              <p className="text-muted-foreground max-w-xs mx-auto text-base">
                Your store is live and your admin account is ready. Welcome to the future of retail management.
              </p>
            </div>

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 max-w-sm mx-auto">
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Store Name</p>
                  <p className="text-lg font-bold text-foreground">{formData.storeName}</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => navigate('/store')}
              className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = Math.round((step / 3) * 100);

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="absolute top-4 right-4 z-30">
        <ThemeToggle />
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-green-600 via-emerald-700 to-green-950">
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white w-full">
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 mb-6 text-sm font-medium">
                Professional POS Setup • 3 Steps to Launch
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                Launch your store with a smarter POS experience
              </h1>

              <div className="space-y-6 mt-12">
                {[
                  { icon: <User className="w-5 h-5" />, text: 'Account Details' },
                  { icon: <Store className="w-5 h-5" />, text: 'Store Configuration' },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'Dashboard Access' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${step > index + 1 ? 'bg-white text-emerald-700 border-white' : step === index + 1 ? 'bg-white/20 text-white border-white' : 'bg-transparent text-white/40 border-white/20'}`}>
                      {step > index + 1 ? <CheckCircle2 className="w-6 h-6" /> : item.icon}
                    </div>
                    <span className={`text-lg transition-all duration-500 tracking-wide ${step >= index + 1 ? 'text-white font-medium' : 'text-white/40'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-24 lg:py-10">
          <div className="w-full max-w-xl">
            <Card className="border-border/60 bg-card/90 dark:bg-zinc-900/85 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                      {step === 1 ? 'Owner Identity' : step === 2 ? 'Store Details' : 'Congratulations!'}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      {step === 1 ? 'Your professional identity' : step === 2 ? 'Tell us about your business' : 'Ready to start exploring'}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 font-bold">
                    {step}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Progress: {progressPercentage}%</span>
                    <span>Step {step} of 3</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {(localError || authError) && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300 px-4 py-3 text-sm animate-in slide-in-from-top-2">
                    {localError || authError}
                  </div>
                )}

                {(localLoading || authLoading) && (
                  <div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 text-primary px-4 py-3 text-sm flex items-center gap-3 animate-pulse">
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Processing Securely...
                  </div>
                )}

                <div className={`transition-all duration-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {renderStep()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
