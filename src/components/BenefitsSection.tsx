import React from 'react';
import { UserCheck, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const BenefitsSection: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section id="for-workers" className="py-20 lg:py-28 bg-[#f8fafc] border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.benefits.tag}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
            {t.benefits.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Two Visually Distinct Columns (Workers vs Employers) */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Card 1: For Workers */}
          <div className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 shadow-xl shadow-emerald-500/5 flex flex-col justify-between transition-all hover:border-emerald-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                    <UserCheck size={26} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">{t.benefits.workerTitle}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.benefits.workerSubtitle}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  Workers First
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {t.benefits.workerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <button
                onClick={() => onNavigate('#/get-started')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-base font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                <span>{t.benefits.workerCta}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Card 2: For Employers */}
          <div id="for-employers" className="rounded-3xl border border-slate-300 bg-white p-8 sm:p-10 shadow-xl shadow-slate-200/50 flex flex-col justify-between transition-all hover:border-slate-400">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-800">
                    <Building2 size={26} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 font-display">{t.benefits.employerTitle}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{t.benefits.employerSubtitle}</p>
                  </div>
                </div>
                <span className="hidden sm:inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
                  Ethical Hiring
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {t.benefits.employerPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={19} className="text-slate-700 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700 leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100">
              <button
                onClick={() => onNavigate('#/get-started')}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 py-4 text-base font-bold text-white shadow-md transition hover:bg-slate-800"
              >
                <span>{t.benefits.employerCta}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
