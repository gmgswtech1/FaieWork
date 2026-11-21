import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  Building2,
  User,
  Calendar,
  Clock,
  MapPin,
  Coins,
  ShieldCheck,
  AlertCircle,
  Check,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import {
  JobApplication,
  EmploymentAgreement,
  JobSector,
  PaymentFrequency,
  EmploymentType,
} from '../../types/platform';

interface AgreementFormModalProps {
  application: JobApplication;
  existingAgreement?: EmploymentAgreement;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const AgreementFormModal: React.FC<AgreementFormModalProps> = ({
  application,
  existingAgreement,
  onClose,
  onSuccess,
}) => {
  const { createAgreement, updateAgreement, jobs, employer, worker } = usePlatform();

  const relatedJob = jobs.find((j) => j.id === application.jobId);

  // Form states with fallback pre-population from application, job, or profiles
  const [jobTitle, setJobTitle] = useState(
    existingAgreement?.jobTitle || application.jobTitle || relatedJob?.title || 'Household Assistant'
  );
  const [sector, setSector] = useState<JobSector>(
    existingAgreement?.sector || relatedJob?.sector || 'Domestic Work'
  );
  const [salaryAmount, setSalaryAmount] = useState<number>(
    existingAgreement?.salaryAmount || relatedJob?.salaryMin || 8500
  );
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>(
    existingAgreement?.paymentFrequency || relatedJob?.paymentFrequency || 'Monthly'
  );
  const [employmentType, setEmploymentType] = useState<EmploymentType>(
    existingAgreement?.employmentType || relatedJob?.employmentType || 'Full-time'
  );
  const [workingHours, setWorkingHours] = useState(
    existingAgreement?.workingHours || relatedJob?.workingHours || '8:00 AM – 5:00 PM (Mon – Fri)'
  );
  const [restDays, setRestDays] = useState(
    existingAgreement?.restDays || relatedJob?.restDays || 'Saturday & Sunday'
  );
  const [workplaceLocation, setWorkplaceLocation] = useState(
    existingAgreement?.workplaceLocation || relatedJob?.location || employer.location || 'Addis Ababa'
  );
  const [startDate, setStartDate] = useState(
    existingAgreement?.startDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(existingAgreement?.endDate || '');
  const [responsibilitiesText, setResponsibilitiesText] = useState(
    existingAgreement?.responsibilities.join('\n') ||
      relatedJob?.responsibilities.join('\n') ||
      'Maintain clean and safe workplace\nPerform designated duties with care\nObserve mutual house safety rules'
  );
  const [additionalTerms, setAdditionalTerms] = useState(
    existingAgreement?.additionalTerms ||
      'Includes standard 30-minute lunch break, medical emergency contingency allowance, and mutual 2-week notice period.'
  );

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim()) {
      setFormError('Job title is required.');
      return;
    }
    if (salaryAmount <= 0) {
      setFormError('Salary amount must be a positive number in ETB.');
      return;
    }
    if (!startDate) {
      setFormError('Start date is required.');
      return;
    }

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    if (responsibilities.length === 0) {
      setFormError('Please provide at least one job responsibility.');
      return;
    }

    if (existingAgreement) {
      // Update existing
      updateAgreement(existingAgreement.id, {
        jobTitle,
        sector,
        salaryAmount,
        paymentFrequency,
        employmentType,
        workingHours,
        restDays,
        workplaceLocation,
        startDate,
        endDate: endDate.trim() || undefined,
        responsibilities,
        additionalTerms: additionalTerms.trim() || undefined,
      });
      onSuccess(`Agreement ${existingAgreement.referenceNumber} terms updated to version ${existingAgreement.version + 1}!`);
      onClose();
    } else {
      // Create new agreement
      const res = createAgreement({
        applicationId: application.id,
        jobId: application.jobId,
        jobTitle,
        sector,
        workerId: application.workerId,
        workerName: application.workerName,
        workerPhone: application.workerPhone || worker.phone,
        workerEmail: worker.email,
        workerLocation: application.workerLocation || worker.location,
        workplaceLocation,
        salaryAmount,
        paymentFrequency,
        employmentType,
        workingHours,
        restDays,
        responsibilities,
        startDate,
        endDate: endDate.trim() || undefined,
        additionalTerms: additionalTerms.trim() || undefined,
      });

      if (res.success) {
        onSuccess(res.message);
        onClose();
      } else {
        setFormError(res.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#092e22] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
              <FileCheck2 size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">
                {existingAgreement ? 'Edit Employment Agreement' : 'Prepare Digital Employment Agreement'}
              </h2>
              <p className="text-xs text-emerald-300">
                Pre-populated from accepted candidate application • Ethiopian Birr (ETB)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-emerald-300 hover:bg-emerald-900/60 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-900 text-xs sm:text-sm">
          {formError && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 flex items-center gap-3 text-rose-800 text-xs">
              <AlertCircle size={18} className="shrink-0 text-rose-600" />
              <span>{formError}</span>
            </div>
          )}

          {/* Parties Overview Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100 text-xs">
            <div className="flex items-start gap-3">
              <Building2 className="text-emerald-700 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-bold text-slate-900 block">Employer (Issuing Party)</span>
                <span className="text-slate-700 font-medium">{employer.companyName}</span>
                <span className="text-slate-500 block text-[11px]">{employer.contactPerson} • {employer.phone}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="text-emerald-700 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-bold text-slate-900 block">Worker (Candidate)</span>
                <span className="text-slate-700 font-medium">{application.workerName}</span>
                <span className="text-slate-500 block text-[11px]">{application.workerPhone} • {application.workerLocation}</span>
              </div>
            </div>
          </div>

          {/* Terms Section 1: Role & Location */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              1. Position & Workplace Terms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contract Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Employment Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value as JobSector)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Domestic Work">Domestic Work</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Retail & Sales">Retail & Sales</option>
                  <option value="Construction">Construction</option>
                  <option value="Office & Admin">Office & Admin</option>
                  <option value="Delivery & Logistics">Delivery & Logistics</option>
                  <option value="Other Services">Other Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Employment Arrangement</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Live-in">Live-in</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Workplace Location</label>
                <input
                  type="text"
                  value={workplaceLocation}
                  onChange={(e) => setWorkplaceLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  placeholder="e.g. Addis Ababa (Bole Atlas)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Terms Section 2: Compensation & Hours */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              2. Compensation, Hours & Rest Schedule
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Agreed Base Salary (ETB)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">ETB</span>
                  <input
                    type="number"
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(Number(e.target.value))}
                    min={1000}
                    step={100}
                    className="w-full pl-12 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold focus:border-emerald-600 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Frequency</label>
                <select
                  value={paymentFrequency}
                  onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Daily Working Hours</label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  placeholder="e.g. 8:00 AM – 5:00 PM (Mon – Fri)"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Guaranteed Rest Days</label>
                <input
                  type="text"
                  value={restDays}
                  onChange={(e) => setRestDays(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  placeholder="e.g. Saturday & Sunday"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contract Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Expected End Date (Optional)
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Terms Section 3: Duties & Clauses */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1">
              3. Scope of Responsibilities & Additional Terms
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Designated Responsibilities (one per line)
              </label>
              <textarea
                value={responsibilitiesText}
                onChange={(e) => setResponsibilitiesText(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-hidden font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Additional Mutually Agreed Terms & Protective Clauses
              </label>
              <textarea
                value={additionalTerms}
                onChange={(e) => setAdditionalTerms(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Legal Notice */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-3 text-amber-900 text-[11px]">
            <ShieldCheck size={18} className="shrink-0 text-amber-600 mt-0.5" />
            <p className="leading-snug">
              <strong>AMANA Fair Labor Notice:</strong> Upon generation, this draft agreement is submitted to the worker for review. Mutual digital acknowledgements are required before the agreement becomes formally active.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm flex items-center gap-2"
            >
              <Check size={16} />
              <span>{existingAgreement ? 'Save & Increment Version' : 'Generate & Draft Agreement'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};