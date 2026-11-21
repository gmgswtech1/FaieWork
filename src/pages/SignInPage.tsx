import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { usePlatform } from '../context/PlatformContext';
import { Role } from '../types/platform';

interface SignInPageProps {
  onBack: () => void;
  onNavigate: (route: string) => void;
  onShowToast: (msg: string) => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onBack, onNavigate, onShowToast }) => {
  const { t } = useTranslation();
  const { switchRole } = usePlatform();
  const [role, setRole] = useState<Role>('worker');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleDemoAccess = (selectedRole: Role) => {
    switchRole(selectedRole);
    const label =
      selectedRole === 'worker'
        ? 'Worker (Amina Kedir)'
        : selectedRole === 'employer'
        ? 'Employer (Dr. Tewodros Haile)'
        : 'Case Reviewer (Sara Bekele - Protection Desk)';
    onShowToast(`Entered as demonstration ${label}`);
    onNavigate(
      selectedRole === 'worker'
        ? '#/worker'
        : selectedRole === 'employer'
        ? '#/employer'
        : '#/reviewer'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      onShowToast('Please provide your email or phone number.');
      return;
    }
    if (!password || password.length < 4) {
      onShowToast('Password must be at least 4 characters.');
      return;
    }

    handleDemoAccess(role);
  };

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-b from-[#f8fafc] to-white min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          <span>{t.auth.backHome}</span>
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900 font-display">
              {t.auth.signInTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              {t.auth.signInSubtitle}
            </p>
          </div>

          {/* Quick Demo Access (Judge & Developer 1-Click Access) */}
          <div className="mt-6 rounded-2xl bg-emerald-950 p-4 text-white">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles size={14} />
              <span>Instant Demonstration Access</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Judges & reviewers can enter directly with pre-loaded Ethiopian profiles:
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoAccess('worker')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 px-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-xs"
              >
                <UserCheck size={13} />
                <span>Worker</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccess('employer')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 border border-slate-700 py-2.5 px-2 text-xs font-bold text-white hover:bg-slate-700 transition"
              >
                <Building2 size={13} />
                <span>Employer</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoAccess('reviewer')}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 py-2.5 px-2 text-xs font-bold text-white transition shadow-xs"
              >
                <ShieldAlert size={13} />
                <span>Reviewer</span>
              </button>
            </div>
          </div>

          <div className="mt-6 relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 absolute">
              or enter credentials
            </span>
          </div>

          {/* Role Tabs */}
          <div className="mt-6 grid grid-cols-3 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('worker')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
                role === 'worker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={13} className={role === 'worker' ? 'text-emerald-600' : ''} />
              <span>Worker</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
                role === 'employer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 size={13} className={role === 'employer' ? 'text-slate-900' : ''} />
              <span>Employer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('reviewer')}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg transition ${
                role === 'reviewer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldAlert size={13} className={role === 'reviewer' ? 'text-amber-600' : ''} />
              <span>Reviewer</span>
            </button>
          </div>

          {/* Form */}
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t.auth.emailOrPhone}
              </label>
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={role === 'worker' ? '+251 9... or amina@example.com' : 'tewodros@example.com'}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t.auth.password}
                </label>
                <button
                  type="button"
                  onClick={() => onShowToast('Password recovery placeholder in demonstration mode.')}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  {t.auth.forgotPassword}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? t.auth.hidePassword : t.auth.showPassword}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>{t.auth.rememberMe}</span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-95"
            >
              Sign In to {role === 'worker' ? 'Worker Portal' : 'Employer Portal'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            {t.auth.noAccount}{' '}
            <button
              onClick={() => onNavigate('#/get-started')}
              className="font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              {t.auth.registerHere}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
