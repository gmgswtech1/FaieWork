export type Role = 'worker' | 'employer' | 'reviewer';

export type JobSector =
  | 'Domestic Work'
  | 'Hospitality'
  | 'Retail & Sales'
  | 'Construction'
  | 'Office & Admin'
  | 'Delivery & Logistics'
  | 'Other Services';

export type EmploymentType =
  | 'Full-time'
  | 'Part-time'
  | 'Contract'
  | 'Live-in'
  | 'Temporary';

export type PaymentFrequency = 'Monthly' | 'Bi-weekly' | 'Weekly';

export type JobStatus = 'published' | 'closed' | 'draft';

export type ApplicationStatus = 'submitted' | 'under_review' | 'accepted' | 'declined';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatar?: string;
}

export interface WorkerProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  skills: string[];
  experienceYears: number;
  availability: 'Immediate' | 'Within 2 Weeks' | 'Flexible';
  preferredJobTypes: string[];
  expectedSalaryMin: number;
  profileCompletion: number;
  rating: number;
  verifiedId: boolean;
  trust?: WorkerTrustProfile;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  location: string;
  sector: string;
  description: string;
  verifiedEmployer: boolean;
  employeeCount: string;
  establishedYear: number;
  trust?: EmployerTrustProfile;
}

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  employerVerified: boolean;
  title: string;
  sector: JobSector;
  location: string;
  specificArea: string;
  salaryMin: number;
  salaryMax: number;
  currency: 'ETB';
  paymentFrequency: PaymentFrequency;
  employmentType: EmploymentType;
  workingHours: string;
  restDays: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  status: JobStatus;
  reviewStatus?: ReviewStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
  applicantCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  employerId: string;
  employerName: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerLocation: string;
  workerSkills: string[];
  status: ApplicationStatus;
  introduction?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// -------------------------------------------------------------
// PHASE 3: DIGITAL EMPLOYMENT AGREEMENT TYPES
// -------------------------------------------------------------
export type AgreementStatus =
  | 'draft'
  | 'awaiting_worker_review'
  | 'changes_requested'
  | 'awaiting_employer_confirmation'
  | 'active'
  | 'declined'
  | 'cancelled'
  | 'completed';

export interface AgreementAcknowledgement {
  acknowledged: boolean;
  acknowledgedBy: string;
  timestamp: string;
}

export interface AgreementVersionHistory {
  version: number;
  action: string;
  actor: string;
  timestamp: string;
  notes?: string;
}

