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

export interface ServicePackage {
  name: string;
  price: string;
  features: string[];
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  tagline: string;
  overview: string;
  whyItMatters: string;
  priceStarting?: string;
  packages?: ServicePackage[];
  offerings: ServiceOffering[];
  requiredDocuments?: string[];
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

// ==========================================
// CLIENT PORTAL & API TYPES
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ClientUser {
  id: string | number;
  publicId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  clientId?: number;
  clientPublicId?: string;
  businessName?: string;
  clientType?: 'INDIVIDUAL' | 'BUSINESS';
}

export interface ClientProfile {
  id: number;
  publicId: string;
  clientType: 'INDIVIDUAL' | 'BUSINESS';
  businessName?: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhone?: string;
  panNumber?: string;
  gstin?: string;
  status: string;
  addresses?: Array<{
    id: number;
    addressType: 'REGISTERED' | 'OPERATING' | 'COMMUNICATION' | 'BRANCH';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    isPrimary: boolean;
  }>;
}

export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'UNDER_REVIEW'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'QUERY_RAISED'
  | 'QUERY_RESOLVED'
  | 'FILED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface ClientApplication {
  id: number;
  publicId?: string;
  public_id?: string;
  referenceNumber?: string;
  application_number?: string;
  serviceId?: number;
  service_id?: number;
  serviceName?: string;
  service_name?: string;
  serviceCode?: string;
  serviceSlug?: string;
  service_slug?: string;
  title?: string;
  categoryName?: string;
  category_name?: string;
  status: string;
  priority?: string;
  financialYear?: string;
  financial_year?: string;
  assessmentYear?: string;
  assessment_year?: string;
  quotedAmount?: number;
  quoted_amount?: number;
  finalAmount?: number;
  final_amount?: number;
  estimatedFee?: number;
  currency?: string;
  submittedAt?: string;
  submitted_at?: string;
  completedAt?: string;
  completed_at?: string;
  createdAt?: string;
  created_at?: string;
  assignedConsultantName?: string;
  consultant_name?: string;
  notes?: string;
  description?: string;
}

export interface ApplicationDocument {
  id: number;
  publicId: string;
  documentTypeName: string;
  documentTypeCode?: string;
  originalFileName: string;
  fileSize: number;
  mimeType: string;
  status: 'UPLOADED' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'ARCHIVED';
  uploadedAt: string;
  createdAt: string;
}

export interface ClientInvoice {
  id: number;
  publicId: string;
  paymentReference: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentGateway: string;
  paymentMethod?: string;
  applicationReferenceNumber?: string;
  serviceName?: string;
  createdAt: string;
}
