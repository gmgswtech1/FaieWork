import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileText,
  User,
  ArrowRight,
  Eye,
  Activity as ActivityIcon,
  Lock,
  Building2,
  Coins,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Complaint } from '../../types/platform';

interface ReviewerOverviewPageProps {
  onNavigateTab: (tab: string) => void;
  onOpenCase: (caseItem: Complaint) => void;
}

export const ReviewerOverviewPage: React.FC<ReviewerOverviewPageProps> = ({
  onNavigateTab,
  onOpenCase,
}) => {
  const { complaints, reviewer, activities } = usePlatform();

  // Reviewer assigned cases
  const assignedCases = complaints.filter((c) => c.assignedReviewerId === reviewer.id);

  // Dynamic Metrics
  const newlySubmitted = assignedCases.filter((c) => c.status === 'submitted').length;
  const underReview = assignedCases.filter((c) => c.status === 'under_review').length;
  const awaitingInfo = assignedCases.filter((c) => c.status === 'additional_info_required').length;
  const referred = assignedCases.filter((c) => c.status === 'referred_for_support').length;
  const resolved = assignedCases.filter((c) => c.status === 'resolved' || c.status === 'closed').length;

  // Urgent attention: cases submitted or awaiting response
  const urgentCases = assignedCases
    .filter((c) => c.status === 'submitted' || c.status === 'additional_info_required')
    .slice(0, 5);

  // Filter activities relevant to reviewer or protection
  const reviewerActivities = activities
    .filter((a) => a.roleTarget === 'reviewer' || a.roleTarget === 'all')
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#092e22] to-[#124d3a] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3 border border-emerald-400/30">
            <Lock size={13} />
            <span>Authorized Case Review Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Worker Protection Operations
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Welcome back, <strong>{reviewer.fullName}</strong>. Manage confidential workplace reports, evaluate contractual evidence, communicate securely with workers, and coordinate fair resolution.
          </p>
        </div>

        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {assignedCases.length}
          </div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Assigned Case Portfolio
          </div>
          <div className="mt-2 text-[11px] text-emerald-200">
            {newlySubmitted} Intake Needed • {awaitingInfo} Needs Info
          </div>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-amber-950 text-xs">
        <ShieldAlert size={20} className="text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-snug">
          <strong className="block text-amber-900 font-bold">
            DEMO MODE — Case Reviewer Portal
          </strong>
          <span>
            You are operating in the demonstration reviewer environment. Role boundaries prevent employers from inspecting complaints or worker identities. All status changes and internal notes persist in local browser storage.
          </span>
        </div>
      </div>

      {/* Dynamic Calculated KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Assigned
          </span>
          <div className="mt-2 text-2xl font-black text-slate-900 font-mono">
            {assignedCases.length}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Full Portfolio</span>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
            New Submissions
          </span>
          <div className="mt-2 text-2xl font-black text-blue-800 font-mono">
            {newlySubmitted}
          </div>
          <span className="text-[10px] text-blue-600/80 mt-0.5 block">Needs Intake</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Under Review
          </span>
          <div className="mt-2 text-2xl font-black text-indigo-700 font-mono">
            {underReview}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Active Audit</span>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
            Awaiting Info
          </span>
          <div className="mt-2 text-2xl font-black text-amber-800 font-mono">
            {awaitingInfo}
          </div>
          <span className="text-[10px] text-amber-600/80 mt-0.5 block">Worker Action</span>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
            Referred Out
          </span>
          <div className="mt-2 text-2xl font-black text-purple-800 font-mono">
            {referred}
          </div>
          <span className="text-[10px] text-purple-600/80 mt-0.5 block">Legal/Support</span>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs">
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
            Resolved
          </span>
          <div className="mt-2 text-2xl font-black text-emerald-800 font-mono">
            {resolved}
          </div>
          <span className="text-[10px] text-emerald-600/80 mt-0.5 block">Concluded</span>
        </div>
      </div>

      {/* Main Grid: Priority Cases & Review Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Priority Intake Queue (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-600" />
              <span>Priority Cases Requiring Reviewer Action</span>
            </h2>
            <button
              onClick={() => onNavigateTab('cases')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View All ({assignedCases.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {urgentCases.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-400">
              <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2" />
              <p className="text-xs font-semibold text-slate-700">All intake queues up to date!</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                No newly submitted cases or pending worker clarifications requiring attention.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {urgentCases.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition shadow-2xs hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {c.caseReference}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        {c.categoryLabel}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                          c.status === 'submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium line-clamp-1">
                      "{c.description}"
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Worker: <strong className="text-slate-700">{c.workerName}</strong></span>
                      <span>Employer: <strong className="text-slate-700">{c.relatedEmployerName || 'Unspecified'}</strong></span>
                      <span>Filed: {c.createdAt.split('T')[0]}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCase(c)}
                    className="rounded-xl bg-[#092e22] hover:bg-[#124d3a] text-white px-3.5 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 shrink-0 shadow-2xs"
                  >
                    <Eye size={13} />
                    <span>Open Case Dossier</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Category Summary */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Grievance Categories Distribution
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Unpaid Wages</span>
                <span className="font-bold text-slate-900 text-sm">
                  {assignedCases.filter((c) => c.category === 'unpaid_wages').length}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Contract Violations</span>
                <span className="font-bold text-slate-900 text-sm">
                  {assignedCases.filter((c) => c.category === 'contract_violations').length}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Harassment/Threats</span>
                <span className="font-bold text-slate-900 text-sm">
                  {assignedCases.filter(
                    (c) => c.category === 'workplace_harassment' || c.category === 'threats_intimidation'
                  ).length}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Safety / Other</span>
                <span className="font-bold text-slate-900 text-sm">
                  {assignedCases.filter(
                    (c) => c.category === 'unsafe_working_conditions' || c.category === 'other'
                  ).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activities (1 Col) */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
            <ActivityIcon size={18} className="text-emerald-700" />
            <span>Protection Activities</span>
          </h2>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3.5 shadow-2xs">
            {reviewerActivities.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No recent logged actions.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {reviewerActivities.map((act) => (
                  <div key={act.id} className="border-b border-slate-100 last:border-b-0 pb-3 last:pb-0 space-y-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-800">{act.title}</span>
                      <span className="text-slate-400 text-[10px]">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs">{act.description}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => onNavigateTab('activity')}
              className="w-full text-center text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-2 block border-t border-slate-100"
            >
              View Full Audit Log →
            </button>
          </div>

          {/* Reviewer Credentials Card */}
          <div className="rounded-3xl bg-[#092e22] text-white p-5 space-y-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
                <User size={20} />
              </div>
              <div>
                <span className="font-bold text-sm block">{reviewer.fullName}</span>
                <span className="text-[11px] text-emerald-300 block">{reviewer.roleTitle}</span>
              </div>
            </div>
            <div className="border-t border-emerald-900/60 pt-3 text-[11px] space-y-1 text-emerald-100/90">
              <div>Badge: <strong className="font-mono text-emerald-300">{reviewer.badgeNumber}</strong></div>
              <div>Unit: <strong>{reviewer.department}</strong></div>
              <div>Org: <strong>{reviewer.organization}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};