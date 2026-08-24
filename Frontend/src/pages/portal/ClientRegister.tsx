import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  X,
} from 'lucide-react';
import { useClientAuth } from '../../context/ClientAuthContext';
import { useToast } from '../../context/ToastContext';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validatePAN,
  validateGSTIN,
} from '../../utils/validation';

export const ClientRegister: React.FC = () => {
  const [clientType, setClientType] = useState<'INDIVIDUAL' | 'BUSINESS'>('INDIVIDUAL');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstin, setGstin] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Field errors
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register } = useClientAuth();
  const { showSuccess } = useToast();
  const navigate = useNavigate();

  const passwordStrength = validatePassword(password, true);

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateField = (field: string, val: string) => {
    let error: string | null = null;

    if (field === 'firstName') {
      if (!val.trim()) error = 'First name is required.';
      else if (val.trim().length < 2) error = 'First name must be at least 2 characters.';
    } else if (field === 'lastName') {
      if (!val.trim()) error = 'Last name is required.';
      else if (val.trim().length < 2) error = 'Last name must be at least 2 characters.';
    } else if (field === 'businessName') {
      if (clientType === 'BUSINESS' && !val.trim()) error = 'Registered corporate entity name is required.';
    } else if (field === 'email') {
      const res = validateEmail(val);
      if (!res.isValid) error = res.error || 'Invalid email address.';
    } else if (field === 'phone') {
      const res = validatePhone(val);
      if (!res.isValid) error = res.error || 'Invalid phone number.';
    } else if (field === 'panNumber') {
      const res = validatePAN(val);
      if (!res.isValid) error = res.error || 'Invalid PAN format.';
    } else if (field === 'gstin') {
      const res = validateGSTIN(val);
      if (!res.isValid) error = res.error || 'Invalid GSTIN format.';
    } else if (field === 'password') {
      const res = validatePassword(val, true);
      if (!res.isValid) error = res.error || 'Password does not meet requirements.';
    } else if (field === 'confirmPassword') {
      if (!val) error = 'Please confirm your password.';
      else if (val !== password) error = 'Passwords do not match.';
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const handleBlur = (field: string, val: string) => {
    markTouched(field);
    validateField(field, val);
  };

  const handleChange = (field: string, val: string, setter: (v: string) => void) => {
    setter(val);
    if (touched[field]) {
      validateField(field, val);
    }
    if (field === 'password' && touched.confirmPassword) {
      if (confirmPassword && confirmPassword !== val) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate all required fields
    const newErrors: { [key: string]: string | null } = {
      firstName: validateField('firstName', firstName),
      lastName: validateField('lastName', lastName),
      email: validateField('email', email),
      phone: validateField('phone', phone),
      password: validateField('password', password),
      confirmPassword: validateField('confirmPassword', confirmPassword),
      panNumber: validateField('panNumber', panNumber),
      gstin: validateField('gstin', gstin),
    };

    if (clientType === 'BUSINESS') {
      newErrors['businessName'] = validateField('businessName', businessName);
    }

    setTouched({
      firstName: true,
      lastName: true,
      businessName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      panNumber: true,
      gstin: true,
    });

    const hasAnyError = Object.values(newErrors).some((err) => err !== null);
    if (hasAnyError) {
      setErrorMessage('Please fix all highlighted errors before continuing.');
      return;
    }

    setLoading(true);

    try {
      await register({
        clientType,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        businessName: clientType === 'BUSINESS' ? businessName.trim() : undefined,
        panNumber: panNumber ? panNumber.trim().toUpperCase() : undefined,
        gstin: gstin ? gstin.trim().toUpperCase() : undefined,
      });

      showSuccess('Client account registered! Welcome to ANS Tax Consultancy.');
      navigate('/portal');
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 409) {
        setErrorMessage('An account with this email address already exists. Please sign in instead.');
      } else {
        setErrorMessage(
          err.response?.data?.message || err.message || 'Registration failed. Please review your details.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="p-1.5 rounded-xl bg-white border border-amber-400/60 shadow-sm group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="ANS Logo" className="h-8 w-auto object-contain" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            ANS <span className="text-amber-600 font-bold">Tax Consultancy</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Client Account</h2>
        <p className="mt-1 text-xs text-slate-500">
          Open a client self-service profile for direct tax filings and document verification.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-900/5 rounded-3xl border border-slate-200/80 sm:px-10">
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
            {/* Account Type Selector */}
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Client Profile Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setClientType('INDIVIDUAL');
                    setErrors((prev) => ({ ...prev, businessName: null }));
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                    clientType === 'INDIVIDUAL'
                      ? 'bg-amber-50 text-amber-900 border-amber-400 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Individual Taxpayer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setClientType('BUSINESS')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold border transition-all cursor-pointer ${
                    clientType === 'BUSINESS'
                      ? 'bg-amber-50 text-amber-900 border-amber-400 ring-2 ring-amber-400/20'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Corporate / Firm</span>
                </button>
              </div>
            </div>

            {/* Business Legal Name (If Business) */}
            {clientType === 'BUSINESS' && (
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business Legal Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme FinTech Private Limited"
                  value={businessName}
                  onChange={(e) => handleChange('businessName', e.target.value, setBusinessName)}
                  onBlur={() => handleBlur('businessName', businessName)}
                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.businessName
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.businessName && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.businessName}
                  </p>
                )}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rajesh"
                  value={firstName}
                  onChange={(e) => handleChange('firstName', e.target.value, setFirstName)}
                  onBlur={() => handleBlur('firstName', firstName)}
                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.firstName
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mehta"
                  value={lastName}
                  onChange={(e) => handleChange('lastName', e.target.value, setLastName)}
                  onBlur={() => handleBlur('lastName', lastName)}
                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.lastName
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value, setEmail)}
                  onBlur={() => handleBlur('email', email)}
                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.email
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => handleChange('phone', e.target.value, setPhone)}
                  onBlur={() => handleBlur('phone', phone)}
                  className={`w-full px-4 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.phone
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* PAN & GSTIN (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  PAN Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => handleChange('panNumber', e.target.value.toUpperCase(), setPanNumber)}
                  onBlur={() => handleBlur('panNumber', panNumber)}
                  className={`w-full px-4 py-2.5 rounded-xl font-mono uppercase font-semibold text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.panNumber
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                {errors.panNumber && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <span>•</span> {errors.panNumber}
                  </p>
                )}
              </div>
              {clientType === 'BUSINESS' && (
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    GSTIN (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="24AAAAA0000A1Z5"
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => handleChange('gstin', e.target.value.toUpperCase(), setGstin)}
                    onBlur={() => handleBlur('gstin', gstin)}
                    className={`w-full px-4 py-2.5 rounded-xl font-mono uppercase font-semibold text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                      errors.gstin
                        ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                        : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                    }`}
                  />
                  {errors.gstin && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <span>•</span> {errors.gstin}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Create secure password"
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value, setPassword)}
                  onBlur={() => handleBlur('password', password)}
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.password
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Requirement Checkers */}
              <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-[11px]">
                <p className="font-bold text-slate-700 mb-1.5">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.minLength ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {passwordStrength.checks.minLength ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                    <span>8+ characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.hasUppercase ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {passwordStrength.checks.hasUppercase ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Uppercase (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.hasLowercase ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {passwordStrength.checks.hasLowercase ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Lowercase (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.hasNumber ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {passwordStrength.checks.hasNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Number (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.checks.hasSpecial ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}>
                    {passwordStrength.checks.hasSpecial ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-400" />}
                    <span>Symbol (!@#$...)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value, setConfirmPassword)}
                  onBlur={() => handleBlur('confirmPassword', confirmPassword)}
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-xs border ${
                    errors.confirmPassword
                      ? 'bg-rose-50/40 border-rose-400 focus:ring-2 focus:ring-rose-300'
                      : 'bg-slate-50 border-slate-200 focus:ring-2 focus:ring-amber-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <span>•</span> {errors.confirmPassword}
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
                  <span>Registering Client Account...</span>
                ) : (
                  <>
                    <span>Create My Client Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already registered?{' '}
              <Link to="/portal/login" className="font-bold text-amber-700 hover:text-amber-800 underline">
                Sign in to your portal →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
