import { CaseStudy, ServiceDetail, PricingPlan, Project, Testimonial } from './types';

export interface ProcessStep {
  stepNumber: string;
  phase: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'luxury-residential-brokerage',
    name: 'Luxury Residential Brokerage',
    city: 'Dallas, TX',
    description: 'A boutique firm specializing in high-end residential sales and marketing across the Dallas-Fort Worth metroplex.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'commercial-real-estate-advisors',
    name: 'Commercial Real Estate Advisors',
    city: 'Houston, TX',
    description: 'Full-service commercial real estate brokerage offering leasing, sales, and investment advisory for institutional clients.',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'property-development-group',
    name: 'Property Development Group',
    city: 'Austin, TX',
    description: 'An independent development firm focused on mixed-use and multi-family projects in Texas\'s fastest-growing markets.',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #0c1821 0%, #1b2a4a 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'legacy-real-estate-partners',
    name: 'Legacy Real Estate Partners',
    city: 'San Antonio, TX',
    description: 'A family-owned brokerage with deep roots in the Texas Hill Country, serving both buyers and sellers with personalized care.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'urban-living-realty',
    name: 'Urban Living Realty',
    city: 'Fort Worth, TX',
    description: 'Modern urban real estate services tailored for young professionals and investors looking for downtown and near-downtown properties.',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'texas-ranch-land-group',
    name: 'Texas Ranch & Land Group',
    city: 'Amarillo, TX',
    description: 'Specialists in agricultural land, ranches, and large-acreage properties across West Texas and the Panhandle.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #141e16 0%, #203124 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'vanguard-commercial-properties',
    name: 'Vanguard Commercial Properties',
    city: 'Plano, TX',
    description: 'Strategic commercial real estate solutions for office, retail, and industrial spaces in the Dallas suburbs.',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'blue-sky-real-estate',
    name: 'Blue Sky Real Estate',
    city: 'Houston, TX',
    description: 'Residential real estate with a focus on master-planned communities and new construction in Houston\'s top school districts.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  },
  {
    id: 'heritage-home-advisors',
    name: 'Heritage Home Advisors',
    city: 'Dallas, TX',
    description: 'A boutique firm dedicated to preserving and marketing historic properties and architecturally significant homes in Old East Dallas.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #3f3f46 100%)',
    liveSiteUrl: '#',
    redesignUrl: '#'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'bellview',
    title: 'Bellview Realty',
    subtitle: 'Commercial & Luxury Real Estate',
    category: 'Real Estate Portfolio',
    client: 'Bellview Realty Group',
    year: '2026',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Inquiry Rate Increase', value: '+340%' },
      { label: 'Avg Deal Size', value: '$2.8M' },
      { label: 'Page Load Speed', value: '0.4s' }
    ],
    challenge: 'Bellview operated with a 10-year-old static site that failed to capture commercial buyers and presented property portfolios passively.',
    solution: 'Built a high-contrast showcase with instant qualification for investor inquiries.',
    result: 'Turned Bellview into a modern lead system within 7 days, generating $14M in qualified pipeline.',
    websiteUrl: 'https://bellview-realty.example.com'
  },
  {
    id: 'vanguard',
    title: 'Vanguard Estates',
    subtitle: 'Residential & Multi-Family Real Estate',
    category: 'Real Estate Portfolio',
    client: 'Vanguard Real Estate',
    year: '2026',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    metrics: [
      { label: 'Buyer Lead Conversion', value: '+215%' },
      { label: 'Response Turnaround', value: '< 1 min' },
      { label: 'Inbound Growth', value: '4.2x' }
    ],
    challenge: 'Vanguard depended on manual phone calls and static spec sheets for multi-million dollar listings.',
    solution: 'Built a site paired with an assistant that answers buyer questions 24/7.',
    result: 'Reduced sales cycle length by 65% while tripling inbound buyer leads without increasing headcount.',
    websiteUrl: 'https://vanguard-estates.example.com'
  }
];

