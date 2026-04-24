import { ParticleBackground } from '@/components/particle-background';
import { Navbar } from '@/components/sections/navbar';
import { HeroSection } from '@/components/sections/hero';
import { ServicesSection } from '@/components/sections/services';
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
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
