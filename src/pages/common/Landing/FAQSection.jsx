import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I use the POS system offline?",
      answer:
        "Yes! Our POS system works completely offline. All data syncs automatically when you're back online, ensuring uninterrupted business operations even during internet outages.",
    },
    {
      question: "Is the system GST-compliant?",
      answer:
        "Absolutely! Our system is fully GST-compliant with automatic tax calculations, proper invoice formats, and comprehensive reporting that meets all Indian tax requirements.",
    },
    {
      question: "What kind of support is available?",
      answer:
        "We provide 24x7 customer support via phone, email, and live chat. Our dedicated support team is always ready to assist you with any questions or issues you might encounter.",
    },
    {
      question: "Can I manage multiple branches or stores?",
      answer:
        "Yes! Our multi-store management feature allows you to control all your locations from one centralized dashboard. You can manage inventory, track sales, and analyze performance across all your branches.",
    },
    {
      question: "How secure is my business data?",
      answer:
        "We implement bank-level security measures including end-to-end encryption, secure cloud storage, regular backups, and strict access controls to ensure your business data remains completely safe and protected.",
    },
    {
      question: "Can I customize receipts and invoices?",
      answer:
        "Yes, you can fully customize your receipts and invoices with your business logo, contact information, terms and conditions, and special offers or promotions. The system also supports multiple languages and currencies.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, we offer mobile apps for both iOS and Android devices. The mobile app allows you to manage your business on the go, check sales reports, update inventory, and receive important notifications.",
    },
    {
      question: "How easy is it to train new staff?",
      answer:
        "Our system is designed with user-friendliness in mind. New staff can typically learn the basics within 30 minutes. We also provide comprehensive training materials, video tutorials, and a guided onboarding process.",
    },
  ];

  const supportOptions = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      description: "Talk to our experts",
      action: "+91 98765 43210",
      buttonText: "Call Now",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Support",
      description: "Get answers by email",
      action: "support@pospro.com",
      buttonText: "Send Email",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Live Chat",
      description: "Chat with our team",
      action: "Available 24/7",
      buttonText: "Start Chat",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "Help Center",
      description: "Browse our resources",
      action: "Guides & Tutorials",
      buttonText: "Visit Help Center",
    },
  ];

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
            Help & Support
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-8">
            Everything you need to know about our POS system. Can&apos;t find the
            answer you&apos;re looking for? Please chat with our friendly team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side - FAQs */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-border/60 bg-background/75 dark:bg-zinc-900/75 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
              <div className="border-b border-border/50 px-6 py-5 md:px-8 bg-muted/30 dark:bg-zinc-800/30">
                <h3 className="text-xl font-bold text-foreground">
                  Common Questions
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick answers about features, billing, security, and support.
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-b border-border/50 last:border-b-0"
                  >
                    <AccordionTrigger className="px-6 md:px-8 py-5 text-left hover:no-underline hover:bg-muted/30 dark:hover:bg-zinc-800/30 text-foreground font-medium text-base transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 md:px-8 pb-5 pt-1 text-muted-foreground leading-7 text-sm md:text-base">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button
                variant="outline"
                className="group rounded-xl border-border/60 bg-background/70 dark:bg-zinc-900/70 backdrop-blur hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 px-6"
              >
                Contact Our Support Team
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </div>

          {/* Right Side - Support Options */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-border/60 bg-background/75 dark:bg-zinc-900/75 backdrop-blur-xl shadow-2xl shadow-black/5 dark:shadow-black/30 p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Support Options
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Reach our team through the channel that works best for you.
              </p>

              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border/50 bg-muted/30 dark:bg-zinc-800/30 p-4 hover:bg-muted/40 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
                        {option.icon}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {option.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {option.description}
                        </p>
                        <p className="text-sm font-medium text-foreground mb-3">
                          {option.action}
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-center rounded-lg border-border/60 bg-background/70 dark:bg-zinc-900/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                        >
                          {option.buttonText}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-5">
                <h4 className="font-semibold text-foreground mb-3">
                  Business Hours
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">
                      Monday - Friday:
                    </span>
                    <span className="font-medium text-foreground">
                      9:00 AM - 8:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Saturday:</span>
                    <span className="font-medium text-foreground">
                      10:00 AM - 6:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Sunday:</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;