'use client';

import { useState } from 'react';
import { Code, Shield, Palette, Video, Zap, Brain, Cpu, MessageSquare, Share2, TrendingUp, DollarSign, PenTool, ArrowRight, Mail } from 'lucide-react';
import { GlassmorphismCard } from '../glassmorphism-card';
import { GradientText } from '../gradient-text';
import Link from 'next/link';

export const services = [
  {
    id: 'web-development',
    icon: <Code size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Web Development',
    tagline: 'Beyond Code: Digital Solutions That Drive Revenue.',
    description: 'Modern, responsive web applications built with the latest technologies and best practices.',
    fullDescription: 'We create stunning, high-performance websites and web applications that drive results. Our team specializes in modern frameworks and technologies to deliver scalable solutions.',
    whyMatters: 'Web development is essential because it builds the foundation of your online presence, making your brand accessible to anyone, anywhere. A well-structured website helps you showcase your services, products, and values in a professional way. It improves credibility and trust, allowing potential customers to engage confidently with your business.',
    subServices: [
      { title: 'Custom Website Development', description: 'Tailored web solutions built from scratch to meet your unique business requirements and brand identity.' },
      { title: 'E-Commerce Solutions', description: 'Complete online store development with Shopify, WooCommerce, and custom platforms for seamless shopping experiences.' },
      { title: 'Web App Development', description: 'Dynamic and interactive web applications with modern frameworks and cutting-edge technologies.' },
      { title: 'Website Redesign & Optimization', description: 'Transform your existing website with modern design principles and performance optimization techniques.' },
      { title: 'CMS Development', description: 'Content management systems with WordPress, Webflow, and custom solutions for easy content control.' }
    ],
    features: [
      'Custom website design and development',
      'Responsive and mobile-first approach',
      'E-commerce solutions',
      'Content Management Systems (CMS)',
      'Web application development',
      'API development and integration',
      'Performance optimization',
      'SEO-friendly architecture'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 'app-development',
    icon: <Cpu size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'App Development',
    tagline: 'Mobile Innovation: Apps That Users Love.',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    fullDescription: 'Build powerful mobile applications that engage users and drive business growth. We develop for both iOS and Android platforms using cutting-edge technologies.',
    whyMatters: 'Mobile apps are no longer optional in today\'s digital-first world. With over 6 billion smartphone users globally, a well-designed mobile app provides direct access to your customers, increases engagement, and builds brand loyalty. It creates a personalized experience that keeps users coming back.',
    subServices: [
      { title: 'Native iOS Development', description: 'Build high-performance iOS applications using Swift and SwiftUI for the best Apple ecosystem experience.' },
      { title: 'Native Android Development', description: 'Create powerful Android apps with Kotlin and Jetpack Compose for seamless user experiences.' },
      { title: 'Cross-Platform Development', description: 'Reach both iOS and Android users with a single codebase using React Native or Flutter.' },
      { title: 'App UI/UX Design', description: 'Design intuitive and engaging mobile interfaces that delight users and drive conversions.' },
      { title: 'App Maintenance & Support', description: 'Ongoing support, updates, and optimization to keep your app running smoothly.' }
    ],
    features: [
      'Native iOS and Android development',
      'Cross-platform development (React Native, Flutter)',
      'UI/UX design for mobile',
      'App store optimization',
      'Push notifications integration',
      'Offline functionality',
      'In-app purchases',
      'Analytics and tracking'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: 'cybersecurity',
    icon: <Shield size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Cybersecurity',
    tagline: 'Digital Fortress: Protecting What Matters Most.',
    description: 'Protect your business with comprehensive security solutions and threat prevention.',
    fullDescription: 'Safeguard your digital assets with our comprehensive cybersecurity services. We identify vulnerabilities and implement robust security measures to protect your business.',
    whyMatters: 'In an era of increasing cyber threats, protecting your digital assets is not just important—it\'s essential for survival. A single data breach can cost millions and destroy customer trust overnight. Our cybersecurity solutions provide peace of mind, ensuring your business, customer data, and reputation remain protected 24/7.',
    subServices: [
      { title: 'Security Audits & Assessments', description: 'Comprehensive evaluation of your security posture to identify vulnerabilities and risks.' },
      { title: 'Penetration Testing', description: 'Ethical hacking to test your defenses and discover weaknesses before attackers do.' },
      { title: 'Incident Response Planning', description: 'Develop and implement plans to quickly respond to and recover from security incidents.' },
      { title: 'Compliance Consulting', description: 'Ensure your business meets GDPR, HIPAA, SOC 2, and other regulatory requirements.' },
      { title: 'Network Security Solutions', description: 'Implement firewalls, intrusion detection, and secure network architecture.' }
    ],
    features: [
      'Security audits and assessments',
      'Penetration testing',
      'Vulnerability scanning',
      'Incident response planning',
      'Security awareness training',
      'Compliance consulting (GDPR, HIPAA)',
      'Network security solutions',
      'Data encryption services'
    ],
    technologies: ['Firewalls', 'IDS/IPS', 'SIEM', 'Encryption', 'VPN']
  },
  {
    id: 'graphic-design',
    icon: <Palette size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Graphic Design',
    tagline: 'Visual Excellence: Design That Speaks Volumes.',
    description: 'Creative visual design that captures your brand essence and engages your audience.',
    fullDescription: 'Transform your brand identity with stunning visual designs. Our creative team crafts compelling graphics that communicate your message effectively.',
    whyMatters: 'First impressions matter, and design is often the first thing people notice about your brand. Great graphic design builds recognition, communicates professionalism, and creates emotional connections with your audience. It\'s the visual language that tells your brand story before a single word is read.',
    subServices: [
      { title: 'Logo & Brand Identity', description: 'Create memorable logos and comprehensive brand identity systems that define your visual presence.' },
      { title: 'Marketing Materials', description: 'Design brochures, flyers, banners, and promotional materials that convert.' },
      { title: 'Social Media Graphics', description: 'Eye-catching visuals optimized for engagement across all social platforms.' },
      { title: 'Packaging Design', description: 'Stand out on shelves with packaging that captures attention and communicates quality.' },
      { title: 'UI/UX Design', description: 'User-centered interface designs that are beautiful, intuitive, and functional.' }
    ],
    features: [
      'Logo design and branding',
      'Marketing materials',
      'Social media graphics',
      'Print design',
      'Packaging design',
      'Infographics',
      'Illustration',
      'Brand guidelines'
    ],
    technologies: ['Adobe Photoshop', 'Illustrator', 'Figma', 'InDesign', 'Canva']
  },
  {
    id: 'video-editing',
    icon: <Video size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Video Editing',
    tagline: 'Cinematic Stories: Video That Captivates.',
    description: 'Professional video production and editing services for marketing and media content.',
    fullDescription: 'Create impactful video content that tells your story. From corporate videos to social media content, we deliver professional editing that captivates audiences.',
    whyMatters: 'Video is the most engaging form of content, with viewers retaining 95% of a message when watched vs. 10% when read. Whether it\'s for social media, advertising, or corporate communication, professional video editing transforms raw footage into compelling stories that drive action and build emotional connections.',
    subServices: [
      { title: 'Corporate Video Production', description: 'Professional videos for training, presentations, and internal communications.' },
      { title: 'Social Media Video Content', description: 'Short-form videos optimized for TikTok, Instagram Reels, and YouTube Shorts.' },
      { title: 'Motion Graphics & Animation', description: 'Dynamic animated graphics that bring concepts to life and enhance visual appeal.' },
      { title: 'Commercial & Ad Production', description: 'High-impact video advertisements that drive conversions and brand awareness.' },
      { title: 'Documentary & Storytelling', description: 'Narrative-driven videos that tell your brand story in an authentic way.' }
    ],
    features: [
      'Corporate video production',
      'Social media video content',
      'Motion graphics',
      'Color grading',
      'Sound design and mixing',
      'Video advertising',
      'YouTube optimization',
      'Animated explainer videos'
    ],
    technologies: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro']
  },
  {
    id: 'ai-chatbot',
    icon: <Brain size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'AI Chatbot Integration',
    tagline: 'Intelligent Automation: AI That Understands.',
    description: 'Intelligent chatbot solutions that enhance customer service and engagement.',
    fullDescription: 'Leverage artificial intelligence to automate customer interactions and improve service quality. Our chatbot solutions provide 24/7 support and enhance user experience.',
    whyMatters: 'In an always-on world, customers expect instant responses. AI chatbots provide 24/7 support, handle thousands of conversations simultaneously, and never take a break. They reduce support costs by up to 30% while improving customer satisfaction through instant, accurate, and personalized responses.',
    subServices: [
      { title: 'Custom Chatbot Development', description: 'Build intelligent chatbots tailored to your business needs and customer journey.' },
      { title: 'Natural Language Processing', description: 'Advanced NLP that understands context, intent, and delivers human-like conversations.' },
      { title: 'Multi-Platform Integration', description: 'Deploy chatbots across websites, WhatsApp, Facebook Messenger, and more.' },
      { title: 'Customer Support Automation', description: 'Automate FAQs, ticket creation, and common support queries.' },
      { title: 'Lead Generation Bots', description: 'Qualify leads, book appointments, and capture information automatically.' }
    ],
    features: [
      'Custom chatbot development',
      'Natural language processing',
      'Multi-platform integration',
      'Customer support automation',
      'Lead generation bots',
      'Analytics and insights',
      'Continuous learning and improvement',
      'Multilingual support'
    ],
    technologies: ['OpenAI', 'Dialogflow', 'Rasa', 'Microsoft Bot Framework']
  },
  {
    id: 'copywriting',
    icon: <MessageSquare size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Copywriting',
    tagline: 'Words That Convert: Copy That Compels Action.',
    description: 'Compelling and persuasive copy that converts readers into customers.',
    fullDescription: 'Words that sell. Our copywriting services craft compelling narratives that engage your audience and drive conversions across all platforms.',
    whyMatters: 'Great copy is the difference between a visitor and a customer. It communicates your value proposition, addresses pain points, and persuades action. Whether it\'s a landing page, email, or social post, compelling copywriting captures attention, builds trust, and drives measurable results.',
    subServices: [
      { title: 'Website Copywriting', description: 'Persuasive web copy that converts visitors into customers and communicates your brand voice.' },
      { title: 'Blog & Content Writing', description: 'Engaging blog posts and articles that establish authority and drive organic traffic.' },
      { title: 'Email Copywriting', description: 'High-converting email sequences that nurture leads and drive sales.' },
      { title: 'Sales Page Copy', description: 'Compelling sales pages and landing pages designed to maximize conversions.' },
      { title: 'Brand Storytelling', description: 'Craft your brand narrative that connects emotionally with your audience.' }
    ],
    features: [
      'Website copywriting',
      'Blog content creation',
      'Email marketing copy',
      'Sales page writing',
      'Product descriptions',
      'Social media content',
      'Brand storytelling',
      'SEO content writing'
    ],
    technologies: ['SEO Tools', 'Grammarly', 'Hemingway', 'Content Management']
  },
  {
    id: 'seo',
    icon: <Zap size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'SEO',
    tagline: 'Rank Higher: Dominate Search Results.',
    description: 'Search engine optimization to boost your online visibility and organic traffic.',
    fullDescription: 'Dominate search rankings with our comprehensive SEO strategies. We optimize your online presence to attract qualified traffic and increase conversions.',
    whyMatters: '93% of online experiences begin with a search engine. If you\'re not ranking on the first page, you\'re invisible to most potential customers. SEO drives organic traffic that\'s highly targeted, cost-effective, and sustainable long-term. It\'s the foundation of any successful digital marketing strategy.',
    subServices: [
      { title: 'Keyword Research & Strategy', description: 'Identify high-value keywords your target audience is searching for.' },
      { title: 'On-Page SEO Optimization', description: 'Optimize content, meta tags, headers, and structure for maximum visibility.' },
      { title: 'Technical SEO Audits', description: 'Fix technical issues affecting crawlability, indexing, and site performance.' },
      { title: 'Link Building', description: 'Build high-quality backlinks that boost domain authority and rankings.' },
      { title: 'Local SEO', description: 'Dominate local search results and Google Maps for location-based businesses.' }
    ],
    features: [
      'Keyword research and analysis',
      'On-page SEO optimization',
      'Technical SEO audits',
      'Link building strategies',
      'Local SEO',
      'Content optimization',
      'Competitor analysis',
      'Performance tracking and reporting'
    ],
    technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Google Search Console']
  },
  {
    id: 'social-media',
    icon: <Share2 size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Social Media Marketing',
    tagline: 'Social Presence: Build Your Community.',
    description: 'Strategic social media campaigns that build brand awareness and engagement.',
    fullDescription: 'Build a powerful social media presence that connects with your audience. Our strategies increase engagement, followers, and conversions across all platforms.',
    whyMatters: 'With 4.9 billion social media users worldwide, your audience is already scrolling. Social media marketing builds brand awareness, fosters community, and drives direct engagement. It\'s where conversations happen, trends emerge, and brands become part of daily life.',
    subServices: [
      { title: 'Social Media Strategy', description: 'Develop comprehensive strategies aligned with your business goals and target audience.' },
      { title: 'Content Creation & Curation', description: 'Create engaging posts, stories, and reels that resonate with your followers.' },
      { title: 'Community Management', description: 'Build and nurture an engaged community through active moderation and interaction.' },
      { title: 'Influencer Marketing', description: 'Partner with relevant influencers to expand reach and build credibility.' },
      { title: 'Social Media Analytics', description: 'Track performance, measure ROI, and optimize strategies based on data.' }
    ],
    features: [
      'Social media strategy development',
      'Content creation and curation',
      'Community management',
      'Influencer partnerships',
      'Paid social advertising',
      'Analytics and reporting',
      'Brand reputation management',
      'Cross-platform campaigns'
    ],
    technologies: ['Meta Business Suite', 'Hootsuite', 'Buffer', 'Sprout Social']
  },
  {
    id: 'ads-management',
    icon: <TrendingUp size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Ads Management',
    tagline: 'Paid Performance: Ads That Deliver ROI.',
    description: 'Data-driven advertising campaigns across multiple platforms for maximum ROI.',
    fullDescription: 'Maximize your advertising ROI with our data-driven approach. We create and manage campaigns that reach the right audience at the right time.',
    whyMatters: 'Paid advertising puts your brand in front of the right people at the right time. With precise targeting, measurable results, and instant visibility, PPC advertising is the fastest way to drive qualified traffic and generate leads. Every dollar is tracked and optimized for maximum return.',
    subServices: [
      { title: 'Google Ads Management', description: 'Search, display, and shopping campaigns that capture high-intent customers.' },
      { title: 'Facebook & Instagram Ads', description: 'Targeted social ads that reach your ideal audience with compelling creatives.' },
      { title: 'LinkedIn Advertising', description: 'B2B advertising campaigns that reach decision-makers and professionals.' },
      { title: 'Retargeting Campaigns', description: 'Re-engage visitors who didn\'t convert with strategic remarketing.' },
      { title: 'Campaign Optimization', description: 'Continuous A/B testing and optimization to maximize ROAS.' }
    ],
    features: [
      'Google Ads management',
      'Facebook/Instagram Ads',
      'LinkedIn advertising',
      'Display advertising',
      'Retargeting campaigns',
      'A/B testing',
      'Budget optimization',
      'Performance analytics'
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'LinkedIn Ads', 'Google Analytics']
  },
  {
    id: 'saas-development',
    icon: <DollarSign size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'SaaS Development',
    tagline: 'Scalable Solutions: Software That Grows With You.',
    description: 'Scalable Software-as-a-Service solutions designed for modern businesses.',
    fullDescription: 'Build your next SaaS product with us. We specialize in creating scalable, secure, and user-friendly software solutions that grow with your business.',
    whyMatters: 'SaaS is revolutionizing how businesses operate. A well-built SaaS product creates recurring revenue, scales infinitely, and serves customers globally. We build robust, scalable platforms that handle thousands of users while maintaining performance, security, and reliability.',
    subServices: [
      { title: 'SaaS Architecture Design', description: 'Design scalable, multi-tenant architectures that grow with your user base.' },
      { title: 'Subscription & Billing Systems', description: 'Implement flexible pricing models with Stripe, usage-based billing, and invoicing.' },
      { title: 'User Management & Auth', description: 'Secure authentication, role-based access control, and user administration.' },
      { title: 'API Development', description: 'Build robust APIs for integrations, mobile apps, and third-party connections.' },
      { title: 'DevOps & Infrastructure', description: 'CI/CD pipelines, cloud infrastructure, and automated deployment systems.' }
    ],
    features: [
      'SaaS architecture design',
      'Multi-tenant systems',
      'Subscription management',
      'User authentication and authorization',
      'API development',
      'Third-party integrations',
      'Scalable infrastructure',
      'Continuous deployment pipelines'
    ],
    technologies: ['AWS', 'Vercel', 'Stripe', 'Auth0', 'PostgreSQL', 'Redis']
  },
  {
    id: 'digital-marketing',
    icon: <PenTool size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Digital Marketing',
    tagline: 'Growth Engine: Marketing That Multiplies.',
    description: 'Comprehensive digital marketing strategies to grow your online presence.',
    fullDescription: 'Accelerate your growth with integrated digital marketing strategies. We combine multiple channels and tactics to maximize your reach and conversions.',
    whyMatters: 'Digital marketing is how modern businesses grow. It\'s measurable, scalable, and reaches customers where they spend their time. A comprehensive digital strategy combines multiple channels to create touchpoints throughout the customer journey, driving awareness, engagement, and conversions.',
    subServices: [
      { title: 'Digital Strategy Development', description: 'Create comprehensive marketing plans aligned with business objectives.' },
      { title: 'Content Marketing', description: 'Develop valuable content that attracts, engages, and converts your target audience.' },
      { title: 'Marketing Automation', description: 'Set up automated workflows that nurture leads and drive conversions.' },
      { title: 'Conversion Rate Optimization', description: 'Optimize landing pages and funnels to maximize conversion rates.' },
      { title: 'Analytics & Reporting', description: 'Track KPIs, measure ROI, and make data-driven marketing decisions.' }
    ],
    features: [
      'Digital strategy development',
      'Multi-channel marketing',
      'Email marketing automation',
      'Content marketing',
      'Conversion rate optimization',
      'Marketing analytics',
      'Brand awareness campaigns',
      'Lead nurturing programs'
    ],
    technologies: ['HubSpot', 'Mailchimp', 'Google Analytics', 'Hotjar']
  },
  {
    id: 'email-automation',
    icon: <Mail size={40} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />,
    title: 'Email Automation',
    tagline: 'Inbox Impact: Emails That Convert On Autopilot.',
    description: 'Automated email marketing campaigns that nurture leads and drive conversions.',
    fullDescription: 'Transform your email marketing with intelligent automation. We create sophisticated email workflows that engage subscribers, nurture leads, and convert customers on autopilot.',
    whyMatters: 'Email marketing delivers the highest ROI of any marketing channel—$42 for every $1 spent. Automated email workflows work 24/7, nurturing leads while you sleep. From welcome sequences to abandoned cart recovery, email automation turns subscribers into customers without manual effort.',
    subServices: [
      { title: 'Email Sequence Automation', description: 'Create automated drip campaigns that guide subscribers through your funnel.' },
      { title: 'Welcome Email Series', description: 'Make a great first impression with engaging onboarding sequences.' },
      { title: 'Abandoned Cart Recovery', description: 'Recover lost sales with timely, personalized cart abandonment emails.' },
      { title: 'Lead Nurturing Workflows', description: 'Build relationships and trust with automated nurture sequences.' },
      { title: 'Newsletter Management', description: 'Engage your audience with regular, value-packed newsletters.' }
    ],
    features: [
      'Email sequence automation',
      'Lead nurturing workflows',
      'Abandoned cart recovery',
      'Welcome email series',
      'Re-engagement campaigns',
      'Newsletter management',
      'A/B testing and optimization',
      'Analytics and reporting'
    ],
    technologies: ['Mailchimp', 'Klaviyo', 'ConvertKit', 'ActiveCampaign', 'SendGrid', 'HubSpot']
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <GradientText>Services</GradientText>
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto animate-slide-up font-light" style={{ animationDelay: '0.1s' }}>
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.id}`}
              className="cursor-pointer block"
            >
              <GlassmorphismCard
                icon={service.icon}
                className="group hover:scale-105 animate-scale-in border-purple-500/30 h-full hover:border-purple-500/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors font-light text-sm md:text-base">{service.description}</p>
                <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </div>
              </GlassmorphismCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
