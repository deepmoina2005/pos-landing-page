import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  ShoppingCart,
  Mail,
  ShieldCheck,
  RefreshCcw,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { ThemeToggle } from '../../../components/theme-toggle'
import { useDispatch } from 'react-redux'
import { sendOtp, verifyOtp } from '../../../Redux Toolkit/features/auth/authThunk'
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(0)

  const [formData, setFormData] = useState({
    email: '',
  })

  // Validation schema for email
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email address is required'),
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    let interval

    if (showOtpInput && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [showOtpInput, timer])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendOtp = async (email) => {
    const emailToUse = email || formData.email;
    
    if (!emailToUse) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      await dispatch(sendOtp(emailToUse)).unwrap()

      setFormData({ email: emailToUse })
      setShowOtpInput(true)
      setOtp('')
      setTimer(60)

      toast({
        title: 'OTP Sent',
        description: `Verification code sent to ${formData.email}`,
      })
    } catch (error) {
      console.error('Send OTP Error:', error)

      toast({
        title: 'Error',
        description: typeof error === 'string' ? error : 'Failed to send OTP',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (values) => {
    if (!showOtpInput) {
      await handleSendOtp(values.email)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 6-digit OTP',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      await dispatch(verifyOtp({ email: formData.email, otp })).unwrap()

      toast({
        title: 'Email Verified',
        description: "Let's complete your profile.",
      })

      navigate('/auth/onboarding', {
        state: { verifiedEmail: formData.email },
      })
    } catch (error) {
      console.error('OTP Verification Error:', error)

      toast({
        title: 'Error',
        description: typeof error === 'string' ? error : 'Invalid verification code. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangeEmail = () => {
    setShowOtpInput(false)
    setOtp('')
    setTimer(0)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-background via-primary/5 to-background dark:from-zinc-950 dark:via-zinc-900/70 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-foreground/20" />
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center space-x-3 mb-5 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
              <ShoppingCart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
              POS Pro
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {showOtpInput ? 'Verify Your Email' : 'Start Your Journey'}
          </h1>

          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {showOtpInput
              ? "We've sent a code to your email"
              : 'Verify your email to get started'}
          </p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/90 dark:bg-zinc-900/85 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 p-6 md:p-8">
          {!showOtpInput ? (
            <Formik
              initialValues={{ email: formData.email }}
              validationSchema={emailValidationSchema}
              onSubmit={handleRegister}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">
                      Email Address
                    </label>

                    <div className="relative">
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        className={`h-11 rounded-xl border-border/70 bg-background/80 dark:bg-zinc-950/80 focus-visible:ring-2 focus-visible:ring-primary/20 ${
                          errors.email && touched.email ? 'border-destructive' : ''
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-destructive text-[10px] mt-1 ml-1"
                    />

                    <p className="text-[10px] text-muted-foreground mt-1.5 ml-1 opacity-70">
                      We will send a 6-digit verification code to this email.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending OTP...
                      </div>
                    ) : (
                      'Verify Email Address'
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>

              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Verification code sent to
                </p>
                <p className="font-semibold text-foreground text-lg">
                  {formData.email}
                </p>
              </div>

              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                onComplete={handleVerifyOtp}
                className="w-full flex justify-center"
              >
                <InputOTPGroup className="gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="
                        h-14 
                        w-12 
                        rounded-2xl 
                        border 
                        border-border/60 
                        bg-background/80 
                        dark:bg-zinc-900/80
                        backdrop-blur-xl
                        text-xl 
                        p-4
                        font-semibold 
                        text-foreground
                        shadow-sm
                        transition-all
                        duration-200
                        focus-visible:ring-2
                        focus-visible:ring-primary/40
                        focus-visible:border-primary
                        focus-visible:shadow-lg
                        focus-visible:shadow-primary/20
                        hover:border-primary/40
                        hover:shadow-md
                      "
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <div className="w-full space-y-4">
                <Button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20"
                  disabled={isLoading || otp.length < 6}
                >
                  {isLoading ? 'Verifying...' : 'Submit OTP'}
                </Button>

                <div className="text-center">
                  {timer > 0 ? (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      Resend code in{' '}
                      <span className="text-primary font-bold tabular-nums">
                        {timer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-sm font-semibold text-primary hover:underline transition-all"
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <div className="pt-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <RefreshCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                    Change email address
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register