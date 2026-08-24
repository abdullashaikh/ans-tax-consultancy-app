import { apiClient } from './client';
import { ApiResponse, ApplicationDocument } from '../types';

export const documentsApi = {
  listByApplication: async (appPublicId: string) => {
    const res = await apiClient.get<ApiResponse<ApplicationDocument[]>>(`/documents/by-application/${appPublicId}`);
    return res.data;
  },

  listDocumentTypes: async () => {
    const res = await apiClient.get<ApiResponse<any[]>>('/documents/types');
    return res.data;
  },

  getDownloadUrl: async (docPublicId: string) => {
    const res = await apiClient.get<ApiResponse<{ downloadUrl: string; expiresAt: string }>>(
      `/documents/${docPublicId}/download-url`
    );
    return res.data;
  },

  registerUploadedDocument: async (data: {
    applicationId?: number;
    documentTypeId: number;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    storageProvider?: string;
    storageObjectKey?: string;
  }) => {
    const res = await apiClient.post<ApiResponse<ApplicationDocument>>('/documents', {
      storageProvider: 'LOCAL_SECURE',
      storageObjectKey: `client_uploads/${Date.now()}_${data.originalFileName}`,
      ...data,
    });
    return res.data;
  },
};
