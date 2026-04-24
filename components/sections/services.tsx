'use client';

import { useState } from 'react';
import { Code, Shield, Palette, Video, Zap, Brain, Cpu, MessageSquare, Share2, TrendingUp, DollarSign, PenTool, ArrowRight } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';
import Link from 'next/link';

export const services = [
  {
    id: 'web-development',
    icon: <Code size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Web Development',
    description: 'Modern, responsive web applications built with the latest technologies and best practices.',
    fullDescription: 'We create stunning, high-performance websites and web applications that drive results. Our team specializes in modern frameworks and technologies to deliver scalable solutions.',
    features: [
      'Custom website design and development',
      'Responsive and mobile-first approach',
      'E-commerce solutions',
      'Content Management Systems (CMS)',
      'Web application development',
      'API development and integration',
      'Performance optimization',
      'SEO-friendly architecture'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'app-development',
    icon: <Cpu size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    fullDescription: 'Build powerful mobile applications that engage users and drive business growth. We develop for both iOS and Android platforms using cutting-edge technologies.',
    features: [
      'Native iOS and Android development',
      'Cross-platform development (React Native, Flutter)',
      'UI/UX design for mobile',
      'App store optimization',
      'Push notifications integration',
      'Offline functionality',
      'In-app purchases',
      'Analytics and tracking'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: 'cybersecurity',
    icon: <Shield size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Cybersecurity',
    description: 'Protect your business with comprehensive security solutions and threat prevention.',
    fullDescription: 'Safeguard your digital assets with our comprehensive cybersecurity services. We identify vulnerabilities and implement robust security measures to protect your business.',
    features: [
      'Security audits and assessments',
      'Penetration testing',
      'Vulnerability scanning',
      'Incident response planning',
      'Security awareness training',
      'Compliance consulting (GDPR, HIPAA)',
      'Network security solutions',
      'Data encryption services'
    ],
    technologies: ['Firewalls', 'IDS/IPS', 'SIEM', 'Encryption', 'VPN']
  },
  {
    id: 'graphic-design',
    icon: <Palette size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Graphic Design',
    description: 'Creative visual design that captures your brand essence and engages your audience.',
    fullDescription: 'Transform your brand identity with stunning visual designs. Our creative team crafts compelling graphics that communicate your message effectively.',
    features: [
      'Logo design and branding',
      'Marketing materials',
      'Social media graphics',
      'Print design',
      'Packaging design',
      'Infographics',
      'Illustration',
      'Brand guidelines'
    ],
    technologies: ['Adobe Photoshop', 'Illustrator', 'Figma', 'InDesign', 'Canva']
  },
  {
    id: 'video-editing',
    icon: <Video size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Video Editing',
    description: 'Professional video production and editing services for marketing and media content.',
    fullDescription: 'Create impactful video content that tells your story. From corporate videos to social media content, we deliver professional editing that captivates audiences.',
    features: [
      'Corporate video production',
      'Social media video content',
      'Motion graphics',
      'Color grading',
      'Sound design and mixing',
      'Video advertising',
      'YouTube optimization',
      'Animated explainer videos'
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro']
  },
  {
    id: 'ai-chatbot',
    icon: <Brain size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'AI Chatbot Integration',
    description: 'Intelligent chatbot solutions that enhance customer service and engagement.',
    fullDescription: 'Leverage artificial intelligence to automate customer interactions and improve service quality. Our chatbot solutions provide 24/7 support and enhance user experience.',
    features: [
      'Custom chatbot development',
      'Natural language processing',
      'Multi-platform integration',
      'Customer support automation',
      'Lead generation bots',
      'Analytics and insights',
      'Continuous learning and improvement',
      'Multilingual support'
    ],
    technologies: ['OpenAI', 'Dialogflow', 'Rasa', 'Microsoft Bot Framework']
  },
  {
    id: 'copywriting',
    icon: <MessageSquare size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Copywriting',
    description: 'Compelling and persuasive copy that converts readers into customers.',
    fullDescription: 'Words that sell. Our copywriting services craft compelling narratives that engage your audience and drive conversions across all platforms.',
    features: [
      'Website copywriting',
      'Blog content creation',
      'Email marketing copy',
      'Sales page writing',
      'Product descriptions',
      'Social media content',
      'Brand storytelling',
      'SEO content writing'
    ],
    technologies: ['SEO Tools', 'Grammarly', 'Hemingway', 'Content Management']
  },
  {
    id: 'seo',
    icon: <Zap size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'SEO',
    description: 'Search engine optimization to boost your online visibility and organic traffic.',
    fullDescription: 'Dominate search rankings with our comprehensive SEO strategies. We optimize your online presence to attract qualified traffic and increase conversions.',
    features: [
      'Keyword research and analysis',
      'On-page SEO optimization',
      'Technical SEO audits',
      'Link building strategies',
      'Local SEO',
      'Content optimization',
      'Competitor analysis',
      'Performance tracking and reporting'
    ],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Google Search Console']
  },
  {
    id: 'social-media',
    icon: <Share2 size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Social Media Marketing',
    description: 'Strategic social media campaigns that build brand awareness and engagement.',
    fullDescription: 'Build a powerful social media presence that connects with your audience. Our strategies increase engagement, followers, and conversions across all platforms.',
    features: [
      'Social media strategy development',
      'Content creation and curation',
      'Community management',
      'Influencer partnerships',
      'Paid social advertising',
      'Analytics and reporting',
      'Brand reputation management',
      'Cross-platform campaigns'
    ],
    technologies: ['Meta Business Suite', 'Hootsuite', 'Buffer', 'Sprout Social']
  },
  {
    id: 'ads-management',
    icon: <TrendingUp size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Ads Management',
    description: 'Data-driven advertising campaigns across multiple platforms for maximum ROI.',
    fullDescription: 'Maximize your advertising ROI with our data-driven approach. We create and manage campaigns that reach the right audience at the right time.',
    features: [
      'Google Ads management',
      'Facebook/Instagram Ads',
      'LinkedIn advertising',
      'Display advertising',
      'Retargeting campaigns',
      'A/B testing',
      'Budget optimization',
      'Performance analytics'
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'Google Analytics']
  },
  {
    id: 'saas-development',
    icon: <DollarSign size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'SaaS Development',
    description: 'Scalable Software-as-a-Service solutions designed for modern businesses.',
    fullDescription: 'Build your next SaaS product with us. We specialize in creating scalable, secure, and user-friendly software solutions that grow with your business.',
    features: [
      'SaaS architecture design',
      'Multi-tenant systems',
      'Subscription management',
      'User authentication and authorization',
      'API development',
      'Third-party integrations',
      'Scalable infrastructure',
      'Continuous deployment pipelines'
    ],
    technologies: ['AWS', 'Vercel', 'Stripe', 'Auth0', 'PostgreSQL', 'Redis']
  },
  {
    id: 'digital-marketing',
    icon: <PenTool size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    fullDescription: 'Accelerate your growth with integrated digital marketing strategies. We combine multiple channels and tactics to maximize your reach and conversions.',
    features: [
      'Digital strategy development',
      'Multi-channel marketing',
      'Email marketing automation',
      'Content marketing',
      'Conversion rate optimization',
      'Marketing analytics',
      'Brand awareness campaigns',
      'Lead nurturing programs'
    ],
    technologies: ['HubSpot', 'Mailchimp', 'Google Analytics', 'Hotjar']
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <GradientText>Services</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className="cursor-pointer block"
            >
              <GlassmorphismCard
                icon={service.icon}
                className="group hover:scale-105 animate-scale-in border-purple-500/30 h-full hover:border-purple-500/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors font-light text-sm md:text-base">{service.description}</p>
                <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </div>
              </GlassmorphismCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
