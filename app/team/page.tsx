'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ParticleBackground } from '@/components/particle-background';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { 
  Code, 
  Shield, 
  Palette, 
  Video, 
  Zap, 
  Brain, 
  Cpu, 
  MessageSquare, 
  Share2, 
  TrendingUp, 
  DollarSign, 
  PenTool, 
  Mail,
  Linkedin,
  Twitter,
  ArrowLeft
} from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

// Leadership Team
const leaders = [
  {
    id: 1,
    name: 'Zainab Rehan',
    role: 'Chief Executive Officer',
    shortRole: 'CEO',
    image: '/team/ceo-placeholder.jpg',
    bio: 'Visionary leader driving Techvix towards innovation and excellence in digital solutions.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 2,
    name: 'Maryam Ahsan',
    role: 'Chief Operating Officer',
    shortRole: 'COO',
    image: '/team/coo-placeholder.jpg',
    bio: 'Operations expert ensuring seamless delivery and client satisfaction across all projects.',
    linkedin: '#',
    twitter: '#',
  },
  {
    id: 3,
    name: 'Muhammad Ahmad Abid',
    role: 'Chief Technology Officer',
    shortRole: 'CTO',
    image: '/team/cto-placeholder.jpg',
    bio: 'Tech innovator leading the development of cutting-edge solutions and technical strategies.',
    linkedin: '#',
    twitter: '#',
  },
];

