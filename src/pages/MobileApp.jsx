import React from 'react'
import Header from './common/Landing/Header'
import Footer from './common/Landing/Footer'
import { 
  Smartphone, 
  Download, 
  Zap, 
  Shield, 
  Globe, 
  Star, 
  ChevronRight,
  AppWindow,
  PlayCircle,
  Apple
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const MobileApp = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            {/* ── Hero ── */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center bg-muted/20 border-b border-border/40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8">
                        <Smartphone className="w-4 h-4" />
                        Mobile App
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">POS Pro <span className="text-primary italic">Mobile</span></h1>
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Manage your store from the palm of your hand. Real-time updates, quick sales, and customer insights on the go.
                    </p>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-xl gap-2 hover:scale-105 transition-all">
                            <Apple className="w-5 h-5" />
                            App Store
                        </Button>
                        <Button size="lg" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-xl gap-2 hover:scale-105 transition-all">
                            <PlayCircle className="w-5 h-5" />
                            Play Store
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── Mobile Layout ── */}
            <section className="py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    {/* Visual: Phone Mockup */}
                    <div className="relative flex justify-center">
                         <div className="w-72 h-[580px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-[0_0_80px_rgba(var(--primary),0.15)] relative overflow-hidden group">
                             {/* Phone Top Notch */}
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-b-2xl z-20" />
                             
                             {/* Phone Content Mockup */}
                             <div className="p-6 pt-12 space-y-6">
                                 <div className="flex items-center justify-between">
                                     <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/20" />
                                     <div className="w-12 h-2 rounded-full bg-muted/30" />
                                 </div>
                                 <div className="p-4 rounded-2xl bg-primary/10 border border-primary/10 space-y-3">
                                     <p className="text-[10px] uppercase font-black text-primary tracking-widest">Today's Sales</p>
                                     <p className="text-xl font-black text-foreground">₹48,290</p>
                                     <div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden">
                                         <div className="w-3/4 h-full bg-primary" />
                                     </div>
                                 </div>
                                 <div className="space-y-3">
                                     {[1, 2, 3, 4].map((i) => (
                                         <div key={i} className="p-3 bg-card border border-border/60 rounded-xl flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                  <div className="w-8 h-8 rounded-lg bg-muted border border-border/40" />
                                                  <div className="space-y-1">
                                                      <div className="w-16 h-2 bg-muted rounded-full" />
                                                      <div className="w-10 h-1.5 bg-muted/50 rounded-full" />
                                                  </div>
                                              </div>
                                              <div className="w-8 h-2 bg-primary/10 rounded-full" />
                                         </div>
                                     ))}
                                 </div>
                             </div>
                         </div>
                         {/* Secondary Decorative phone */}
                         <div className="absolute -bottom-10 -right-4 w-64 h-[500px] bg-zinc-900/40 backdrop-blur-xl rounded-[3rem] border-4 border-zinc-800/40 hidden lg:block -z-10 shadow-2xl transition-transform group-hover:translate-x-4" />
                    </div>

                    {/* Features Info */}
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">Your Store, Any Time, <span className="text-primary italic">Everywhere</span></h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Experience true mobility. Scan barcodes using your camera, manage orders from the sales floor, and keep track of your team — all with our powerful mobile application.
                            </p>
                        </section>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: <Star className="w-5 h-5 text-yellow-500" />, title: 'Highly Rated', desc: '4.8/5 on App Store and Play Store.' },
                                { icon: <Zap className="w-5 h-5 text-primary" />, title: 'Lightning Fast', desc: 'Zero-lag performance even on older devices.' },
                                { icon: <Shield className="w-5 h-5 text-green-500" />, title: 'Biometric Security', desc: 'Unlock with FaceID or Fingerprint.' },
                                { icon: <Globe className="w-5 h-5 text-blue-500" />, title: 'Always Synced', desc: 'Deta-updates ensure you stay current.' },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-all">
                                    <div className="mb-4">{f.icon}</div>
                                    <h4 className="font-black text-sm mb-1">{f.title}</h4>
                                    <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="pt-4">
                             <Button size="lg" className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl transition-all">
                                Learn More
                                <ChevronRight className="w-4 h-4 ml-2" />
                             </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default MobileApp
