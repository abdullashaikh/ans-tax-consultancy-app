export interface FirmInfo {
  name: string;
  shortName: string;
  tagline: string;
  subTagline: string;
  founded: number;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  social: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  certifications: string[];
}

export interface ServiceOffering {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  tagline: string;
  overview: string;
  whyItMatters: string;
  offerings: ServiceOffering[];
  deliverables: string[];
  faqs: ServiceFaq[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  serviceUsed: string;
  rating: number;
}

export interface ProcessItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  bio: string;
  image?: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    description: string;
  };
  vision: {
    title: string;
    description: string;
  };
  values: CoreValue[];
  leadership: LeadershipMember[];
}
