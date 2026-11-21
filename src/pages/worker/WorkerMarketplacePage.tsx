import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  X,
  Filter,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Job, JobSector, EmploymentType } from '../../types/platform';

interface WorkerMarketplacePageProps {
  preselectedJobId?: string | null;
  onClearPreselectedJob?: () => void;
  onNavigateTab: (tab: string) => void;
  onShowToast: (msg: string) => void;
}

export const WorkerMarketplacePage: React.FC<WorkerMarketplacePageProps> = ({
  preselectedJobId,
  onClearPreselectedJob,
  onNavigateTab,
  onShowToast,
}) => {
  const { jobs, worker, applyToJob, hasApplied } = usePlatform();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [minSalaryFilter, setMinSalaryFilter] = useState<number>(0);

  // Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(() => {
    if (preselectedJobId) {
      return jobs.find((j) => j.id === preselectedJobId) || null;
    }
    return null;
  });
  const [isApplying, setIsApplying] = useState(false);
  const [introductionNote, setIntroductionNote] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  const sectors: (JobSector | 'All')[] = [
    'All',
    'Domestic Work',
    'Hospitality',
    'Retail & Sales',
    'Construction',
    'Office & Admin',
    'Delivery & Logistics',
    'Other Services',
  ];

  const locations = ['All', 'Addis Ababa', 'Hawassa', 'Jimma', 'Bahir Dar', 'Dire Dawa'];
  const employmentTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Live-in'];

  // Filter jobs logic
  const filteredJobs = jobs.filter((job) => {
    // Sector filter
    if (selectedSector !== 'All' && job.sector !== selectedSector) return false;
    // Location filter
    if (selectedLocation !== 'All' && !job.location.includes(selectedLocation)) return false;
    // Type filter
    if (selectedType !== 'All' && job.employmentType !== selectedType) return false;
    // Min salary filter
    if (minSalaryFilter > 0 && job.salaryMax < minSalaryFilter) return false;

    // Search query matching title, employer, description, or skills
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchEmployer = job.employerName.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchSkills = job.requiredSkills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchEmployer && !matchDesc && !matchSkills) return false;
    }

    return true;
  });

  const handleOpenJobDetails = (job: Job) => {
    setSelectedJob(job);
    setIsApplying(false);
    setApplicationSuccess(false);
    setIntroductionNote('');
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsApplying(false);
    setApplicationSuccess(false);
    if (onClearPreselectedJob) onClearPreselectedJob();
  };

  const handleStartApply = () => {
    if (!selectedJob) return;
    if (hasApplied(selectedJob.id)) {
      onShowToast('You have already submitted an application for this opportunity.');
      return;
    }
    if (selectedJob.status === 'closed') {
      onShowToast('This job listing is closed.');
      return;
    }
    setIsApplying(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    const res = applyToJob(selectedJob.id, introductionNote);
    if (res.success) {
      setApplicationSuccess(true);
      onShowToast(res.message);
    } else {
      onShowToast(res.message);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
          Job Marketplace
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Explore verified employment opportunities across domestic service, hospitality, and skilled roles.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, employer, keywords, or skills (e.g. Housekeeper, Cooking, Childcare)..."
            className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
          />
        </div>

        {/* Sector Category Pills (Reference 2 inspired) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`rounded-full px-3.5 py-1.5 font-bold whitespace-nowrap transition ${
                selectedSector === sector
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Filter Dropdowns Row */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-600 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-emerald-500"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Employment Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-emerald-500"
            >
              {employmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-600 mb-1">Min Salary Filter</label>
            <select
              value={minSalaryFilter}
              onChange={(e) => setMinSalaryFilter(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value={0}>Any Salary</option>
              <option value={7000}>ETB 7,000+ / mo</option>
              <option value={9000}>ETB 9,000+ / mo</option>
              <option value={11000}>ETB 11,000+ / mo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Clear */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredJobs.length}</strong> opportunities
        </span>
        {(searchQuery || selectedSector !== 'All' || selectedLocation !== 'All' || selectedType !== 'All' || minSalaryFilter > 0) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSector('All');
              setSelectedLocation('All');
              setSelectedType('All');
              setMinSalaryFilter(0);
            }}
            className="text-emerald-700 font-bold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <Briefcase size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No jobs match your search criteria</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or clearing selected sector and salary filters.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const alreadyApplied = hasApplied(job.id);
            const isClosed = job.status === 'closed';

            return (
              <div
                key={job.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between transition-all hover:border-emerald-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                      {job.sector}
                    </span>
                    {isClosed ? (
                      <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                        Closed
                      </span>
                    ) : alreadyApplied ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 size={11} /> Applied
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        Open
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 font-display leading-snug">
                    {job.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                    <Building2 size={13} className="text-slate-400" />
                    <span>{job.employerName}</span>
                    <span title="Verified Employer">
                      <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} className="text-slate-400" /> {job.specificArea}, {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-slate-400" /> {job.employmentType}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="mt-3.5 flex flex-wrap gap-1">
                    {job.requiredSkills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 border border-slate-100"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{job.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-emerald-700 font-display">
                      ETB {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400 block">{job.paymentFrequency}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenJobDetails(job)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Details
                    </button>
                    {!alreadyApplied && !isClosed && (
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setIsApplying(true);
                        }}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Job Details & Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                  {selectedJob.sector}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {selectedJob.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{selectedJob.employerName}</span>
                  {selectedJob.employerVerified && (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <ShieldCheck size={14} /> Verified Employer
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Application Success Screen */}
            {applicationSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 font-display">
                  Application Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your application for <strong>{selectedJob.title}</strong> has been received by{' '}
                  {selectedJob.employerName}. You can track the employer’s review progress in your applications tab.
                </p>
                <div className="pt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCloseModal();
                      onNavigateTab('applications');
                    }}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    View My Applications
                  </button>
                </div>
              </div>
            ) : isApplying ? (
              /* Application Form View */
              <form onSubmit={handleSubmitApplication} className="py-5 space-y-5">
                <div className="rounded-2xl bg-emerald-50/60 p-4 border border-emerald-100 text-xs text-slate-700">
                  <div className="font-bold text-emerald-900">Applicant Details (Auto-attached)</div>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-slate-600">
                    <div>
                      Name: <strong className="text-slate-800">{worker.fullName}</strong>
                    </div>
                    <div>
                      Phone: <strong className="text-slate-800">{worker.phone}</strong>
                    </div>
                    <div>
                      Location: <strong className="text-slate-800">{worker.location}</strong>
                    </div>
                    <div>
                      Experience: <strong className="text-slate-800">{worker.experienceYears} Years</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Introduction or Note to Employer (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={introductionNote}
                    onChange={(e) => setIntroductionNote(e.target.value)}
                    placeholder="Describe your relevant experience, schedule availability, and why you are excited for this role..."
                    className="w-full rounded-2xl border border-slate-200 p-4 text-xs sm:text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10"
                  />
                </div>

                <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-200 flex items-start gap-2">
                  <AlertCircle size={15} className="text-slate-400 shrink-0 mt-0.5" />
                  <span>
                    By applying, you agree to AMANA’s transparent employment standards. No broker or agency fees will ever be deducted from your salary.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsApplying(false)}
                    className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    Back to Details
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            ) : (
              /* Job Overview Details View */
              <div className="py-4 space-y-6">
                {/* Key Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="text-slate-400 block font-medium">Salary</span>
                    <strong className="text-emerald-700 font-display text-sm font-black">
                      ETB {selectedJob.salaryMin.toLocaleString()} – {selectedJob.salaryMax.toLocaleString()}
                    </strong>
                    <span className="text-[10px] text-slate-400">/{selectedJob.paymentFrequency}</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="text-slate-400 block font-medium">Location</span>
                    <strong className="text-slate-800 text-xs">
                      {selectedJob.specificArea}, {selectedJob.location}
                    </strong>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="text-slate-400 block font-medium">Schedule</span>
                    <strong className="text-slate-800 text-xs">{selectedJob.workingHours}</strong>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                    <span className="text-slate-400 block font-medium">Rest Days</span>
                    <strong className="text-slate-800 text-xs">{selectedJob.restDays}</strong>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    About This Opportunity
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Responsibilities */}
                {selectedJob.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {selectedJob.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Required Skills */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Required Skills & Qualifications
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Posted on {new Date(selectedJob.createdAt).toLocaleDateString()}
                  </div>

                  {hasApplied(selectedJob.id) ? (
                    <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-100 px-4 py-2.5 text-xs font-bold text-emerald-800">
                      <CheckCircle2 size={15} />
                      <span>Application Already Submitted</span>
                    </div>
                  ) : selectedJob.status === 'closed' ? (
                    <span className="text-xs font-bold text-slate-400">Listing is Closed</span>
                  ) : (
                    <button
                      onClick={handleStartApply}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                    >
                      <span>Apply for this Job</span>
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
