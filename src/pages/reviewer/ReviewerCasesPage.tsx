import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Calendar,
  Building2,
  User,
  Paperclip,
  Lock,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Complaint, ComplaintStatus, ComplaintCategory } from '../../types/platform';
import { ReviewerCaseDetailModal } from '../../components/reports/ReviewerCaseDetailModal';

interface ReviewerCasesPageProps {
  onShowToast?: (msg: string) => void;
  preselectedCaseId?: string | null;
  assignedOnly?: boolean;
}

export const ReviewerCasesPage: React.FC<ReviewerCasesPageProps> = ({
  onShowToast,
  preselectedCaseId,
  assignedOnly = false,
}) => {
  const { complaints, reviewer } = usePlatform();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<Complaint | null>(null);

  // Filter based on assignedOnly
  let baseCases = complaints;
  if (assignedOnly) {
    baseCases = complaints.filter((c) => c.assignedReviewerId === reviewer.id);
  }

  const filteredCases = baseCases.filter((c) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        c.caseReference.toLowerCase().includes(q) ||
        c.workerName.toLowerCase().includes(q) ||
        (c.relatedEmployerName && c.relatedEmployerName.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q) ||
        c.categoryLabel.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && c.status !== selectedStatus) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && c.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800">
            <Clock size={12} className="text-blue-600" />
            <span>Submitted</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-800 animate-pulse">
            <Clock size={12} className="text-indigo-600" />
            <span>Under Review</span>
          </span>
        );
      case 'additional_info_required':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            <AlertCircle size={12} className="text-amber-600" />
            <span>Info Required</span>
          </span>
        );
      case 'referred_for_support':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800">
            <HelpCircle size={12} className="text-purple-600" />
            <span>Referred</span>
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={12} className="text-emerald-600" />
            <span>Resolved</span>
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700">
            <span>Closed</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 capitalize">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#092e22] to-[#124d3a] p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 mb-3 border border-emerald-400/30">
            <Lock size={13} />
            <span>Case Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            {assignedOnly ? 'My Assigned Cases' : 'Confidential Case Management'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
            Review case dossiers, inspect contractual terms, issue worker-visible updates, record private internal reviewer observations, and manage state transitions.
          </p>
        </div>

        <div className="bg-emerald-950/60 rounded-2xl p-4 border border-emerald-800/60 shrink-0 text-center sm:text-right">
          <div className="text-2xl font-black text-white font-mono">{filteredCases.length}</div>
          <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
            Active Dossiers
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case reference, worker, employer, or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-emerald-600 focus:outline-hidden"
          />
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-600 focus:outline-hidden bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted (Needs Intake)</option>
            <option value="under_review">Under Review</option>
            <option value="additional_info_required">Additional Info Required</option>
            <option value="referred_for_support">Referred for Support</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-600 focus:outline-hidden bg-white"
          >
            <option value="all">All Categories</option>
            <option value="unpaid_wages">Unpaid Wages</option>
            <option value="workplace_harassment">Workplace Harassment</option>
            <option value="threats_intimidation">Threats & Intimidation</option>
            <option value="contract_violations">Contract Violations</option>
            <option value="unfair_treatment">Unfair Treatment</option>
            <option value="unsafe_working_conditions">Unsafe Conditions</option>
            <option value="other">Other Concerns</option>
          </select>
        </div>
      </div>

      {/* Case Management Table */}
      <div className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {filteredCases.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <ShieldAlert size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-semibold text-slate-700">No cases match your filters.</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Try clearing your search query or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Case Ref & Date</th>
                  <th className="py-3.5 px-4">Complainant</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Subject Employer / Contract</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Attachments</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCases.map((c) => {
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4 px-4 sm:px-6">
                        <span className="font-mono font-bold text-slate-900 block">
                          {c.caseReference}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {c.createdAt.split('T')[0]}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-slate-900 flex items-center gap-1">
                          <User size={13} className="text-slate-400" />
                          {c.workerName}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{c.workerPhone}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md text-[11px]">
                          {c.categoryLabel}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-medium text-slate-800 block">
                          {c.relatedEmployerName || 'Unspecified'}
                        </span>
                        {c.relatedAgreementRef && (
                          <span className="text-[10px] text-emerald-700 font-mono block">
                            {c.relatedAgreementRef}
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">{getStatusBadge(c.status)}</td>

                      <td className="py-4 px-4">
                        {c.attachments.length > 0 ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                            <Paperclip size={11} />
                            {c.attachments.length} File{c.attachments.length > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => setSelectedCase(c)}
                          className="rounded-xl bg-[#092e22] hover:bg-[#124d3a] text-white px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 shadow-2xs ml-auto"
                        >
                          <Eye size={13} />
                          <span>Inspect Dossier</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reviewer Case Detail Inspection Modal */}
      {selectedCase && (
        <ReviewerCaseDetailModal
          complaint={selectedCase}
          onClose={() => setSelectedCase(null)}
          onShowToast={(msg) => onShowToast?.(msg)}
        />
      )}
    </div>
  );
};