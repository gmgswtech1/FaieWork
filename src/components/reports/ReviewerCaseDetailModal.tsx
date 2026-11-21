import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  User,
  Calendar,
  Clock,
  FileText,
  Paperclip,
  Lock,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Eye,
  Send,
  Plus,
  ArrowRight,
  ShieldAlert,
  Archive,
  RefreshCw,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Complaint, ComplaintStatus } from '../../types/platform';

interface ReviewerCaseDetailModalProps {
  complaint: Complaint;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const ReviewerCaseDetailModal: React.FC<ReviewerCaseDetailModalProps> = ({
  complaint,
  onClose,
  onShowToast,
}) => {
  const {
    updateCaseStatus,
    addInternalReviewNote,
    addWorkerVisibleUpdate,
    requestAdditionalInformation,
    referCaseForSupport,
    resolveCase,
    closeCase,
  } = usePlatform();

  // Internal Note Input
  const [internalNoteText, setInternalNoteText] = useState('');
  // Worker-visible Update Input
  const [workerUpdateTitle, setWorkerUpdateTitle] = useState('');
  const [workerUpdateMsg, setWorkerUpdateMsg] = useState('');

  // Action Modals State
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [requestInfoPrompt, setRequestInfoPrompt] = useState('');

  const [showReferModal, setShowReferModal] = useState(false);
  const [referralOrg, setReferralOrg] = useState('Ethiopian Labor Law Legal Clinic');
  const [referralNotes, setReferralNotes] = useState('');

  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionSummary, setResolutionSummary] = useState('');

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [closeReason, setCloseReason] = useState('');

