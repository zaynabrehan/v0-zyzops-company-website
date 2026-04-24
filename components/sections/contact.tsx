'use client';

import { useState } from 'react';
import { Mail, MessageSquare, MapPin, ChevronDown, Check } from 'lucide-react';
import { GlowButton } from '../glow-button';
import { GradientText } from '../gradient-text';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { services } from './services';

const serviceOptions = services.map(s => ({
  value: s.id,
  label: s.title,
  description: s.description
}));

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const confirmServiceSelection = () => {
    setFormData(prev => ({
      ...prev,
      service: selectedServices.join(', ')
    }));
    setIsServiceDialogOpen(false);
  };

  const getSelectedServiceLabels = () => {
    if (selectedServices.length === 0) return 'Select services you are interested in';
    const labels = selectedServices.map(id => {
      const service = serviceOptions.find(s => s.value === id);
      return service?.label || id;
    });
    if (labels.length <= 2) return labels.join(', ');
    return `${labels.slice(0, 2).join(', ')} +${labels.length - 2} more`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedServices.map(id => {
            const service = serviceOptions.find(s => s.value === id);
            return service?.label || id;
          }).join(', ')
        }),
      });

      if (response.ok) {
        setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
        setFormData({ name: '', email: '', service: '', message: '' });
        setSelectedServices([]);
        setTimeout(() => setSubmitMessage(''), 5000);
      } else {
        setSubmitMessage('Failed to send message. Please try again or contact us via WhatsApp.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('An error occurred. Please try again or contact us via WhatsApp.');
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
                <a href="mailto:zaynabrehann@gmail.com" className="text-gray-300 hover:text-cyan-400 transition-colors font-light">
                  zaynabrehann@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-cyan-400 mt-1">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                <a href="https://wa.me/923245531819" className="text-gray-300 hover:text-cyan-400 transition-colors font-light">
                  03245531819
                </a>
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
            <div className="pt-8 border-t border-purple-500/20">
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
          <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 animate-fade-in-down">
            <div className="space-y-6">
              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitMessage.includes('success') 
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
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
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
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              {/* Service Select - Opens Dialog */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Service Interest
                </label>
                <button
                  type="button"
                  onClick={() => setIsServiceDialogOpen(true)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-left flex items-center justify-between focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <span className={selectedServices.length > 0 ? 'text-white' : 'text-gray-400'}>
                    {getSelectedServiceLabels()}
                  </span>
                  <ChevronDown size={20} className="text-gray-400" />
                </button>
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
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button - Cyan to purple gradient */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Services Selection Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-[#0a1520]/95 backdrop-blur-xl border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-xl font-bold text-white">Select Services</DialogTitle>
              <DialogDescription className="text-gray-400 mt-1">Choose the services you are interested in</DialogDescription>
            </div>
          </div>

          <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
            {serviceOptions.map((service) => (
              <button
                key={service.value}
                type="button"
                onClick={() => toggleService(service.value)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedServices.includes(service.value)
                    ? 'bg-purple-500/20 border-purple-500 text-white'
                    : 'bg-white/5 border-purple-500/30 text-gray-300 hover:bg-purple-500/10 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    selectedServices.includes(service.value)
                      ? 'bg-purple-500 border-purple-500'
                      : 'border-gray-500'
                  }`}>
                    {selectedServices.includes(service.value) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{service.label}</p>
                    <p className="text-sm text-gray-400 mt-0.5">{service.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-purple-500/20">
            <button
              type="button"
              onClick={() => setSelectedServices([])}
              className="flex-1 border-2 border-cyan-400 text-cyan-400 font-semibold px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-colors"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={confirmServiceSelection}
              className="flex-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift text-white font-semibold px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Confirm ({selectedServices.length})
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
