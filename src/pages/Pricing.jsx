import React from 'react'
import Header from './common/Landing/Header'
import Footer from './common/Landing/Footer'
import {
    Check,
    X,
    Zap,
    Shield,
    Globe,
    HelpCircle,
    CheckCircle2,
    ArrowRight,
    Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Pricing = () => {
    const plans = [
        {
            name: 'Basic',
            price: '₹1,499',
            desc: 'Essential features for small retail shops and boutiques.',
            features: [
                '1 Store License',
                'Unlimited Products',
                'Basic Analytics',
                '2 Terminal Users',
                'Email Support',
                'Standard Receipt Printing'
            ],
            missing: [
                'Multi-store Inventory',
                'Advanced Reporting',
                'Priority 24/7 Support',
                'White-label Billing',
                'API Access'
            ],
            cta: 'Start Free Trial',
            popular: false
        },
        {
            name: 'Professional',
            price: '₹2,999',
            desc: 'Powerful tools for growing businesses with multiple locations.',
            features: [
                'Up to 5 Stores',
                'Unlimited Products',
                'Advanced Analytics',
                'Unlimited Terminal Users',
                'Priority Email & Chat',
                'Custom Receipt Branding',
                'Multi-store Inventory',
                'Staff Performance Tracking'
            ],
            missing: [
                'White-label Billing',
                'Dedicated Account Manager',
                'On-site Training'
            ],
            cta: 'Choose Professional',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            desc: 'Scale your large enterprise with custom integrations and security.',
            features: [
                'Unlimited Stores',
                'Unlimited Products',
                'Enterprise-grade Analytics',
                'Dedicated Support Team',
                'White-label Billing',
                'Full API & Webhook Access',
                'Custom Integrations',
                'On-site Training & Setup'
            ],
            missing: [],
            cta: 'Contact Sales',
            popular: false
        }
    ]

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            {/* ── Hero ── */}
            <section className="relative pt-32 pb-20 overflow-hidden text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-8">
                        <Zap className="w-4 h-4" />
                        Transparent Pricing
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">Plans that grow <span className="text-primary italic">with you</span></h1>
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Simple, predictable pricing for every stage of your business. No hidden fees, no complicated contracts.
                    </p>
                </div>
            </section>

            {/* ── Pricing Grid ── */}
            <section className="py-20 flex-1 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    {plans.map((p, i) => (
                        <div key={i} className={`relative flex flex-col p-8 rounded-[2.5rem] border ${p.popular ? 'border-primary shadow-2xl shadow-primary/20 bg-card' : 'border-border/60 bg-muted/20'} transition-all hover:scale-[1.02] duration-300`}>
                            {p.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-black tracking-tight mb-2">{p.name}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                            </div>

                            <div className="mb-10 flex items-baseline gap-2">
                                <span className="text-5xl font-black">{p.price}</span>
                                <span className="text-sm text-muted-foreground font-bold italic">{p.price !== 'Custom' ? '/month' : ''}</span>
                            </div>

                            <div className="flex-1 space-y-6 mb-12">
                                <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">What's Included</h4>
                                <ul className="space-y-4">
                                    {p.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center p-1 shrink-0 mt-0.5 border border-green-500/10">
                                                <Check className="w-4 h-4 text-green-500" />
                                            </div>
                                            <span className="text-sm font-semibold text-foreground/80 leading-snug">{f}</span>
                                        </li>
                                    ))}
                                    {p.missing.map((m, idx) => (
                                        <li key={idx} className="flex items-start gap-3 opacity-40 grayscale">
                                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center p-1 shrink-0 mt-0.5 border border-border/80">
                                                <X className="w-3 h-3 text-muted-foreground" />
                                            </div>
                                            <span className="text-sm font-medium text-muted-foreground leading-snug">{m}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                size="lg"
                                variant={p.popular ? 'default' : 'outline'}
                                className={`h-14 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${p.popular ? 'shadow-xl shadow-primary/20 hover:shadow-2xl' : 'border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary'}`}
                            >
                                {p.cta} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQ Quick Link */}
                <div className="mt-20 max-w-2xl mx-auto rounded-3xl border border-border/60 bg-card/80 backdrop-blur-xl p-8 flex flex-col sm:flex-row items-center gap-6 justify-between transform hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <HelpCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-black text-lg">Have more questions?</h4>
                            <p className="text-sm text-muted-foreground">Check out our full pricing FAQ section.</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="h-12 rounded-xl border border-border/60 font-bold text-xs uppercase tracking-widest hover:text-primary hover:bg-primary/5 transition-all">
                        View FAQ <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Pricing
