import React from 'react';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck2,
  Coins,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface EmployerOverviewPageProps {
  onNavigateTab: (tab: string) => void;
  onOpenCreateJob: () => void;
  onSelectApplication: (appId: string) => void;
}

export const EmployerOverviewPage: React.FC<EmployerOverviewPageProps> = ({
  onNavigateTab,
  onOpenCreateJob,
  onSelectApplication,
}) => {
  const { employer, jobs, applications, agreements, payments, activities } = usePlatform();

  // Employer's specific jobs
  const myJobs = jobs.filter((j) => j.employerId === employer.id);
  const activeJobs = myJobs.filter((j) => j.status === 'published');
  
  // Applications submitted to this employer's jobs
  const myApplications = applications.filter((app) => app.employerId === employer.id);
  const totalAppsCount = myApplications.length;
  const awaitingReviewCount = myApplications.filter((a) => a.status === 'submitted').length;
  const acceptedAppsCount = myApplications.filter((a) => a.status === 'accepted').length;

  const myAgreements = agreements.filter((a) => a.employerId === employer.id);
  const activeAgreementsCount = myAgreements.filter((a) => a.status === 'active').length;
  const myPayments = payments.filter((p) => p.employerId === employer.id);
  const totalDisbursed = myPayments.reduce((sum, p) => sum + p.reportedPaidAmount, 0);

  const recentApplications = myApplications.slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30 mb-3">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Employer Hiring Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              {employer.companyName}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-xl">
              Lead Contact: <strong>{employer.contactPerson}</strong> • {employer.location}. Manage your employment listings and review pre-screened worker submissions.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-2.5">
            <button
              onClick={onOpenCreateJob}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-emerald-400 transition"
            >
              <Plus size={15} />
              <span>Post New Job</span>
            </button>
            <button
              onClick={() => onNavigateTab('applications')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              <Users size={14} />
              <span>Applications ({awaitingReviewCount})</span>
            </button>
            <button
              onClick={() => onNavigateTab('agreements')}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-950/60 px-3.5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900 transition"
            >
              <FileCheck2 size={14} />
              <span>Agreements ({activeAgreementsCount} Active)</span>
            </button>
            <button
              onClick={() => onNavigateTab('salary')}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition"
            >
              <Coins size={14} />
              <span>Salary Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Hiring & Workforce Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Jobs</span>
            <div className="mt-1.5 text-2xl font-black text-slate-900 font-display">{activeJobs.length}</div>
            <span className="text-[10px] text-slate-400">Open listings</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Applications</span>
            <div className="mt-1.5 text-2xl font-black text-slate-900 font-display">{totalAppsCount}</div>
            <span className="text-[10px] text-slate-400">Total received</span>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 block uppercase">Pending Review</span>
            <div className="mt-1.5 text-2xl font-black text-amber-700 font-display">{awaitingReviewCount}</div>
            <span className="text-[10px] text-amber-600">Candidates to vet</span>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">Accepted</span>
            <div className="mt-1.5 text-2xl font-black text-emerald-700 font-display">{acceptedAppsCount}</div>
            <span className="text-[10px] text-emerald-600">Ready for contract</span>
          </div>

          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-900 block uppercase">Contracts</span>
            <div className="mt-1.5 text-2xl font-black text-emerald-900 font-display">{activeAgreementsCount}</div>
            <span className="text-[10px] text-emerald-700">Active agreements</span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-blue-800 block uppercase">Disbursed (ETB)</span>
            <div className="mt-1.5 text-lg font-black text-blue-800 font-mono">
              {totalDisbursed > 0 ? `${(totalDisbursed / 1000).toFixed(1)}k` : '0'}
            </div>
            <span className="text-[10px] text-blue-600">Logged payments</span>
          </div>
        </div>
      </div>

      {/* Grid: Recent Applications & Active Jobs Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Applications Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Recent Candidate Applications</h3>
              <p className="text-xs text-slate-500">Incoming worker submissions for your open positions.</p>
            </div>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Manage all ({myApplications.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                <Users size={32} className="mx-auto text-slate-300 mb-2" />
                <h4 className="text-sm font-bold text-slate-800">No applications received yet</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Once workers apply to your published roles, they will appear here.
                </p>
              </div>
            ) : (
              recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-emerald-300 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-bold text-slate-900">{app.workerName}</strong>
                      <span className="text-xs text-slate-400">• {app.workerLocation}</span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">Applied for: <strong className="text-slate-800">{app.jobTitle}</strong></div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <Calendar size={11} /> {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        app.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'under_review'
                          ? 'bg-blue-100 text-blue-800'
                          : app.status === 'declined'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {app.status === 'accepted'
                        ? 'Accepted'
                        : app.status === 'under_review'
                        ? 'Under Review'
                        : app.status === 'declined'
                        ? 'Declined'
                        : 'New Submission'}
                    </span>
                    <button
                      onClick={() => {
                        onSelectApplication(app.id);
                        onNavigateTab('applications');
                      }}
                      className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real-time Activity Feed Column */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Recent Activity</h3>
            <p className="text-xs text-slate-500">Live logs generated by demonstration interactions.</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-3.5">
            {activities.slice(0, 5).map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-800">{act.title}</div>
                  <p className="text-slate-500 mt-0.5 leading-snug">{act.description}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
