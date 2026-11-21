import React from 'react';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { TrustBadge } from './TrustBadges';

export const IdentityTrustSection: React.FC<{ onNavigate: (route: string) => void }> = ({
  onNavigate,
}) => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-bold text-emerald-300">
            <ShieldCheck size={16} /> Ethiopia’s First Multi-Layered Trust Platform
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white">
            Know Who You're Working With.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In Ethiopian household and service employment, trust is often left to chance. AMANA introduces verifiable credentials powered by simulated National ID (Fayda) integration, independent skills review, and standard fair employment contracts.
          </p>
        </div>

        {/* 4 Trust Badges Interactive Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-5 space-y-3 backdrop-blur-xs">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 border border-emerald-500/30">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Fayda National ID Verified</h3>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Simulated eKYC zero-knowledge verification confirms legal identity without leaking private ID numbers.
              </p>
            </div>
            <div className="pt-1">
              <TrustBadge type="identity" status="verified_demo" size="sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-950/40 p-5 space-y-3 backdrop-blur-xs">
            <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-300 border border-blue-500/30">
              <Building2 size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Employer Profile Reviewed</h3>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Household and business locations are vetted to guarantee genuine, safe employment environments.
              </p>
            </div>
            <div className="pt-1">
              <TrustBadge type="employer_profile" status="verified_demo" size="sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-purple-950/40 p-5 space-y-3 backdrop-blur-xs">
            <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 border border-purple-500/30">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Skills & Qualifications Vetted</h3>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                First aid, childcare, and hospitality qualifications authenticated via past employer references.
              </p>
            </div>
            <div className="pt-1">
              <TrustBadge type="skills" status="verified_demo" size="sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-teal-500/30 bg-teal-950/40 p-5 space-y-3 backdrop-blur-xs">
            <div className="h-10 w-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-300 border border-teal-500/30">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Job Information Reviewed</h3>
              <p className="text-xs text-slate-400 mt-1 leading-snug">
                Transparent wages, guaranteed rest days, and clear duties audited prior to candidate discovery.
              </p>
            </div>
            <div className="pt-1">
              <TrustBadge type="job_review" status="verified_demo" size="sm" />
            </div>
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('#/trust')}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/30 cursor-pointer"
          >
            <span>Learn More in the AMANA Trust Center</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
