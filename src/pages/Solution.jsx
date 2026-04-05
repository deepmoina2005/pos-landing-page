import React from 'react'
import Header from './common/Landing/Header'
import Footer from './common/Landing/Footer'
import { 
  BarChart3, 
  Layers, 
  CreditCard, 
  Zap, 
  ShieldCheck, 
  Settings, 
  Box, 
  Users,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Solution = () => {
    const features = [
        {
            icon: <BarChart3 className="w-6 h-6" />,
            title: 'Real-time Analytics',
            desc: 'Get deep insights into your sales, inventory, and business growth directly on your dashboard.',
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: 'Multi-store Management',
            desc: 'Easily manage and track multiple store locations with centralized control and consolidated reporting.',
        },
        {
            icon: <CreditCard className="w-6 h-6" />,
            title: 'Quick Billing',
            desc: 'Lightning-fast checkout with multiple payment methods and automated tax calculation.',
        },
        {
            icon: <Box className="w-6 h-6" />,
            title: 'Smart Inventory',
            desc: 'Automated stock tracking, low-stock alerts, and supplier management to keep your business running.',
        },
        {
            icon: <ShieldCheck className="w-6 h-6" />,
            title: 'Highly Secure',
            desc: 'Role-based access control, data encryption, and regular security audits for your business safety.',
        },
        {
            icon: <Settings className="w-6 h-6" />,
            title: 'Customizable Settings',
            desc: 'Tailor the configuration of your terminal to match your specific business requirements.',
        },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            {/* ── Hero ── */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center bg-muted/20 border-b border-border/40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap className="w-4 h-4" />
                        Our Solutions
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">Tailored for <span className="text-primary italic">Every Business</span></h1>
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Whether you're running a single boutique or a nationwide retail chain, POS Pro provides the tools you need to streamline operations and maximize efficiency.
                    </p>
                </div>
            </section>

            {/* ── Feature Cards ── */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-black tracking-tight">Powerful Capabilities</h2>
                         <p className="mt-4 text-muted-foreground">Comprehensive features designed to help your business excel.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 leading-tight">{f.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 bg-primary/5 border-t border-border/60">
                 <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                     <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Ready to streamline your business?</h2>
                     <p className="text-lg text-muted-foreground">Join thousands of successful businesses that rely on POS Pro every day.</p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Button size="lg" onClick={() => navigate('/auth/register')} className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-2xl transition-all">
                             Start Free Trial
                             <ArrowRight className="w-4 h-4 ml-2" />
                         </Button>
                         <Button variant="outline" size="lg" onClick={() => navigate('/contact')} className="h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest border-border/60 hover:bg-muted transition-all">
                             Contact Sales
                         </Button>
                     </div>
                 </div>
            </section>

            <Footer />
        </div>
    )
}

export default Solution
