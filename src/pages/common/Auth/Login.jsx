import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShoppingCart,
  CheckCircle,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { login, forgotPassword } from '@/Redux Toolkit/features/auth/authThunk'
import { getUserProfile } from '@/Redux Toolkit/features/user/userThunks'
import { ThemeToggle } from '../../../components/theme-toggle'
import { normalizeRole } from '@/utils/userRole'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [forgotEmail, setForgotEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { error, loading } = useSelector((state) => state.auth)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const normalizedCredentials = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }
      const resultAction = await dispatch(login(normalizedCredentials))

      if (login.fulfilled.match(resultAction)) {
        const data = resultAction.payload
        const profileAction = await dispatch(getUserProfile(data.jwt))

        if (getUserProfile.fulfilled.match(profileAction)) {
          const userProfile = profileAction.payload

          // Only STORE_ADMIN (owner) can login on the public site
          if (normalizeRole(userProfile.role) !== 'STORE_ADMIN') {
            localStorage.removeItem('jwt')
            toast({
              title: 'Access Denied',
              description: 'Only store owners can sign in here. Please use the staff portal.',
              variant: 'destructive',
            })
            return
          }

          toast({
            title: 'Welcome back!',
            description: `Logged in as ${userProfile.fullName || userProfile.email}`,
          })
          // Stay on landing page — header will show profile automatically
          navigate('/')
        } else {
          toast({
            title: 'Profile Error',
            description: 'Failed to fetch user profile.',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Error',
          description: resultAction.payload || 'Login failed',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Login failed',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(forgotPassword(forgotEmail))
      if (forgotPassword.fulfilled.match(resultAction)) {
        setEmailSent(true)
        toast({ title: 'Success', description: 'Password reset email sent!' })
      } else {
        toast({
          title: 'Error',
          description: error || 'Failed to send reset email',
          variant: 'destructive',
        })
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to send reset email',
        variant: 'destructive',
      })
    }
  }

  const resetForgotPassword = () => {
    setShowForgotPassword(false)
    setEmailSent(false)
    setForgotEmail('')
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-background via-primary/5 to-background dark:from-zinc-950 dark:via-zinc-900/70 dark:to-zinc-950 flex items-center justify-center p-4">
      {/* Blobs */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-foreground/20" />
          ))}
        </div>
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
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
            {showForgotPassword ? 'Reset Password' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {showForgotPassword
              ? 'Enter your email to receive reset instructions'
              : 'Sign in to your account to continue'}
          </p>
        </div>

        {/* Login Form */}
        {!showForgotPassword && !emailSent && (
          <div className="rounded-3xl border border-border/60 bg-card/90 dark:bg-zinc-900/85 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11 rounded-xl border-border/70 bg-background/80 dark:bg-zinc-950/80 focus-visible:ring-2 focus-visible:ring-primary/20"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-12 h-11 rounded-xl border-border/70 bg-background/80 dark:bg-zinc-950/80 focus-visible:ring-2 focus-visible:ring-primary/20"
                    placeholder="Enter your password"
                    required
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
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="text-sm text-foreground">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/auth/forgot-password')}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword && !emailSent && (
          <div className="rounded-3xl border border-border/60 bg-card/90 dark:bg-zinc-900/85 backdrop-blur-xl shadow-2xl p-6 md:p-8">
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10 h-11 rounded-xl border-border/70 bg-background/80 dark:bg-zinc-950/80"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={resetForgotPassword}
                >
                  Back to Login
                </Button>
                <Button type="submit" className="flex-1 rounded-xl" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Email Sent */}
        {emailSent && (
          <div className="rounded-3xl border border-border/60 bg-card/90 dark:bg-zinc-900/85 backdrop-blur-xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Check Your Email</h3>
            <p className="text-muted-foreground mb-6">
              We've sent reset instructions to <strong>{forgotEmail}</strong>
            </p>
            <Button onClick={resetForgotPassword} className="w-full rounded-xl">
              Back to Login
            </Button>
          </div>
        )}

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
