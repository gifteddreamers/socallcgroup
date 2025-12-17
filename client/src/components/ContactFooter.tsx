import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Linkedin, Calendar, Gift } from "lucide-react";

export default function ContactFooter() {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
                Ready to Grow with Confidence?
              </h2>
              <p className="text-lg text-muted-foreground">
                Schedule a free consultation to discuss your financial and technology needs
              </p>
            </div>

            {/* Calendly Embed */}
            <Card className="shadow-2xl mb-12">
              <CardContent className="p-0">
                <div className="aspect-[16/10] w-full">
                  <iframe
                    src="https://calendly.com/kristinesocall?embed_domain=socall-c-group.manus.space&embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a consultation with Kristine Socall"
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Mail className="h-10 w-10 text-[oklch(0.51_0.12_230)] mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <a
                    href="mailto:kristine@socallcgroup.com"
                    className="text-sm text-[oklch(0.72_0.11_215)] hover:underline"
                  >
                    kristine@socallcgroup.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Phone className="h-10 w-10 text-[oklch(0.51_0.12_230)] mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-[oklch(0.72_0.11_215)] hover:underline"
                  >
                    (123) 456-7890
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <Linkedin className="h-10 w-10 text-[oklch(0.51_0.12_230)] mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">LinkedIn</h3>
                  <a
                    href="https://www.linkedin.com/in/kristinesocall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[oklch(0.72_0.11_215)] hover:underline"
                  >
                    Connect on LinkedIn
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Referral Program Callout */}
            <Card className="bg-gradient-to-r from-[oklch(0.96_0.02_215)] to-white border-[oklch(0.72_0.11_215)] border-2">
              <CardContent className="p-8 text-center">
                <Gift className="h-12 w-12 text-[oklch(0.51_0.12_230)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-3">
                  Referral Program
                </h3>
                <p className="text-lg text-foreground mb-4">
                  Refer a business, get <span className="font-bold text-[oklch(0.51_0.12_230)]">1 month free</span>
                </p>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Know someone who could benefit from expert financial guidance or custom web app development? 
                  Refer them to Socall C Group and receive one month of service free when they sign up for any tier.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.28_0.06_230)] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/SocallCGroup_Icon.jpeg" 
                  alt="Socall C Group" 
                  className="h-12 w-12 rounded-lg" 
                />
                <div>
                  <p className="font-bold text-lg">Socall C Group LLC</p>
                  <p className="text-xs text-white/70">Finance + Creative</p>
                </div>
              </div>
              <p className="text-sm text-white/80">
                Bringing 25 years of big-firm expertise to independent businesses and nonprofits.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('pricing');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Flat-Fee Accounting
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('portfolio');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Custom Web Apps
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('ai-automation');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    AI Workflow Automation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('add-on-services');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Add-On Services
                  </button>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="hover:text-white transition-colors"
                  >
                    About Kristine
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('testimonials');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="https://help.manus.im" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Resource Hub
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <a 
                    href="https://www.calendly.com/kristinesocall" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Schedule Call
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  <a 
                    href="https://www.linkedin.com/in/kristinesocall" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a 
                    href="mailto:kristine@socallcgroup.com"
                    className="hover:text-white transition-colors"
                  >
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/70">
              © 2025 Socall C Group LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
