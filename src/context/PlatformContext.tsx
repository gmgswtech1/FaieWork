import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PlatformState,
  Role,
  Job,
  JobApplication,
  Activity,
  WorkerProfile,
  EmployerProfile,
  ApplicationStatus,
  EmploymentAgreement,
  AgreementStatus,
  PaymentRecord,
  PaymentStatus,
  PaymentMethod,
  ReviewerProfile,
  Complaint,
  ComplaintCategory,
  ComplaintStatus,
  CaseAttachmentMetadata,
  InternalReviewNote,
  WorkerCaseUpdate,
  WorkerAdditionalInfoResponse,
  CaseActivityEvent,
  IdentityVerificationStatus,
  ReviewStatus,
  VerificationHistoryEntry,
  WorkerTrustProfile,
  EmployerTrustProfile,
} from '../types/platform';
import { storageService } from '../services/storageService';

export interface SubmitComplaintInput {
  category: ComplaintCategory;
  categoryLabel: string;
  relatedEmployerId?: string;
  relatedEmployerName?: string;
  relatedAgreementId?: string;
  relatedAgreementRef?: string;
  relatedJobId?: string;
  relatedJobTitle?: string;
  incidentDate: string;
  description: string;
  optionalAdditionalInfo?: string;
  attachment?: {
    fileName: string;
    fileType: string;
    fileSizeFormatted: string;
  };
}

interface CreateAgreementInput {
  applicationId: string;
  jobId: string;
  jobTitle: string;
  sector: EmploymentAgreement['sector'];
  workerId: string;
  workerName: string;
  workerPhone: string;
  workerEmail: string;
  workerLocation: string;
  workplaceLocation: string;
  salaryAmount: number;
  paymentFrequency: EmploymentAgreement['paymentFrequency'];
  employmentType: EmploymentAgreement['employmentType'];
  workingHours: string;
  restDays: string;
  responsibilities: string[];
  startDate: string;
  endDate?: string;
  additionalTerms?: string;
}

interface RecordPaymentInput {
  agreementId: string;
  periodLabel: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  transactionReference?: string;
  receiptAttachmentName?: string;
  employerNotes?: string;
}

interface PlatformContextType {
  state: PlatformState;
  currentRole: Role | null;
  setRole: (role: Role | null) => void;
  switchRole: (role: Role) => void;
  jobs: Job[];
  applications: JobApplication[];
  agreements: EmploymentAgreement[];
  payments: PaymentRecord[];
  complaints: Complaint[];
  activities: Activity[];
  worker: WorkerProfile;
  employer: EmployerProfile;
  reviewer: ReviewerProfile;

  // Job Actions
  createJob: (
    jobInput: Omit<
      Job,
      'id' | 'createdAt' | 'updatedAt' | 'applicantCount' | 'employerId' | 'employerName' | 'employerVerified'
    >
  ) => Job;
  updateJob: (jobId: string, updates: Partial<Job>) => void;
  closeJob: (jobId: string) => void;
  reopenJob: (jobId: string) => void;

  // Application Actions
  applyToJob: (
    jobId: string,
    introduction?: string
  ) => { success: boolean; message: string; application?: JobApplication };
  hasApplied: (jobId: string) => boolean;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;

  // Agreement Actions
  createAgreement: (input: CreateAgreementInput) => { success: boolean; message: string; agreement?: EmploymentAgreement };
  updateAgreement: (agreementId: string, updates: Partial<EmploymentAgreement>) => void;
  sendAgreementForReview: (agreementId: string) => void;
  requestAgreementChanges: (agreementId: string, note: string) => void;
  acceptAgreementAsWorker: (agreementId: string) => void;
  confirmAgreementAsEmployer: (agreementId: string) => void;
  declineAgreement: (agreementId: string, reason?: string) => void;
  cancelAgreement: (agreementId: string) => void;

  // Payment Actions
  recordPayment: (input: RecordPaymentInput) => { success: boolean; message: string; payment?: PaymentRecord };
  confirmPaymentReceived: (paymentId: string) => { success: boolean; message: string };
  disputePayment: (paymentId: string, reason: string) => { success: boolean; message: string };

  // Complaint / Protection Actions
  submitComplaint: (input: SubmitComplaintInput) => { success: boolean; message: string; complaint?: Complaint };
  updateCaseStatus: (caseId: string, newStatus: ComplaintStatus, note?: string) => void;
  addInternalReviewNote: (caseId: string, noteText: string) => { success: boolean; message: string };
  addWorkerVisibleUpdate: (caseId: string, title: string, message: string) => { success: boolean; message: string };
  requestAdditionalInformation: (caseId: string, promptText: string) => { success: boolean; message: string };
  submitAdditionalInformation: (caseId: string, responseText: string, attachmentName?: string) => { success: boolean; message: string };
  referCaseForSupport: (caseId: string, organizationName: string, notes?: string) => { success: boolean; message: string };
  resolveCase: (caseId: string, resolutionSummary: string) => { success: boolean; message: string };
  closeCase: (caseId: string, reason?: string) => { success: boolean; message: string };
  assignCase: (caseId: string, reviewerId: string, reviewerName: string) => void;

  // Profile & Reset
  updateWorkerProfile: (updates: Partial<WorkerProfile>) => void;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => void;
  updateReviewerProfile: (updates: Partial<ReviewerProfile>) => void;
  resetDemoData: () => void;

  // Trust & Identity Verification Actions (Phase 5)
  simulateIdentityVerification: (
    role: 'worker' | 'employer',
    outcome: IdentityVerificationStatus
  ) => { success: boolean; message: string; code?: string };
  updateSkillsReviewStatus: (
    status: ReviewStatus,
    notes?: string
  ) => { success: boolean; message: string };
  updateEmployerReviewStatus: (
    status: ReviewStatus,
    notes?: string
  ) => { success: boolean; message: string };
  updateJobReviewStatus: (
    jobId: string,
    status: ReviewStatus
  ) => { success: boolean; message: string };
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlatformState>(() => storageService.loadState());

  useEffect(() => {
    storageService.saveState(state);
  }, [state]);

