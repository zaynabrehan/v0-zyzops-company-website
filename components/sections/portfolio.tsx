'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { GradientText } from '../gradient-text';

const projects = [
  {
    id: 1,
    title: 'Jush Restaurant',
    category: 'Web',
    image: '/portfolio-jush.jpg',
    tech: ['React', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    category: 'E-commerce',
    image: '/portfolio-ecommerce.jpg',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 3,
    title: 'Software Company Website',
    category: 'Web',
    image: '/portfolio-software.jpg',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    link: '#',
  },
  {
    id: 4,
    title: 'Restaurant Management System',
    category: 'E-commerce',
    image: '/portfolio-restaurant.jpg',
    tech: ['React', 'Firebase', 'Material-UI'],
    link: '#',
  },
];

const categories = ['All', 'Web', 'Design', 'E-commerce'];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = 
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-neon-glow">
            Our <GradientText>Portfolio</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Showcase of our latest projects and client success stories
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-300 hover:scale-110 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] animate-glow font-semibold'
                  : 'glass text-white hover:text-cyan-400 hover-glow-cyan font-semibold'
              }`}
              style={{ animation: `scale-in 0.6s ease-out ${0.3 + index * 0.1}s backwards` }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group glass-accent rounded-lg overflow-hidden animate-scale-in hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:-translate-y-2 border-purple-500/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full group-hover:bg-cyan-400/30 group-hover:text-cyan-300 transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-all duration-300 group-hover:translate-x-1"
                >
                  View Live <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
