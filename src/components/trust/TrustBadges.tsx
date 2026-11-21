import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  Info,
  X,
  ExternalLink,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { IdentityVerificationStatus, ReviewStatus } from '../../types/platform';

export interface TrustBadgeProps {
  type: 'identity' | 'employer_profile' | 'skills' | 'job_review';
  status?: IdentityVerificationStatus | ReviewStatus;
  verificationCode?: string;
  verifiedAt?: string;
  reviewedBy?: string;
  notes?: string;
  size?: 'sm' | 'md' | 'lg';
  showPopoverOnClick?: boolean;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  status = 'verified_demo',
  verificationCode,
  verifiedAt,
  reviewedBy,
  notes,
  size = 'md',
  showPopoverOnClick = true,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const isVerified = status === 'verified_demo';
  const isPending = status === 'pending_demo' || status === 'under_review_demo';
  const isAdditional = status === 'additional_review_demo' || status === 'needs_update_demo';

  // Config per badge type
  const config = {
    identity: {
      name: 'Identity Verified — Demo',
      shortName: 'Fayda ID Verified',
      icon: ShieldCheck,
      color: isVerified
        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
        : isPending
        ? 'bg-amber-50 text-amber-800 border-amber-300'
        : 'bg-slate-100 text-slate-600 border-slate-300',
      badgeColor: 'text-emerald-600',
      description:
        'Simulates national identity verification against the Ethiopian National ID (Fayda) ecosystem. Confirms full name and biometric liveness match via zero-knowledge proof simulation.',
      defaultCode: verificationCode || 'AMN-DEMO-IDV-0001',
      provider: 'Fayda National ID Program (Simulation)',
    },
    employer_profile: {
      name: 'Employer Profile Reviewed — Demo',
      shortName: 'Profile Vetted',
      icon: Building2,
      color: isVerified
        ? 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100'
        : isPending
        ? 'bg-amber-50 text-amber-800 border-amber-300'
        : 'bg-slate-100 text-slate-600 border-slate-300',
      badgeColor: 'text-blue-600',
      description:
        'Household or business identity, contact authenticity, and commitment to fair labor contracts manually vetted by the AMANA case review desk.',
      defaultCode: verificationCode || 'AMN-DEMO-EMP-0042',
      provider: reviewedBy || 'AMANA Verification Desk',
    },
    skills: {
      name: 'Skills & Qualifications Reviewed — Demo',
      shortName: 'Skills Vetted',
      icon: Sparkles,
      color: isVerified
        ? 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100'
        : isPending
        ? 'bg-amber-50 text-amber-800 border-amber-300'
        : 'bg-slate-100 text-slate-600 border-slate-300',
      badgeColor: 'text-purple-600',
      description:
        'Professional certifications (e.g. CPR/First Aid, culinary hygiene) and prior household employment references verified by AMANA reviewers.',
      defaultCode: verificationCode || 'AMN-DEMO-SKL-0108',
      provider: reviewedBy || 'Sara Bekele (Senior Reviewer)',
    },
    job_review: {
      name: 'Job Information Reviewed — Demo',
      shortName: 'Job Vetted',
      icon: CheckCircle2,
      color: isVerified
        ? 'bg-teal-50 text-teal-800 border-teal-300 hover:bg-teal-100'
        : isPending
        ? 'bg-amber-50 text-amber-800 border-amber-300'
        : 'bg-slate-100 text-slate-600 border-slate-300',
      badgeColor: 'text-teal-600',
      description:
        'Transparent compensation, guaranteed rest days, safe workplace boundaries, and clear job expectations confirmed prior to applicant discovery.',
      defaultCode: verificationCode || 'AMN-DEMO-JOB-0077',
      provider: reviewedBy || 'AMANA Employment Standards Team',
    },
  }[type];

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  return (
    <>
      <button
        type="button"
        onClick={() => showPopoverOnClick && setOpenModal(true)}
        className={`inline-flex items-center font-bold rounded-full border transition shadow-xs cursor-pointer ${config.color} ${sizeClasses}`}
        title="Click to inspect verification metadata (Demonstration)"
      >
        <Icon size={iconSizes} className={config.badgeColor} />
        <span>{config.name}</span>
        {showPopoverOnClick && <Info size={iconSizes - 2} className="opacity-60 ml-0.5" />}
      </button>

      {/* Verification Popover / Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${config.color} border`}>
                  <Icon size={26} className={config.badgeColor} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-display">
                    {config.name}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 mt-0.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Status: {isVerified ? 'Verified (Simulation)' : isPending ? 'Pending Review' : status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpenModal(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {config.description}
            </p>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[11px] font-bold text-slate-600 block">Verification Code</span>
                <span className="font-mono font-black text-slate-900 text-xs sm:text-sm mt-0.5 block">
                  {config.defaultCode}
                </span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[11px] font-bold text-slate-600 block">Verified Date</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {verifiedAt ? new Date(verifiedAt).toLocaleDateString() : 'November 10, 2026'}
                </span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[11px] font-bold text-slate-600 block">Authority / Desk</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block">
                  {config.provider}
                </span>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <span className="text-[11px] font-bold text-slate-600 block">Integrity Hash</span>
                <span className="font-mono text-[10px] text-slate-600 truncate block mt-0.5">
                  sha256-e9b4..f812 (Demo)
                </span>
              </div>
            </div>

            {notes && (
              <div className="rounded-xl border border-slate-200 bg-emerald-50/40 p-3 text-xs text-slate-700">
                <span className="font-bold text-emerald-900 block mb-0.5">Reviewer Notes:</span>
                <p>{notes}</p>
              </div>
            )}

            {/* MANDATORY INVESTOR / HACKATHON DISCLAIMER */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-bold text-amber-950 block">FRONTEND DEMONSTRATION ONLY — Prototype Simulation</span>
                This verification flow simulates future integration with the Ethiopian National ID Program (Fayda eKYC). No live government servers are queried, and no real citizen biometrics are handled.
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setOpenModal(false)}
                className="w-full sm:w-auto rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Close Badge Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const TrustBadgeList: React.FC<{
  showIdentity?: boolean;
  showEmployerProfile?: boolean;
  showSkills?: boolean;
  showJobReview?: boolean;
  identityStatus?: IdentityVerificationStatus;
  identityCode?: string;
  employerProfileStatus?: ReviewStatus;
  skillsStatus?: ReviewStatus;
  jobReviewStatus?: ReviewStatus;
  size?: 'sm' | 'md' | 'lg';
}> = ({
  showIdentity = true,
  showEmployerProfile = false,
  showSkills = false,
  showJobReview = false,
  identityStatus = 'verified_demo',
  identityCode = 'AMN-DEMO-IDV-0001',
  employerProfileStatus = 'verified_demo',
  skillsStatus = 'verified_demo',
  jobReviewStatus = 'verified_demo',
  size = 'md',
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {showIdentity && (
        <TrustBadge
          type="identity"
          status={identityStatus}
          verificationCode={identityCode}
          size={size}
        />
      )}
      {showEmployerProfile && (
        <TrustBadge
          type="employer_profile"
          status={employerProfileStatus}
          size={size}
        />
      )}
      {showSkills && (
        <TrustBadge
          type="skills"
          status={skillsStatus}
          size={size}
        />
      )}
      {showJobReview && (
        <TrustBadge
          type="job_review"
          status={jobReviewStatus}
          size={size}
        />
      )}
    </div>
  );
};
