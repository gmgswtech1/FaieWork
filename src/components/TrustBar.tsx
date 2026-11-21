import React from 'react';
import { FileCheck, CreditCard, Briefcase, ShieldAlert } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const TrustBar: React.FC = () => {
  const { t } = useTranslation();

  const trustItems = [
    {
      icon: FileCheck,
      title: t.trust.clearAgreements,
      desc: t.trust.clearAgreementsDesc,
      tone: 'emerald',
    },
    {
      icon: CreditCard,
      title: t.trust.transparentSalary,
      desc: t.trust.transparentSalaryDesc,
      tone: 'teal',
    },
    {
      icon: Briefcase,
      title: t.trust.fairOpportunities,
      desc: t.trust.fairOpportunitiesDesc,
      tone: 'blue',
    },
    {
      icon: ShieldAlert,
      title: t.trust.confidentialReporting,
      desc: t.trust.confidentialReportingDesc,
      tone: 'amber',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/60">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-100">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-3.5 ${
                  index > 0 ? 'lg:pl-6' : ''
                } transition-transform hover:-translate-y-0.5`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    item.tone === 'emerald'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.tone === 'teal'
                      ? 'bg-teal-100 text-teal-800'
                      : item.tone === 'blue'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