export interface EmploymentAgreement {
  id: string;
  referenceNumber: string; // e.g. "AMN-AGR-2026-081"
  applicationId: string;
  jobId: string;
  employerId: string;
  employerName: string;
  employerContact: string;
  employerPhone: string;
  employerEmail: string;
  employerLocation: string;
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerEmail: string;
  workerLocation: string;
  jobTitle: string;
  sector: JobSector;
  workplaceLocation: string;
  salaryAmount: number; // in ETB
  currency: 'ETB';
  paymentFrequency: PaymentFrequency;
  employmentType: EmploymentType;
  workingHours: string;
  restDays: string;
  responsibilities: string[];
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  additionalTerms?: string;
  status: AgreementStatus;
  version: number;
  workerAcknowledgement?: AgreementAcknowledgement;
  employerAcknowledgement?: AgreementAcknowledgement;
  workerChangeRequestNote?: string;
  versionHistory: AgreementVersionHistory[];
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------------------------------
// PHASE 3: SALARY AND PAYMENT TRACKING TYPES
// -------------------------------------------------------------
export type PaymentStatus =
  | 'upcoming'
  | 'due'
  | 'partially_paid'
  | 'employer_reported'
  | 'awaiting_worker_confirmation'
  | 'worker_confirmed'
  | 'disputed'
  | 'overdue';

export type PaymentMethod =
  | 'Cash'
  | 'Telebirr'
  | 'Bank Transfer (CBE)'
  | 'Bank Transfer (Other)'
  | 'Other Mobile Money';

export interface PaymentRecord {
  id: string;
  paymentReference: string; // e.g. "PAY-2026-042"
  agreementId: string;
  agreementRef: string;
  jobTitle: string;
  workerId: string;
  workerName: string;
  employerId: string;
  employerName: string;
  periodLabel: string; // e.g. "November 2026"
  expectedAmount: number; // ETB
  reportedPaidAmount: number; // ETB recorded by employer
  confirmedReceivedAmount: number; // ETB confirmed by worker
  outstandingAmount: number; // expectedAmount - reportedPaidAmount (or confirmed)
  dueDate: string; // YYYY-MM-DD
  paidDate?: string;
  paymentMethod?: PaymentMethod;
  transactionReference?: string;
  receiptAttachmentName?: string;
  status: PaymentStatus;
  employerNotes?: string;
  workerConfirmationDate?: string;
  workerDisputeReason?: string;
  disputeDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type ActivityType =
  | 'job_created'
  | 'job_updated'
  | 'job_closed'
  | 'job_reopened'
  | 'application_submitted'
  | 'application_status_changed'
  | 'agreement_created'
  | 'agreement_sent'
  | 'agreement_changes_requested'
  | 'agreement_accepted_worker'
  | 'agreement_confirmed_employer'
  | 'agreement_activated'
  | 'payment_recorded'
  | 'payment_confirmed'
  | 'payment_disputed'
  | 'complaint_submitted'
  | 'complaint_assigned'
  | 'complaint_status_changed'
  | 'complaint_additional_info_requested'
  | 'complaint_additional_info_submitted'
  | 'complaint_worker_update'
  | 'complaint_resolved'
  | 'complaint_closed'
  | 'verification_simulated'
  | 'profile_updated';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  relatedEntityId: string;
  roleTarget: 'worker' | 'employer' | 'reviewer' | 'both' | 'all';
}

// -------------------------------------------------------------
// PHASE 4: CONFIDENTIAL WORKPLACE PROTECTION & CASE MANAGEMENT
// -------------------------------------------------------------
export type ComplaintCategory =
  | 'unpaid_wages'
  | 'workplace_harassment'
  | 'threats_intimidation'
  | 'unfair_treatment'
  | 'contract_violations'
  | 'unsafe_working_conditions'
  | 'other';

export type ComplaintStatus =
  | 'submitted'
  | 'under_review'
  | 'additional_info_required'
  | 'referred_for_support'
  | 'resolved'
  | 'closed';

export interface CaseAttachmentMetadata {
  id: string;
  fileName: string;
  fileType: string;
  fileSizeFormatted: string; // e.g. "1.4 MB"
  uploadDate: string;
  isSimulated: true;
}

export interface InternalReviewNote {
  id: string;
  caseId: string;
  reviewerId: string;
  reviewerName: string;
  note: string;
  timestamp: string;
}

export interface WorkerCaseUpdate {
  id: string;
  caseId: string;
  authorName: string;
  title: string;
  message: string;
  timestamp: string;
}

export interface WorkerAdditionalInfoResponse {
  id: string;
  caseId: string;
  workerName: string;
  response: string;
  timestamp: string;
  attachmentName?: string;
}

export type CaseEventType =
  | 'case_submitted'
  | 'reviewer_assigned'
  | 'status_changed'
  | 'additional_info_requested'
  | 'additional_info_provided'
  | 'worker_update_posted'
  | 'internal_note_added'
  | 'referred_for_support'
  | 'case_resolved'
  | 'case_closed';

export interface CaseActivityEvent {
  id: string;
  caseId: string;
  actorId: string;
  actorName: string;
  actorRole: 'worker' | 'reviewer' | 'system';
  eventType: CaseEventType;
  title: string;
  description: string;
  timestamp: string;
  isInternalOnly: boolean; // CRITICAL: if true, NEVER displayed to worker or employer!
}

export interface Complaint {
  id: string;
  caseReference: string; // e.g. "AMN-CASE-2026-001"
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerEmail: string;
  category: ComplaintCategory;
  categoryLabel: string;
  relatedEmployerId?: string;
  relatedEmployerName?: string;
  relatedAgreementId?: string;
  relatedAgreementRef?: string;
  relatedJobId?: string;
  relatedJobTitle?: string;
  incidentDate: string; // YYYY-MM-DD
  description: string;
  optionalAdditionalInfo?: string;
  attachments: CaseAttachmentMetadata[];
  status: ComplaintStatus;
  assignedReviewerId: string;
  assignedReviewerName: string;
  assignedAt: string;
  additionalInfoRequestPrompt?: string;
  additionalInfoResponses: WorkerAdditionalInfoResponse[];
  internalReviewNotes: InternalReviewNote[]; // STRICTLY CONFIDENTIAL TO REVIEWERS ONLY
  workerVisibleUpdates: WorkerCaseUpdate[]; // VISIBLE TO COMPLAINANT WORKER
  supportReferralOrganization?: string;
  supportReferralNotes?: string;
  resolutionSummary?: string;
  history: CaseActivityEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewerProfile {
  id: string;
  userId: string;
  fullName: string;
  roleTitle: string; // e.g. "Senior Case Reviewer & Protection Specialist"
  organization: string; // "AMANA Worker Protection & Case Review Team"
  email: string;
  phone: string;
  badgeNumber: string; // "AMN-REV-04"
  department: string;
}

export interface PlatformState {
  currentRole: Role | null;
  worker: WorkerProfile;
  employer: EmployerProfile;
  reviewer: ReviewerProfile;
  jobs: Job[];
  applications: JobApplication[];
  agreements: EmploymentAgreement[];
  payments: PaymentRecord[];
  complaints: Complaint[];
  activities: Activity[];
}

// -------------------------------------------------------------
// PHASE 5: TRUST, IDENTITY VERIFICATION (FAYDA SIMULATION) & TRUST BADGES
// -------------------------------------------------------------
export type IdentityVerificationStatus =
  | 'not_started'
  | 'pending_demo'
  | 'verified_demo'
  | 'additional_review_demo'
  | 'unsuccessful_demo'
  | 'cancelled_demo';

export type ReviewStatus =
  | 'not_started'
  | 'under_review_demo'
  | 'verified_demo'
  | 'needs_update_demo';

export interface VerificationHistoryEntry {
  id: string;
  verificationType: 'identity' | 'skills' | 'employer_profile' | 'job_review';
  action: string;
  status: string;
  timestamp: string;
  actor: string;
  verificationCode?: string; // e.g. "AMN-DEMO-IDV-0001"
  notes?: string;
}

export interface WorkerTrustProfile {
  identityStatus: IdentityVerificationStatus;
  identityVerificationCode?: string; // AMN-DEMO-IDV-0001
  identityVerifiedAt?: string;
  identityProvider: string; // "Fayda National ID (Simulation)"
  skillsStatus: ReviewStatus;
  skillsReviewedAt?: string;
  skillsReviewedBy?: string;
  skillsReviewNotes?: string;
  history: VerificationHistoryEntry[];
}

export interface EmployerTrustProfile {
  identityStatus: IdentityVerificationStatus;
  identityVerificationCode?: string; // AMN-DEMO-IDV-0002
  identityVerifiedAt?: string;
  identityProvider: string; // "Fayda National ID (Simulation)"
  profileStatus: ReviewStatus;
  profileReviewedAt?: string;
  profileReviewedBy?: string;
  profileReviewNotes?: string;
  businessRegistrationSimulated?: boolean;
  history: VerificationHistoryEntry[];
}
