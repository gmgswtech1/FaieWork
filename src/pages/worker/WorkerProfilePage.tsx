import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Award,
  Clock,
  Sparkles,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TrustBadge } from '../../components/trust/TrustBadges';

export const WorkerProfilePage: React.FC<{
  onShowToast: (msg: string) => void;
  onNavigateTab?: (tab: string) => void;
}> = ({ onShowToast, onNavigateTab }) => {
  const { worker, updateWorkerProfile } = usePlatform();

  const [fullName, setFullName] = useState(worker.fullName);
  const [phone, setPhone] = useState(worker.phone);
  const [email, setEmail] = useState(worker.email);
  const [location, setLocation] = useState(worker.location);
  const [bio, setBio] = useState(worker.bio);
  const [experienceYears, setExperienceYears] = useState(worker.experienceYears);
  const [expectedSalaryMin, setExpectedSalaryMin] = useState(worker.expectedSalaryMin);
  const [availability, setAvailability] = useState(worker.availability);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(worker.skills);
  const [showPublicPreview, setShowPublicPreview] = useState(false);

  const trust = worker.trust || {
    identityStatus: 'verified_demo',
    identityVerificationCode: 'AMN-DEMO-IDV-0001',
    identityVerifiedAt: '2026-11-10T10:00:00Z',
    identityProvider: 'Fayda National ID (Simulation)',
    skillsStatus: 'verified_demo',
    skillsReviewedAt: '2026-11-12T14:30:00Z',
    skillsReviewedBy: 'Sara Bekele (AMN-REV-04)',
    skillsReviewNotes: 'CPR certification and culinary sanitation credentials cross-verified for domestic placement.',
    history: [],
  };

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(newSkillInput.trim())) {
        setSkills([...skills, newSkillInput.trim()]);
      }
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkerProfile({
      fullName,
      phone,
      email,
      location,
      bio,
      experienceYears: Number(experienceYears),
      expectedSalaryMin: Number(expectedSalaryMin),
      availability,
      skills,
    });
    onShowToast('Worker profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Worker Profile & Public Credentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your credentials, verified skills, and employment expectations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab('verification')}
              className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck size={15} /> Trust Center
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowPublicPreview(true)}
            className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Eye size={15} /> Public Preview
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Card Summary */}
        <div className="md:col-span-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-2xl font-black font-display uppercase">
            {fullName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 font-display">{fullName}</h3>
            <p className="text-xs text-slate-500">{location}</p>

            <div className="flex flex-col items-center gap-1.5 mt-3">
              <TrustBadge
                type="identity"
                status={trust.identityStatus}
                verificationCode={trust.identityVerificationCode}
                size="sm"
              />
              <TrustBadge
                type="skills"
                status={trust.skillsStatus}
                reviewedBy={trust.skillsReviewedBy}
                size="sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-left text-xs space-y-2.5 text-slate-600">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-slate-400" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={14} className="text-slate-400" />
              <span>{experienceYears} Years Experience</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="md:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Location (City & Sub-City)
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Years of Experience
                </label>
                <input
                  type="number"
                  min="0"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Min. Expected Salary (ETB)
                </label>
                <input
                  type="number"
                  step="500"
                  value={expectedSalaryMin}
                  onChange={(e) => setExpectedSalaryMin(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                >
                  <option value="Immediate">Immediate</option>
                  <option value="Within 2 Weeks">Within 2 Weeks</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Professional Bio & Introduction
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm outline-none focus:border-emerald-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Skills & Qualifications (Press Enter to add)
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-emerald-500 hover:text-emerald-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type a skill and press Enter..."
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Public Profile Preview Modal */}
      {showPublicPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  Candidate Profile Preview (What Employers See)
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  {fullName}
                </h3>
                <p className="text-xs text-slate-500">{location} • {experienceYears} Years Exp.</p>
              </div>
              <button
                onClick={() => setShowPublicPreview(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
              <TrustBadge
                type="identity"
                status={trust.identityStatus}
                verificationCode={trust.identityVerificationCode}
                size="sm"
              />
              <TrustBadge
                type="skills"
                status={trust.skillsStatus}
                reviewedBy={trust.skillsReviewedBy}
                size="sm"
              />
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">About Amina:</span>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {bio}
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">Endorsed Skills:</span>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 border border-emerald-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPublicPreview(false)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
