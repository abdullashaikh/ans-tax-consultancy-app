import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FolderLock,
  CreditCard,
  User,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { useClientAuth } from '../../context/ClientAuthContext';

export const ClientLayout: React.FC = () => {
  const { user, profile, logout } = useClientAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { to: '/portal', icon: LayoutDashboard, label: 'Overview', end: true },
    { to: '/portal/applications', icon: FileText, label: 'My Applications' },
    { to: '/portal/documents', icon: FolderLock, label: 'Tax Documents' },
    { to: '/portal/invoices', icon: CreditCard, label: 'Invoices & Payments' },
    { to: '/portal/profile', icon: User, label: 'Tax Profile & KYC' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Top Client Navbar */}
      <header className="sticky top-0 z-40 bg-[#0c1833] border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-1 rounded-lg bg-white">
                <img src="/logo.png" alt="ANS Logo" className="h-7 w-auto object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white leading-none">
                  ANS
                </span>
                <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold mt-0.5">
                  Client Self-Service
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-700">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>256-Bit Encrypted Portal</span>
              </span>
            </div>
          </div>

          {/* Desktop User Info & Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Main Website</span>
            </Link>

            <div className="h-4 w-px bg-slate-700" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                {user?.firstName?.[0] || 'C'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {profile?.businessName || (profile?.panNumber ? `PAN: ${profile.panNumber}` : user?.email)}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Bar (Desktop) */}
      <div className="hidden lg:block bg-white border-b border-slate-200 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3.5 text-xs font-bold border-b-2 transition-all ${
                    isActive
                      ? 'border-amber-500 text-amber-700 bg-amber-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 shadow-lg">
          <div className="pb-3 border-b border-slate-100 mb-2">
            <p className="text-xs font-bold text-slate-900">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[11px] text-slate-500">{user?.email}</p>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-amber-600" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-slate-600 hover:text-amber-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} ANS Tax Consultancy. Encrypted Client Self-Service Infrastructure.</p>
        </div>
      </footer>
    </div>
  );
};
