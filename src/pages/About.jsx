import React from 'react'
import Header from './common/Landing/Header'
import Footer from './common/Landing/Footer'
import { 
  Users, 
  Target, 
  Heart, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Smartphone
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const About = () => {
    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: 'Precision Driven',
            desc: 'We believe detail is everything. Our software is built with high-precision checkout and inventory logic.',
        },
        {
            icon: <Heart className="w-6 h-6" />,
            title: 'Customer First',
            desc: 'Every feature we design starts with a conversation with actual store owners and managers.',
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Quality Excellence',
            desc: 'We never compromise on performance. POS Pro is optimized for speed and reliability.',
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
                        <Users className="w-4 h-4" />
                        Our Story
                    </div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">Revolutionizing <span className="text-primary italic">Retail</span></h1>
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        POS Pro was born out of a simple need: making high-performance store management accessible to everyone. From small boutiques to large enterprises.
                    </p>
                </div>
            </section>

            {/* ── Stats & Mission ── */}
            <section className="py-20 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">Our Mission</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We aim to empower business owners with tools that provide deep insights, seamless operations, and unmatched growth potential. We're not just a POS system; we're your partner in success.
                            </p>
                            <div className="space-y-4">
                                {[
                                    'Serving 10,000+ businesses worldwide',
                                    'Processing $1B+ in annual transactions',
                                    'Dedicated 24/7 global support team',
                                    '99.9% system uptime guarantee'
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-semibold text-foreground/80">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Visual Card */}
                        <div className="relative group">
                            <div className="rounded-[2.5rem] border border-border/60 bg-card p-12 shadow-2xl relative z-10 transform group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                                <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-full blur-3xl -z-10" />
                                <div className="text-center space-y-4">
                                    <h3 className="text-5xl font-black text-primary">2024</h3>
                                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">Pioneering the next gen of POS</p>
                                    <div className="pt-8 grid grid-cols-2 gap-4">
                                         <div className="p-6 rounded-2xl bg-muted/40 border border-border/40">
                                             <p className="text-2xl font-black">50+</p>
                                             <p className="text-[10px] text-muted-foreground uppercase font-black">Modules</p>
                                         </div>
                                         <div className="p-6 rounded-2xl bg-muted/40 border border-border/40">
                                             <p className="text-2xl font-black">500+</p>
                                             <p className="text-[10px] text-muted-foreground uppercase font-black">Partners</p>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 opacity-30" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="py-20 bg-muted/50 border-y border-border/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-black tracking-tight">Core Values</h2>
                         <p className="text-muted-foreground mt-4">The principles that drive every line of code we write.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((v, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    {v.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 leading-tight">{v.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default About
