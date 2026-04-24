import { Award, Zap, Users, Lightbulb } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';

const features = [
  {
    icon: <Award size={40} />,
    title: 'Expert Team',
    description: 'Experienced professionals with proven track record in delivering excellence.',
  },
  {
    icon: <Zap size={40} />,
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising on quality.',
  },
  {
    icon: <Users size={40} />,
    title: 'Client Focused',
    description: 'Your success is our priority. We listen and adapt to your needs.',
  },
  {
    icon: <Lightbulb size={40} />,
    title: 'Innovation',
    description: 'Cutting-edge solutions using the latest technologies and best practices.',
  },
];

export function WhyUsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <GradientText>Zyzops</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto font-light">
            Partner with us for digital transformation that drives real results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <GlassmorphismCard
              key={index}
              icon={feature.icon}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white text-sm font-light">{feature.description}</p>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
}
