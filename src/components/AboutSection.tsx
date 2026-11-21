import React from 'react';
import { HeartHandshake, Scale, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#f8fafc] border-t border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Philosophy & Meaning */}
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.about.tag}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl font-display leading-tight">
              {t.about.title}
            </h2>

            <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p className="font-semibold text-slate-800">{t.about.p3}</p>
            </div>

            {/* Core Commitments List */}
            <div className="mt-8 pt-6 border-t border-slate-200/80">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-display">
                {t.about.commitmentsTitle}
              </h4>
              <div className="mt-4 space-y-3.5">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
                  <HeartHandshake size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{t.about.c1}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
                  <Scale size={20} className="text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{t.about.c2}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 shadow-xs">
                  <Lock size={20} className="text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">{t.about.c3}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Ethos Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/80 relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-50 rounded-bl-[100px] pointer-events-none -z-0" />
              
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                  <ShieldCheck size={32} />
                </div>

                <blockquote className="mt-6 text-xl sm:text-2xl font-black font-display text-slate-900 leading-tight">
                  “A fair job is not a favor — it is a dignified partnership anchored in trust and written accountability.”
                </blockquote>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900">The AMANA Mission</div>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5">Ethiopia Worker Protection Initiative</div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                    <div className="text-2xl font-black text-emerald-700 font-display">100%</div>
                    <div className="text-[11px] font-bold text-slate-700 mt-1">Written Transparency</div>
                  </div>
                  <div className="rounded-2xl bg-teal-50 p-4 border border-teal-100">
                    <div className="text-2xl font-black text-teal-700 font-display">Zero</div>
                    <div className="text-[11px] font-bold text-slate-700 mt-1">Tolerance for Exploitation</div>
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
