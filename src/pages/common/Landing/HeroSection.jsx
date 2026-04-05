import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-primary/5 to-primary/10 pt-24 pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Soft grid */}
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <div className="grid h-full grid-cols-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-primary" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="my-7 grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="text-center lg:text-left">

            {/* Heading */}
            <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl xl:text-6xl">
              <div className="bg-linear-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Powerful POS System <span className="text-foreground">
                  Built for Modern Retail Businesses
                </span>
              </div>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Manage billing, inventory, staff, and reports in one intelligent platform.
              Streamline operations, improve efficiency, and grow your business with a fast,
              secure, and reliable POS solution.
            </p>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">

              <Button
                onClick={() => navigate("/auth/register")}
                size="lg"
                className="group cursor-pointer h-14 rounded-xl px-8 text-base font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-xl px-8 cursor-pointer"
              >
                Request Demo
              </Button>

            </div>
          </div>

         {/* Right Image */}
<div className="relative hidden lg:flex justify-center lg:justify-end">
  <img
    src="/hero.png"
    alt="POS Software"
    className="relative z-10 w-full max-w-[620px] object-contain"
  />

  <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
  <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;