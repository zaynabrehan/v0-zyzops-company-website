'use client';

import { useState } from 'react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { GlowButton } from '../glow-button';
import { GradientText } from '../gradient-text';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web-development',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', service: 'web-development', message: '' });
      alert('Thank you! We&apos;ll get back to you soon.');
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <GradientText>Touch</GradientText>
          </h2>
          <p className="text-gray-300 text-lg">
            Ready to start your next project? Let&apos;s talk!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="animate-fade-in-up space-y-8">
            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-300">hello@zyzops.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Location</h3>
                <p className="text-gray-300">123 Business Street, Tech City, TC 12345</p>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="pt-8 border-t border-purple-500/20">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <GlowButton>Chat on WhatsApp</GlowButton>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass rounded-xl p-8 animate-fade-in-down">
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="web-development">Web Development</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="seo-marketing">SEO & Digital Marketing</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <GlowButton
                className="w-full"
                onClick={() => {}}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </GlowButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
