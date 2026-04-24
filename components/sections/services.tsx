import { Code, Shield, Palette, Video, Zap, Brain, Cpu, MessageSquare, Share2, TrendingUp, DollarSign, PenTool } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';

  const services = [
  {
    icon: <Code size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with the latest technologies and best practices.',
  },
  {
    icon: <Cpu size={40} className="group-hover:text-purple-400 transition-colors" />,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
  },
  {
    icon: <Shield size={40} className="group-hover:text-pink-400 transition-colors" />,
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and threat prevention.',
  },
  {
    icon: <Palette size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Graphic Design',
    description: 'Creative visual design that captures your brand essence and engages your audience.',
  },
  {
    icon: <Video size={40} className="group-hover:text-yellow-400 transition-colors" />,
    title: 'Video Editing',
    description: 'Professional video production and editing services for marketing and media content.',
  },
  {
    icon: <Brain size={40} className="group-hover:text-purple-400 transition-colors" />,
    title: 'AI Chatbot Integration',
    description: 'Intelligent chatbot solutions that enhance customer service and engagement.',
  },
  {
    icon: <MessageSquare size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Copywriting',
    description: 'Compelling and persuasive copy that converts readers into customers.',
  },
  {
    icon: <Zap size={40} className="group-hover:text-yellow-400 transition-colors" />,
    title: 'SEO',
    description: 'Search engine optimization to boost your online visibility and organic traffic.',
  },
  {
    icon: <Share2 size={40} className="group-hover:text-pink-400 transition-colors" />,
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that build brand awareness and engagement.',
  },
  {
    icon: <TrendingUp size={40} className="group-hover:text-cyan-400 transition-colors" />,
    title: 'Ads Management',
    description: 'Data-driven advertising campaigns across multiple platforms for maximum ROI.',
  },
  {
    icon: <DollarSign size={40} className="group-hover:text-purple-400 transition-colors" />,
    title: 'SaaS Development',
    description: 'Scalable Software-as-a-Service solutions designed for modern businesses.',
  },
  {
    icon: <PenTool size={40} className="group-hover:text-yellow-400 transition-colors" />,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <GlassmorphismCard
              key={index}
              icon={service.icon}
              className="group hover:scale-105 hover-glow-purple animate-scale-in border-purple-500/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors font-light">{service.description}</p>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
}
