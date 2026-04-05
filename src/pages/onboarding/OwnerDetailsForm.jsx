import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react";
import { useState } from "react";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const OwnerDetailsForm = ({ initialValues, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, touched, errors }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Full Name
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Input}
                type="text"
                id="fullName"
                name="fullName"
                className={`pl-10 pr-3 ${touched.fullName && errors.fullName
                    ? "border-destructive"
                    : ""
                  }`}
                placeholder="Enter your full name"
              />
            </div>

            <ErrorMessage
              name="fullName"
              component="div"
              className="text-destructive text-sm mt-2"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Input}
                type="email"
                id="email"
                name="email"
                className={`pl-10 pr-3 ${touched.email && errors.email
                    ? "border-destructive"
                    : ""
                  }`}
                placeholder="Enter your email address"
              />
            </div>

            <ErrorMessage
              name="email"
              component="div"
              className="text-destructive text-sm mt-2"
            />
          </div>

         <div className='flex justify-between'>
           <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Input}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="pl-10 pr-12"
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </div>

            <ErrorMessage
              name="password"
              component="div"
              className="text-destructive text-sm mt-2"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Confirm Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>

              <Field
                as={Input}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="pl-10 pr-12"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                )}
              </button>
            </div>

            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-destructive text-sm mt-2"
            />
          </div>
         </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Next Step
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OwnerDetailsForm;