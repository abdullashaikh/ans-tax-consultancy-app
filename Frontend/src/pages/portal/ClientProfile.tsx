import React, { useState, useEffect } from 'react';
import { User, Building2, Save, ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { useClientAuth } from '../../context/ClientAuthContext';
import { authApi } from '../../api/auth.api';
import { useToast } from '../../context/ToastContext';

export const ClientProfile: React.FC = () => {
  const { user, profile, refreshProfile } = useClientAuth();
  const [businessName, setBusinessName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstin, setGstin] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    if (profile) {
      setBusinessName(profile.businessName || '');
      setContactPhone(profile.contactPhone || '');
      setPanNumber(profile.panNumber || '');
      setGstin(profile.gstin || '');
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await authApi.updateProfile({
        businessName: profile?.clientType === 'BUSINESS' ? businessName : undefined,
        contactPhone,
        panNumber: panNumber ? panNumber.toUpperCase() : undefined,
        gstin: gstin ? gstin.toUpperCase() : undefined,
      });

      if (res.success) {
        showSuccess('Client tax profile updated successfully!');
        await refreshProfile();
      }
    } catch (err: any) {
      showError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tax Profile & KYC Compliance</h1>
        <p className="text-xs text-slate-500 mt-1">
          Maintain your permanent account number (PAN), GST identification, and registered communication records.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-3xl">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          {/* Account Category Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                {profile?.clientType === 'BUSINESS' ? (
                  <Building2 className="w-5 h-5 text-amber-600" />
                ) : (
                  <User className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 capitalize">
                  {profile?.clientType?.toLowerCase()} Client Account
                </p>
                <p className="text-[11px] text-slate-500">
                  Primary Contact: {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold uppercase text-[10px]">
              Verified KYC
            </span>
          </div>

          {/* Business Name (If Corporate) */}
          {profile?.clientType === 'BUSINESS' && (
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Corporate Entity Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          )}

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email (Primary Login)
              </label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Communication Phone
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          {/* PAN & GSTIN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                PAN (Permanent Account Number)
              </label>
              <input
                type="text"
                maxLength={10}
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                GSTIN
              </label>
              <input
                type="text"
                maxLength={15}
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase font-bold text-slate-900 focus:ring-2 focus:ring-amber-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save KYC Profile'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
