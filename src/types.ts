export type PageType = 'home' | 'process' | 'projects' | 'hunter-project' | 'byrne-company' | 'rer-solutions' | 'scott-carlson';

export type ModalType = 'menu' | 'concept' | 'contact' | 'case-study' | 'service' | 'project-detail' | null;

export interface Project {
  id: string;
  name: string;
  city: string;
  description: string;
  heroImage: string;
  gradient?: string;
  liveSiteUrl: string;
  redesignUrl: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  heroImage: string;
  metrics: { label: string; value: string }[];
  challenge: string;
  solution: string;
  result: string;
  websiteUrl: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  cardTitle?: string;
  description: string;
  deliverables: string[];
  buttonText?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  popular?: boolean;
  features: string[];
}
