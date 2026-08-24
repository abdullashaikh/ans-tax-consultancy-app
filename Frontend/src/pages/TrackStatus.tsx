import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText,
  Building2,
  Calendar,
} from 'lucide-react';
import axios from 'axios';

const STAGES = ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'FILED', 'COMPLETED'];

export const TrackStatus: React.FC = () => {
  const [refNumber, setRefNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refNumber.trim()) return;

    setErrorMessage(null);
    setTrackingData(null);
    setLoading(true);

    try {
      const res = await axios.get(`/api/v1/applications/track/${encodeURIComponent(refNumber.trim())}`);
      if (res.data?.success && res.data?.data) {
        setTrackingData(res.data.data);
      } else {
        setErrorMessage('No application found with this reference number. Please check and try again.');
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message ||
          'No application found with this reference number. Please verify the code on your receipt.'
      );
    } finally {
      setLoading(false);
    }
  };

  const currentStageIndex = trackingData ? STAGES.indexOf(trackingData.status) : -1;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Real-Time Filing Tracking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Track Your Tax & Compliance Case
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Enter your application reference number to view live processing status and milestones.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 mb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Enter Reference Number (e.g. ANS-202608-00001)"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Searching...</span>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="mt-5 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Tracking Result Card */}
        {trackingData && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 space-y-8 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  {trackingData.categoryName || 'Tax & Regulatory Practice'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {trackingData.serviceName || trackingData.title}
                </h2>
                <p className="font-mono text-xs text-slate-500 mt-0.5">
                  Ref: <strong className="text-slate-900">{trackingData.referenceNumber}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs uppercase">
                  Status: {trackingData.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Stepper */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Filing Progression Milestones
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
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
                      <div className="text-[9px] uppercase tracking-wider mb-1">Step {idx + 1}</div>
                      <div className="text-xs font-bold truncate">{stage.replace('_', ' ')}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timestamps & Next steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Submitted Date</span>
                <p className="font-bold text-slate-900 mt-1">
                  {new Date(trackingData.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Last Status Update</span>
                <p className="font-bold text-slate-900 mt-1">
                  {new Date(trackingData.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <p className="text-slate-500">
                Need to upload additional documents? Sign in to your self-service portal.
              </p>
              <Link
                to="/portal/login"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
              >
                <span>Open Client Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
