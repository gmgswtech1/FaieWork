import React, { useState } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Briefcase,
  FileCheck2,
  User,
  Building2,
  Users,
  Repeat,
  RotateCcw,
  ArrowLeft,
  Menu,
  X,
  Globe,
  ChevronDown,
  AlertCircle,
  Bell,
  Check,
  Coins,
  ShieldAlert,
  Activity as ActivityIcon,
  Lock,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useTranslation } from '../../i18n/LanguageContext';
import { Role } from '../../types/platform';
import { SupportedLanguage } from '../../types';

interface PlatformShellProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const PlatformShell: React.FC<PlatformShellProps> = ({
  currentTab,
  onTabChange,
  onNavigateHome,
  children,
}) => {
  const {
    currentRole,
    switchRole,
    worker,
    employer,
    reviewer,
    resetDemoData,
    applications,
    agreements,
    complaints,
  } = usePlatform();
  const { t, language, setLanguage, options } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const role: Role = currentRole || 'worker';

  // Worker Nav Items
  const workerNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs', label: 'Find Jobs', icon: Briefcase },
    {
      id: 'applications',
      label: 'My Applications',
      icon: FileCheck2,
      badge: applications.filter((a) => a.workerId === worker.id).length,
    },
    {
      id: 'agreements',
      label: 'My Agreements',
      icon: FileCheck2,
      badge: agreements.filter((a) => a.workerId === worker.id && a.status === 'awaiting_worker_review').length,
    },
    { id: 'salary', label: 'Salary & Payments', icon: Coins },
    {
      id: 'reports',
      label: 'My Reports',
      icon: ShieldAlert,
      badge: complaints.filter((c) => c.workerId === worker.id && c.status === 'additional_info_required').length,
    },
    { id: 'verification', label: 'Trust & Verification', icon: ShieldCheck },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  // Employer Nav Items (CRITICAL PRIVACY ENFORCEMENT: NO COMPLAINTS OR REPORTS ACCESSIBLE!)
  const employerNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'jobs', label: 'My Jobs', icon: Briefcase },
    {
      id: 'applications',
      label: 'Applications',
      icon: Users,
      badge: applications.filter((a) => a.employerId === employer.id && a.status === 'submitted').length,
    },
    {
      id: 'agreements',
      label: 'Employment Agreements',
      icon: FileCheck2,
      badge: agreements.filter((a) => a.employerId === employer.id && a.status === 'awaiting_employer_confirmation').length,
    },
    { id: 'salary', label: 'Salary & Payments', icon: Coins },
    { id: 'verification', label: 'Trust & Verification', icon: ShieldCheck },
    { id: 'profile', label: 'Company Profile', icon: Building2 },
  ];

  // Reviewer Nav Items
  const reviewerNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'cases',
      label: 'Case Management',
      icon: ShieldAlert,
      badge: complaints.filter((c) => c.status === 'submitted').length,
    },
    {
      id: 'assigned_cases',
      label: 'Assigned Cases',
      icon: FileCheck2,
      badge: complaints.filter((c) => c.assignedReviewerId === reviewer.id && c.status === 'under_review').length,
    },
    { id: 'verifications', label: 'Verification Desk', icon: ShieldCheck },
    { id: 'activity', label: 'Review Activity', icon: ActivityIcon },
    { id: 'profile', label: 'Reviewer Profile', icon: User },
  ];

  const navItems =
    role === 'worker' ? workerNavItems : role === 'employer' ? employerNavItems : reviewerNavItems;

  const handleRoleSelect = (nextRole: Role) => {
    switchRole(nextRole);
    onTabChange('overview');
  };

  const handleCycleRole = () => {
    const nextRole: Role =
      role === 'worker' ? 'employer' : role === 'employer' ? 'reviewer' : 'worker';
    handleRoleSelect(nextRole);
  };

  const currentLangOption = options.find((o) => o.code === language) || options[0];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased">
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="rounded-xl bg-rose-100 p-2.5">
                <RotateCcw size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Reset Demonstration Data?</h3>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              This will restore the original sample jobs, worker profile, employer data, agreements, salary records, and confidential report seed data to default demonstration values.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700 transition shadow-sm"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Demo Bar */}
      <div className="bg-slate-900 text-white text-[11px] font-semibold py-1.5 px-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">AMANA Platform</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-bold uppercase tracking-wider">
            {role === 'worker'
              ? 'Worker Mode (Amina Kedir)'
              : role === 'employer'
              ? 'Employer Mode (Haile Residence)'
              : 'Reviewer Mode (Sara Bekele - Protection Desk)'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition"
            title="Reset platform demo state"
          >
            <RotateCcw size={12} />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="text-slate-300 hover:text-white flex items-center gap-1 transition font-bold"
          >
            <ArrowLeft size={12} />
            <span>Public Site</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (Reference 3 inspired: Deep forest-green sidebar) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#092e22] text-white shrink-0 border-r border-[#0d4030]">
          {/* Logo & Portal Info */}
          <div className="p-6 border-b border-emerald-900/60">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-display">AMANA</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {role === 'worker'
                    ? 'Worker Workspace'
                    : role === 'employer'
                    ? 'Employer Workspace'
                    : 'Reviewer Workspace'}
                </span>
              </div>
            </div>

            {/* Active User Card in Sidebar */}
            <div className="mt-5 rounded-2xl bg-emerald-950/70 p-3.5 border border-emerald-800/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-xs uppercase">
                  {role === 'worker'
                    ? worker.fullName.charAt(0)
                    : role === 'employer'
                    ? employer.companyName.charAt(0)
                    : reviewer.fullName.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {role === 'worker'
                      ? worker.fullName
                      : role === 'employer'
                      ? employer.companyName
                      : reviewer.fullName}
                  </div>
                  <div className="text-[10px] text-emerald-300/80 truncate">
                    {role === 'worker'
                      ? worker.location
                      : role === 'employer'
                      ? employer.contactPerson
                      : reviewer.roleTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" aria-label="Sidebar navigation">
            <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400/70 mb-2">
              Menu
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                      : 'text-emerald-100 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} strokeWidth={2.2} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive ? 'bg-slate-950 text-white' : 'bg-emerald-700 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* 3-Role Switcher in Sidebar Footer */}
          <div className="p-4 border-t border-emerald-900/60 bg-emerald-950/60">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Demo Identity
            </div>
            <div className="grid grid-cols-3 gap-1 bg-emerald-950/80 p-1 rounded-xl border border-emerald-800/60 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => handleRoleSelect('worker')}
                className={`py-1.5 rounded-lg transition text-center ${
                  role === 'worker' ? 'bg-emerald-500 text-slate-950 font-black shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                Worker
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('employer')}
                className={`py-1.5 rounded-lg transition text-center ${
                  role === 'employer' ? 'bg-emerald-500 text-slate-950 font-black shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                Employer
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('reviewer')}
                className={`py-1.5 rounded-lg transition text-center ${
                  role === 'reviewer' ? 'bg-emerald-500 text-slate-950 font-black shadow-xs' : 'text-emerald-300 hover:text-white'
                }`}
              >
                Reviewer
              </button>
            </div>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 font-display capitalize">
                  {currentTab === 'overview'
                    ? 'Dashboard Overview'
                    : currentTab === 'jobs'
                    ? role === 'worker'
                      ? 'Job Marketplace'
                      : 'My Job Listings'
                    : currentTab === 'applications'
                    ? role === 'worker'
                      ? 'My Applications'
                      : 'Candidate Applications'
                    : currentTab === 'agreements'
                    ? role === 'worker'
                      ? 'My Agreements'
                      : 'Employment Agreements'
                    : currentTab === 'salary'
                    ? 'Salary & Payments'
                    : currentTab === 'reports'
                    ? 'My Workplace Reports'
                    : currentTab === 'cases'
                    ? 'Case Management'
                    : currentTab === 'assigned_cases'
                    ? 'My Assigned Cases'
                    : currentTab === 'activity'
                    ? 'Review Activity'
                    : currentTab === 'profile'
                    ? role === 'worker'
                      ? 'Worker Profile'
                      : role === 'employer'
                      ? 'Company Profile'
                      : 'Reviewer Profile'
                    : currentTab}
                </h1>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  AMANA Platform •{' '}
                  {role === 'worker'
                    ? 'Worker Experience'
                    : role === 'employer'
                    ? 'Employer Experience'
                    : 'Case Reviewer Operations'}
                </p>
              </div>
            </div>

            {/* Top Right Controls */}
            <div className="flex items-center gap-2.5">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  <Globe size={14} className="text-emerald-600" />
                  <span>{currentLangOption.nativeName}</span>
                  <ChevronDown size={12} className="text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 bg-white py-1.5 shadow-xl z-50">
                    {options.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => {
                          setLanguage(opt.code as SupportedLanguage);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs font-semibold ${
                          language === opt.code
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{opt.nativeName}</span>
                        {language === opt.code && <Check size={13} className="text-emerald-600" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Cycle Role Toggle in Header */}
              <button
                onClick={handleCycleRole}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300/80 px-3 py-1.5 text-xs font-bold text-slate-800 transition"
                title="Switch demo roles"
              >
                <Repeat size={13} className="text-emerald-700" />
                <span className="hidden sm:inline">Role:</span>
                <span className="font-extrabold text-emerald-700 capitalize">{role}</span>
              </button>
            </div>
          </header>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#092e22] text-white p-4 border-b border-emerald-800 shadow-xl animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3">
                <div className="text-xs font-bold text-emerald-300">
                  {role === 'worker'
                    ? worker.fullName
                    : role === 'employer'
                    ? employer.companyName
                    : reviewer.fullName}{' '}
                  ({role.toUpperCase()})
                </div>
                <button
                  onClick={handleCycleRole}
                  className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white"
                >
                  Switch Role
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-100 hover:bg-emerald-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Page Content Workspace */}
          <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
};