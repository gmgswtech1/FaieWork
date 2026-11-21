import React from 'react';
import { UserPlus, Search, FileSignature, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const HowItWorksSection: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  const steps = [
    {
      num: t.howItWorks.step1Num,
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: UserPlus,
    },
    {
      num: t.howItWorks.step2Num,
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: Search,
    },
    {
      num: t.howItWorks.step3Num,
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: FileSignature,
    },
    {
      num: t.howItWorks.step4Num,
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#092e22] text-white relative overflow-hidden">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-emerald-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
            {t.howItWorks.tag}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl font-display text-white">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/80 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Process Cards (Ref 2 inspired) */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl bg-emerald-950/60 border border-emerald-800/60 p-6 sm:p-7 transition-all duration-300 hover:bg-emerald-900/50 hover:border-emerald-500 hover:-translate-y-1.5 shadow-xl"
              >
                {/* Step Number with high contrast */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-display text-emerald-400/90 group-hover:text-emerald-300 transition-colors">
                    {step.num}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800/60 text-emerald-300 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white font-display leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-emerald-100/70 leading-relaxed font-normal">
                  {step.desc}
                </p>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-emerald-800/40 text-[11px] font-semibold text-emerald-300/80 flex items-center gap-1.5">
                  <span>Step {step.num} in the AMANA Journey</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA within How It Works */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onNavigate('#/get-started')}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 active:scale-95"
          >
            <span>Begin in 2 Minutes</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
