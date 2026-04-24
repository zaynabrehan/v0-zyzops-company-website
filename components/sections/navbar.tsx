'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Code, Shield, Palette, Video, Zap, Brain, Cpu, MessageSquare, Share2, TrendingUp, DollarSign, PenTool } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Services data for dropdown
const serviceCategories = [
  {
    title: 'Development',
    services: [
      { id: 'web-development', label: 'Web Development', icon: Code, description: 'Modern web applications' },
      { id: 'app-development', label: 'App Development', icon: Cpu, description: 'iOS & Android apps' },
      { id: 'saas-development', label: 'SaaS Development', icon: DollarSign, description: 'Scalable SaaS products' },
    ]
  },
  {
    title: 'Security & AI',
    services: [
      { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield, description: 'Security solutions' },
      { id: 'ai-chatbot', label: 'AI Chatbot', icon: Brain, description: 'Intelligent chatbots' },
    ]
  },
  {
    title: 'Creative',
    services: [
      { id: 'graphic-design', label: 'Graphic Design', icon: Palette, description: 'Visual branding' },
      { id: 'video-editing', label: 'Video Editing', icon: Video, description: 'Professional editing' },
      { id: 'copywriting', label: 'Copywriting', icon: MessageSquare, description: 'Compelling content' },
    ]
  },
  {
    title: 'Marketing',
    services: [
      { id: 'seo', label: 'SEO', icon: Zap, description: 'Search optimization' },
      { id: 'social-media', label: 'Social Media', icon: Share2, description: 'Social marketing' },
      { id: 'ads-management', label: 'Ads Management', icon: TrendingUp, description: 'PPC campaigns' },
      { id: 'digital-marketing', label: 'Digital Marketing', icon: PenTool, description: 'Full marketing' },
    ]
  }
];

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsMobileServicesOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Using actual image with mix-blend-lighten to remove black background */}
          <Link href="/#home" className="flex items-center animate-fade-in-up">
            <Image
              src="/images/techvix-logo-dark.jpeg"
              alt="Techvix"
              width={180}
              height={50}
              className={`transition-all duration-300 mix-blend-lighten ${isScrolled ? 'h-9 w-auto' : 'h-10 w-auto'}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {/* Home Link */}
            <Link
              href="/#home"
              className="text-cyan-100 hover:text-cyan-400 transition-all duration-300 font-semibold"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center gap-1 text-cyan-100 hover:text-cyan-400 transition-all duration-300 font-semibold"
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="bg-[#0a1520]/98 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 shadow-2xl shadow-purple-500/10 min-w-[700px]">
                  <div className="grid grid-cols-4 gap-6">
                    {serviceCategories.map((category) => (
                      <div key={category.title}>
                        <h3 className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.services.map((service) => {
                            const Icon = service.icon;
                            return (
                              <li key={service.id}>
                                <Link
                                  href={`/services/${service.id}`}
                                  className="group flex items-start gap-3 p-2 rounded-lg hover:bg-purple-500/10 transition-all duration-300"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <Icon size={18} className="text-cyan-400 mt-0.5 group-hover:text-purple-400 transition-colors" />
                                  <div>
                                    <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors">{service.label}</p>
                                    <p className="text-gray-500 text-xs">{service.description}</p>
                                  </div>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All Services */}
                  <div className="mt-6 pt-4 border-t border-purple-500/20">
                    <Link
                      href="/#services"
                      className="flex items-center justify-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors font-semibold text-sm"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      View All Services
                      <ChevronDown size={16} className="rotate-[-90deg]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cyan-100 hover:text-cyan-400 transition-all duration-300 font-semibold"
              >
                {link.label}
              </Link>
            ))}

            {/* Sign In Button - Cyan outline */}
            <Link
              href="/signin"
              className="border-2 border-cyan-400 text-cyan-400 font-semibold px-5 py-2 rounded-lg hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-cyan-100 hover:text-cyan-400 font-semibold"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a1520]/95 backdrop-blur-xl border border-purple-500/30 p-0 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <DialogDescription className="sr-only">Main navigation links for the website</DialogDescription>
          <div className="flex flex-col p-6">
            {/* Logo in mobile menu */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-purple-500/20">
              <Image
                src="/images/techvix-logo-dark.jpeg"
                alt="Techvix"
                width={150}
                height={40}
                className="h-9 w-auto mix-blend-lighten"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-cyan-100 hover:text-cyan-400 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              <Link
                href="/#home"
                className="px-4 py-3 text-lg text-cyan-100 hover:text-cyan-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 font-semibold"
                onClick={handleLinkClick}
              >
                Home
              </Link>

              {/* Services Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full px-4 py-3 text-lg text-cyan-100 hover:text-cyan-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 font-semibold flex items-center justify-between"
                >
                  Services
                  <ChevronDown size={20} className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMobileServicesOpen && (
                  <div className="ml-4 mt-2 space-y-4">
                    {serviceCategories.map((category) => (
                      <div key={category.title}>
                        <p className="text-purple-400 font-semibold text-xs uppercase tracking-wider px-4 mb-2">{category.title}</p>
                        {category.services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.id}
                              href={`/services/${service.id}`}
                              className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
                              onClick={handleLinkClick}
                            >
                              <Icon size={16} className="text-cyan-400" />
                              <span className="text-sm">{service.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-lg text-cyan-100 hover:text-cyan-400 hover:bg-purple-500/10 rounded-lg transition-all duration-300 font-semibold"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Sign In Button */}
            <div className="mt-6 pt-4 border-t border-purple-500/20">
              <Link
                href="/signin"
                className="block w-full text-center border-2 border-cyan-400 text-cyan-400 font-semibold px-5 py-3 rounded-lg hover:bg-cyan-400/10 transition-all duration-300"
                onClick={handleLinkClick}
              >
                Sign In
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
