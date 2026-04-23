import { ArrowRight, Check } from 'lucide-react';
import { GlowButton } from '../glow-button';
import { GradientText } from '../gradient-text';

export function HeroSection() {
  const stats = [
    { number: '10+', label: 'Projects Delivered' },
    { number: '8+', label: 'Happy Clients' },
    { number: '3', label: 'Industries Served' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-block glass rounded-full px-4 py-2 mb-6">
              <p className="text-cyan-400 text-sm font-semibold">Welcome to Zyzops</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with <GradientText>Digital Innovation</GradientText>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              We deliver cutting-edge digital solutions including web development, cybersecurity, graphic design, and AI-powered services to help your business thrive in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <GlowButton className="flex items-center justify-center gap-2">
                Start a Project <ArrowRight size={20} />
              </GlowButton>
              <GlowButton variant="secondary" className="flex items-center justify-center gap-2">
                View Our Work
              </GlowButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-500/20">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-cyan-400">{stat.number}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center animate-fade-in-down">
            <div className="relative w-80 h-80">
              {/* Gradient circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-soft" />
              <div className="absolute inset-8 bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 rounded-full blur-2xl animate-pulse-soft" />
              
              {/* Center card */}
              <div className="absolute inset-0 glass rounded-2xl flex items-center justify-center flex-col gap-4 p-8">
                <div className="text-5xl text-cyan-400">
                  <Check size={80} strokeWidth={1.5} />
                </div>
                <p className="text-center text-white font-semibold">Your Success is Our Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
