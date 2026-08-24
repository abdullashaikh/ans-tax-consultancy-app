import { apiClient } from './client';
import { ApiResponse, ClientInvoice } from '../types';

export const paymentsApi = {
  listMyInvoices: async () => {
    const res = await apiClient.get<ApiResponse<ClientInvoice[]>>('/payments');
    return res.data;
  },

  createOrder: async (data: {
    applicationId: number;
    amount: number;
    currency?: string;
  }) => {
    const res = await apiClient.post<ApiResponse<{
      orderId: string;
      amount: number;
      currency: string;
      keyId: string;
    }>>('/payments/orders', data);
    return res.data;
  },
};
