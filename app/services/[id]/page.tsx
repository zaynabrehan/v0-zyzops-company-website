'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Rocket, Clock, ThumbsUp } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>
          
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-cyan-400 p-3 bg-purple-500/10 rounded-xl">
                  {service.icon}
                </div>
                <span className="text-purple-400 font-medium">{service.title}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                <GradientText>{service.tagline || service.title}</GradientText>
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {service.fullDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#contact">
                  <GlowButton className="flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={20} />
                  </GlowButton>
                </Link>
                <Link 
                  href={`/portfolio/${service.id}`}
                  className="text-center border-2 border-cyan-400 text-cyan-400 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
            
            {/* Code Block Visual */}
            <div className="hidden lg:block">
              <div className="glass rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-sm font-mono">
                  <code className="text-purple-400">{'const '}</code>
                  <code className="text-cyan-400">techvix</code>
                  <code className="text-white">{' = {'}</code>
                  <br />
                  <code className="text-gray-400 ml-4">{'  service: '}</code>
                  <code className="text-green-400">{`"${service.title}"`}</code>
                  <code className="text-white">{','}</code>
                  <br />
                  <code className="text-gray-400 ml-4">{'  innovation: '}</code>
                  <code className="text-green-400">{'"unlimited"'}</code>
                  <code className="text-white">{','}</code>
                  <br />
                  <code className="text-gray-400 ml-4">{'  execution: '}</code>
                  <code className="text-green-400">{'"flawless"'}</code>
                  <code className="text-white">{','}</code>
                  <br />
                  <code className="text-gray-400 ml-4">{'  results: '}</code>
                  <code className="text-green-400">{'"extraordinary"'}</code>
                  <br />
                  <code className="text-white">{'}'}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Service Matters Section */}
      {service.whyMatters && (
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-purple-900/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                  Why you need this service
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why <GradientText>{service.title}</GradientText> Matters
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {service.whyMatters}
                </p>
              </div>
              
              {/* Stats/Benefits Visual */}
              <div className="glass rounded-xl p-8 border border-purple-500/30">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">500+</div>
                    <div className="text-gray-400 text-sm">Projects Completed</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-purple-400 mb-2">98%</div>
                    <div className="text-gray-400 text-sm">Client Satisfaction</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Support Available</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-purple-400 mb-2">5+</div>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sub-Services Section */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                Services Offered
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transform your digital presence with our comprehensive{' '}
                <GradientText>{service.title.toLowerCase()}</GradientText> solutions
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((subService, idx) => (
                <div 
                  key={idx} 
                  className="glass rounded-xl p-6 border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {subService.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {subService.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features & Technologies Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div className="glass rounded-xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-cyan-400" size={28} />
                What We Offer
              </h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-cyan-400 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Technologies We Use</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {service.technologies.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="px-5 py-3 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Quick Benefits */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Rocket className="text-cyan-400" size={20} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Clock className="text-cyan-400" size={20} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <ThumbsUp className="text-cyan-400" size={20} />
                  <span>100% Satisfaction</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Sparkles className="text-cyan-400" size={20} />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-12 border border-purple-500/30 text-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
                Ready to Transform?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let&apos;s Build Your <GradientText>Dream Project</GradientText>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Transform your vision into a stunning digital reality. Professional {service.title.toLowerCase()} that drives results and captivates your audience.
              </p>
              
              {/* Quick benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 className="text-cyan-400" size={16} />
                  Custom Solutions
                </span>
                <span className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 className="text-cyan-400" size={16} />
                  Fast Delivery
                </span>
                <span className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 className="text-cyan-400" size={16} />
                  24/7 Support
                </span>
                <span className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle2 className="text-cyan-400" size={16} />
                  100% Satisfaction
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#contact">
                  <GlowButton className="flex items-center justify-center gap-2">
                    Get Started Now <ArrowRight size={20} />
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
              
              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <p className="text-gray-400 text-sm mb-4">
                  Join 500+ satisfied clients who trust us with their digital presence
                </p>
                <div className="flex justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-gray-500 text-xs">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-gray-500 text-xs">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-gray-500 text-xs">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
