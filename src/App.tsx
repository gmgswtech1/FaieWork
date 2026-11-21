import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { PlatformShell } from './components/platform/PlatformShell';

// Worker Pages
import { WorkerOverviewPage } from './pages/worker/WorkerOverviewPage';
import { WorkerMarketplacePage } from './pages/worker/WorkerMarketplacePage';
import { WorkerApplicationsPage } from './pages/worker/WorkerApplicationsPage';
import { WorkerAgreementsPage } from './pages/worker/WorkerAgreementsPage';
import { WorkerSalaryPage } from './pages/worker/WorkerSalaryPage';
import { WorkerReportsPage } from './pages/worker/WorkerReportsPage';
import { WorkerProfilePage } from './pages/worker/WorkerProfilePage';
import { WorkerVerificationPage } from './pages/worker/WorkerVerificationPage';

// Employer Pages
import { EmployerOverviewPage } from './pages/employer/EmployerOverviewPage';
import { EmployerJobsPage } from './pages/employer/EmployerJobsPage';
import { EmployerApplicationsPage } from './pages/employer/EmployerApplicationsPage';
import { EmployerAgreementsPage } from './pages/employer/EmployerAgreementsPage';
import { EmployerSalaryPage } from './pages/employer/EmployerSalaryPage';
import { EmployerProfilePage } from './pages/employer/EmployerProfilePage';
import { EmployerVerificationPage } from './pages/employer/EmployerVerificationPage';

// Reviewer Pages
import { ReviewerOverviewPage } from './pages/reviewer/ReviewerOverviewPage';
import { ReviewerCasesPage } from './pages/reviewer/ReviewerCasesPage';
import { ReviewerProfilePage } from './pages/reviewer/ReviewerProfilePage';
import { ReviewerVerificationsPage } from './pages/reviewer/ReviewerVerificationsPage';
import { ReviewerCaseDetailModal } from './components/reports/ReviewerCaseDetailModal';

// Public & Trust Pages
import { TrustCenterPage } from './pages/TrustCenterPage';
import { JudgeGuidedTour } from './components/demo/JudgeGuidedTour';

import { AlertCircle, X } from 'lucide-react';
import { Role, Complaint } from './types/platform';

