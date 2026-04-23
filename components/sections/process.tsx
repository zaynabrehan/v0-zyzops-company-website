import { Compass, Pencil, Code, Rocket } from 'lucide-react';
import { GradientText } from '../gradient-text';

const steps = [
  {
    icon: <Compass size={48} />,
    number: '01',
    title: 'Discovery',
    description: 'We understand your business goals and requirements through detailed consultation.',
  },
  {
    icon: <Pencil size={48} />,
    number: '02',
    title: 'Design',
    description: 'Create stunning designs that reflect your brand and engage your audience.',
  },
  {
    icon: <Code size={48} />,
    number: '03',
    title: 'Development',
    description: 'Build robust, scalable solutions using modern technologies and best practices.',
  },
  {
    icon: <Rocket size={48} />,
    number: '04',
    title: 'Delivery',
    description: 'Launch your project and provide ongoing support for continued success.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <GradientText>Process</GradientText>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A streamlined approach to delivering exceptional results
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-32 left-12 right-12 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 -z-10" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Circle Background */}
              <div className="bg-gradient-to-b from-purple-500/20 to-cyan-400/20 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 group hover:from-purple-500/40 hover:to-cyan-400/40 transition-all duration-300">
                <div className="text-cyan-400">{step.icon}</div>
              </div>

              {/* Step Number */}
              <div className="text-center mb-4">
                <p className="text-4xl font-bold text-purple-400 mb-2">{step.number}</p>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-center text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
