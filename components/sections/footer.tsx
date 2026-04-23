import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { GradientText } from '../gradient-text';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  { label: 'Web Development', href: '#' },
  { label: 'Cybersecurity', href: '#' },
  { label: 'Graphic Design', href: '#' },
  { label: 'Video Editing', href: '#' },
  { label: 'SEO & Marketing', href: '#' },
  { label: 'AI & ML', href: '#' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-purple-500/5 to-transparent border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="gradient-text">ZYZOPS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
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
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-gray-400">Email</p>
                <a href="mailto:hello@zyzops.com" className="text-cyan-400 hover:text-cyan-300">
                  hello@zyzops.com
                </a>
              </li>
              <li>
                <p className="text-gray-400">WhatsApp</p>
                <a href="https://wa.me/15551234567" className="text-cyan-400 hover:text-cyan-300">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <p className="text-gray-400">Location</p>
                <p className="text-gray-400">123 Business Street, Tech City, TC 12345</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-purple-500/20 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Zyzops. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
