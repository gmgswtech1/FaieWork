import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Plus,
  Lock,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  Eye,
  HelpCircle,
  Info,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Complaint, ComplaintStatus } from '../../types/platform';
import { ReportComplaintModal } from '../../components/reports/ReportComplaintModal';
import { WorkerCaseDetailModal } from '../../components/reports/WorkerCaseDetailModal';

interface WorkerReportsPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const WorkerReportsPage: React.FC<WorkerReportsPageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const { complaints, worker } = usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'action_needed' | 'resolved'>('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Complaint | null>(null);

  // PRIVACY RULE: Worker can ONLY view complaints where workerId === worker.id
  const myComplaints = complaints.filter((c) => c.workerId === worker.id);

  const filteredComplaints = myComplaints.filter((c) => {
    if (activeFilter === 'active') {
      return c.status === 'submitted' || c.status === 'under_review' || c.status === 'referred_for_support';
    }
    if (activeFilter === 'action_needed') {
      return c.status === 'additional_info_required';
    }
    if (activeFilter === 'resolved') {
      return c.status === 'resolved' || c.status === 'closed';
    }
    return true;
  });

  // KPI Calculations
  const totalCount = myComplaints.length;
  const underReviewCount = myComplaints.filter((c) => c.status === 'under_review' || c.status === 'submitted').length;
  const actionRequiredCount = myComplaints.filter((c) => c.status === 'additional_info_required').length;
  const resolvedCount = myComplaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length;

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <Clock size={13} className="text-slate-500" />
            <span>Submitted</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 animate-pulse">
            <Clock size={13} className="text-blue-600" />
            <span>Under Review</span>
          </span>
        );
      case 'additional_info_required':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 animate-bounce">
            <AlertCircle size={13} className="text-amber-600" />
            <span>Action Required</span>
          </span>
        );
      case 'referred_for_support':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            <HelpCircle size={13} className="text-purple-600" />
            <span>Referred for Support</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Resolved</span>
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700">
            <span>Closed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 capitalize">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#092e22] to-[#124d3a] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3 border border-emerald-400/30">
            <Lock size={13} />
            <span>100% Confidential Protection Channel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            My Workplace Reports
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Report workplace concerns confidentially. Employers cannot see your reports. Our neutral case team reviews issues, clarifies facts, and facilitates fair support.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="rounded-2xl bg-rose-500 hover:bg-rose-600 text-white px-5 py-3.5 text-xs font-bold transition shadow-lg flex items-center justify-center gap-2 shrink-0"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Submit New Concern</span>
        </button>
      </div>

      {/* Safety & Demonstration Warnings Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-emerald-950">
          <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Privacy Guarantee:</strong> Employers cannot view reports, evidence, or complainant identities through AMANA. All filings are private between you and the assigned protection reviewer.
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5 text-amber-950">
          <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>DEMO ONLY:</strong> Demonstration records are stored locally in this browser. Do not submit real confidential or emergency information. AMANA is not an emergency police dispatch.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Reports
            </span>
            <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
              <FileText size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 font-mono">{totalCount}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Submitted by you</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Under Review
            </span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-700">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-blue-700 font-mono">{underReviewCount}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Reviewer assigned</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Action Required
            </span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-amber-700 font-mono">{actionRequiredCount}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Information needed</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Resolved
            </span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-700">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-700 font-mono">{resolvedCount}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Review completed</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Reports ({myComplaints.length})
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Review ({underReviewCount})
          </button>
          <button
            onClick={() => setActiveFilter('action_needed')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeFilter === 'action_needed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Needs Response</span>
            {actionRequiredCount > 0 && (
              <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px]">
                {actionRequiredCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveFilter('resolved')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'resolved' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resolved ({resolvedCount})
          </button>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1.5 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200"
        >
          <ShieldAlert size={14} />
          <span>New Confidential Report</span>
        </button>
      </div>

      {/* Complaints List Cards */}
      {filteredComplaints.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <ShieldCheck size={40} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Reports in this view</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            You currently have no workplace concerns filed under this filter. If you ever experience unfair pay, harassment, or unsafe conditions, submit a report anytime.
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="mt-5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
          >
            Submit a Concern
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredComplaints.map((c) => {
            const needsResponse = c.status === 'additional_info_required';
            const latestUpdate = c.workerVisibleUpdates[0];

            return (
              <div
                key={c.id}
                className={`rounded-3xl border bg-white p-5 sm:p-6 transition shadow-xs hover:shadow-md ${
                  needsResponse
                    ? 'border-amber-300 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 border border-rose-100 shrink-0">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {c.caseReference}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                          {c.categoryLabel}
                        </span>
                        {getStatusBadge(c.status)}
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1 line-clamp-1">
                        "{c.description.slice(0, 90)}..."
                      </h2>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCase(c)}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 shadow-2xs shrink-0"
                  >
                    <Eye size={14} />
                    <span>View Details & Timeline</span>
                  </button>
                </div>

                {/* Meta details */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Submitted</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Calendar size={13} className="text-slate-400" />
                      {c.createdAt.split('T')[0]}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Incident Date</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock size={13} className="text-slate-400" />
                      {c.incidentDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Related Employer</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Building2 size={13} className="text-slate-400" />
                      {c.relatedEmployerName || 'Unspecified'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Assigned Reviewer</span>
                    <span className="font-bold text-emerald-800 block mt-0.5">
                      {c.assignedReviewerName}
                    </span>
                  </div>
                </div>

                {/* Latest Update Snippet */}
                {latestUpdate && (
                  <div className="mt-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 p-3 text-xs text-emerald-950 flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-emerald-900">{latestUpdate.title}: </span>
                      <span>"{latestUpdate.message}"</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-mono shrink-0">
                      {new Date(latestUpdate.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {/* Additional Info Request Alert */}
                {needsResponse && (
                  <div className="mt-3 rounded-2xl bg-amber-50 border border-amber-300 p-3 text-xs text-amber-900 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-600 shrink-0" />
                      <span>
                        <strong>Action Required:</strong> Reviewer requested clarification. Click View Details to respond.
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 text-xs font-bold shrink-0"
                    >
                      Respond Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Submit Report Modal */}
      {showSubmitModal && (
        <ReportComplaintModal
          onClose={() => setShowSubmitModal(false)}
          onSuccess={(complaint) => {
            onShowToast?.(`Report ${complaint.caseReference} submitted confidentially!`);
          }}
        />
      )}

      {/* Case Details Modal */}
      {selectedCase && (
        <WorkerCaseDetailModal
          complaint={selectedCase}
          onClose={() => setSelectedCase(null)}
          onShowToast={(msg) => onShowToast?.(msg)}
        />
      )}
    </div>
  );
};