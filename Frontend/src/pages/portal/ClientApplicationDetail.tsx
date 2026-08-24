import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  UserCheck,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { applicationsApi } from '../../api/applications.api';
import { documentsApi } from '../../api/documents.api';
import { useToast } from '../../context/ToastContext';
import { ClientApplication, ApplicationDocument } from '../../types';

const STAGES = ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'FILED', 'COMPLETED'];

export const ClientApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ClientApplication | null>(null);
  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);
  const [docTypes, setDocTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Document upload state
  const [selectedDocTypeId, setSelectedDocTypeId] = useState<number>(1);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { showSuccess, showError } = useToast();

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [appRes, docRes, typeRes] = await Promise.all([
        applicationsApi.getById(id),
        documentsApi.listByApplication(id).catch(() => ({ success: true, data: [] })),
        documentsApi.listDocumentTypes().catch(() => ({ success: true, data: [] })),
      ]);

      if (appRes.success && appRes.data) setApplication(appRes.data);
      if (docRes.success) setDocuments(docRes.data || []);
      if (typeRes.success && typeRes.data?.length) {
        setDocTypes(typeRes.data);
        setSelectedDocTypeId(typeRes.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load application detail:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!application || !fileName.trim()) return;

    try {
      setIsUploading(true);
      const res = await documentsApi.registerUploadedDocument({
        applicationId: application.id,
        documentTypeId: selectedDocTypeId,
        originalFileName: fileName.trim(),
        mimeType: fileName.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg',
        fileSize: 450000,
      });

      if (res.success) {
        showSuccess('Document attached to your filing dossier successfully!');
        setFileName('');
        loadData();
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs font-semibold">
        Loading case dossier...
      </div>
    );
  }

  if (!application) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-lg font-bold text-slate-900">Application Not Found</h2>
        <Link to="/portal/applications" className="text-xs text-amber-700 font-bold mt-2 inline-block">
          ← Back to applications list
        </Link>
      </div>
    );
  }

  const currentStageIndex = STAGES.indexOf(application.status);

  return (
    <div className="space-y-8">
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            to="/portal/applications"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-amber-700 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Applications</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {application.serviceName}
            </h1>
            <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-400 font-mono text-xs font-bold">
              {application.referenceNumber}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold uppercase">
            Status: {application.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          Filing Progression Lifecycle
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {STAGES.map((stage, idx) => {
            const isCompleted = currentStageIndex >= idx;
            const isCurrent = currentStageIndex === idx;
            return (
              <div
                key={stage}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-md shadow-amber-500/20'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                    : 'bg-slate-50 text-slate-400 border-slate-200 font-medium'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider mb-1">Step {idx + 1}</div>
                <div className="text-xs font-bold truncate">{stage.replace('_', ' ')}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Details & Consultant Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900">Case Dossier Information</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold uppercase">Filing Period</span>
              <p className="font-bold text-slate-900 mt-1">
                FY {application.financialYear || 'Current'} (AY {application.assessmentYear || 'Current'})
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase">Created On</span>
              <p className="font-bold text-slate-900 mt-1">
                {application.createdAt || application.created_at
                  ? new Date(application.createdAt || application.created_at || '').toLocaleDateString('en-IN')
                  : 'Recently'}
              </p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase">Priority Level</span>
              <p className="font-bold text-slate-900 mt-1">{application.priority || 'NORMAL'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Assigned Tax Consultant
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">
                {application.assignedConsultantName || 'ANS Senior Tax Partner'}
              </p>
              <p className="text-[11px] text-slate-400">Direct Case Lead</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
            For filing clarifications, please call <span className="font-bold text-slate-900">+91-7041512939</span>
          </p>
        </div>
      </div>

      {/* Documents Upload & Verification Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Required Verification Documents</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload requested PAN, Form 16, Bank statements, and acknowledgment receipts
            </p>
          </div>
        </div>

        {/* Upload Form */}
        <div className="p-6 bg-slate-50/50 border-b border-slate-100">
          <form onSubmit={handleUploadDocument} className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="w-full sm:w-1/3">
              <select
                value={selectedDocTypeId}
                onChange={(e) => setSelectedDocTypeId(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                {docTypes.map((dt) => (
                  <option key={dt.id} value={dt.id}>
                    {dt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <input
                type="text"
                required
                placeholder="File name (e.g. form16_salary_fy2425.pdf)"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors disabled:opacity-50 shrink-0"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{isUploading ? 'Attaching...' : 'Upload File'}</span>
            </button>
          </form>
        </div>

        {/* Documents Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Document File</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Uploaded Date</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400">
                    No documents attached yet. Please upload your tax files using the form above.
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
