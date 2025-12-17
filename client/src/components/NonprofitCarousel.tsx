import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  problemSolved: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    image: "/carousel_01.jpeg",
    title: "Service Booking & Quote Systems",
    description: "Professional service platforms with instant quote requests and client acquisition",
    problemSolved: "Streamline service scheduling and reduce booking friction",
  },
  {
    id: 2,
    image: "/carousel_02.jpeg",
    title: "Visual Process Tracking",
    description: "Three-step workflow visualization from intake to completion",
    problemSolved: "Transparent service delivery with real-time status updates",
  },
  {
    id: 3,
    image: "/carousel_03.jpeg",
    title: "Trust-Building Pricing Pages",
    description: "Clear tier structures with feature comparison and 'Most Popular' guidance",
    problemSolved: "Price transparency for budget-conscious clients",
  },
  {
    id: 4,
    image: "/carousel_04.jpeg",
    title: "Employer Matching Gift Tools",
    description: "Interactive eligibility verification for donation amplification",
    problemSolved: "Maximize nonprofit revenue through automated matching programs",
  },
  {
    id: 5,
    image: "/carousel_05.jpeg",
    title: "Multilingual Service Navigation",
    description: "Category-based resource discovery for social services (Housing, Food, Health, Legal)",
    problemSolved: "Simplified access to support for vulnerable populations",
  },
  {
    id: 6,
    image: "/carousel_06.jpeg",
    title: "Website Performance Analytics",
    description: "Free audit tools with conversion impact metrics and actionable insights",
    problemSolved: "Identify revenue loss from technical performance issues",
  },
  {
    id: 7,
    image: "/carousel_07.jpeg",
    title: "Community Infrastructure Solutions",
    description: "Sovereign tech stack deployment for privacy-focused nonprofit organizations",
    problemSolved: "Decentralized alternatives to corporate cloud services",
  },
  {
    id: 8,
    image: "/carousel_08.jpeg",
    title: "Donor Impact Visualization",
    description: "Interactive calculator showing tangible outcomes (storage, users, infrastructure months)",
    problemSolved: "Transparent impact reporting to build donor trust",
  },
  {
    id: 9,
    image: "/carousel_09.jpeg",
    title: "Corporate Matching Gift Integration",
    description: "Employer search tool to double or triple donation impact",
    problemSolved: "Increase average donation value through matching programs",
  },
  {
    id: 10,
    image: "/carousel_10.jpeg",
    title: "Consultation Booking Interface",
    description: "Clear CTAs with service navigation and contact information",
    problemSolved: "Low-friction consultation scheduling for financial services",
  },
];

export default function NonprofitCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleApiChange = (api: CarouselApi) => {
    if (!api) return;
    setApi(api);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[oklch(0.51_0.12_230)] mb-6">
            Custom Web App Development for Nonprofits
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            Technology Solutions for Nonprofits Powered for People
          </p>
          <p className="text-base text-foreground">
            We build specialized web applications designed for nonprofit workflows—from triage to service delivery.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            setApi={handleApiChange}
            className="w-full"
          >
            <CarouselContent>
              {CAROUSEL_SLIDES.map((slide) => (
                <CarouselItem key={slide.id}>
                  <Card className="border-none shadow-xl">
                    <CardContent className="p-0">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden rounded-t-lg bg-[oklch(0.96_0.02_215)]">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>

                      {/* Caption */}
                      <div className="p-8 bg-white rounded-b-lg">
                        <h3 className="text-2xl font-bold text-[oklch(0.51_0.12_230)] mb-3">
                          {slide.title}
                        </h3>
                        <p className="text-base text-foreground mb-3">
                          {slide.description}
                        </p>
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-semibold text-[oklch(0.72_0.11_215)]">Problem Solved:</span>{" "}
                          {slide.problemSolved}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="left-4 bg-white/90 hover:bg-white border-[oklch(0.72_0.11_215)] text-[oklch(0.51_0.12_230)]" />
            <CarouselNext className="right-4 bg-white/90 hover:bg-white border-[oklch(0.72_0.11_215)] text-[oklch(0.51_0.12_230)]" />
          </Carousel>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-8 bg-[oklch(0.51_0.12_230)]"
                    : "w-2 bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.51_0.12_230)]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={() => {
              const element = document.getElementById('mockup-generator');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 bg-[oklch(0.72_0.11_215)] hover:bg-[oklch(0.68_0.11_215)] text-white font-semibold rounded-lg transition-colors"
          >
            See Your Idea Come to Life
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="px-8 py-4 border-2 border-[oklch(0.51_0.12_230)] text-[oklch(0.51_0.12_230)] hover:bg-[oklch(0.51_0.12_230)] hover:text-white font-semibold rounded-lg transition-colors"
          >
            Request Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
