import React from 'react'
import { Button } from '@/components/ui/button'
import Header from './common/Landing/Header'
import Footer from './common/Landing/Footer'
import {
  Monitor,
  Download,
  Shield,
  Zap,
  Wifi,
  WifiOff,
  HardDrive,
  RefreshCcw,
  CheckCircle2,
  ShoppingCart,
} from 'lucide-react'

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Lightning Fast',
    desc: 'Native performance with instant billing, zero lag even during peak hours.',
  },
  {
    icon: <WifiOff className="w-6 h-6" />,
    title: 'Offline Mode',
    desc: 'Continue operations without internet. Data syncs automatically when back online.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure & Encrypted',
    desc: 'End-to-end encryption keeps your data safe on your local machine.',
  },
  {
    icon: <HardDrive className="w-6 h-6" />,
    title: 'Local Data Backup',
    desc: 'Automatic local backups ensure you never lose critical business data.',
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: 'Cloud Sync',
    desc: 'Seamless sync across all devices — desktop, web, and mobile.',
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: 'Auto Updates',
    desc: 'Always stay up to date with automatic background updates.',
  },
]

const requirements = [
  'Windows 10 / 11 (64-bit)',
  '4 GB RAM minimum',
  '200 MB disk space',
  'Internet for initial setup & cloud sync',
]

const DesktopApp = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/downloads/pos.exe'
    link.setAttribute('download', 'pos.exe')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Same Header as Landing page */}
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-10 left-0 h-96 w-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 120 }).map((_, i) => (
              <div key={i} className="border-r border-t border-foreground/20" />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Monitor className="w-4 h-4" />
            Desktop Application
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            POS Pro for
            <span className="text-primary"> Desktop</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get the full power of POS Pro as a native desktop app. Blazing fast, works offline, and syncs seamlessly with your cloud account.
          </p>

          {/* Download CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleDownload}
              className="h-14 px-8 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 gap-2"
            >
              <Download className="w-5 h-5" />
              Download for Windows
            </Button>
            <p className="text-sm text-muted-foreground">
              v2.1.0 &middot; 48 MB &middot; Windows 10+
            </p>
          </div>

          {/* Hero illustration */}
          <div className="mt-16 relative max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border/60 bg-card/80 dark:bg-zinc-900/70 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Window title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60 bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-muted-foreground ml-2 font-medium">POS Pro — Desktop</span>
              </div>
              {/* App preview content */}
              <div className="p-8 sm:p-12 flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Point of Sale Dashboard</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    Manage billing, inventory, analytics, and more — all from your desktop.
                  </p>
                </div>
                {/* Fake stat cards */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
                  {[
                    { label: "Today's Sales", val: '₹24,580' },
                    { label: 'Orders', val: '142' },
                    { label: 'Items in Stock', val: '1,284' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border/50 bg-background/60 p-3 text-center"
                    >
                      <p className="text-lg font-bold text-foreground">{s.val}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Why Go <span className="text-primary">Desktop?</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg max-w-xl mx-auto">
              All the benefits of a native application, seamlessly connected to your cloud.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border/50 bg-card/80 dark:bg-zinc-900/60 backdrop-blur-sm p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── System Requirements ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-10">
            System Requirements
          </h2>
          <div className="rounded-2xl border border-border/60 bg-card/80 dark:bg-zinc-900/60 p-8 inline-block text-left">
            <ul className="space-y-4">
              {requirements.map((r) => (
                <li key={r} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-sm sm:text-base">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-lg mx-auto">
            Download POS Pro for desktop and start managing your store with blazing fast performance.
          </p>
          <Button
            size="lg"
            onClick={handleDownload}
            className="mt-8 h-14 px-10 text-lg font-semibold rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 gap-2"
          >
            <Download className="w-5 h-5" />
            Download Now
          </Button>
        </div>
      </section>

      {/* Same Footer as Landing page */}
      <Footer />
    </div>
  )
}

export default DesktopApp
