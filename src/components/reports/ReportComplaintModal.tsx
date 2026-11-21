import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Upload,
  FileText,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Building2,
  FileCheck2,
  Info,
  Paperclip,
  Check,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ComplaintCategory, Complaint } from '../../types/platform';

interface ReportComplaintModalProps {
  onClose: () => void;
  onSuccess: (complaint: Complaint) => void;
}

const COMPLAINT_CATEGORIES: { id: ComplaintCategory; label: string; desc: string }[] = [
  {
    id: 'unpaid_wages',
    label: 'Unpaid Wages',
    desc: 'Unpaid salary, unauthorized deductions, delayed payment, or withheld compensation.',
  },
  {
    id: 'workplace_harassment',
    label: 'Workplace Harassment',
    desc: 'Verbal abuse, unwanted conduct, inappropriate advances, or discriminatory behavior.',
  },
  {
    id: 'threats_intimidation',
    label: 'Threats or Intimidation',
    desc: 'Threats of termination, deportation, physical harm, or confiscation of identity documents.',
  },
  {
    id: 'contract_violations',
    label: 'Contract Violations',
    desc: 'Breach of agreed hours, denial of rest days, excessive unpaid overtime, or altered duties.',
  },
  {
    id: 'unfair_treatment',
    label: 'Unfair Treatment',
    desc: 'Unjust disciplinary actions, unequal treatment, or denial of basic contractual provisions.',
  },
  {
    id: 'unsafe_working_conditions',
    label: 'Unsafe Working Conditions',
    desc: 'Hazardous chemicals without gear, lack of hygiene, structural dangers, or extreme strain.',
  },
  {
    id: 'other',
    label: 'Other Workplace Concerns',
    desc: 'Any other labor grievance, dispute, or welfare concern not categorized above.',
  },
];