// Service Experts
const serviceExperts = [
  {
    id: 1,
    name: 'Ali Hassan',
    role: 'Web Development Lead',
    service: 'Web Development',
    icon: Code,
    image: '/team/expert-web.jpg',
    expertise: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    id: 2,
    name: 'Sara Malik',
    role: 'Cybersecurity Expert',
    service: 'Cybersecurity',
    icon: Shield,
    image: '/team/expert-security.jpg',
    expertise: ['Penetration Testing', 'Security Audits', 'Compliance'],
  },
  {
    id: 3,
    name: 'Fatima Khan',
    role: 'App Development Lead',
    service: 'App Development',
    icon: Cpu,
    image: '/team/expert-app.jpg',
    expertise: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
  {
    id: 4,
    name: 'Usman Ahmed',
    role: 'AI Solutions Architect',
    service: 'AI Chatbot',
    icon: Brain,
    image: '/team/expert-ai.jpg',
    expertise: ['Machine Learning', 'NLP', 'ChatGPT Integration'],
  },
  {
    id: 5,
    name: 'Ayesha Siddiqui',
    role: 'Creative Director',
    service: 'Graphic Design',
    icon: Palette,
    image: '/team/expert-design.jpg',
    expertise: ['Brand Identity', 'UI/UX', 'Illustration'],
  },
  {
    id: 6,
    name: 'Bilal Raza',
    role: 'Video Production Lead',
    service: 'Video Editing',
    icon: Video,
    image: '/team/expert-video.jpg',
    expertise: ['Motion Graphics', 'Color Grading', 'Animation'],
  },
  {
    id: 7,
    name: 'Hira Noor',
    role: 'SEO Specialist',
    service: 'SEO',
    icon: Zap,
    image: '/team/expert-seo.jpg',
    expertise: ['Technical SEO', 'Content Strategy', 'Analytics'],
  },
  {
    id: 8,
    name: 'Omar Farooq',
    role: 'Social Media Manager',
    service: 'Social Media',
    icon: Share2,
    image: '/team/expert-social.jpg',
    expertise: ['Content Creation', 'Community Management', 'Paid Ads'],
  },
  {
    id: 9,
    name: 'Sana Tariq',
    role: 'Content Strategist',
    service: 'Copywriting',
    icon: MessageSquare,
    image: '/team/expert-copy.jpg',
    expertise: ['Brand Voice', 'SEO Writing', 'Storytelling'],
  },
  {
    id: 10,
    name: 'Hamza Qureshi',
    role: 'Ads Manager',
    service: 'Ads Management',
    icon: TrendingUp,
    image: '/team/expert-ads.jpg',
    expertise: ['Google Ads', 'Meta Ads', 'PPC Optimization'],
  },
  {
    id: 11,
    name: 'Zara Sheikh',
    role: 'SaaS Product Manager',
    service: 'SaaS Development',
    icon: DollarSign,
    image: '/team/expert-saas.jpg',
    expertise: ['Product Strategy', 'Agile', 'User Research'],
  },
  {
    id: 12,
    name: 'Imran Ali',
    role: 'Digital Marketing Lead',
    service: 'Digital Marketing',
    icon: PenTool,
    image: '/team/expert-marketing.jpg',
    expertise: ['Growth Hacking', 'Funnel Optimization', 'CRO'],
  },
  {
    id: 13,
    name: 'Nadia Hussain',
    role: 'Email Marketing Specialist',
    service: 'Email Automation',
    icon: Mail,
    image: '/team/expert-email.jpg',
    expertise: ['Klaviyo', 'Mailchimp', 'Automation Workflows'],
  },
];

export default function TeamPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="w-full overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The brilliant minds behind Techvix&apos;s success. Our diverse team of experts 
            brings together creativity, technical excellence, and strategic thinking.
          </p>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-semibold mb-4">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Executive Team
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Guiding Techvix with vision, expertise, and unwavering commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader, index) => (
              <div 
                key={leader.id}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-[#0a1520]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1520] via-transparent to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                      {/* Placeholder for image - shows initials */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    {/* Role Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-400 text-sm font-bold border border-cyan-400/30">
                        {leader.shortRole}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-20">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-purple-400 font-semibold mb-3">{leader.role}</p>
                    <p className="text-gray-400 text-sm mb-4">{leader.bio}</p>
                    
                    {/* Social Links */}
                    <div className="flex gap-3">
                      <a 
                        href={leader.linkedin}
                        className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-cyan-400/20 hover:text-cyan-400 transition-all"
                        aria-label={`${leader.name}'s LinkedIn`}
                      >
                        <Linkedin size={18} />
                      </a>
                      <a 
                        href={leader.twitter}
                        className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-cyan-400/20 hover:text-cyan-400 transition-all"
                        aria-label={`${leader.name}'s Twitter`}
                      >
                        <Twitter size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Experts Carousel */}
      <section className="py-20 relative bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-semibold mb-4">
              Service Experts
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Specialists in Every Domain
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each service at Techvix is led by industry experts who bring years of experience 
              and deep knowledge to deliver exceptional results.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative px-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {serviceExperts.map((expert) => {
                  const Icon = expert.icon;
                  return (
                    <CarouselItem key={expert.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="group relative h-full">
                        <div className="relative h-full bg-[#0a1520]/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 p-6">
                          {/* Service Icon Badge */}
                          <div className="absolute top-4 right-4">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30">
                              <Icon size={20} className="text-cyan-400" />
                            </div>
                          </div>

                          {/* Avatar */}
                          <div className="mb-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl font-bold text-white">
                              {expert.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                            {expert.name}
                          </h3>
                          <p className="text-purple-400 font-semibold text-sm mb-1">{expert.role}</p>
                          <p className="text-cyan-400/80 text-xs mb-4">{expert.service}</p>

                          {/* Expertise Tags */}
                          <div className="flex flex-wrap gap-2">
                            {expert.expertise.map((skill, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-1 rounded-full bg-purple-500/10 text-gray-400 text-xs border border-purple-500/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Glow Effect */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="bg-[#0a1520]/80 border-purple-500/30 text-cyan-400 hover:bg-purple-500/20 hover:text-white -left-4" />
              <CarouselNext className="bg-[#0a1520]/80 border-purple-500/30 text-cyan-400 hover:bg-purple-500/20 hover:text-white -right-4" />
            </Carousel>
          </div>

          {/* Dots indicator hint */}
          <div className="flex justify-center mt-8 gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === 0 ? 'bg-cyan-400' : 'bg-purple-500/30'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals who are passionate about 
              technology and innovation. Check out our open positions.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
