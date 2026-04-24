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
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! We&apos;ll get back to you soon.');
        setFormData({ name: '', email: '', service: 'web-development', message: '' });
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <GradientText>Touch</GradientText>
          </h2>
          <p className="text-gray-300 text-lg font-light">
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
                <p className="text-gray-300 font-light">zaynabrehann@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                <p className="text-gray-300 font-light">03245531819</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Location</h3>
                <p className="text-gray-300 font-light">Lahore Cantt, Pakistan</p>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="pt-8 border-t border-cyan-500/20">
              <a
                href="https://wa.me/923245531819"
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
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.includes('Thank') 
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300' 
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="web-development">Web Development</option>
                  <option value="app-development">App Development</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="ai-chatbot">AI Chatbot Integration</option>
                  <option value="copywriting">Copywriting</option>
                  <option value="seo">SEO</option>
                  <option value="social-media">Social Media Marketing</option>
                  <option value="ads-management">Ads Management</option>
                  <option value="saas">SaaS Development</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
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
