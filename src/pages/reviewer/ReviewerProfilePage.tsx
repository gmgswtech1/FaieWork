import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  Lock,
  FileCheck2,
  Save,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface ReviewerProfilePageProps {
  onShowToast?: (msg: string) => void;
}

export const ReviewerProfilePage: React.FC<ReviewerProfilePageProps> = ({ onShowToast }) => {
  const { reviewer, updateReviewerProfile } = usePlatform();

  const [fullName, setFullName] = useState(reviewer.fullName);
  const [phone, setPhone] = useState(reviewer.phone);
  const [email, setEmail] = useState(reviewer.email);
  const [roleTitle, setRoleTitle] = useState(reviewer.roleTitle);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateReviewerProfile({
      fullName,
      phone,
      email,
      roleTitle,
    });
    onShowToast?.('Reviewer profile credentials updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#092e22] to-[#124d3a] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3 border border-emerald-400/30">
            <Lock size={13} />
            <span>Authorized Case Review Credentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Reviewer Profile & Credentials
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Authorized officer portfolio for <strong>{reviewer.fullName}</strong>. Operates under the ethical guidelines of the AMANA Worker Protection Initiative.
          </p>
        </div>

        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
          <div className="text-lg font-black text-white font-mono">{reviewer.badgeNumber}</div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Official Protection Badge
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Form: Editable Details */}
        <div className="md:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 font-display mb-4">
            Officer Identification
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm text-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Official Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Secure Protection Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <input
                type="text"
                value={reviewer.department}
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 font-medium"
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Organization</label>
              <input
                type="text"
                value={reviewer.organization}
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 font-medium"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold transition shadow-sm flex items-center gap-2"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Card: Ethical Conduct Principles */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
              <Award size={18} />
              <span>Reviewer Ethical Standards</span>
            </div>

            <div className="space-y-3 text-slate-600 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Neutrality:</strong> All reported concerns are examined objectively without presuming liability before reviewing contract milestones.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Identity Isolation:</strong> Complainant identities are strictly shielded from respondent employers during active evaluations.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Bilateral Communication:</strong> Official updates provide workers with predictable milestones while internal notes preserve evidentiary integrity.
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-amber-50 border border-amber-200 p-5 text-amber-950 text-xs space-y-2">
            <strong className="block font-bold text-amber-900">Demonstration Scope Notice</strong>
            <p className="leading-snug">
              This review dashboard demonstrates confidential workflow operations. Full institutional enforcement, multi-reviewer triage, and legal arbitration protocols will be connected in future releases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};