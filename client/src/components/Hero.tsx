import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.51_0.12_230)] via-[oklch(0.72_0.11_215)] to-[oklch(0.51_0.12_230)] text-white">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMCAyNGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6TTEyIDM4YzAtMS4xLS45LTItMi0ycy0yIC45LTIgMiAuOSAyIDIgMiAyLS45IDItMnptMC0yNGMwLTEuMS0uOS0yLTItMnMtMiAuOS0yIDIgLjkgMiAyIDIgMi0uOSAyLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left column: Text content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Expert Guidance for Businesses and Nonprofits
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/90">
                Powered by People. Scaled with Technology.
              </p>
              <p className="text-lg md:text-xl text-white/80">
                Converged at the Intersection of Impact & Sustainability
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-lg font-semibold text-white/95">
                Strategic Consulting, Full-cycle Accounting, Custom Web App Development & AI Workflows
              </p>
              <p className="text-base text-white/85">
                Led by Founder <span className="font-bold">Kristine Socall, MBA</span>
              </p>
              <p className="text-base text-white/85">
                Bringing <span className="font-bold">25+ years</span> big-firm expertise to independent businesses and nonprofits
              </p>
            </div>
            
            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                className="bg-white text-[oklch(0.51_0.12_230)] hover:bg-white/90 font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => window.open('https://www.calendly.com/kristinesocall', '_blank')}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[oklch(0.51_0.12_230)] font-semibold text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => scrollToSection('services')}
              >
                View Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="pt-6 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>MBA Credentials</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>25+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-white"></div>
                <span>Transparent Pricing</span>
              </div>
            </div>
          </div>
          
          {/* Right column: Professional photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative circle background */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl scale-110"></div>
              
              {/* Photo container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 max-w-md">
                <img
                  src="/kristine-professional.jpg"
                  alt="Kristine Socall, MBA - Founder of Socall C Group LLC"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay gradient for better text contrast */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[oklch(0.35_0.08_235)] to-transparent p-6">
                  <p className="text-white font-bold text-xl">Kristine Socall, MBA</p>
                  <p className="text-white/90 text-sm">Founder & Principal Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 md:h-16 fill-current text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
