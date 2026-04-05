import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { 
  Lock, 
  ShoppingCart, 
  CheckCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck
} from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, forgotPassword } from '@/Redux Toolkit/features/auth/authThunk'
import { ThemeToggle } from '../../../components/theme-toggle'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(6, 'OTP must be exactly 6 digits')
      .required('OTP is required'),
    password: Yup.string()
      .required('New password is required')
      .matches(
        passwordRegex,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { resetPasswordLoading, forgotPasswordLoading } = useSelector((state) => state.auth)

  const handleResendOTP = async () => {
    if (!email) return
    try {
      const resultAction = await dispatch(forgotPassword({ email }))
      if (forgotPassword.fulfilled.match(resultAction)) {
        toast({ title: "OTP Resent", description: "Verification code has been sent." })
      }
    } catch (error) {}
  }

  const handleSubmit = async (values) => {
    try {
      const resultAction = await dispatch(resetPassword({ token: values.otp, password: values.password }))
      if (resetPassword.fulfilled.match(resultAction)) {
        toast({ title: "Success", description: "Password reset successful!" })
        setTimeout(() => navigate('/auth/login'), 2000)
      } else {
        toast({ title: "Reset Failed", description: resultAction.payload || 'Invalid OTP', variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "Reset failed", variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20"><ThemeToggle /></div>
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"><ShoppingCart className="w-7 h-7 text-primary-foreground" /></div>
            <span className="text-3xl font-bold text-foreground tracking-tight">POS Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Secure Reset</h1>
          <p className="text-muted-foreground mt-2 max-w-[280px] mx-auto text-sm">
            {email ? `Verify the code sent to ${email.substring(0, 3)}***@***.com` : 'Enter verification code'}
          </p>
        </div>
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-8">
          <Formik initialValues={{ otp: '', password: '', confirmPassword: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">OTP Code</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><ShieldCheck className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
                    <Field as={Input} type="text" name="otp" maxLength={6} className={`pl-10 h-14 rounded-xl text-center tracking-[0.5em] text-xl font-bold border-border/60 ${errors.otp && touched.otp ? 'border-destructive' : ''}`} placeholder="000000" />
                  </div>
                  <ErrorMessage name="otp" component="p" className="text-destructive text-[10px] uppercase font-bold mt-1.5 ml-1" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">New Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
                      <Field as={Input} type={showPassword ? "text" : "password"} name="password" className={`pl-10 pr-12 h-12 rounded-xl border-border/60 ${errors.password && touched.password ? 'border-destructive' : ''}`} placeholder="••••••••" />
                      <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-destructive text-[10px] mt-1.5 ml-1 leading-relaxed" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
                      <Field as={Input} type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className={`pl-10 pr-12 h-12 rounded-xl border-border/60 ${errors.confirmPassword && touched.confirmPassword ? 'border-destructive' : ''}`} placeholder="••••••••" />
                      <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                    </div>
                    <ErrorMessage name="confirmPassword" component="p" className="text-destructive text-[10px] uppercase font-bold mt-1.5 ml-1" />
                  </div>
                </div>
                <Button type="submit" className="w-full py-6 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={resetPasswordLoading}>{resetPasswordLoading ? 'Resetting...' : 'Reset Password'}</Button>
                <div className="text-center space-y-2 pt-2">
                  <button type="button" onClick={handleResendOTP} disabled={forgotPasswordLoading} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors py-2 px-4 rounded-lg bg-primary/5 w-full">Resend OTP</button>
                  <Link to="/auth/login" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors p-2"><ArrowLeft className="w-3 h-3 mr-2" /> Back to Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
