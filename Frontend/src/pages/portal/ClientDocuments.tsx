import React, { useEffect, useState } from 'react';
import { FolderLock, Download, Upload, FileText, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { applicationsApi } from '../../api/applications.api';
import { documentsApi } from '../../api/documents.api';
import { useToast } from '../../context/ToastContext';
import { ApplicationDocument, ClientApplication } from '../../types';

export const ClientDocuments: React.FC = () => {
  const [applications, setApplications] = useState<ClientApplication[]>([]);
  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);
  const [docTypes, setDocTypes] = useState<any[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<number | undefined>(undefined);
  const [selectedDocTypeId, setSelectedDocTypeId] = useState<number>(1);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const { showSuccess, showError } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [appRes, typeRes] = await Promise.all([
        applicationsApi.listMyApplications(),
        documentsApi.listDocumentTypes().catch(() => ({ success: true, data: [] })),
      ]);

      if (appRes.success && appRes.data?.length) {
        setApplications(appRes.data);
        setSelectedAppId(appRes.data[0].id);

        // Fetch documents for first application
        const firstPubId = appRes.data[0].publicId || appRes.data[0].public_id || String(appRes.data[0].id);
        const docRes = await documentsApi.listByApplication(firstPubId);
        if (docRes.success) setDocuments(docRes.data || []);
      }

      if (typeRes.success && typeRes.data?.length) {
        setDocTypes(typeRes.data);
        setSelectedDocTypeId(typeRes.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load documents data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApplicationChange = async (appId: number) => {
    setSelectedAppId(appId);
    const targetApp = applications.find((a) => a.id === appId);
    if (targetApp) {
      try {
        const targetPubId = targetApp.publicId || targetApp.public_id || String(targetApp.id);
        const docRes = await documentsApi.listByApplication(targetPubId);
        if (docRes.success) setDocuments(docRes.data || []);
      } catch (err) {
        console.error('Failed to fetch documents:', err);
      }
    }
  };

  const handleDownload = async (docPublicId: string) => {
    try {
      const res = await documentsApi.getDownloadUrl(docPublicId);
      if (res.success && res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to generate download URL');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId || !fileName.trim()) return;

    try {
      setIsUploading(true);
      const res = await documentsApi.registerUploadedDocument({
        applicationId: selectedAppId,
        documentTypeId: selectedDocTypeId,
        originalFileName: fileName.trim(),
        mimeType: fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        fileSize: 420000,
      });

      if (res.success) {
        showSuccess('Document successfully uploaded!');
        setFileName('');
        const targetApp = applications.find((a) => a.id === selectedAppId);
        if (targetApp) {
          const targetPubId = targetApp.publicId || targetApp.public_id || String(targetApp.id);
          const docRes = await documentsApi.listByApplication(targetPubId);
          if (docRes.success) setDocuments(docRes.data || []);
        }
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tax Documents & Files</h1>
        <p className="text-xs text-slate-500 mt-1">
          Upload and verify your Form 16, Aadhaar, PAN card, and bank statements for active filings.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-amber-600" />
          <span>Upload Tax Verification Document</span>
        </h2>

        <form onSubmit={handleUpload} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Filing Case
            </label>
            <select
              value={selectedAppId || ''}
              onChange={(e) => handleApplicationChange(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
            >
              {applications.map((app) => (
                <option key={app.id} value={app.id}>
                  {app.referenceNumber} — {app.serviceName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Category
            </label>
            <select
              value={selectedDocTypeId}
              onChange={(e) => setSelectedDocTypeId(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
            >
              {docTypes.map((dt) => (
                <option key={dt.id} value={dt.id}>
                  {dt.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Document File Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. pan_card_self.pdf"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                disabled={isUploading || !selectedAppId}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md shadow-amber-500/20 disabled:opacity-50"
              >
                {isUploading ? '...' : 'Upload'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Documents Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Uploaded Documents for Case #{selectedAppId || '—'}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">File Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date Uploaded</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    Loading documents...
                  </td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    No documents uploaded for this case yet.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{doc.originalFileName}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {doc.documentTypeName || 'Tax File'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          doc.status === 'VERIFIED'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : doc.status === 'REJECTED'
                            ? 'bg-rose-50 text-rose-800 border border-rose-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {doc.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownload(doc.publicId)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-600" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
