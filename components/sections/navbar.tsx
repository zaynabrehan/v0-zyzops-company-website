'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GlowButton } from '../glow-button';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="text-2xl font-bold animate-fade-in-up text-white">
            <span className="gradient-text animate-neon-glow">ZYZOPS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-200 hover:text-cyan-400 transition-all duration-300 hover:glow-cyan font-semibold"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/signin"
              className="text-gray-200 hover:text-cyan-400 transition-all duration-300 font-semibold border border-purple-500/50 px-4 py-2 rounded-lg hover:border-cyan-400"
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-200 hover:text-cyan-400 font-semibold"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in-down">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-200 hover:text-cyan-400 transition-colors font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/signin"
              className="block px-4 py-2 text-gray-200 hover:text-cyan-400 transition-colors font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
