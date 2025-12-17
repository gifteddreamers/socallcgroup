import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import NonprofitCarousel from "@/components/NonprofitCarousel";
import MockupGenerator from "@/components/MockupGenerator";
import AIWorkflowSection from "@/components/AIWorkflowSection";
import AddOnServicesSection from "@/components/AddOnServicesSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main>
        <Hero />
        
        {/* Services Section - Placeholder */}
        <section id="services" className="py-20 bg-background">
          <div className="container">
            <h2 className="text-center text-[oklch(0.51_0.12_230)] mb-4">Our Services</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              Comprehensive financial consulting and custom web development solutions
            </p>
          </div>
        </section>
        
        {/* Pricing Section */}
        <PricingSection />
        
        {/* Nonprofit Web App Showcase */}
        <NonprofitCarousel />
        
        {/* AI Mockup Generator */}
        <MockupGenerator />
        
        {/* AI Workflow Automation */}
        <AIWorkflowSection />
        
        {/* Add-On Services & Testimonials */}
        <AddOnServicesSection />
        
        {/* Contact & Footer */}
        <ContactFooter />
      </main>
    </div>
  );
}
