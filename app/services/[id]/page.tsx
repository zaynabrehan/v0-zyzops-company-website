'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ParticleBackground } from '@/components/particle-background';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { GradientText } from '@/components/gradient-text';
import { GlowButton } from '@/components/glow-button';
import { services } from '@/components/sections/services';

export default function ServicePage() {
  const params = useParams();
  const serviceId = params.id as string;
  
  const service = services.find(s => s.id === serviceId);
  
  if (!service) {
    return (
      <main className="w-full overflow-hidden min-h-screen">
        <ParticleBackground />
        <Navbar />
        <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <p className="text-gray-400 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/#services">
              <GlowButton>Back to Services</GlowButton>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="text-cyan-400 p-4 bg-purple-500/10 rounded-xl">
              {service.icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                <GradientText>{service.title}</GradientText>
              </h1>
              <p className="text-gray-300 text-lg">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <p className="text-gray-300 leading-relaxed mb-8">{service.fullDescription}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">Technologies We Use</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact" className="flex-1">
                  <GlowButton className="w-full flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={20} />
                  </GlowButton>
                </Link>
                <Link 
                  href={`/portfolio?service=${service.id}`}
                  className="flex-1 text-center border-2 border-cyan-400 text-cyan-400 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">What We Offer</h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-cyan-400 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center glass rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8">
            Let&apos;s discuss how our {service.title.toLowerCase()} services can help transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <GlowButton className="flex items-center justify-center gap-2">
                Contact Us <ArrowRight size={20} />
              </GlowButton>
            </Link>
            <a
              href="https://wa.me/923245531819"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowButton variant="secondary">
                Chat on WhatsApp
              </GlowButton>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
