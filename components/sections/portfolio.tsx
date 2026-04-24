'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { GradientText } from '../gradient-text';

const projects = [
  {
    id: 1,
    title: 'Jush Restaurant',
    category: 'Web',
    service: 'web-development',
    image: '/portfolio-jush.jpg',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    description: 'A modern restaurant website with online ordering capabilities.',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'E-commerce',
    service: 'web-development',
    image: '/portfolio-ecommerce.jpg',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    link: '#',
    description: 'Full-featured e-commerce platform with payment integration.',
  },
  {
    id: 3,
    title: 'Software Company Website',
    category: 'Web',
    service: 'web-development',
    image: '/portfolio-software.jpg',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
    description: 'Corporate website for a software development company.',
  },
  {
    id: 4,
    title: 'Restaurant Management System',
    category: 'E-commerce',
    service: 'saas-development',
    image: '/portfolio-restaurant.jpg',
    tech: ['React', 'Firebase', 'Material-UI'],
    link: '#',
    description: 'Complete restaurant management SaaS solution.',
  },
  {
    id: 5,
    title: 'Brand Identity Design',
    category: 'Design',
    service: 'graphic-design',
    image: '/portfolio-brand.jpg',
    tech: ['Illustrator', 'Photoshop', 'Figma'],
    link: '#',
    description: 'Complete brand identity package for a startup.',
  },
  {
    id: 6,
    title: 'Social Media Campaign',
    category: 'Marketing',
    service: 'social-media',
    image: '/portfolio-social.jpg',
    tech: ['Meta Ads', 'Analytics', 'Content'],
    link: '#',
    description: 'Successful social media marketing campaign.',
  },
];

const categories = ['All', 'Web', 'Design', 'E-commerce', 'Marketing'];

export function PortfolioSection() {
  const searchParams = useSearchParams();
  const serviceFilter = searchParams.get('service');
  
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (serviceFilter) {
      // Map service to category
      const serviceToCategory: Record<string, string> = {
        'web-development': 'Web',
        'graphic-design': 'Design',
        'saas-development': 'E-commerce',
        'social-media': 'Marketing',
      };
      const category = serviceToCategory[serviceFilter];
      if (category) {
        setActiveCategory(category);
      }
    }
  }, [serviceFilter]);

  const filteredProjects = 
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {serviceFilter && (
          <Link 
            href="/#services" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-pink-600 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Services
          </Link>
        )}
        
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-neon-glow">
            Our <GradientText>Portfolio</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Showcase of our latest projects and client success stories
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 hover:scale-110 text-sm md:text-base ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-pink-600 text-white shadow-[0_0_20px_rgba(219,39,119,0.4)] animate-glow font-semibold'
                  : 'glass text-white hover:text-pink-600 hover-glow-pink font-semibold'
              }`}
              style={{ animation: `scale-in 0.6s ease-out ${0.3 + index * 0.1}s backwards` }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group glass-accent rounded-lg overflow-hidden animate-scale-in hover:shadow-[0_0_30px_rgba(219,39,119,0.3)] hover:-translate-y-2 border-pink-600/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-pink-600/20 to-cyan-400/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/50 text-sm">Project Preview</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-pink-600/30 text-pink-400 px-3 py-1 rounded-full group-hover:bg-cyan-400/30 group-hover:text-cyan-300 transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-400 transition-all duration-300 group-hover:translate-x-1"
                >
                  View Live <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
