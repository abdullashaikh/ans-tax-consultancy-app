import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  FolderLock,
  CreditCard,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useClientAuth } from '../../context/ClientAuthContext';
import { applicationsApi } from '../../api/applications.api';
import { ClientApplication } from '../../types';

export const ClientDashboard: React.FC = () => {
  const { user, profile } = useClientAuth();
  const [applications, setApplications] = useState<ClientApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = await applicationsApi.listMyApplications();
        if (res.success) {
          setApplications(res.data || []);
        }
      } catch (err) {
        console.error('Failed to load applications:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const activeFilings = applications.filter(
    (a) => a.status !== 'COMPLETED' && a.status !== 'CANCELLED'
  );

  return (
    <div className="space-y-8">
      {/* Top Client Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0c1833] to-[#172c57] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-900/5 relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-semibold uppercase tracking-wider border border-amber-500/30">
              Taxpayer Self-Service
            </span>
            {profile?.panNumber && (
              <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white font-mono text-[11px]">
                PAN: {profile.panNumber}
              </span>
            )}
            {profile?.gstin && (
              <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white font-mono text-[11px]">
                GST: {profile.gstin}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome, {user?.firstName} {user?.lastName}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            {profile?.businessName
              ? `Account: ${profile.businessName} — Track your filing dossiers and compliance records.`
              : 'Directly track your income tax filings, GST returns, and document submissions.'}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 relative z-10">
          <Link
            to="/portal/applications"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for New Filing</span>
          </Link>
          <Link
            to="/portal/documents"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs backdrop-blur-sm border border-white/10 transition-colors"
          >
            <FolderLock className="w-4 h-4 text-amber-400" />
            <span>Upload Tax Files</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Filings
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-100">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            {loading ? '...' : activeFilings.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">In progress & under review</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Applications
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">
            {loading ? '...' : applications.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lifetime tax returns & audits</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Assigned Consultant
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 text-sm font-bold text-slate-900">ANS Tax Advisory Team</div>
          <p className="text-[11px] text-slate-500 mt-1">Direct Hotline: +91-7041512939</p>
        </div>
      </div>

      {/* Main Grid: Recent Applications & Help Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications Ledger (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">My Tax Applications</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live progression of your tax returns</p>
            </div>
            <Link
              to="/portal/applications"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Filing Period</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      Loading your applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      You have no active tax applications.{' '}
                      <Link to="/portal/applications" className="text-amber-700 font-bold underline">
                        Start a filing request
                      </Link>
                    </td>
                  </tr>
                ) : (
                  applications.slice(0, 5).map((app) => {
                    const refNum = app.referenceNumber || app.application_number || `ANS-${app.id}`;
                    const srvName = app.serviceName || app.service_name || app.title || 'Tax Filing';
                    const period = app.financialYear ? `FY ${app.financialYear}` : 'Current Period';
                    const targetId = app.publicId || app.public_id || String(app.id);

                    return (
                      <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {refNum}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-900">{srvName}</td>
                        <td className="py-3.5 px-4 text-slate-600">{period}</td>
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
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors"
                          >
                            <span>Track</span>
                            <ArrowUpRight className="w-3 h-3" />
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

        {/* Advisory Help & Contact (1 Column) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Phone className="w-4 h-4" />
              <span>Dedicated Support</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Need Guidance on Your Filing?</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Your assigned Chartered Tax Consultant is available for review calls, GST reconciliation queries, and document clarifications.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold">+91-7041512939</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span>info@anstaxconsultancy.com</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
            🔒 All document uploads and communications are strictly protected by client-consultant confidentiality.
          </div>
        </div>
      </div>
    </div>
  );
};
