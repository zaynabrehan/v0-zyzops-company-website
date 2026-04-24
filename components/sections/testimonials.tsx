import { Star } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Tech Startup',
    message: 'Zyzops transformed our digital presence. Their team delivered beyond expectations with innovative solutions and exceptional support.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, E-Commerce',
    message: 'Working with Zyzops was a game-changer. They understood our needs perfectly and delivered a solution that increased our conversions by 40%.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <GradientText>Testimonials</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto font-light">
            What our clients say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <GlassmorphismCard
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>

              {/* Message */}
              <p className="text-white mb-6 leading-relaxed italic font-light">
                &quot;{testimonial.message}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-purple-500/20 pt-4">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-white font-light">{testimonial.role}</p>
              </div>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
}
