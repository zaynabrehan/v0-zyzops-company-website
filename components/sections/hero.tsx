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
            <div className="inline-block glass rounded-full px-4 py-2 mb-6 animate-slide-up glow-cyan border-cyan-400/50">
              <p className="text-cyan-400 text-sm font-semibold animate-neon-glow">Welcome to Zyzops</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Transform Your Business with <GradientText>Digital Innovation</GradientText>
            </h1>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              We deliver cutting-edge digital solutions including web development, cybersecurity, graphic design, and AI-powered services to help your business thrive in the digital age.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <GlowButton className="flex items-center justify-center gap-2 hover-glow-purple group">
                Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </GlowButton>
              <GlowButton variant="secondary" className="flex items-center justify-center gap-2 hover-glow-cyan">
                View Our Work
              </GlowButton>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-purple-500/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat, index) => (
                <div key={stat.label} className="group" style={{ animation: `scale-in 0.6s ease-out ${0.5 + index * 0.1}s backwards` }}>
                  <p className="text-2xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors">{stat.number}</p>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex items-center justify-center animate-slide-down">
            <div className="relative w-80 h-80">
              {/* Gradient circles with animations */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-cyan-400/30 rounded-full blur-3xl animate-bounce-gentle glow-purple" />
              <div className="absolute inset-8 bg-gradient-to-tr from-cyan-400/30 to-purple-500/30 rounded-full blur-2xl animate-pulse-soft glow-cyan" />
              <div className="absolute inset-16 bg-gradient-to-b from-purple-600/20 to-transparent rounded-full blur-2xl animate-float" />
              
              {/* Center card */}
              <div className="absolute inset-0 glass-accent rounded-2xl flex items-center justify-center flex-col gap-4 p-8 hover-glow-purple">
                <div className="text-cyan-400 animate-float-rotate">
                  <Check size={80} strokeWidth={1.5} />
                </div>
                <p className="text-center text-white font-semibold animate-neon-glow">Your Success is Our Mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
