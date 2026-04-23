import { ParticleBackground } from '@/components/particle-background';
import { Banner } from '@/components/sections/banner';
import { Navbar } from '@/components/sections/navbar';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
import { PortfolioSection } from '@/components/sections/portfolio';
import { WhyUsSection } from '@/components/sections/why-us';
import { ProcessSection } from '@/components/sections/process';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <ParticleBackground />
      <Banner />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
