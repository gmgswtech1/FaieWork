import React, { useState } from 'react';
import {
  FileCheck2,
  Building2,
  Calendar,
  Coins,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  MessageSquare,
  XCircle,
  Check,
  ShieldCheck,
  Printer,
  FileText,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { EmploymentAgreement, AgreementStatus } from '../../types/platform';
import { AgreementDocumentPreview } from '../../components/agreements/AgreementDocumentPreview';

interface WorkerAgreementsPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const WorkerAgreementsPage: React.FC<WorkerAgreementsPageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const { agreements, worker, acceptAgreementAsWorker, requestAgreementChanges, declineAgreement } =
    usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'history'>('all');
  const [selectedAgreement, setSelectedAgreement] = useState<EmploymentAgreement | null>(null);

  // Modals
  const [showChangeRequestModal, setShowChangeRequestModal] = useState<EmploymentAgreement | null>(null);
  const [changeNote, setChangeNote] = useState('');
  const [showAcceptConfirm, setShowAcceptConfirm] = useState<EmploymentAgreement | null>(null);
  const [acceptAgreed, setAcceptAgreed] = useState(false);

  const myAgreements = agreements.filter((a) => a.workerId === worker.id);

  const filteredAgreements = myAgreements.filter((agr) => {
    if (activeFilter === 'pending') {
      return agr.status === 'awaiting_worker_review' || agr.status === 'changes_requested';
    }
    if (activeFilter === 'active') {
      return agr.status === 'active';
    }
    if (activeFilter === 'history') {
      return (
        agr.status === 'declined' ||
        agr.status === 'cancelled' ||
        agr.status === 'completed' ||
        agr.status === 'awaiting_employer_confirmation'
      );
    }
    return true;
  });

  const handleAcceptSubmit = () => {
    if (!showAcceptConfirm) return;
    acceptAgreementAsWorker(showAcceptConfirm.id);
    onShowToast?.(`Agreement ${showAcceptConfirm.referenceNumber} terms accepted! Awaiting employer final confirmation.`);
    setShowAcceptConfirm(null);
    setAcceptAgreed(false);
  };

  const handleChangeRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showChangeRequestModal || !changeNote.trim()) return;
    requestAgreementChanges(showChangeRequestModal.id, changeNote.trim());
    onShowToast?.(`Requested revisions on contract ${showChangeRequestModal.referenceNumber}. Employer notified.`);
    setShowChangeRequestModal(null);
    setChangeNote('');
  };

  const getStatusBadge = (status: AgreementStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Active & Protected</span>
          </span>
        );
      case 'awaiting_worker_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 animate-pulse">
            <Clock size={13} className="text-amber-600" />
            <span>Action Required: Review Terms</span>
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
            <MessageSquare size={13} className="text-blue-600" />
            <span>Revisions Requested</span>
          </span>
        );
      case 'awaiting_employer_confirmation':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            <Clock size={13} className="text-purple-600" />
            <span>Awaiting Employer Final Sign-Off</span>
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
            <XCircle size={13} className="text-rose-600" />
            <span>Declined</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 capitalize">
            {status.replace(/_/g, ' ')}
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
            <ShieldCheck size={14} />
            <span>Verified Mutual Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Digital Employment Agreements
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Every job on AMANA is supported by a standardized, transparent agreement. Review your wage, hours, rest schedule, and mutual responsibilities before work commences.
          </p>
        </div>

        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
          <div className="text-2xl font-black text-white font-mono">{myAgreements.length}</div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Total Contracts
          </div>
          <div className="mt-2 text-[11px] text-emerald-200">
            {myAgreements.filter((a) => a.status === 'active').length} Active •{' '}
            {myAgreements.filter((a) => a.status === 'awaiting_worker_review').length} Pending Action
          </div>
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
            All ({myAgreements.length})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              activeFilter === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Pending Review</span>
            {myAgreements.filter((a) => a.status === 'awaiting_worker_review').length > 0 && (
              <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px]">
                {myAgreements.filter((a) => a.status === 'awaiting_worker_review').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveFilter('active')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({myAgreements.filter((a) => a.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveFilter('history')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'history' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            History
          </button>
        </div>

        <button
          onClick={() => onNavigateTab('salary')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200"
        >
          <Coins size={14} />
          <span>View Salary Schedules & Payments</span>
        </button>
      </div>

      {/* Agreements Cards Grid */}
      {filteredAgreements.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FileText size={40} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Employment Agreements in this view</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            When an employer accepts your job application, they issue an official AMANA digital contract for you to review and acknowledge.
          </p>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="mt-5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            Explore Job Marketplace
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAgreements.map((agr) => {
            const isAwaitingWorker = agr.status === 'awaiting_worker_review';
            return (
              <div
                key={agr.id}
                className={`rounded-3xl border bg-white p-5 sm:p-6 transition shadow-xs hover:shadow-md ${
                  isAwaitingWorker
                    ? 'border-amber-300 ring-2 ring-amber-100 bg-amber-50/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 shrink-0">
                      <FileCheck2 size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {agr.referenceNumber}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                          v{agr.version}.0
                        </span>
                        {getStatusBadge(agr.status)}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1 font-display">
                        {agr.jobTitle}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedAgreement(agr)}
                      className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs"
                    >
                      <Eye size={14} />
                      <span>Inspect Legal Terms</span>
                    </button>
                  </div>
                </div>

                {/* Body Meta Details */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Employer</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <Building2 size={13} className="text-slate-400" />
                      {agr.employerName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Agreed Salary</span>
                    <span className="font-black text-emerald-700 text-sm flex items-center gap-1 mt-0.5">
                      <Coins size={14} className="text-emerald-500" />
                      ETB {agr.salaryAmount.toLocaleString()} / {agr.paymentFrequency.toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Work Schedule</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock size={13} className="text-slate-400" />
                      {agr.workingHours}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Start Date</span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Calendar size={13} className="text-slate-400" />
                      {agr.startDate}
                    </span>
                  </div>
                </div>

                {/* Worker Change Request Banner if applied */}
                {agr.workerChangeRequestNote && (
                  <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900 flex items-start gap-2">
                    <MessageSquare size={15} className="shrink-0 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-bold">Your Revision Request: </span>
                      <span>"{agr.workerChangeRequestNote}"</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    Rest Days: <strong className="text-slate-600">{agr.restDays}</strong> • Workplace: <strong className="text-slate-600">{agr.workplaceLocation}</strong>
                  </div>

                  {isAwaitingWorker && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowChangeRequestModal(agr)}
                        className="rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 flex items-center gap-1.5"
                      >
                        <MessageSquare size={13} />
                        <span>Request Changes</span>
                      </button>

                      <button
                        onClick={() => setShowAcceptConfirm(agr)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                      >
                        <Check size={14} />
                        <span>Accept Agreement</span>
                      </button>
                    </div>
                  )}

                  {agr.status === 'active' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateTab('salary')}
                        className="rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5"
                      >
                        <Coins size={13} />
                        <span>View Active Salary Ledger</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Full Screen Agreement Document Preview Modal */}
      {selectedAgreement && (
        <AgreementDocumentPreview
          agreement={selectedAgreement}
          onClose={() => setSelectedAgreement(null)}
          onAccept={() => {
            setSelectedAgreement(null);
            setShowAcceptConfirm(selectedAgreement);
          }}
          onRequestChanges={() => {
            setSelectedAgreement(null);
            setShowChangeRequestModal(selectedAgreement);
          }}
          userRole="worker"
        />
      )}

      {/* Worker Accept Confirmation Dialog */}
      {showAcceptConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 text-emerald-700 p-2.5">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Accept Agreement Terms?
                </h3>
                <p className="text-slate-500 text-xs">{showAcceptConfirm.referenceNumber} (v{showAcceptConfirm.version}.0)</p>
              </div>
            </div>

            <p className="mt-3 text-slate-600 leading-relaxed">
              By confirming, you acknowledge that you have reviewed the agreed salary of{' '}
              <strong className="text-emerald-700">ETB {showAcceptConfirm.salaryAmount.toLocaleString()}</strong>, working hours of{' '}
              <strong>{showAcceptConfirm.workingHours}</strong>, and specified rest days.
            </p>

            <label className="mt-4 flex items-start gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptAgreed}
                onChange={(e) => setAcceptAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-700 font-medium">
                I, <strong>{worker.fullName}</strong>, confirm my consent to these terms and request the employer to activate the agreement.
              </span>
            </label>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowAcceptConfirm(null);
                  setAcceptAgreed(false);
                }}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                disabled={!acceptAgreed}
                onClick={handleAcceptSubmit}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm flex items-center gap-1.5"
              >
                <Check size={14} />
                <span>Confirm Mutual Acceptance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Changes Modal */}
      {showChangeRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 text-blue-700 p-2.5">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Request Agreement Revisions
                </h3>
                <p className="text-slate-500 text-xs">For {showChangeRequestModal.referenceNumber}</p>
              </div>
            </div>

            <p className="mt-3 text-slate-600 leading-relaxed">
              Describe what terms you would like adjusted (e.g. salary rate, daily hours, rest days, or start date). Your employer will receive this note to update the draft.
            </p>

            <form onSubmit={handleChangeRequestSubmit} className="mt-4 space-y-4">
              <textarea
                value={changeNote}
                onChange={(e) => setChangeNote(e.target.value)}
                placeholder="e.g. Could we adjust the rest day to Sunday only, or clarify daily overtime compensation?"
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-blue-600 focus:outline-hidden"
                required
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowChangeRequestModal(null)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition shadow-sm flex items-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  <span>Send Revision Request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};