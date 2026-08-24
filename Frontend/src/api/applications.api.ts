import { apiClient } from './client';
import { ApiResponse, ClientApplication } from '../types';

export interface CreateApplicationPayload {
  serviceId: number;
  title?: string;
  description?: string;
  financialYear?: string;
  assessmentYear?: string;
  notes?: string;
}

export const normalizeApplication = (app: any): ClientApplication => {
  if (!app) return app;
  return {
    id: app.id,
    publicId: app.public_id || app.publicId || String(app.id),
    public_id: app.public_id || app.publicId || String(app.id),
    referenceNumber: app.application_number || app.referenceNumber || `ANS-${app.id}`,
    application_number: app.application_number || app.referenceNumber || `ANS-${app.id}`,
    serviceName: app.service_name || app.serviceName || app.title || 'Tax Filing Service',
    service_name: app.service_name || app.serviceName || app.title || 'Tax Filing Service',
    title: app.title || app.service_name || 'Tax Filing Service',
    categoryName: app.category_name || app.categoryName || 'Compliance Practice',
    financialYear: app.financial_year || app.financialYear,
    assessmentYear: app.assessment_year || app.assessmentYear,
    status: app.status || 'DRAFT',
    priority: app.priority || 'NORMAL',
    quotedAmount: app.quoted_amount ?? app.quotedAmount,
    finalAmount: app.final_amount ?? app.finalAmount,
    currency: app.currency || 'INR',
    createdAt: app.created_at || app.createdAt || new Date().toISOString(),
    created_at: app.created_at || app.createdAt || new Date().toISOString(),
    submittedAt: app.submitted_at || app.submittedAt,
    completedAt: app.completed_at || app.completedAt,
    assignedConsultantName: app.consultant_name || app.assignedConsultantName,
    notes: app.description || app.notes,
  };
};

export const applicationsApi = {
  listMyApplications: async () => {
    const res = await apiClient.get<ApiResponse<any[]>>('/applications');
    if (res.data?.success && Array.isArray(res.data.data)) {
      return {
        ...res.data,
        data: res.data.data.map(normalizeApplication),
      };
    }
    return res.data as ApiResponse<ClientApplication[]>;
  },

  getById: async (publicId: string) => {
    const res = await apiClient.get<ApiResponse<any>>(`/applications/${publicId}`);
    if (res.data?.success && res.data.data) {
      return {
        ...res.data,
        data: normalizeApplication(res.data.data),
      };
    }
    return res.data as ApiResponse<ClientApplication>;
  },

  create: async (data: CreateApplicationPayload) => {
    const res = await apiClient.post<ApiResponse<any>>('/applications', data);
    if (res.data?.success && res.data.data) {
      return {
        ...res.data,
        data: normalizeApplication(res.data.data),
      };
    }
    return res.data as ApiResponse<ClientApplication>;
  },

  listServices: async () => {
    const res = await apiClient.get<ApiResponse<any[]>>('/services');
    return res.data;
  },
};
