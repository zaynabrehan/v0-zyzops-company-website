'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
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

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - Made bigger */}
          <Link href="/#home" className="flex items-center animate-fade-in-up">
            <Image
              src="/techvix-logo.png"
              alt="Techvix.org"
              width={400}
              height={110}
              className={`transition-all duration-300 ${isScrolled ? 'h-16 w-auto' : 'h-24 w-auto'}`}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cyan-100 hover:text-pink-600 transition-all duration-300 font-semibold"
                style={{
                  animation: `fade-in-up 0.6s ease-out ${index * 0.1}s backwards`,
                }}
              >
                {link.label}
              </Link>
            ))}
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
            className="md:hidden p-2 text-cyan-100 hover:text-pink-600 font-semibold"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-[#0a1520]/95 backdrop-blur-xl border border-pink-600/30 p-0">
          <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
          <DialogDescription className="sr-only">Main navigation links for the website</DialogDescription>
          <div className="flex flex-col p-6">
            {/* Logo in mobile menu */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-pink-600/20">
              <Image
                src="/techvix-logo.png"
                alt="Techvix.org"
                width={200}
                height={60}
                className="h-14 w-auto"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-cyan-100 hover:text-pink-600 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-lg text-cyan-100 hover:text-pink-600 hover:bg-pink-600/10 rounded-lg transition-all duration-300 font-semibold"
                  onClick={handleLinkClick}
                  style={{
                    animation: `fade-in-up 0.4s ease-out ${index * 0.05}s backwards`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Sign In Button */}
            <div className="mt-6 pt-4 border-t border-cyan-400/20">
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
