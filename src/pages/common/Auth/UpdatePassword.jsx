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
import { resetPassword } from '@/Redux Toolkit/features/auth/authThunk'
import { ThemeToggle } from '../../../components/theme-toggle'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const UpdatePassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validationSchema = Yup.object().shape({
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
  const { resetPasswordLoading } = useSelector((state) => state.auth)

  const handleSubmit = async (values) => {
    if (!token) return
    const res = await dispatch(resetPassword({ token, password: values.password }))
    if (resetPassword.fulfilled.match(res)) {
      toast({ title: "Success", description: "Password updated!" })
      setTimeout(() => navigate('/auth/login'), 2000)
    } else {
      toast({ title: "Update Failed", description: res.payload, variant: "destructive" })
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20"><ThemeToggle /></div>
      <div className="w-full max-w-md relative z-10 transition-all duration-500 transform">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg"><ShoppingCart className="w-7 h-7 text-primary-foreground" /></div>
            <span className="text-3xl font-bold text-foreground tracking-tight">POS Pro</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Final Step</h1>
          <p className="text-muted-foreground mt-2 text-sm italic">Set your new high-security password account.</p>
        </div>
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-8 pt-10">
          <Formik initialValues={{ password: '', confirmPassword: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched, values }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 ml-1">Secure Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
                    <Field as={Input} type={showPassword ? "text" : "password"} name="password" className={`pl-10 pr-12 h-14 rounded-xl border-border/60 bg-background/40 ${errors.password && touched.password ? 'border-destructive' : ''}`} placeholder="Enter Password" />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                  </div>
                  <ErrorMessage name="password" component="p" className="text-destructive text-[10px] mt-2 ml-1 font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-2 ml-1">Confirm Pattern</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"><Lock className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" /></div>
                    <Field as={Input} type={showConfirmPassword ? "text" : "password"} name="confirmPassword" className={`pl-10 pr-12 h-14 rounded-xl border-border/60 bg-background/40 ${errors.confirmPassword && touched.confirmPassword ? 'border-destructive' : ''}`} placeholder="Enter Password Again" />
                    <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-muted-foreground hover:text-primary transition-colors" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="p" className="text-destructive text-[10px] uppercase font-black mt-2 ml-1" />
                </div>
                {!errors.password && values.password && (
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-start gap-2 animate-in slide-in-from-right-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground font-bold tracking-tight">Security requirements satisfied.</p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full py-3 text-lg font-medium"
                  disabled={resetPasswordLoading}
                >
                  {resetPasswordLoading ? 'Applying...' : 'Set Password'}
                </Button>
                <div className="text-center pt-2">
                  <Link to="/auth/forgot-password" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary p-2"><ArrowLeft className="w-3 h-3 mr-2" /> Start Over</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default UpdatePassword
