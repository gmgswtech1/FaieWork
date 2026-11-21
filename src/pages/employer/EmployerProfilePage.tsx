import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Users,
  Calendar,
  Award,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TrustBadge } from '../../components/trust/TrustBadges';

export const EmployerProfilePage: React.FC<{
  onShowToast: (msg: string) => void;
  onNavigateTab?: (tab: string) => void;
}> = ({ onShowToast, onNavigateTab }) => {
  const { employer, updateEmployerProfile } = usePlatform();

  const [companyName, setCompanyName] = useState(employer.companyName);
  const [contactPerson, setContactPerson] = useState(employer.contactPerson);
  const [phone, setPhone] = useState(employer.phone);
  const [email, setEmail] = useState(employer.email);
  const [location, setLocation] = useState(employer.location);
  const [sector, setSector] = useState(employer.sector);
  const [description, setDescription] = useState(employer.description);
  const [employeeCount, setEmployeeCount] = useState(employer.employeeCount);
  const [showPublicPreview, setShowPublicPreview] = useState(false);

  const trust = employer.trust || {
    identityStatus: 'verified_demo',
    identityVerificationCode: 'AMN-DEMO-IDV-0002',
    identityVerifiedAt: '2026-11-08T09:15:00Z',
    identityProvider: 'Fayda National ID (Simulation)',
    profileStatus: 'verified_demo',
    profileReviewedAt: '2026-11-09T11:00:00Z',
    profileReviewedBy: 'Sara Bekele (AMN-REV-04)',
    profileReviewNotes: 'Household identity and physical address in Bole Atlas corroborated.',
    businessRegistrationSimulated: true,
    history: [],
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployerProfile({
      companyName,
      contactPerson,
      phone,
      email,
      location,
      sector,
      description,
      employeeCount,
    });
    onShowToast('Employer profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            Company & Household Profile
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your verified organization profile, trust standing, and hiring contacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateTab && (
            <button
              type="button"
              onClick={() => onNavigateTab('verification')}
              className="rounded-2xl border border-blue-300 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 transition flex items-center gap-1.5 cursor-pointer"
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
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-emerald-400 text-2xl font-black font-display uppercase">
            {companyName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 font-display">{companyName}</h3>
            <p className="text-xs text-slate-500">{location}</p>

            <div className="flex flex-col items-center gap-1.5 mt-3">
              <TrustBadge
                type="identity"
                status={trust.identityStatus}
                verificationCode={trust.identityVerificationCode}
                size="sm"
              />
              <TrustBadge
                type="employer_profile"
                status={trust.profileStatus}
                reviewedBy={trust.profileReviewedBy}
                size="sm"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-left text-xs space-y-2.5 text-slate-600">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-slate-400" />
              <span>Contact: {contactPerson}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400" />
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-slate-400" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-slate-400" />
              <span>{sector}</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="md:col-span-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company or Household Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Location (City & Sub-City) *
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Sector / Industry
              </label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g. Healthcare & Family Residence, Hospitality"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Household or Organization Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-600 transition cursor-pointer"
              >
                Save Employer Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Public Preview Modal */}
      {showPublicPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
                  Public Employer Profile (What Job Seekers See)
                </span>
                <h3 className="text-xl font-black text-slate-900 font-display mt-0.5">
                  {companyName}
                </h3>
                <p className="text-xs text-slate-500">{location} • {sector}</p>
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
                type="employer_profile"
                status={trust.profileStatus}
                reviewedBy={trust.profileReviewedBy}
                size="sm"
              />
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-900 block">About the Household:</span>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {description}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50/50 p-3 text-xs border border-blue-100 space-y-1 text-blue-950">
              <span className="font-bold block">Fair Employment Guarantee:</span>
              <p className="text-slate-600 leading-snug">
                This employer guarantees written bilingual agreements, on-time salary logging via direct digital payments, and strict protection against arbitrary deduction.
              </p>
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