  const handleAddInternalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNoteText.trim()) return;
    const res = addInternalReviewNote(complaint.id, internalNoteText.trim());
    if (res.success) {
      onShowToast?.(res.message);
      setInternalNoteText('');
    }
  };

  const handleAddWorkerUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerUpdateMsg.trim()) return;
    const res = addWorkerVisibleUpdate(
      complaint.id,
      workerUpdateTitle.trim() || 'Case Progress Update',
      workerUpdateMsg.trim()
    );
    if (res.success) {
      onShowToast?.(res.message);
      setWorkerUpdateTitle('');
      setWorkerUpdateMsg('');
    }
  };

  const handleStatusChangeToUnderReview = () => {
    updateCaseStatus(complaint.id, 'under_review', 'Reviewer opened intake investigation.');
    onShowToast?.(`Case ${complaint.caseReference} marked Under Review.`);
  };

  const handleRequestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestInfoPrompt.trim()) return;
    const res = requestAdditionalInformation(complaint.id, requestInfoPrompt.trim());
    if (res.success) {
      onShowToast?.(res.message);
      setShowRequestInfoModal(false);
      setRequestInfoPrompt('');
    }
  };

  const handleReferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = referCaseForSupport(complaint.id, referralOrg, referralNotes.trim());
    if (res.success) {
      onShowToast?.(res.message);
      setShowReferModal(false);
      setReferralNotes('');
    }
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolutionSummary.trim()) return;
    const res = resolveCase(complaint.id, resolutionSummary.trim());
    if (res.success) {
      onShowToast?.(res.message);
      setShowResolveModal(false);
      setResolutionSummary('');
    }
  };

  const handleCloseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = closeCase(complaint.id, closeReason.trim() || undefined);
    if (res.success) {
      onShowToast?.(res.message);
      setShowCloseModal(false);
      setCloseReason('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="px-6 py-4 bg-[#092e22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {complaint.caseReference}
                </span>
                <span className="text-emerald-400">•</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {complaint.categoryLabel}
                </span>
                <span className="rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 text-[10px] font-mono">
                  DEMO REVIEWER ACCESS
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                Case Management & Investigation Dossier
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">Current Status:</span>
            <span className="font-black capitalize px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs">
              {complaint.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {complaint.status === 'submitted' && (
              <button
                onClick={handleStatusChangeToUnderReview}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 font-bold transition shadow-2xs flex items-center gap-1.5"
              >
                <Clock size={13} />
                <span>Mark Under Review</span>
              </button>
            )}

            {complaint.status !== 'additional_info_required' && complaint.status !== 'resolved' && (
              <button
                onClick={() => setShowRequestInfoModal(true)}
                className="rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3 py-1.5 font-bold transition flex items-center gap-1.5"
              >
                <AlertCircle size={13} className="text-amber-600" />
                <span>Request Additional Info</span>
              </button>
            )}

            {complaint.status !== 'referred_for_support' && complaint.status !== 'resolved' && (
              <button
                onClick={() => setShowReferModal(true)}
                className="rounded-xl border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-900 px-3 py-1.5 font-bold transition flex items-center gap-1.5"
              >
                <HelpCircle size={13} className="text-purple-600" />
                <span>Refer for Support</span>
              </button>
            )}

            {complaint.status !== 'resolved' && (
              <button
                onClick={() => setShowResolveModal(true)}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 font-bold transition shadow-2xs flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} />
                <span>Resolve Case</span>
              </button>
            )}

            {complaint.status !== 'closed' && (
              <button
                onClick={() => setShowCloseModal(true)}
                className="rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 px-3 py-1.5 font-bold transition"
              >
                Close Case
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Parties Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Complainant Card (Confidential to Reviewer) */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <User size={14} className="text-emerald-700" />
                  Complainant (Worker)
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full">
                  Confidential Identity
                </span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-slate-900 text-sm block">{complaint.workerName}</span>
                <div className="text-slate-600 text-[11px] space-y-0.5 mt-1">
                  <div>Phone: <strong className="text-slate-800">{complaint.workerPhone}</strong></div>
                  <div>Email: <strong className="text-slate-800">{complaint.workerEmail}</strong></div>
                  <div>Worker ID: <span className="font-mono text-slate-500">{complaint.workerId}</span></div>
                </div>
              </div>
            </div>

            {/* Respondent / Employment Context */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Building2 size={14} className="text-emerald-700" />
                  Subject Employer / Agreement
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                  Context Record
                </span>
              </div>
              <div className="pt-1">
                <span className="font-bold text-slate-900 text-sm block">
                  {complaint.relatedEmployerName || 'Unspecified Employer'}
                </span>
                <div className="text-slate-600 text-[11px] space-y-0.5 mt-1">
                  {complaint.relatedAgreementRef && (
                    <div>Contract Ref: <strong className="font-mono text-emerald-800">{complaint.relatedAgreementRef}</strong></div>
                  )}
                  {complaint.relatedJobTitle && (
                    <div>Job Position: <strong className="text-slate-800">{complaint.relatedJobTitle}</strong></div>
                  )}
                  <div>Incident Date: <strong className="text-slate-800">{complaint.incidentDate}</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Allegation Description & Evidence Attachments */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-emerald-700" />
                Submitted Allegation Narrative
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Filed: {new Date(complaint.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 italic">
              "{complaint.description}"
            </p>

            {complaint.optionalAdditionalInfo && (
              <div className="text-xs text-slate-600 pt-1">
                <strong className="text-slate-700 block text-[11px]">Worker Supplementary Remarks:</strong>
                <p className="mt-0.5">{complaint.optionalAdditionalInfo}</p>
              </div>
            )}

            {/* Attachments */}
            {complaint.attachments.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700 block text-[11px] mb-1.5">
                  Simulated File Attachments:
                </span>
                <div className="flex flex-wrap gap-2">
                  {complaint.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="rounded-xl bg-slate-100 px-3 py-1.5 border border-slate-200 flex items-center gap-2 text-xs"
                    >
                      <Paperclip size={13} className="text-emerald-600" />
                      <span className="font-bold text-slate-800">{att.fileName}</span>
                      <span className="text-[10px] text-slate-400">
                        ({att.fileSizeFormatted} • {att.fileType})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Worker Clarification Responses (if any) */}
          {complaint.additionalInfoResponses.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 space-y-2.5">
              <span className="text-xs font-bold text-amber-900 block uppercase tracking-wider">
                Clarification Responses from Worker ({complaint.additionalInfoResponses.length})
              </span>
              {complaint.additionalInfoResponses.map((r) => (
                <div key={r.id} className="bg-white p-3 rounded-xl border border-amber-100 text-xs space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-800">{r.workerName}</span>
                    <span>{new Date(r.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-800">{r.response}</p>
                  {r.attachmentName && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-mono">
                      <Paperclip size={11} />
                      {r.attachmentName}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CRITICAL PRIVACY ARCHITECTURE: TWO DISTINCT CONTENT COLUMNS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Panel A: Internal Reviewer Notes (STRICTLY CONFIDENTIAL) */}
            <div className="rounded-2xl border border-amber-300 bg-amber-50/30 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock size={14} className="text-amber-700" />
                  Internal Reviewer Notes
                </span>
                <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                  CONFIDENTIAL TO REVIEWERS
                </span>
              </div>
              <p className="text-[11px] text-amber-800">
                Notes written here are <u>never</u> displayed to the worker or employer. Used for internal handling and legal cross-checks.
              </p>

              {/* Note Submission Form */}
              <form onSubmit={handleAddInternalNote} className="space-y-2">
                <textarea
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="Record confidential review observation, agreement cross-check, or action plan..."
                  rows={2}
                  className="w-full rounded-xl border border-amber-300 bg-white p-2.5 text-xs focus:border-amber-600 focus:outline-hidden"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-700 hover:bg-amber-800 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1"
                  >
                    <Plus size={13} />
                    <span>Save Internal Note</span>
                  </button>
                </div>
              </form>

              {/* Notes Stream */}
              <div className="space-y-2 pt-2 border-t border-amber-200/60 max-h-48 overflow-y-auto">
                {complaint.internalReviewNotes.length === 0 ? (
                  <p className="text-[11px] text-slate-400 italic">No internal notes logged yet.</p>
                ) : (
                  complaint.internalReviewNotes.map((n) => (
                    <div key={n.id} className="bg-white p-2.5 rounded-xl border border-amber-200 text-xs space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <strong className="text-amber-900">{n.reviewerName}</strong>
                        <span>{new Date(n.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-800">{n.note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Panel B: Worker-Visible Updates (COMMUNICATED TO WORKER) */}
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/30 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Send size={14} className="text-emerald-700" />
                  Worker-Visible Updates
                </span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  VISIBLE TO WORKER
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Official status progress messages sent directly to the worker's "My Reports" timeline.
              </p>

              {/* Worker Update Form */}
              <form onSubmit={handleAddWorkerUpdate} className="space-y-2">
                <input
                  type="text"
                  value={workerUpdateTitle}
                  onChange={(e) => setWorkerUpdateTitle(e.target.value)}
                  placeholder="Update Title (e.g. Agreement Audit Completed)"
                  className="w-full rounded-xl border border-emerald-300 bg-white px-2.5 py-1.5 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <textarea
                  value={workerUpdateMsg}
                  onChange={(e) => setWorkerUpdateMsg(e.target.value)}
                  placeholder="Official message to worker regarding case steps..."
                  rows={2}
                  className="w-full rounded-xl border border-emerald-300 bg-white p-2.5 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1"
                  >
                    <Send size={13} />
                    <span>Post Worker Update</span>
                  </button>
                </div>
              </form>

              {/* Updates Stream */}
              <div className="space-y-2 pt-2 border-t border-emerald-200/60 max-h-48 overflow-y-auto">
                {complaint.workerVisibleUpdates.map((wup) => (
                  <div key={wup.id} className="bg-white p-2.5 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <strong className="text-emerald-900">{wup.title}</strong>
                      <span>{new Date(wup.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-800">{wup.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Complete Case Audit History (Reviewer View) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Complete Case Activity & Audit History (Reviewer Access)
            </span>

            <div className="relative border-l-2 border-emerald-300 ml-3 pl-4 space-y-3.5 text-xs">
              {complaint.history.map((evt) => (
                <div key={evt.id} className="relative">
                  <div
                    className={`absolute -left-[23px] top-1 h-3 w-3 rounded-full border-2 border-white ${
                      evt.isInternalOnly ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                  />
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{evt.title}</span>
                      {evt.isInternalOnly && (
                        <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                          INTERNAL ONLY
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[10px]">
                      {new Date(evt.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
          >
            Close Dossier
          </button>
        </div>
      </div>

      {/* Action Sub-Modals */}
      {/* 1. Request Additional Info Modal */}
      {showRequestInfoModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <h3 className="text-base font-bold text-slate-900 font-display">Request Additional Information</h3>
            <p className="text-xs text-slate-500 mt-1">
              Ask the worker to supply necessary details or photos. Case status will transition to "Additional Information Required".
            </p>
            <form onSubmit={handleRequestInfoSubmit} className="mt-4 space-y-4">
              <textarea
                value={requestInfoPrompt}
                onChange={(e) => setRequestInfoPrompt(e.target.value)}
                placeholder="e.g. Please clarify if the partial wage was received via Telebirr or cash, and provide the approximate transaction date."
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-amber-600 focus:outline-hidden"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestInfoModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white hover:bg-amber-700"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Refer for Support Modal */}
      {showReferModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <h3 className="text-base font-bold text-slate-900 font-display">Refer Case for External Support</h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect this case with an institutional labor support provider or legal mediation partner.
            </p>
            <form onSubmit={handleReferSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Partner Organization</label>
                <select
                  value={referralOrg}
                  onChange={(e) => setReferralOrg(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs"
                >
                  <option value="Ethiopian Labor Law Legal Clinic">Ethiopian Labor Law Legal Clinic</option>
                  <option value="Women in Informal Employment Coalition">Women in Informal Employment Coalition</option>
                  <option value="Confederation of Ethiopian Trade Unions (CETU)">Confederation of Ethiopian Trade Unions (CETU)</option>
                  <option value="Ministry of Labor & Skills Community Desk">Ministry of Labor & Skills Community Desk</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Referral Instructions / Notes</label>
                <textarea
                  value={referralNotes}
                  onChange={(e) => setReferralNotes(e.target.value)}
                  placeholder="Notes for the referral partner..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReferModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-5 py-2 text-xs font-bold text-white hover:bg-purple-700"
                >
                  Confirm Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Resolve Case Modal */}
      {showResolveModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <h3 className="text-base font-bold text-slate-900 font-display">Conclude & Resolve Case</h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide a clear summary of the resolution reached (e.g. wage balance settled, contract adjusted, or mutual understanding signed).
            </p>
            <form onSubmit={handleResolveSubmit} className="mt-4 space-y-4">
              <textarea
                value={resolutionSummary}
                onChange={(e) => setResolutionSummary(e.target.value)}
                placeholder="e.g. Employer processed the outstanding wage balance. Both parties confirmed settlement."
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-hidden"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Mark Case Resolved
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Close Case Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-xs sm:text-sm">
            <h3 className="text-base font-bold text-slate-900 font-display">Close Case</h3>
            <p className="text-xs text-slate-500 mt-1">
              Formally close this case record.
            </p>
            <form onSubmit={handleCloseSubmit} className="mt-4 space-y-4">
              <textarea
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                placeholder="Reason for closure (e.g. duplicate filing, complainant withdrew, or concluded)..."
                rows={3}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCloseModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-bold text-white hover:bg-slate-900"
                >
                  Close Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};