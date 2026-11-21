import React from 'react';
import { ArrowRight, UserCheck, Building2 } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const CtaBanner: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-[#092e22] text-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#059669_0,transparent_70%)] opacity-30 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl font-display tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {t.cta.title}
        </h2>
        <p className="mt-5 text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
          {t.cta.subtitle}
        </p>

        {/* Dual Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => onNavigate('#/get-started')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition hover:bg-emerald-400 active:scale-95"
          >
            <UserCheck size={18} />
            <span>{t.cta.workerBtn}</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => onNavigate('#/get-started')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-emerald-400/40 bg-emerald-950/60 backdrop-blur px-8 py-4 text-base font-bold text-white transition hover:bg-emerald-900/60 hover:border-emerald-400"
          >
            <Building2 size={18} />
            <span>{t.cta.employerBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
