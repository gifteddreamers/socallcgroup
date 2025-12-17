import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileCheck, Users, Receipt, Quote } from "lucide-react";

const ADD_ON_SERVICES = [
  {
    id: "year-end-cleanup",
    icon: FileCheck,
    title: "Year-End Cleanup Package",
    price: "$1,200",
    priceNote: "one-time",
    description: "Get messy historical books organized and audit-ready. The perfect entry point to ongoing bookkeeping.",
    tagline: "Get current, then stay current",
    cta: "Schedule Cleanup",
    features: [
      "Historical transaction categorization",
      "Bank reconciliation (up to 12 months)",
      "Financial statement preparation",
      "Tax-ready documentation",
      "QuickBooks setup & optimization",
    ],
  },
  {
    id: "payroll",
    icon: Users,
    title: "Payroll Onboarding & Compliance",
    price: "Custom",
    priceNote: "quote required",
    description: "Multi-state payroll setup, tax filing automation, and ongoing compliance management.",
    tagline: "Simplify employee management",
    cta: "Learn More",
    features: [
      "Multi-state payroll configuration",
      "Tax filing automation (federal, state, local)",
      "Direct deposit setup",
      "W-2 & 1099 preparation",
      "Ongoing compliance monitoring",
    ],
  },
  {
    id: "sales-tax",
    icon: Receipt,
    title: "Sales Tax Compliance & Reporting",
    price: "Custom",
    priceNote: "quote required",
    description: "Automated sales tax calculation, quarterly filing, and audit trail documentation.",
    tagline: "Stay compliant, avoid penalties",
    cta: "Learn More",
    features: [
      "Automated sales tax calculation",
      "Quarterly filing (all jurisdictions)",
      "Nexus analysis & registration",
      "Audit trail documentation",
      "Economic nexus monitoring",
    ],
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Socall C Group saved us $40K in tax liability by identifying deductions our previous accountant missed. Their proactive approach is a game-changer.",
    author: "Sarah Martinez",
    role: "Founder, GreenTech Innovations",
    result: "$40K saved",
  },
  {
    id: 2,
    quote: "We avoided a $15K IRS penalty thanks to their compliance monitoring. They caught an issue before it became a crisis.",
    author: "David Chen",
    role: "Executive Director, Community Impact Fund",
    result: "$15K penalty avoided",
  },
  {
    id: 3,
    quote: "With their custom web app and financial automation, we scaled from $500K to $2M in revenue without adding accounting staff.",
    author: "Jessica Thompson",
    role: "CEO, Bright Futures Nonprofit",
    result: "4x revenue growth",
  },
];

export default function AddOnServicesSection() {
  return (
    <>
      {/* Add-On Services */}
      <section id="add-on-services" className="py-20 bg-secondary">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Specialized solutions for specific financial challenges
            </p>
          </div>

          {/* Three-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {ADD_ON_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.id} className="shadow-xl hover:shadow-2xl transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 rounded-full bg-[oklch(0.96_0.02_215)] flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-[oklch(0.51_0.12_230)]" />
                    </div>
                    <CardTitle className="text-xl text-[oklch(0.51_0.12_230)] mb-2">
                      {service.title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-foreground">
                      {service.price}
                    </div>
                    <p className="text-xs text-muted-foreground">{service.priceNote}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-center text-base">
                      {service.description}
                    </CardDescription>
                    <p className="text-sm text-center italic text-[oklch(0.72_0.11_215)] font-medium">
                      "{service.tagline}"
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 text-sm">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[oklch(0.72_0.11_215)] mt-1">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      onClick={() => {
                        const element = document.getElementById('contact');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="w-full bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white font-semibold"
                    >
                      {service.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[oklch(0.28_0.06_230)]">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Success Stories
            </h2>
            <p className="text-lg text-white/80">
              Real results from real businesses and nonprofits
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/10 border-white/20 shadow-xl">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-[oklch(0.72_0.11_215)] mb-4" />
                  <p className="text-white text-base mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                    <p className="text-[oklch(0.72_0.11_215)] font-bold text-lg mt-2">
                      {testimonial.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-white text-[oklch(0.51_0.12_230)] hover:bg-white/90 font-semibold text-lg px-8 py-6"
            >
              Start Your Success Story
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