export const SERVICES: ServiceDetail[] = [
  {
    id: 'custom-websites',
    title: 'Websites that fit your business',
    cardTitle: 'Websites that fit your business',
    tagline: 'We build your website around your business, your customers, and what you actually need. No recycled template with your logo placed on top.',
    description: 'We build your website around your business, your customers, and what you actually need. No recycled template with your logo placed on top.',
    deliverables: [
      'Full custom design, page by page',
      'Layout and type built to move people toward a decision',
      'One consistent look across the whole site',
      'Mobile-first from the first sketch'
    ],
    buttonText: 'Inquire for Websites That Fit →'
  },
  {
    id: 'good-to-use',
    title: 'A website that feels good to use',
    cardTitle: 'A website that feels good to use',
    tagline: 'We create clear pages, simple navigation, useful interactions, and layouts that make it easy for people to find what they need.',
    description: 'We create clear pages, simple navigation, useful interactions, and layouts that make it easy for people to find what they need.',
    deliverables: [
      'Scroll-based animation throughout',
      'Smooth response on every clickable element',
      'Transition polish on par with the best sites out there',
      'Interaction that responds to the visitor, not a static page'
    ],
    buttonText: 'Inquire for Interaction →'
  },
  {
    id: 'fast-and-findable',
    title: 'Fast and easy to find',
    cardTitle: 'Fast and easy to find',
    tagline: 'We build websites that load quickly, work properly on phones, and follow the basics needed for search engines to understand your business.',
    description: 'We build websites that load quickly, work properly on phones, and follow the basics needed for search engines to understand your business.',
    deliverables: [
      'SEO foundation on every project, every tier',
      'Load times built around mobile visitors first',
      'Deeper technical tuning and structured data on Premium and up',
      'Search console set up before we hand it off'
    ],
    buttonText: 'Inquire for Performance →'
  },
  {
    id: 'ai-assistant',
    title: 'A 24/7 AI assistant',
    cardTitle: 'A 24/7 AI assistant',
    tagline: 'We can add an AI assistant that answers common questions, helps visitors find information, and guides them toward the next step when nobody is available.',
    description: 'We can add an AI assistant that answers common questions, helps visitors find information, and guides them toward the next step when nobody is available.',
    deliverables: [
      'Answers visitors at any hour, including nights and weekends',
      'Knows the basics of your business on every plan',
      'Knows your live listings and pricing on Premium and up',
      'Full business context and deep detail on Enterprise',
      'Routes serious inquiries straight to your inbox'
    ],
    buttonText: 'Inquire for The Assistant →'
  },
  {
    id: 'live-quickly',
    title: 'Get the website live quickly',
    cardTitle: 'Get the website live quickly',
    tagline: 'Most projects do not need months of meetings. Once the direction is clear, we can build and prepare the website for launch in days.',
    description: 'Most projects do not need months of meetings. Once the direction is clear, we can build and prepare the website for launch in days.',
    deliverables: [
      'Seven days from kickoff to launch',
      'Full review before anything replaces your live site',
      'Six months of hosting included',
      'Zero downtime during the switch'
    ],
    buttonText: 'Inquire for Quick Launch →'
  },
  {
    id: 'turn-into-leads',
    title: 'Turn visitors into leads',
    cardTitle: 'Turn visitors into leads',
    tagline: 'We add forms, calls, messages, bookings, and other contact points so interested visitors have an easy way to reach your business.',
    description: 'We add forms, calls, messages, bookings, and other contact points so interested visitors have an easy way to reach your business.',
    deliverables: [
      'Instant property valuation tool',
      'Buyer and seller intake handled separately',
      'Listings linked to your MLS',
      'Inquiries answered under an hour, every time'
    ],
    buttonText: 'Inquire for Lead Capture →'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: '',
    billing: '',
    features: [
      '5 custom-designed pages',
      'Assistant trained on the basics of your business',
      'Fully responsive, mobile-first build',
      'Property listings linked to your MLS',
      'Six months of hosting included'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '',
    billing: '',
    popular: true,
    features: [
      '10 custom-designed pages',
      'Assistant trained on your live listings and pricing',
      'Full animation and motion throughout the site',
      'Instant lead form',
      'Sharper load speed and deeper SEO setup',
      'Six months of hosting included',
      'Delivered in 7 days'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '',
    billing: '',
    features: [
      'Unlimited custom pages',
      'Assistant trained on full business context, including pricing, inventory, and history',
      'Advanced property search and filtering',
      'Our fastest load times and deepest SEO build',
      'Dedicated priority support',
      'Six months of hosting included',
      'Delivered in 7 days'
    ]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    phase: 'Phase 001 — Assets & Discovery',
    title: 'Assets & Discovery',
    description: 'We study your current site, your listings, and where your business stands in the market before we touch anything.'
  },
  {
    stepNumber: '02',
    phase: 'Phase 002 — Design & Build',
    title: 'Design & Build',
    description: 'We design every page around your business, build it for speed and search, and set up your assistant.'
  },
  {
    stepNumber: '03',
    phase: 'Phase 003 — Handoff & Hosting',
    title: 'Handoff & Hosting',
    description: 'Your domain moves over, six months of hosting are already covered, and your new site goes live on schedule.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "We had a live site in under a week. I still don't understand how they pulled that off.",
    author: 'Marcus Reyes',
    role: 'Principal',
    company: 'Reyes Commercial Group',
    avatarInitials: 'MR'
  },
  {
    id: 't2',
    quote: 'The assistant catches leads at midnight that used to just sit in a general inbox until Monday.',
    author: 'Alicia Chen',
    role: 'Broker-Owner',
    company: 'Chen & Associates',
    avatarInitials: 'AC'
  },
  {
    id: 't3',
    quote: 'I got quotes from three agencies before this. None of them came close on price, and none of them showed me anything before asking for money.',
    author: 'David Okafor',
    role: 'Managing Partner',
    company: 'Okafor Property Group',
    avatarInitials: 'DO'
  },
  {
    id: 't4',
    quote: 'Our old site looked like it was built in 2015. This one looks like we\'re the biggest firm in the city, because now we seem like it.',
    author: 'Sarah Whitfield',
    role: 'Director of Marketing',
    company: 'Whitfield Realty Partners',
    avatarInitials: 'SW'
  },
  {
    id: 't5',
    quote: 'Two rounds of changes and it was exactly what we wanted. No arguing about scope, no extra invoices.',
    author: 'Tom Ibrahim',
    role: 'CEO',
    company: 'Ibrahim Development',
    avatarInitials: 'TI'
  },
  {
    id: 't6',
    quote: 'Google started ranking us for terms we\'d never shown up for before. That happened in the first month.',
    author: 'Priya Nair',
    role: 'Owner',
    company: 'Nair & Co. Properties',
    avatarInitials: 'PN'
  },
  {
    id: 't7',
    quote: 'No retainer, no monthly bill, no salesperson checking in every quarter. We paid once and it\'s been running fine since.',
    author: 'Jonathan Pierce',
    role: 'Founder',
    company: 'Pierce Land Holdings',
    avatarInitials: 'JP'
  },
  {
    id: 't8',
    quote: 'Not just designers. True partners. They care about our bottom line.',
    author: 'Jane Doe',
    role: 'CEO',
    company: 'Bellview Realty',
    avatarInitials: 'JD'
  }
];

export const FAQS: FaqItem[] = [
  {
    question: 'Do you use our existing brand colors?',
    answer: 'Yes. We build around your existing logo and palette. We\'re not replacing your brand, we\'re building the site it deserves.'
  },
  {
    question: 'What does the assistant do?',
    answer: 'It lives on your site and answers visitor questions at any hour, including nights and weekends. Serious inquiries go straight to your inbox.'
  },
  {
    question: 'How do I update my listings later?',
    answer: 'Send us the update, or use the dashboard we hand off at launch. Either way, changes go live within hours.'
  },
  {
    question: 'What happens after the 6 months of free hosting?',
    answer: 'You can move to another host, or buy hosting through us if you\'d rather keep it simple.'
  },
  {
    question: 'How fast will my new site be delivered?',
    answer: 'Seven days on Standard and Premium. Enterprise gets scoped based on size.'
  },
  {
    question: 'Do you lock me into a monthly retainer?',
    answer: 'No. This is a one-time build. Support after launch is available if you want it, never because you\'re required to keep paying.'
  },
  {
    question: 'Will I lose my old website?',
    answer: 'No. Your current site stays live and untouched until the new one is built, reviewed, and approved by you.'
  },
  {
    question: 'What if I don\'t like the final site?',
    answer: 'You get two rounds of revisions. If you still don\'t love it after that, you get your money back. We don\'t take anything upfront, so there\'s nothing on the line for you to risk.'
  },
  {
    question: 'How fast do you respond to inquiries?',
    answer: 'Under an hour, not days later.'
  },
  {
    question: 'What does GetGoLive mean?',
    answer: 'Get is the planning and the strategy. Go is building it and pushing it forward. Live is the moment it goes out into the world and starts working for you.'
  }
];

