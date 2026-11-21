import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Calendar,
  Clock,
  Building2,
  FileText,
  Paperclip,
  Send,
  AlertCircle,
  CheckCircle2,
  Lock,
  MessageSquare,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Complaint, ComplaintStatus } from '../../types/platform';

interface WorkerCaseDetailModalProps {
  complaint: Complaint;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const WorkerCaseDetailModal: React.FC<WorkerCaseDetailModalProps> = ({
  complaint,
  onClose,
  onShowToast,
}) => {
  const { submitAdditionalInformation } = usePlatform();

  const [additionalResponse, setAdditionalResponse] = useState('');
  const [responseAttachment, setResponseAttachment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
            <Clock size={13} className="text-slate-500" />
            <span>Submitted (Awaiting Review)</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 animate-pulse">
            <Clock size={13} className="text-blue-600" />
            <span>Under Review by Protection Team</span>
          </span>
        );
      case 'additional_info_required':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 animate-bounce">
            <AlertCircle size={13} className="text-amber-600" />
            <span>Action Required: More Details Needed</span>
          </span>
        );
      case 'referred_for_support':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
            <HelpCircle size={13} className="text-purple-600" />
            <span>Referred for Specialized Support</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={13} className="text-emerald-600" />
            <span>Case Review Completed & Concluded</span>
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

  const handleAdditionalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!additionalResponse.trim()) {
      setErrorMessage('Please provide your response text.');
      return;
    }

    setIsSubmitting(true);
    const res = submitAdditionalInformation(
      complaint.id,
      additionalResponse.trim(),
      responseAttachment.trim() || undefined
    );

    setIsSubmitting(false);
    if (res.success) {
      onShowToast?.(res.message);
      setAdditionalResponse('');
      setResponseAttachment('');
      setErrorMessage(null);
    } else {
      setErrorMessage(res.message);
    }
  };

  // FILTERED TIMELINE: Only show public / worker-visible events (NEVER internal reviewer notes!)
  const workerVisibleHistory = complaint.history.filter((evt) => !evt.isInternalOnly);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="px-6 py-4 bg-[#092e22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-300">
                  {complaint.caseReference}
                </span>
                <span className="text-emerald-400">•</span>
                <span className="text-xs font-bold text-white">{complaint.categoryLabel}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                Confidential Case Review
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Privacy Assurance Bar */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900">
            <Lock size={14} className="text-emerald-700 shrink-0" />
            <span>
              <strong>Privacy Active:</strong> Confidential between you and Assigned Reviewer{' '}
              <strong>{complaint.assignedReviewerName}</strong>. Employers cannot access this record.
            </span>
          </div>
          <div className="shrink-0">{getStatusBadge(complaint.status)}</div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          {/* Overview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Submission Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <Calendar size={13} className="text-slate-400" />
                {complaint.createdAt.split('T')[0]}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Incident Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                <Clock size={13} className="text-slate-400" />
                {complaint.incidentDate}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Related Employer</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Building2 size={13} className="text-slate-400" />
                {complaint.relatedEmployerName || 'Unspecified'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Review Officer</span>
              <span className="font-bold text-emerald-800 block mt-0.5">
                {complaint.assignedReviewerName}
              </span>
            </div>
          </div>

          {/* Original Submitted Report (Preserved & Immutable) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText size={14} className="text-emerald-600" />
                Original Submitted Report
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                Immutable Record
              </span>
            </div>
            <p className="text-xs text-slate-800 leading-relaxed italic bg-slate-50/70 p-3 rounded-xl border border-slate-100">
              "{complaint.description}"
            </p>
            {complaint.optionalAdditionalInfo && (
              <div className="pt-2 text-xs text-slate-600">
                <span className="font-bold text-slate-700 block text-[11px]">Additional Context:</span>
                <p className="mt-0.5 text-slate-600">{complaint.optionalAdditionalInfo}</p>
              </div>
            )}

            {/* Attached Evidence Metadata */}
            {complaint.attachments.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700 block text-[11px] mb-1.5">
                  Simulated Evidence Attachments:
                </span>
                <div className="flex flex-wrap gap-2">
                  {complaint.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="rounded-xl bg-slate-100 px-3 py-1.5 border border-slate-200 flex items-center gap-2 text-xs"
                    >
                      <Paperclip size={13} className="text-emerald-600" />
                      <span className="font-bold text-slate-800">{att.fileName}</span>
                      <span className="text-[10px] text-slate-400">({att.fileSizeFormatted})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Required: Additional Information Response Form */}
          {complaint.status === 'additional_info_required' && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-5 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-amber-900">
                    Reviewer Requested Additional Information
                  </h3>
                  <p className="text-xs text-amber-800 mt-1">
                    "{complaint.additionalInfoRequestPrompt || 'Please provide further clarification.'}"
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdditionalInfoSubmit} className="space-y-3 pt-2">
                {errorMessage && (
                  <div className="text-xs text-rose-700 font-bold bg-rose-50 p-2 rounded-lg">
                    {errorMessage}
                  </div>
                )}
                <textarea
                  value={additionalResponse}
                  onChange={(e) => setAdditionalResponse(e.target.value)}
                  placeholder="Type your response or additional clarification here..."
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs bg-white focus:border-amber-600 focus:outline-hidden"
                  required
                />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <input
                    type="text"
                    value={responseAttachment}
                    onChange={(e) => setResponseAttachment(e.target.value)}
                    placeholder="Optional attachment filename (e.g. nov_bank_slip.pdf)"
                    className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs bg-white focus:border-amber-600 focus:outline-hidden sm:w-72"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-amber-600 hover:bg-amber-700 px-4 py-2 text-xs font-bold text-white transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Send size={13} />
                    <span>Submit Clarification</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Past Additional Info Responses by Worker */}
          {complaint.additionalInfoResponses.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Your Submitted Clarifications
              </span>
              {complaint.additionalInfoResponses.map((r) => (
                <div key={r.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-700">{r.workerName}</span>
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

          {/* Worker-Visible Updates Stream (STRICTLY NO INTERNAL NOTES) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={14} className="text-emerald-600" />
              Protection Team Notifications & Updates ({complaint.workerVisibleUpdates.length})
            </span>

            {complaint.workerVisibleUpdates.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No formal updates posted yet.</p>
            ) : (
              <div className="space-y-2.5">
                {complaint.workerVisibleUpdates.map((wup) => (
                  <div
                    key={wup.id}
                    className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3.5 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">{wup.title}</span>
                      <span className="text-[10px] text-emerald-700">
                        {new Date(wup.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-800 leading-relaxed">{wup.message}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Posted by <strong>{wup.authorName}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filtered Public Case Activity Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Case Activity Timeline
            </span>

            <div className="relative border-l-2 border-emerald-200 ml-3 pl-4 space-y-4 text-xs">
              {workerVisibleHistory.map((evt) => (
                <div key={evt.id} className="relative">
                  <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-emerald-600 border-2 border-white" />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-900">{evt.title}</span>
                    <span className="text-slate-400">{new Date(evt.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};