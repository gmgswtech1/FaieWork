import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const ProblemSolutionSection: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-[#f8fafc] border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
            <AlertTriangle size={14} className="text-amber-700" />
            <span>{t.problem.tag}</span>
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
            {t.problem.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.problem.subtitle}
          </p>
        </div>

        {/* Comparison Grid (Editorial Split Layout) */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Left: The Informal Problem (Without AMANA) */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-rose-200/70">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base">
                  <XCircle size={22} className="text-rose-600" />
                  <span>{t.problem.beforeTitle}</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Unprotected
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 border border-rose-100 shadow-xs">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 leading-snug">{t.problem.p1}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 border border-rose-100 shadow-xs">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 leading-snug">{t.problem.p2}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 border border-rose-100 shadow-xs">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 leading-snug">{t.problem.p3}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 border border-rose-100 shadow-xs">
                  <XCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 leading-snug">{t.problem.p4}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-200/60 text-xs text-rose-700 font-medium">
              Vulnerability and unspoken tension between both workers and households.
            </div>
          </div>

          {/* Right: The Solution (With AMANA) */}
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50/50 p-6 sm:p-8 flex flex-col justify-between shadow-lg shadow-emerald-600/5">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <CheckCircle2 size={22} className="text-emerald-600" />
                  <span>{t.problem.afterTitle}</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Protected Standard
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-emerald-200/80 shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{t.problem.s1}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-emerald-200/80 shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{t.problem.s2}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-emerald-200/80 shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{t.problem.s3}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-emerald-200/80 shadow-xs">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{t.problem.s4}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-emerald-200 flex items-center justify-between">
              <span className="text-xs text-emerald-800 font-semibold">
                Mutual trust, dignity, and peace of mind for both parties.
              </span>
              <button
                onClick={() => onNavigate('#/get-started')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
              >
                <span>Experience AMANA</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
