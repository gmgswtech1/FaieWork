import React from 'react';
import {
  Briefcase,
  FileCheck2,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Building2,
  TrendingUp,
  Coins,
  ShieldAlert,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface WorkerOverviewPageProps {
  onNavigateTab: (tab: string) => void;
  onOpenJob: (jobId: string) => void;
}

export const WorkerOverviewPage: React.FC<WorkerOverviewPageProps> = ({
  onNavigateTab,
  onOpenJob,
}) => {
  const { worker, jobs, applications, agreements, payments, complaints } = usePlatform();

  // Calculate actual dynamic totals
  const myApplications = applications.filter((app) => app.workerId === worker.id);
  const totalAppsCount = myApplications.length;
  const awaitingCount = myApplications.filter(
    (app) => app.status === 'submitted' || app.status === 'under_review'
  ).length;
  const acceptedCount = myApplications.filter((app) => app.status === 'accepted').length;
  const publishedJobs = jobs.filter((j) => j.status === 'published');
  const availableJobsCount = publishedJobs.length;

  const myAgreements = agreements.filter((a) => a.workerId === worker.id);
  const activeAgreementsCount = myAgreements.filter((a) => a.status === 'active').length;
  const myPayments = payments.filter((p) => p.workerId === worker.id);
  const pendingPaymentsCount = myPayments.filter(
    (p) => p.status === 'employer_reported' || p.status === 'partially_paid'
  ).length;
  const myComplaints = complaints.filter((c) => c.workerId === worker.id);
  const activeReportsCount = myComplaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed').length;

  const recentApplications = myApplications.slice(0, 3);
  const recommendedJobs = publishedJobs.slice(0, 3);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
            <CheckCircle2 size={12} /> Accepted
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 border border-blue-200">
            <Clock size={12} /> Under Review
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800 border border-rose-200">
            Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
            <Clock size={12} /> Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner */}
      <div className="rounded-3xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-3">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Verified Worker Portal</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
              Welcome back, {worker.fullName}!
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 max-w-xl">
              Your profile is active in {worker.location}. Check new job opportunities or track the review status of your active applications.
            </p>
          </div>

          {/* Profile Completion Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 w-full lg:w-72 shadow-xs shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Profile Strength</span>
              <span className="text-emerald-700">{worker.profileCompletion}%</span>
            </div>
            <div className="mt-2 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                style={{ width: `${worker.profileCompletion}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              ID verified • Skills & references up-to-date
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-6 pt-5 border-t border-emerald-200/60 flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigateTab('jobs')}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
          >
            <Briefcase size={15} />
            <span>Browse Jobs</span>
          </button>
          <button
            onClick={() => onNavigateTab('applications')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <FileCheck2 size={15} className="text-emerald-600" />
            <span>My Applications ({totalAppsCount})</span>
          </button>
          <button
            onClick={() => onNavigateTab('agreements')}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50/60 px-4 py-2.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100 transition"
          >
            <FileCheck2 size={15} className="text-emerald-700" />
            <span>My Agreements ({activeAgreementsCount} Active)</span>
          </button>
          <button
            onClick={() => onNavigateTab('salary')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Coins size={15} className="text-emerald-600" />
            <span>Salary & Payments</span>
          </button>
          <button
            onClick={() => onNavigateTab('reports')}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-800 hover:bg-rose-100 transition"
          >
            <ShieldAlert size={15} className="text-rose-600" />
            <span>Confidential Reports</span>
          </button>
        </div>
      </div>

      {/* Dynamic Overview Statistics */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Employment & Protection Overview
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Applications</span>
            <div className="mt-1.5 text-2xl font-black text-slate-900 font-display">{totalAppsCount}</div>
            <span className="text-[10px] text-slate-400">Total submitted</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-amber-700 block uppercase">In Review</span>
            <div className="mt-1.5 text-2xl font-black text-amber-700 font-display">{awaitingCount}</div>
            <span className="text-[10px] text-amber-600">Awaiting employer</span>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-800 block uppercase">Accepted</span>
            <div className="mt-1.5 text-2xl font-black text-emerald-800 font-display">{acceptedCount}</div>
            <span className="text-[10px] text-emerald-600">Candidate status</span>
          </div>

          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-900 block uppercase">Contracts</span>
            <div className="mt-1.5 text-2xl font-black text-emerald-900 font-display">{activeAgreementsCount}</div>
            <span className="text-[10px] text-emerald-700">Active agreements</span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-blue-800 block uppercase">Salary Pending</span>
            <div className="mt-1.5 text-2xl font-black text-blue-800 font-display">{pendingPaymentsCount}</div>
            <span className="text-[10px] text-blue-600">To confirm</span>
          </div>

          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-2xs">
            <span className="text-[10px] font-bold text-rose-800 block uppercase">Reports</span>
            <div className="mt-1.5 text-2xl font-black text-rose-800 font-display">{activeReportsCount}</div>
            <span className="text-[10px] text-rose-600">Confidential cases</span>
          </div>
        </div>
      </div>

      {/* Grid: Recommended Jobs & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recommended Jobs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Recommended Opportunities</h3>
              <p className="text-xs text-slate-500">Matched to your skills and preferred location.</p>
            </div>
            <button
              onClick={() => onNavigateTab('jobs')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View all ({publishedJobs.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedJobs.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-xs">
                No active jobs currently available.
              </div>
            ) : (
              recommendedJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{job.title}</span>
                        {job.employerVerified && (
                          <span className="rounded bg-emerald-50 text-emerald-700 px-1.5 py-0.2 text-[10px] font-bold border border-emerald-200">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-xs text-slate-600 font-medium">{job.employerName}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-slate-400" /> {job.specificArea}, {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-slate-400" /> {job.employmentType}
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <div className="text-sm font-black text-emerald-700 font-display">
                        ETB {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}
                      </div>
                      <span className="text-[10px] text-slate-400 block">{job.paymentFrequency}</span>
                      <button
                        onClick={() => onOpenJob(job.id)}
                        className="mt-2.5 inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition"
                      >
                        <span>View Details</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Applications Status */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Recent Applications</h3>
              <p className="text-xs text-slate-500">Track current review progress.</p>
            </div>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>See all ({myApplications.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {recentApplications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
                <FileCheck2 size={24} className="mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-700">No applications submitted yet</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Browse available jobs and submit your first application.
                </p>
                <button
                  onClick={() => onNavigateTab('jobs')}
                  className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Find Jobs Now
                </button>
              </div>
            ) : (
              recentApplications.map((app) => (
                <div key={app.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">{app.jobTitle}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{app.employerName}</div>
                      <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar size={11} /> Applied {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>{getStatusBadge(app.status)}</div>
                  </div>

                  {app.status === 'accepted' && (
                    <div className="mt-3 rounded-xl bg-emerald-50 p-2.5 border border-emerald-200 text-[11px] text-emerald-800 font-semibold">
                      Employer accepted your application! Proceed to agreement review.
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
