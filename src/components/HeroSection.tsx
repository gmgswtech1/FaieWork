import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Briefcase,
  FileCheck,
  CreditCard,
  Lock,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f0fdf4]/30 to-white pt-10 pb-16 lg:pt-16 lg:pb-28">
      {/* Decorative background blurs and subtle geometric shapes */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl pointer-events-none" />
      <div className="absolute top-28 left-1/6 -z-10 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Expressive Headline & CTAs (Ref 1 inspired) */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="text-emerald-600" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl font-display leading-[1.08]">
              {t.heroHeadlinePart1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 max-w-2xl font-normal">
              {t.heroSupporting}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <button
                onClick={() => onNavigate('#/get-started')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-7 sm:px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 active:translate-y-0"
              >
                <span>{t.heroPrimaryCta}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onNavigate('#/get-started')}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white px-6 sm:px-7 py-3.5 text-base font-bold text-slate-800 shadow-sm transition hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/40"
              >
                <span>{t.heroSecondaryCta}</span>
              </button>
            </div>

            {/* Trust highlights under hero buttons */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span>Zero Agency Fees</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <FileCheck size={16} className="text-teal-600" />
                <span>Written Agreements</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Lock size={16} className="text-emerald-600" />
                <span>Confidential Escalation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Composition (Inspired by Ref 1 & Ref 2) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Green geometric arch background element (Ref 1 inspired) */}
              <div className="absolute -inset-2 rounded-[36px] bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 opacity-90 -rotate-1 blur-xs" />
              
              <div className="relative overflow-hidden rounded-[32px] bg-slate-900 border border-slate-800 p-3 sm:p-4 text-white shadow-2xl">
                {/* Photo Header Container */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-2xl bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Ethiopian professional using laptop"
                    className="h-full w-full object-cover object-top filter brightness-95 contrast-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Overlaid Protection Pass Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 px-3 py-1.5 shadow-lg">
                    <ShieldCheck size={18} className="text-emerald-400" />
                    <div className="text-[11px] font-bold text-white leading-tight">
                      <div>{t.heroPassTitle}</div>
                      <span className="text-[9px] font-medium text-emerald-300">AMN-ET-2026</span>
                    </div>
                  </div>

                  {/* Floating Employer Verification Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-extrabold text-slate-950 shadow-md">
                    <Building2 size={12} />
                    <span>Verified Employer</span>
                  </div>

                  {/* Bottom caption on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold text-white/90">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>{t.heroPassActive}</span>
                    </div>
                    <span className="text-[11px] text-slate-300">{t.heroPassWorker}</span>
                  </div>
                </div>

                {/* Overlapping Product-Interface Cards (Ref 1 & Ref 3) */}
                <div className="mt-3.5 space-y-2.5">
                  {/* Floating Agreement Preview Card */}
                  <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3 backdrop-blur transition-all hover:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                          <FileCheck size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Standard Domestic Agreement</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>40 Hours / Week</span>
                            <span>•</span>
                            <span>Weekend Rest Guaranteed</span>
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                        Signed
                      </span>
                    </div>
                  </div>

                  {/* Floating Salary Tracker Card */}
                  <div className="rounded-xl bg-slate-800/90 border border-slate-700/80 p-3 backdrop-blur transition-all hover:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                          <CreditCard size={17} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Monthly Salary: ETB 8,500</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} /> 1st of Every Month
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-[10px] font-bold text-teal-300 border border-teal-500/30">
                        {t.heroSalaryDisbursed}
                      </span>
                    </div>
                  </div>

                  {/* 24/7 Confidential Protection Bar */}
                  <div className="flex items-center justify-between rounded-xl bg-emerald-950/70 border border-emerald-800/50 px-3.5 py-2.5 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-[11px]">
                      <Lock size={13} className="text-emerald-400" />
                      <span>{t.heroConfidentialEncrypted}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
