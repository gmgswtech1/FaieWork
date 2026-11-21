import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Check,
  X,
  FileCheck2,
  Search,
  Filter,
  ArrowRight,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TrustBadge } from '../../components/trust/TrustBadges';
import { ReviewStatus } from '../../types/platform';

export const ReviewerVerificationsPage: React.FC<{
  onShowToast: (msg: string) => void;
}> = ({ onShowToast }) => {
  const {
    worker,
    employer,
    jobs,
    reviewer,
    updateSkillsReviewStatus,
    updateEmployerReviewStatus,
    updateJobReviewStatus,
  } = usePlatform();

  const [activeFilter, setActiveFilter] = useState<'all' | 'skills' | 'employers' | 'jobs'>('all');
  const [reviewNoteInput, setReviewNoteInput] = useState('');
  const [selectedItem, setSelectedItem] = useState<{
    type: 'skills' | 'employer' | 'job';
    id: string;
    title: string;
  } | null>(null);

  const handleApprove = () => {
    if (!selectedItem) return;
    if (selectedItem.type === 'skills') {
      updateSkillsReviewStatus('verified_demo', reviewNoteInput || 'Credentials and references verified.');
      onShowToast(`Worker skills verification approved by ${reviewer.fullName}`);
    } else if (selectedItem.type === 'employer') {
      updateEmployerReviewStatus('verified_demo', reviewNoteInput || 'Employer address and terms vetted.');
      onShowToast(`Employer profile verification approved by ${reviewer.fullName}`);
    } else if (selectedItem.type === 'job') {
      updateJobReviewStatus(selectedItem.id, 'verified_demo');
      onShowToast(`Job listing verified by ${reviewer.fullName}`);
    }
    setSelectedItem(null);
    setReviewNoteInput('');
  };

  const handleRequestChanges = () => {
    if (!selectedItem) return;
    if (selectedItem.type === 'skills') {
      updateSkillsReviewStatus('needs_update_demo', reviewNoteInput || 'Please provide updated certification copies.');
      onShowToast('Request for skills clarification sent to worker.');
    } else if (selectedItem.type === 'employer') {
      updateEmployerReviewStatus('needs_update_demo', reviewNoteInput || 'Please verify exact residence location in Bole Atlas.');
      onShowToast('Clarification request sent to employer.');
    } else if (selectedItem.type === 'job') {
      updateJobReviewStatus(selectedItem.id, 'needs_update_demo');
      onShowToast('Job flagged for salary clarification.');
    }
    setSelectedItem(null);
    setReviewNoteInput('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Verification & Credential Audit Desk
            </h2>
            <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-bold text-purple-800 border border-purple-200">
              Desk AMN-REV-04
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review worker skill endorsements, employer household vetting, and job compliance before discovery.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold">
          {(['all', 'skills', 'employers', 'jobs'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-xl capitalize transition ${
                activeFilter === filter
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Review Queue Cards */}
      <div className="space-y-4">
        {/* Item 1: Worker Skills */}
        {(activeFilter === 'all' || activeFilter === 'skills') && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                <Sparkles size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Worker Skills & Qualifications: {worker.fullName}
                  </h4>
                  <TrustBadge
                    type="skills"
                    status={worker.trust?.skillsStatus || 'verified_demo'}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Skills: {worker.skills.join(', ')} • Experience: {worker.experienceYears} Years
                </p>
                <p className="text-xs text-slate-700 italic bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 max-w-xl">
                  "{worker.trust?.skillsReviewNotes || 'CPR certification and household references verified.'}"
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedItem({
                  type: 'skills',
                  id: worker.id,
                  title: `Skills for ${worker.fullName}`,
                })
              }
              className="rounded-xl border border-purple-600 bg-purple-50/60 px-4 py-2 text-xs font-bold text-purple-800 hover:bg-purple-100 transition shrink-0 cursor-pointer"
            >
              Inspect & Audit
            </button>
          </div>
        )}

        {/* Item 2: Employer Profile */}
        {(activeFilter === 'all' || activeFilter === 'employers') && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                <Building2 size={22} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Employer Household Profile: {employer.companyName}
                  </h4>
                  <TrustBadge
                    type="employer_profile"
                    status={employer.trust?.profileStatus || 'verified_demo'}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Lead: {employer.contactPerson} • {employer.location} ({employer.sector})
                </p>
                <p className="text-xs text-slate-700 italic bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 max-w-xl">
                  "{employer.trust?.profileReviewNotes || 'Household identity and physical address in Bole Atlas corroborated.'}"
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setSelectedItem({
                  type: 'employer',
                  id: employer.id,
                  title: `Employer: ${employer.companyName}`,
                })
              }
              className="rounded-xl border border-blue-600 bg-blue-50/60 px-4 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 transition shrink-0 cursor-pointer"
            >
              Inspect & Audit
            </button>
          </div>
        )}

        {/* Item 3+: Jobs */}
        {(activeFilter === 'all' || activeFilter === 'jobs') && (
          <>
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <CheckCircle2 size={22} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        Job Listing: {job.title}
                      </h4>
                      <TrustBadge
                        type="job_review"
                        status={job.reviewStatus || 'verified_demo'}
                        size="sm"
                      />
                    </div>
                    <p className="text-xs text-slate-500">
                      {job.employerName} • {job.specificArea}, {job.location} • ETB {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} / mo
                    </p>
                    <p className="text-xs text-slate-600">
                      Schedule: {job.workingHours} • Rest Days: {job.restDays}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedItem({
                      type: 'job',
                      id: job.id,
                      title: `Job Listing: ${job.title}`,
                    })
                  }
                  className="rounded-xl border border-teal-600 bg-teal-50/60 px-4 py-2 text-xs font-bold text-teal-800 hover:bg-teal-100 transition shrink-0 cursor-pointer"
                >
                  Inspect & Audit
                </button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Review Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  Audit & Endorse: {selectedItem.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Action taken by Reviewer {reviewer.fullName} ({reviewer.badgeNumber})
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Auditor Assessment & Notes (Visible on Public Trust Popover):
              </label>
              <textarea
                rows={3}
                value={reviewNoteInput}
                onChange={(e) => setReviewNoteInput(e.target.value)}
                placeholder="Enter verification findings, background check confirmation, or requested clarifications..."
                className="w-full rounded-2xl border border-slate-300 p-3 text-xs text-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={handleRequestChanges}
                className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
              >
                Request Clarification / Update
              </button>
              <button
                onClick={handleApprove}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20"
              >
                Endorse & Issue Trust Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
