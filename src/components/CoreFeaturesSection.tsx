import React from 'react';
import {
  Briefcase,
  FileCheck,
  CreditCard,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  Sparkles,
  Search,
  MapPin,
  Clock,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const CoreFeaturesSection: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 lg:py-28 bg-white border-t border-slate-200/70 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.features.tag}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
            {t.features.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Alternating Feature Rows */}
        <div className="mt-20 space-y-24">
          {/* Feature 1: Find Fair Opportunities */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <Briefcase size={26} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t.features.f1Title}
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {t.features.f1Desc}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>{t.features.f1Point1}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>{t.features.f1Point2}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>{t.features.f1Point3}</span>
                </li>
              </ul>
              <div className="mt-8">
                <button
                  onClick={() => onNavigate('#/get-started')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Explore opportunities</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              {/* Product UI Mockup Card: Job Finder Preview */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Search size={15} className="text-emerald-600" />
                    <span>Verified Listings • Addis Ababa</span>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    Direct Hire
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {/* Job Card 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900">Head Housekeeper & Organizer</div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-slate-400" /> Bole Atlas
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" /> Full-time (40h/wk)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-700">ETB 7,500 – 9,000</div>
                        <span className="text-[10px] text-slate-400">Monthly gross</span>
                      </div>
                    </div>
                  </div>

                  {/* Job Card 2 */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-bold text-slate-900">Certified Childcare & Nanny</div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-slate-400" /> Kazanchis
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={13} className="text-slate-400" /> Live-out (Mon-Fri)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-700">ETB 8,500 – 11,000</div>
                        <span className="text-[10px] text-slate-400">With meal allowance</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-center text-xs text-slate-500">
                  Every job verified for fair wage standards and safe working conditions.
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Written Employment Agreements (Reversed Layout) */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-6">
              {/* Product UI Mockup Card: Digital Contract Preview */}
              <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 sm:p-7 text-white shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileCheck size={18} className="text-teal-400" />
                    <span className="text-xs font-bold text-slate-200">AMANA Standard Contract</span>
                  </div>
                  <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[10px] font-bold text-teal-300 border border-teal-500/30">
                    Bilingual (Amharic/English)
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-slate-800/90 p-4 border border-slate-700 space-y-3">
                  <div className="flex justify-between text-xs border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Position / ሚና</span>
                    <span className="font-bold text-white">Full-time Home Cook & Caregiver</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Hours / የስራ ሰዓት</span>
                    <span className="font-bold text-white">8:30 AM – 5:00 PM (1h lunch)</span>
                  </div>
                  <div className="flex justify-between text-xs border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Rest Days / የእረፍት ቀናት</span>
                    <span className="font-bold text-teal-300">Saturday & Sunday Guaranteed</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Disbursement / ደሞዝ</span>
                    <span className="font-bold text-emerald-400">ETB 9,000 / Month (by 1st)</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <span className="flex items-center gap-1.5 text-teal-400">
                    <CheckCircle2 size={14} /> Worker Signature Verified
                  </span>
                  <span className="flex items-center gap-1.5 text-teal-400">
                    <CheckCircle2 size={14} /> Employer Signature Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
                <FileCheck size={26} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t.features.f2Title}
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {t.features.f2Desc}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
                  <span>{t.features.f2Point1}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
                  <span>{t.features.f2Point2}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
                  <span>{t.features.f2Point3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3: Salary Tracking */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-800">
                <CreditCard size={26} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t.features.f3Title}
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {t.features.f3Desc}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                  <span>{t.features.f3Point1}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                  <span>{t.features.f3Point2}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-blue-600 shrink-0" />
                  <span>{t.features.f3Point3}</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6">
              {/* Product UI Mockup Card: Salary Ledger */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl shadow-slate-200/50">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment Ledger</div>
                    <div className="text-lg font-black text-slate-900 font-display">Salary Tracking • 2026</div>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    <CheckCircle2 size={13} /> 100% On-Time Record
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">November Salary</div>
                        <div className="text-[11px] text-slate-400">Telebirr • Ref: TB-89214</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900">ETB 8,500.00</div>
                      <span className="text-[10px] font-bold text-emerald-600">Disbursed Nov 1</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">October Salary</div>
                        <div className="text-[11px] text-slate-400">CBE Birr • Ref: CB-44102</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900">ETB 8,500.00</div>
                      <span className="text-[10px] font-bold text-emerald-600">Disbursed Oct 1</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Digital receipts saved permanently.</span>
                  <span className="font-semibold text-emerald-600">Download Receipts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Confidential Reporting (Reversed Layout) */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 lg:order-1 lg:col-span-6">
              {/* Product UI Mockup Card: Confidential Grievance Portal */}
              <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 sm:p-7 shadow-xl shadow-rose-200/40">
                <div className="flex items-center justify-between pb-4 border-b border-rose-200/80">
                  <div className="flex items-center gap-2">
                    <ShieldAlert size={18} className="text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">Confidential Grievance Portal</span>
                  </div>
                  <span className="rounded-full bg-rose-200/80 px-2.5 py-0.5 text-[10px] font-extrabold text-rose-800">
                    100% Encrypted
                  </span>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4 border border-rose-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-800">Case #AMN-GR-104</div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      In Neutral Mediation
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Concern: "Withholding of agreed weekend rest hours during holiday week."
                  </p>
                  <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-100">
                    <span className="font-bold text-slate-700">Mediation Status: </span>
                    Assigned caseworker initiated peaceful dialogue with employer; adjusted schedule agreed in writing.
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-rose-800 font-semibold px-1">
                  <span className="flex items-center gap-1.5">
                    <Lock size={13} /> Strict Non-Retaliation Protection
                  </span>
                  <span>Zero Job Loss Risk</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-800">
                <ShieldAlert size={26} strokeWidth={2.2} />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {t.features.f4Title}
              </h3>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                {t.features.f4Desc}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-rose-600 shrink-0" />
                  <span>{t.features.f4Point1}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-rose-600 shrink-0" />
                  <span>{t.features.f4Point2}</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 size={18} className="text-rose-600 shrink-0" />
                  <span>{t.features.f4Point3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
