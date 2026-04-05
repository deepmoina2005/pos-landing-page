import React from "react";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, CheckCircle } from "lucide-react";

const MobileAppShowcase = () => {
  const appFeatures = [
    "Real-time sales tracking",
    "Inventory management on the go",
    "Push notifications for low stock",
    "Mobile receipt generation",
    "Customer management",
    "Offline functionality",
  ];

  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-b from-background via-primary/5 to-background dark:from-zinc-950 dark:via-zinc-900/70 dark:to-zinc-950">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none">
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-r border-t border-foreground/20" />
          ))}
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Take Your Business <span className="text-primary">Anywhere</span> With Our Mobile App
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-8 max-w-2xl">
              Our mobile app gives you the freedom to manage your business from anywhere.
              Check sales, update inventory, and stay connected with your team — all from your smartphone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 rounded-xl border border-border/50 bg-background/60 dark:bg-zinc-900/50 backdrop-blur-sm p-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-foreground/90 text-sm md:text-base leading-6">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group rounded-xl px-6">
                Download for iOS
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group rounded-xl border-border/60 bg-background/70 dark:bg-zinc-900/70 backdrop-blur hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                Download for Android
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative z-10 w-[280px] h-[580px] rounded-[42px] bg-zinc-950 p-3 shadow-[0_30px_80px_rgba(0,0,0,0.35)] border border-white/10 overflow-hidden">
                {/* Inner Bezel */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-black rounded-t-[38px] z-20">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl z-30" />
                </div>

                {/* Screen */}
                <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-background dark:bg-zinc-950 border border-border/50">
                  {/* App Header */}
                  <div className="bg-primary text-primary-foreground p-4 pt-14">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">POS Pro</h3>
                        <p className="text-xs opacity-80">Dashboard</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 ring-1 ring-white/20" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-xl border border-border/50 bg-muted/40 dark:bg-zinc-900/70 p-3 shadow-sm">
                        <p className="text-xs text-muted-foreground">Today's Sales</p>
                        <p className="text-lg font-bold text-foreground">₹12,450</p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          +8% from yesterday
                        </p>
                      </div>

                      <div className="rounded-xl border border-border/50 bg-muted/40 dark:bg-zinc-900/70 p-3 shadow-sm">
                        <p className="text-xs text-muted-foreground">Orders</p>
                        <p className="text-lg font-bold text-foreground">48</p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          +5 new today
                        </p>
                      </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm text-foreground">Recent Orders</h4>
                        <p className="text-xs text-primary font-medium">View All</p>
                      </div>

                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-border/50 bg-background dark:bg-zinc-900/80 p-3 mb-2 shadow-sm"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="text-xs font-medium text-foreground">
                                Order #{1000 + item}
                              </p>
                              <p className="text-xs text-muted-foreground">2 mins ago</p>
                            </div>
                            <p className="text-sm font-bold text-foreground">
                              ₹{(item * 450).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-foreground">
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {["New Sale", "Inventory", "Reports"].map((action, i) => (
                          <div
                            key={i}
                            className="rounded-xl border border-border/50 bg-muted/40 dark:bg-zinc-900/70 p-2 text-center"
                          >
                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-1">
                              <div className="w-4 h-4 bg-primary rounded-md" />
                            </div>
                            <p className="text-xs text-foreground/90">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 border-t border-border/60 bg-background/95 dark:bg-zinc-950/95 backdrop-blur p-2 flex justify-around">
                    {["Home", "Sales", "Products", "More"].map((item, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg transition-all ${
                          i === 0 ? "bg-primary/10" : "hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mx-auto rounded-md ${
                            i === 0 ? "bg-primary" : "bg-zinc-300 dark:bg-zinc-700"
                          }`}
                        />
                        <p
                          className={`text-[10px] mt-1 text-center ${
                            i === 0
                              ? "text-primary font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative glows */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl z-0" />
            </div>

            {/* QR Card */}
            <div className="absolute -right-4 bottom-20 z-20 rotate-3 rounded-2xl border border-border/60 bg-background/90 dark:bg-zinc-900/90 backdrop-blur-xl p-4 shadow-2xl shadow-black/10 dark:shadow-black/30">
              <div className="w-24 h-24 rounded-lg bg-muted dark:bg-zinc-800 mb-2 flex items-center justify-center border border-border/50">
                <div className="w-16 h-16 bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center rounded-sm">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-white dark:bg-zinc-900"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-center font-medium text-foreground">
                Scan to download
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;