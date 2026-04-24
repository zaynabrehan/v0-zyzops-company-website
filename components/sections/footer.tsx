import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const quickLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

const serviceLinks = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'App Development', href: '/services/app-development' },
  { label: 'Cybersecurity', href: '/services/cybersecurity' },
  { label: 'Graphic Design', href: '/services/graphic-design' },
  { label: 'SEO & Marketing', href: '/services/seo' },
  { label: 'AI Chatbot', href: '/services/ai-chatbot' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-purple-500/5 to-transparent border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand - Logo image with mix-blend-mode to remove black background */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4">
              <Image
                src="/images/techvix-logo-dark.jpeg"
                alt="Techvix"
                width={160}
                height={44}
                className="h-8 w-auto mix-blend-screen"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Transforming businesses through innovative digital solutions and cutting-edge technology.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-full bg-purple-500/20 text-purple-400 hover:bg-cyan-400/20 hover:text-cyan-400 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-cyan-400 transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-cyan-400 transition-colors text-sm font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-gray-300 font-light">Email</p>
                <a href="mailto:zaynabrehann@gmail.com" className="text-cyan-400 hover:text-purple-400">
                  zaynabrehann@gmail.com
                </a>
              </li>
              <li>
                <p className="text-gray-300 font-light">WhatsApp</p>
                <a href="https://wa.me/923245531819" className="text-cyan-400 hover:text-purple-400">
                  03245531819
                </a>
              </li>
              <li>
                <p className="text-gray-300 font-light">Location</p>
                <p className="text-gray-300 font-light">Lahore Cantt, Pakistan</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300 font-light gap-4">
          <p>&copy; {currentYear} Techvix.org. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors font-light">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-cyan-400 transition-colors font-light">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