  const setRole = (role: Role | null) => {
    setState((prev) => ({ ...prev, currentRole: role }));
  };

  const switchRole = (role: Role) => {
    setState((prev) => ({ ...prev, currentRole: role }));
  };

  // -------------------------------------------------------------
  // JOB ACTIONS
  // -------------------------------------------------------------
  const createJob = (
    jobInput: Omit<
      Job,
      'id' | 'createdAt' | 'updatedAt' | 'applicantCount' | 'employerId' | 'employerName' | 'employerVerified'
    >
  ): Job => {
    const newId = `job-${Date.now()}`;
    const now = new Date().toISOString();
    const newJob: Job = {
      ...jobInput,
      id: newId,
      employerId: state.employer.id,
      employerName: state.employer.companyName,
      employerVerified: state.employer.verifiedEmployer,
      createdAt: now,
      updatedAt: now,
      applicantCount: 0,
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'job_created',
      title: 'Job Published',
      description: `${state.employer.companyName} published "${newJob.title}".`,
      timestamp: now,
      relatedEntityId: newId,
      roleTarget: 'both',
    };

    setState((prev) => ({
      ...prev,
      jobs: [newJob, ...prev.jobs],
      activities: [newActivity, ...prev.activities],
    }));

    return newJob;
  };

  const updateJob = (jobId: string, updates: Partial<Job>) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updatedJobs = prev.jobs.map((j) =>
        j.id === jobId ? { ...j, ...updates, updatedAt: now } : j
      );
      const targetJob = updatedJobs.find((j) => j.id === jobId);
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'job_updated',
        title: 'Job Updated',
        description: `Listing "${targetJob?.title || jobId}" was updated.`,
        timestamp: now,
        relatedEntityId: jobId,
        roleTarget: 'both',
      };
      return {
        ...prev,
        jobs: updatedJobs,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const closeJob = (jobId: string) => {
    updateJob(jobId, { status: 'closed' });
  };

  const reopenJob = (jobId: string) => {
    updateJob(jobId, { status: 'published' });
  };

  // -------------------------------------------------------------
  // APPLICATION ACTIONS
  // -------------------------------------------------------------
  const hasApplied = (jobId: string): boolean => {
    return state.applications.some(
      (app) => app.jobId === jobId && app.workerId === state.worker.id
    );
  };

  const applyToJob = (
    jobId: string,
    introduction?: string
  ): { success: boolean; message: string; application?: JobApplication } => {
    const targetJob = state.jobs.find((j) => j.id === jobId);
    if (!targetJob) {
      return { success: false, message: 'Target job listing was not found.' };
    }
    if (targetJob.status === 'closed') {
      return { success: false, message: 'This job listing is currently closed to new applications.' };
    }
    if (hasApplied(jobId)) {
      return { success: false, message: 'You have already submitted an application for this opportunity.' };
    }

    const now = new Date().toISOString();
    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      employerId: targetJob.employerId,
      employerName: targetJob.employerName,
      workerId: state.worker.id,
      workerName: state.worker.fullName,
      workerPhone: state.worker.phone,
      workerLocation: state.worker.location,
      workerSkills: state.worker.skills,
      status: 'submitted',
      introduction: introduction || '',
      createdAt: now,
      updatedAt: now,
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'application_submitted',
      title: 'Application Submitted',
      description: `${state.worker.fullName} applied for "${targetJob.title}".`,
      timestamp: now,
      relatedEntityId: newApp.id,
      roleTarget: 'both',
    };

    setState((prev) => ({
      ...prev,
      applications: [newApp, ...prev.applications],
      jobs: prev.jobs.map((j) =>
        j.id === jobId ? { ...j, applicantCount: j.applicantCount + 1 } : j
      ),
      activities: [newActivity, ...prev.activities],
    }));

    return { success: true, message: 'Application submitted successfully!', application: newApp };
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    notes?: string
  ) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updatedApps = prev.applications.map((app) =>
        app.id === applicationId ? { ...app, status, notes: notes || app.notes, updatedAt: now } : app
      );
      const targetApp = updatedApps.find((app) => app.id === applicationId);

      const statusLabels: Record<ApplicationStatus, string> = {
        submitted: 'Submitted',
        under_review: 'Under Review',
        accepted: 'Accepted',
        declined: 'Declined',
      };

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'application_status_changed',
        title: `Application ${statusLabels[status]}`,
        description: `Application for "${targetApp?.jobTitle}" by ${targetApp?.workerName} marked as ${statusLabels[status]}.`,
        timestamp: now,
        relatedEntityId: applicationId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        applications: updatedApps,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  // -------------------------------------------------------------
  // PHASE 3: AGREEMENT ACTIONS
  // -------------------------------------------------------------
  const createAgreement = (
    input: CreateAgreementInput
  ): { success: boolean; message: string; agreement?: EmploymentAgreement } => {
    const targetApp = state.applications.find((a) => a.id === input.applicationId);
    if (!targetApp || targetApp.status !== 'accepted') {
      return { success: false, message: 'Agreements can only be created for accepted job applications.' };
    }

    if (input.salaryAmount <= 0) {
      return { success: false, message: 'Agreed salary must be a positive amount in Ethiopian Birr.' };
    }

    const now = new Date().toISOString();
    const newAgreementId = `agr-${Date.now()}`;
    const refNum = `AMN-AGR-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newAgreement: EmploymentAgreement = {
      id: newAgreementId,
      referenceNumber: refNum,
      applicationId: input.applicationId,
      jobId: input.jobId,
      employerId: state.employer.id,
      employerName: state.employer.companyName,
      employerContact: state.employer.contactPerson,
      employerPhone: state.employer.phone,
      employerEmail: state.employer.email,
      employerLocation: state.employer.location,
      workerId: input.workerId,
      workerName: input.workerName,
      workerPhone: input.workerPhone,
      workerEmail: input.workerEmail,
      workerLocation: input.workerLocation,
      jobTitle: input.jobTitle,
      sector: input.sector,
      workplaceLocation: input.workplaceLocation,
      salaryAmount: input.salaryAmount,
      currency: 'ETB',
      paymentFrequency: input.paymentFrequency,
      employmentType: input.employmentType,
      workingHours: input.workingHours,
      restDays: input.restDays,
      responsibilities: input.responsibilities,
      startDate: input.startDate,
      endDate: input.endDate,
      additionalTerms: input.additionalTerms,
      status: 'draft',
      version: 1,
      versionHistory: [
        {
          version: 1,
          action: 'Agreement Draft Created',
          actor: state.employer.contactPerson,
          timestamp: now,
          notes: 'Standard AMANA contract draft generated from accepted application.',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'agreement_created',
      title: 'Agreement Draft Prepared',
      description: `${state.employer.companyName} created contract ${refNum} for "${input.jobTitle}".`,
      timestamp: now,
      relatedEntityId: newAgreementId,
      roleTarget: 'both',
    };

    setState((prev) => ({
      ...prev,
      agreements: [newAgreement, ...prev.agreements],
      activities: [newActivity, ...prev.activities],
    }));

    return { success: true, message: `Agreement ${refNum} created successfully!`, agreement: newAgreement };
  };

  const updateAgreement = (agreementId: string, updates: Partial<EmploymentAgreement>) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updated = prev.agreements.map((agr) => {
        if (agr.id === agreementId) {
          const newVersion = agr.version + 1;
          const newHistory = [
            {
              version: newVersion,
              action: 'Agreement Terms Updated',
              actor: state.employer.contactPerson,
              timestamp: now,
              notes: 'Employer revised terms. Previous acknowledgements reset for mutual verification.',
            },
            ...agr.versionHistory,
          ];

          return {
            ...agr,
            ...updates,
            version: newVersion,
            // Reset previous acknowledgements to ensure true mutual consent on updated terms
            workerAcknowledgement: undefined,
            employerAcknowledgement: undefined,
            workerChangeRequestNote: undefined,
            versionHistory: newHistory,
            updatedAt: now,
          };
        }
        return agr;
      });

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'agreement_sent',
        title: 'Agreement Updated',
        description: `Contract terms revised and version updated.`,
        timestamp: now,
        relatedEntityId: agreementId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        agreements: updated,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const sendAgreementForReview = (agreementId: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updated = prev.agreements.map((agr) => {
        if (agr.id === agreementId) {
          return {
            ...agr,
            status: 'awaiting_worker_review' as AgreementStatus,
            versionHistory: [
              {
                version: agr.version,
                action: 'Sent to Worker for Review',
                actor: state.employer.contactPerson,
                timestamp: now,
                notes: 'Worker notified to review agreement terms and provide acknowledgement.',
              },
              ...agr.versionHistory,
            ],
            updatedAt: now,
          };
        }
        return agr;
      });

      const target = updated.find((a) => a.id === agreementId);
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'agreement_sent',
        title: 'Agreement Sent for Review',
        description: `${state.employer.companyName} sent contract ${target?.referenceNumber} to ${target?.workerName}.`,
        timestamp: now,
        relatedEntityId: agreementId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        agreements: updated,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const requestAgreementChanges = (agreementId: string, note: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updated = prev.agreements.map((agr) => {
        if (agr.id === agreementId) {
          return {
            ...agr,
            status: 'changes_requested' as AgreementStatus,
            workerChangeRequestNote: note,
            versionHistory: [
              {
                version: agr.version,
                action: 'Worker Requested Changes',
                actor: state.worker.fullName,
                timestamp: now,
                notes: `Change request: "${note}"`,
              },
              ...agr.versionHistory,
            ],
            updatedAt: now,
          };
        }
        return agr;
      });

      const target = updated.find((a) => a.id === agreementId);
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'agreement_changes_requested',
        title: 'Agreement Changes Requested',
        description: `${state.worker.fullName} requested revisions on contract ${target?.referenceNumber}.`,
        timestamp: now,
        relatedEntityId: agreementId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        agreements: updated,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const acceptAgreementAsWorker = (agreementId: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updated = prev.agreements.map((agr) => {
        if (agr.id === agreementId) {
          return {
            ...agr,
            status: 'awaiting_employer_confirmation' as AgreementStatus,
            workerAcknowledgement: {
              acknowledged: true,
              acknowledgedBy: state.worker.fullName,
              timestamp: now,
            },
            versionHistory: [
              {
                version: agr.version,
                action: 'Worker Accepted Terms',
                actor: state.worker.fullName,
                timestamp: now,
                notes: 'Worker confirmed and accepted agreement terms without changes.',
              },
              ...agr.versionHistory,
            ],
            updatedAt: now,
          };
        }
        return agr;
      });

      const target = updated.find((a) => a.id === agreementId);
      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'agreement_accepted_worker',
        title: 'Worker Accepted Agreement',
        description: `${state.worker.fullName} accepted contract ${target?.referenceNumber}. Awaiting final employer confirmation.`,
        timestamp: now,
        relatedEntityId: agreementId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        agreements: updated,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const confirmAgreementAsEmployer = (agreementId: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      let newlyActivatedAgr: EmploymentAgreement | undefined;

      const updatedAgreements = prev.agreements.map((agr) => {
        if (agr.id === agreementId) {
          newlyActivatedAgr = {
            ...agr,
            status: 'active' as AgreementStatus,
            employerAcknowledgement: {
              acknowledged: true,
              acknowledgedBy: state.employer.contactPerson,
              timestamp: now,
            },
            versionHistory: [
              {
                version: agr.version,
                action: 'Agreement Formally Confirmed & Activated',
                actor: state.employer.contactPerson,
                timestamp: now,
                notes: 'Mutual acknowledgements verified. Agreement is now officially active and monitored.',
              },
              ...agr.versionHistory,
            ],
            updatedAt: now,
          };
          return newlyActivatedAgr;
        }
        return agr;
      });

      // Automatically initialize next upcoming payment schedule entry for this new active agreement!
      let updatedPayments = [...prev.payments];
      if (newlyActivatedAgr) {
        const nextPeriodMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
        const autoPaymentSchedule: PaymentRecord = {
          id: `pay-${Date.now()}`,
          paymentReference: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
          agreementId: newlyActivatedAgr.id,
          agreementRef: newlyActivatedAgr.referenceNumber,
          jobTitle: newlyActivatedAgr.jobTitle,
          workerId: newlyActivatedAgr.workerId,
          workerName: newlyActivatedAgr.workerName,
          employerId: newlyActivatedAgr.employerId,
          employerName: newlyActivatedAgr.employerName,
          periodLabel: nextPeriodMonth,
          expectedAmount: newlyActivatedAgr.salaryAmount,
          reportedPaidAmount: 0,
          confirmedReceivedAmount: 0,
          outstandingAmount: newlyActivatedAgr.salaryAmount,
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'upcoming',
          createdAt: now,
          updatedAt: now,
        };
        updatedPayments = [autoPaymentSchedule, ...updatedPayments];
      }

      const newActivity: Activity = {
        id: `act-${Date.now()}`,
        type: 'agreement_activated',
        title: 'Agreement Active & Monitored',
        description: `Contract ${newlyActivatedAgr?.referenceNumber} is officially active. Salary schedule generated.`,
        timestamp: now,
        relatedEntityId: agreementId,
        roleTarget: 'both',
      };

      return {
        ...prev,
        agreements: updatedAgreements,
        payments: updatedPayments,
        activities: [newActivity, ...prev.activities],
      };
    });
  };

  const declineAgreement = (agreementId: string, reason?: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updated = prev.agreements.map((agr) =>
        agr.id === agreementId
          ? {
              ...agr,
              status: 'declined' as AgreementStatus,
              versionHistory: [
                {
                  version: agr.version,
                  action: 'Agreement Declined',
                  actor: state.currentRole === 'worker' ? state.worker.fullName : state.employer.contactPerson,
                  timestamp: now,
                  notes: reason,
                },
                ...agr.versionHistory,
              ],
              updatedAt: now,
            }
          : agr
      );

      return {
        ...prev,
        agreements: updated,
      };
    });
  };

  const cancelAgreement = (agreementId: string) => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      agreements: prev.agreements.map((agr) =>
        agr.id === agreementId ? { ...agr, status: 'cancelled' as AgreementStatus, updatedAt: now } : agr
      ),
    }));
  };

  // -------------------------------------------------------------
  // PHASE 3: SALARY AND PAYMENT ACTIONS
  // -------------------------------------------------------------
  const recordPayment = (
    input: RecordPaymentInput
  ): { success: boolean; message: string; payment?: PaymentRecord } => {
    const targetAgreement = state.agreements.find((a) => a.id === input.agreementId);
    if (!targetAgreement || targetAgreement.status !== 'active') {
      return { success: false, message: 'Payments can only be recorded for active employment agreements.' };
    }

    if (input.amount <= 0) {
      return { success: false, message: 'Disbursed payment amount must be greater than zero.' };
    }

    const now = new Date().toISOString();

    // Check if an existing schedule entry exists for this agreement & period
    const existingPayment = state.payments.find(
      (p) => p.agreementId === input.agreementId && p.periodLabel === input.periodLabel
    );

    let resultingPayment: PaymentRecord;

    if (existingPayment) {
      const newReported = existingPayment.reportedPaidAmount + input.amount;
      const newOutstanding = Math.max(0, existingPayment.expectedAmount - newReported);
      const newStatus: PaymentStatus =
        newOutstanding === 0 ? 'employer_reported' : 'partially_paid';

      resultingPayment = {
        ...existingPayment,
        reportedPaidAmount: newReported,
        outstandingAmount: newOutstanding,
        paidDate: input.paymentDate,
        paymentMethod: input.paymentMethod,
        transactionReference: input.transactionReference || existingPayment.transactionReference,
        receiptAttachmentName: input.receiptAttachmentName || existingPayment.receiptAttachmentName,
        employerNotes: input.employerNotes || existingPayment.employerNotes,
        status: newStatus,
        updatedAt: now,
      };
    } else {
      const expected = targetAgreement.salaryAmount;
      const outstanding = Math.max(0, expected - input.amount);
      const status: PaymentStatus = outstanding === 0 ? 'employer_reported' : 'partially_paid';

      resultingPayment = {
        id: `pay-${Date.now()}`,
        paymentReference: `PAY-2026-${Math.floor(100 + Math.random() * 900)}`,
        agreementId: targetAgreement.id,
        agreementRef: targetAgreement.referenceNumber,
        jobTitle: targetAgreement.jobTitle,
        workerId: targetAgreement.workerId,
        workerName: targetAgreement.workerName,
        employerId: targetAgreement.employerId,
        employerName: targetAgreement.employerName,
        periodLabel: input.periodLabel,
        expectedAmount: expected,
        reportedPaidAmount: input.amount,
        confirmedReceivedAmount: 0,
        outstandingAmount: outstanding,
        dueDate: now.split('T')[0],
        paidDate: input.paymentDate,
        paymentMethod: input.paymentMethod,
        transactionReference: input.transactionReference,
        receiptAttachmentName: input.receiptAttachmentName,
        status,
        employerNotes: input.employerNotes,
        createdAt: now,
        updatedAt: now,
      };
    }

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'payment_recorded',
      title: 'Payment Reported by Employer',
      description: `${state.employer.companyName} recorded ETB ${input.amount.toLocaleString()} for ${targetAgreement.workerName} (${input.periodLabel}).`,
      timestamp: now,
      relatedEntityId: resultingPayment.id,
      roleTarget: 'both',
    };

    setState((prev) => {
      const filtered = prev.payments.filter((p) => p.id !== resultingPayment.id);
      return {
        ...prev,
        payments: [resultingPayment, ...filtered],
        activities: [newActivity, ...prev.activities],
      };
    });

    return {
      success: true,
      message: `Payment of ETB ${input.amount.toLocaleString()} recorded. Awaiting worker confirmation.`,
      payment: resultingPayment,
    };
  };

  const confirmPaymentReceived = (paymentId: string): { success: boolean; message: string } => {
    const targetPayment = state.payments.find((p) => p.id === paymentId);
    if (!targetPayment) {
      return { success: false, message: 'Payment record not found.' };
    }

    const now = new Date().toISOString();
    const confirmedAmount = targetPayment.reportedPaidAmount;

    const updatedPayment: PaymentRecord = {
      ...targetPayment,
      confirmedReceivedAmount: confirmedAmount,
      status: 'worker_confirmed',
      workerConfirmationDate: now,
      updatedAt: now,
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'payment_confirmed',
      title: 'Payment Confirmed by Worker',
      description: `${state.worker.fullName} confirmed receipt of ETB ${confirmedAmount.toLocaleString()} for ${targetPayment.periodLabel}.`,
      timestamp: now,
      relatedEntityId: paymentId,
      roleTarget: 'both',
    };

    setState((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === paymentId ? updatedPayment : p)),
      activities: [newActivity, ...prev.activities],
    }));

    return { success: true, message: 'Payment confirmed! Receipt status updated to Confirmed.' };
  };

  const disputePayment = (paymentId: string, reason: string): { success: boolean; message: string } => {
    const targetPayment = state.payments.find((p) => p.id === paymentId);
    if (!targetPayment) {
      return { success: false, message: 'Payment record not found.' };
    }

    const now = new Date().toISOString();
    const updatedPayment: PaymentRecord = {
      ...targetPayment,
      status: 'disputed',
      workerDisputeReason: reason,
      disputeDate: now,
      updatedAt: now,
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'payment_disputed',
      title: 'Payment Disputed by Worker',
      description: `${state.worker.fullName} raised a dispute for ${targetPayment.periodLabel}: "${reason}".`,
      timestamp: now,
      relatedEntityId: paymentId,
      roleTarget: 'both',
    };

    setState((prev) => ({
      ...prev,
      payments: prev.payments.map((p) => (p.id === paymentId ? updatedPayment : p)),
      activities: [newActivity, ...prev.activities],
    }));

    return { success: true, message: 'Dispute recorded and escalated to employer activity log.' };
  };

  // -------------------------------------------------------------
  // PROFILE & RESET
  // -------------------------------------------------------------
  const updateWorkerProfile = (updates: Partial<WorkerProfile>) => {
    setState((prev) => ({
      ...prev,
      worker: { ...prev.worker, ...updates },
    }));
  };

  const updateEmployerProfile = (updates: Partial<EmployerProfile>) => {
    setState((prev) => ({
      ...prev,
      employer: { ...prev.employer, ...updates },
    }));
  };

  const updateReviewerProfile = (updates: Partial<ReviewerProfile>) => {
    setState((prev) => ({
      ...prev,
      reviewer: { ...prev.reviewer, ...updates },
    }));
  };

  const resetDemoData = () => {
    const fresh = storageService.resetState();
    setState(fresh);
  };

  // -------------------------------------------------------------
  // PHASE 4: CONFIDENTIAL WORKPLACE REPORTING ACTIONS
  // -------------------------------------------------------------
  const submitComplaint = (input: SubmitComplaintInput): { success: boolean; message: string; complaint?: Complaint } => {
    const now = new Date().toISOString();
    const caseRef = `AMN-CASE-2026-${String(state.complaints.length + 1).padStart(3, '0')}`;
    const newCaseId = `case-${Date.now()}`;

    const attachments: CaseAttachmentMetadata[] = [];
    if (input.attachment && input.attachment.fileName) {
      attachments.push({
        id: `att-${Date.now()}`,
        fileName: input.attachment.fileName,
        fileType: input.attachment.fileType,
        fileSizeFormatted: input.attachment.fileSizeFormatted,
        uploadDate: now,
        isSimulated: true,
      });
    }

    const initialHistory: CaseActivityEvent[] = [
      {
        id: `evt-${Date.now()}-1`,
        caseId: newCaseId,
        actorId: state.worker.id,
        actorName: state.worker.fullName,
        actorRole: 'worker',
        eventType: 'case_submitted',
        title: 'Workplace Report Submitted',
        description: `Worker submitted confidential report under category: ${input.categoryLabel}.`,
        timestamp: now,
        isInternalOnly: false,
      },
      {
        id: `evt-${Date.now()}-2`,
        caseId: newCaseId,
        actorId: 'system',
        actorName: 'AMANA System',
        actorRole: 'system',
        eventType: 'reviewer_assigned',
        title: 'Assigned to Case Reviewer',
        description: `Case allocated to ${state.reviewer.fullName} (${state.reviewer.roleTitle}).`,
        timestamp: now,
        isInternalOnly: false,
      },
    ];

    const newComplaint: Complaint = {
      id: newCaseId,
      caseReference: caseRef,
      workerId: state.worker.id,
      workerName: state.worker.fullName,
      workerPhone: state.worker.phone,
      workerEmail: state.worker.email,
      category: input.category,
      categoryLabel: input.categoryLabel,
      relatedEmployerId: input.relatedEmployerId,
      relatedEmployerName: input.relatedEmployerName,
      relatedAgreementId: input.relatedAgreementId,
      relatedAgreementRef: input.relatedAgreementRef,
      relatedJobId: input.relatedJobId,
      relatedJobTitle: input.relatedJobTitle,
      incidentDate: input.incidentDate,
      description: input.description,
      optionalAdditionalInfo: input.optionalAdditionalInfo,
      attachments,
      status: 'submitted',
      assignedReviewerId: state.reviewer.id,
      assignedReviewerName: state.reviewer.fullName,
      assignedAt: now,
      additionalInfoResponses: [],
      internalReviewNotes: [],
      workerVisibleUpdates: [
        {
          id: `wup-${Date.now()}`,
          caseId: newCaseId,
          authorName: 'AMANA Protection Desk',
          title: 'Report Received',
          message:
            'Your confidential report has been securely registered and assigned to our protection team for review. You can follow updates here.',
          timestamp: now,
        },
      ],
      history: initialHistory,
      createdAt: now,
      updatedAt: now,
    };

    // PRIVACY ENFORCEMENT: Complaints NEVER target employer role!
    const workerActivity: Activity = {
      id: `act-${Date.now()}-w`,
      type: 'complaint_submitted',
      title: 'Report Registered',
      description: `Your report ${caseRef} (${input.categoryLabel}) was received confidentially.`,
      timestamp: now,
      relatedEntityId: newCaseId,
      roleTarget: 'worker',
    };

    const reviewerActivity: Activity = {
      id: `act-${Date.now()}-r`,
      type: 'complaint_assigned',
      title: 'New Case Assigned',
      description: `New confidential report ${caseRef} (${input.categoryLabel}) requires intake review.`,
      timestamp: now,
      relatedEntityId: newCaseId,
      roleTarget: 'reviewer',
    };

    setState((prev) => ({
      ...prev,
      complaints: [newComplaint, ...prev.complaints],
      activities: [workerActivity, reviewerActivity, ...prev.activities],
    }));

    return {
      success: true,
      message: `Report ${caseRef} submitted confidentially! Assigned to protection reviewer.`,
      complaint: newComplaint,
    };
  };

  const updateCaseStatus = (caseId: string, newStatus: ComplaintStatus, note?: string) => {
    const now = new Date().toISOString();
    setState((prev) => {
      const updatedComplaints = prev.complaints.map((c) => {
        if (c.id === caseId) {
          const statusEvent: CaseActivityEvent = {
            id: `evt-${Date.now()}`,
            caseId,
            actorId: state.reviewer.id,
            actorName: state.reviewer.fullName,
            actorRole: 'reviewer',
            eventType: 'status_changed',
            title: `Status Changed: ${newStatus.replace(/_/g, ' ')}`,
            description: note || `Reviewer changed case status to ${newStatus.replace(/_/g, ' ')}.`,
            timestamp: now,
            isInternalOnly: false,
          };
          return {
            ...c,
            status: newStatus,
            history: [statusEvent, ...c.history],
            updatedAt: now,
          };
        }
        return c;
      });

      const target = prev.complaints.find((c) => c.id === caseId);
      const workerAct: Activity = {
        id: `act-${Date.now()}`,
        type: 'complaint_status_changed',
        title: 'Case Status Updated',
        description: `Case ${target?.caseReference} status changed to ${newStatus.replace(/_/g, ' ')}.`,
        timestamp: now,
        relatedEntityId: caseId,
        roleTarget: 'worker',
      };

      return {
        ...prev,
        complaints: updatedComplaints,
        activities: [workerAct, ...prev.activities],
      };
    });
  };

  const addInternalReviewNote = (caseId: string, noteText: string): { success: boolean; message: string } => {
    if (!noteText.trim()) return { success: false, message: 'Note text cannot be empty.' };
    const now = new Date().toISOString();
    const newNote: InternalReviewNote = {
      id: `note-${Date.now()}`,
      caseId,
      reviewerId: state.reviewer.id,
      reviewerName: state.reviewer.fullName,
      note: noteText.trim(),
      timestamp: now,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'internal_note_added',
      title: 'Internal Review Note Added',
      description: `Confidential note recorded by ${state.reviewer.fullName}.`,
      timestamp: now,
      isInternalOnly: true, // CRITICAL: NEVER VISIBLE TO WORKER OR EMPLOYER
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              internalReviewNotes: [newNote, ...c.internalReviewNotes],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
    }));

    return { success: true, message: 'Internal review note saved confidentially.' };
  };

  const addWorkerVisibleUpdate = (caseId: string, title: string, message: string): { success: boolean; message: string } => {
    if (!message.trim()) return { success: false, message: 'Message text cannot be empty.' };
    const now = new Date().toISOString();
    const newUpdate: WorkerCaseUpdate = {
      id: `wup-${Date.now()}`,
      caseId,
      authorName: state.reviewer.fullName,
      title: title.trim() || 'Case Update',
      message: message.trim(),
      timestamp: now,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'worker_update_posted',
      title: `Update Posted: ${title.trim() || 'Case Update'}`,
      description: `Notification sent to worker: "${message.trim()}"`,
      timestamp: now,
      isInternalOnly: false,
    };

    const workerAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'complaint_worker_update',
      title: 'New Case Update Received',
      description: `Reviewer posted an update on your case: "${title.trim()}".`,
      timestamp: now,
      relatedEntityId: caseId,
      roleTarget: 'worker',
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              workerVisibleUpdates: [newUpdate, ...c.workerVisibleUpdates],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
      activities: [workerAct, ...prev.activities],
    }));

    return { success: true, message: 'Worker-visible update posted successfully.' };
  };

  const requestAdditionalInformation = (caseId: string, promptText: string): { success: boolean; message: string } => {
    if (!promptText.trim()) return { success: false, message: 'Please specify the information requested.' };
    const now = new Date().toISOString();

    const newUpdate: WorkerCaseUpdate = {
      id: `wup-${Date.now()}`,
      caseId,
      authorName: state.reviewer.fullName,
      title: 'Action Required: Additional Information Requested',
      message: promptText.trim(),
      timestamp: now,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'additional_info_requested',
      title: 'Additional Information Requested',
      description: `Reviewer asked worker: "${promptText.trim()}"`,
      timestamp: now,
      isInternalOnly: false,
    };

    const workerAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'complaint_additional_info_requested',
      title: 'Additional Information Needed',
      description: `Case Reviewer requested details on your report. Please check My Reports.`,
      timestamp: now,
      relatedEntityId: caseId,
      roleTarget: 'worker',
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: 'additional_info_required',
              additionalInfoRequestPrompt: promptText.trim(),
              workerVisibleUpdates: [newUpdate, ...c.workerVisibleUpdates],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
      activities: [workerAct, ...prev.activities],
    }));

    return { success: true, message: 'Information request sent to worker.' };
  };

  const submitAdditionalInformation = (
    caseId: string,
    responseText: string,
    attachmentName?: string
  ): { success: boolean; message: string } => {
    if (!responseText.trim()) return { success: false, message: 'Response cannot be empty.' };
    const now = new Date().toISOString();

    const responseItem: WorkerAdditionalInfoResponse = {
      id: `wair-${Date.now()}`,
      caseId,
      workerName: state.worker.fullName,
      response: responseText.trim(),
      timestamp: now,
      attachmentName,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.worker.id,
      actorName: state.worker.fullName,
      actorRole: 'worker',
      eventType: 'additional_info_provided',
      title: 'Worker Provided Additional Information',
      description: `Worker supplied supplementary details: "${responseText.trim().slice(0, 100)}..."`,
      timestamp: now,
      isInternalOnly: false,
    };

    const reviewerAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'complaint_additional_info_submitted',
      title: 'Supplementary Information Submitted',
      description: `Worker provided requested details on case. Status resumed to Under Review.`,
      timestamp: now,
      relatedEntityId: caseId,
      roleTarget: 'reviewer',
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: 'under_review',
              additionalInfoResponses: [responseItem, ...c.additionalInfoResponses],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
      activities: [reviewerAct, ...prev.activities],
    }));

    return { success: true, message: 'Additional details submitted. Status returned to Under Review.' };
  };

  const referCaseForSupport = (
    caseId: string,
    organizationName: string,
    notes?: string
  ): { success: boolean; message: string } => {
    const now = new Date().toISOString();
    const updateMsg = `Your case has been formally referred to ${organizationName} for supportive labor mediation and advice.`;

    const newUpdate: WorkerCaseUpdate = {
      id: `wup-${Date.now()}`,
      caseId,
      authorName: state.reviewer.fullName,
      title: 'Case Referred for Support',
      message: updateMsg,
      timestamp: now,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'referred_for_support',
      title: 'Referred for Institutional Support',
      description: `Case referred to ${organizationName}. ${notes ? `Notes: ${notes}` : ''}`,
      timestamp: now,
      isInternalOnly: false,
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: 'referred_for_support',
              supportReferralOrganization: organizationName,
              supportReferralNotes: notes,
              workerVisibleUpdates: [newUpdate, ...c.workerVisibleUpdates],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
    }));

    return { success: true, message: `Case successfully referred to ${organizationName}.` };
  };

  const resolveCase = (caseId: string, resolutionSummary: string): { success: boolean; message: string } => {
    if (!resolutionSummary.trim()) return { success: false, message: 'Resolution summary is required.' };
    const now = new Date().toISOString();

    const newUpdate: WorkerCaseUpdate = {
      id: `wup-${Date.now()}`,
      caseId,
      authorName: state.reviewer.fullName,
      title: 'Case Review Completed & Concluded',
      message: resolutionSummary.trim(),
      timestamp: now,
    };

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'case_resolved',
      title: 'Case Resolved',
      description: `Case review completed: "${resolutionSummary.trim()}"`,
      timestamp: now,
      isInternalOnly: false,
    };

    const workerAct: Activity = {
      id: `act-${Date.now()}`,
      type: 'complaint_resolved',
      title: 'Case Concluded & Resolved',
      description: `Review completed for case. Check My Reports for conclusion details.`,
      timestamp: now,
      relatedEntityId: caseId,
      roleTarget: 'worker',
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: 'resolved',
              resolutionSummary: resolutionSummary.trim(),
              workerVisibleUpdates: [newUpdate, ...c.workerVisibleUpdates],
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
      activities: [workerAct, ...prev.activities],
    }));

    return { success: true, message: 'Case marked as resolved.' };
  };

  const closeCase = (caseId: string, reason?: string): { success: boolean; message: string } => {
    const now = new Date().toISOString();

    const historyEvent: CaseActivityEvent = {
      id: `evt-${Date.now()}`,
      caseId,
      actorId: state.reviewer.id,
      actorName: state.reviewer.fullName,
      actorRole: 'reviewer',
      eventType: 'case_closed',
      title: 'Case Closed',
      description: reason || 'Case closed by authorized reviewer.',
      timestamp: now,
      isInternalOnly: false,
    };

    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              status: 'closed',
              history: [historyEvent, ...c.history],
              updatedAt: now,
            }
          : c
      ),
    }));

    return { success: true, message: 'Case formally closed.' };
  };

  const assignCase = (caseId: string, reviewerId: string, reviewerName: string) => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      complaints: prev.complaints.map((c) =>
        c.id === caseId
          ? {
              ...c,
              assignedReviewerId: reviewerId,
              assignedReviewerName: reviewerName,
              assignedAt: now,
              updatedAt: now,
            }
          : c
      ),
    }));
  };

  // -------------------------------------------------------------
  // PHASE 5: TRUST, NATIONAL IDENTITY SIMULATION & REVIEW ACTIONS
  // -------------------------------------------------------------
  const simulateIdentityVerification = (
    role: 'worker' | 'employer',
    outcome: IdentityVerificationStatus
  ): { success: boolean; message: string; code?: string } => {
    const now = new Date().toISOString();
    const isSuccess = outcome === 'verified_demo';
    const code = isSuccess
      ? role === 'worker'
        ? 'AMN-DEMO-IDV-0001'
        : 'AMN-DEMO-IDV-0002'
      : undefined;

    const historyEntry: VerificationHistoryEntry = {
      id: `vh-${Date.now()}`,
      verificationType: 'identity',
      action:
        outcome === 'verified_demo'
          ? 'Fayda National ID Verified (Simulated)'
          : outcome === 'additional_review_demo'
          ? 'Fayda Verification Flagged for Additional Review'
          : outcome === 'unsuccessful_demo'
          ? 'Fayda Identity Simulation Unsuccessful'
          : 'Fayda Verification Simulation Cancelled',
      status: outcome,
      timestamp: now,
      actor: 'Fayda eKYC Simulation Gateway',
      verificationCode: code,
      notes:
        outcome === 'verified_demo'
          ? 'Cryptographic match verified against simulated National ID registry.'
          : outcome === 'additional_review_demo'
          ? 'Manual profile cross-referencing requested.'
          : outcome === 'unsuccessful_demo'
          ? 'Name or DOB did not match simulated registry record.'
          : 'Verification workflow was cancelled by user.',
    };

    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: 'profile_updated',
      title: 'Identity Verification Simulated',
      description: `${role === 'worker' ? state.worker.fullName : state.employer.companyName} simulated Fayda eKYC verification (${outcome}).`,
      timestamp: now,
      relatedEntityId: code || outcome,
      roleTarget: role,
    };

    if (role === 'worker') {
      setState((prev) => {
        const currentTrust = prev.worker.trust || {
          identityStatus: 'not_started',
          identityProvider: 'Fayda National ID (Simulation)',
          skillsStatus: 'not_started',
          history: [],
        };
        const updatedTrust: WorkerTrustProfile = {
          ...currentTrust,
          identityStatus: outcome,
          identityVerificationCode: code,
          identityVerifiedAt: isSuccess ? now : undefined,
          history: [historyEntry, ...currentTrust.history],
        };
        return {
          ...prev,
          worker: {
            ...prev.worker,
            verifiedId: isSuccess,
            trust: updatedTrust,
          },
          activities: [newActivity, ...prev.activities],
        };
      });
    } else {
      setState((prev) => {
        const currentTrust = prev.employer.trust || {
          identityStatus: 'not_started',
          identityProvider: 'Fayda National ID (Simulation)',
          profileStatus: 'not_started',
          history: [],
        };
        const updatedTrust: EmployerTrustProfile = {
          ...currentTrust,
          identityStatus: outcome,
          identityVerificationCode: code,
          identityVerifiedAt: isSuccess ? now : undefined,
          history: [historyEntry, ...currentTrust.history],
        };
        return {
          ...prev,
          employer: {
            ...prev.employer,
            verifiedEmployer: isSuccess,
            trust: updatedTrust,
          },
          activities: [newActivity, ...prev.activities],
        };
      });
    }

    return {
      success: true,
      message: `Simulated Fayda identity status updated to "${outcome}".`,
      code,
    };
  };

  const updateSkillsReviewStatus = (
    status: ReviewStatus,
    notes?: string
  ): { success: boolean; message: string } => {
    const now = new Date().toISOString();
    const historyEntry: VerificationHistoryEntry = {
      id: `vh-${Date.now()}`,
      verificationType: 'skills',
      action: `Skills Review Updated: ${status}`,
      status,
      timestamp: now,
      actor: `${state.reviewer.fullName} (${state.reviewer.badgeNumber})`,
      notes: notes || 'Skills and background references assessed.',
    };

    setState((prev) => {
      const currentTrust = prev.worker.trust || {
        identityStatus: 'not_started',
        identityProvider: 'Fayda National ID (Simulation)',
        skillsStatus: 'not_started',
        history: [],
      };
      const updatedTrust: WorkerTrustProfile = {
        ...currentTrust,
        skillsStatus: status,
        skillsReviewedAt: status === 'verified_demo' ? now : undefined,
        skillsReviewedBy: `${prev.reviewer.fullName} (${prev.reviewer.badgeNumber})`,
        skillsReviewNotes: notes || currentTrust.skillsReviewNotes,
        history: [historyEntry, ...currentTrust.history],
      };
      return {
        ...prev,
        worker: {
          ...prev.worker,
          trust: updatedTrust,
        },
      };
    });

    return { success: true, message: 'Worker skills review status updated.' };
  };

  const updateEmployerReviewStatus = (
    status: ReviewStatus,
    notes?: string
  ): { success: boolean; message: string } => {
    const now = new Date().toISOString();
    const historyEntry: VerificationHistoryEntry = {
      id: `vh-${Date.now()}`,
      verificationType: 'employer_profile',
      action: `Employer Profile Review Updated: ${status}`,
      status,
      timestamp: now,
      actor: `${state.reviewer.fullName} (${state.reviewer.badgeNumber})`,
      notes: notes || 'Employer household and contact verified.',
    };

    setState((prev) => {
      const currentTrust = prev.employer.trust || {
        identityStatus: 'not_started',
        identityProvider: 'Fayda National ID (Simulation)',
        profileStatus: 'not_started',
        history: [],
      };
      const updatedTrust: EmployerTrustProfile = {
        ...currentTrust,
        profileStatus: status,
        profileReviewedAt: status === 'verified_demo' ? now : undefined,
        profileReviewedBy: `${prev.reviewer.fullName} (${prev.reviewer.badgeNumber})`,
        profileReviewNotes: notes || currentTrust.profileReviewNotes,
        history: [historyEntry, ...currentTrust.history],
      };
      return {
        ...prev,
        employer: {
          ...prev.employer,
          trust: updatedTrust,
        },
      };
    });

    return { success: true, message: 'Employer profile review status updated.' };
  };

  const updateJobReviewStatus = (
    jobId: string,
    status: ReviewStatus
  ): { success: boolean; message: string } => {
    const now = new Date().toISOString();
    setState((prev) => ({
      ...prev,
      jobs: prev.jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              reviewStatus: status,
              reviewedAt: status === 'verified_demo' ? now : undefined,
              reviewedBy: prev.reviewer.fullName,
              updatedAt: now,
            }
          : j
      ),
    }));

    return { success: true, message: `Job review status updated to "${status}".` };
  };

  return (
    <PlatformContext.Provider
      value={{
        state,
        currentRole: state.currentRole,
        setRole,
        switchRole,
        jobs: state.jobs,
        applications: state.applications,
        agreements: state.agreements,
        payments: state.payments,
        complaints: state.complaints,
        activities: state.activities,
        worker: state.worker,
        employer: state.employer,
        reviewer: state.reviewer,
        createJob,
        updateJob,
        closeJob,
        reopenJob,
        applyToJob,
        hasApplied,
        updateApplicationStatus,
        createAgreement,
        updateAgreement,
        sendAgreementForReview,
        requestAgreementChanges,
        acceptAgreementAsWorker,
        confirmAgreementAsEmployer,
        declineAgreement,
        cancelAgreement,
        recordPayment,
        confirmPaymentReceived,
        disputePayment,
        submitComplaint,
        updateCaseStatus,
        addInternalReviewNote,
        addWorkerVisibleUpdate,
        requestAdditionalInformation,
        submitAdditionalInformation,
        referCaseForSupport,
        resolveCase,
        closeCase,
        assignCase,
        updateWorkerProfile,
        updateEmployerProfile,
        updateReviewerProfile,
        resetDemoData,
        simulateIdentityVerification,
        updateSkillsReviewStatus,
        updateEmployerReviewStatus,
        updateJobReviewStatus,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
