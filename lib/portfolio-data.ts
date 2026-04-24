// Portfolio data for all services

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export interface ServicePortfolio {
  serviceId: string;
  serviceName: string;
  description: string;
  projects: PortfolioProject[];
}

export const portfolioData: Record<string, ServicePortfolio> = {
  'web-development': {
    serviceId: 'web-development',
    serviceName: 'Web Development',
    description: 'Explore our collection of modern, responsive web applications built with cutting-edge technologies.',
    projects: [
      {
        id: 'wd-1',
        title: 'E-Commerce Platform',
        description: 'Full-featured online store with payment integration, inventory management, and analytics dashboard.',
        tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
        link: '#'
      },
      {
        id: 'wd-2',
        title: 'Healthcare Portal',
        description: 'Patient management system with appointment booking, medical records, and telemedicine features.',
        tech: ['React', 'Node.js', 'MongoDB', 'WebRTC'],
        link: '#'
      },
      {
        id: 'wd-3',
        title: 'Real Estate Marketplace',
        description: 'Property listing platform with virtual tours, mortgage calculator, and agent dashboard.',
        tech: ['Next.js', 'Prisma', 'AWS S3', 'MapBox'],
        link: '#'
      },
      {
        id: 'wd-4',
        title: 'Learning Management System',
        description: 'Online education platform with course creation, progress tracking, and certification system.',
        tech: ['React', 'Django', 'PostgreSQL', 'Redis'],
        link: '#'
      }
    ]
  },
  'app-development': {
    serviceId: 'app-development',
    serviceName: 'App Development',
    description: 'Native and cross-platform mobile applications delivering exceptional user experiences.',
    projects: [
      {
        id: 'ad-1',
        title: 'Fitness Tracking App',
        description: 'Comprehensive fitness app with workout plans, nutrition tracking, and social features.',
        tech: ['React Native', 'Firebase', 'HealthKit', 'Google Fit'],
        link: '#'
      },
      {
        id: 'ad-2',
        title: 'Food Delivery App',
        description: 'Restaurant ordering app with real-time tracking, payments, and loyalty rewards.',
        tech: ['Flutter', 'Node.js', 'Stripe', 'Google Maps'],
        link: '#'
      },
      {
        id: 'ad-3',
        title: 'Banking Mobile App',
        description: 'Secure banking application with biometric auth, transfers, and expense analytics.',
        tech: ['Swift', 'Kotlin', 'Plaid API', 'AWS'],
        link: '#'
      },
      {
        id: 'ad-4',
        title: 'Event Management App',
        description: 'Event discovery and ticketing app with QR check-in and social sharing.',
        tech: ['React Native', 'GraphQL', 'Stripe', 'Push Notifications'],
        link: '#'
      }
    ]
  },
  'cybersecurity': {
    serviceId: 'cybersecurity',
    serviceName: 'Cybersecurity',
    description: 'Comprehensive security solutions protecting businesses from digital threats.',
    projects: [
      {
        id: 'cs-1',
        title: 'Enterprise Security Audit',
        description: 'Complete security assessment for a Fortune 500 company identifying and patching vulnerabilities.',
        tech: ['Penetration Testing', 'SIEM', 'Compliance', 'Risk Assessment'],
        link: '#'
      },
      {
        id: 'cs-2',
        title: 'Secure Payment Gateway',
        description: 'PCI-DSS compliant payment infrastructure with encryption and fraud detection.',
        tech: ['Encryption', 'Tokenization', 'PCI-DSS', 'Fraud Detection'],
        link: '#'
      },
      {
        id: 'cs-3',
        title: 'Zero Trust Network',
        description: 'Implementation of zero-trust architecture for remote workforce security.',
        tech: ['Zero Trust', 'IAM', 'MFA', 'VPN'],
        link: '#'
      },
      {
        id: 'cs-4',
        title: 'Incident Response System',
        description: 'Real-time threat detection and automated incident response platform.',
        tech: ['SOAR', 'Threat Intel', 'EDR', 'Log Analysis'],
        link: '#'
      }
    ]
  },
  'graphic-design': {
    serviceId: 'graphic-design',
    serviceName: 'Graphic Design',
    description: 'Creative visual designs that capture brand essence and engage audiences.',
    projects: [
      {
        id: 'gd-1',
        title: 'Tech Startup Branding',
        description: 'Complete brand identity including logo, color palette, typography, and brand guidelines.',
        tech: ['Adobe Illustrator', 'Figma', 'Brand Strategy', 'Typography'],
        link: '#'
      },
      {
        id: 'gd-2',
        title: 'Product Packaging Design',
        description: 'Premium packaging design for a luxury cosmetics brand launching new product line.',
        tech: ['Adobe Photoshop', 'Illustrator', '3D Mockups', 'Print Design'],
        link: '#'
      },
      {
        id: 'gd-3',
        title: 'UI Design System',
        description: 'Comprehensive design system with components, icons, and interaction patterns.',
        tech: ['Figma', 'Design Tokens', 'Component Library', 'Accessibility'],
        link: '#'
      },
      {
        id: 'gd-4',
        title: 'Marketing Collateral',
        description: 'Full suite of marketing materials including brochures, banners, and social media assets.',
        tech: ['InDesign', 'Photoshop', 'Canva', 'Print & Digital'],
        link: '#'
      }
    ]
  },
  'video-editing': {
    serviceId: 'video-editing',
    serviceName: 'Video Editing',
    description: 'Professional video production and editing services for all platforms.',
    projects: [
      {
        id: 've-1',
        title: 'Corporate Brand Video',
        description: 'Cinematic brand story video for a tech company showcasing their mission and values.',
        tech: ['Premiere Pro', 'After Effects', 'Color Grading', '4K'],
        link: '#'
      },
      {
        id: 've-2',
        title: 'YouTube Channel Package',
        description: 'Full video production for tech review channel including intros, outros, and thumbnails.',
        tech: ['DaVinci Resolve', 'Motion Graphics', 'Sound Design', 'Thumbnails'],
        link: '#'
      },
      {
        id: 've-3',
        title: 'Product Launch Video',
        description: 'High-impact product launch video with 3D animations and special effects.',
        tech: ['After Effects', 'Cinema 4D', 'Sound Design', 'VFX'],
        link: '#'
      },
      {
        id: 've-4',
        title: 'Social Media Content',
        description: 'Series of engaging short-form videos optimized for TikTok, Reels, and Shorts.',
        tech: ['Premiere Pro', 'CapCut', 'Trending Audio', 'Vertical Video'],
        link: '#'
      }
    ]
  },
  'ai-chatbot': {
    serviceId: 'ai-chatbot',
    serviceName: 'AI Chatbot',
    description: 'Intelligent conversational AI solutions for customer service and automation.',
    projects: [
      {
        id: 'ai-1',
        title: 'Customer Service Bot',
        description: 'AI-powered support chatbot handling 80% of customer queries automatically.',
        tech: ['GPT-4', 'LangChain', 'Vector DB', 'Natural Language'],
        link: '#'
      },
      {
        id: 'ai-2',
        title: 'E-commerce Assistant',
        description: 'Shopping assistant bot with product recommendations and order tracking.',
        tech: ['OpenAI', 'RAG', 'Product Catalog', 'Multi-language'],
        link: '#'
      },
      {
        id: 'ai-3',
        title: 'HR Onboarding Bot',
        description: 'Internal chatbot streamlining employee onboarding and HR queries.',
        tech: ['Claude AI', 'Knowledge Base', 'Slack Integration', 'Document QA'],
        link: '#'
      },
      {
        id: 'ai-4',
        title: 'Healthcare Triage Bot',
        description: 'Medical chatbot for initial patient assessment and appointment scheduling.',
        tech: ['Medical NLP', 'HIPAA Compliant', 'EHR Integration', 'Symptom Analysis'],
        link: '#'
      }
    ]
  },
  'copywriting': {
    serviceId: 'copywriting',
    serviceName: 'Copywriting',
    description: 'Compelling content that converts readers into customers.',
    projects: [
      {
        id: 'cw-1',
        title: 'SaaS Website Copy',
        description: 'Complete website copy for B2B SaaS product resulting in 40% conversion increase.',
        tech: ['SEO Copy', 'Landing Pages', 'CTA Optimization', 'A/B Testing'],
        link: '#'
      },
      {
        id: 'cw-2',
        title: 'Email Campaign Series',
        description: 'Automated email sequence for e-commerce brand with 35% open rate.',
        tech: ['Email Marketing', 'Storytelling', 'Segmentation', 'Automation'],
        link: '#'
      },
      {
        id: 'cw-3',
        title: 'Blog Content Strategy',
        description: 'Content marketing strategy with 50+ SEO-optimized articles driving organic traffic.',
        tech: ['SEO Writing', 'Content Strategy', 'Keyword Research', 'Blog Posts'],
        link: '#'
      },
      {
        id: 'cw-4',
        title: 'Product Descriptions',
        description: 'Engaging product copy for 500+ e-commerce products boosting sales.',
        tech: ['Product Copy', 'Features & Benefits', 'Brand Voice', 'Conversions'],
        link: '#'
      }
    ]
  },
  'seo': {
    serviceId: 'seo',
    serviceName: 'SEO',
    description: 'Search engine optimization strategies driving organic growth.',
    projects: [
      {
        id: 'seo-1',
        title: 'E-commerce SEO Overhaul',
        description: 'Complete SEO strategy resulting in 200% organic traffic increase in 6 months.',
        tech: ['Technical SEO', 'On-Page', 'Link Building', 'Analytics'],
        link: '#'
      },
      {
        id: 'seo-2',
        title: 'Local Business SEO',
        description: 'Local SEO campaign achieving top 3 rankings for 50+ location-based keywords.',
        tech: ['Local SEO', 'Google Business', 'Citations', 'Reviews'],
        link: '#'
      },
      {
        id: 'seo-3',
        title: 'Technical SEO Audit',
        description: 'Comprehensive technical audit improving site speed and Core Web Vitals.',
        tech: ['Core Web Vitals', 'Site Speed', 'Schema Markup', 'Crawlability'],
        link: '#'
      },
      {
        id: 'seo-4',
        title: 'Content SEO Strategy',
        description: 'Keyword-driven content strategy ranking for 500+ keywords in competitive niche.',
        tech: ['Keyword Research', 'Content Clusters', 'SERP Analysis', 'Topical Authority'],
        link: '#'
      }
    ]
  },
  'social-media': {
    serviceId: 'social-media',
    serviceName: 'Social Media',
    description: 'Strategic social media management building engaged communities.',
    projects: [
      {
        id: 'sm-1',
        title: 'Fashion Brand Growth',
        description: 'Instagram strategy growing following from 5K to 100K in 8 months.',
        tech: ['Instagram', 'Content Calendar', 'Reels', 'Influencer Collab'],
        link: '#'
      },
      {
        id: 'sm-2',
        title: 'B2B LinkedIn Strategy',
        description: 'LinkedIn thought leadership campaign generating 500+ qualified leads.',
        tech: ['LinkedIn', 'Thought Leadership', 'Employee Advocacy', 'Lead Gen'],
        link: '#'
      },
      {
        id: 'sm-3',
        title: 'Viral TikTok Campaign',
        description: 'TikTok marketing campaign achieving 10M+ views and brand virality.',
        tech: ['TikTok', 'Trend Jacking', 'UGC', 'Hashtag Strategy'],
        link: '#'
      },
      {
        id: 'sm-4',
        title: 'Community Management',
        description: 'Multi-platform community management with 95% response rate.',
        tech: ['Community Building', 'Crisis Management', 'Engagement', 'Analytics'],
        link: '#'
      }
    ]
  },
  'ads-management': {
    serviceId: 'ads-management',
    serviceName: 'Ads Management',
    description: 'Data-driven paid advertising campaigns maximizing ROI.',
    projects: [
      {
        id: 'am-1',
        title: 'Google Ads Campaign',
        description: 'PPC campaign achieving 400% ROAS for e-commerce client.',
        tech: ['Google Ads', 'Shopping Ads', 'Remarketing', 'Conversion Tracking'],
        link: '#'
      },
      {
        id: 'am-2',
        title: 'Facebook Ads Strategy',
        description: 'Social ads campaign reducing CPA by 60% through audience optimization.',
        tech: ['Meta Ads', 'Lookalike Audiences', 'Creative Testing', 'Pixel Setup'],
        link: '#'
      },
      {
        id: 'am-3',
        title: 'App Install Campaign',
        description: 'Mobile app install campaign achieving 100K downloads at $0.50 CPI.',
        tech: ['App Campaigns', 'ASO', 'Attribution', 'In-App Events'],
        link: '#'
      },
      {
        id: 'am-4',
        title: 'B2B LinkedIn Ads',
        description: 'LinkedIn advertising campaign generating enterprise leads at scale.',
        tech: ['LinkedIn Ads', 'ABM', 'Lead Gen Forms', 'Sponsored Content'],
        link: '#'
      }
    ]
  },
  'saas-development': {
    serviceId: 'saas-development',
    serviceName: 'SaaS Development',
    description: 'Scalable software-as-a-service products built for growth.',
    projects: [
      {
        id: 'saas-1',
        title: 'Project Management Tool',
        description: 'Team collaboration platform with real-time sync, Kanban boards, and integrations.',
        tech: ['Next.js', 'PostgreSQL', 'WebSockets', 'Stripe'],
        link: '#'
      },
      {
        id: 'saas-2',
        title: 'CRM Platform',
        description: 'Customer relationship management system with pipeline tracking and automation.',
        tech: ['React', 'Node.js', 'MongoDB', 'Email Integration'],
        link: '#'
      },
      {
        id: 'saas-3',
        title: 'Analytics Dashboard',
        description: 'Business intelligence platform with custom reports and data visualization.',
        tech: ['Vue.js', 'Python', 'Data Warehouse', 'Charts'],
        link: '#'
      },
      {
        id: 'saas-4',
        title: 'HR Management System',
        description: 'Complete HR solution with payroll, leave management, and performance tracking.',
        tech: ['React', 'Django', 'PostgreSQL', 'PDF Generation'],
        link: '#'
      }
    ]
  },
  'digital-marketing': {
    serviceId: 'digital-marketing',
    serviceName: 'Digital Marketing',
    description: 'Comprehensive digital marketing strategies driving business growth.',
    projects: [
      {
        id: 'dm-1',
        title: 'Startup Launch Campaign',
        description: 'Full-funnel marketing campaign for tech startup launch achieving 10K signups.',
        tech: ['Multi-Channel', 'Content Marketing', 'PR', 'Email'],
        link: '#'
      },
      {
        id: 'dm-2',
        title: 'Brand Awareness Campaign',
        description: 'Integrated campaign increasing brand awareness by 150% in target market.',
        tech: ['Brand Strategy', 'Display Ads', 'Influencer', 'Events'],
        link: '#'
      },
      {
        id: 'dm-3',
        title: 'Lead Generation System',
        description: 'Automated lead generation funnel producing 500+ qualified leads monthly.',
        tech: ['Landing Pages', 'Email Nurture', 'Webinars', 'CRM'],
        link: '#'
      },
      {
        id: 'dm-4',
        title: 'E-commerce Growth',
        description: 'Digital strategy tripling online revenue through omnichannel approach.',
        tech: ['Omnichannel', 'Remarketing', 'Loyalty Program', 'Analytics'],
        link: '#'
      }
    ]
  }
};
