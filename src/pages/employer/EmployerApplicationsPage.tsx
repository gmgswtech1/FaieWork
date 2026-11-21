import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  X,
  FileCheck2,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { JobApplication, ApplicationStatus } from '../../types/platform';

interface EmployerApplicationsPageProps {
  initialSelectedAppId?: string | null;
  onShowToast: (msg: string) => void;
}

export const EmployerApplicationsPage: React.FC<EmployerApplicationsPageProps> = ({
  initialSelectedAppId,
  onShowToast,
}) => {
  const { employer, applications, updateApplicationStatus } = usePlatform();

  // Employer's incoming applications
  const myApplications = applications.filter((app) => app.employerId === employer.id);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(() => {
    if (initialSelectedAppId) {
      return myApplications.find((a) => a.id === initialSelectedAppId) || null;
    }
    return null;
  });

  // Confirmation Modals State
  const [confirmAction, setConfirmAction] = useState<{
    type: 'accepted' | 'declined' | 'under_review';
    app: JobApplication;
  } | null>(null);

  const filteredApps = myApplications.filter((app) => {
    if (filterStatus === 'all') return true;
    return app.status === filterStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
            <CheckCircle2 size={13} /> Accepted
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 border border-blue-300">
            <Clock size={13} /> Under Review
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-300">
            <XCircle size={13} /> Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300">
            <Clock size={13} /> New Submission
          </span>
        );
    }
  };

  const handleExecuteStatusChange = () => {
    if (!confirmAction) return;
    const { type, app } = confirmAction;

    updateApplicationStatus(app.id, type);

    if (selectedApp && selectedApp.id === app.id) {
      setSelectedApp({ ...selectedApp, status: type });
    }

    if (type === 'accepted') {
      onShowToast(`Candidate ${app.workerName} accepted! Agreement stage unlocked.`);
    } else if (type === 'declined') {
      onShowToast(`Application by ${app.workerName} marked as declined.`);
    } else {
      onShowToast(`Application by ${app.workerName} moved to Under Review.`);
    }

    setConfirmAction(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Candidate Applications
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, evaluate, and accept verified worker applicants for {employer.companyName}.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2 text-xs font-bold">
        {[
          { id: 'all', label: 'All Candidates', count: myApplications.length },
          {
            id: 'submitted',
            label: 'New Submissions',
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
            <Users size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No applications in this category</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Applications submitted by workers will appear here for review and status decisions.
            </p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <div
              key={app.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition hover:border-emerald-300"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-base font-black text-slate-900 font-display">
                    {app.workerName}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified Identity
                  </span>
                  <span>{getStatusBadge(app.status)}</span>
                </div>

                <div className="text-xs text-slate-600">
                  Applied for: <strong className="text-slate-900">{app.jobTitle}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" /> {app.workerLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={13} className="text-slate-400" /> {app.workerPhone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-slate-400" /> Applied {new Date(app.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Candidate Skills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {app.workerSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {app.introduction && (
                  <p className="text-xs text-slate-600 italic bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                    “{app.introduction}”
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {app.status === 'submitted' && (
                  <button
                    onClick={() => setConfirmAction({ type: 'under_review', app })}
                    className="rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 flex items-center gap-1.5"
                  >
                    <Clock size={13} />
                    <span>Mark Under Review</span>
                  </button>
                )}

                {app.status !== 'accepted' && (
                  <button
                    onClick={() => setConfirmAction({ type: 'accepted', app })}
                    className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    <span>Accept Candidate</span>
                  </button>
                )}

                {app.status !== 'declined' && (
                  <button
                    onClick={() => setConfirmAction({ type: 'declined', app })}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-800 hover:bg-rose-100 flex items-center gap-1.5"
                  >
                    <XCircle size={13} />
                    <span>Decline</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-xl p-2.5 ${
                  confirmAction.type === 'accepted'
                    ? 'bg-emerald-100 text-emerald-700'
                    : confirmAction.type === 'declined'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {confirmAction.type === 'accepted' ? (
                  <CheckCircle2 size={24} />
                ) : confirmAction.type === 'declined' ? (
                  <XCircle size={24} />
                ) : (
                  <Clock size={24} />
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display capitalize">
                {confirmAction.type === 'accepted'
                  ? 'Accept Candidate Application?'
                  : confirmAction.type === 'declined'
                  ? 'Decline Candidate Application?'
                  : 'Mark Application Under Review?'}
              </h3>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {confirmAction.type === 'accepted' ? (
                <span>
                  You are accepting <strong>{confirmAction.app.workerName}</strong> for{' '}
                  <strong>{confirmAction.app.jobTitle}</strong>.
                  <br />
                  <br />
                  <span className="text-slate-500 block text-xs">
                    <em>Notice:</em> An accepted application is an agreement to proceed to the formal contract stage. Digital employment agreements will be formalized in the next phase.
                  </span>
                </span>
              ) : confirmAction.type === 'declined' ? (
                <span>
                  Are you sure you want to decline the application from{' '}
                  <strong>{confirmAction.app.workerName}</strong>? The candidate will be notified of this status.
                </span>
              ) : (
                <span>
                  Mark this application from <strong>{confirmAction.app.workerName}</strong> as under active review.
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteStatusChange}
                className={`rounded-xl px-5 py-2 text-xs font-bold text-white shadow-sm ${
                  confirmAction.type === 'accepted'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : confirmAction.type === 'declined'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Confirm Decision
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
