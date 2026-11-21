import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Clock,
  Briefcase,
  Users,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TrustBadge } from '../../components/trust/TrustBadges';
import { FaydaVerificationModal } from '../../components/verification/FaydaVerificationModal';

export const EmployerVerificationPage: React.FC<{
  onShowToast: (msg: string) => void;
  onNavigateTab: (tab: string) => void;
}> = ({ onShowToast, onNavigateTab }) => {
  const { employer, jobs, updateEmployerReviewStatus } = usePlatform();
  const [showFaydaModal, setShowFaydaModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const trust = employer.trust || {
    identityStatus: 'verified_demo',
    identityVerificationCode: 'AMN-DEMO-IDV-0002',
    identityVerifiedAt: '2026-11-08T09:15:00Z',
    identityProvider: 'Fayda National ID (Simulation)',
    profileStatus: 'verified_demo',
    profileReviewedAt: '2026-11-09T11:00:00Z',
    profileReviewedBy: 'Sara Bekele (AMN-REV-04)',
    profileReviewNotes: 'Household identity and physical address in Bole Atlas corroborated.',
    businessRegistrationSimulated: true,
    history: [],
  };

  const employerJobs = jobs.filter((j) => j.employerId === employer.id);

  const handleCopyCode = () => {
    if (trust.identityVerificationCode) {
      navigator.clipboard?.writeText(trust.identityVerificationCode);
      setCopiedCode(true);
      onShowToast(`Verification code ${trust.identityVerificationCode} copied to clipboard!`);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleRequestProfileReview = () => {
    updateEmployerReviewStatus('under_review_demo', 'Employer requested update review for household profile.');
    onShowToast('Employer profile re-verification submitted to AMANA desk (Demo)!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Employer Trust & Verification Center
            </h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
              Demo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build high-trust relationships with skilled workers by verifying your household/business identity.
          </p>
        </div>

        <button
          onClick={() => setShowFaydaModal(true)}
          className="rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className="text-emerald-400" />
          <span>Simulate Representative Fayda eKYC</span>
        </button>
      </div>

      {/* Trust Hero Card */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
                Employer Verified Profile • High Trust Standing
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                {employer.companyName}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Contact: {employer.contactPerson} • {employer.location} ({employer.sector})
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/10 flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                  Simulated ID Hash
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-white">
                  {trust.identityVerificationCode || 'AMN-DEMO-IDV-0002'}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="rounded-xl bg-white/20 p-2 text-white hover:bg-white/30 transition"
                title="Copy verification hash"
              >
                {copiedCode ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-slate-300 mr-1">Public Badges Displayed to Candidates:</span>
            <TrustBadge
              type="identity"
              status={trust.identityStatus}
              verificationCode={trust.identityVerificationCode}
              verifiedAt={trust.identityVerifiedAt}
            />
            <TrustBadge
              type="employer_profile"
              status={trust.profileStatus}
              reviewedBy={trust.profileReviewedBy}
              verifiedAt={trust.profileReviewedAt}
              notes={trust.profileReviewNotes}
            />
          </div>
        </div>
      </div>

      {/* Grid of the 2 Key Verification Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Representative Identity */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Representative Identity (Fayda)
                  </h4>
                  <span className="text-xs text-slate-500">
                    Hiring Lead Identity Verification (Simulated)
                  </span>
                </div>
              </div>

              <TrustBadge
                type="identity"
                status={trust.identityStatus}
                size="sm"
                showPopoverOnClick={false}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Verifies the physical identity of the household head or hiring executive. Demonstrates to domestic staff that they are entering a legitimate, accountable residence.
            </p>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Representative</span>
                <span className="font-semibold text-slate-800">{employer.contactPerson}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Provider</span>
                <span className="font-semibold text-slate-800">{trust.identityProvider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Verification Hash</span>
                <span className="font-mono font-bold text-slate-900">
                  {trust.identityVerificationCode || 'AMN-DEMO-IDV-0002'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFaydaModal(true)}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} /> Re-simulate Representative Identity
          </button>
        </div>

        {/* Module 2: Household & Business Vetting */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Building2 size={26} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Household & Profile Review
                  </h4>
                  <span className="text-xs text-slate-500">
                    Physical Address & Ethical Labor Vetting
                  </span>
                </div>
              </div>

              <TrustBadge
                type="employer_profile"
                status={trust.profileStatus}
                size="sm"
                showPopoverOnClick={false}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Confirms the employer’s residential address, telephone reliability, and mutual agreement to the AMANA standard fair employment terms.
            </p>

            <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-3.5 text-xs text-blue-950 space-y-1">
              <span className="font-bold block">Reviewer Findings:</span>
              <p className="text-slate-600 leading-snug">
                {trust.profileReviewNotes ||
                  'Household identity and physical address in Bole Atlas corroborated.'}
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between">
                <span>Vetted by: {trust.profileReviewedBy || 'Sara Bekele (AMN-REV-04)'}</span>
                <span>November 9, 2026</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRequestProfileReview}
            className="w-full rounded-xl border border-blue-600 bg-blue-50/60 py-2.5 text-xs font-bold text-blue-800 hover:bg-blue-100 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 size={14} /> Request Profile Re-Vetting
          </button>
        </div>
      </div>

      {/* Job Review Summary */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Briefcase size={18} className="text-slate-400" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Published Job Listings Review Status
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('jobs')}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            Manage Jobs →
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {employerJobs.map((job) => (
            <div key={job.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                <span className="text-slate-500 text-[11px]">
                  {job.specificArea}, {job.location} • ETB {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} / mo
                </span>
              </div>

              <TrustBadge
                type="job_review"
                status={job.reviewStatus || 'verified_demo'}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fayda Modal */}
      {showFaydaModal && (
        <FaydaVerificationModal
          role="employer"
          onClose={() => setShowFaydaModal(false)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
