import React, { useState } from 'react';
import {
  ShieldCheck,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Eye,
  FileCheck2,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';
import { IdentityVerificationStatus, Role } from '../../types/platform';
import { usePlatform } from '../../context/PlatformContext';

interface FaydaVerificationModalProps {
  role: 'worker' | 'employer';
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const FaydaVerificationModal: React.FC<FaydaVerificationModalProps> = ({
  role,
  onClose,
  onShowToast,
}) => {
  const { worker, employer, simulateIdentityVerification } = usePlatform();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [consentGiven, setConsentGiven] = useState(true);
  const [isSimulatingGateway, setIsSimulatingGateway] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<IdentityVerificationStatus>('verified_demo');

  const targetName = role === 'worker' ? worker.fullName : employer.contactPerson;
  const targetEntity = role === 'worker' ? 'Worker Profile' : 'Employer Representative';

  const handleStartGatewaySimulation = () => {
    setCurrentStep(3);
    setIsSimulatingGateway(true);
    setTimeout(() => {
      setIsSimulatingGateway(false);
    }, 1800);
  };

  const handleCompleteVerification = (outcome: IdentityVerificationStatus) => {
    const res = simulateIdentityVerification(role, outcome);
    if (res.success) {
      onShowToast(res.message);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black font-display tracking-tight text-white">
                  Fayda National ID Verification
                </h3>
                <span className="rounded-full bg-amber-400/20 text-amber-300 px-2 py-0.5 text-[10px] font-bold border border-amber-400/30">
                  Simulation
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80">
                Ethiopian National eKYC Identity Integration ({targetEntity})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-300 hover:bg-white/10 hover:text-white transition"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center gap-1.5 ${
                  currentStep === step
                    ? 'font-bold text-emerald-800'
                    : currentStep > step
                    ? 'text-emerald-700'
                    : 'text-slate-600'
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === step
                      ? 'bg-emerald-600 text-white'
                      : currentStep > step
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {step}
                </span>
                <span className="hidden sm:inline">
                  {step === 1 ? 'Intro' : step === 2 ? 'Consent' : step === 3 ? 'Gateway' : 'Outcome'}
                </span>
                {step < 4 && <span className="text-slate-300 mx-1">›</span>}
              </div>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-600">
            Step {currentStep} of 4
          </span>
        </div>

        {/* Body content based on step */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* STEP 1: INTRODUCTION */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                  <Sparkles size={16} className="text-emerald-600" />
                  Why National ID Verification Matters in Ethiopia
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  In informal and domestic employment across Addis Ababa and regional cities, workers and employers routinely engage without prior formal records. Verifying identities through the Ethiopian National ID (Fayda) creates instant trust, discourages misrepresentation, and protects vulnerable workers from unfair exploitation.
                </p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  What This Simulation Demonstrates:
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Cross-validation with National Registry:</strong> Confirms candidate name, photo token, and active Fayda status.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Decentralized Trust Badge:</strong> Unlocks the public <em>"Identity Verified — Demo"</em> badge across all job applications and contracts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Fictional Reference Code:</strong> Issues a deterministic simulation hash (e.g. <code>AMN-DEMO-IDV-0001</code>) for record auditing.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Notice:</strong> This is an interactive hackathon prototype. Real National ID API integration will follow official Fayda sandbox onboarding guidelines.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition flex items-center gap-2"
                >
                  Proceed to Privacy & Consent <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CONSENT & ZERO-KNOWLEDGE PREVIEW */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Data Access & Consent Protocol
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  AMANA adheres to strict data minimization principles under Ethiopian data privacy laws.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Data Requested from Fayda eKYC:</span>
                  <span className="text-emerald-800 font-semibold text-[11px]">Zero-Knowledge Tokenized</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[10px] block">Full Legal Name</span>
                    <span className="font-bold text-slate-800">{targetName}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[10px] block">Year of Birth</span>
                    <span className="font-bold text-slate-800">1996 (Cross-check only)</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[10px] block">National ID (FIN)</span>
                    <span className="font-mono text-emerald-800 font-bold">NEVER STORED BY AMANA</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[10px] block">Biometric Data</span>
                    <span className="font-mono text-emerald-800 font-bold">ZERO SENSING (HASH ONLY)</span>
                  </div>
                </div>
              </div>

              {/* Consent Checkbox */}
              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-emerald-50/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-700 leading-snug">
                  I consent to AMANA querying the simulated Fayda Identity Provider to verify my legal name and issue a digital verification badge for employment matching.
                </span>
              </label>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  type="button"
                  disabled={!consentGiven}
                  onClick={handleStartGatewaySimulation}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition flex items-center gap-2"
                >
                  Connect to Fayda Gateway <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: SIMULATED GATEWAY */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in text-center py-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border-2 border-emerald-300">
                {isSimulatingGateway ? (
                  <RefreshCw size={28} className="animate-spin text-emerald-600" />
                ) : (
                  <CheckCircle2 size={32} className="text-emerald-600" />
                )}
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 font-display">
                  {isSimulatingGateway
                    ? 'Connecting to Fayda eKYC Sandbox...'
                    : 'Simulation Handshake Complete!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {isSimulatingGateway
                    ? 'Establishing cryptographic session and checking zero-knowledge identity proof token...'
                    : 'The simulated National ID gateway responded successfully with match validation.'}
                </p>
              </div>

              {/* Gateway Mock Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left space-y-2 max-w-md mx-auto text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Gateway Endpoint</span>
                  <span className="font-mono text-slate-700">sandbox.fayda.et/ekyc/v2</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Subject Identifier</span>
                  <span className="font-mono text-slate-700">AMN-ETH-{targetName.slice(0, 3).toUpperCase()}-94</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Zero-Knowledge Proof</span>
                  <span className="font-mono text-emerald-600 font-bold">VALID (SIMULATED)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSimulatingGateway}
                  onClick={() => setCurrentStep(4)}
                  className="rounded-xl bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition flex items-center gap-2 mx-auto"
                >
                  Configure Simulated Outcome <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: JUDGE OUTCOME SELECTOR */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="rounded-xl bg-purple-50 border border-purple-200 p-3 text-xs text-purple-900">
                <div className="font-bold text-purple-950 flex items-center gap-1.5 mb-0.5">
                  <Sparkles size={14} /> Hackathon Demonstration Controls
                </div>
                Judges and presenters can choose between four simulated real-world verification outcomes to test state changes across AMANA.
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('verified_demo')}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    selectedOutcome === 'verified_demo'
                      ? 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-900">
                        1. Verification Success (Recommended)
                      </span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5">
                        Badge Unlocked
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      National identity match confirmed. Issues verification code{' '}
                      <code>{role === 'worker' ? 'AMN-DEMO-IDV-0001' : 'AMN-DEMO-IDV-0002'}</code>.
                    </p>
                  </div>
                  {selectedOutcome === 'verified_demo' && (
                    <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOutcome('additional_review_demo')}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    selectedOutcome === 'additional_review_demo'
                      ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-900 block">
                      2. Additional Review Required
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Spelling variant or secondary proof flag. Routed to AMANA manual verification desk.
                    </p>
                  </div>
                  {selectedOutcome === 'additional_review_demo' && (
                    <CheckCircle2 size={18} className="text-amber-600 shrink-0" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOutcome('unsuccessful_demo')}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    selectedOutcome === 'unsuccessful_demo'
                      ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-rose-900 block">
                      3. Unsuccessful Verification
                    </span>
                    <p className="text-[11px] text-slate-600">
                      Record mismatch in simulated registry. User is prompted to check their legal name spelling.
                    </p>
                  </div>
                  {selectedOutcome === 'unsuccessful_demo' && (
                    <CheckCircle2 size={18} className="text-rose-600 shrink-0" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOutcome('cancelled_demo')}
                  className={`w-full text-left p-3.5 rounded-2xl border transition flex items-start justify-between ${
                    selectedOutcome === 'cancelled_demo'
                      ? 'border-slate-500 bg-slate-100 ring-2 ring-slate-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block">
                      4. Cancelled Simulation
                    </span>
                    <p className="text-[11px] text-slate-600">
                      User aborted the authorization before completion.
                    </p>
                  </div>
                  {selectedOutcome === 'cancelled_demo' && (
                    <CheckCircle2 size={18} className="text-slate-600 shrink-0" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => handleCompleteVerification(selectedOutcome)}
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20"
                >
                  Apply Simulated State & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
