import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Globe, ChevronDown, Menu, X, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../types';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const { t, language, setLanguage, options } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== '#/' && currentRoute !== '') {
      onNavigate('#/');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentLangOption = options.find((o) => o.code === language) || options[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: AMANA Brand & Logo */}
        <div
          onClick={() => onNavigate('#/')}
          className="flex items-center gap-3.5 group cursor-pointer"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onNavigate('#/')}
          aria-label="AMANA Home"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 transition-transform group-hover:scale-105">
            <ShieldCheck size={26} strokeWidth={2.4} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-slate-900 font-display">
                AMANA
              </span>
              <span className="hidden sm:inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                {t.badge}
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-tight">
              {t.slogan}
            </p>
          </div>
        </div>

        {/* Middle: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          <button
            onClick={() => onNavigate('#/')}
            className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              currentRoute === '#/' || currentRoute === ''
                ? 'bg-emerald-50 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {t.nav.howItWorks}
          </button>
          <button
            onClick={() => handleNavClick('for-workers')}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {t.nav.forWorkers}
          </button>
          <button
            onClick={() => handleNavClick('for-employers')}
            className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {t.nav.forEmployers}
          </button>
          <button
            onClick={() => onNavigate('#/trust')}
            className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
              currentRoute === '#/trust'
                ? 'bg-emerald-50 text-emerald-800 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Trust Center
          </button>
        </nav>

        {/* Right: Language Selector, Sign In, Get Started */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Functional Multilingual Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-slate-50 focus:outline-none"
              aria-label="Select language"
              aria-expanded={langDropdownOpen}
            >
              <Globe size={15} className="text-emerald-600" />
              <span>{currentLangOption.nativeName}</span>
              <ChevronDown size={13} className={`text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200/50 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                  Select Language
                </div>
                {options.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code as SupportedLanguage);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-xs font-semibold transition ${
                      language === opt.code
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt.nativeName} ({opt.name})</span>
                    {language === opt.code && <Check size={14} className="text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('#/signin')}
            className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition ${
              currentRoute === '#/signin'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {t.nav.signIn}
          </button>

          <button
            onClick={() => onNavigate('#/get-started')}
            className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-95"
          >
            <span>{t.nav.getStarted}</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile controls: language pill + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Compact mobile language button */}
          <button
            onClick={() => {
              const nextIndex = (options.findIndex((o) => o.code === language) + 1) % options.length;
              setLanguage(options[nextIndex].code);
            }}
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 sm:hidden"
            title="Switch Language"
          >
            <Globe size={13} className="text-emerald-600" />
            <span>{language.toUpperCase()}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 lg:hidden shadow-xl animate-in fade-in slide-in-from-top-2">
          {/* Mobile Language Grid */}
          <div className="mb-4 pb-3 border-b border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Language / ቋንቋ
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {options.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLanguage(opt.code as SupportedLanguage)}
                  className={`rounded-xl px-2 py-1.5 text-xs font-bold text-center transition ${
                    language === opt.code
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 border border-slate-200/70 hover:bg-slate-100'
                  }`}
                >
                  {opt.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('#/');
              }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${
                currentRoute === '#/' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.nav.howItWorks}
            </button>
            <button
              onClick={() => handleNavClick('for-workers')}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.nav.forWorkers}
            </button>
            <button
              onClick={() => handleNavClick('for-employers')}
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              {t.nav.forEmployers}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('#/trust');
              }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${
                currentRoute === '#/trust' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Trust Center
            </button>

            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('#/signin')}
                }
                className="w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                {t.nav.signIn}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('#/get-started')}
                }
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20"
              >
                <span>{t.nav.getStarted}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
