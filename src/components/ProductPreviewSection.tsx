import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck,
  CreditCard,
  Briefcase,
  Calendar,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export const ProductPreviewSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'agreements' | 'payments' | 'grievance'>('overview');

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-slate-200/70 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
            {t.productPreview.tag}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-display">
            {t.productPreview.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.productPreview.subtitle}
          </p>
          <div className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500 border border-slate-200">
            {t.productPreview.badgeDemo}
          </div>
        </div>

        {/* Product Dashboard Frame (Inspired by Reference 3) */}
        <div className="mt-14 rounded-3xl border border-slate-300/80 bg-slate-900 p-2 sm:p-4 shadow-2xl shadow-slate-900/20">
          {/* Top Browser / App Chrome Bar */}
          <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">app.amana-ethiopia.org/portal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 font-bold">
                ENCRYPTED SSL
              </span>
            </div>
          </div>

          {/* Inner App Workspace */}
          <div className="rounded-2xl bg-white overflow-hidden text-slate-900">
            {/* Top Workspace Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 px-6 py-4 gap-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">AMANA Employment Workspace</div>
                  <div className="text-xs text-slate-500">Worker Portal • ID: AMN-ET-8492</div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeTab === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.productPreview.overviewTab}
                </button>
                <button
                  onClick={() => setActiveTab('agreements')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeTab === 'agreements' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.productPreview.agreementsTab}
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeTab === 'payments' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.productPreview.paymentsTab}
                </button>
                <button
                  onClick={() => setActiveTab('grievance')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    activeTab === 'grievance' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.productPreview.grievanceTab}
                </button>
              </div>
            </div>

            {/* Dashboard Content Body (Ref 3 inspired metrics and layout) */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Employment Status</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900 font-display">Active & Verified</span>
                    <span className="rounded-full bg-emerald-100 p-1 text-emerald-700">
                      <CheckCircle2 size={16} />
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-emerald-600 font-semibold">Protected under AMANA Standard</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Compensation</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900 font-display">ETB 8,500.00</span>
                    <span className="rounded-full bg-blue-100 p-1 text-blue-700">
                      <CreditCard size={16} />
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-medium">Due in 8 days (Telebirr)</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Recorded Wages</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900 font-display">ETB 51,000.00</span>
                    <span className="rounded-full bg-teal-100 p-1 text-teal-700">
                      <TrendingUp size={16} />
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-teal-600 font-semibold">6 Consecutive On-time Months</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Protection Status</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900 font-display">100% Secure</span>
                    <span className="rounded-full bg-emerald-100 p-1 text-emerald-700">
                      <Lock size={16} />
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-emerald-600 font-semibold">Zero unresolved disputes</div>
                </div>
              </div>

              {/* Main Panel Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Active Agreement Summary */}
                <div className="lg:col-span-8 rounded-2xl border border-slate-200 p-5 bg-white">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Contract File</div>
                      <h4 className="text-base font-bold text-slate-900">{t.productPreview.contractSummaryTitle}</h4>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                      {t.productPreview.contractStatus}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5 text-xs text-slate-600">
                    <p className="font-semibold text-slate-800">{t.productPreview.contractEmployer}</p>
                    <p>{t.productPreview.contractSalary}</p>
                    <p>{t.productPreview.contractHours}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Signed digitally on July 14, 2026</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1 cursor-pointer hover:underline">
                      View Full Agreement <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>

                {/* Quick Action Drawer Mockup */}
                <div className="lg:col-span-4 rounded-2xl border border-slate-200 p-5 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Worker Support & Actions</h4>
                    <p className="text-xs text-slate-500 mt-1">Direct tools for your employment journey.</p>
                    <div className="mt-4 space-y-2">
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Request Digital Salary Slip</span>
                        <ArrowUpRight size={14} className="text-slate-400" />
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Report Workplace Problem</span>
                        <ArrowUpRight size={14} className="text-rose-500" />
                      </div>
                      <div className="rounded-xl bg-white p-2.5 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
                        <span>Review Schedule & Hours</span>
                        <ArrowUpRight size={14} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-[11px] text-slate-400 text-center">
                    Simulated dashboard component for demonstration.
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
