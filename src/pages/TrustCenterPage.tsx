import React from 'react';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  FileCheck2,
  Coins,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { TrustBadge } from '../components/trust/TrustBadges';

export const TrustCenterPage: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20 animate-in fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <ShieldCheck size={16} /> AMANA Trust & Safety Architecture
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Building Institutional Trust in Ethiopia’s Informal Workplace
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Domestic and informal employment in Ethiopia has historically operated without standardized credentials, written contracts, or verifiable dispute resolution. AMANA introduces a unified, verifiable trust ecosystem connecting national digital identity, skills auditing, and fair labor agreements.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('#/worker')}
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
            >
              Explore Worker Portal <ArrowRight size={16} />
            </button>
            <button
              onClick={() => onNavigate('#/employer')}
              className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition flex items-center gap-2 cursor-pointer"
            >
              Explore Employer Portal
            </button>
            <button
              onClick={() => onNavigate('#/reviewer')}
              className="rounded-2xl bg-purple-600/30 border border-purple-400/40 backdrop-blur-md px-5 py-3 text-xs sm:text-sm font-bold text-purple-200 hover:bg-purple-600/40 transition flex items-center gap-2 cursor-pointer"
            >
              Reviewer Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Section 1: The 4 Independent Trust Badges */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              The Four Pillars of AMANA Verification
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Unlike generic platforms that grant a single blanket badge, AMANA issues four distinct, independently audited badges to prevent trust inflation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pillar 1: Identity */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-display text-base">
                      1. Identity Verified — Demo
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      National ID (Fayda eKYC Simulation)
                    </span>
                  </div>
                </div>
                <TrustBadge type="identity" status="verified_demo" size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Simulates real-time verification against the Ethiopian National ID (Fayda) database. Proves genuine human identity, legal name consistency, and eliminates duplicate or phantom profiles without exposing citizen biometric numbers.
              </p>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Demonstration Code:</span>
                <span className="font-mono text-emerald-800 font-bold block">AMN-DEMO-IDV-0001</span>
              </div>
            </div>

            {/* Pillar 2: Employer Profile */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Building2 size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-display text-base">
                      2. Employer Profile Reviewed — Demo
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Household & Business Vetting
                    </span>
                  </div>
                </div>
                <TrustBadge type="employer_profile" status="verified_demo" size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Verifies the physical residence or commercial location of the employer, checks primary contact reliability, and confirms adherence to AMANA fair contract and non-discrimination guidelines.
              </p>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Audit Desk:</span>
                <span className="font-medium text-slate-800 block">AMANA Verification Desk (Addis Ababa)</span>
              </div>
            </div>

            {/* Pillar 3: Skills */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Sparkles size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-display text-base">
                      3. Skills & Qualifications Reviewed — Demo
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Endorsements & Prior References
                    </span>
                  </div>
                </div>
                <TrustBadge type="skills" status="verified_demo" size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Endorses specific vocational competencies (e.g. Childcare, CPR/First Aid, Culinary Hygiene, Deep Sanitization) through authenticated past reference checks and recognized Ethiopian training institute certificates.
              </p>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Assessed by:</span>
                <span className="font-medium text-purple-900 block">Sara Bekele, Senior Protection Specialist</span>
              </div>
            </div>

            {/* Pillar 4: Job Review */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 font-display text-base">
                      4. Job Information Reviewed — Demo
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Fair Wages & Guaranteed Rest Days
                    </span>
                  </div>
                </div>
                <TrustBadge type="job_review" status="verified_demo" size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Every published listing is screened for compliance with safe working hours, minimum fair wages (no deceptive commission-only or unpaid trials), and mandatory rest day allocations.
              </p>

              <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-900 block">Standards:</span>
                <span className="font-medium text-teal-900 block">Mandatory 1+ Rest Days / Transparent Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Fayda National ID Architecture & Privacy */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xs space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Zero-Knowledge Privacy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              How AMANA Will Integrate with Fayda (National ID)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              AMANA is architected to leverage Ethiopia’s National ID Program while safeguarding worker and employer privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Decentralized Tokenization</h4>
              <p className="text-slate-600 leading-relaxed">
                AMANA never stores citizen Fayda identification numbers (FIN) or biometrics. The platform queries the Fayda eKYC sandbox and receives a signed cryptographic assertion token.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Consent-First Verification</h4>
              <p className="text-slate-600 leading-relaxed">
                No lookup can occur without explicit, time-limited digital consent from the worker or employer. Users can revoke their verification link at any time from their privacy settings.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
              <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Protection Against Retaliation</h4>
              <p className="text-slate-600 leading-relaxed">
                A worker’s verification code is persistent and neutral. An employer cannot erase, alter, or confiscate a worker’s digital credentials in the event of an employment dispute.
              </p>
            </div>
          </div>

          {/* Prototype Banner */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950 block">Hackathon Prototype Notice</span>
              This demonstration simulates the Fayda eKYC verification workflow with mock responses and deterministic codes (<code>AMN-DEMO-IDV-0001</code>). Live integration will follow sandbox accreditation.
            </div>
          </div>
        </div>

        {/* Section 3: Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
              Trust & Safety FAQ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Common questions regarding privacy, contracts, and grievance procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">
                Can an employer see a worker’s confidential reports?
              </span>
              <p className="text-slate-600 leading-relaxed">
                <strong>Never.</strong> AMANA enforces absolute privacy boundaries. Only designated reviewers (such as Sara Bekele) can access worker incident descriptions or evidence. Employers never have access to grievances.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">
                Is a digital employment agreement legally recognized in Ethiopia?
              </span>
              <p className="text-slate-600 leading-relaxed">
                Under the Ethiopian Electronic Signature Proclamation (No. 1072/2018), digital assent and electronic agreements have legal validity when clear mutual consent and verifiable actor records are maintained.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">
                What happens if a salary payment is overdue or disputed?
              </span>
              <p className="text-slate-600 leading-relaxed">
                Both worker and employer can log and confirm payments (via Telebirr, CBE Birr, or Cash). If a discrepancy occurs, the worker can flag the payment for mediation with timestamped digital records.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
              <span className="font-bold text-slate-900 text-sm block">
                Can anyone become a verified employer on AMANA?
              </span>
              <p className="text-slate-600 leading-relaxed">
                Employers must submit valid location details, representative contact information, and agree in writing to fair working hours, transparent pay, and the AMANA standard employment terms.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black font-display">
            Experience AMANA’s High-Trust Employment Ecosystem
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test the live demonstration across worker, employer, and reviewer portals with interactive contracts, salary logs, and simulated Fayda verification.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('#/worker')}
              className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition cursor-pointer"
            >
              Start as Worker
            </button>
            <button
              onClick={() => onNavigate('#/employer')}
              className="rounded-xl bg-white/10 border border-white/20 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
            >
              Start as Employer
            </button>
            <button
              onClick={() => onNavigate('#/')}
              className="rounded-xl text-slate-400 hover:text-white px-4 py-2.5 text-xs font-bold transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
