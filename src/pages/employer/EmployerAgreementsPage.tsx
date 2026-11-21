import React, { useState } from 'react';
import {
  FileCheck2,
  Building2,
  User,
  Calendar,
  Coins,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  Plus,
  Send,
  Edit3,
  Check,
  ShieldCheck,
  XCircle,
  FileText,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { EmploymentAgreement, AgreementStatus, JobApplication } from '../../types/platform';
import { AgreementDocumentPreview } from '../../components/agreements/AgreementDocumentPreview';
import { AgreementFormModal } from '../../components/agreements/AgreementFormModal';

interface EmployerAgreementsPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const EmployerAgreementsPage: React.FC<EmployerAgreementsPageProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const {
    agreements,
    applications,
    employer,
    sendAgreementForReview,
    confirmAgreementAsEmployer,
  } = usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'drafts'>('all');
  const [selectedAgreement, setSelectedAgreement] = useState<EmploymentAgreement | null>(null);
  const [editingAgreement, setEditingAgreement] = useState<EmploymentAgreement | null>(null);
  const [createForApp, setCreateForApp] = useState<JobApplication | null>(null);

  const myAgreements = agreements.filter((a) => a.employerId === employer.id);

  // Accepted applications that don't have an active or pending agreement yet
  const acceptedAppsWithoutAgreement = applications.filter((app) => {
    if (app.status !== 'accepted' || app.employerId !== employer.id) return false;
    const hasExisting = myAgreements.some(
      (agr) => agr.applicationId === app.id && agr.status !== 'cancelled' && agr.status !== 'declined'
    );
    return !hasExisting;
  });

  const filteredAgreements = myAgreements.filter((agr) => {
    if (activeFilter === 'pending') {
      return (
        agr.status === 'awaiting_worker_review' ||
        agr.status === 'changes_requested' ||
        agr.status === 'awaiting_employer_confirmation'
      );
    }
    if (activeFilter === 'active') {
      return agr.status === 'active';
    }
    if (activeFilter === 'drafts') {
      return agr.status === 'draft';
    }
    return true;
  });

  const handleSendForReview = (agreementId: string, refNum: string) => {
    sendAgreementForReview(agreementId);
    onShowToast?.(`Agreement ${refNum} sent to worker for digital review!`);
  };

  const handleConfirmActivation = (agreementId: string, refNum: string) => {
    confirmAgreementAsEmployer(agreementId);
    onShowToast?.(`Agreement ${refNum} is now officially active! Salary schedule generated.`);
  };

  const getStatusBadge = (status: AgreementStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Active & Monitored</span>
          </span>
        );
      case 'awaiting_worker_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
            <Clock size={13} className="text-blue-600" />
            <span>Worker Reviewing</span>
          </span>
        );
      case 'changes_requested':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 animate-pulse">
            <AlertCircle size={13} className="text-amber-600" />
            <span>Worker Requested Revisions</span>
          </span>
        );
      case 'awaiting_employer_confirmation':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 animate-bounce">
            <Check size={13} className="text-purple-600" />
            <span>Worker Accepted • Awaiting Your Activation</span>
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <Edit3 size={13} className="text-slate-500" />
            <span>Draft Contract</span>
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
            <span>Employer Contract Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Employment Agreements
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Generate, customize, and formalize digital employment contracts in Ethiopian Birr (ETB). Mutual digital sign-offs establish clear trust and automatic salary schedules.
          </p>
        </div>

        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
          <div className="text-2xl font-black text-white font-mono">{myAgreements.length}</div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Total Agreements
          </div>
          <div className="mt-2 text-[11px] text-emerald-200">
            {myAgreements.filter((a) => a.status === 'active').length} Active •{' '}
            {myAgreements.filter((a) => a.status === 'awaiting_employer_confirmation').length} Ready to Activate
          </div>
        </div>
      </div>

      {/* Notice for Accepted Applications Pending Contract Generation */}
      {acceptedAppsWithoutAgreement.length > 0 && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-xs font-bold text-amber-900">
                {acceptedAppsWithoutAgreement.length} Accepted Candidate{acceptedAppsWithoutAgreement.length > 1 ? 's' : ''} Awaiting Contract
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                You accepted candidate application{acceptedAppsWithoutAgreement.length > 1 ? 's' : ''}. Proceed to prepare standardized employment agreements.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {acceptedAppsWithoutAgreement.map((app) => (
              <button
                key={app.id}
                onClick={() => setCreateForApp(app)}
                className="rounded-xl bg-amber-600 hover:bg-amber-700 px-3.5 py-1.5 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-2xs"
              >
                <Plus size={13} />
                <span>Prepare for {app.workerName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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
            <span>In Review</span>
            {myAgreements.filter((a) => a.status === 'awaiting_employer_confirmation' || a.status === 'awaiting_worker_review').length > 0 && (
              <span className="rounded-full bg-emerald-600 text-white px-1.5 py-0.2 text-[10px]">
                {myAgreements.filter((a) => a.status === 'awaiting_employer_confirmation' || a.status === 'awaiting_worker_review').length}
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
            onClick={() => setActiveFilter('drafts')}
            className={`px-4 py-2 rounded-xl transition ${
              activeFilter === 'drafts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Drafts ({myAgreements.filter((a) => a.status === 'draft').length})
          </button>
        </div>

        <button
          onClick={() => onNavigateTab('salary')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200"
        >
          <Coins size={14} />
          <span>Manage Salary Payments</span>
        </button>
      </div>

      {/* Agreements Cards Grid */}
      {filteredAgreements.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FileText size={40} className="mx-auto text-slate-300 mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Employment Agreements</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            Once you accept an application, you can prepare an agreement here to establish transparent wages and conditions.
          </p>
          <button
            onClick={() => onNavigateTab('applications')}
            className="mt-5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
          >
            View Applications
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAgreements.map((agr) => {
            const isReadyToActivate = agr.status === 'awaiting_employer_confirmation';
            const hasChangeRequest = agr.status === 'changes_requested';
            const isDraft = agr.status === 'draft';

            return (
              <div
                key={agr.id}
                className={`rounded-3xl border bg-white p-5 sm:p-6 transition shadow-xs hover:shadow-md ${
                  isReadyToActivate
                    ? 'border-purple-300 ring-2 ring-purple-100 bg-purple-50/20'
                    : hasChangeRequest
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
                      <span>Inspect Legal Document</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Worker (Employee)</span>
                    <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <User size={13} className="text-slate-400" />
                      {agr.workerName}
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
                    <span className="text-slate-400 block text-[11px]">Working Hours</span>
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

                {/* Revision Request Banner */}
                {hasChangeRequest && agr.workerChangeRequestNote && (
                  <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-900 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 text-amber-600 mt-0.5" />
                      <div>
                        <span className="font-bold">Worker Requested Revisions: </span>
                        <span>"{agr.workerChangeRequestNote}"</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingAgreement(agr)}
                      className="rounded-xl bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-bold text-white shrink-0 flex items-center gap-1"
                    >
                      <Edit3 size={13} />
                      <span>Revise Terms</span>
                    </button>
                  </div>
                )}

                {/* Worker Accepted Notification */}
                {isReadyToActivate && (
                  <div className="mt-4 rounded-2xl bg-purple-50 border border-purple-200 p-3.5 text-xs text-purple-900 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="shrink-0 text-purple-600" />
                      <span>
                        <strong>{agr.workerName}</strong> acknowledged and accepted the agreement terms. Ready for final activation.
                      </span>
                    </div>
                    <button
                      onClick={() => handleConfirmActivation(agr.id, agr.referenceNumber)}
                      className="rounded-xl bg-purple-700 hover:bg-purple-800 px-4 py-2 text-xs font-bold text-white shrink-0 flex items-center gap-1.5 shadow-sm"
                    >
                      <Check size={14} />
                      <span>Activate Contract & Generate Schedule</span>
                    </button>
                  </div>
                )}

                {/* Action Bar */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    Rest: <strong className="text-slate-600">{agr.restDays}</strong> • Workplace: <strong className="text-slate-600">{agr.workplaceLocation}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDraft && (
                      <>
                        <button
                          onClick={() => setEditingAgreement(agr)}
                          className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                        >
                          <Edit3 size={13} />
                          <span>Edit Draft</span>
                        </button>
                        <button
                          onClick={() => handleSendForReview(agr.id, agr.referenceNumber)}
                          className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                        >
                          <Send size={13} />
                          <span>Send for Worker Review</span>
                        </button>
                      </>
                    )}

                    {agr.status === 'active' && (
                      <button
                        onClick={() => onNavigateTab('salary')}
                        className="rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5"
                      >
                        <Coins size={13} />
                        <span>View Active Salary Ledger</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Agreement Inspection Preview */}
      {selectedAgreement && (
        <AgreementDocumentPreview
          agreement={selectedAgreement}
          onClose={() => setSelectedAgreement(null)}
          onConfirmActivation={() => {
            handleConfirmActivation(selectedAgreement.id, selectedAgreement.referenceNumber);
            setSelectedAgreement(null);
          }}
          userRole="employer"
        />
      )}

      {/* Agreement Form Modal (Create from Accepted Application) */}
      {createForApp && (
        <AgreementFormModal
          application={createForApp}
          onClose={() => setCreateForApp(null)}
          onSuccess={(msg) => onShowToast?.(msg)}
        />
      )}

      {/* Agreement Form Modal (Edit Existing) */}
      {editingAgreement && (
        <AgreementFormModal
          application={{
            id: editingAgreement.applicationId,
            jobId: editingAgreement.jobId,
            jobTitle: editingAgreement.jobTitle,
            employerId: editingAgreement.employerId,
            employerName: editingAgreement.employerName,
            workerId: editingAgreement.workerId,
            workerName: editingAgreement.workerName,
            workerPhone: editingAgreement.workerPhone,
            workerLocation: editingAgreement.workerLocation,
            workerSkills: [],
            status: 'accepted',
            createdAt: editingAgreement.createdAt,
            updatedAt: editingAgreement.updatedAt,
          }}
          existingAgreement={editingAgreement}
          onClose={() => setEditingAgreement(null)}
          onSuccess={(msg) => onShowToast?.(msg)}
        />
      )}
    </div>
  );
};