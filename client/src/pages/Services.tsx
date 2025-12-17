import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import PricingSection from "@/components/PricingSection";
import NonprofitCarousel from "@/components/NonprofitCarousel";
import AIWorkflowSection from "@/components/AIWorkflowSection";
import AddOnServicesSection from "@/components/AddOnServicesSection";
import ContactFooter from "@/components/ContactFooter";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Breadcrumb />
      
      <main>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-[oklch(0.51_0.12_230)] to-[oklch(0.72_0.11_215)] text-white py-16">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Services
              </h1>
              <p className="text-xl text-white/90">
                Comprehensive financial consulting and custom web development solutions tailored for businesses and nonprofits
              </p>
            </div>
          </div>
        </section>
        
        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.96_0.02_215)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.51_0.12_230)] mb-2">
                  Flat-Fee Accounting
                </h3>
                <p className="text-muted-foreground">
                  Transparent pricing based on transaction volume. No surprises, no hidden fees.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.96_0.02_215)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💻</span>
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.51_0.12_230)] mb-2">
                  Custom Web App Development
                </h3>
                <p className="text-muted-foreground">
                  Specialized web applications designed for nonprofit workflows—from triage to service delivery.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-[oklch(0.96_0.02_215)] flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-xl font-bold text-[oklch(0.51_0.12_230)] mb-2">
                  AI Workflow Automation
                </h3>
                <p className="text-muted-foreground">
                  Integrate CRM, QuickBooks Online, and 800+ apps into custom dashboards for seamless automation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Flat-Fee Accounting Pricing */}
        <PricingSection />
        
        {/* Custom Web App Development */}
        <NonprofitCarousel />
        
        {/* AI Workflow Automation */}
        <AIWorkflowSection />
        
        {/* Add-On Services & Testimonials */}
        <AddOnServicesSection />
      </main>
      
      <ContactFooter />
    </div>
  );
}
