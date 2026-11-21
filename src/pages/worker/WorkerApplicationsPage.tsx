import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  AlertCircle,
  ArrowRight,
  Briefcase,
  XCircle,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ApplicationStatus } from '../../types/platform';

interface WorkerApplicationsPageProps {
  onNavigateTab: (tab: string) => void;
}

export const WorkerApplicationsPage: React.FC<WorkerApplicationsPageProps> = ({ onNavigateTab }) => {
  const { worker, applications } = usePlatform();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const myApplications = applications.filter((app) => app.workerId === worker.id);

  const filteredApps = myApplications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
            <CheckCircle2 size={13} /> Accepted
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 border border-blue-300">
            <Clock size={13} /> Under Review
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-300">
            <XCircle size={13} /> Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
            <Clock size={13} /> Submitted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            My Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track real-time employer reviews and responses to your job submissions.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('jobs')}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition self-start sm:self-auto"
        >
          <Briefcase size={15} />
          <span>Find More Jobs</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: 'all', label: 'All Applications', count: myApplications.length },
          {
            id: 'submitted',
            label: 'Submitted',
            count: myApplications.filter((a) => a.status === 'submitted').length,
          },
          {
            id: 'under_review',
            label: 'Under Review',
            count: myApplications.filter((a) => a.status === 'under_review').length,
          },
          {
            id: 'accepted',
            label: 'Accepted',
            count: myApplications.filter((a) => a.status === 'accepted').length,
          },
          {
            id: 'declined',
            label: 'Declined',
            count: myApplications.filter((a) => a.status === 'declined').length,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`rounded-full px-4 py-2 transition flex items-center gap-2 ${
              filterStatus === tab.id
                ? 'bg-slate-900 text-white font-extrabold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                filterStatus === tab.id ? 'bg-slate-700 text-emerald-300' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            <FileCheck2 size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No applications found in this category</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Check other status tabs or browse verified jobs to submit new applications.
            </p>
            <button
              onClick={() => onNavigateTab('jobs')}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 transition-all hover:border-emerald-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {app.jobTitle}
                  </h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                    <Building2 size={13} className="text-slate-400" />
                    <span className="font-semibold text-slate-800">{app.employerName}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar size={12} /> Submitted {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>{getStatusBadge(app.status)}</div>
              </div>

              {/* Introduction Note if attached */}
              {app.introduction && (
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1">
                    Your Application Note
                  </span>
                  <p className="text-slate-700 italic">“{app.introduction}”</p>
                </div>
              )}

              {/* Status Specific Explanations */}
              {app.status === 'accepted' && (
                <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm block">Congratulations! Employer Accepted Your Application.</span>
                    <p className="mt-1 text-emerald-800 leading-relaxed">
                      <strong>Next Stage:</strong> An accepted application indicates mutual intent. In Phase 3, you and the employer will generate and digitally sign the standardized AMANA employment agreement with guaranteed rest days and salary terms.
                    </p>
                  </div>
                </div>
              )}

              {app.status === 'under_review' && (
                <div className="rounded-2xl bg-blue-50 p-3.5 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
                  <Clock size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    The employer has opened and is currently reviewing your credentials and references.
                  </span>
                </div>
              )}

              {app.status === 'declined' && (
                <div className="rounded-2xl bg-slate-100 p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    This role was filled or concluded by the employer. Continue browsing other opportunities in the marketplace!
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
