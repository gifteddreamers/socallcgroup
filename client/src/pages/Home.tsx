import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";
import MockupGenerator from "@/components/MockupGenerator";
import ContactFooter from "@/components/ContactFooter";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Breadcrumb />
      
      <main>
        <Hero />
        
        {/* AI Mockup Generator - Primary CTA on homepage */}
        <MockupGenerator />
        
        {/* Services Overview - Links to /services page */}
        <section id="services" className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
                Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive solutions at the intersection of finance and creative technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl bg-[oklch(0.96_0.02_215)] hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.51_0.12_230)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-4">
                  Flat-Fee Accounting
                </h3>
                <p className="text-muted-foreground mb-6">
                  Transparent pricing based on transaction volume. Full-cycle bookkeeping, tax planning, and financial forecasting.
                </p>
                <Link
                  href="/services#pricing"
                  className="text-[oklch(0.51_0.12_230)] hover:text-[oklch(0.45_0.12_230)] font-semibold"
                >
                  View Pricing →
                </Link>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-[oklch(0.96_0.02_215)] hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.72_0.11_215)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-4">
                  Custom Web App Development
                </h3>
                <p className="text-muted-foreground mb-6">
                  Specialized web applications designed for workflows—from triage to service delivery.
                </p>
                <Link
                  href="/services#portfolio"
                  className="text-[oklch(0.51_0.12_230)] hover:text-[oklch(0.45_0.12_230)] font-semibold"
                >
                  View Portfolio →
                </Link>
              </div>
              
              <div className="text-center p-8 rounded-xl bg-[oklch(0.96_0.02_215)] hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.28_0.06_230)] flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-4">
                  AI Workflow Automation
                </h3>
                <p className="text-muted-foreground mb-6">
                  Integrate CRM, QuickBooks Online, and 800+ apps into custom dashboards for seamless automation.
                </p>
                <Link
                  href="/services#automation"
                  className="text-[oklch(0.51_0.12_230)] hover:text-[oklch(0.45_0.12_230)] font-semibold"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <ContactFooter />
    </div>
  );
}
