import { ParticleBackground } from '@/components/particle-background';
import { Navbar } from '@/components/sections/navbar';
import { PortfolioSection } from '@/components/sections/portfolio';
import { Footer } from '@/components/sections/footer';

export const metadata = {
  title: 'Portfolio - Techvix.org',
  description: 'Explore our portfolio of successful projects including web development, app development, and digital solutions.',
};

export default function PortfolioPage() {
  return (
    <main className="w-full overflow-hidden">
      <ParticleBackground />
      <Navbar />
      <div className="pt-28">
        <PortfolioSection />
      </div>
      <Footer />
    </main>
  );
}
