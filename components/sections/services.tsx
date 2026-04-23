import { Code, Shield, Palette, Video, Zap, Brain } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';

  const services = [
  {
    icon: <Code size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with the latest technologies and best practices.',
  },
  {
    icon: <Shield size={40} className="group-hover:text-purple-400 transition-colors" />,
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and threat prevention.',
  },
  {
    icon: <Palette size={40} className="group-hover:text-pink-400 transition-colors" />,
    title: 'Graphic Design',
    description: 'Creative visual design that captures your brand essence and engages your audience.',
  },
  {
    icon: <Video size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Video Editing',
    description: 'Professional video production and editing services for marketing and media content.',
  },
  {
    icon: <Zap size={40} className="group-hover:text-yellow-400 transition-colors" />,
    title: 'SEO & Digital Marketing',
    description: 'Strategic digital marketing to boost your online presence and drive growth.',
  },
  {
    icon: <Brain size={40} className="group-hover:text-purple-400 transition-colors" />,
    title: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence to automate and optimize your business processes.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-neon-glow">
            Our <GradientText>Services</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassmorphismCard
              key={index}
              icon={service.icon}
              className="group hover:scale-105 hover-glow-purple animate-scale-in border-purple-500/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
              <p className="text-white leading-relaxed group-hover:text-cyan-100 transition-colors font-light">{service.description}</p>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
}
