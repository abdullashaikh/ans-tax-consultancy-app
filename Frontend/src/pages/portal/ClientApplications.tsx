import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ArrowUpRight, FileText, Calendar, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { applicationsApi } from '../../api/applications.api';
import { useToast } from '../../context/ToastContext';
import { ClientApplication } from '../../types';

export const ClientApplications: React.FC = () => {
  const [applications, setApplications] = useState<ClientApplication[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);
  const [financialYear, setFinancialYear] = useState('2024-2025');
  const [assessmentYear, setAssessmentYear] = useState('2025-2026');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showSuccess, showError } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const [appRes, srvRes] = await Promise.all([
        applicationsApi.listMyApplications(),
        applicationsApi.listServices().catch(() => ({ success: true, data: [] })),
      ]);

      if (appRes.success) setApplications(appRes.data || []);
      if (srvRes.success && srvRes.data?.length) {
        setServices(srvRes.data);
        setSelectedServiceId(srvRes.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const selectedService = services.find((s) => s.id === selectedServiceId);
      const serviceName = selectedService ? selectedService.name : 'Tax Filing Application';
      const title = `${serviceName} (FY ${financialYear})`;

      const res = await applicationsApi.create({
        serviceId: selectedServiceId,
        title,
        description: notes.trim() || undefined,
        financialYear,
        assessmentYear,
        notes: notes.trim() || undefined,
      });

      if (res.success) {
        showSuccess('New service application submitted! A consultant will review your dossier.');
        setIsModalOpen(false);
        setNotes('');
        loadData();
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Tax & Filing Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track real-time progress, attached documents, and filing confirmations for your accounts.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Service</span>
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ref Number</th>
                <th className="py-3.5 px-4">Service Required</th>
                <th className="py-3.5 px-4">Filing Period</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Loading your applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No active applications found. Click "Apply for New Service" to start your first filing.
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const refNum = app.referenceNumber || app.application_number || `ANS-${app.id}`;
                  const srvName = app.serviceName || app.service_name || app.title || 'Tax Compliance Service';
                  const dateStr = app.createdAt || app.created_at;
                  const formattedDate = dateStr && !isNaN(new Date(dateStr).getTime())
                    ? new Date(dateStr).toLocaleDateString('en-IN')
                    : 'Recently';
                  const period = app.financialYear
                    ? `FY ${app.financialYear} (AY ${app.assessmentYear || ''})`
                    : 'Current Period';
                  const targetId = app.publicId || app.public_id || String(app.id);

                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {refNum}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{srvName}</td>
                      <td className="py-3.5 px-4 text-slate-600">{period}</td>
                      <td className="py-3.5 px-4 text-slate-500">{formattedDate}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            app.status === 'COMPLETED'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : app.status === 'IN_PROGRESS'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {(app.status || 'DRAFT').replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          to={`/portal/applications/${targetId}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                        >
                          <span>View Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-amber-700 text-xs font-bold uppercase tracking-wider">
                Direct Submission
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">Start New Filing Application</h2>
              <p className="text-xs text-slate-500 mt-1">
                Select your required compliance practice area to launch a dedicated filing case.
              </p>
            </div>

            <form onSubmit={handleCreateApplication} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Practice Area / Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:ring-2 focus:ring-amber-500"
                >
                  {services.length > 0 ? (
                    services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </option>
                    ))
                  ) : (
                    <>
                      <option value={1}>Income Tax Return Filing (ITR-1 / ITR-2 / ITR-4)</option>
                      <option value={2}>Corporate Tax Filing & Audit (ITR-6)</option>
                      <option value={3}>GST Monthly Returns & Annual Audit (GSTR-9)</option>
                      <option value={4}>TDS Quarterly Returns & Certificate Generation</option>
                    </>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Financial Year (FY)
                  </label>
                  <input
                    type="text"
                    required
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assessment Year (AY)
                  </label>
                  <input
                    type="text"
                    required
                    value={assessmentYear}
                    onChange={(e) => setAssessmentYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Filing Notes / Special Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention salary income, capital gains, turnover details, or specific queries..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Create Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
