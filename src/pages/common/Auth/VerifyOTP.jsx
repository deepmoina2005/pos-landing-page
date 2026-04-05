import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  ShoppingCart, 
  ShieldCheck,
  RefreshCcw 
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyResetToken,
  forgotPassword,
} from "@/Redux Toolkit/features/auth/authThunk";
import { ThemeToggle } from "../../../components/theme-toggle";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { forgotPasswordLoading } = useSelector((state) => state.auth);

  // Timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (!email) {
      toast({
        title: "Email missing",
        description: "Please restart the process.",
        variant: "destructive",
      });
      return;
    }

    const res = await dispatch(forgotPassword({ email }));
    if (forgotPassword.fulfilled.match(res)) {
      toast({
        title: "OTP Resent",
        description: "A new code has been sent to your email.",
      });
      setTimer(60); // Reset timer
    } else {
      toast({
        title: "Failed",
        description: res?.payload || "Unable to resend OTP.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (otp.length < 6) return;
    setIsLoading(true);
    try {
      const res = await dispatch(verifyResetToken(otp));
      if (verifyResetToken.fulfilled.match(res)) {
        toast({
          title: "Verified!",
          description: "OTP verified successfully.",
        });
        setTimeout(() => {
          navigate(`/auth/update-password?token=${otp}&email=${encodeURIComponent(email)}`);
        }, 1000);
      } else {
        toast({
          title: "Verification Failed",
          description: res?.payload || "Invalid OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = () => {
    navigate("/auth/forgot-password");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground tracking-tight">
              POS Pro
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Security Verification
          </h1>
        </div>

        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-8 pt-10">
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 font-bold">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Verification code sent to
              </p>
              <p className="font-semibold text-foreground text-lg">
                {email}
              </p>
            </div>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              onComplete={handleSubmit}
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
                onClick={handleSubmit}
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
                    onClick={handleResend}
                    className="text-sm font-semibold text-primary hover:underline transition-all"
                    disabled={forgotPasswordLoading}
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
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;