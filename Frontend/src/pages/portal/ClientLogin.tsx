import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useClientAuth } from '../../context/ClientAuthContext';
import { useToast } from '../../context/ToastContext';
import { validateEmail, validatePassword } from '../../utils/validation';

export const ClientLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Field-level validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useClientAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/portal';

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (touched.email) {
      const res = validateEmail(val);
      setEmailError(res.isValid ? null : res.error || null);
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    const res = validateEmail(email);
    setEmailError(res.isValid ? null : res.error || null);
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (touched.password) {
      const res = validatePassword(val, false);
      setPasswordError(res.isValid ? null : res.error || null);
    }
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    const res = validatePassword(password, false);
    setPasswordError(res.isValid ? null : res.error || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate all fields
    const emailRes = validateEmail(email);
    const passRes = validatePassword(password, false);

    setTouched({ email: true, password: true });
    setEmailError(emailRes.isValid ? null : emailRes.error || null);
    setPasswordError(passRes.isValid ? null : passRes.error || null);

    if (!emailRes.isValid || !passRes.isValid) {
      setErrorMessage('Please correct the highlighted errors before submitting.');
      return;
    }

    setLoading(true);

    try {
      await login({ email: email.trim(), password });
      showSuccess('Welcome back! Successfully authenticated.');
      navigate(from, { replace: true });
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        setErrorMessage('Incorrect email address or password. Please verify your credentials.');
      } else if (status === 429) {
        setErrorMessage('Too many login attempts. Please wait 15 minutes before trying again.');
      } else {
        setErrorMessage(
          err.response?.data?.message || err.message || 'Unable to connect to login service. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="p-1.5 rounded-xl bg-white border border-amber-400/60 shadow-sm group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="ANS Logo" className="h-8 w-auto object-contain" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            ANS <span className="text-amber-600 font-bold">Tax Consultancy</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Portal Login</h2>
        <p className="mt-1 text-xs text-slate-500">
          Access your tax dossiers, upload verification documents, and track filing progress.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-900/5 rounded-3xl border border-slate-200/80 sm:px-10">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${emailError ? 'text-rose-500' : 'text-slate-400'}`} />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onBlur={handleEmailBlur}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    emailError
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {emailError}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${passwordError ? 'text-rose-500' : 'text-slate-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    passwordError
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                  <span>•</span> {passwordError}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              New client?{' '}
              <Link to="/portal/register" className="font-bold text-amber-700 hover:text-amber-800 underline">
                Register for client account →
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secured with TLS Encryption & RBAC Safeguards</span>
        </div>
      </div>
    </div>
  );
};
