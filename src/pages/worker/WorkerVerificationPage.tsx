import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Lock,
  ArrowRight,
  Clock,
  Building2,
  FileText,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TrustBadge, TrustBadgeList } from '../../components/trust/TrustBadges';
import { FaydaVerificationModal } from '../../components/verification/FaydaVerificationModal';

export const WorkerVerificationPage: React.FC<{
  onShowToast: (msg: string) => void;
  onNavigateTab: (tab: string) => void;
}> = ({ onShowToast, onNavigateTab }) => {
  const { worker, updateSkillsReviewStatus } = usePlatform();
  const [showFaydaModal, setShowFaydaModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const trust = worker.trust || {
    identityStatus: 'verified_demo',
    identityVerificationCode: 'AMN-DEMO-IDV-0001',
    identityVerifiedAt: '2026-11-10T10:00:00Z',
    identityProvider: 'Fayda National ID (Simulation)',
    skillsStatus: 'verified_demo',
    skillsReviewedAt: '2026-11-12T14:30:00Z',
    skillsReviewedBy: 'Sara Bekele (AMN-REV-04)',
    skillsReviewNotes: 'CPR certification and culinary sanitation credentials cross-verified for domestic placement.',
    history: [],
  };

  const handleCopyCode = () => {
    if (trust.identityVerificationCode) {
      navigator.clipboard?.writeText(trust.identityVerificationCode);
      setCopiedCode(true);
      onShowToast(`Verification code ${trust.identityVerificationCode} copied to clipboard!`);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleRequestSkillsReview = () => {
    updateSkillsReviewStatus('under_review_demo', 'Worker requested review for updated skills list.');
    onShowToast('Skills review request submitted to AMANA verification desk (Demo)!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Worker Trust & Verification Center
            </h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
              Demo
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build verifiable credibility with Ethiopian employers through simulated National ID (Fayda) and skill endorsements.
          </p>
        </div>

        <button
          onClick={() => setShowFaydaModal(true)}
          className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} />
          <span>Simulate Fayda eKYC</span>
        </button>
      </div>

      {/* Active Badges Overview Card */}
      <div className="rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-400">
                Public Trust Profile • Candidate Credibility
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                {worker.fullName}
              </h3>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {worker.location} • Domestic & Hospitality Specialist
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/10 flex items-center gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                  Simulated ID Hash
                </span>
                <span className="font-mono text-xs sm:text-sm font-black text-white">
                  {trust.identityVerificationCode || 'AMN-DEMO-IDV-0001'}
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
            <span className="text-xs font-bold text-emerald-200 mr-1">Public Badges:</span>
            <TrustBadge
              type="identity"
              status={trust.identityStatus}
              verificationCode={trust.identityVerificationCode}
              verifiedAt={trust.identityVerifiedAt}
            />
            <TrustBadge
              type="skills"
              status={trust.skillsStatus}
              reviewedBy={trust.skillsReviewedBy}
              verifiedAt={trust.skillsReviewedAt}
              notes={trust.skillsReviewNotes}
            />
          </div>
        </div>
      </div>

      {/* Grid of the 2 Key Verification Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Fayda Identity Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Fayda National ID (eKYC)
                  </h4>
                  <span className="text-xs text-slate-500">
                    Ethiopian National Identity Program (Simulated)
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
              Provides proof of personal identity via zero-knowledge cryptographic signature. Employers can verify applicant validity without accessing sensitive private credentials.
            </p>

            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Provider</span>
                <span className="font-semibold text-slate-800">{trust.identityProvider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Verification Code</span>
                <span className="font-mono font-bold text-slate-900">
                  {trust.identityVerificationCode || 'AMN-DEMO-IDV-0001'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Verified</span>
                <span className="font-semibold text-slate-800">
                  {trust.identityVerifiedAt
                    ? new Date(trust.identityVerifiedAt).toLocaleDateString()
                    : 'November 10, 2026'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowFaydaModal(true)}
            className="w-full rounded-xl border border-emerald-600 bg-emerald-50/60 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} /> Re-simulate Fayda Verification
          </button>
        </div>

        {/* Module 2: Skills & Qualifications Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Sparkles size={26} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">
                    Skills & Qualifications Vetting
                  </h4>
                  <span className="text-xs text-slate-500">
                    Certifications & Past Reference Verification
                  </span>
                </div>
              </div>

              <TrustBadge
                type="skills"
                status={trust.skillsStatus}
                size="sm"
                showPopoverOnClick={false}
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Validates certifications (such as CPR, First Aid, and hygiene) and references from past households or hospitality employers.
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">Endorsed Skill Badges:</span>
              <div className="flex flex-wrap gap-1.5">
                {worker.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-lg bg-purple-50 border border-purple-200 px-2.5 py-1 text-xs font-semibold text-purple-900"
                  >
                    <CheckCircle2 size={12} className="text-purple-600" /> {skill}
                  </span>
                ))}
              </div>
            </div>

            {trust.skillsReviewNotes && (
              <div className="rounded-2xl bg-purple-50/50 border border-purple-100 p-3 text-xs text-purple-950">
                <span className="font-bold block mb-0.5">Reviewer Verification Note:</span>
                <p className="text-slate-600 leading-snug">{trust.skillsReviewNotes}</p>
              </div>
            )}
          </div>

          <button
            onClick={handleRequestSkillsReview}
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Award size={14} /> Request Updated Skill Review
          </button>
        </div>
      </div>

      {/* Verification History Log */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock size={18} className="text-slate-400" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Verification Audit & Activity Log
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {trust.history.length || 2} Recorded Events
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {(trust.history.length > 0
            ? trust.history
            : [
                {
                  id: 'seed-hist-1',
                  verificationType: 'identity',
                  action: 'National ID Fayda eKYC Simulation Completed',
                  status: 'verified_demo',
                  timestamp: '2026-11-10T10:00:00Z',
                  actor: 'Fayda eKYC Simulation Gateway',
                  verificationCode: 'AMN-DEMO-IDV-0001',
                  notes: 'Cryptographic identity match validated.',
                },
                {
                  id: 'seed-hist-2',
                  verificationType: 'skills',
                  action: 'First Aid, CPR and Childcare Experience Endorsed',
                  status: 'verified_demo',
                  timestamp: '2026-11-12T14:30:00Z',
                  actor: 'Sara Bekele (Reviewer)',
                  notes: 'References and credentials verified for domestic care.',
                },
              ]
          ).map((item) => (
            <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{item.action}</span>
                  <span className="rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Actor: <span className="font-medium text-slate-700">{item.actor}</span>
                  {item.verificationCode && (
                    <span className="ml-2 font-mono text-emerald-700">Code: {item.verificationCode}</span>
                  )}
                </p>
                {item.notes && <p className="text-slate-600 text-[11px] italic">{item.notes}</p>}
              </div>

              <span className="text-slate-400 text-[11px] whitespace-nowrap">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Explainer: Why Verification Protects Ethiopian Workers */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-7 space-y-4">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Why Verification Protects You in the Ethiopian Workplace
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">3x Faster Placement</span>
            <p className="leading-snug">
              Verified workers receive hiring offers significantly faster because employers know their identity is genuine and pre-checked.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">Fair Compensation</span>
            <p className="leading-snug">
              Verified skills prevent employers from undercutting agreed wage rates or demanding duties outside your formal contract.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-900 block">Dispute Defense</span>
            <p className="leading-snug">
              In any workplace dispute or non-payment case, having a verified profile ensures your testimony is backed by recorded proof.
            </p>
          </div>
        </div>
      </div>

      {/* Fayda Modal */}
      {showFaydaModal && (
        <FaydaVerificationModal
          role="worker"
          onClose={() => setShowFaydaModal(false)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};
