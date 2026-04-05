import React from "react";
import FeatureComparisonTable from "./FeatureComparisonTable";
import { ArrowDown } from "lucide-react";
import { Button } from "../../../components/ui/button";

const FeatureComparisonSection = () => {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-background via-muted/20 to-background dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Background glow */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div key={i} className="border-r border-t border-foreground/20" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4 backdrop-blur">
            Plan Comparison
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Compare <span className="text-primary">Features</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-8">
            See which plan is the best fit for your business goals, team size, and growth needs.
          </p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background/75 dark:bg-zinc-900/75 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
          <div className="border-b border-border/50 px-6 py-4 md:px-8 md:py-5 bg-muted/30 dark:bg-zinc-800/30">
            <h3 className="text-lg md:text-xl font-semibold text-foreground">
              Feature Comparison Table
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Compare essential tools, limits, and capabilities across all plans.
            </p>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <FeatureComparisonTable />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className="group rounded-xl border-border/60 bg-background/70 dark:bg-zinc-900/70 backdrop-blur hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-6"
          >
            View All Features
            <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparisonSection;