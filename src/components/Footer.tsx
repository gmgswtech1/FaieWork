import React from 'react';
import { ShieldCheck, Lock, Globe } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../types';

export const Footer: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t, language, setLanguage, options } = useTranslation();

  const handleNavClick = (anchorId: string) => {
    onNavigate('#/');
    setTimeout(() => {
      const el = document.getElementById(anchorId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <ShieldCheck size={26} />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight font-display">AMANA</span>
                <span className="block text-[11px] font-medium text-emerald-400">{t.slogan}</span>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              {t.footer.aboutText}
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 w-fit px-3 py-1.5 rounded-full">
              <Lock size={13} />
              <span>Confidentiality & Non-Retaliation Guaranteed</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.platformTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('#/')} className="hover:text-emerald-400 transition text-left">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="hover:text-emerald-400 transition text-left">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('how-it-works')} className="hover:text-emerald-400 transition text-left">
                  {t.nav.howItWorks}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('features')} className="hover:text-emerald-400 transition text-left">
                  {t.features.tag}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-emerald-400 transition text-left">
                  {t.faq.tag}
                </button>
              </li>
            </ul>
          </div>

          {/* Worker Protection & Roles */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t.footer.rightsTitle}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('#/get-started')} className="hover:text-emerald-400 transition text-left">
                  {t.benefits.workerCta}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/get-started')} className="hover:text-emerald-400 transition text-left">
                  {t.benefits.employerCta}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('#/signin')} className="hover:text-emerald-400 transition text-left">
                  {t.nav.signIn}
                </button>
              </li>
            </ul>

            {/* Quick Language Switcher in Footer */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
                <Globe size={13} className="text-emerald-400" />
                <span>Languages / ቋንቋዎች:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code as SupportedLanguage)}
                    className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
                      language === opt.code
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {opt.nativeName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} AMANA. {t.footer.copyright}</p>
          <p className="flex items-center gap-1 text-emerald-400/90 font-medium">
            <span>{t.slogan}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
