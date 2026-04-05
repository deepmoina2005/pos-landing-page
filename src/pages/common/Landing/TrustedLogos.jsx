import {
  ShoppingBag,
  Building2,
  Carrot,
  Zap,
  Store,
  ShoppingCart,
  Briefcase,
  Coffee,
} from "lucide-react";
import React from "react";

const brands = [
  {
    name: "SuperMart",
    icon: <Building2 className="w-6 h-6" />,
    accent: "emerald",
  },
  {
    name: "Fresh Grocery",
    icon: <Carrot className="w-6 h-6" />,
    accent: "orange",
  },
  {
    name: "City Mall",
    icon: <ShoppingBag className="w-6 h-6" />,
    accent: "blue",
  },
  {
    name: "Express Retail",
    icon: <Zap className="w-6 h-6" />,
    accent: "purple",
  },
  {
    name: "Metro Stores",
    icon: <Store className="w-6 h-6" />,
    accent: "pink",
  },
  {
    name: "Quick Mart",
    icon: <ShoppingCart className="w-6 h-6" />,
    accent: "amber",
  },
  {
    name: "Business Hub",
    icon: <Briefcase className="w-6 h-6" />,
    accent: "indigo",
  },
  {
    name: "Café Chain",
    icon: <Coffee className="w-6 h-6" />,
    accent: "teal",
  },
];

const accentClasses = {
  emerald: {
    iconBg:
      "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20",
    text: "text-emerald-700 dark:text-emerald-400",
    hover: "group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10",
  },
  orange: {
    iconBg:
      "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/20",
    text: "text-orange-700 dark:text-orange-400",
    hover: "group-hover:border-orange-500/40 group-hover:shadow-orange-500/10",
  },
  blue: {
    iconBg:
      "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20",
    text: "text-blue-700 dark:text-blue-400",
    hover: "group-hover:border-blue-500/40 group-hover:shadow-blue-500/10",
  },
  purple: {
    iconBg:
      "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/20",
    text: "text-purple-700 dark:text-purple-400",
    hover: "group-hover:border-purple-500/40 group-hover:shadow-purple-500/10",
  },
  pink: {
    iconBg:
      "bg-pink-500/15 text-pink-400 ring-1 ring-pink-500/20",
    text: "text-pink-700 dark:text-pink-400",
    hover: "group-hover:border-pink-500/40 group-hover:shadow-pink-500/10",
  },
  amber: {
    iconBg:
      "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20",
    text: "text-amber-700 dark:text-amber-400",
    hover: "group-hover:border-amber-500/40 group-hover:shadow-amber-500/10",
  },
  indigo: {
    iconBg:
      "bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/20",
    text: "text-indigo-700 dark:text-indigo-400",
    hover: "group-hover:border-indigo-500/40 group-hover:shadow-indigo-500/10",
  },
  teal: {
    iconBg:
      "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/20",
    text: "text-teal-700 dark:text-teal-400",
    hover: "group-hover:border-teal-500/40 group-hover:shadow-teal-500/10",
  },
};

const TrustedLogos = () => {
  return (
    <section className="py-16 bg-muted/30 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted by leading retailers across India
          </h2>
          <p className="text-muted-foreground">
            Join thousands of successful businesses using our POS system
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {brands.map((brand) => {
            const styles = accentClasses[brand.accent];

            return (
              <div key={brand.name} className="group">
                <div
                  className={`
                    h-20 rounded-xl border p-4 flex items-center justify-center gap-3
                    transition-all duration-300 transform hover:scale-[1.03]
                    bg-white/80 border-border shadow-sm
                    dark:bg-zinc-900/80 dark:border-zinc-800 dark:shadow-lg dark:shadow-black/20
                    hover:shadow-xl ${styles.hover}
                    backdrop-blur-sm
                  `}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${styles.iconBg}`}
                  >
                    {brand.icon}
                  </div>

                  <span
                    className={`font-semibold text-sm md:text-base tracking-tight transition-transform duration-200 group-hover:scale-105 ${styles.text}`}
                  >
                    {brand.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "5,000+", label: "Active Users" },
            { number: "₹100M+", label: "Monthly Sales" },
            { number: "25+", label: "States Covered" },
            { number: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div
              key={index}
              className="
                rounded-xl p-6 border transition-all duration-300
                bg-white/80 border-border shadow-sm
                dark:bg-zinc-900/80 dark:border-zinc-800 dark:shadow-lg dark:shadow-black/20
                hover:shadow-xl backdrop-blur-sm
              "
            >
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedLogos;