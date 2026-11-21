import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  X,
  MapPin,
  Calendar,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Job, JobSector, EmploymentType, PaymentFrequency } from '../../types/platform';

interface EmployerJobsPageProps {
  onNavigateTab: (tab: string) => void;
  onShowToast: (msg: string) => void;
  openCreateModalDirectly?: boolean;
}

export const EmployerJobsPage: React.FC<EmployerJobsPageProps> = ({
  onNavigateTab,
  onShowToast,
  openCreateModalDirectly,
}) => {
  const { employer, jobs, createJob, updateJob, closeJob, reopenJob } = usePlatform();

  const myJobs = jobs.filter((j) => j.employerId === employer.id);

  // Modal State
  const [modalOpen, setModalOpen] = useState(Boolean(openCreateModalDirectly));
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [sector, setSector] = useState<JobSector>('Domestic Work');
  const [location, setLocation] = useState('Addis Ababa');
  const [specificArea, setSpecificArea] = useState('Bole Atlas');
  const [salaryMin, setSalaryMin] = useState<number | string>(8000);
  const [salaryMax, setSalaryMax] = useState<number | string>(10000);
  const [paymentFrequency, setPaymentFrequency] = useState<PaymentFrequency>('Monthly');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('Full-time');
  const [workingHours, setWorkingHours] = useState('8:00 AM – 5:00 PM (Mon – Fri)');
  const [restDays, setRestDays] = useState('Saturday & Sunday');
  const [description, setDescription] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [skillsText, setSkillsText] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const sectors: JobSector[] = [
    'Domestic Work',
    'Hospitality',
    'Retail & Sales',
    'Construction',
    'Office & Admin',
    'Delivery & Logistics',
    'Other Services',
  ];

  const resetForm = () => {
    setEditingJobId(null);
    setTitle('');
    setSector('Domestic Work');
    setLocation('Addis Ababa');
    setSpecificArea('Bole Atlas');
    setSalaryMin(8000);
    setSalaryMax(10000);
    setPaymentFrequency('Monthly');
    setEmploymentType('Full-time');
    setWorkingHours('8:00 AM – 5:00 PM (Mon – Fri)');
    setRestDays('Saturday & Sunday');
    setDescription('');
    setResponsibilitiesText('');
    setSkillsText('');
    setFormError(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJobId(job.id);
    setTitle(job.title);
    setSector(job.sector);
    setLocation(job.location);
    setSpecificArea(job.specificArea);
    setSalaryMin(job.salaryMin);
    setSalaryMax(job.salaryMax);
    setPaymentFrequency(job.paymentFrequency);
    setEmploymentType(job.employmentType);
    setWorkingHours(job.workingHours);
    setRestDays(job.restDays);
    setDescription(job.description);
    setResponsibilitiesText(job.responsibilities.join('\n'));
    setSkillsText(job.requiredSkills.join(', '));
    setFormError(null);
    setModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form Validations
    if (!title.trim()) {
      setFormError('Job title cannot be empty.');
      return;
    }
    const min = Number(salaryMin);
    const max = Number(salaryMax);
    if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0) {
      setFormError('Salary values must be positive numbers.');
      return;
    }
    if (min > max) {
      setFormError('Minimum salary cannot exceed maximum salary.');
      return;
    }
    if (!description.trim() || description.trim().length < 20) {
      setFormError('Please provide a meaningful job description (at least 20 characters).');
      return;
    }

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const requiredSkills = skillsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingJobId) {
      updateJob(editingJobId, {
        title,
        sector,
        location,
        specificArea,
        salaryMin: min,
        salaryMax: max,
        paymentFrequency,
        employmentType,
        workingHours,
        restDays,
        description,
        responsibilities,
        requiredSkills,
      });
      onShowToast(`Listing "${title}" updated successfully!`);
    } else {
      createJob({
        title,
        sector,
        location,
        specificArea,
        salaryMin: min,
        salaryMax: max,
        currency: 'ETB',
        paymentFrequency,
        employmentType,
        workingHours,
        restDays,
        description,
        responsibilities: responsibilities.length > 0 ? responsibilities : ['General duties as assigned'],
        requiredSkills: requiredSkills.length > 0 ? requiredSkills : ['Reliability', 'Good Communication'],
        status: 'published',
      });
      onShowToast(`New job "${title}" published live to marketplace!`);
    }

    setModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            My Job Listings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, publish, and manage verified employment listings for {employer.companyName}.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Post a New Job</span>
        </button>
      </div>

      {/* Listings Table / Cards */}
      <div className="space-y-4">
        {myJobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            <Briefcase size={36} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No job listings published yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Create your first verified job listing to connect with qualified workers in Addis Ababa and beyond.
            </p>
            <button
              onClick={openCreateModal}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
            >
              Post First Job
            </button>
          </div>
        ) : (
          myJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:border-emerald-300"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                    {job.sector}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      job.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {job.status === 'published' ? 'Active / Published' : 'Closed'}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-900 font-display">
                  {job.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    ETB {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} / {job.paymentFrequency}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" /> {job.specificArea}, {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-slate-700 font-bold">
                    <Users size={14} className="text-emerald-600" /> {job.applicantCount} Candidate Applications
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => openEditModal(job)}
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Edit2 size={13} />
                  <span>Edit</span>
                </button>

                {job.status === 'published' ? (
                  <button
                    onClick={() => {
                      closeJob(job.id);
                      onShowToast(`Listing "${job.title}" has been closed.`);
                    }}
                    className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 flex items-center gap-1.5"
                  >
                    <XCircle size={13} />
                    <span>Close Listing</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      reopenJob(job.id);
                      onShowToast(`Listing "${job.title}" reopened and published live!`);
                    }}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Reopen</span>
                  </button>
                )}

                <button
                  onClick={() => onNavigateTab('applications')}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition"
                >
                  View Applicants ({job.applicantCount})
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 font-display">
                  {editingJobId ? 'Edit Job Listing' : 'Post a New Job Opportunity'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Set transparent wages, working hours, and responsibilities.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Certified Nanny & Childcare, Head Housekeeper"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Sector *
                  </label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value as JobSector)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  >
                    {sectors.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Employment Type *
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Live-in">Live-in</option>
                    <option value="Temporary">Temporary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    City / Region *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Addis Ababa"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Specific Neighborhood / Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={specificArea}
                    onChange={(e) => setSpecificArea(e.target.value)}
                    placeholder="e.g. Bole Atlas, Kazanchis, CMC"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Salary Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Salary Min (ETB) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Salary Max (ETB) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Payment Frequency
                  </label>
                  <select
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value as PaymentFrequency)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    placeholder="e.g. 8:00 AM – 5:00 PM (Mon – Fri)"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Rest Days
                  </label>
                  <input
                    type="text"
                    value={restDays}
                    onChange={(e) => setRestDays(e.target.value)}
                    placeholder="e.g. Saturday & Sunday"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Job Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the role, household expectations, and general environment..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Key Responsibilities (One per line)
                </label>
                <textarea
                  rows={3}
                  value={responsibilitiesText}
                  onChange={(e) => setResponsibilitiesText(e.target.value)}
                  placeholder="Daily meal preparation&#10;Laundry and ironing&#10;Organizing pantry"
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  placeholder="Childcare, First Aid, Cooking, Housekeeping"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
                >
                  {editingJobId ? 'Save Changes' : 'Publish Job Live'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