export const ReportComplaintModal: React.FC<ReportComplaintModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const { agreements, worker, submitComplaint } = usePlatform();

  const myAgreements = agreements.filter((a) => a.workerId === worker.id);

  // Form State
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');
  const [category, setCategory] = useState<ComplaintCategory>('unpaid_wages');
  const [relatedAgreementId, setRelatedAgreementId] = useState<string>(myAgreements[0]?.id || '');
  const [customEmployerName, setCustomEmployerName] = useState<string>('');
  const [incidentDate, setIncidentDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [description, setDescription] = useState<string>('');
  const [optionalAdditionalInfo, setOptionalAdditionalInfo] = useState<string>('');

  // Simulated Evidence Attachment
  const [simulatedFile, setSimulatedFile] = useState<{
    fileName: string;
    fileType: string;
    fileSizeFormatted: string;
  } | null>(null);

  const [formError, setFormError] = useState<string | null>(null);
  const [createdComplaint, setCreatedComplaint] = useState<Complaint | null>(null);

  const selectedCategoryObj = COMPLAINT_CATEGORIES.find((c) => c.id === category)!;
  const selectedAgreement = myAgreements.find((a) => a.id === relatedAgreementId);

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file extension
      const ext = file.name.split('.').pop()?.toLowerCase();
      const allowedExts = ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'txt'];
      if (!ext || !allowedExts.includes(ext)) {
        setFormError('Only PDF, PNG, JPG, or DOCX documents are supported in this demonstration.');
        return;
      }

      // Format size
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const sizeFormatted = file.size > 1024 * 1024 ? `${sizeMB} MB` : `${Math.round(file.size / 1024)} KB`;

      setSimulatedFile({
        fileName: file.name,
        fileType: file.type || `application/${ext}`,
        fileSizeFormatted: sizeFormatted,
      });
      setFormError(null);
    }
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || description.trim().length < 15) {
      setFormError('Please provide a descriptive account of your concern (minimum 15 characters).');
      return;
    }
    if (!incidentDate) {
      setFormError('Please select the incident date.');
      return;
    }
    setFormError(null);
    setStep('review');
  };

  const handleFinalSubmit = () => {
    const employerName = selectedAgreement ? selectedAgreement.employerName : customEmployerName.trim() || undefined;
    const employerId = selectedAgreement ? selectedAgreement.employerId : undefined;
    const agreementRef = selectedAgreement ? selectedAgreement.referenceNumber : undefined;
    const jobTitle = selectedAgreement ? selectedAgreement.jobTitle : undefined;

    const res = submitComplaint({
      category,
      categoryLabel: selectedCategoryObj.label,
      relatedEmployerId: employerId,
      relatedEmployerName: employerName,
      relatedAgreementId: selectedAgreement?.id,
      relatedAgreementRef: agreementRef,
      relatedJobTitle: jobTitle,
      incidentDate,
      description: description.trim(),
      optionalAdditionalInfo: optionalAdditionalInfo.trim() || undefined,
      attachment: simulatedFile || undefined,
    });

    if (res.success && res.complaint) {
      setCreatedComplaint(res.complaint);
      setStep('success');
      onSuccess(res.complaint);
    } else {
      setFormError(res.message);
      setStep('form');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#092e22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500 text-white font-bold shadow-md">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-white">
                Submit Confidential Workplace Concern
              </h2>
              <p className="text-xs text-emerald-300">
                Safe, non-retaliation reporting • Protected by AMANA Review Team
              </p>
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Critical Privacy Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-start gap-2.5 text-[11px] text-amber-900">
          <Lock size={14} className="shrink-0 text-amber-700 mt-0.5" />
          <p className="leading-snug">
            <strong>Confidentiality Notice:</strong> Your report is submitted exclusively to the neutral AMANA Case Review Team. Employers <u>cannot</u> see your report, personal allegations, or attached evidence.
          </p>
        </div>

        {/* Demo Only Disclaimer */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-1.5 text-[10px] text-slate-500 flex items-center gap-1.5">
          <Info size={12} className="text-slate-400" />
          <span>DEMO ONLY — Do not enter real personal secrets or emergency calls. AMANA is not an emergency 911/police dispatch service.</span>
        </div>

        {/* Step 1: Form Entry */}
        {step === 'form' && (
          <form onSubmit={handleProceedToReview} className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-900 text-xs sm:text-sm">
            {formError && (
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle size={16} className="text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                1. Select Concern Category <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMPLAINT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`text-left p-3 rounded-2xl border transition text-xs ${
                      category === cat.id
                        ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{cat.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">{cat.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Employment Context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Related Employment Agreement (Optional)
                </label>
                {myAgreements.length > 0 ? (
                  <select
                    value={relatedAgreementId}
                    onChange={(e) => setRelatedAgreementId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  >
                    <option value="">None / Not listed</option>
                    {myAgreements.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.jobTitle} ({a.employerName} • {a.referenceNumber})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={customEmployerName}
                    onChange={(e) => setCustomEmployerName(e.target.value)}
                    placeholder="e.g. Household or Employer name"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  />
                )}
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Linking an agreement helps reviewers look up payment schedules.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Incident or Observation Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-800">
                  Description of Concern <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] text-slate-400">
                  {description.length} chars (min 15)
                </span>
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe clearly what happened, who was involved, and what dates or amounts are in dispute. Fictional details only in this demo."
                rows={4}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-hidden"
                required
              />
            </div>

            {/* Optional Additional Info */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Additional Clarifications / Steps Already Taken (Optional)
              </label>
              <textarea
                value={optionalAdditionalInfo}
                onChange={(e) => setOptionalAdditionalInfo(e.target.value)}
                placeholder="e.g. Have you already spoken with the employer? Are there witnesses or previous agreements?"
                rows={2}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Simulated Evidence Upload */}
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 bg-slate-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Attach Evidence / Documentation (Simulated)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Screenshots, SMS messages, contract photos, or bank statements (PDF, PNG, JPG).
                  </span>
                </div>
                <label className="cursor-pointer rounded-xl bg-white border border-slate-300 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs">
                  <Upload size={14} />
                  <span>Choose File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg,.docx,.txt"
                    onChange={handleSimulateUpload}
                  />
                </label>
              </div>

              {simulatedFile && (
                <div className="mt-3 flex items-center justify-between bg-white rounded-xl p-2.5 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2">
                    <Paperclip size={14} className="text-emerald-600" />
                    <div>
                      <span className="font-bold text-slate-900">{simulatedFile.fileName}</span>
                      <span className="text-[10px] text-slate-400 block">
                        {simulatedFile.fileSizeFormatted} • {simulatedFile.fileType}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Simulated Attachment
                  </span>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
              >
                <span>Review & Confirm Submission</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Review Before Submit */}
        {step === 'review' && (
          <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-900 text-xs sm:text-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Review Report Summary Before Final Submission
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verify that your report details are accurate. A unique case reference will be assigned.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Category:</span>
                <span className="font-bold text-emerald-800">{selectedCategoryObj.label}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Incident Date:</span>
                <span className="font-semibold text-slate-800">{incidentDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">Related Employer:</span>
                <span className="font-semibold text-slate-800">
                  {selectedAgreement ? selectedAgreement.employerName : customEmployerName || 'Unspecified'}
                </span>
              </div>
              {selectedAgreement && (
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Contract Ref:</span>
                  <span className="font-mono text-slate-800">{selectedAgreement.referenceNumber}</span>
                </div>
              )}
              {simulatedFile && (
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Attachment:</span>
                  <span className="font-mono text-emerald-700">{simulatedFile.fileName} ({simulatedFile.fileSizeFormatted})</span>
                </div>
              )}
              <div>
                <span className="text-slate-500 font-medium block mb-1">Report Description:</span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-slate-800 italic leading-relaxed">
                  "{description}"
                </div>
              </div>
            </div>

            {/* Reassurance Checklist */}
            <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-100 space-y-2 text-[11px] text-emerald-950">
              <div className="flex items-center gap-2 font-bold text-emerald-800">
                <ShieldCheck size={16} />
                <span>What happens next:</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Your report is routed to Sara Bekele (Lead Protection Specialist).</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>You can track progress and respond to requests in your "My Reports" tab.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Employers do NOT have access to read this report or your identity.</span>
              </div>
            </div>

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>Back to Edit</span>
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
              >
                <Lock size={14} />
                <span>Submit Confidential Report</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'success' && createdComplaint && (
          <div className="p-8 text-center space-y-5 flex-1">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-sm">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                Report Successfully Registered
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-display mt-1">
                Case {createdComplaint.caseReference}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your report under <strong>{createdComplaint.categoryLabel}</strong> has been assigned to reviewer{' '}
                <strong>{createdComplaint.assignedReviewerName}</strong>. You will receive notifications when the case is reviewed.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 max-w-sm mx-auto text-left text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono font-bold text-slate-900">{createdComplaint.caseReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Initial Status:</span>
                <span className="font-bold text-amber-700">Submitted (Pending Review)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reviewer:</span>
                <span className="font-medium text-slate-800">{createdComplaint.assignedReviewerName}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm"
              >
                View in My Reports
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};