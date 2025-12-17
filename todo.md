# Socall C Group LLC - Project TODO

## Design System & Foundation
- [x] Implement Ocean Trust color palette in Tailwind CSS variables
- [x] Configure global typography and spacing system
- [x] Set up responsive breakpoints and mobile-first design
- [x] Create reusable button components with Ocean Trust colors
- [ ] Configure dark theme support (optional - not needed)

## Database Schema
- [x] Extend user table with subscription fields (tier, stripeCustomerId, subscriptionId)
- [x] Create mockupRequests table for AI-generated mockups
- [x] Run database migrations (pnpm db:push)
- [ ] Create pricingTiers table for flexible tier management (not needed - using products.ts)
- [ ] Create testimonials table for client success stories (not needed - using static content)
- [ ] Create addOnServices table for additional offerings (not needed - using static content)

## Hero Section
- [x] Upload and optimize Kristine's professional photo (IMG_8532.JPG)
- [x] Implement hero layout with Ocean Trust gradient background
- [x] Add headline: "Expert Guidance for Businesses and Nonprofits. Powered by People. Scaled with Technology."
- [x] Add subheadline with MBA credentials and 25 years experience
- [x] Implement dual CTAs: "Schedule Consultation" (Primary Blue) and "View Services" (outline)
- [x] Ensure mobile responsiveness with stacked layout

## Four-Tier Pricing System
- [x] Create PricingCard component with transaction range display
- [x] Implement Startups tier ($250, 50-100 transactions)
- [x] Implement Emerging Growth tier ($500, 100-300 transactions) with "Most Popular" badge
- [x] Implement Scale tier ($1000, 300-600 transactions)
- [x] Implement Enterprise tier ($2500, 600-1200 transactions)
- [x] Add taglines for each tier
- [x] Add "Get Started" CTA buttons for each tier
- [x] Display core services included in all tiers
- [x] Add integration options (CRM, Bill.com, Expensify, Ramp, ADP, Gusto)
- [ ] Create dedicated /pricing page with FAQ section (not needed - all on homepage)

## Nonprofit Web App Showcase Carousel
- [x] Copy 10 carousel images to project public directory
- [x] Create Carousel component with auto-advance (5 seconds)
- [x] Implement manual navigation (arrows + dots)
- [x] Add strategic captions for each of 10 images
- [x] Implement smooth transitions and animations
- [x] Add "See Your Idea Come to Life" CTA
- [x] Ensure mobile responsiveness with touch gestures

## AI-Powered Mockup Generator
- [x] Create mockup request form with text input
- [x] Integrate LLM for generating mockup descriptions
- [x] Integrate image generation API for UI/UX mockups
- [x] Display generated mockup image
- [x] Add "Love it? Let's build it together" CTA → Schedule Consultation
- [x] Store mockup requests in database for logged-in users
- [x] Create mockup gallery in user dashboard

## AI Workflow Automation Section
- [x] Create visual flow diagram (CRM → Automation → QBO/Dashboards)
- [x] Implement interactive FAQ chatbot with suggested questions
- [x] Add LLM-powered blog post generator demo
- [x] Display pricing ($275/mo) for automation package
- [x] Add "Learn About Automation" CTA

## Add-On Services Section
- [x] Create three-column layout for add-on services
- [x] Implement Year-End Cleanup Package card ($1200 one-time)
- [x] Implement Payroll Onboarding & Compliance card
- [x] Implement Sales Tax Compliance & Reporting card
- [x] Add individual CTAs for each service
- [x] Ensure mobile responsiveness (stacked layout)

## Testimonials Section
- [x] Implement Dark Blue background with White text
- [x] Create testimonial card component
- [x] Display 3 testimonials with client names and specific results
- [x] Include specific metrics ($40K saved, $15K penalty avoided, 4x revenue growth)
- [ ] Create testimonials database table (not needed - using static content)
- [ ] Add carousel/slider (not needed - only 3 testimonials)

## User Authentication & Authorization
- [x] Verify Manus OAuth integration is working
- [x] Implement login/logout functionality
- [x] Create protected routes for dashboard
- [x] Implement role-based access (admin vs user)
- [x] Add user profile display in navigation
- [ ] Create admin-only procedures for managing content (not needed for MVP)

## Stripe Payment Integration
- [x] Add Stripe feature to project (webdev_add_feature)
- [x] Configure Stripe API keys via secrets
- [x] Create Stripe checkout session procedure
- [x] Implement subscription creation flow
- [x] Add webhook handler for subscription events
- [x] Create billing history view in user dashboard
- [x] Implement upgrade/downgrade tier functionality
- [x] Add cancel subscription option
- [x] Test Stripe checkout flow in test mode

## User Dashboard
- [x] Create dashboard route (/dashboard)
- [x] Display current subscription tier and status
- [x] Show billing history and next payment date
- [x] Add upgrade/downgrade tier options
- [x] Display saved AI-generated mockups
- [x] Add mockup management (view, download)
- [x] Add "Generate New Mockup" CTA linking to homepage

## Calendly Integration
- [x] Embed Calendly widget on contact section
- [x] Link all "Schedule Consultation" CTAs to Calendly
- [x] Test Calendly integration with https://www.calendly.com/kristinesocall
- [x] Ensure mobile responsiveness of embedded calendar

## Footer & Navigation
- [x] Create footer with contact info and social links (LinkedIn)
- [x] Add quick links: Services, About Us, Testimonials, Contact, Privacy, Resource Hub
- [x] Display referral program: "Refer a business, get 1 month free"
- [x] Add copyright: "© 2025 Socall C Group LLC"
- [x] Create top navigation with logo and main menu
- [x] Implement mobile responsive navigation

## Testing & Quality Assurance
- [x] Write vitest tests for authentication flow
- [x] Write vitest tests for Stripe integration
- [x] Write vitest tests for mockup generation
- [x] Run all tests and verify they pass (17 tests passed)
- [x] Test all CTAs and conversion paths
- [x] Verify mobile responsiveness on all pages
- [x] Verify all images are optimized and loading fast

## Google Analytics Integration (User Request)
- [x] Add Google Analytics gtag.js script to HTML head
- [x] Configure GA tracking ID: G-5YGX5MBNX1
- [ ] Test analytics tracking in production (requires deployment)

## Final Delivery
- [ ] Create comprehensive checkpoint
- [ ] Deliver final web app to user with strategic recommendations

## Site Restructuring (User Request)
- [x] Add breadcrumb navigation component
- [x] Remove Kristine's photo from hero section
- [x] Replace hero with header.png (diverse people illustration)
- [x] Create dedicated /services page
- [x] Rename "Custom Web App Development for Nonprofits" to "Custom Web App Development"
- [x] Update all internal navigation links to new page structure
- [x] Simplify homepage to hero + mockup generator + services overview
- [ ] Move pricing section to /pricing page (not needed - on /services)
- [ ] Move portfolio/carousel to /portfolio page (not needed - on /services)
- [ ] Move contact section to /contact page (not needed - in footer on all pages)
