import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { 
  Mail, 
  ShoppingCart, 
  ArrowLeft
} from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '@/Redux Toolkit/features/auth/authThunk'
import { ThemeToggle } from '../../../components/theme-toggle'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const ForgotPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { forgotPasswordLoading } = useSelector((state) => state.auth)

  const handleEmailSubmit = async (values) => {
    const email = values.email.trim().toLowerCase()
    const result = await dispatch(forgotPassword({ email }))
    if (forgotPassword.fulfilled.match(result)) {
      toast({ title: "OTP Sent", description: "Verification code sent!" })
      setTimeout(() => navigate(`/auth/verify-otp?email=${encodeURIComponent(email)}`), 1500)
    } else {
      toast({ title: "Error", description: result.payload, variant: "destructive" })
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
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Forgot Password?</h1>
          <p className="text-muted-foreground mt-2 text-sm italic">Enter your email to start the 3-step recovery process.</p>
        </div>
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-8 pt-10 transition-all animate-in fade-in slide-in-from-bottom-5 duration-500">
          <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleEmailSubmit}>
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 ml-1">Account Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10 transition-colors group-focus-within:text-primary"><Mail className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" /></div>
                    <Field as={Input} type="email" name="email" className={`pl-10 h-14 rounded-xl border-border/60 focus:ring-primary/20 transition-all ${errors.email && touched.email ? 'border-destructive focus:ring-destructive/20' : ''}`} placeholder="your@email.com" />
                  </div>
                  <ErrorMessage name="email" component="p" className="text-destructive text-[10px] uppercase font-bold mt-2 ml-1" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full py-3 text-lg font-medium" 
                  disabled={forgotPasswordLoading || isSubmitting}
                >
                  {forgotPasswordLoading ? 'Sending...' : 'Send OTP Code'}
                </Button>
                <div className="text-center pt-2">
                  <Link to="/auth/login" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-primary/5"><ArrowLeft className="w-3 h-3 mr-2" /> Back to Login</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
