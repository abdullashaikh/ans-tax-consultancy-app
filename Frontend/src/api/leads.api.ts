import { apiClient } from './client';
import { ApiResponse } from '../types';

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  businessType?: string;
  annualTurnover?: string;
  city?: string;
  state?: string;
  message?: string;
}

export const leadsApi = {
  submit: async (data: LeadSubmission) => {
    const res = await apiClient.post<ApiResponse<{ publicId: string }>>('/leads', data);
    return res.data;
  },
};
