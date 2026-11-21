import React, { useState } from 'react';
import {
  ShieldCheck,
  Printer,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileText,
  AlertCircle,
  Building2,
  User,
  Scale,
  Languages,
} from 'lucide-react';
import { EmploymentAgreement } from '../../types/platform';

interface AgreementDocumentPreviewProps {
  agreement: EmploymentAgreement;
  onClose?: () => void;
  showActions?: boolean;
  actionButtons?: React.ReactNode;
  userRole?: 'worker' | 'employer';
  onAccept?: () => void;
  onRequestChanges?: () => void;
  onConfirmActivation?: () => void;
}

export const AgreementDocumentPreview: React.FC<AgreementDocumentPreviewProps> = ({
  agreement,
  onClose,
  showActions = true,
  actionButtons,
  userRole,
  onAccept,
  onRequestChanges,
  onConfirmActivation,
}) => {
  const [docLanguage, setDocLanguage] = useState<'both' | 'en' | 'am'>('both');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Document Controls (Hidden when printing) */}
      <div className="print:hidden flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 text-white p-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold">
            Formal Document View • Ref: {agreement.referenceNumber} (v{agreement.version})
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Toggle for Agreement */}
          <div className="flex items-center rounded-xl bg-slate-800 p-1 text-xs font-bold border border-slate-700">
            <button
              onClick={() => setDocLanguage('both')}
              className={`rounded-lg px-2.5 py-1 transition ${
                docLanguage === 'both' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Bilingual (EN/አማ)
            </button>
            <button
              onClick={() => setDocLanguage('en')}
              className={`rounded-lg px-2.5 py-1 transition ${
                docLanguage === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setDocLanguage('am')}
              className={`rounded-lg px-2.5 py-1 transition ${
                docLanguage === 'am' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              አማርኛ
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 transition"
          >
            <Printer size={14} />
            <span>Print / Save PDF</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Formal Document Sheet */}
      <div className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-12 shadow-xl print:shadow-none print:border-none print:p-0 max-w-4xl mx-auto text-slate-900 font-sans">
        {/* Document Header with AMANA Seal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <ShieldCheck size={28} />
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight font-display text-slate-900">
                AMANA
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                Worker Protection & Employment Platform • Ethiopia
              </div>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-mono font-bold text-slate-800 border border-slate-200">
              {agreement.referenceNumber}
            </span>
            <div className="text-[11px] text-slate-500 mt-1">
              Document Version: <strong>v{agreement.version}.0</strong>
            </div>
            <div className="text-[11px] text-slate-500">
              Date Generated: {new Date(agreement.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="py-6 text-center border-b border-slate-200">
          {(docLanguage === 'both' || docLanguage === 'en') && (
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              STANDARD DOMESTIC & SERVICE EMPLOYMENT AGREEMENT
            </h2>
          )}
          {(docLanguage === 'both' || docLanguage === 'am') && (
            <h3 className="text-lg sm:text-xl font-black text-emerald-800 font-display mt-1">
              መደበኛ የቤት ውስጥና የአገልግሎት ሥራ ስምምነት ውል
            </h3>
          )}
          <p className="mt-2 text-xs text-slate-500 max-w-lg mx-auto">
            Governed by principles of mutual respect, fair compensation, safe workplace standards, and written transparency.
          </p>
        </div>

        {/* Section 1: Contracting Parties */}
        <div className="py-6 border-b border-slate-200 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            1. Contracting Parties / ተዋዋይ ወገኖች
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employer Block */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <Building2 size={15} className="text-emerald-700" />
                <span>The Employer / አሰሪ ወገን</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{agreement.employerName}</div>
              <div className="text-xs text-slate-600 mt-1">Lead Contact: {agreement.employerContact}</div>
              <div className="text-xs text-slate-500 mt-0.5">Location: {agreement.employerLocation}</div>
              <div className="text-xs text-slate-500 mt-0.5">Phone: {agreement.employerPhone}</div>
            </div>

            {/* Worker Block */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                <User size={15} className="text-emerald-700" />
                <span>The Worker / ሠራተኛ ወገን</span>
              </div>
              <div className="text-sm font-bold text-slate-900">{agreement.workerName}</div>
              <div className="text-xs text-slate-600 mt-1">Permanent Residence: {agreement.workerLocation}</div>
              <div className="text-xs text-slate-500 mt-0.5">Phone: {agreement.workerPhone}</div>
              <div className="text-xs text-slate-500 mt-0.5">National ID Status: Verified on AMANA</div>
            </div>
          </div>
        </div>

        {/* Section 2: Scope of Employment & Duties */}
        <div className="py-6 border-b border-slate-200 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            2. Scope of Employment / የሥራው ዘርፍና ዝርዝር ኃላፊነት
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Job Title / የሥራ መደብ</span>
              <strong className="text-slate-900 text-sm font-bold">{agreement.jobTitle}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Sector / ዘርፍ</span>
              <strong className="text-slate-900 text-sm font-bold">{agreement.sector}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Employment Type / የቅጥር ሁኔታ</span>
              <strong className="text-slate-900 text-sm font-bold">{agreement.employmentType}</strong>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-xs font-bold text-slate-700 block mb-1.5">
              Specific Agreed Responsibilities / የተስማሙባቸው ዋና ዋና ተግባራት:
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {agreement.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3: Remuneration & Working Schedule */}
        <div className="py-6 border-b border-slate-200 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            3. Remuneration & Work Schedule / ደመወዝና የሥራ ሰዓት
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200">
              <span className="text-xs font-bold uppercase text-emerald-800 block">
                Agreed Wage / የተወሰነ ደመወዝ
              </span>
              <div className="mt-1 text-2xl font-black text-emerald-800 font-display">
                ETB {agreement.salaryAmount.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold">
                Disbursed {agreement.paymentFrequency}
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-500 block">
                Working Hours / የሥራ ሰዓት
              </span>
              <div className="mt-1 text-sm font-bold text-slate-900">
                {agreement.workingHours}
              </div>
              <span className="text-[11px] text-slate-500">Includes mandatory meal intervals</span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <span className="text-xs font-bold uppercase text-slate-500 block">
                Guaranteed Rest / የእረፍት ቀናት
              </span>
              <div className="mt-1 text-sm font-bold text-teal-800">
                {agreement.restDays}
              </div>
              <span className="text-[11px] text-slate-500">Uninterrupted rest entitlement</span>
            </div>
          </div>
        </div>

        {/* Section 4: Timeline & Additional Terms */}
        <div className="py-6 border-b border-slate-200 space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            4. Duration & Additional Provisions / የውሉ ቆይታና ተጨማሪ ስምምነቶች
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-slate-400" />
              <span>Effective Start Date: <strong>{agreement.startDate}</strong></span>
            </div>
            {agreement.endDate && (
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-slate-400" />
                <span>End Date / Renewal: <strong>{agreement.endDate}</strong></span>
              </div>
            )}
          </div>

          {agreement.additionalTerms && (
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 mt-2 text-xs leading-relaxed text-slate-700">
              <strong className="block text-slate-900 mb-1">Additional Mutually Agreed Terms:</strong>
              {agreement.additionalTerms}
            </div>
          )}
        </div>

        {/* Section 5: Legal & Protection Guarantee Notice */}
        <div className="py-6 border-b border-slate-200 space-y-3">
          <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-4 text-xs text-amber-900 flex items-start gap-3">
            <Scale size={20} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">AMANA Protection & Confidential Dispute Resolution</span>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                Both parties agree that any disputes, schedule concerns, or payment discrepancies will be raised peacefully through the AMANA platform mediation before external escalation. Wage withholding or arbitrary deductions are strictly prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Acknowledgements & Signatures */}
        <div className="pt-6 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
            5. Mutual Digital Acknowledgements / የሁለቱ ወገኖች ዲጂታል ማረጋገጫ
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Worker Signature Line */}
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center space-y-2">
              <div className="text-xs font-bold text-slate-500">Worker Acknowledgement / የሠራተኛ ፊርማ</div>
              {agreement.workerAcknowledgement?.acknowledged ? (
                <div className="py-2">
                  <div className="text-base font-black text-emerald-700 font-display">
                    {agreement.workerAcknowledgement.acknowledgedBy}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Verified Digital Signature • {new Date(agreement.workerAcknowledgement.timestamp).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-xs font-semibold text-amber-700 bg-amber-50 rounded-xl">
                  Awaiting Worker Review & Acceptance
                </div>
              )}
            </div>

            {/* Employer Signature Line */}
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-5 text-center space-y-2">
              <div className="text-xs font-bold text-slate-500">Employer Acknowledgement / የአሰሪ ፊርማ</div>
              {agreement.employerAcknowledgement?.acknowledged ? (
                <div className="py-2">
                  <div className="text-base font-black text-emerald-700 font-display">
                    {agreement.employerAcknowledgement.acknowledgedBy}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Verified Digital Confirmation • {new Date(agreement.employerAcknowledgement.timestamp).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="py-4 text-xs font-semibold text-slate-500 bg-slate-50 rounded-xl">
                  Awaiting Final Employer Confirmation
                </div>
              )}
            </div>
          </div>

          {/* Prototype disclaimer */}
          <div className="mt-8 text-center text-[11px] text-slate-400 border-t border-slate-100 pt-4">
            AMANA demonstration agreement. Formal legal review and appropriate signing procedures are required before production use.
          </div>
        </div>
      </div>

      {/* Action Buttons bar (bottom) */}
      {showActions && (actionButtons || onAccept || onRequestChanges || onConfirmActivation) && (
        <div className="print:hidden rounded-2xl bg-white p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-end gap-3">
          {actionButtons}
          {onRequestChanges && agreement.status === 'awaiting_worker_review' && (
            <button
              onClick={onRequestChanges}
              className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100"
            >
              Request Changes
            </button>
          )}
          {onAccept && agreement.status === 'awaiting_worker_review' && (
            <button
              onClick={onAccept}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              Accept Agreement Terms
            </button>
          )}
          {onConfirmActivation && agreement.status === 'awaiting_employer_confirmation' && (
            <button
              onClick={onConfirmActivation}
              className="rounded-xl bg-purple-700 px-5 py-2 text-xs font-bold text-white hover:bg-purple-800 shadow-sm"
            >
              Activate Contract & Generate Schedule
            </button>
          )}
        </div>
      )}
    </div>
  );
};
