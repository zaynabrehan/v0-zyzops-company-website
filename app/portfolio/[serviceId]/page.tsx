'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react';
import { ParticleBackground } from '@/components/particle-background';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { GradientText } from '@/components/gradient-text';
import { GlowButton } from '@/components/glow-button';
import { portfolioData } from '@/lib/portfolio-data';

export default function ServicePortfolioPage() {
  const params = useParams();
  const serviceId = params.serviceId as string;
  
  const portfolio = portfolioData[serviceId];
  
  if (!portfolio) {
    return (
      <main className="w-full overflow-hidden min-h-screen">
        <ParticleBackground />
        <Navbar />
        <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Portfolio Not Found</h1>
            <p className="text-gray-400 mb-8">The portfolio you&apos;re looking for doesn&apos;t exist.</p>
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
        <div className="max-w-6xl mx-auto">
          <Link 
            href={`/services/${serviceId}`}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to {portfolio.serviceName}
          </Link>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <GradientText>{portfolio.serviceName}</GradientText> Portfolio
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {portfolio.description}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.projects.map((project, index) => (
              <div
                key={project.id}
                className="group glass-accent rounded-xl overflow-hidden hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-2 transition-all duration-300 border border-purple-500/30"
                style={{ animation: `scale-in 0.6s ease-out ${index * 0.1}s backwards` }}
              >
                {/* Project Image Placeholder */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-400/20 to-purple-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className="text-2xl text-purple-400 font-bold">{project.title.charAt(0)}</span>
                      </div>
                      <p className="text-white/50 text-sm">Project Preview</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full group-hover:bg-cyan-400/20 group-hover:text-cyan-400 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Link */}
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-all duration-300 group-hover:translate-x-1"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center glass rounded-xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Like What You See?
          </h2>
          <p className="text-gray-300 mb-8">
            Let&apos;s discuss how our {portfolio.serviceName.toLowerCase()} services can help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <GlowButton className="flex items-center justify-center gap-2">
                Start Your Project <ArrowRight size={20} />
              </GlowButton>
            </Link>
            <Link href={`/services/${serviceId}`}>
              <GlowButton variant="secondary">
                Learn More About {portfolio.serviceName}
              </GlowButton>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
