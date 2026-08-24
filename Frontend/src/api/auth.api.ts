import { apiClient } from './client';
import { ApiResponse, ClientUser, ClientProfile } from '../types';

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await apiClient.post<ApiResponse<{ user: ClientUser; accessToken: string }>>(
      '/auth/login',
      credentials
    );
    return res.data;
  },

  register: async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    clientType: 'INDIVIDUAL' | 'BUSINESS';
    businessName?: string;
    panNumber?: string;
    gstin?: string;
  }) => {
    const res = await apiClient.post<ApiResponse<{ user: ClientUser; accessToken: string }>>(
      '/auth/register',
      data
    );
    return res.data;
  },

  logout: async () => {
    const res = await apiClient.post<ApiResponse<void>>('/auth/logout');
    return res.data;
  },

  getMe: async () => {
    const res = await apiClient.get<ApiResponse<ClientUser>>('/auth/me');
    return res.data;
  },

  getProfile: async () => {
    const res = await apiClient.get<ApiResponse<ClientProfile>>('/clients/profile');
    return res.data;
  },

  updateProfile: async (data: Partial<ClientProfile>) => {
    const res = await apiClient.patch<ApiResponse<ClientProfile>>('/clients/profile', data);
    return res.data;
  },
};
