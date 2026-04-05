import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "Owner, Metro Retail",
      image: "/testimonial-1.jpg",
      content:
        "Implementing this POS system has transformed our business operations. The inventory management features alone have saved us countless hours and reduced errors by 35%.",
      rating: 5,
      businessType: "Supermarket",
      employeeCount: "50+",
      yearsSince: 2,
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Manager, Café Chain",
      image: "/testimonial-2.jpg",
      content:
        "The customer management features have helped us build stronger relationships with our regulars. We can now personalize our service based on purchase history and preferences.",
      rating: 5,
      businessType: "Restaurant",
      employeeCount: "25-50",
      yearsSince: 1.5,
    },
    {
      id: 3,
      name: "Vikram Singh",
      position: "Director, Business Hub",
      image: "/testimonial-3.jpg",
      content:
        "The analytics dashboard gives us real-time insights that have been crucial for our decision-making. We've optimized our product offerings and increased revenue by 28% in just six months.",
      rating: 4,
      businessType: "Electronics",
      employeeCount: "10-25",
      yearsSince: 1,
    },
    {
      id: 4,
      name: "Ananya Patel",
      position: "CEO, Quick Mart",
      image: "/testimonial-4.jpg",
      content:
        "The multi-store management capability has been a game-changer for our expanding business. We can now efficiently manage inventory across locations while maintaining centralized control.",
      rating: 5,
      businessType: "Convenience Store",
      employeeCount: "100+",
      yearsSince: 3,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-background via-muted/20 to-background dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Trusted by Businesses <span className="text-primary">Like Yours</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don&apos;t just take our word for it. See what our customers have to say about how our POS system has transformed their businesses.
          </p>
        </div>

        <div className="relative">
          {/* Large Quote Icon */}
          <div className="absolute -top-10 -left-6 md:-left-10 text-primary/10 dark:text-primary/15 pointer-events-none">
            <Quote className="w-24 h-24 md:w-32 md:h-32" />
          </div>

          {/* Testimonial Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="rounded-3xl border border-border/60 bg-background/80 dark:bg-zinc-900/75 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 p-6 md:p-10 relative z-10 h-full">
                    <div className="flex flex-col md:flex-row gap-8 h-full">
                      {/* Left */}
                      <div className="md:w-1/3 flex flex-col items-center md:items-start">
                        <div className="relative mb-5">
                          <div className="w-24 h-24 rounded-full overflow-hidden relative ring-4 ring-primary/10 border border-border bg-muted dark:bg-zinc-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-primary/5" />
                            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary">
                              {testimonial.name.charAt(0)}
                            </div>
                          </div>

                          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg shadow-primary/25">
                            <Quote className="w-4 h-4" />
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-foreground text-center md:text-left">
                          {testimonial.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-center md:text-left">
                          {testimonial.position}
                        </p>

                        <div className="flex items-center space-x-1 mb-5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < testimonial.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-zinc-300 dark:text-zinc-700"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="w-full rounded-2xl border border-border/50 bg-muted/40 dark:bg-zinc-800/50 p-4 space-y-3 text-sm mb-6">
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-foreground/80">Business</span>
                            <span className="text-muted-foreground text-right">
                              {testimonial.businessType}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-foreground/80">Team Size</span>
                            <span className="text-muted-foreground text-right">
                              {testimonial.employeeCount} employees
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium text-foreground/80">Using for</span>
                            <span className="text-muted-foreground text-right">
                              {testimonial.yearsSince}{" "}
                              {testimonial.yearsSince === 1 ? "year" : "years"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="md:w-2/3 flex flex-col justify-center">
                        <div className="relative rounded-2xl border border-border/40 bg-muted/30 dark:bg-zinc-800/30 p-6 md:p-8 mb-6">
                          <Quote className="w-8 h-8 text-primary/20 mb-4" />
                          <p className="text-lg md:text-xl leading-8 text-foreground/90 italic">
                            &quot;{testimonial.content}&quot;
                          </p>
                        </div>

                        <div className="mt-auto">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl border-border/60 bg-background/70 dark:bg-zinc-900/70 hover:bg-primary hover:text-primary-foreground transition-all"
                          >
                            Read Full Story
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary w-8 shadow-md shadow-primary/30"
                    : "bg-zinc-300 dark:bg-zinc-700 w-3 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:left-0 w-11 h-11 rounded-full border border-border/60 bg-background/80 dark:bg-zinc-900/80 backdrop-blur shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:right-0 w-11 h-11 rounded-full border border-border/60 bg-background/80 dark:bg-zinc-900/80 backdrop-blur shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "98%", label: "Customer Satisfaction" },
            { value: "₹2.5M+", label: "Revenue Processed" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border/50 bg-background/70 dark:bg-zinc-900/70 backdrop-blur p-6 text-center shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