function AppRouter() {
  const { currentRole, setRole } = usePlatform();

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Platform Dashboard Sub-tabs
  const [workerTab, setWorkerTab] = useState<string>('overview');
  const [employerTab, setEmployerTab] = useState<string>('overview');
  const [reviewerTab, setReviewerTab] = useState<string>('overview');

  // Interactive Deep Links & Inspection Modals
  const [preselectedJobId, setPreselectedJobId] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [openCreateJobModalDirectly, setOpenCreateJobModalDirectly] = useState<boolean>(false);
  const [inspectReviewerCase, setInspectReviewerCase] = useState<Complaint | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);

      if (hash.startsWith('#/worker')) {
        setRole('worker');
      } else if (hash.startsWith('#/employer')) {
        setRole('employer');
      } else if (hash.startsWith('#/reviewer')) {
        setRole('reviewer');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initial check on load
    const initialHash = window.location.hash || '#/';
    if (initialHash.startsWith('#/worker')) {
      setRole('worker');
    } else if (initialHash.startsWith('#/employer')) {
      setRole('employer');
    } else if (initialHash.startsWith('#/reviewer')) {
      setRole('reviewer');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setRole]);

  const navigateTo = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);

    if (route.startsWith('#/worker')) {
      setRole('worker');
    } else if (route.startsWith('#/employer')) {
      setRole('employer');
    } else if (route.startsWith('#/reviewer')) {
      setRole('reviewer');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Helper for Worker jumping into a specific job in marketplace
  const handleWorkerOpenJob = (jobId: string) => {
    setPreselectedJobId(jobId);
    setWorkerTab('jobs');
  };

  // Helper for Employer opening Create Job modal
  const handleEmployerOpenCreateJob = () => {
    setOpenCreateJobModalDirectly(true);
    setEmployerTab('jobs');
  };

  // Helper for Employer inspecting an application
  const handleEmployerSelectApp = (appId: string) => {
    setSelectedApplicationId(appId);
    setEmployerTab('applications');
  };

  // 1. Worker Portal View
  if (
    currentRoute.startsWith('#/worker') ||
    (currentRole === 'worker' &&
      currentRoute !== '#/' &&
      currentRoute !== '#/trust' &&
      currentRoute !== '#/signin' &&
      currentRoute !== '#/get-started')
  ) {
    return (
      <>
        {toastMessage && (
          <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
        <PlatformShell
          currentTab={workerTab}
          onTabChange={(tab) => setWorkerTab(tab)}
          onNavigateHome={() => navigateTo('#/')}
        >
          {workerTab === 'overview' && (
            <WorkerOverviewPage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onOpenJob={handleWorkerOpenJob}
            />
          )}
          {workerTab === 'jobs' && (
            <WorkerMarketplacePage
              preselectedJobId={preselectedJobId}
              onClearPreselectedJob={() => setPreselectedJobId(null)}
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {workerTab === 'applications' && (
            <WorkerApplicationsPage onNavigateTab={(tab) => setWorkerTab(tab)} />
          )}
          {workerTab === 'agreements' && (
            <WorkerAgreementsPage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {workerTab === 'salary' && (
            <WorkerSalaryPage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {workerTab === 'reports' && (
            <WorkerReportsPage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {workerTab === 'verification' && (
            <WorkerVerificationPage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {workerTab === 'profile' && (
            <WorkerProfilePage
              onNavigateTab={(tab) => setWorkerTab(tab)}
              onShowToast={showToast}
            />
          )}
        </PlatformShell>

        {/* Global Floating Judge Tour */}
        <JudgeGuidedTour
          onNavigateRoute={navigateTo}
          onSetWorkerTab={setWorkerTab}
          onSetEmployerTab={setEmployerTab}
          onSetReviewerTab={setReviewerTab}
        />
      </>
    );
  }

  // 2. Employer Portal View
  if (
    currentRoute.startsWith('#/employer') ||
    (currentRole === 'employer' &&
      currentRoute !== '#/' &&
      currentRoute !== '#/trust' &&
      currentRoute !== '#/signin' &&
      currentRoute !== '#/get-started')
  ) {
    return (
      <>
        {toastMessage && (
          <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
        <PlatformShell
          currentTab={employerTab}
          onTabChange={(tab) => {
            setEmployerTab(tab);
            setOpenCreateJobModalDirectly(false);
          }}
          onNavigateHome={() => navigateTo('#/')}
        >
          {employerTab === 'overview' && (
            <EmployerOverviewPage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onOpenCreateJob={handleEmployerOpenCreateJob}
              onSelectApplication={handleEmployerSelectApp}
            />
          )}
          {employerTab === 'jobs' && (
            <EmployerJobsPage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onShowToast={showToast}
              openCreateModalDirectly={openCreateJobModalDirectly}
            />
          )}
          {employerTab === 'applications' && (
            <EmployerApplicationsPage
              initialSelectedAppId={selectedApplicationId}
              onShowToast={showToast}
            />
          )}
          {employerTab === 'agreements' && (
            <EmployerAgreementsPage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {employerTab === 'salary' && (
            <EmployerSalaryPage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {employerTab === 'verification' && (
            <EmployerVerificationPage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onShowToast={showToast}
            />
          )}
          {employerTab === 'profile' && (
            <EmployerProfilePage
              onNavigateTab={(tab) => setEmployerTab(tab)}
              onShowToast={showToast}
            />
          )}
        </PlatformShell>

        {/* Global Floating Judge Tour */}
        <JudgeGuidedTour
          onNavigateRoute={navigateTo}
          onSetWorkerTab={setWorkerTab}
          onSetEmployerTab={setEmployerTab}
          onSetReviewerTab={setReviewerTab}
        />
      </>
    );
  }

  // 3. Reviewer Portal View
  if (
    currentRoute.startsWith('#/reviewer') ||
    (currentRole === 'reviewer' &&
      currentRoute !== '#/' &&
      currentRoute !== '#/trust' &&
      currentRoute !== '#/signin' &&
      currentRoute !== '#/get-started')
  ) {
    return (
      <>
        {toastMessage && (
          <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
        <PlatformShell
          currentTab={reviewerTab}
          onTabChange={(tab) => setReviewerTab(tab)}
          onNavigateHome={() => navigateTo('#/')}
        >
          {reviewerTab === 'overview' && (
            <ReviewerOverviewPage
              onNavigateTab={(tab) => setReviewerTab(tab)}
              onOpenCase={(caseItem) => setInspectReviewerCase(caseItem)}
            />
          )}
          {reviewerTab === 'cases' && (
            <ReviewerCasesPage onShowToast={showToast} assignedOnly={false} />
          )}
          {reviewerTab === 'assigned_cases' && (
            <ReviewerCasesPage onShowToast={showToast} assignedOnly={true} />
          )}
          {reviewerTab === 'verifications' && (
            <ReviewerVerificationsPage onShowToast={showToast} />
          )}
          {reviewerTab === 'activity' && (
            <ReviewerCasesPage onShowToast={showToast} assignedOnly={false} />
          )}
          {reviewerTab === 'profile' && <ReviewerProfilePage onShowToast={showToast} />}
        </PlatformShell>

        {inspectReviewerCase && (
          <ReviewerCaseDetailModal
            complaint={inspectReviewerCase}
            onClose={() => setInspectReviewerCase(null)}
            onShowToast={showToast}
          />
        )}

        {/* Global Floating Judge Tour */}
        <JudgeGuidedTour
          onNavigateRoute={navigateTo}
          onSetWorkerTab={setWorkerTab}
          onSetEmployerTab={setEmployerTab}
          onSetReviewerTab={setReviewerTab}
        />
      </>
    );
  }

  // 4. Public Landing Page & Auth Views
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Top Navbar */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* Main Content Router */}
      <main className="flex-grow">
        {currentRoute === '#/signin' ? (
          <SignInPage onBack={() => navigateTo('#/')} onNavigate={navigateTo} onShowToast={showToast} />
        ) : currentRoute === '#/get-started' ? (
          <GetStartedPage onBack={() => navigateTo('#/')} onNavigate={navigateTo} onShowToast={showToast} />
        ) : currentRoute === '#/trust' ? (
          <TrustCenterPage onNavigate={navigateTo} />
        ) : (
          <LandingPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Global Floating Judge Tour */}
      <JudgeGuidedTour
        onNavigateRoute={navigateTo}
        onSetWorkerTab={setWorkerTab}
        onSetEmployerTab={setEmployerTab}
        onSetReviewerTab={setReviewerTab}
      />
    </div>
  );
}

function ToastNotification({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-3 rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-700 flex items-start gap-3">
      <AlertCircle className="text-emerald-400 shrink-0 mt-0.5" size={20} />
      <div className="text-sm">
        <p className="font-semibold text-white">AMANA System Notice</p>
        <p className="text-slate-300 mt-0.5 leading-snug">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white ml-auto"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PlatformProvider>
        <AppRouter />
      </PlatformProvider>
    </LanguageProvider>
  );
}