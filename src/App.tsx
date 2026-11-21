import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Briefcase,
  FileCheck,
  CreditCard,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Users,
  ArrowLeft,
  Building2,
  UserCheck,
  Scale,
  HeartHandshake,
  Lock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash || '#/';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showDemoToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-700 flex items-start gap-3">
          <AlertCircle className="text-emerald-400 shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <p className="font-semibold text-white">Notice</p>
            <p className="text-slate-300 mt-0.5 leading-snug">{feedbackMessage}</p>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-slate-400 hover:text-white ml-auto"
            aria-label="Close toast"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo and Name */}
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('#/');
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
            aria-label="AMANA home"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-105">
              <ShieldCheck size={26} strokeWidth={2.4} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                  AMANA
                </span>
                <span className="hidden sm:inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                  Trust & Rights
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                Employment & Worker Protection
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            <button
              onClick={() => navigateTo('#/')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentRoute === '#/' || currentRoute === ''
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <a
              href="#about"
              onClick={(e) => {
                if (currentRoute !== '#/' && currentRoute !== '') {
                  e.preventDefault();
                  navigateTo('#/');
                  setTimeout(() => {
                    const el = document.getElementById('about');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              About
            </a>
            <button
              onClick={() => navigateTo('#/signin')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentRoute === '#/signin'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <div className="ml-3 pl-3 border-l border-slate-200">
              <button
                onClick={() => navigateTo('#/get-started')}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-emerald-600/30 transition hover:bg-emerald-700 active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 md:hidden shadow-xl animate-fade-in">
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => navigateTo('#/')}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold ${
                  currentRoute === '#/' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Home
              </button>
              <a
                href="#about"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (currentRoute !== '#/' && currentRoute !== '') {
                    navigateTo('#/');
                    setTimeout(() => {
                      const el = document.getElementById('about');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }
                }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                About
              </a>
              <button
                onClick={() => navigateTo('#/signin')}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold ${
                  currentRoute === '#/signin' ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Sign In
              </button>
              <div className="mt-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => navigateTo('#/get-started')}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-base font-bold text-white shadow-md shadow-emerald-600/20"
                >
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Router */}
      <main>
        {currentRoute === '#/signin' ? (
          <SignInPlaceholderView onBack={() => navigateTo('#/')} onDemoSubmit={showDemoToast} />
        ) : currentRoute === '#/get-started' ? (
          <GetStartedPlaceholderView onBack={() => navigateTo('#/')} onDemoSubmit={showDemoToast} />
        ) : (
          <LandingPageView onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-950 text-slate-400 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">AMANA</span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                AMANA is an employment and worker-protection platform connecting workers with employers.
                We ensure fair opportunities, verified agreements, timely compensation, and confidential
                workplace safety.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800/40 w-fit px-3 py-1.5 rounded-full">
                <Lock size={13} />
                <span>Confidentiality & Non-Retaliation Guaranteed</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo('#/')} className="hover:text-emerald-400 transition">
                    Home
                  </button>
                </li>
                <li>
                  <a href="#about" className="hover:text-emerald-400 transition">
                    About AMANA
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="hover:text-emerald-400 transition">
                    What We Offer
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-emerald-400 transition">
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Account & Protection</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <button onClick={() => navigateTo('#/signin')} className="hover:text-emerald-400 transition">
                    Sign In
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('#/get-started')} className="hover:text-emerald-400 transition">
                    Get Started
                  </button>
                </li>
                <li>
                  <a href="#offerings" className="hover:text-emerald-400 transition">
                    Confidential Reporting
                  </a>
                </li>
                <li>
                  <a href="#offerings" className="hover:text-emerald-400 transition">
                    Fair Contracts
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} AMANA. All rights reserved. Dedicated to worker protection and fair employment.</p>
            <p className="flex items-center gap-1 text-slate-400">
              <span>Fair work starts with trust.</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================================
   1. LANDING PAGE VIEW
   ========================================================================= */
function LandingPageView({ onNavigate }: { onNavigate: (route: string) => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Subtle decorative background blur shapes */}
        <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Text & Hero Heading */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-sm">
                <Sparkles size={14} className="text-emerald-600" />
                <span>A New Standard in Worker Protection</span>
              </div>

              {/* Exact user requirement: "Find Work. Build Trust. Protect Your Rights." */}
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.08]">
                Find Work.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Build Trust.
                </span>{' '}
                <br className="hidden sm:inline" />
                Protect Your Rights.
              </h1>

              {/* Exact user requirement: Short description explaining AMANA */}
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl font-normal">
                AMANA is an employment and worker-protection platform connecting workers with employers.
                It helps workers find jobs, establish fair employment agreements, track salary payments,
                and report workplace problems confidentially.
              </p>

              {/* Dual Action Buttons: Get Started and Learn More */}
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <button
                  onClick={() => onNavigate('#/get-started')}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
                >
                  <span>Get Started</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#offerings"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <span>Learn More</span>
                  <ChevronRight size={18} className="text-slate-400" />
                </a>
              </div>

              {/* Key Trust Signals */}
              <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                    <CheckCircle2 size={16} />
                    <span>Verified</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Ethical employers & safe jobs</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                    <Scale size={16} />
                    <span>Fair Contracts</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Transparent written terms</p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                    <Lock size={16} />
                    <span>100% Private</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Encrypted confidential reports</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Ecosystem Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="relative rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl shadow-slate-200/80">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">AMANA Protection Pass</div>
                        <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Active Agreement & Monitored
                        </div>
                      </div>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                      ID: AMN-2026
                    </span>
                  </div>

                  {/* 4 Interactive Feature Highlights Inside Card */}
                  <div className="mt-5 space-y-3.5">
                    {/* Item 1: Job Match */}
                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <div className="rounded-lg bg-blue-100 p-2 text-blue-700 shrink-0">
                        <Briefcase size={18} />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-800">Verified Job Match</span>
                        <p className="text-slate-500 mt-0.5">
                          Role vetted for fair market wage and safe working conditions.
                        </p>
                      </div>
                    </div>

                    {/* Item 2: Agreement */}
                    <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/60 p-3.5 border border-emerald-100">
                      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800 shrink-0">
                        <FileCheck size={18} />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-800">Standardized Agreement</span>
                        <p className="text-slate-600 mt-0.5">
                          Working hours, duties, rest intervals, and mutual rights locked in writing.
                        </p>
                      </div>
                    </div>

                    {/* Item 3: Salary */}
                    <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                      <div className="rounded-lg bg-amber-100 p-2 text-amber-800 shrink-0">
                        <CreditCard size={18} />
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">Salary Tracking</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Disbursed On-Time
                          </span>
                        </div>
                        <p className="text-slate-500 mt-0.5">
                          Digital receipts logged securely with zero delay or unauthorized cuts.
                        </p>
                      </div>
                    </div>

                    {/* Item 4: Confidential Help */}
                    <div className="flex items-start gap-3 rounded-2xl bg-teal-50/60 p-3.5 border border-teal-100">
                      <div className="rounded-lg bg-teal-100 p-2 text-teal-800 shrink-0">
                        <ShieldAlert size={18} />
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-slate-800">Confidential Problem Reporting</span>
                        <p className="text-slate-600 mt-0.5">
                          Direct, private escalation channel protected by non-retaliation rules.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Callout */}
                  <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-300">Start with full security</div>
                      <div className="text-sm font-bold text-emerald-400">Zero Agency Fees for Workers</div>
                    </div>
                    <button
                      onClick={() => onNavigate('#/get-started')}
                      className="rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
                    >
                      Join AMANA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Section Showing What AMANA Offers (Exact User Requirement) */}
      <section id="offerings" className="py-20 lg:py-28 bg-white border-t border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              Core Platform Capabilities
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
              What AMANA Offers
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600">
              Everything workers and employers need to create dignified, transparent, and legally protected employment relationships.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Offering 1: Find Work */}
            <div className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 transition-all duration-200 hover:-translate-y-1.5 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <Briefcase size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 font-display">Find Verified Jobs</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Connect directly with pre-screened, ethical employers. Explore genuine opportunities with clear job descriptions, work expectations, and fair market pay upfront.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600 border-t border-slate-200/60 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" /> Vetted households & companies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" /> Transparent wage listings
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" /> No predatory middlemen
                </li>
              </ul>
            </div>

            {/* Offering 2: Fair Employment Agreements */}
            <div className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 transition-all duration-200 hover:-translate-y-1.5 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                <FileCheck size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 font-display">Fair Agreements</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Establish clear, standardized employment agreements that define scope of work, rest intervals, overtime conditions, and mutual responsibilities before starting.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600 border-t border-slate-200/60 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-600" /> Standardized written terms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-600" /> Mutually agreed duties
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-600" /> Accessible on mobile anytime
                </li>
              </ul>
            </div>

            {/* Offering 3: Track Salary Payments */}
            <div className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 transition-all duration-200 hover:-translate-y-1.5 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <CreditCard size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 font-display">Track Salary Payments</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Track wage disbursements in real time with transparent payment logs, scheduled milestone reminders, and permanent digital receipts to prevent wage disputes.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600 border-t border-slate-200/60 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600" /> Timely payment schedules
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600" /> Immutable receipt history
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-blue-600" /> Clear records for both parties
                </li>
              </ul>
            </div>

            {/* Offering 4: Confidential Workplace Problem Reporting */}
            <div className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 transition-all duration-200 hover:-translate-y-1.5 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                <ShieldAlert size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900 font-display">Confidential Reporting</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Report workplace problems, contract violations, harassment, or withheld pay in strict confidentiality without fear of retaliation or job termination.
              </p>
              <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600 border-t border-slate-200/60 pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600" /> Anonymous reporting option
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600" /> Third-party case review
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-rose-600" /> Mediation & legal support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                About AMANA
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display leading-tight">
                Built on Trust. Anchored in Human Dignity.
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                In Arabic, <em>Amana</em> signifies trustworthiness, integrity, and the sacred fulfillment of
                a moral contract. We created AMANA to bridge the critical gap between workers and employers
                by replacing informal, risky verbal promises with structured, verified, and protected agreements.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Whether you are a domestic worker, a service professional, an artisan, or an employer welcoming someone
                into your household or business, AMANA gives both parties confidence, legal clarity, and mutual respect.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-emerald-600 font-black text-2xl font-display">100%</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">Contract Transparency</div>
                  <p className="text-xs text-slate-500 mt-1">Every agreement is written and mutual.</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-emerald-600 font-black text-2xl font-display">Zero Tolerance</div>
                  <div className="text-sm font-bold text-slate-800 mt-1">For Exploitation</div>
                  <p className="text-xs text-slate-500 mt-1">Protected by confidential escalation.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 font-display">Our Core Commitments</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <HeartHandshake size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Mutual Respect & Transparency</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Employers and workers enter arrangements with clear expectations, fair remuneration, and equal dignity.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <Scale size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Fair Labor Standards</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Adhering to ethical work limits, mandatory rest periods, safety standards, and timely wage disbursement.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Lock size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Safe Grievance Resolution</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        A neutral, independent grievance mechanism where concerns are investigated and resolved without intimidation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl font-display tracking-tight text-white max-w-2xl mx-auto">
            Ready to find work or hire with complete trust?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Join AMANA today. Whether you are seeking a protected job or looking to hire trustworthy talent, we are here for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('#/get-started')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:bg-emerald-400"
            >
              Get Started Now
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavigate('#/signin')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-7 py-4 text-base font-bold text-white transition hover:bg-slate-700"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* =========================================================================
   2. SIGN IN PLACEHOLDER VIEW (#/signin)
   ========================================================================= */
function SignInPlaceholderView({
  onBack,
  onDemoSubmit,
}: {
  onBack: () => void;
  onDemoSubmit: (msg: string) => void;
}) {
  const [role, setRole] = useState<'worker' | 'employer'>('worker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDemoSubmit(
      `Sign In Demo triggered for ${role === 'worker' ? 'Worker' : 'Employer'}: ${email || 'user'}. Full authentication will be connected in the upcoming phase!`
    );
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50/70 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ShieldCheck size={28} />
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900 font-display">Sign In to AMANA</h2>
            <p className="mt-1 text-sm text-slate-500">
              Access your verified agreements and protection tools.
            </p>
          </div>

          {/* Placeholder Banner Notice */}
          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200/80 p-3.5 text-xs text-amber-800 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Placeholder Route</span>
              <p className="mt-0.5 text-amber-700 leading-snug">
                Backend authentication is not yet connected. This interactive form demonstrates the user sign-in workflow.
              </p>
            </div>
          </div>

          {/* Role Selector Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setRole('worker')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition ${
                role === 'worker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck size={14} />
              <span>I am a Worker</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg transition ${
                role === 'employer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 size={14} />
              <span>I am an Employer</span>
            </button>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email or Phone Number
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'worker' ? 'worker@example.com or +251 9...' : 'employer@example.com'}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <a
                  href="#/signin"
                  onClick={(e) => {
                    e.preventDefault();
                    onDemoSubmit('Password reset placeholder triggered.');
                  }}
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Sign In (Demo)
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <button
              onClick={() => {
                window.location.hash = '#/get-started';
              }}
              className="font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              Get Started here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. GET STARTED PLACEHOLDER VIEW (#/get-started)
   ========================================================================= */
function GetStartedPlaceholderView({
  onBack,
  onDemoSubmit,
}: {
  onBack: () => void;
  onDemoSubmit: (msg: string) => void;
}) {
  const [selectedRole, setSelectedRole] = useState<'worker' | 'employer'>('worker');
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDemoSubmit(
      `Registration Demo received for ${fullName || 'New User'} as ${
        selectedRole === 'worker' ? 'Worker' : 'Employer'
      }. The onboarding pipeline will be connected once the backend is ready!`
    );
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50/70 min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center max-w-lg mx-auto">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <ShieldCheck size={28} />
            </div>
            <h2 className="mt-4 text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Get Started with AMANA
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Select how you would like to join our trusted employment and protection platform.
            </p>
          </div>

          {/* Placeholder Banner Notice */}
          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200/80 p-3.5 text-xs text-amber-800 flex items-start gap-2.5">
            <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Placeholder Route</span>
              <p className="mt-0.5 text-amber-700 leading-snug">
                Account creation and databases are not yet enabled. You can interact with this preview to explore the registration onboarding flow.
              </p>
            </div>
          </div>

          {/* Role Pathway Selection */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedRole('worker')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
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
              <h3 className="mt-4 font-bold text-slate-900 text-base">I am a Worker</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Find verified employment, establish a fair written contract, track your salary, and access confidential protection.
              </p>
            </div>

            <div
              onClick={() => setSelectedRole('employer')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                selectedRole === 'employer'
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
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
              <h3 className="mt-4 font-bold text-slate-900 text-base">I am an Employer</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Hire screened talent, sign transparent fair contracts, build lasting workplace trust, and record timely payments.
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abebe Bikila"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email or Phone
                </label>
                <input
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                City / Region
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Addis Ababa, Ethiopia"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Continue as {selectedRole === 'worker' ? 'Worker' : 'Employer'} (Demo)
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already registered on AMANA?{' '}
            <button
              onClick={() => {
                window.location.hash = '#/signin';
              }}
              className="font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              Sign In here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
