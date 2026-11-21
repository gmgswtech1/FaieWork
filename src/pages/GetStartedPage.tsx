import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  Building2,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { usePlatform } from '../context/PlatformContext';
import { Role } from '../types/platform';

interface GetStartedPageProps {
  onBack: () => void;
  onNavigate: (route: string) => void;
  onShowToast: (msg: string) => void;
}

export const GetStartedPage: React.FC<GetStartedPageProps> = ({ onBack, onNavigate, onShowToast }) => {
  const { t } = useTranslation();
  const { switchRole, updateWorkerProfile, updateEmployerProfile } = usePlatform();
  const [selectedRole, setSelectedRole] = useState<Role>('worker');
  const [fullName, setFullName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [location, setLocation] = useState('');
  const [skillOrRole, setSkillOrRole] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      onShowToast('Please provide your name.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      onShowToast('Please provide your phone number or email.');
      return;
    }
    if (!agreed) {
      onShowToast('Please accept the fair employment terms agreement.');
      return;
    }

    if (selectedRole === 'worker') {
      updateWorkerProfile({
        fullName,
        phone: phoneOrEmail,
        location: location || 'Addis Ababa',
        bio: skillOrRole ? `Specialist in ${skillOrRole}` : undefined,
      });
      switchRole('worker');
      onShowToast(`Welcome, ${fullName}! Your worker dashboard is ready.`);
      onNavigate('#/worker');
    } else {
      updateEmployerProfile({
        companyName: fullName.includes('Family') || fullName.includes('Residence') ? fullName : `${fullName} Residence`,
        contactPerson: fullName,
        phone: phoneOrEmail,
        location: location || 'Addis Ababa',
        sector: skillOrRole || 'General Household & Business',
      });
      switchRole('employer');
      onShowToast(`Welcome, ${fullName}! Your employer dashboard is ready.`);
      onNavigate('#/employer');
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-gradient-to-b from-[#f8fafc] to-white min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          <span>{t.auth.backHome}</span>
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <ShieldCheck size={28} />
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 font-display">
              {t.auth.getStartedTitle}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              {t.auth.getStartedSubtitle}
            </p>
          </div>

          {/* Role Pathway Selection */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedRole('worker')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                selectedRole === 'worker'
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <UserCheck size={22} />
                </div>
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === 'worker' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`}
                >
                  {selectedRole === 'worker' && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </div>
              <h3 className="mt-4 font-bold text-slate-900 text-base">{t.auth.workerCardTitle}</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {t.auth.workerCardDesc}
              </p>
            </div>

            <div
              onClick={() => setSelectedRole('employer')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                selectedRole === 'employer'
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800">
                  <Building2 size={22} />
                </div>
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    selectedRole === 'employer' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`}
                >
                  {selectedRole === 'employer' && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </div>
              <h3 className="mt-4 font-bold text-slate-900 text-base">{t.auth.employerCardTitle}</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {t.auth.employerCardDesc}
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.auth.fullName}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.auth.fullNamePlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.auth.phoneOrEmail}
                </label>
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder={t.auth.phonePlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.auth.location}
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.auth.locationPlaceholder}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t.auth.skillOrRole}
                </label>
                <input
                  type="text"
                  value={skillOrRole}
                  onChange={(e) => setSkillOrRole(e.target.value)}
                  placeholder={
                    selectedRole === 'worker'
                      ? t.auth.skillPlaceholderWorker
                      : t.auth.skillPlaceholderEmployer
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="leading-snug">{t.auth.agreeTerms}</span>
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Join as {selectedRole === 'worker' ? 'Worker' : 'Employer'} & Enter Dashboard
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            {t.auth.alreadyAccount}{' '}
            <button
              onClick={() => onNavigate('#/signin')}
              className="font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              {t.nav.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
