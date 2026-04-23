import { GradientText } from '../gradient-text';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <GradientText>Zyzops</GradientText>
          </h2>
          <p className="text-gray-300 text-lg">
            Delivering Digital Excellence Since Day One
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <p className="text-gray-300 leading-relaxed mb-6">
              Zyzops is a forward-thinking digital solutions company dedicated to transforming businesses through innovative technology. Our team of skilled professionals brings years of experience in web development, cybersecurity, design, and artificial intelligence.
            </p>

            <p className="text-gray-300 leading-relaxed mb-6">
              We believe in building long-term partnerships with our clients. Our approach combines strategic thinking, creative design, and technical excellence to deliver solutions that not only meet but exceed expectations.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">Our Mission</h3>
                <p className="text-gray-300">
                  To empower businesses by delivering cutting-edge digital solutions that drive growth and innovation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-cyan-400 mb-2">Our Vision</h3>
                <p className="text-gray-300">
                  To be the trusted partner for businesses seeking digital transformation and technological excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="animate-fade-in-down">
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why We&apos;re Different</h3>
              <ul className="space-y-4">
                {[
                  'Client-centric approach with personalized solutions',
                  'Latest technologies and industry best practices',
                  'Transparent communication and regular updates',
                  'Dedicated support team available for you',
                  'Proven track record of successful projects',
                  'Competitive pricing without compromising quality',
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
