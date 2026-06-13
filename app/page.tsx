import { Navbar, HeroSection, FeaturesSection, StatsSection, TestimonialsSection, PricingSection, FAQSection, NewsletterSection, Footer } from '@/components/landing';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
